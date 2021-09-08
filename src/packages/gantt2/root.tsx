import React, { useContext, useEffect } from "react";
// import  from "../gantt/gantt/widget/GanttContent";
import { GanttProvider, GanttContext } from "./content";
import { GanttDispatchTypes } from "./interface";
import "./root.css";
import { getMax, getMin } from "../util";
import SiGantt from "./gantt/Gantt";
import SiTable from "./table/Table";

const getStart = (items: Array<any>, k: string) => {
  return getMin(items.map((v) => (v[k] as Date).getTime()));
};
const getEnd = (items: Array<any>, k: string) => {
  return getMax(items.map((v) => (v[k] as Date).getTime()));
};

const SiGanttContainer: React.FC<GanttProps> = (props) => {
  const { state, dispatch } = useContext(GanttContext);
  const {
    data,
    // startKey,
    // endKey,
    // rowKey,
    // expandAll,
    // headerHeight,
    // rowHeight,
    // colWidth,
    // levelColor,
    // showToday,
    // showWeekend,
  } = props;

  useEffect(() => {
    dispatch({
      type: GanttDispatchTypes.initData,
      payload: { initData: data },
    });
  }, [data, dispatch]);

  useEffect(() => {
    const startTime = getStart(state.data, state.startKey as string);
    let endTime = getEnd(state.data, state.endKey as string);
    if (endTime - startTime < 86400000 * 60) {
      endTime = startTime + 86400000 * 60;
    }
    dispatch({
      type: GanttDispatchTypes.ChangeProjectDate,
      payload: {
        start: new Date(startTime),
        end: new Date(endTime),
      },
    });
  }, [state.data, state.startKey, state.endKey, dispatch]);

  return (
    <div className="gantt-root">
      <SiTable />
      <SiGantt />
    </div>
  );
};

const SiGanttRoot: React.FC<GanttProps> = (props) => {
  return (
    <GanttProvider>
      <SiGanttContainer {...props}></SiGanttContainer>
    </GanttProvider>
  );
};


export interface GanttProps {
  data: Array<any>;
  startKey?: string;
  endKey?: string;
  rowKey?: string;
  expandAll?: boolean;
  tableColumn?: any[];

  headerHeight?: number;
  rowHeight?: number;
  colWidth?: number;
  levelColor?: Array<string>;
  showToday?: boolean;
  showWeekend?: boolean;

  moveSlider?: (v: any) => {};
  rowClick?: (v: any) => {};
  rowDBClick?: (v: any) => {};
}

export default SiGanttRoot;
