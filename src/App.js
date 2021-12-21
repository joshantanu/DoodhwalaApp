import React, { useEffect, useState } from "react";
import DatePicker from 'sassy-datepicker';
import MonthView from "./components/MonthView";
import firebase from "./firebase/config";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function App() {
  const [milkRatib, setmilkRatib] = useState([]);
  const [updateform, setUpdateform] = useState({cow:1,buff:1});
  const [date, setDate] = useState(new Date());
  const otherSize = {width:50}
  const buildDateObj = thisDate => {
    const newDate = new Date(thisDate);
    let dmy = {};
    dmy.date = newDate.getDate();
    dmy.month = monthNames[newDate.getMonth()];
    dmy.year = newDate.getFullYear();
    return {...dmy}
  }
  const [selectedDMY, setSelectedDMY] = useState(buildDateObj(date));
  const db = firebase.firestore();
  const fetchData = async () => {
    db.doc("appDB/2021")
      .get()
      .then((querySnapshot) => {
        let members = querySnapshot.data();
        //let dt = new Date();
        //let month = monthNames[dt.getMonth()];
        // console.log(members[month]["2"])
        setmilkRatib(members);
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
              cow: updateform.cow,
              buff: updateform.buff,
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

  const getFormData = (obj) =>{
    let formData = {}
   
    formData.[obj.target.name] = obj.target.value 
   // console.log(formData);

    setUpdateform({...updateform,...formData});
  }
  const onChange = thisDate => {
    const dmy = buildDateObj(thisDate)
    //newDate = ${newDate.getFullYear()} ${monthNames[newDate.getMonth()]} ${newDate.getDate()}`);
    setDate(thisDate);
    setSelectedDMY(dmy)

  };


  return (
    <>
     <h2>Doodh Ratib App</h2>
          <div>Select Date</div>
          <div><DatePicker onChange={onChange} selected={date}  maxDate={new Date()} /></div>
          <table className="table"><tbody>
        <tr>
          <th>Cow</th>
          <th>Buffello</th>
        </tr>
        <tr>
          <td>
          <input
              type="radio"
              value="0.5"
              name="cow"
              onClick={getFormData.bind(this)}
            />  0.5 <br/>
            <input
              type="radio"
              value="1"
              name="cow"
              defaultChecked
              onClick={getFormData.bind(this)}
            />  1 <br/>
            <input
              type="radio"
              value="1.5"
              name="cow"
              onClick={getFormData.bind(this)}
            />  1.5 <br/>
            <input
              type="radio"
              value="2"
              name="cow"
              onClick={getFormData.bind(this)}
               
            />  2<br />
            <input
              type="radio"
              value="0"
              name="cow"
              onClick={getFormData.bind(this)}
            /> Other 
            <input type="number" name="cow" size="2" style={otherSize} onChange={getFormData.bind(this)} />
          </td>
          <td>
          <input
              type="radio"
              value="0.5"
              name="buff"
              onClick={getFormData.bind(this)}
            />  0.5 <br/>
            <input
              type="radio"
              value="1"
              name="buff"
              defaultChecked
              onClick={getFormData.bind(this)}
            />  1 <br/>
            <input
              type="radio"
              value="1.5"
              name="buff"
              onClick={getFormData.bind(this)}
            />  1.5 <br/>
            <input
              type="radio"
              value="2"
              name="buff"
              onClick={getFormData.bind(this)}
            /> 2 <br />
            <input
              type="radio"
              value="0"
              name="buff"
              onClick={getFormData.bind(this)}
            /> Other  
            <input type="number" name="buff" size="2" style={otherSize} onChange={getFormData.bind(this)} />
          </td>
        </tr></tbody>
      </table>

      <button onClick={setData}>SUBMIT</button>

      <MonthView monthData={milkRatib[selectedDMY.month]} rateCow={50} rateBuff={60} />
    </>
  );
}

export default App;
