import React, { useEffect, useState } from "react";
import "./TeacherExperienceForm.css";
import PageTitle from "../../../Components/Loader/Other/PageTitle";
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import {
  API_URL4009,
  API_URL4010,
  errorMessage,
  successMessage,
} from "../../../Service/ApiService";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import { useLocation } from "react-router-dom";

export default function ExperienceForm() {
  const location=useLocation();
  const {id,School,Designation,StartDate,EndDate,Address,WebsiteLink}=location.state || {};

  // console.log(id);
  

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [dob, setDob] = useState(StartDate);
  const [dob1, setDob1] = useState(EndDate);
  const [isCalVisible, setCalVisible] = useState(false);
  const [isCalVisible1, setCalVisible1] = useState(false);
  const [selectedCity, setSelectedCity] = useState(Designation);
  const [isCityListVisible, setCityListVisible] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [link, setLink] = useState(WebsiteLink);
  const [adress, setAdress] = useState(Address);
  const [school, setSchool] = useState(School);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePicker1, setShowDatePicker1] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(null);


  const AddTeachingExperience =  () => {
    // SetIsLoading(true)
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "school": school,
      "designation": selectedCity,
      "startDate": dob,
      "endDate": dob1,
      "location": adress,
      "webSite": link
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(API_URL4009 + "addTeachingExperience", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          // SetIsLoading(false)
          // ToastAndroid.show("Added successfully..!!", ToastAndroid.SHORT);
          // navigation.replace('TeachingExperience')
          successMessage("Added successfully..!!");
        } else {
          // SetIsLoading(false)
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message);
        }
      })
      .catch((error) => {
        // SetIsLoading(false)
        console.log("error", error);
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        errorMessage("Network Error! Please try again.");
      });
  };

  const editTeachingExp = async () => {
    // SetIsLoading(true)
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      _id: id,
      school: school,
      designation: selectedCity,
      startDate: dob1,
      endDate: dob,
      location: adress,
      webSite: link,
    });
    // console.log("raw",raw)

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4009 + "editTeachingExperience", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === true) {
          // SetIsLoading(false)
          // ToastAndroid.show("Updated successfully..!!", ToastAndroid.SHORT);
          // navigation.replace('TeachingExperience')
          successMessage("Updated successfully..!!");
        } else {
          // SetIsLoading(false)
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message);
        }
      })
      .catch((error) => {
        // SetIsLoading(false)
        console.log("error", error);
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        successMessage("Network Error! Please try again.");
      });
  };

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


  return (
    <>
      <Toaster
        toastOptions={{
          style: { backgroundColor: "#222122", color: "#fff" },
        }}
        reverseOrder={true}
      />

      <div>
        <PageTitle title={"Teaching Experience"} />
      </div>
      <div className="overall-ex-form-margin">
        <div className="ex-form-title">Teacher - BYT - 200</div>
        <div
          className="ex-form-main-container"
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}
        >
          <div className="ex-form-content">
            School
            <input
              type="text"
              value={school}
              onChange={(event) => setSchool(event.target.value)}
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",
                border: "none",
                color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize: 16,
              }}
            />
          </div>
          <div className="ex-form-content">
            Designation
            {/* <div className="inside-ex-form-2"> */}
              <input
                type="text"
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
                style={{
                  backgroundColor: darkMode
                    ? "#2C2C2E"
                    : "rgba(236, 236, 236, 1)",
                  border: "none",
                  color: darkMode ? "#d8d8df" : "#2C2C2E",
                  fontSize: 16,
                }}
              />
              {/* <img
                loading="lazy"
                src={require("../../../../Assets/Vector (3).png")}
                alt=""
              />
            </div> */}
          </div>
          <div className="ex-form-content">
            Start Date
            <div className="inside-ex-form">
              <input
                type="text"
                value={dob1}
                onChange={(event) => setDob1(event.target.value)}
                style={{
                  backgroundColor: darkMode
                    ? "#2C2C2E"
                    : "rgba(236, 236, 236, 1)",
                  border: "none",
                  color: darkMode ? "#d8d8df" : "#2C2C2E",
                  fontSize: 16,
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
                  onChange={handleDateSelect1} // Close after date is selected
                  dateFormat="MMMM d, yyyy"
                  inline
                />
              )}
            </div>
          </div>
          <div className="ex-form-content">
            End Date
            <div className="inside-ex-form">
              <input
                type="text"
                value={dob}
                onChange={(event) => setDob(event.target.value)}
                style={{
                  backgroundColor: darkMode
                    ? "#2C2C2E"
                    : "rgba(236, 236, 236, 1)",
                  border: "none",
                  color: darkMode ? "#d8d8df" : "#2C2C2E",
                  fontSize: 16,
                }}
              />
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
                  onChange={handleDateSelect} // Close after date is selected
                  dateFormat="MMMM d, yyyy"
                  inline
                />
              )}
            </div>
          </div>
          <div className="ex-form-content">
            Address
            <input
              type="text"
              value={adress}
              onChange={(event) => setAdress(event.target.value)}
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",
                border: "none",
                color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize: 16,
              }}
            />
          </div>
          <div className="ex-form-content">
            Website Link
            <input
              type="text"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              style={{
                backgroundColor: darkMode
                  ? "#2C2C2E"
                  : "rgba(236, 236, 236, 1)",
                border: "none",
                color: darkMode ? "#d8d8df" : "#2C2C2E",
                fontSize: 16,
              }}
            />
          </div>
        </div>
        <div className="ex-form-btn"
          onClick={() => {
            if (id === undefined) {
              AddTeachingExperience();
            } else {
              editTeachingExp();
            }
          }}
        
        >{id === undefined ? 'Save' : 'Update'}</div>
      </div>
    </>
  );
}
