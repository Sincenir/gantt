import React from 'react'
import './table.css'
import SiTableHeader from './widget/TableHeader'
import SiTableContent from './widget/TableContent'


const SiTable: React.FC = () => {
  return (
    <div className='table--container'>
      <SiTableHeader></SiTableHeader>
      <SiTableContent></SiTableContent>
    </div>
  )
}


export default SiTable