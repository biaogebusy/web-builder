/**
 * Walks up the DOM from a contenteditable element to build a dotted data-path
 * relative to the nearest ancestor `.component-item`. Used by the builder
 * to address nested config nodes by path.
 */
export function generatePath(contenteditableElement: any): string {
  let path = contenteditableElement.getAttribute('data-path') || '';
  let element = contenteditableElement;
  while (
    element &&
    element.parentNode &&
    !element.parentNode.classList.contains('component-item')
  ) {
    const dataPath = element.parentNode.getAttribute('data-path');
    if (dataPath) {
      path = `${dataPath}.${path}`;
    }
    element = element.parentNode;
  }
  // 如果尾部为"."则去除，builder layout的场景
  return path.replace(/[.]*$/, '');
}
