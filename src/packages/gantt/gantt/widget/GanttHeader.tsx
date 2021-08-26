import React, { CSSProperties } from "react";
import "./ganttHeader.css";

const ganttHeaderStype: CSSProperties = {
  flexGrow: 0,
  fontSize: '12px',
  border: '1px solid #eee'
};

const GanttHeader: React.FC<GanttHeaderProps> = (props) => {
  const { dateList, ganttColumnWidth, headerHeight } = props;

  return (
    <div style={{ ...ganttHeaderStype, height: `${headerHeight}px` }}>
      <div className="gantt-header-days">
        {dateList.map((v, i) => (
          <div
            key={v}
            className="gantt-header-day"
            style={{ marginTop: `${headerHeight / 2}px`, minWidth: `${ganttColumnWidth}px` }}
          >
            {v.slice(8, 10)}
            {i === 0 || v.slice(8, 10) === "01" ? (
              <span className="gantt-header-month">{v.slice(0, 7)}</span>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface GanttHeaderProps {
  dateList: Array<string>;
  ganttColumnWidth: number;
  headerHeight: number;
}

export default GanttHeader;
