import React from "react";

export default function Alert(props) {
    const capitalize = (word)=>{
      if (word==="danger") {
        word="error"
      }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase()+ lower.slice(1);
    }
  return (
   <div className="container my-2" style={{height:'30px', width:'40%', textAlign:'center'}}>
     {props.alert && <div style={{textAlign:'center',alignItems:'center', justifyContent:'center'}} className={`alert alert-${props.alert.type} alert-dismissible fade show d-flex justify-content-center`} role="alert">
        <strong>{capitalize(props.alert.type)}!  </strong> {props.alert.msg}
        <button
          type="button"
          className="btn"
          data-bs-dismiss="alert"
          aria-label="Close"
        >
        </button>
      </div>}
   </div>
    
  );
}
