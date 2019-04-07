export class TreeNode {
  constructor(
    public id: string,
    public cols: Col[][],
    public childrens: TreeNode[],
    public isShowChildrens?: boolean
  ) {
    this.isShowChildrens = isShowChildrens || true;
  }
}

export class Col {
  constructor(
    public id: string,
    public label: string,
    public colType?: ColType,
    public data?: Data,
    public colEvent?: ColEvent[],
    public clazz?: string) {
    this.clazz == clazz || '';
  }
}

export class ColEvent {
  constructor(public eventType: EventType | OprType, public callBack?: any) {}
}

export class Data {
  constructor(public defaultValue: any) {

  }
}

export class InputData extends Data {
  constructor(public defaultValue: any) {
    super(defaultValue);
  }
}

export class SelectData extends Data {
  constructor(public defaultValue: any, public data: any[]) {
    super(defaultValue);
  }
}


export enum ColType {
  INDEX = 0,
  DEFAULT = 1,
  INPUT = 2,
  SELECT = 3,
  TEXT = 4,
  CHECKBOX = 5,
  OPR = 6,
  TITLE = 7,
}

export enum EventType {
  CLICK,
  CHANGE,
  DBCLICK,
  BLUR,
  FOCUS
}

export enum OprType {
  ADD = 50,
  REMOVE = 51,
  MODIFY = 52,
  INDEX = 53,
}
