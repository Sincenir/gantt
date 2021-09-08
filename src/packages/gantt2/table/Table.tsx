import React, { CSSProperties } from 'react'



const SiTableStyle: CSSProperties = {
  width: '500px',
  flexGrow: 0,
  display: 'flex',
  flexDirection: 'column'
}

const SiTable: React.FC = () => {
  return (
    <div style={SiTableStyle}>
    </div>
  )
}


export default SiTable