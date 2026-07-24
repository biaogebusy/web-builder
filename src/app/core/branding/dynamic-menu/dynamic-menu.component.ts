import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DynamicComponentComponent } from '@uiux/widgets/builder/dynamic-component/dynamic-component.component';
import { DynamicMenuState } from './dynamic-menu.state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss'],
  imports: [DynamicComponentComponent],
})
export class DynamicMenuComponent {
  readonly uuid = input<string>();
  private state = inject(DynamicMenuState);
  public dynamicContent = computed(() => {
    const id = this.uuid();
    return id ? this.state.getContent(id)() : {};
  });
}
