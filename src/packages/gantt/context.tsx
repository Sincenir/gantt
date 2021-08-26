import React, { createContext } from "react";
import { SiGanttProps } from "./root";


const init: SiGanttProps = {
  data: [],
  startDateKey: 'startDate',
  endDateKey: 'endDate',
  rowKey: 'id',
  expandAll: true,
  headerHeight: 16,
  rowHeight: 16,
  ganttColumnWidth: 16,
  levelColor: [],
  showToday: true,
  showWeekend: true,
  moveSlider: undefined,
  rowClick: undefined,
  rowDBClick: undefined
}

const context = createContext<{
  state: SiGanttProps;
  dispatch: React.Dispatch<unknown>;
}>({
  state: init,
  dispatch: () => void 0,
});

export default context;