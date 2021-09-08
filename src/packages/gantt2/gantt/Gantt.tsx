import React from "react";
import "./gantt.css";
import SiGanttHeader from "./widget/GanttHeader";
import SiGanttContent from "./widget/GanttContent";

const SiGantt: React.FC = () => {
  return <div className="gantt--container">
    <SiGanttHeader></SiGanttHeader>
    <SiGanttContent></SiGanttContent>
  </div>;
};

export default SiGantt;
