import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getToken, onMessage,deleteToken } from 'firebase/messaging';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDTt7Ta07l8vZ3AJ0b4oCJD_thEj-55ry8",
  authDomain: "bodsphere-c92bf.firebaseapp.com",
  projectId: "bodsphere-c92bf",
  storageBucket: "bodsphere-c92bf.firebasestorage.app",
  messagingSenderId: "1018363680791",
  appId: "1:1018363680791:web:2c1f3cedbc3efee1aa6452"
  };

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider= new FacebookAuthProvider();
  const provider = new OAuthProvider('apple.com');
//   export const getFirebaseToken = (setTokenFound) => {
//     return getToken(messaging, { vapidKey: "BGhR0BF4cSDJreRIMceK3eEMPkzR9Kimw7RnU_btMg09XZaYGQYcM6ASxPQyleyI3oTZA-ZaiD8zEqkLfksnIeQ" })
//       .then((currentToken) => {
//         if (currentToken) {
//           console.log('Current Token: ', currentToken);
//           setTokenFound(currentToken);
//         } else {
//           console.log('No registration token available.');
//           setTokenFound(false);
//         }
//       })
//       .catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//         setTokenFound(false);
//       });
//   };

export const getFirebaseToken = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Register the service worker and obtain the registration
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered with scope:', registration.scope);

      // Request permission for notifications
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Get the messaging token using the service worker registration
        const currentToken = await getToken(messaging, {
          vapidKey: "BAa1lbZ-RNexxefPbCKLvjxKHZ1IyGULjQowTrvrRvmEyfhoDpEieMIGAwGVI0ZYoD6JRZuqbHbpkIHqQOnDPBE",
          serviceWorkerRegistration: registration
        });

        if (currentToken) {
          console.log('Current Token:', currentToken);
          // setTokenFound(currentToken);
          sessionStorage.setItem("firebaseToken", currentToken);
        } else {
          console.log('No registration token available.');
          // setTokenFound(false);
        }
      } else {
        console.log('Permission denied for notifications.');
        // setTokenFound(false);
      }
    } catch (error) {
      console.error('An error occurred while retrieving token.', error);
      // setTokenFound(false);
    }
  } else {
    console.error('Service workers are not supported in this browser.');
    // setTokenFound(false);
  }
};

  export const deleteFirebaseToken = async (setTokenFound) => {
    try {
      const tokenDeleted = await deleteToken(messaging);
      if (tokenDeleted) {
        console.log("FCM token deleted successfully.");
        setTokenFound(false);
      } else {
        console.log("FCM token deletion unsuccessful.");
      }
    } catch (error) {
      console.error("Error deleting FCM token:", error);
      setTokenFound(false);
    }
  };


  export const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });

    export { auth, googleProvider,facebookProvider, OAuthProvider, provider};

