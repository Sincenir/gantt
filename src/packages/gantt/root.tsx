import React, { useState, useEffect, CSSProperties } from "react";
import PropTypes from "prop-types";
import STable from "./table";
import SGantt from "./gantt";
import { getMax, getMin } from "../util";
import { dateCalculate } from "../util/date";

const ganttStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#eee",
  display: "flex",
  flexDirection: "row",
};

const getStart = (items: Array<any>, k: string) => {
  return getMin(items.map((v) => (v[k] as Date).getTime()));
};
const getEnd = (items: Array<any>, k: string) => {
  return getMax(items.map((v) => (v[k] as Date).getTime()));
};

const SiGantt: React.FC<SiGanttProps> = (props) => {
  const [projectStart, setProjectStart] = useState<Date>(new Date());
  const [projectEnd, setProjectEnd] = useState<Date>(new Date());
  const [data, setData] = useState([...props.data]);

  useEffect(() => {
    const startTime = getStart(props.data, props.startDateKey as string);
    const endTime = getEnd(props.data, props.endDateKey as string);
    setProjectStart(new Date(startTime));
    if (endTime - startTime < 86400000 * 60) {
      setProjectEnd(new Date(startTime + 86400000 * 60));
    } else {
      setProjectEnd(new Date(endTime));
    }
  }, [props.data, props.startDateKey, props.endDateKey]);

  const moveGantt: IMoveGantt = (i, flag, days) => {
    let tmp = [...data];
    if (flag === "start") {
      tmp[i].startDate = dateCalculate(tmp[i].startDate as any, days);
    } else if (flag === "move") {
      tmp[i].startDate = dateCalculate(tmp[i].startDate as any, days);
      tmp[i].endDate = dateCalculate(tmp[i].endDate as any, days);
    } else if (flag === "end") {
      tmp[i].endDate = dateCalculate(tmp[i].endDate as any, days);
    }
    // tmp[i].startDate = dateCalculate(tmp[i].startDate as any, days)
    // tmp[i].endDate = dateCalculate(tmp[i].endDate as any, days)
    setData([...tmp]);
    console.log(tmp[i].startDate);
  };

  return (
    <div style={ganttStyle}>
      <STable></STable>
      <SGantt
        projectStart={projectStart}
        projectEnd={projectEnd}
        data={data}
        rowKey={props.rowKey}
        startDateKey={props.startDateKey as string}
        endDateKey={props.endDateKey as string}
        ganttColumnWidth={Number(props.ganttColumnWidth)}
        headerHeight={Number(props.headerHeight)}
        rowHeight={Number(props.rowHeight)}
        moveSlider={moveGantt as IMoveGantt}
      ></SGantt>
    </div>
  );
};

export interface RowData {
  id?: number;
  children?: RowData[];
  startDate?: Date;
  endDate?: Date;
  [k: string]: any;
}

export type IMoveSlider = (oldData: RowData, newData: RowData) => void;
export type IMoveGantt = (index: number, flag: string, days: number) => void;

export interface SiGanttProps {
  data: RowData[];
  startDateKey?: string;
  endDateKey?: string;
  rowKey: string;
  expandAll?: boolean;

  headerHeight?: string | number;
  rowHeight?: string | number;
  ganttColumnWidth?: string | number;
  levelColor?: Array<string>;
  showToday?: boolean;
  showWeekend?: boolean;
  moveSlider?: IMoveSlider;
  rowClick?: (rowData: RowData) => void;
  rowDBClick?: (rowData: RowData) => void;
}

SiGantt.propTypes = {
  // data
  data: PropTypes.array.isRequired,
  startDateKey: PropTypes.string,
  endDateKey: PropTypes.string,
  rowKey: PropTypes.string.isRequired,
  expandAll: PropTypes.bool,

  // style
  headerHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ganttColumnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  levelColor: PropTypes.array,
  showToday: PropTypes.bool,
  showWeekend: PropTypes.bool,

  // event
  moveSlider: PropTypes.func,
  rowClick: PropTypes.func,
  rowDBClick: PropTypes.func,
};

SiGantt.defaultProps = {
  data: [],
  startDateKey: "startDate",
  endDateKey: "endDate",
  rowKey: "id",
  expandAll: true,
  headerHeight: 60,
  rowHeight: 32,
  ganttColumnWidth: 32,
  levelColor: [],
  showToday: true,
  showWeekend: true,
  moveSlider: undefined,
  rowClick: undefined,
  rowDBClick: undefined,
};

export default SiGantt;
