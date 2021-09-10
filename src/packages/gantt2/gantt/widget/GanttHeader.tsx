import React, { useContext } from "react";
import { GanttContext } from "../../content";
import "./ganttHeader.css";

const SiGanttHeader: React.FC = () => {
  const { state } = useContext(GanttContext);
  return (
    <div
      className="gantt--header__container"
      style={{ minHeight: `${state.headerHeight}px` }}
    >
      <div
        className="gantt-header-days"
        style={{ left: `${-state.scrollLeft}px`, position: "absolute" }}
      >
        {state.dateList!.map((v, i) => (
          <div
            key={v}
            className="gantt-header-day"
            style={{
              marginTop: `${state.headerHeight! / 2}px`,
              minWidth: `${state.colWidth}px`,
            }}
          >
            {v.slice(8, 10)}
            {i === 0 || v.slice(8, 10) === "01" ? (
              <span className="gantt-header-month">{v.slice(0, 7)}</span>
            ) : (
              ""
            )}
          </div>
        ))}
        <div
          className="gantt--header--today__arrow"
          style={{ left: `${state.todayLeft + state.colWidth / 2 - 7.5}px` }}
        ></div>
      </div>
    </div>
  );
};

export default SiGanttHeader;
