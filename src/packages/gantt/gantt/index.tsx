import React, { useState, useEffect, CSSProperties } from "react";
import PropTypes from "prop-types";

import GanttHeader from "./widget/GanttHeader";
import GanttContent from "./widget/GanttContent";
import { IMoveGantt, RowData } from "../root";
import { getDateList } from "../../util/date";

const ganttStyle: CSSProperties = {
  height: "100%",
  backgroundColor: "white",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const SiGantt: React.FC<SiGanttProps> = (props) => {
  const {
    data,
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
      <GanttContent
        data={data}
        rowKey={rowKey}
        projectStart={projectStart}
        projectEnd={projectEnd}
        dateList={dateList}
        ganttColumnWidth={ganttColumnWidth}
        startDateKey={startDateKey}
        endDateKey={endDateKey}
        rowHeight={rowHeight}
        moveSlider={moveSlider}
      ></GanttContent>
    </div>
  );
};

interface SiGanttProps {
  data: Array<RowData>;
  projectStart: Date;
  projectEnd: Date;
  rowKey: string;
  startDateKey: string;
  endDateKey: string;
  ganttColumnWidth: number;
  headerHeight: number;
  rowHeight: number;
  moveSlider: IMoveGantt;
}

SiGantt.propTypes = {
  data: PropTypes.any,
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
