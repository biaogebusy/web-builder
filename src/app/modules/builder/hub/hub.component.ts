import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { SHARE_IMPORTS } from '@share/share-imports';
import { WIDGETS_IMPORTS } from '@uiux/widgets/widgets-imports';
import { NodeFieldFormService, INodeTypeOption } from '@core/service/node-field-form.service';
import { UserService } from '@core/service/user.service';
import { USER } from '@core/token/token-providers';
import { HUB_GROUPS, BUILDER_PAGE_GROUP } from './hub-entries';

/** Management center: aggregates content publishing and the scattered management entries (content, pages, appearance, system) */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrl: './hub.component.scss',
  imports: [SHARE_IMPORTS, WIDGETS_IMPORTS, RouterLink],
})
export class HubComponent implements OnInit {
  private fieldFormService = inject(NodeFieldFormService);
  private userService = inject(UserService);
  private user = inject(USER);
  private destroyRef = inject(DestroyRef);

  /**
   * Groups visible to the current user. Entries are filtered by role (the
   * restricted routes are each backed by their own guard); groups that end up
   * empty are not rendered at all, avoiding orphan titles with no entries.
   */
  public groups = computed(() => {
    const user = this.user();
    const resolvedUser = user && typeof user === 'object' ? user : undefined;
    return HUB_GROUPS.map(group => ({
      ...group,
      entries: group.entries.filter(entry =>
        this.userService.checkShow({ params: { reqRoles: entry.reqRoles ?? [] } }, resolvedUser)
      ),
    })).filter(group => group.entries.length > 0);
  });

  /** Content types open for publish entries (default list + core_config additions/removals) */
  public nodeTypes = signal<INodeTypeOption[]>([]);
  public typesLoading = signal(true);
  /** Load failure and "site has no publishable types" are two distinct states with different copy and actions */
  public typesError = signal(false);
  /**
   * Number of skeleton placeholders: follows the configured number of
   * publishable types instead of a fixed value, so the real card count after
   * loading matches the placeholders as closely as possible and height jumps
   * are reduced.
   */
  public skeletonSlots = this.fieldFormService
    .getAllowedTypeNames()
    .map((_, index) => index);

  /**
   * Page groups the site actually has (page_group taxonomy). They are per-deployment
   * data - a site may add or drop libraries - so they are read at runtime rather than
   * listed in HUB_GROUPS.
   */
  public pageGroups = signal<string[]>([]);
  public pageGroupsLoading = signal(true);
  public pageGroupsError = signal(false);
  /** Group count is unknown before the request lands, so the placeholder count is fixed */
  public pageGroupSlots = [0, 1, 2];

  ngOnInit(): void {
    this.loadNodeTypes();
    this.loadPageGroups();
  }

  onRetryTypes(): void {
    this.loadNodeTypes();
  }

  onRetryPageGroups(): void {
    this.loadPageGroups();
  }

  private loadPageGroups(): void {
    this.pageGroupsLoading.set(true);
    this.pageGroupsError.set(false);
    this.fieldFormService
      .getTermOptions('page_group')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: terms => {
          // The page list filters on group.name, so same-named terms are one
          // destination; Builder is dropped because it already has a fixed entry
          this.pageGroups.set([
            ...new Set(
              terms.map(term => term.label).filter(label => label !== BUILDER_PAGE_GROUP)
            ),
          ]);
          this.pageGroupsLoading.set(false);
        },
        error: () => {
          this.pageGroupsError.set(true);
          this.pageGroupsLoading.set(false);
        },
      });
  }

  private loadNodeTypes(): void {
    this.typesLoading.set(true);
    this.typesError.set(false);
    this.fieldFormService
      .getAllowedNodeTypes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: types => {
          this.nodeTypes.set(types);
          this.typesLoading.set(false);
        },
        error: () => {
          this.typesError.set(true);
          this.typesLoading.set(false);
        },
      });
  }
}
