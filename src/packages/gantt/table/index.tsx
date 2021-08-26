import React, { CSSProperties } from 'react'


const SiTableStyle: CSSProperties = {
  width: '500px',
  flexGrow: 0,
}

const SiTable: React.FC = () => {
  return (
    <div style={SiTableStyle}>SiTable</div>
  )
}

export default SiTable