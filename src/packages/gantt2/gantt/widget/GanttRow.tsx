import React, { useContext, useEffect, useState } from "react";
import { getDateInterval } from "../../../util/date";
import { GanttContext } from "../../content";
import { GanttDispatchTypes } from "../../interface";

const getLeft = (start: Date, end: Date, colW: number): number => {
  return (getDateInterval(start, end) / 86400000) * colW;
};

const getWidth = (start: Date, end: Date, colW: number): number => {
  return (getDateInterval(start, end) / 86400000 + 1) * colW;
};

const SiGanttRow: React.FC<{ index: number; rowData: any }> = ({
  index,
  rowData,
}) => {
  const { state, dispatch } = useContext(GanttContext);

  const [mLeft, setMLeft] = useState(
    getLeft(state.projectStart, rowData[state.startKey!], state.colWidth!)
  );
  const [width, setWidth] = useState(
    getWidth(rowData[state.startKey!], rowData[state.endKey!], state.colWidth!)
  );
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    setMLeft(
      getLeft(state.projectStart, rowData[state.startKey!], state.colWidth!)
    );
    setWidth(
      getWidth(
        rowData[state.startKey!],
        rowData[state.endKey!],
        state.colWidth!
      )
    );
  }, [
    rowData,
    state.projectStart,
    state.colWidth,
    state.startKey,
    state.endKey,
  ]);

  const handleMove = (e: any, flag: string) => {
    e.stopPropagation();
    const srcX = e.pageX;
    document.onmousemove = (e: any) => {
      const targetX = e.pageX;
      let tmpMove = targetX - srcX;

      if (flag === "start") {
        if (width - tmpMove < state.colWidth!) {
          tmpMove = width - state.colWidth!;
        }
        setWidth(width - tmpMove);
        setMLeft(mLeft + tmpMove);
      } else if (flag === "move") {
        setMLeft(mLeft + tmpMove);
      } else if (flag === "end") {
        if (width + tmpMove < state.colWidth!) {
          tmpMove = -(width - state.colWidth!);
        }
        setWidth(width + tmpMove);
      }
      document.onmouseup = () => {
        const days = tmpMove / state.colWidth!;
        let [a, b] = days.toString().split(".");
        let integer = Number(a);
        let decimal = Number(`0.${b}`);
        if (decimal >= 0.5) {
          days > 0 ? (integer += 1) : (integer -= 1);
        }

        // moveSlider(index, flag, integer);
        dispatch({
          type: GanttDispatchTypes.MoveSlider,
          payload: { index, flag, days: integer },
        });
        document.onmousemove = document.onmouseup = null;
      };
    };
  };
  return (
    <div
      style={{
        position: "relative",
        borderBottom: "1px solid #F9F9F9",
        height: `${state.rowHeight! - 6}px`,
        backgroundSize: `${state.colWidth}px`,
        backgroundImage: `linear-gradient(270deg,#F9F9F9 1px,transparent 0)`,
        paddingTop: "5px",
        zIndex: 3,
      }}
    >
      {state.scrollTop / state.rowHeight - 1 < index &&
      index < state.scrollTop / state.rowHeight + 30 ? (
        <div
          style={{
            height: `${state.rowHeight! - 10}px`,
            marginLeft: `${mLeft}px`,
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
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div
            style={{
              width: `${state.colWidth! / 3}px`,
              height: "100%",
              opacity: isHover ? 1 : 0,
              backgroundColor: "#C9CCD5",
              borderTopLeftRadius: "4px",
              borderBottomLeftRadius: "4px",
              transition: "all .3s",
            }}
            onMouseDown={(e) => {
              handleMove(e, "start");
            }}
          ></div>
          <div
            style={{
              width: `${state.colWidth! / 3}px`,
              height: "100%",
              opacity: isHover ? 1 : 0,
              backgroundColor: "#C9CCD5",
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
              transition: "all .3s",
            }}
            onMouseDown={(e) => {
              handleMove(e, "end");
            }}
          ></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SiGanttRow;
