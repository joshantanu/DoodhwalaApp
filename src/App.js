import React, { useEffect, useState } from "react";
import DatePicker from "sassy-datepicker";
import MonthView from "./components/MonthView";
import firebase from "./firebase/config";
//import firebase, {SignInWithFirebase, LogoutWithFirebase} from "./firebase/config";
import { monthNames } from "./AppConst";
import Qty from "./components/Qty";
const db = firebase.firestore();

function App() {
  const [formData, setformData] = useState({ cow: 1, buff: 1 });
  //const [date, setDate] = useState(new Date());
  let date = new Date();
  const buildDateObj = (thisDate) => {
    const newDate = new Date(thisDate);
    let dmy = {};
    dmy.date = newDate.getDate();
    dmy.month = monthNames[newDate.getMonth()];
    dmy.year = newDate.getFullYear();
    return { ...dmy };
  };
  //let selectedDMY = buildDateObj(date);
  const [selectedDMY, setSelectedDMY] = useState(buildDateObj(date));
  const [monthlyData, setmonthlyData] = useState({});
  const [monthlyRate, setmonthlyRate] = useState({ cow: 52, buff: 64 });
  const [yearlyData, setyearlyData] = useState({});

  const filterMonthlyData = () => {
    const monthlyData = yearlyData[selectedDMY.month];
    if (monthlyData) {
      monthlyData.Rate = monthlyData.Rate || monthlyRate;
      setmonthlyRate(monthlyData.Rate);
      delete monthlyData.Rate;
      setmonthlyData(monthlyData);
    } else {
      setmonthlyData({});
    }
  };

  const fetchData = async () => {
    db.doc(`appDB/${selectedDMY.year}`)
      .get()
      .then((querySnapshot) => {
        setyearlyData(querySnapshot.data());
        //console.log(dailyData)
      });
  };
  useEffect(() => {
    filterMonthlyData();
  }, [yearlyData, selectedDMY.month]);

  useEffect(() => {
    fetchData();
  }, [selectedDMY.year]);

  const setData = () => {
    formData.cow_rate = formData.cow_rate || monthlyRate.cow;
    formData.buff_rate = formData.buff_rate || monthlyRate.buff;

    db.doc(`appDB/${selectedDMY.year}`)
      .set(
        {
          [selectedDMY.month]: {
            [selectedDMY.date]: {
              cow: formData.cow,
              buff: formData.buff,
            },
            Rate: {
              cow: formData.cow_rate,
              buff: formData.buff_rate,
            },
          },
        },
        { merge: true }
      )
      .then(() => {
        alert("Data Successfully Submitted");
        fetchData();
      });
  };

  const getFormData = (obj) => {
    let thisformData = {};
    thisformData[obj.target.name] = obj.target.value;
    //console.log(formData);
    setformData({ ...formData, ...thisformData });
  };

  const onDateChange = (thisDate) => {
    //const dmy = buildDateObj(thisDate);
    // console.log(dmy)
    //newDate = ${newDate.getFullYear()} ${monthNames[newDate.getMonth()]} ${newDate.getDate()}`);
    date = thisDate;
    setSelectedDMY(buildDateObj(thisDate));
    // selectedDMY = buildDateObj(thisDate);
    console.log(selectedDMY.month);
    // filterMonthlyData();
  };

  // const [isUserSignedIn, setisUserSignedIn] = useState();
  // firebase.auth().onAuthStateChanged((user)=>{
  //   if(user){
  //     return setisUserSignedIn(true);
  //   }
  //   setisUserSignedIn(false);
  // })

  return (
    <>
      <h3 className="p-3 mb-2 bg-info text-white">Ashtavinayak Milk App</h3>
      {/* <a href="#" onClick={SignInWithFirebase}>Login</a>
      <a href="#" onClick={LogoutWithFirebase}>Logout</a>
      // {console.log(isUserSignedIn)} |  */}

      <div className="text-center">
        <DatePicker
          onChange={onDateChange}
          selected={date}
          maxDate={new Date()}
        />
      </div>
      <br />
      {/* {console.log(yearlyData)} */}
      <table className="table">
        <tbody>
          <tr>
            <th>Cow</th>
            <th>Buffello</th>
          </tr>
          <tr>
            <td>
              <Qty
                milkType="cow"
                controlClick={getFormData}
                rate={monthlyRate}
              />
            </td>
            <td>
              <Qty
                milkType="buff"
                controlClick={getFormData}
                rate={monthlyRate}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center">
        <button onClick={setData} className="btn btn-primary">
          SUBMIT
        </button>
      </div>
      <div>
        <br />
      </div>
      <MonthView
        monthData={monthlyData}
        month={selectedDMY.month}
        rateCow={monthlyRate.cow}
        rateBuff={monthlyRate.buff}
      />
    </>
  );
}

export default App;
