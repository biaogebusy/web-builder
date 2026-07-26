import { moveItemInArray } from '@angular/cdk/drag-drop';

interface ChildContainer<Child> {
  child?: Child[];
}

type BrandingChild<T> = T extends ChildContainer<infer Child> ? Child : never;

export function moveBrandingItems<T>(
  items: readonly T[],
  previousIndex: number,
  currentIndex: number
): T[] {
  const next = [...items];
  moveItemInArray(next, previousIndex, currentIndex);
  return next;
}

export function appendBrandingItem<T>(items: readonly T[], item: T): T[] {
  return [...items, item];
}

export function insertBrandingItem<T>(items: readonly T[], index: number, item: T): T[] {
  const next = [...items];
  next.splice(index, 0, item);
  return next;
}

export function updateBrandingItem<T extends object>(
  items: readonly T[],
  index: number,
  field: string,
  value: unknown
): T[] {
  const next = [...items];
  next[index] = { ...next[index], [field]: value } as T;
  return next;
}

export function removeBrandingItem<T>(items: readonly T[], index: number): T[] {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

export function appendBrandingChild<T extends ChildContainer<unknown>>(
  items: readonly T[],
  parentIndex: number,
  child: BrandingChild<T>
): T[] {
  const next = [...items];
  const children = [...(next[parentIndex].child ?? []), child];
  next[parentIndex] = { ...next[parentIndex], child: children } as T;
  return next;
}

export function insertBrandingChild<T extends ChildContainer<unknown>>(
  items: readonly T[],
  parentIndex: number,
  childIndex: number,
  child: BrandingChild<T>
): T[] {
  const next = [...items];
  const children = [...(next[parentIndex].child ?? [])];
  children.splice(childIndex, 0, child);
  next[parentIndex] = { ...next[parentIndex], child: children } as T;
  return next;
}

export function updateBrandingChild<T extends ChildContainer<unknown>>(
  items: readonly T[],
  parentIndex: number,
  childIndex: number,
  field: string,
  value: unknown
): T[] {
  const next = [...items];
  const children = [...(next[parentIndex].child ?? [])];
  children[childIndex] = { ...(children[childIndex] as object), [field]: value };
  next[parentIndex] = { ...next[parentIndex], child: children } as T;
  return next;
}

export function removeBrandingChild<T extends ChildContainer<unknown>>(
  items: readonly T[],
  parentIndex: number,
  childIndex: number
): T[] {
  const next = [...items];
  const children = (next[parentIndex].child ?? []).filter((_, index) => index !== childIndex);
  next[parentIndex] = { ...next[parentIndex], child: children } as T;
  return next;
}
