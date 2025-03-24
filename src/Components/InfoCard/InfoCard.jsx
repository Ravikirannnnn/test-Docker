// InfoCard.js
import React from 'react';
import './InfoCard.css';
import { themeContext } from "../../Context";
import { useContext } from 'react';

const InfoCard = ({ imageSrc, title, subtitle, buttonText, onButtonClick }) => {

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="info-card">
      {imageSrc && <img src={imageSrc} alt="info-icon" className="info-card-image" style={{filter:darkMode ? 'invert(100%)':''}}/>}
      <h2 className="info-card-title"  style={{color:darkMode ? 'white':'black'}}>{title}</h2>
      <p className="info-card-subtitle">{subtitle}</p>
      <button className="info-card-button" onClick={onButtonClick}>
        {buttonText}
      </button>
    </div>
  );
};

export default InfoCard;
