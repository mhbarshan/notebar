import React from 'react'
import loading from "../image/spinner.gif"
function Spinner() {
  return (
    <div className="text-center my-3">
      <h6>Loading...</h6>
      <img height={"50px"} width={"50px"} src={loading} alt="loading" />
    </div>
  )
}

export default Spinner
