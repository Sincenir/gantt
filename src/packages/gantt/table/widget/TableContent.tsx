import React from 'react'
import PropTypes from 'prop-types'

import { ITableColumn, RowData } from '../../root'
import './tableContent.css'


const TableContent: React.FC<TableContentProps> = ({ data, tableColumn, rowKey, rowHeight}) => {
  const getTableRow = () => {
    console.log(rowKey);
    return data.map(v => {
      return (
        <div key={v[rowKey]} className="table-row" style={{minHeight: `${rowHeight - 1}px`, lineHeight: `${rowHeight}px`}}>
          {tableColumn.map(col => {
            return (
              <div key={col.key} style={{width: `${col.width}px`}}>{v[col.key]}</div>
            )
          })}
        </div>
      )
    })
  }
  return (
    <div style={{backgroundColor: '#fff', flexGrow: 1, overflow: 'hidden'}}>
      {getTableRow()}
    </div>
  )
}

interface TableContentProps {
  data: Array<RowData>;
  tableColumn: Array<ITableColumn>;
  rowKey: string;
  rowHeight: number;
}

TableContent.propTypes = {
  data: PropTypes.any,
  tableColumn: PropTypes.any,
  rowKey: PropTypes.any,
  rowHeight: PropTypes.any,
}

export default TableContent