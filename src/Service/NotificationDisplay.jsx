import React, { useEffect, useState } from 'react';
import './NotificationDisplay.css';
import { themeContext } from '../Context'
import { useContext } from 'react';
import { ImagePath } from './ApiService';
import {  onMessageListener } from './FirebaseConfig';

const NotificationDisplay = ({ title, body, image, close }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [notification, setNotification] = useState();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Listen for new messages and set the notification state
    onMessageListener()
      .then((payload) => {
        console.log("payload-noti", payload);
        notificationPoP();
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
          image: payload.notification?.image,
        });
      })
      .catch((err) => console.log('Failed to retrieve message: ', err));
  }, []);

const notificationPoP =()=> {
  console.log('pp');
  
  setIsVisible(true);
  setTimeout(() => {
    setIsVisible(false);
  }, 10000);
}

  // console.log(title, "body", body,'title',image,'image')

  return (
    <>
      {isVisible ? (

        <div className='notification' style={{ color: darkMode ? "white" : 'black' }}>
          <div>
            {/* {notification?.image ? ( */}
              <img style={{maxWidth:'50px'}} src={
                // notification?.image ? ImagePath + notification?.image :
                 '/assets/bod_fevicon.png'} alt="notification image" />
            {/* // ) : null} */}
          </div>
          <p style={{ fontWeight: 'bold', color: darkMode ? "white" : 'black' }} >{notification?.title}</p>
          <p
            style={{ color: darkMode ? "white" : 'black' }}>{notification?.body}</p>

        </div>

      ) : null}
    </>
  );
};

export default NotificationDisplay;
