import React, { useContext,useEffect } from 'react'
import './Layout.css'
import Headers from '../Navbar/Headers'
import { Outlet } from 'react-router-dom'
import { themeContext } from '../../Context'

export default function Layout() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  // console.log('darkMode status:', darkMode);
  useEffect(() => {
    // Dynamically update autofill styles based on dark mode
    const style = document.createElement('style');
    style.innerHTML = `
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px ${darkMode ? 'black' : '#ffffff'} inset !important;
          -webkit-text-fill-color: ${darkMode ? '#ffffff' : '#black'} !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style); // Clean up the style on unmount
    };
  }, [darkMode]);

  
  return (
    <div className={`${darkMode ? 'layout-black' : 'layout-white'}`}>
      <div className=''>
        <Headers />
      </div>
     <div className='page-Layout-conatiner'>
       <Outlet/>
     </div>
    </div>
  )
}
