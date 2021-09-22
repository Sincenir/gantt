import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
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
    startKey,
    endKey,
    rowKey,
    // expandAll,
    headerHeight,
    rowHeight,
    colWidth,
    levelColor,
    showToday,
    showWeekend,
  } = props;

  useEffect(() => {
    dispatch({
      type: GanttDispatchTypes.initData,
      payload: {
        data: data,
        startKey: startKey,
        endKey: endKey,
        rowKey: rowKey,
      },
    });
  }, [data, startKey, endKey, rowKey, dispatch]);

  useEffect(() => {
    dispatch({
      type: GanttDispatchTypes.ChangeStyle,
      payload: {
        headerHeight,
        rowHeight,
        colWidth,
        levelColor,
        showToday,
        showWeekend,
      },
    });
  }, [
    headerHeight,
    rowHeight,
    colWidth,
    levelColor,
    showToday,
    showWeekend,
    dispatch,
  ]);

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

SiGanttRoot.propTypes = SiGanttContainer.propTypes = {
  data: PropTypes.any,
  startKey: PropTypes.any,
  endKey: PropTypes.any,
  rowKey: PropTypes.any,
  expandAll: PropTypes.any,
  tableColumn: PropTypes.any,
  headerHeight: PropTypes.any,
  rowHeight: PropTypes.any,
  colWidth: PropTypes.any,
  levelColor: PropTypes.any,
  showToday: PropTypes.any,
  showWeekend: PropTypes.any,
  moveSlider: PropTypes.any,
  rowClick: PropTypes.any,
  rowDBClick: PropTypes.any,
};

SiGanttContainer.defaultProps = {
  data: [],
  startKey: "startDate",
  endKey: "endDate",
  rowKey: "id",
  expandAll: true,
  tableColumn: [],
  headerHeight: 60,
  rowHeight: 32,
  colWidth: 32,
  levelColor: undefined,
  showToday: true,
  showWeekend: true,
  moveSlider: void 0,
  rowClick: void 0,
  rowDBClick: void 0,
};

export default SiGanttRoot;
