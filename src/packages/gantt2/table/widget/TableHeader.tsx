import React, { useContext } from "react";
import { GanttContext } from "../../content";
import "./tableHeader.css";

const SiTableHeader: React.FC = () => {
  const { state } = useContext(GanttContext);
  return (
    <div
      className="table-header--container"
      style={{ minHeight: `${state.headerHeight}px` }}
    >
      {state.tableColumn.map((v, i) => {
        return (
          <div
            key={v.key}
            style={{
              height: "100%",
              lineHeight: `${state.headerHeight}px`,
              width: `${v.width ?? "50"}px`,
              borderRight: "1px solid #eee",
              flexGrow: i === state.tableColumn.length - 1 ? 1 : 0,
            }}
          >{v.title}</div>
        );
      })}
    </div>
  );
};

export default SiTableHeader;
