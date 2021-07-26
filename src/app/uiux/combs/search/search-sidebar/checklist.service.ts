import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoItemNode } from './ICheckList';
/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  四分法: {
    金融创新: {
      芯片金融: null,
      竞争与垄断: null,
      涉外金融: null,
    },
    金融体系: {
      公司诉讼律师实务: {
        出资与设立: null,
        股东权益保护: null,
      },
      基础设施金融: null,
      建工金融: null,
    },
  },
  六分法: {
    金融创新: {
      芯片金融: null,
      竞争与垄断: null,
      涉外金融: null,
    },
    金融体系: {
      公司诉讼律师实务: {
        出资与设立: null,
        股东权益保护: null,
      },
      基础设施金融: null,
      建工金融: null,
    },
  },
};
@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    const data = this.buildFileTree(TREE_DATA, 0);
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }
}
