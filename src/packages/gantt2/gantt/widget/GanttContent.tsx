import React, { useContext } from 'react'
import { GanttContext } from '../../content'
import SiGanttRow from './GanttRow'
import './ganttContent.css'


const SiGanttContent: React.FC = () => {
  const {state} = useContext(GanttContext)
  return (
    <div className='gantt--content__container'>
      <div style={{
        height: `${state.rowHeight! * state.data.length}px`,
        width: `${state.colWidth! * state.dateList.length}px`
      }}>
        {
          state.data.map((v, i) => {
            return (
              <SiGanttRow key={v[state.rowKey!]} index={i} rowData={v} />
            )
          })
        }
      </div>
    </div>
  )
}


export default SiGanttContent