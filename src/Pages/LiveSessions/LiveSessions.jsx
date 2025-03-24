import React, { useEffect } from 'react'
import './LiveSessions.css'
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { useState,useContext } from 'react';
import { API_URL4004, errorMessage, ImagePath, successMessage } from '../../Service/ApiService';
import Modal from '../../Components/Loader/Modal/Modal';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import moment from 'moment-timezone';
import { Navigate, useNavigate } from 'react-router-dom';
import { themeContext } from "../../Context";
import InfoCard from '../../Components/InfoCard/InfoCard';


export default function LiveSessions() {
  const [activeDay, setActiveDay] = useState(null);
  const [data,setData]=useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [bookingModal,setBookingModal]=useState(false)
  const [selectedId,setSelectedId]=useState(null);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userData = useSelector((state) => state.userReducer);
  const navigate=useNavigate();
  const theme = useContext(themeContext);
const darkMode = theme.state.darkMode;
  const isCurrentTimeInRange = (startTime, endTime, date, month, year, timeZone) => {
    // Format the start and end times in the given time zone
    const start = moment.tz(`${year}-${month}-${date} ${startTime}`, 'YYYY-MM-DD hh:mm A', timeZone);
    const end = moment.tz(`${year}-${month}-${date} ${endTime}`, 'YYYY-MM-DD hh:mm A', timeZone);
    const now = moment().tz(timeZone); // Current time in the given time zone
  
    return now.isBetween(start, end);
  };
  const getUserTimeZone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
 };

 const userTimeZone = getUserTimeZone();

 const LiveClassesPath=()=>{
  navigate('/GetLiveSessions')
 }
  const openBookingModal=()=>{
    setBookingModal(true)
  }
  const closeBookingModal=()=>{
    setBookingModal(false)
  }
useEffect(()=>{
  fetchSessions()
},[])
console.log(data,'ssesspm')
  const fetchSessions=()=>{
    const user_id=localStorage.getItem('user_id')
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch(`${API_URL4004}getAllLiveClass?user_id=${user_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {console.log(result)
        if(result.status===true){
          setData(result.response)
        }
      })
      .catch((error) => console.error(error));
  }

  
  const generateUpcomingDatesFromData = (data) => {

    // console.log("data",data)
    // Create a Set to store unique dates
    const dateSet = new Set();
    
    // Add all dates from the data to the Set
    data.forEach(item => {
        const dateKey = `${item.date}-${item.month}-${item.year}`;
        dateSet.add(dateKey);
    });
    
    // Convert the Set to an array of date objects
    const uniqueDates = Array.from(dateSet).map(dateKey => {
        const [date, month, year] = dateKey.split('-').map(Number);
        const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const dateObj = new Date(year, month - 1, date); // Months are 0-based
        return {
            date: date,
            day: daysOfWeek[dateObj.getDay()],
            month: month,
            year: year,
        };
    });

    // Sort dates in ascending order
    return uniqueDates.sort((a, b) => new Date(a.year, a.month - 1, a.date) - new Date(b.year, b.month - 1, b.date));
};

const upcomingDates = generateUpcomingDatesFromData(data);

const handleDatePress = (dateObj) => {
  // console.log("obj", dateObj);
  setSelectedDate(dateObj);
  setActiveDay(dateObj);
  const selectedData = data.find(item =>
      item.date === dateObj.date &&
      item.month === dateObj.month &&
      item.year === dateObj.year
  );

  // Set instructors based on the selected date
  setInstructors(selectedData ? selectedData.sessions : []);
};

useEffect(() => {
  if (data.length > 0) {
    if (data.length > 0) {
      // Generate upcoming dates from the data
      const upcomingDates = generateUpcomingDatesFromData(data);
      
      // Find the first available date and set it as the active day and selected date
      const firstDate = upcomingDates[0]; // Default to the first date in the list
      setActiveDay(firstDate);
      setSelectedDate(firstDate);
      
      // Set instructors for the first date
      const selectedData = data.find(item =>
        item.date === firstDate.date &&
        item.month === firstDate.month &&
        item.year === firstDate.year
      );
      setInstructors(selectedData ? selectedData.sessions : []);
    }
  }
}, [data]);

const convertToUserTimezone = (date, time, timezone) => {
  if (!date || !time) {
    console.error("Date or Time is missing!");
    return "Invalid Time";
  }

  try {
    // Log raw values for debugging
    console.log("Raw Date:", date, "Raw Time:", time, "Timezone:", timezone);

    // Combine the date and time
    const combinedDateTime = `${date.split("T")[0]}T${time}:00`;
    console.log("Combined DateTime:", combinedDateTime);

    // Parse the combined date and time assuming Asia/Kolkata timezone
    const kolkataDate = new Date(combinedDateTime);
    const utcTimestamp = new Date(
      kolkataDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    ).getTime();

    console.log("UTC Timestamp:", utcTimestamp);

    // Convert to the target timezone
    const targetDate = new Date(
      new Date(utcTimestamp).toLocaleString("en-US", { timeZone: timezone })
    );

    // Format the target date-time to 12-hour format (hh:mm A)
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime = targetDate.toLocaleTimeString("en-US", options);

    console.log("Converted Time:", formattedTime);
    return formattedTime;
  } catch (error) {
    console.error("Error converting time:", error);
    return "Invalid Time"; // Return a fallback error message
  }
};

const formatDate = (date) => {
  if (!date) return "Invalid Date";

  const parsedDate = moment(date);

  if (!parsedDate.isValid()) {
    console.error("Invalid Date Format:", date); // Log any issues
    return "Invalid Date";
  }

  return parsedDate.tz(timeZone).format("DD/MM/YYYY");
};

const bookSession = async (e) =>{
  e.preventDefault()
  const id = await localStorage.getItem('user_id');
  console.log(selectedId,'selecetedid')
  console.log(id,'userid')
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
  "user_id": id,
  "class_id": selectedId
  });

  const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
  };

  fetch(API_URL4004+"bookLiveClass", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
      if(result.status == true){
        
          // ToastAndroid.show('Session Booked Sucessfully',ToastAndroid.SHORT);
          setBookingModal(false);
          fetchSessions()
          successMessage("Session Booked Successfully", {
            duration: 2000, // Duration for the toast
          });
          setTimeout(() => {
            navigate('/GetLiveSessions'); // Navigate after toast
          }, 1000);
      }
      else{
        errorMessage(result.message)
          // ToastAndroid.show(result.message,ToastAndroid.SHORT);
      }
      // console.log(result)
  })
  .catch((error) => console.error(error));
}
const handlePress = (itemId) => {
  // if (userData[0]?.isSubscribed) {
      setSelectedId(itemId);
      setBookingModal(true);
    // }
};

  return (
    <div className='top-wrap'>
      <Toaster/>
      <div className='new-liv-tit'>
      {/* Live Sessions */}
      <PageTitle title={'Live Sessions'} />
      </div>
     <div className='wrap-days'>
     {upcomingDates?.map((dateObj, index) => (

        <div  key={index}
        className={`ls-days ${activeDay && activeDay.date === dateObj.date && activeDay.month === dateObj.month && activeDay.year === dateObj.year ? 'active' : ''}`}
        onClick={() => handleDatePress(dateObj)}>
        <h2>{dateObj.day}</h2>
        <p className={`ls-day ${activeDay && activeDay.date === dateObj.date && activeDay.month === dateObj.month && activeDay.year === dateObj.year ? 'active' : ''}`} style={{color:darkMode?'white':'black'}}>{dateObj.date}/{dateObj.month}</p>
       </div>
       ))}
      </div >
      {instructors?.length === 0 ? (

      <div className='info-card-new-div'>
          <InfoCard
            imageSrc='/assets/newnewplay.png'
            title=" We will keep you posted about these!"
            subtitle="Stay tuned, Our Live Yoga Classes are just around the corner."
            // buttonText="Discover Videos"
            // onButtonClick={handleVideo}
          />
         </div>
      ):(
      <div className='wrap-sss'>
      {/* {instructors?.length > 0 ? ( */}
        
                   { instructors.map((item,index) => (
     <div className='session-main-container' key={index}>
      {/* {item.sessions.map((subItem,index)=>( */}
      <div >
      <div className='session-left-container'>
        <div className='session-img'>
          <img src={ImagePath+item.instructorImg} alt="liveSession" loading='lazy' />
          <span 
          style={{
            backgroundColor:
             isCurrentTimeInRange(item.StartTime, item.endTime, item.date, item.month, item.year,userTimeZone) ? 
             '#48a81b'
              : 'transparent',
            color:darkMode ? 'white' : 
            isCurrentTimeInRange(item.StartTime, item.endTime, item.date, item.month, item.year,userTimeZone) ? 
            'white':'black',
          }}>Live</span>
        </div>
        {/* kjkjkjkjkj */}
        <div className='session-details'>
            <h3>{item.sessionName}</h3>
            <h5>{item.styleOfYoga.styleOfyoga}</h5>
            <h5>Language: {item.language}</h5>
            <h5>Booking: {item.bookedUsers.length}</h5>
            <h5>Date: {formatDate(item.classDate)}</h5>
                      <h5>
                        Start:{" "}
                        {convertToUserTimezone(
                          item.classDate,
                          item.StartTime,
                          timeZone
                        )}
                      </h5>
                      {/* kljhjkhkjh */}
                      <h5>
                        End:{" "}
                        {convertToUserTimezone(
                          item.classDate,
                          item.endTime,
                          timeZone
                        )}
                      </h5>
        </div>
      </div>
      </div>
      {/* ))} */}
      {item.isBooked === false ? (
      <div className='session-right-container'>
        <button onClick={ () => handlePress(item._id)}>Book Session</button>
      </div>
      ):(
//         <div className='session-right-container'>
//           {
//              isCurrentTimeInRange(item.StartTime, item.endTime, item.date, item.month, item.year,userTimeZone) ? 
//              <button onClick={LiveClassesPath}>Join now</button>
// :
//         <button onClick={LiveClassesPath}>Booked</button>
//       }
<div className="session-right-container">
  {isCurrentTimeInRange(item.StartTime, item.endTime, item.date, item.month, item.year, userTimeZone) ? (
    <button onClick={() => LiveClassesPath()}>Join now</button>
  ) : (
    <button onClick={() => LiveClassesPath()}>Booked</button>
  )}
</div>

      // </div>
      )}
     </div>
       ))
}
     </div>
     )}
     <Modal isOpen={bookingModal} onClose={closeBookingModal} >
      <div className='signoutbtn-00' >
        <h1>Book your live session?</h1>
      <button style={{cursor:'pointer'}} onClick={(e) => bookSession(e)}>Yes</button>
      <h5 style={{cursor:'pointer'}} onClick={closeBookingModal}>Cancel</h5>
      </div>
    </Modal>
    </div>
    
  )
}
