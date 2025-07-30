import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormGroup } from '@angular/forms';
import type { IPage } from '@core/interface/IAppConfig';
import type { IBuilderComponent, IBuilderConfig } from '@core/interface/IBuilder';
import { IUser } from '@core/interface/IUser';
import { UserService } from '@core/service/user.service';
import { UtilitiesService } from '@core/service/utilities.service';
import { BuilderState } from '@core/state/BuilderState';
import { BUILDER_CONFIG, UIUX, USER } from '@core/token/token-providers';
import { map, shuffle } from 'lodash-es';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-builder-generater',
  templateUrl: './builder-generater.component.html',
  styleUrls: ['./builder-generater.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BuilderGeneraterComponent implements OnInit {
  public uiux = signal<any[]>([]);
  public uiux$ = inject<Observable<any[]>>(UIUX);
  public builderConfig$ = inject<Observable<IBuilderConfig>>(BUILDER_CONFIG);
  private user$ = inject<Observable<IUser>>(USER);

  public form = new UntypedFormGroup({});
  public model: any = {};
  private user: IUser;
  private builder = inject(BuilderState);
  private util = inject(UtilitiesService);
  private userService = inject(UserService);

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe(user => {
      this.user = user;
    });
    this.uiux$.pipe(takeUntilDestroyed()).subscribe(libaries => {
      this.uiux.set(libaries);
    });
  }

  ngOnInit(): void {}

  onGenerate(value: any): void {
    if (!this.user) {
      this.userService.openLoginDialog();
      return;
    }
    const items: IBuilderComponent[] = [];
    let blocks: any[] = [];
    const page: IPage = {
      title: '快速生成',
      body: [],
      current: true,
      time: new Date(),
    };
    if (value === 'all') {
      map(this.uiux(), item => {
        items.push(...item.elements);
      });
      blocks = this.builder.getAllComponents(items);
      this.util.openSnackbar(
        `正在加载${blocks.length}个组件，这通常仅用来做组件全量测试，可能会存在性能问题`,
        'ok',
        {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000,
        }
      );
      page.title = '组件全量测试';
    } else {
      map(this.uiux(), item => {
        if (item.type === 'component') {
          items.push(...item.elements);
        }
      });
      const heros = this.builder.getRandomElements(items, '首屏', value.hero);
      const showcases = this.builder.getRandomElements(items, '图文', value.showcase);
      const layout = this.builder.getRandomElements(items, '动态构建', 1);
      const section = this.builder.getRandomElements(items, '常用 Section', 2);
      const carousel = this.builder.getRandomElements(items, '幻灯片', value.carousel);
      const masonry = this.builder.getRandomElements(items, '瀑布流', value.masonry);
      const shuffleComponents = shuffle([...layout, ...section, ...showcases, ...carousel]);
      const action = [];
      const text = items
        .filter(item => item.id === 'base')[0]
        .child.find(item => item.id === 'text');
      action.push(text);

      blocks = [...heros, ...shuffleComponents, ...masonry, ...action];
      this.util.openSnackbar('正在为您生成页面，加载中...', 'ok', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 1000,
      });
      page.title = '快速生成';
    }

    this.builder.version.forEach((item: IPage) => (item.current = false));

    page.body = blocks.map(item => {
      if (item.type) {
        return item;
      } else {
        return item.content;
      }
    });

    this.builder.version.unshift(page);

    setTimeout(() => {
      this.builder.closeRightDrawer$.next(true);
      this.builder.saveLocalVersions();
      this.builder.cancelFixedShowcase();
    }, 1200);
  }
}
