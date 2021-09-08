import React, { createContext, useReducer } from "react";
import { GanttAction, GanttDispatchTypes, IInitialState } from "./interface";
import { dateCalculate, getDateList } from "../util/date";

const initialState: IInitialState = {
  data: [],
  startKey: "startDate",
  endKey: "endDate",
  rowKey: "id",
  expandAll: true,
  headerHeight: 60,
  rowHeight: 32,
  colWidth: 32,
  levelColor: [],
  showToday: true,
  showWeekend: true,
  projectStart: new Date(),
  projectEnd: new Date(),
  dateList: [],
  tableColumn: [
    {
      title: "工作",
      key: "name",
      width: 100,
    },
    {
      title: "标签",
      key: "label",
      width: 100,
    },
  ],
  scrollTop: 0,
  scrollLeft: 0
};

const GanttContext = createContext<{
  state: IInitialState;
  dispatch: React.Dispatch<GanttAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const ganttReducer = (state: IInitialState, action: GanttAction) => {
  const {
    data,
    startKey,
    endKey,
    expandAll,
    headerHeight,
    rowHeight,
    colWidth,
    levelColor,
    showToday,
    showWeekend,
  } = state;

  switch (action.type) {
    case GanttDispatchTypes.initData: {
      return {
        ...state,
        data: [...action.payload.initData],
      };
    }
    case GanttDispatchTypes.MoveSlider: {
      const { index, flag, days } = action.payload;
      let tmp = [...data];
      if (flag === "start") {
        tmp[index][startKey] = dateCalculate(tmp[index][startKey] as any, days);
      } else if (flag === "move") {
        tmp[index][startKey] = dateCalculate(tmp[index][startKey] as any, days);
        tmp[index][endKey] = dateCalculate(tmp[index][endKey] as any, days);
      } else if (flag === "end") {
        tmp[index][endKey] = dateCalculate(tmp[index][endKey] as any, days);
      }
      return {
        ...state,
        data: tmp,
      };
    }
    case GanttDispatchTypes.ChangeProjectDate: {
      const { start, end } = action.payload;
      return {
        ...state,
        dateList: getDateList(start, end),
        projectStart: start,
        projectEnd: end,
      };
    }

    case GanttDispatchTypes.ChangeScrollPosition: {
      const { left, top } = action.payload;
      return {
        ...state,
        scrollTop: top,
        scrollLeft: left
      }
    }
  }
  return state;
};

const GanttProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(ganttReducer, initialState);
  return (
    <GanttContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GanttContext.Provider>
  );
};

export { GanttProvider, GanttContext };
