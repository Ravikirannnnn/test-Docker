import React from "react";
import "./MembershipCard.css";
import { useState } from "react";
// import defaultBackgroundImage from "./assets/default-background.jpg";

const MembershipCard = ({ title, description, buttonText, onButtonClick }) => {
  const [loaded, setLoaded] = useState(false);


  return (
    <div className="card-container">
      {/* Background image using the img tag */}
      <div>
      {!loaded && <div className="placeholder"></div>}
      <img
        src='/assets/Join bodsphere Footer.jpg'
        alt="Background"
        loading="lazy"
        className="card-background-img"
        onLoad={() => setLoaded(true)}
      />
      </div>
      <div className="card-content">
        <h1 className="card-title">{title}</h1>
        <h5 className="card-description">{description}</h5>
        <button className="join-button-mm" onClick={onButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default MembershipCard;
