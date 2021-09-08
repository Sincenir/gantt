interface TableColumn {
  title: string;
  key: string;
  width?: number;
}

export interface IInitialState {
  data: Array<any>;
  startKey: string;
  endKey: string;
  rowKey: string;
  expandAll: boolean;
  tableColumn: Array<TableColumn>;

  headerHeight: number;
  rowHeight: number;
  colWidth: number;
  levelColor: Array<string>;
  showToday: boolean;
  showWeekend: boolean;

  moveSlider?: (v: any) => {};
  rowClick?: (v: any) => {};
  rowDBClick?: (v: any) => {};

  dateList: Array<string>;
  projectStart: Date;
  projectEnd: Date;
  scrollTop: number;
  scrollLeft: number;
}

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum GanttDispatchTypes {
  initData = "INIT_DATA",
  initStyle = "INIT_STYLE",
  MoveSlider = "MOVE_SILDER",
  ChangeExpandAll = "CHANGE_EXPAND_ALL",
  ChangeProjectDate = "CHANGE_PROJECT_DATE",
  ChangeScrollPosition = "CHANGE_SCOLL_POSITION",
}

export type GanttProductPayload = {
  [GanttDispatchTypes.initData]: { initData: Array<any> };
  [GanttDispatchTypes.initStyle]: {
    headerHeight: number;
    rowHeight: number;
    colWidth: number;
  };
  [GanttDispatchTypes.MoveSlider]: {
    index: number;
    flag: string;
    days: number;
  };
  [GanttDispatchTypes.ChangeExpandAll]: { v: boolean };
  [GanttDispatchTypes.ChangeProjectDate]: { start: Date; end: Date };
  [GanttDispatchTypes.ChangeScrollPosition]: { left: number; top: number };
};

export type GanttAction =
  ActionMap<GanttProductPayload>[keyof ActionMap<GanttProductPayload>];
