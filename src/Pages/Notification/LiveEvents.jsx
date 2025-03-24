import React, { useEffect } from 'react'
import './Notification.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from "../../Context";
import { useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL4005, ImagePath } from '../../Service/ApiService';
import { format } from 'date-fns';

export default function LiveEvents() {
  const [activeBarItem,setActiveBarItem]=useState('General');
  const [eventData,setEventData]=useState([])
  const [upcomingData,setUpcomingData]=useState([])
  const [pastData,setPastData]=useState([])
  console.log(eventData,'data',upcomingData,'dsdsdsd',pastData,'hello')
  const handleActive=(itemName)=>{
    setActiveBarItem(itemName);
  }
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  
  const navigate=useNavigate()
const pathBuyTicket=(item)=>{
navigate('/BuyTicket',{
  state:{
    arrayTicket:item
  }}
)
}

useEffect(()=>{
  EventFetch()
  upcomingTicket();
  pastTicket();
},[])
console.log(eventData,'eventData')

const EventFetch=()=>{
  const accessToken=localStorage.getItem('accessToken');
  const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${accessToken}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(API_URL4005+"get_latest_events", requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result)
    if(result.status===true){
      setEventData(result.response)
    }
  })
  .catch((error) => console.error(error));
}

const staticData = [
    {
      course_data: {
        category_id: 1,
        subcategory_img: '/assets/boys......png',
        subCatName: "Yoga",
        Duration: "60", // duration in minutes, so "60" becomes "6:0" Mins
      },
    },
    {
      course_data: {
        category_id: 2,
        subcategory_img: '/assets/boys......png',
        subCatName: "Meditation",
        Duration: "45", // duration in minutes, so "45" becomes "4:5" Mins
      },
    },
    {
      course_data: {
        category_id: 3,
        subcategory_img: '/assets/boys......png',
        subCatName: "Pilates",
        Duration: "30", // duration in minutes, so "30" becomes "3:0" Mins
      },
    },
    
  ];
  
  const upcomingTicket = async () => {
    const user_id = await localStorage.getItem('user_id');
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(API_URL4005 + 'get_upcoming_ticket/' + user_id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == true) {
          console.log(result,'upcoming');
          setUpcomingData(result.response);
        } else {
          console.log(result);
        }
      })
      .catch(error => console.error(error));
  };

  const pastTicket = async () => {
    const user_id = await localStorage.getItem('user_id');

    // const raw = '';

    const requestOptions = {
      method: 'GET',
      // body: raw,
      redirect: 'follow',
    };

    fetch(API_URL4005 + 'get_past_ticket/' + user_id, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == true) {
          setPastData(result.response);
        }
        console.log(result);
      })
      .catch(error => console.error(error));
  };

    
  return (
    <>
    <div>
      <PageTitle title={'Live Events'}/>
    </div>
    <div className='overall-not-container'>
      <div className='not-bar'
       style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}>
        <div className='not-content-01'
         style={{backgroundColor:
          activeBarItem==='General'? "#FF5F67" : undefined, 
          color: activeBarItem === "General" ? "white" : undefined,
                cursor: "pointer"
        }}
        onClick={()=>handleActive('General')}>Live</div>
        <div className='not-content-02'
         style={{backgroundColor:
          activeBarItem==='Live'? "#FF5F67" : undefined, 
          color: activeBarItem === "Live" ? "white" : undefined,
                cursor: "pointer"
        }}
        onClick={()=>handleActive('Live')}>Upcoming</div>
        <div className='not-content-03'
        style={{backgroundColor:
          activeBarItem==='Events'? "#FF5F67" : undefined, 
          color: activeBarItem === "Events" ? "white" : undefined,
                cursor: "pointer"
        }}
        onClick={()=>handleActive('Events')}
        >Past</div>
      </div>
      {activeBarItem==='General' ? (
       <div>
        {eventData.map((event, index) => (
  <div key={index} className='fav-contents-container1' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}>
    <div className='fav-img'>
      <img loading="lazy" src={ImagePath+event.image} alt="" />
    </div>
    
    {/* Flex container to align text and ticket icon horizontally */}
    <div className='fav-content-details'>
      <div className='fav-text-container'>
        <div className='fav-text'>{event.event_name}</div>
        <div className='fav-time'>
        Date: 
        {new Date(event.event_date).toLocaleDateString("en-GB")}
        </div>
      </div>

      {/* Ticket Icon Section */}
      {/* <div className='ticket-section'>
        <img src='/assets/ticket.png' alt="Ticket Icon" style={{filter:darkMode ?'':'invert(100%)'}} className='ticket-icon' />
        <span className='ticket-count'>{event.TotalTickets}{''}Tickets</span>
      </div> */}
    </div>
    
  </div>
))}

       </div>

      ):activeBarItem==='Live'?(
       <div>
            {upcomingData.map((event, index) => (
            <div key={index} className='fav-contents-container1' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} 
                
            >
                <div className='fav-img'>
                <img loading="lazy" src={event.course_data?.subcategory_img} alt="" />
                </div>
                <div className='fav-content-details'>
                <div className='fav-text-container'>
                <div className='fav-text'>{event.course_data?.subCatName}</div>
                {/* <div className='fav-time'>{`${event.course_data?.Duration?.charAt(0)}:${event.course_data?.Duration?.substring(1, 3)}`} Mins</div> */}
                </div>
                </div>
            </div>
            ))}
       </div>
      ):activeBarItem==="Events"?(
        <div>
        {pastData.map((event, index) => (
        <div key={index} className='fav-contents-container1' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} 
           
        >
            <div className='fav-img'>
            <img loading="lazy" src={event.course_data?.subcategory_img} alt="" />
            </div>
            <div className='fav-content-details'>
            <div className='fav-text-container'>
            <div className='fav-text'>{event.course_data?.subCatName}</div>
            {/* <div className='fav-time'>{`${event.course_data?.Duration?.charAt(0)}:${event.course_data?.Duration?.substring(1, 3)}`} </div> */}
            </div>
            </div>
        </div>
        ))}
        </div>
      ):('')}
    </div>
    </>
  )
}
