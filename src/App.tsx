import "./App.css";
// import { CompA, CompB } from './packages/index'
import SiGantt, { RowData } from "./packages/gantt/root";

function App() {
  const tmp: RowData = {
    id: 1,
    startDate: new Date(),
    endDate: new Date(),
    children: [],
  };

  const data: RowData[] = [];
  for (let index = 0; index < 10; index++) {
    if (index % 2 === 0) {
      data.push({
        ...tmp,
        id: index
      })
    } else {
      data.push({
        ...tmp,
        id: index,
        startDate: new Date((new Date().getTime() + (86400000 * 5))),
        endDate: new Date((new Date().getTime() + (86400000 * 10)))
      })
    }

  }
  return (
    <div className="App">
      {/* <CompA></CompA>
      <CompB></CompB> */}
      <SiGantt data={data} rowKey="id"></SiGantt>
    </div>
  );
}

export default App;
