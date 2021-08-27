import React, { useState, useEffect } from "react";
import { getDateInterval } from "../../../../util/date";
import { IMoveGantt, RowData } from "../../../root";

const GanttRow: React.FC<GanttRowProps> = (props) => {
  const {
    rowHeight,
    ganttColumnWidth,
    rowData,
    projectStart,
    moveSlider,
    index,
  } = props;

  const [left, setLeft] = useState(
    (getDateInterval(projectStart, rowData.startDate as Date) / 86400000) *
      ganttColumnWidth
  );

  const [width, setWidth] = useState(
    (getDateInterval(rowData.startDate as Date, rowData.endDate as Date) /
      86400000 +
      1) *
      ganttColumnWidth
  );

  const [hoverSlider, setHoverSlider] = useState(false);

  useEffect(() => {
    setLeft(
      (getDateInterval(projectStart, rowData.startDate as Date) / 86400000) *
        ganttColumnWidth
    );
    setWidth(
      (getDateInterval(rowData.startDate as Date, rowData.endDate as Date) /
        86400000 +
        1) *
        ganttColumnWidth
    );
  }, [rowData.startDate, rowData.endDate, projectStart, ganttColumnWidth]);

  const handleMove = (e: any, flag: string) => {
    e.stopPropagation();
    const srcX = e.pageX;
    document.onmousemove = (e: any) => {
      const targetX = e.pageX;
      if (flag === "start") {
        setWidth(width - (targetX - srcX));
        setLeft(left + (targetX - srcX));
      } else if (flag === "move") {
        setLeft(left + (targetX - srcX));
      } else if (flag === "end") {
        setWidth(width + (targetX - srcX));
      }

      document.onmouseup = () => {
        const days = (targetX - srcX) / ganttColumnWidth;
        let [a, b] = days.toString().split(".");
        let integer = Number(a);
        let decimal = Number(`0.${b}`);
        if (decimal >= 0.5) {
          days > 0 ? (integer += 1) : (integer -= 1);
        }

        moveSlider(index, flag, integer);
        document.onmousemove = document.onmouseup = null;
      };
    };
  };

  return (
    <div
      style={{
        borderBottom: "1px solid #F9F9F9",
        height: `${rowHeight - 1}px`,
        backgroundSize: `${ganttColumnWidth}px`,
        backgroundImage: `linear-gradient(270deg,#F9F9F9 1px,transparent 0)`,
      }}
    >
      <div
        style={{
          height: `${rowHeight - 10}px`,
          margin: "5px 0",
          marginLeft: `${left}px`,
          width: `${width}px`,
          backgroundColor: "#93B5C6",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        onMouseDown={(e) => {
          handleMove(e, "move");
        }}
        onMouseEnter={() => setHoverSlider(true)}
        onMouseLeave={() => setHoverSlider(false)}
      >
        <div
          style={{
            width: "8px",
            height: "100%",
            opacity: hoverSlider ? 1 : 0,
            backgroundColor: "#C9CCD5",
            borderTopLeftRadius: "4px",
            borderBottomLeftRadius: "4px",
            transition: 'all .3s'
          }}
          onMouseDown={(e) => {
            handleMove(e, "start");
          }}
        ></div>
        <div
          style={{
            width: "8px",
            height: "100%",
            opacity: hoverSlider ? 1 : 0,
            backgroundColor: "#C9CCD5",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            transition: 'all .3s'
          }}
          onMouseDown={(e) => {
            handleMove(e, "end");
          }}
        ></div>
      </div>
    </div>
  );
};

interface GanttRowProps {
  index: number;
  moveSlider: IMoveGantt;
  ganttColumnWidth: number;
  rowHeight: number;
  projectStart: Date;
  projectEnd: Date;
  rowData: RowData;
}

export default GanttRow;
