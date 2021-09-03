import React from 'react'
import PropTypes from 'prop-types'

import { ITableColumn } from '../../root'
import './tableHeader.css'



const TableHeader: React.FC<TableHeaderProps> = ({data, headerHeight}) => {
  const getHeaderCol = () => {
    if (data) {
      return data.map((v, i) => {
        return (
          <div
            key={v.key}
            style={{
              height: '100%', 
              lineHeight: `${headerHeight}px`, 
              width: `${v.width}px`, 
              borderRight: '1px solid #eee',
              flexGrow: i ===  data.length - 1 ? 1 : 0 
            }}
          >
            {v.title}
          </div>
        )
      })
    } else {
      return ''
    }
  }
  return (
    <div
      className='table-header-container'
      style={{minHeight: `${headerHeight}px`, backgroundColor: '#fff'}}
    >
      {getHeaderCol()}
    </div>
  )
}

interface TableHeaderProps {
  data: Array<ITableColumn>
  headerHeight: number
}

TableHeader.propTypes = {
  data: PropTypes.any,
  headerHeight: PropTypes.any,
}

export default TableHeader