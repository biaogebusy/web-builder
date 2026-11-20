import { cloneDeep, get } from 'lodash-es';

/** Returns the parent path, using an empty path for root-level targets. */
export function getBuilderParentPath(path: string): string {
  const lastDotIndex = path.lastIndexOf('.');
  return lastDotIndex === -1 ? '' : path.slice(0, lastDotIndex);
}

export function getBuilderArrayByPath<T>(path: string, body: T[]): T[] {
  if (path.includes('.')) {
    return get(body, getBuilderParentPath(path)) as T[];
  }
  return body;
}

export function getBuilderTargetIndex(path: string): number {
  const lastDotIndex = path.lastIndexOf('.');
  return Number(path.slice(lastDotIndex + 1));
}

export function setBuilderTreeValue<T>(root: T[], path: string, value: unknown): T[] {
  if (!path) {
    return value as T[];
  }

  const keys = path.split('.');
  let child: unknown = value;
  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i];
    const parent = i === 0 ? root : get(root, keys.slice(0, i).join('.'));
    const keyIndex = Number(key);
    if (!Number.isNaN(keyIndex) && Array.isArray(parent)) {
      const next = [...parent];
      next[keyIndex] = child;
      child = next;
    } else {
      child = { ...((parent || {}) as object), [key]: child };
    }
  }

  return child as T[];
}

/** Inserts an independent copy after the target without mutating the existing tree. */
export function insertBuilderTreeValueAfter<T>(root: T[], path: string, value: unknown): T[] {
  const parentPath = getBuilderParentPath(path);
  const targetIndex = getBuilderTargetIndex(path);
  const targetArray = getBuilderArrayByPath(path, root);

  if (!Array.isArray(targetArray)) {
    return root;
  }

  const nextArray = [
    ...targetArray.slice(0, targetIndex + 1),
    cloneDeep(value),
    ...targetArray.slice(targetIndex + 1),
  ];
  return setBuilderTreeValue(root, parentPath, nextArray);
}

/** Removes the target while retaining references to unaffected nodes. */
export function removeBuilderTreeValue<T>(root: T[], path: string): T[] {
  const parentPath = getBuilderParentPath(path);
  const targetIndex = getBuilderTargetIndex(path);
  const targetArray = getBuilderArrayByPath(path, root);

  if (!Array.isArray(targetArray)) {
    return root;
  }

  const nextArray = [...targetArray.slice(0, targetIndex), ...targetArray.slice(targetIndex + 1)];
  return setBuilderTreeValue(root, parentPath, nextArray);
}
