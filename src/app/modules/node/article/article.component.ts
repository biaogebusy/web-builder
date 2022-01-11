import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import scss from 'highlight.js/lib/languages/scss';
import { TagsService } from '@core/service/tags.service';
import { AppState } from '@core/mobx/AppState';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';
import { FormService } from '@core/service/form.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  form: FormGroup;
  showNotXs: boolean;

  constructor(
    private tagsService: TagsService,
    private fb: FormBuilder,
    public appState: AppState,
    public screen: ScreenState,
    private screenService: ScreenService,
    private cd: ChangeDetectorRef,
    private formService: FormService,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (this.screenService.isPlatformBrowser()) {
      hljs.registerLanguage('javascript', javascript);
      hljs.registerLanguage('php', php);
      hljs.registerLanguage('scss', scss);

      this.form = this.formService.toFormGroup(this.fontSizeConfig.form);
    }
  }

  ngOnInit(): void {
    if (this.content.title) {
      this.tagsService.setTitle(this.content.title);
    }
  }

  ngAfterViewInit(): void {
    if (this.screenService.isPlatformBrowser()) {
      this.document.querySelectorAll('code').forEach((block) => {
        // then highlight each
        hljs.highlightBlock(block);
      });
      this.screen.mqAlias$().subscribe((mq) => {
        this.showNotXs = mq.includes('gt-xs');
        this.cd.detectChanges();
      });
    }
  }

  getFontSize(): number {
    return Math.max(10, this.form.value.font);
  }

  get articleConfig(): any {
    return this.appState.config && this.appState.config.article;
  }

  get fontSizeConfig(): any {
    return this.articleConfig && this.articleConfig.fontSize;
  }
}
