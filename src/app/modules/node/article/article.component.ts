import { DOCUMENT } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import php from 'highlight.js/lib/languages/php';
import scss from 'highlight.js/lib/languages/scss';
import { TagsService } from '@core/service/tags.service';
import { AppState } from '@core/mobx/AppState';
import { ScreenState } from '@core/mobx/screen/ScreenState';
import { ScreenService } from '@core/service/screen.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, AfterViewInit {
  @Input() content: any;
  options: FormGroup;
  fontSizeControl = new FormControl(16, Validators.min(10));

  constructor(
    private tagsService: TagsService,
    @Inject(DOCUMENT) private document: Document,
    fb: FormBuilder,
    public appState: AppState,
    public screen: ScreenState,
    private screenService: ScreenService
  ) {
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('php', php);
    hljs.registerLanguage('scss', scss);

    this.options = fb.group({
      fontSize: this.fontSizeControl,
    });
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
    }
  }

  getFontSize(): number {
    return Math.max(10, this.fontSizeControl.value);
  }

  get articleConfig(): any {
    return this.appState.config && this.appState.config.article;
  }

  get fontSizeConfig(): any {
    return this.articleConfig && this.articleConfig.fontSize;
  }
}
