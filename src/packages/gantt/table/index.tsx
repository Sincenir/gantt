import React, { CSSProperties } from 'react'
import PropTypes from 'prop-types'
import { ITableColumn, RowData } from '../root'

import TableHeader from './widget/TableHeader'
import TableContent from './widget/TableContent'


const SiTableStyle: CSSProperties = {
  width: '500px',
  flexGrow: 0,
  display: 'flex',
  flexDirection: 'column'
}

const STable: React.FC<STableProps> = ({data, tableColumn, headerHeight, rowKey, rowHeight}) => {
  return (
    <div style={SiTableStyle}>
      <TableHeader
        data={tableColumn}
        headerHeight={headerHeight}
      ></TableHeader>
      <TableContent
        data={data}
        tableColumn={tableColumn}
        rowKey={rowKey}
        rowHeight={rowHeight}
      ></TableContent>
    </div>
  )
}

interface STableProps {
  data: Array<RowData>
  rowHeight: number
  headerHeight: number
  rowKey: string
  tableColumn: Array<ITableColumn>
}

STable.propTypes = {
  data: PropTypes.any,
  rowHeight: PropTypes.any,
  headerHeight: PropTypes.any,
  rowKey: PropTypes.any
}


export default STable