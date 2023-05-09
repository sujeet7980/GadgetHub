import React from 'react'
import { Spinner } from 'react-bootstrap'
const loader = () => {
  return (
    <Spinner animation="border" role="status" style={{width: "100px", height:"100px",margin:"auto",display: 'block' ,marginTop: '100px'}}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default loader