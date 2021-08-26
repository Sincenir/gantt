import React from "react";
import { getDateInterval } from "../../../../util/date";
import { RowData } from "../../../root";

const GanttRow: React.FC<GanttRowProps> = (props) => {
  const { rowHeight, ganttColumnWidth, rowData, projectStart } = props;
  console.log(getDateInterval(rowData.startDate as Date, rowData.endDate as Date) / 86400000);
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
          marginLeft: `${getDateInterval(projectStart,rowData.startDate as Date) / 86400000 * ganttColumnWidth}px`,
          width: `${(getDateInterval(rowData.startDate as Date, rowData.endDate as Date) / 86400000 + 1) * ganttColumnWidth}px`,
          backgroundColor: "#93B5C6",
          borderRadius: "4px",
        }}
      ></div>
    </div>
  );
};

interface GanttRowProps {
  ganttColumnWidth: number;
  rowHeight: number;
  projectStart: Date;
  projectEnd: Date;
  rowData: RowData;
}

export default GanttRow;
