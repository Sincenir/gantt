import "./App.css";
import React, { useEffect, useState } from "react";
// import { CompA, CompB } from './packages/index'
// import SiGantt, { RowData, ITableColumn } from "./packages/gantt/root";
import SiGantt from "./packages/gantt2/root";

const App: React.FC = () => {
  const [rowHeight, setRowHeight] = useState(32);
  const [colWidth, setColWidth] = useState(32);
  const [data, setData] = useState<Array<unknown>>([]);
  const tmp = {
    id: 1,
    startDate: new Date(),
    endDate: new Date(),
    children: [],
  };

  useEffect(() => {
    const tmpdata = [];
    for (let index = 0; index < 100; index++) {
      if (index % 2 === 0) {
        tmpdata.push({
          id: index,
          name: `姓名${index}`,
          label: `标签${index}`,
          startDate: new Date((new Date().getTime() + (86400000 * -5))),
          endDate: new Date((new Date().getTime() + (86400000 * -3)))
        })
      } else {
        tmpdata.push({
          id: index,
          name: `姓名${index}`,
          label: `标签${index}`,
          startDate: new Date((new Date().getTime() + (86400000 * 5))),
          endDate: new Date((new Date().getTime() + (86400000 * 10)))
        })
      }
    }
    setData(tmpdata)
  
  }, [])

  
  const colShowData = [
    {
      title: '工作',
      key: 'name',
      width: 100
    },
    {
      title: '标签',
      key: 'label',
      width: 100
    }
  ]
  return (
    <div className="App">
      {/* <CompA></CompA>
      <CompB></CompB> */}
      <div style={{width: '100%', flexGrow: 0, minHeight: '30px'}}>
        <button onClick={() => {setRowHeight(h => ( h += 2))}}>行高++</button>
        <button onClick={() => {setRowHeight(h => ( h -= 2))}}>行高--</button>
        <button onClick={() => {setColWidth(w => ( w += 2))}}>列宽++</button>
        <button onClick={() => {setColWidth(w => ( w -= 2))}}>列宽--</button>
      </div>
      {/* <SiGantt rowHeight={rowHeight} tableColumn={colShowData} ganttColumnWidth={colWidth} data={data} rowKey="id"></SiGantt> */}
      <SiGantt rowHeight={rowHeight} tableColumn={colShowData} colWidth={colWidth} data={data} rowKey="id"></SiGantt>
    </div>
  );
}

export default App;
