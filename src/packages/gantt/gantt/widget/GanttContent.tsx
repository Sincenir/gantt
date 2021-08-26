import React from "react";
import { IMoveGantt, RowData } from "../../root";
import PropTypes from "prop-types";
import GanttRow from "./components/GanttRow";

const GanttContent: React.FC<GanttContentProps> = (props) => {
  const {
    data,
    rowKey,
    rowHeight,
    dateList,
    ganttColumnWidth,
    projectStart,
    projectEnd,
  } = props;
  console.log(data);
  return (
    <div style={{ width: "100%", flexGrow: 1, overflow: "auto" }}>
      <div
        style={{
          height: `${rowHeight * data.length}px`,
          width: `${ganttColumnWidth * dateList.length}px`,
        }}
      >
        {data.map((v) => {
          return (
            <GanttRow
              key={v[rowKey]}
              rowData={v}
              rowHeight={rowHeight}
              ganttColumnWidth={ganttColumnWidth}
              projectStart={projectStart}
              projectEnd={projectEnd}
            ></GanttRow>
          );
        })}
      </div>
    </div>
  );
};

interface GanttContentProps {
  data: Array<RowData>;
  rowKey: string;
  startDateKey: string;
  endDateKey: string;
  rowHeight: number;
  moveSlider: IMoveGantt;
  dateList: Array<string>;
  ganttColumnWidth: number;
  projectStart: Date;
  projectEnd: Date;
}

GanttContent.propTypes = {
  data: PropTypes.any,
  rowKey: PropTypes.any,
  startDateKey: PropTypes.any,
  endDateKey: PropTypes.any,
  rowHeight: PropTypes.any,
  moveSlider: PropTypes.any,
  dateList: PropTypes.any,
  ganttColumnWidth: PropTypes.any,
};

export default GanttContent;
