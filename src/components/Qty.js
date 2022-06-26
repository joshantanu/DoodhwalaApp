import React from "react";
import { denomination } from "../AppConst";

export default React.memo(function Qty(props) {
  const { milkType, controlClick, rate } = props;
  const otherSize = { width: 50 };

  return (
    <>
      {denomination.map((itm, i) => (
        <div key={i} className="p-1">
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
      <div className="p-1">
        <input type="radio" value="0" name={milkType} onClick={controlClick} /> Other 
        <input
          type="number"
          name={milkType}
          size="2"     
          style={otherSize}
          onChange={controlClick}
        />
      </div>
      <div className="p-1">
        Rate 
        <input
          type="number"
          name={`${milkType}_rate`}
          defaultValue={rate[milkType]}
          size="2"     
          style={otherSize}
          onChange={controlClick}
        />
      </div>
    </>
  );
})
