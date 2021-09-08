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
  tableColumn: [],
};

const GanttContext = createContext<{
  state: IInitialState;
  dispatch: React.Dispatch<GanttAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const ganttReducer = (state: IInitialState, action: GanttAction) => {
  console.log(action);
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
