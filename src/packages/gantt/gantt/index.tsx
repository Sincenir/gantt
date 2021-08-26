import React, { useState, useEffect, CSSProperties } from "react";
import PropTypes from "prop-types";

import GanttHeader from "./widget/GanttHeader";
import GanttContent from "./widget/GanttContent";
import { MoveSlider, RowData } from "../root";
import { getDateList } from "../../util/date";


const ganttStyle: CSSProperties = {
  height: '100%',
  backgroundColor: 'white',
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: 'hidden'
}

const SiGantt: React.FC<SiGanttProps> = (props) => {
  const {
    projectStart,
    projectEnd,
    rowKey,
    startDateKey,
    endDateKey,
    ganttColumnWidth,
    headerHeight,
    rowHeight,
    moveSlider,
  } = props;

  const [dateList, setDateList] = useState<Array<string>>([]);

  useEffect(() => {
    setDateList(getDateList(projectStart, projectEnd));
  }, [projectStart, projectEnd]);

  console.log(dateList);
  return (
    <div style={ganttStyle}>
      <GanttHeader
        dateList={dateList}
        ganttColumnWidth={ganttColumnWidth}
        headerHeight={headerHeight}
      ></GanttHeader>
      <GanttContent></GanttContent>
    </div>
  );
};

interface SiGanttProps {
  projectStart: Date;
  projectEnd: Date;
  rowKey: string;
  startDateKey: string;
  endDateKey: string;
  ganttColumnWidth: number;
  headerHeight: number;
  rowHeight: number;
  moveSlider: MoveSlider;
}

SiGantt.propTypes = {
  projectStart: PropTypes.any,
  projectEnd: PropTypes.any,
  rowKey: PropTypes.any,
  startDateKey: PropTypes.any,
  endDateKey: PropTypes.any,
  ganttColumnWidth: PropTypes.any,
  headerHeight: PropTypes.any,
  rowHeight: PropTypes.any,
  moveSlider: PropTypes.any,
};

export default SiGantt;
