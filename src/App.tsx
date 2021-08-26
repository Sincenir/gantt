import './App.css';
// import { CompA, CompB } from './packages/index'
import SiGantt, { RowData } from './packages/gantt/root'

function App() {
  const data: RowData[] = [
    {
      id: '1',
      startDate: new Date(),
      endDate: new Date(),
      children: []
    }
  ]
  return (
    <div className="App">
      {/* <CompA></CompA>
      <CompB></CompB> */}
      <SiGantt data={data} rowKey='id'></SiGantt>
    </div>
  );
}

export default App;
