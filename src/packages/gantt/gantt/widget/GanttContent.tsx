import React, { useRef } from "react";
import { IMoveGantt, RowData } from "../../root";
import PropTypes from "prop-types";
import GanttRow from "./components/GanttRow";

const GanttContent: React.FC<GanttContentProps> = (props) => {
  const el = useRef<HTMLDivElement>(null);
  const {
    data,
    rowKey,
    rowHeight,
    dateList,
    ganttColumnWidth,
    projectStart,
    projectEnd,
    moveSlider,
    handleChangeLeft,
  } = props;

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // console.log(el.current?.scrollLeft);
    handleChangeLeft(el.current?.scrollLeft ?? 0);
  };

  return (
    <div
      ref={el}
      style={{ width: "100%", flexGrow: 1, overflow: "auto" }}
      onScroll={(e) => handleScroll(e)}
    >
      <div
        style={{
          height: `${rowHeight * data.length}px`,
          width: `${ganttColumnWidth * dateList.length}px`,
        }}
      >
        {data.map((v, i) => {
          return (
            <GanttRow
              key={v[rowKey]}
              rowData={v}
              index={i}
              rowHeight={rowHeight}
              ganttColumnWidth={ganttColumnWidth}
              projectStart={projectStart}
              projectEnd={projectEnd}
              moveSlider={moveSlider}
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
  handleChangeLeft: (v: number) => void;
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
