importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.9.1/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.9.1/firebase-messaging-compat.js');
// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDTt7Ta07l8vZ3AJ0b4oCJD_thEj-55ry8",
  authDomain: "bodsphere-c92bf.firebaseapp.com",
  projectId: "bodsphere-c92bf",
  storageBucket: "bodsphere-c92bf.firebasestorage.app",
  messagingSenderId: "1018363680791",
  appId: "1:1018363680791:web:2c1f3cedbc3efee1aa6452"
  };

// Initialize Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();



// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload?.notification?.title;
//   const notificationOptions = {
//     body: payload?.notification?.body,
//   };
// console.log((notificationTitle,'notificationTitle',notificationOptions,'notificationOptions'));

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
if (!self.backgroundMessageListenerAdded) {
  self.backgroundMessageListenerAdded = true; // Prevent multiple listeners

  messaging.onBackgroundMessage((payload) => {
    console.log('Received background message', payload);

    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
      body: payload?.notification?.body,
    };

    console.log(notificationTitle, 'notificationTitle', notificationOptions, 'notificationOptions');

    self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
