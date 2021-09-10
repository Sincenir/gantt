import React, { useContext, useEffect, useRef, useState } from "react";
import { GanttContext } from "../../content";
import SiGanttRow from "./GanttRow";
import "./ganttContent.css";
import { GanttDispatchTypes } from "../../interface";
import { createDate } from "../../../util/date";

const SiGanttContent: React.FC = () => {
  const contentEl = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(GanttContext);
  const [weekendList, setWeekendList] = useState<Array<number>>([]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    dispatch({
      type: GanttDispatchTypes.ChangeScrollPosition,
      payload: {
        left: contentEl.current?.scrollLeft ?? 0,
        top: contentEl.current?.scrollTop ?? 0,
      },
    });
  };

  useEffect(() => {
    const r = [];
    if (state.showWeekend) {
      const sd = createDate(state.projectStart);
      let d = sd.getDay();
      let i = 0;

      // start is Sunday
      if (d === 0) {
        r.push(d);
        d += 6;
        i += 6;
      }

      // start is work day
      while (d > 0 && d < 6) {
        d++;
        i++;
      }

      // Cycle to find Saturday and Sunday
      while (i < state.dateList.length) {
        r.push(i);
        r.push(++i);
        ++d;
        d += 6;
        i += 6;
      }
    }

    setWeekendList(r);
  }, [state.projectStart, state.dateList, state.showWeekend]);

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
          position: "relative",
        }}
      >
        {state.data.map((v, i) => {
          return <SiGanttRow key={v[state.rowKey!]} index={i} rowData={v} />;
        })}
        <div
          className="gantt-content--today"
          style={{ left: `${state.todayLeft}px`, width: `${state.colWidth}px` }}
        ></div>
        {weekendList.map((v) => {
          return (
            <div
              key={v}
              className="gantt-content--weekend"
              style={{
                left: `${v * state.colWidth}px`,
                width: `${state.colWidth}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SiGanttContent;
