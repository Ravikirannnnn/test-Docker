import React, { useEffect, useState } from "react";
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./SideNotification.css";
import { FormControlLabel } from '@material-ui/core';
import Switch from '@mui/material/Switch';
import { API_URL4004 } from "../../../Service/ApiService";

export default function SideNotification() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [notification,setNotification]=useState();
  const [announcement,setAnnouncement]=useState();
  const [lesson,setLesson]=useState()
  const [reccomended,setReccomendation]=useState();

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  console.log(notification,announcement,lesson,'fffffff',reccomended)
  useEffect(() => {
    NotificationFetch()
  }, []);

  const NotificationFetch=()=>{
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization","Bearer " + token);

const raw = JSON.stringify({
  "user_id": user_id,
  "announcementNotificationEnabled": announcement,
  "lessionCompletedNotificationEnabled": lesson,
  "adminNotificationEnabled": notification,
  "subCategoryCourseNotificationEnabled": reccomended
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(API_URL4004 + "toggleNotification", requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result)
    if(result.status===true){
      setNotification(result.data.adminNotificationEnabled);
      setAnnouncement(result.data.announcementNotificationEnabled);
      setLesson(result.data.lessionCompletedNotificationEnabled);
      setReccomendation(result.data.courseNotificationEnabled)
    } 
  })
  .catch((error) => console.error(error));
  }

  const handleNotificationChange = () => {
    const updatedNotification = !notification;
    setNotification(updatedNotification);
    updateNotificationState("adminNotificationEnabled", updatedNotification);
  };

  const handleReccomendedChange = () => {
    const updatedReccomended = !reccomended;
    setReccomendation(updatedReccomended);
    updateNotificationState("subCategoryCourseNotificationEnabled", updatedReccomended);
  };
  
  const handleAnnouncementChange = () => {
    const updatedAnnouncement = !announcement;
    setAnnouncement(updatedAnnouncement);
    updateNotificationState("announcementNotificationEnabled", updatedAnnouncement);
  };
  
  const handleLessonChange = () => {
    const updatedLesson = !lesson;
    setLesson(updatedLesson);
    updateNotificationState("lessionCompletedNotificationEnabled", updatedLesson);
  };
  
  const updateNotificationState = (type, value) => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
  
    const payload = {
      user_id: user_id,
      announcementNotificationEnabled: announcement,
      lessionCompletedNotificationEnabled: lesson,
      adminNotificationEnabled: notification,
      subCategoryCourseNotificationEnabled: reccomended,
      [type]: value // Overwrite the specific type with the new value
    };
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow"
    };
  
    fetch(API_URL4004 + "toggleNotification", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (!result.status) {
          console.error("Failed to update notification state.");
        }
      })
      .catch((error) => console.error("Error updating notification:", error));
  };

  return (
    <div className='notify-main-container'>
      <div className="edit-profile-flex-start-015">
        <div
          className="left-arrow-main-015"
          onClick={handleBack}
          style={{ backgroundColor: darkMode ? "#2C2C2E" : " #d8d8df" }}
        >
          <div className="edit-profile-left-arrow-015">
            <img src='/assets/rightwel.png' alt="" />
          </div>
        </div>
        <div className="edit-profile-title-015">Notification</div>
      </div>
      <div className="notify-contents-container" style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df"}}>
        {/* <div className="notify-title-container"> 
          <div className="notify-top-title"> Social Media Links</div>
          <div className="notify-top-title-arrow">
            <img src={require('../../../Assets/Vector (3).png')} alt="" />
          </div>
        </div> */}
        
        <div className="notify-row-1">
          <div className="notify-content-1">Recommendations</div>
          <div  className='switch-icon-1' > 
              <FormControlLabel style={{Color:'red'}}
                  control={<Switch
                    checked={reccomended} onChange={handleReccomendedChange}

                     />}    
                /> 
                 </div>
        </div>
        <div className="notify-row-2">
          <div className="notify-content-2">Promotional</div>
          <div  className='switch-icon-2' > 
              <FormControlLabel style={{Color:'red'}}
                  control={<Switch
                     checked={notification} onChange={handleNotificationChange}
                     />}  
                /> 
                 </div>
        </div>

        <div className="notify-row-3">
          <div className="notify-content-3">Course Complete</div>
          <div  className='switch-icon-3' > 
              <FormControlLabel style={{Color:'red'}}
                  control={<Switch
                    checked={lesson} onChange={handleLessonChange}
                     />}  
                /> 
                 </div>
        </div>

        {/* <div className="notify-row-4">
          <div className="notify-content-4">Events</div>
          <div  className='switch-icon-4' > 
              <FormControlLabel className="form-label-4"
                  control={<Switch className="switch-4"
                    //  checked={''} onChange={''} 
                     />}  
                /> 
                 </div>
        </div> */}

        <div className="notify-row-5">
          <div className="notify-content-5">Announcements</div>
          <div  className='switch-icon-5' > 
              <FormControlLabel style={{Color:'red'}}
                  control={
                    
                  <Switch
                    checked={announcement} onChange={handleAnnouncementChange} 
                     />}  
                /> 
                 </div>
        </div>
      </div>
    </div>
  )
}
