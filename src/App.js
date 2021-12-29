import React, { useEffect, useState } from "react";
import DatePicker from 'sassy-datepicker';
import MonthView from "./components/MonthView";
import firebase from "./firebase/config";
import { monthNames } from "./AppConst";
import Qty from "./components/Qty";


function App() {
  const [ratibData, setratibData] = useState([]);
  const [formData, setformData] = useState({ cow: 1, buff: 1 });
  const [date, setDate] = useState(new Date());
 
  const buildDateObj = thisDate => {
    const newDate = new Date(thisDate);
    let dmy = {};
    dmy.date = newDate.getDate();
    dmy.month = monthNames[newDate.getMonth()];
    dmy.year = newDate.getFullYear();
    return { ...dmy }
  }
  const [selectedDMY, setSelectedDMY] = useState(buildDateObj(date));
  const db = firebase.firestore();
  const fetchData = async () => {
    db.doc(`appDB/${selectedDMY.year}`)
      .get()
      .then((querySnapshot) => {
        let members = querySnapshot.data();
        //let dt = new Date();
        //let month = monthNames[dt.getMonth()];
        // console.log(members[month]["2"])
        setratibData(members);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);


  const setData = () => {
    db.doc(`appDB/${selectedDMY.year}`)
      .set(
        {
          [selectedDMY.month]: {
            [selectedDMY.date]: {
              cow: formData.cow,
              buff: formData.buff,
            },
          },
        },
        { merge: true }
      )
      .then((docRef) => {
        alert("Data Successfully Submitted");
        fetchData();
      });
  };

  const getFormData = (obj) => {
    let thisformData = {}

    thisformData.[obj.target.name] = obj.target.value
    // console.log(formData);

    setformData({ ...formData, ...thisformData });
  }
  const onDateChange = thisDate => {
    const dmy = buildDateObj(thisDate)
    //newDate = ${newDate.getFullYear()} ${monthNames[newDate.getMonth()]} ${newDate.getDate()}`);
    setDate(thisDate);
    setSelectedDMY(dmy)

  };


  return (
    <>
      <h3>Ashtavinayak Milk App</h3>
      <label>Select Date</label>
      <div className="text-center"><DatePicker onChange={onDateChange} selected={date} maxDate={new Date()} /></div>
      <br />
      {console.log(formData)}
      <table className="table"><tbody>
        <tr>
          <th>Cow</th>
          <th>Buffello</th>
        </tr>
        <tr>
          <td>
           <Qty milkType="cow" controlClick={getFormData} />
          </td>
          <td>
          <Qty milkType="buff" controlClick={getFormData} />
          </td>
        </tr></tbody>
      </table>
      <div className="text-center">
        <button onClick={setData} className="btn btn-primary">SUBMIT</button>
      </div>
      <div><br /></div>
      <MonthView monthData={ratibData[selectedDMY.month]} rateCow={50} rateBuff={60} />
    </>
  );
}

export default App;
