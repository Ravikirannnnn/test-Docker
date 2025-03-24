import React, { useEffect } from "react";
import "./Notification.css";
import PageTitle from "../../Components/Loader/Other/PageTitle";
import { themeContext } from "../../Context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL4005, ImagePath } from "../../Service/ApiService";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../../redux/notificationSlice";
import InfoCard from "../../Components/InfoCard/InfoCard";
import { a } from "react-spring";
export default function Notification() {
  const [activeBarItem, setActiveBarItem] = useState("General");
  const [eventData, setEventData] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [notification, setNotification] = useState([]);
  // console.log(eventData,'data')
  const handleActive = (itemName) => {
    setActiveBarItem(itemName);
  };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const dispatch = useDispatch(); // Initialize useDispatch
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    // getFirebaseToken(setTokenFound)
    dispatch(fetchNotifications());
  }, []);
  const navigate = useNavigate();
  const pathBuyTicket = (item) => {
    navigate("/BuyTicket", {
      state: {
        arrayTicket: item,
      },
    });
  };

  useEffect(() => {
    EventFetch();
    ReadFetch();
    // getAllLives()
    fetchLiveEvents();
    genralNotification();
  }, []);

  // const getAllLives = async () => {
  //   const token= localStorage.getItem('accessToken')
  //   try {
  //     const myHeaders = new Headers();
  //     myHeaders.append("Authorization", "Bearer " + token);

  //     const requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow"
  //     };

  //     const response = await fetch(API_URL4005 + "get_live_events", requestOptions);
  //     const result = await response.json();
  //     console.log(result);

  //     return result;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  const EventFetch = () => {
    const accessToken = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(API_URL4005 + "get_latest_events", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result,'latest');
        if (result.status === true) {
          setEventData(result.response);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchLiveEvents = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(API_URL4005 + "get_live_events", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result,'live-event');
        if (result.status === true) {
          setLiveEvents(result.response);
        }
      })
      .catch((error) => console.error(error));
  };

  const genralNotification = () => {
    const user_id = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const raw = JSON.stringify({
      user_id: user_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      API_URL4005+"getNotification",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result, "notificationdata");
        if (result.status === true) {
          setNotification(result.response);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleNavigation = (data) => {
    console.log("clicked");
    dispatch(fetchNotifications());
    if (data.Type === "Teacher_form_reject") {
      navigate("/PremiumBar"); // Navigate to 'one-screen' when type is 'Teacher_form_reject'
    } else if (data.Type === "Teacher_form_approve") {
      navigate("/AccreditedCertificates");
    } else if (data.Type === "School_form_approve") {
      navigate("/AccreditedCertificates");
    } else if (data.Type === "School_form_reject") {
      navigate("/PremiumBar");
    }
    
  };

  const ReadFetch = () => {
    const user_id = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("accessToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const raw = JSON.stringify({
      user_id: user_id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4005+"markAsRead", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  // const readClick=()=>{
  //   ReadFetch()
  // }

  // console.log(liveEvents, "live");
  // console.log(eventData, "eventslive");
  // console.log(notification, "notification");

 const handleForm=(e)=>{
  e.preventDefault()
  navigate('/FeedBackForm')
 }
  return (
    <>
      <div>
        <PageTitle title={"Notification"} />
      </div>
      <div className="overall-not-container">
        <div
          className="not-bar"
          style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
        >
          <div
            className="not-content-01"
            style={{
              backgroundColor:
                activeBarItem === "General" ? "#FF5F67" : undefined,
              color: activeBarItem === "General" ? "white" : undefined,
              cursor: "pointer",
            }}
            onClick={() => handleActive("General")}
          >
            General
          </div>
          <div
            className="not-content-02"
            style={{
              backgroundColor: activeBarItem === "Live" ? "#FF5F67" : undefined,
              color: activeBarItem === "Live" ? "white" : undefined,
              cursor: "pointer",
            }}
            onClick={() => handleActive("Live")}
          >
            Live
          </div>
          <div
            className="not-content-03"
            style={{
              backgroundColor:
                activeBarItem === "Events" ? "#FF5F67" : undefined,
              color: activeBarItem === "Events" ? "white" : undefined,
              cursor: "pointer",
            }}
            onClick={() => handleActive("Events")}
          >
            Events
          </div>
        </div>
        {activeBarItem === "General" ? (
          <div className="not-gen-contents-container">
            <div className="not-gen-container-1">
              {notification && Array.isArray(notification) ? (
                notification.map((item) => (
                  <div className="not-gen-text-container-1" key={item._id}>
                    {item.notificationData &&
                    Array.isArray(item.notificationData) ? (
                      item.notificationData.map((data, idx) => (
                        <div
                          key={idx}
                          className="not-gen-text-wrapper"
                          onClick={() => handleNavigation(data)}
                        >
                          <div className="not-gen-text">
                            {item.read === false ? <span>.</span> : null} 
                            {data.heading} 
                          </div>
                          <div className="not-gen-time">
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          {/* <div class="button-container">
  <a href="#" class="animated-button">Click Here</a>
</div> */}
                          <div className="not-gen-sub-01">
                            {data.msg}
                            {data.Type === 'Feedback Notification' ? (
                              <a href='#' onClick={handleForm}>Click here</a>
                            ) : null}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="not-gen-text" style={{ display: "none" }}>
                        No notification data available.
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div>No notifications available.</div>
              )}
            </div>

            {/* <div className='not-gen-container-2'>
        <div className='not-gen-text-container-2'>
          <div className='not-gen-text-2'>Attention</div>
          <div className='not-gen-time-2'>9:38AM</div>
        </div>
        <div className='not-gen-sub-02'>
        Your subscription is going to expire
very soon. <strong style={{color:'#ff5f67'}}>Subscribe now</strong>
        </div>
      </div> */}
          </div>
        ) : activeBarItem === "Live" ? (
          <div>
            {liveEvents?.length === 0 ? (
              <div  className="new-info-ca">
              <InfoCard
                imageSrc='/assets/bell.png'
                title="Stay tuned!"
                subtitle="Our live programs are just around the corner."
                // buttonText="Stay tuned, Our live programs are just around the corner."
                // onButtonClick={handleVideo}
              />
              </div>
            ) : (
              <div className="details-content-container-00">
                {liveEvents.map((item, index) => (
                  <div
                    className="img-content-details-00"
                    key={index}
                    onClick={() => pathBuyTicket(item)}
                  >
                    <img src={ImagePath + item.image} alt="" />
                    {/* {item.subscriptionType==='Preview' ?( <span className="pro-badge-02">Preview</span>):
            item.subscriptionType==='Pro'? ( <span className="pro-badge-02">PRO</span>):('')} */}
                    <div className="text-container-00">
                      <div className="details-maintext-00">
                        {item.event_name}
                      </div>
                      <div className="details-subtext-00">
                        <span>|</span>
                        {format(new Date(item.event_date), "EEE, MMM dd")}{" "}
                        {/* {item.start_time} */}
                      </div>
                      {/* <div className='not-loc-img'><img src={require('../../Assets/map-pin.png')} alt="" />{item.location}</div> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* <div>
          {eventData.map((item)=>(
          <div className='full-not-events-container'
          style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
          onClick={pathBuyTicket}
          key={item._id}
          >
            <div className='not-event-img'> 
              <img src={ImagePath+item.image} alt="" />
            </div>
            <div className='not-evnt-text-container'>
              <div className='not-evn-time'>{format(new Date(item.event_date), 'EEE, MMM dd')}   {item.start_time}</div>
              <div className='not-evn-title'>{item.event_name}</div>
              <div className='not-loc-img'><img src={require('../../Assets/map-pin.png')} alt="" />{item.location}</div>
            </div>
            <div className='icon-not-container'>
              <div className='not-fav-img'><img src={require('../../Assets/Vector.png')} alt="" /></div>
              <div className='not-share-img'><img src={require('../../Assets/Vector (6).png')} alt="" /></div>
            </div>
          </div>
          ))}
        </div> */}
          </div>
        ) : activeBarItem === "Events" ? (
          // <div>
          //   {eventData.map((item)=>(
          //   <div className='full-not-events-container'
          //   style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
          //   onClick={pathBuyTicket}
          //   key={item._id}
          //   >
          //     <div className='not-event-img'>
          //       <img src={ImagePath+item.image} alt="" />
          //     </div>
          //     <div className='not-evnt-text-container'>
          //       <div className='not-evn-time'>{format(new Date(item.event_date), 'EEE, MMM dd')}   {item.start_time}</div>
          //       <div className='not-evn-title'>{item.event_name}</div>
          //       <div className='not-loc-img'><img src={require('../../Assets/map-pin.png')} alt="" />{item.location}</div>
          //     </div>
          //     {/* <div className='icon-not-container'>
          //       <div className='not-fav-img'><img src={require('../../Assets/Vector.png')} alt="" /></div>
          //       <div className='not-share-img'><img src={require('../../Assets/Vector (6).png')} alt="" /></div>
          //     </div> */}
          //   </div>
          //   ))}
          // </div>
          <div >
            {eventData?.length === 0 ? (
              <div className="new-info-ca">
              <InfoCard
                imageSrc='/assets/bell.png'
                title="Upcoming events are  on the way!"
                subtitle="  Stay tuned for exciting opportunities and you will be the first to know when they go happen!"
                // buttonText="Stay tuned, Our live programs are just around the corner."
                // onButtonClick={handleVideo}
              />
              </div>
            ) : (
              <div className="details-content-container-00">
                {eventData.map((item, index) => (
                  <div
                    className="img-content-details-00"
                    key={index}
                    onClick={() => pathBuyTicket(item)}
                  >
                    <img src={ImagePath + item.image} alt="" />
                    {/* {item.subscriptionType==='Preview' ?( <span className="pro-badge-02">Preview</span>):
            item.subscriptionType==='Pro'? ( <span className="pro-badge-02">PRO</span>):('')} */}
                    <div className="text-container-00">
                      <div className="details-maintext-00">
                        {item.event_name}
                      </div>
                      <div className="details-subtext-00">
                        <span>|</span>
                        {format(new Date(item.event_date), "EEE, MMM dd")}{" "}
                        {/* {item.start_time} */}
                      </div>
                      <div className="not-loc-img">
                        <img src='/assets/map-pin.png' alt="" />
                        {item.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
