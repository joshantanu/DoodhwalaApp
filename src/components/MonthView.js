import React from "react";

export default React.memo(function MonthView(props) {
  //console.log('monthview',props)
  const { monthData, rateBuff, rateCow } = props;

  if (monthData !== undefined) {
    let days = Object.keys(monthData);
    // console.log("keys:", days);

    let totalCow = 0;
    let totalBuff = 0;
    days.forEach((day) => {
      totalCow += eval(monthData[day].cow);
      totalBuff += eval(monthData[day].buff);
    });

    const totalCowBill = totalCow * rateCow;
    const totalBuffBill = totalBuff * rateBuff;
    const grantTotalBill = totalCowBill + totalBuffBill;
    return (
      <>
      <hr />
      <h4 className="text-center">Monthly View</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th className="text-center">Cow</th>
              <th className="text-center">Buffello</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => (
              <tr key={index}>
                <td>{day}</td>
                <td className="text-center">{monthData[day].cow}</td>
                <td className="text-center">{monthData[day].buff}</td>
              </tr>
            ))}
            <tr>
              <th>Total Liters</th>
              <th className="text-center">{totalCow}</th>
              <th className="text-center">{totalBuff}</th>
            </tr>
            <tr>
              <th>Rate</th>
              <th className="text-center">{props.rateCow}</th>
              <th className="text-center">{props.rateBuff}</th>
            </tr>
            <tr>
              <th>Total Bill</th>
              <th className="text-center">{totalCowBill}</th>
              <th className="text-center">{totalBuffBill}</th>
            </tr>
            <tr>
              <th>Grant Total</th>
              <th colSpan={2} className="text-center bg-success text-white">
                <h3>&#8377; {grantTotalBill}</h3>
              </th>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else return null;
});
