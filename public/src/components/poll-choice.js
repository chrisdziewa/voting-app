import React from 'react';

export default (props) => {
  return <div className="input-group poll-choice">
    <span className="input-group-addon">
      <input type="radio" aria-label={"Choose: " + props.choice} name="choice"/>
    </span>
    <input type="text" 
      className="form-control choice-text" 
      value={props.choice} 
      aria-label={"Label for: " + props.choice}       
      disabled="disabled"
    />
  </div>
}