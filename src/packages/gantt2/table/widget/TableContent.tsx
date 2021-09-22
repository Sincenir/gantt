import React, { useContext } from "react";
import { GanttContext } from "../../content";
import "./tableContent.css";

const SiTableContent: React.FC = () => {
  const { state } = useContext(GanttContext);
  return (
    <div className="table-content--container">
      <div
        style={{
          height: `${state.rowHeight! * state.data.length}px`,
          position: "absolute",
          width: '100%',
          top: `${-state.scrollTop}px`,
        }}
      >
        {state.data.map((v, i) => {
          return (
            <div
              key={v[state.rowKey]}
              className="table-row"
              style={{
                height: `${state.rowHeight - 1}px`,
                lineHeight: `${state.rowHeight}px`,
              }}
            >
              {state.scrollTop / state.rowHeight - 1 < i &&
              i < state.scrollTop / state.rowHeight + 30
                ? state.tableColumn.map((col, ii) => {
                    return (
                      <div
                        key={col.key}
                        style={{
                          width: `${col.width ?? 50}px`,
                          flexGrow: ii === state.tableColumn.length - 1 ? 1 : 0,
                        }}
                      >
                        {v[col.key]}
                      </div>
                    );
                  })
                : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SiTableContent;
