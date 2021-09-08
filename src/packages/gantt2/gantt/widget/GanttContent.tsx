import React, { useContext, useRef } from "react";
import { GanttContext } from "../../content";
import SiGanttRow from "./GanttRow";
import "./ganttContent.css";
import { GanttDispatchTypes } from "../../interface";

const SiGanttContent: React.FC = () => {
  const contentEl = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(GanttContext);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    dispatch({
      type: GanttDispatchTypes.ChangeScrollPosition,
      payload: {
        left: contentEl.current?.scrollLeft ?? 0,
        top: contentEl.current?.scrollTop ?? 0,
      },
    });
  };

  return (
    <div
      className="gantt--content__container"
      ref={contentEl}
      onScroll={(e) => handleScroll(e)}
    >
      <div
        style={{
          height: `${state.rowHeight! * state.data.length}px`,
          width: `${state.colWidth! * state.dateList.length}px`,
        }}
      >
        {state.data.map((v, i) => {
          return <SiGanttRow key={v[state.rowKey!]} index={i} rowData={v} />;
        })}
      </div>
    </div>
  );
};

export default SiGanttContent;
