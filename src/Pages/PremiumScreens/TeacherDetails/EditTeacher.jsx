import React, { useEffect } from "react";
import "./EditTeacher.css";
import PageTitle from "../../../Components/Loader/Other/PageTitle";
import { themeContext } from "../../../Context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL4009, errorMessage, successMessage } from "../../../Service/ApiService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { Toaster } from "react-hot-toast";


export default function EditTecher() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [adress, setAdress] = useState('')
  const [dob, setDob] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isCalVisible, setCalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [isCityListVisible, setCityListVisible] = useState(false);
  const [isLevelVisible, setLevelVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [uploadCertificate, setUploadCertificate] = useState('')
  const [designation, setDesignation] = useState('')
  const [dob1, setDob1] = useState(new Date()); 
  const [open, setOpen] = useState(false); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [nationality,setNationality] = useState([])
  const [selectedCity1, setSelectedCity1] = useState('');
  const [isCityListVisible1, setCityListVisible1] = useState(false);


  useEffect(() => {
    getTeacher();
    getNationality();
    getLevel();
  }, []);

  const getTeacher = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+ token);

    var raw = JSON.stringify({
      "user_id": user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "get_TeacherProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setFirstName(result.response[0].firstName)
        setLastName(result.response[0].lastName)
        setEmail(result.response[0].email)
        setDob(result.response[0].DOB)
        setSelectedCity(result.response[0].nationality)
        setAdress(result.response[0].address)
        setPhoneNumber(result.response[0].phoneNumber)
        setSelectedCity1(result.response[0].levelOfCertification)
        if (result?.response[0]?.DOB) {
          const dobParts = result.response[0].DOB.split('/');
          if (dobParts.length === 3) {
            const month = parseInt(dobParts[0], 10);
            const day = parseInt(dobParts[1], 10);
            const year = parseInt(dobParts[2], 10);
            const dobDate = new Date(year, month - 1, day); // Month is zero-based
            if (!isNaN(dobDate.getTime())) {
              // Date is valid
              setDob1(dobDate);
            } else {
              console.error('Invalid date format:', result.userdata.DOB);
            }
          } else {
            console.error('Invalid date format:', result.userdata.DOB);
          }
        }
      })
      .catch(error => console.log('error', error));
  }

  const [cities, setCities] = useState([]);

  const [levels, setLevels] = useState([]);

  const getLevel = async () => {
    const token= localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "getlevelofcertify", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setLevels(result?.response)
      })
      .catch(error => console.log('error', error));
  }

  const getNationality = async () => {
    const token= localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(API_URL4009 + "getnationality", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setNationality(result?.response)
      })
      .catch(error => console.log('error', error));
  }

  const formatDate = (date) => {
    const validDate = new Date(date); // Convert input to Date object
    return `${validDate.getMonth() + 1}/${validDate.getDate()}/${validDate.getFullYear()}`;
  };

  const handleCalenderClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle date selection and close date picker
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setDob1(date.toDateString()); // Optional: Set the DOB in the input
    setShowDatePicker(false); // Close the date picker after selection
  };

  const toggleCityList = () => {
    setCityListVisible(!isCityListVisible);
  };


  const handleCitySelect = (city) => {
    console.log('Selected city:', city.nationality);
    setSelectedCity(city.nationality)
    setCityListVisible(false);
  };

  const toggleCityList1 = () => {
    setCityListVisible1(!isCityListVisible1);
  };


  const handleCitySelect1 = (city) => {
    // console.log('Selected city:', city.nationality);
    setSelectedCity1(city.levelofcertify)
    setCityListVisible1(false);
  };

  const onSubmit = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+ token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "DOB": formatDate(dob1),
      "nationality": selectedCity,
      "address": adress,
      "phoneNumber": phoneNumber,
      "levelOfCertification": selectedCity1
    });

    console.log("the raw", raw)

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "edit_Teacher", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === true) {
          // ToastAndroid.show("Updated successfully..!!", ToastAndroid.SHORT);
          // navigation.replace('TeacherProfile')
          successMessage("Updated successfully..!!")
          getTeacher()
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        errorMessage("Network Error! Please try again.")
      });
  }


  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
    
      <div>
        <PageTitle title={"EDIT TEACHER DETAILS"} />
      </div>
      <div className="overall-edit-teacher">
        <div className="teacher-title">Teacher BYT-200</div>
        <div
          className="teacher-main-container"
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}
        >
          <div className="teacher-content-1">
            FirstName
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}    
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
              }}
            />
          </div>
          <div className="teacher-content-2">
            LastName
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}    
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
              }}
            />
          </div>
          <div className="teacher-content-3">
            Email
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}    
              placeholder="ravi@gmail.com"
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
              }}
            />
          </div>
          <div className="teacher-content-4">
            Date of Birth
            <div className="inside-content">
              <input
                type="text"
                value={formatDate(dob1)}
                onChange={(event) => setDob1(event.target.value)}
                  placeholder=""
                style={{
                  backgroundColor: darkMode
                    ? "#2C2C2E"
                    : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
                }}
              />
              {/* <img loading="lazy" src={require("../../../Assets/Vector (4).png")} alt="" /> */}
              {!showDatePicker && (
                <img
                  loading="lazy"
                  src='/assets/Vector (4).png'
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={handleCalenderClick}
                />
              )}
              {showDatePicker && (
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateSelect} 
                  dateFormat="MMMM d, yyyy"
                  inline
                />
              )}
            </div>
          </div>
          <div className="teacher-content-5">
            Nationality
            <div className="inside-content-1" onClick={toggleCityList}>
              <input
                type="text"
                value={selectedCity}
                placeholder="Indian"
                style={{
                  backgroundColor: darkMode
                    ? "#2C2C2E"
                    : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
                }}
              />
              <img loading="lazy" src='/assets/Vector (3).png' alt="" />
              
            </div>
            {isCityListVisible && (
        <div className="city-list3" style={{backgroundColor:darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)"}}>
          {nationality.map((city) => (
            <div
              className="city-item3"
              key={city._id}
              onClick={() => handleCitySelect(city)}
              style={{color: darkMode ? "#d8d8df" :  "#2C2C2E"}}
            >
              {city.nationality}
            </div>
          ))}
        </div>
      )}
          </div>
          <div className="teacher-content-6">
            Address
            <input
              type="text"
              value={adress}
              onChange={(event) => setAdress(event.target.value)}    
              placeholder=""
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
              }}
            />
          </div>
          <div className="teacher-content-7">
            Phone Number
            <input
              type="text"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}    
              placeholder="9999999999"
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
              }}
            />
          </div>
          <div className="teacher-content-8">
            Level of Certification
            <div className="inside-content-1" onClick={toggleCityList1}>
              <input
                type="text"
                value={selectedCity1} 
                placeholder="10"
                style={{
                  backgroundColor: darkMode
                    ? "#2C2C2E"
                    : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
                }}
              />
              <img loading="lazy" src='/assets/Vector (3).png' alt="" />
            </div>
            {isCityListVisible1 && (
        <div className="city-list3" style={{backgroundColor:darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)"}}>
          {levels?.map((city) => (
            <div
              className="city-item3"
              key={city._id}
              onClick={() => handleCitySelect1(city)}
              style={{color: darkMode ? "#d8d8df" :  "#2C2C2E"}}
            >
              {city.levelofcertify}
            </div>
          ))}
        </div>
      )}
          </div>

        </div>
        <div className='teacher-btn' onClick={onSubmit}>Update</div>
      </div>
    </>
  );
}
