import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div style={{display:"flex", justifyContent:"center", flexDirection:"column", textAlign:"center"}}>
      <img style={{height:"50vh"}} src="./404.svg" alt="" />
      <h2 style={{marginTop:"1rem"}}>PAGE NOT FOUND</h2>
      <Link to="/">
      <p style={{color:"grey"}}>Back to Home</p>
      </Link>
    </div>
  )
}

export default Error