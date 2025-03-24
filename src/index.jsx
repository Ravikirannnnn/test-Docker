import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-toastify/dist/ReactToastify.css";



import './fonts/Integral.ttf';
import'./fonts/IntegralCF-Regular.ttf';
import './fonts/OpenSans-Bold.ttf';
import './fonts/OpenSans-BoldItalic.ttf';
import './fonts/OpenSans-ExtraBold.ttf';
import './fonts/OpenSans-ExtraBoldItalic.ttf';
import './fonts/OpenSans-Italic.ttf';
import './fonts/OpenSans-Light.ttf';
import './fonts/OpenSans-LightItalic.ttf';
import './fonts/OpenSans-Regular.ttf';
import './fonts/OpenSans-Semibold.ttf';
import './fonts/OpenSans-SemiboldItalic.ttf'
import './fonts/Poppins-Bold.ttf';
import './fonts/Poppins-Medium.ttf';
import './fonts/Poppins-Regular.ttf';
import './fonts/Poppins-SemiBold.ttf';
import './fonts/PlusJakartaSans-SemiBold.ttf';
import './fonts/PlusJakartaSans-Regular.ttf'
import './fonts/integralcf-bold.ttf';
import './fonts/integralcf-medium.ttf'
import './fonts/Hanken_Grotesk/static/HankenGrotesk-Medium.ttf'
import './fonts/Hanken_Grotesk/static/HankenGrotesk-Regular.ttf'
import './fonts/Cardo/Cardo-Bold.ttf'
import './fonts/Cardo/Cardo-Italic.ttf'
import './fonts/Cardo/Cardo-Regular.ttf'
import './fonts/Quattrocento/Quattrocento-Regular.ttf'
import './fonts/Quattrocento/Quattrocento-Bold.ttf'

import { ThemeProvider } from './Context';


const root = ReactDOM.createRoot(document.getElementById('root'));

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/Bodsphere_web_app/firebase-messaging-sw.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch((error) => {
//       console.error('Service Worker registration failed:', error);
//     });
// }
root.render(
  <React.StrictMode>
        <Provider store={store}>

    <ThemeProvider>
    <App />
    </ThemeProvider>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
