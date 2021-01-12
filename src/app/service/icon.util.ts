import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

/**
 * @title SVG icons
 */

export const loadSvgResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
    const svgPath = '/assets/icons/icons.svg';

    // 把svg的一个集合都放在一个svg中，可以通过命名空间的方式访问id来显示指定的svg，avatars:svg-10
    const url = ds.bypassSecurityTrustResourceUrl(svgPath);
    ir.addSvgIconSet(url);
};
