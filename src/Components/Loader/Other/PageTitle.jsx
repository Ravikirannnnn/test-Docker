import React from 'react'
import { useNavigate } from 'react-router-dom';
import './PageTitle.css'
import { themeContext } from "../../../Context";
import { useContext} from 'react';
import { current } from '@reduxjs/toolkit';

export default function PageTitle({title,back}) {
  const navigate = useNavigate();

  const handleBackPath = () => {
    if (back) {
      back();
    } else {
      navigate(-1);
    }
  };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div>
        <div className='com-flex-start'>
          <div
            className='com-left-arrow-main'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
            onClick={handleBackPath}
          >
            <div className='com-left-arrow' style={{cursor:'pointer'}}>
              <img loading="lazy" src='/assets/rightwel.png' alt="" />
            </div>
          </div>
          <div className='com-title'>{title}</div>
        </div>
    </div>
  )
}
