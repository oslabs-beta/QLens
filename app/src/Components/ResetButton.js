import React from "react";

const ResetButton = ({resetBtn}) => {
 return (
  <div>
   <button className="resetButton" type="reset" onClick={resetBtn}> RESET </button>
  </div>
 );
};

export default ResetButton;
