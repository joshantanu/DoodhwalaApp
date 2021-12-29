import React from "react";
import { denomination } from "../AppConst";

export default React.memo(function Qty(props) {
  const { milkType, controlClick } = props;
  const otherSize = { width: 50 };

  return (
    <>
      {denomination.map((itm, i) => (
        <div key={i}>
          <label>
            <input
              type="radio"
              value={itm}
              defaultChecked={(itm==="1")}
              name={milkType}
              onClick={controlClick}
            /> {itm}
          </label>
        </div>
      ))}
      <div>
        <input type="radio" value="0" name={milkType} onClick={controlClick} /> Other 
        <input
          type="number"
          name={milkType}
          size="2"     
          style={otherSize}
          onChange={controlClick}
        />
      </div>
    </>
  );
})
