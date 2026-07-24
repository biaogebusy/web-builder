import { cloneDeep, get } from 'lodash-es';

export function getBuilderArrayByPath<T>(path: string, body: T[]): T[] {
  if (path.includes('.')) {
    const parentPath = path.slice(0, path.lastIndexOf('.'));
    return get(body, parentPath) as T[];
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

export function insertBuilderTreeValueAfter<T>(root: T[], path: string, value: unknown): T[] {
  const lastDotIndex = path.lastIndexOf('.');
  const parentPath = path.slice(0, lastDotIndex);
  const targetIndex = Number(path.slice(lastDotIndex + 1));

  if (lastDotIndex !== -1) {
    const targetArray = get(root, parentPath);
    if (Array.isArray(targetArray)) {
      const nextArray = [
        ...targetArray.slice(0, targetIndex + 1),
        value,
        ...targetArray.slice(targetIndex + 1),
      ];
      return setBuilderTreeValue(root, parentPath, nextArray);
    }
    return root;
  }

  return [...root.slice(0, targetIndex + 1), cloneDeep(value) as T, ...root.slice(targetIndex + 1)];
}

export function removeBuilderTreeValue<T>(root: T[], path: string): T[] {
  const lastDotIndex = path.lastIndexOf('.');
  const parentPath = path.slice(0, lastDotIndex);
  const targetIndex = Number(path.slice(lastDotIndex + 1));
  const targetArray = get(root, parentPath);

  if (!Array.isArray(targetArray)) {
    return root;
  }

  const nextArray = [...targetArray.slice(0, targetIndex), ...targetArray.slice(targetIndex + 1)];
  return setBuilderTreeValue(root, parentPath, nextArray);
}
