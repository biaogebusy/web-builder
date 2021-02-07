import { Component, Input, OnInit } from '@angular/core';
const cases = [
  {
    title: 'Material UI',
    body: 'Material UI 有完善的主题颜色系统，有优秀的性能和用户体验。',
    img: '/assets/images/badge.scene.png',
  },
  {
    title: 'Flex Layout',
    body: '提供了足够丰富的布局 API，响应式适配各种设备视口尺寸。',
    img: '/assets/images/grid-list.scene.png',
  },
  {
    title: 'Mobx',
    body: 'Mobx 使应用的状态管理变得简单。',
    img: '/assets/images/form-field.scene.png',
  },
  {
    title: '布局',
    body: '通过拖动的方式管理你的页面布局，灵活的创建各种营销着陆页',
    img: '/assets/images/button.scene.png',
  },
  {
    title: '菜单',
    body: '紧凑的菜单面板，引导用户到达页面',
    img: '/assets/images/menu.scene.png',
  },
];

@Component({
  selector: 'app-showcase2v1',
  templateUrl: './showcase2v1.component.html',
  styleUrls: ['./showcase2v1.component.scss'],
})
export class Showcase2v1Component implements OnInit {
  @Input() content: any;
  constructor() {}

  ngOnInit(): void {}
}
