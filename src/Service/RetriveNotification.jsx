// 
import React, { useState, useEffect } from 'react';
import {  onMessageListener } from './FirebaseConfig';
import NotificationDisplay from './NotificationDisplay';

const RetriveNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState();

  useEffect(() => {
    // Listen for new messages and set the notification state
    onMessageListener()
      .then((payload) => {
        console.log("payload-retrive",payload);
        setIsVisible(true);
        setNotification({
          title: payload?.notification?.title,
          body: payload?.notification?.body,
          image:payload.notification?.image,
        });
      })
      .catch((err) => console.log('Failed to retrieve message: ', err));
  }, []);

  const handleCloseNotification = () => {
    setIsVisible(false);
  };


  return (
    <>
      {/* Render the custom notification component only when notification state is set */}
      {isVisible && (
        <NotificationDisplay
          title={notification.title}
          body={notification.body}
          image={notification?.image}
          close={handleCloseNotification} // Clear notification after display
        />
      )}
    </>
  );
};

export default RetriveNotification;
