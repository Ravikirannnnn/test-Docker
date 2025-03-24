import React, { useEffect } from 'react'
import './Iteach.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from "../../../Context";
import { useContext, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { API_URL4009, API_URL4010, errorMessage, successMessage } from '../../../Service/ApiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function ITeach() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [dob, setDob] = useState('')
  const [dob1, setDob1] = useState('')
  const [isCalVisible, setCalVisible] = useState(false);
  const [isCalVisible1, setCalVisible1] = useState(false);
  const [styleOfYoga, setStyleOfYoga] = useState([]);
  const [isStyleOfYogaVisible, setIsStyleOfYogaVisible] = useState(false);
  const [teachingHours, setTeachingHours] = useState('');
  const [note, setNote] = useState('')
  const [students, setStudents] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [style, setSelectedStyle] = useState([]); // Initialize as an array
  const [isStyleListVisible, setStyleListVisible] = useState(false);
   const [style1, setSelectedStyle1] = useState('');
   const [isStyleListVisible1, setStyleListVisible1] = useState(false);



  useEffect(() => {
    getWeteach();
    getStyleofYoga();
    gethours();
  }, [])

  const getWeteach = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "user_id": user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "get_iTeach", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("get_iTeach", result);
        if (result.status == true) {
          setDob(result.response?.startDate);
          setDob1(result.response?.endDate);
          setStudents(result.response?.noOfStudents);
          setNote(result.response?.notes);
          setSelectedStyle(result.response?.styleOfYoga??[]);
          setTeachingHours(result.response?.teachingHours);
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.LONG);
        }
      })
      .catch(error => {
        console.log('error', error)
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.LONG);
      });
  }

  const getStyleofYoga = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    // var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      // body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "getStyleofYoga", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setyogaStyle(result?.response)
      })
      .catch(error => console.log('error', error));
  }

  const [yogaStyle, setyogaStyle] = useState([])

  const [cities1, setGetHrs] = useState([]);

  const gethours =async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");
    console.log(token);
    
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(API_URL4009 + "getteachingHours", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setGetHrs(result?.response)
      })
      .catch(error => console.log('error', error));
  }

  const handleCalenderClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle date selection and close date picker
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setDob(date.toDateString()); // Optional: Set the DOB in the input
    setShowDatePicker(false); // Close the date picker after selection
  };

  const handleCalenderClick1 = () => {
    setShowDatePicker1(!showDatePicker1);
  };

  // Handle date selection and close date picker
  const handleDateSelect1 = (date) => {
    setSelectedDate1(date);
    setDob1(date.toDateString()); // Optional: Set the DOB in the input
    setShowDatePicker1(false); // Close the date picker after selection
  };

  const handleStyleSelect = (style1) => {
    console.log("Selected style:", style1);
  
    // Check if the style is already selected
    const index = style.findIndex((item) => item === style1);
    console.log("Index of selected style:", index);
  
    if (index === -1) {
      // If the style is not already selected, add it to the array
      setSelectedStyle([...style, style1]);
    } else {
      // If the style is already selected, remove it from the array
      const updatedStyles = [...style];
      updatedStyles.splice(index, 1);
      setSelectedStyle(updatedStyles);
    }
  
    setStyleListVisible(false);
  };
  
  const toggleStyleList = () => {
    setStyleListVisible(!isStyleListVisible);
  };
    
  const handleStyleSelect1 = (city) => {
    setSelectedStyle1(city.styleOfyoga)
    setStyleListVisible1(false);
  };

  const toggleStyleList1 = () => {
    setStyleListVisible1(!isStyleListVisible1);
  };

  const addWeteach = async () => {
    // setIsLoading(true);
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    var raw = JSON.stringify({
      "user_id": user_id,
      "startDate": dob1,
      "endDate": dob,
      "styleOfYoga": style,
      "teachingHours": style1,
      "noOfStudents": students,
      "notes": note
    });

    console.log(raw);
    

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "add_iTeach", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("add_iTeach", result)
        if (result.message == "iTeach updated successfully") {
          // setIsLoading(false);
          // navigation.navigate('SchoolProfile')
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          successMessage(result.message)
        }
        else {
          // setIsLoading(false);
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        // setIsLoading(false);
        // ToastAndroid.show('Network Eror! Please try again.', ToastAndroid.SHORT);
        errorMessage("Network Eror! Please try again.")
      });
  }

  return (
    <>
     <Toaster
        toastOptions={{
          style: { backgroundColor: "#222122", color: "#fff" },
        }}
        reverseOrder={true}
      />

    <div>
      <PageTitle title={'We Teach'}/>
    </div>
    <div className="overall-edit-teacher-vt">
    <div className="teacher-title-vt">Teacher BYT-200</div>
    <div
      className="teacher-main-container-vt"
      style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}
    >
      <div className="teacher-content-4-vt">
        Start Date
        <div className="inside-content-vt">
          <input
            type="text"
            placeholder=""
            value={dob1}
            onChange={(event) => setDob1(event.target.value)}
            style={{
              backgroundColor: darkMode
                ? "#2C2C2E"
                : "rgba(236, 236, 236, 1)",
                color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize:16
            }}
          />
            {!showDatePicker1 && (
                <img
                  loading="lazy"
                  src='/assets/Vector (4).png'
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={handleCalenderClick1}
                />
              )}
              {showDatePicker1 && (
                <DatePicker
                  selected={selectedDate1}
                  onChange={handleDateSelect1} 
                  dateFormat="MMMM d, yyyy"
                  inline
                />
              )}       
               </div>
      </div>
      <div className="teacher-content-4-vt">
        End Date
        <div className="inside-content-vt">
          <input
            type="text"
            placeholder=""
            value={dob}
                onChange={(event) => setDob(event.target.value)}
            style={{
              backgroundColor: darkMode
                ? "#2C2C2E"
                : "rgba(236, 236, 236, 1)",
                color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize:16
            }}
          />
          {!showDatePicker && (
                <img
                  loading="lazy"
                  src="/assets/Vector (4).png"
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={handleCalenderClick}
                />
              )}
              {showDatePicker && (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelect} // Close after date is selected
                  dateFormat="MMMM d, yyyy"
                  inline
                />
              )}
        </div>
      </div>
      <div className="teacher-content-1-vt" onClick={toggleStyleList}>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        Style of Yoga Practice
      <img loading="lazy" src="/assets/Vector (3).png" alt=""  />

        </div>

  {/* <div className="teacher-content-1-vt"> */}
    
    <input
      value={style.join(', ')} // Display selected styles as a comma-separated list
      type="text"
      placeholder="Yoga Trainer, Flow Yoga"
      style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        color: darkMode ? "#d8d8df" : "#2C2C2E",
        fontSize: 16
      }}
      readOnly // Make input read-only
    />
  {/* </div> */}
  {isStyleListVisible && (
    <div className="city-list" style={{ backgroundColor: darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)" }}>
      {yogaStyle.map((city) => (
        <div
          className="city-item"
          key={city._id}
          onClick={() => handleStyleSelect(city.styleOfyoga)}
          style={{
            color: darkMode ? "#d8d8df" : "#2C2C2E",
            fontWeight: style.includes(city.styleOfyoga) ? "bold" : "normal"
          }}
        >
          {city.styleOfyoga}
        </div>
      ))}
    </div>
  )}
</div>
      <div className="teacher-content-5-vt" onClick={toggleStyleList1}>
        Teaching Hours
        <div className="inside-content-1-vt" >
          <input
            type="text"
            value={style1}
            placeholder="10.00"
            style={{
              backgroundColor: darkMode
                ? "#2C2C2E"
                : "rgba(236, 236, 236, 1)",
                color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize:16
            }}
          />
          <img loading="lazy" src="/assets/Vector (3).png" alt="" />
        </div>
        {isStyleListVisible1 && (
        <div className="city-list" style={{backgroundColor:darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)"}}>
          {cities1.map((city) => (
            <div
              className="city-item"
              key={city._id}
              onClick={() => handleStyleSelect1(city)}
              style={{color: darkMode ? "#d8d8df" :  "#2C2C2E"}}
            >
              {city.styleOfyoga}
            </div>
          ))}
        </div>
      )}
      </div>
      <div className="teacher-content-1-vt">
        N0.of Students
          <input
            type="text"
            value={students}
            onChange={(event) => setStudents(event.target.value)}
            placeholder="10"
            style={{
              backgroundColor: darkMode
                ? "#2C2C2E"
                : "rgba(236, 236, 236, 1)",
                color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize:16
            }}
          />
      </div>
      <div className="teacher-content-2-vt">
        Notes
        <input
          type="text"
          value={note}
          onChange={(event) => setNote(event.target.value)}

          placeholder=""
          style={{
            backgroundColor: darkMode
              ? "#2C2C2E"
              : "rgba(236, 236, 236, 1)",
              color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize:16
          }}
        />
      </div>
</div>
    <div className='teacher-btn-vt'  onClick={addWeteach}>save</div>
  </div>
  </>
  )
}
