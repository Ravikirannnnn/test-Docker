import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { themeContext } from "../../../Context";
import VerificationModal from "./Verification";

const UpdatePasswordModal = ({ show, onClose }) => {

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };


  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  if (!show ) {
    return null;
  }

  return (
    <>
        <div className="modal-overlay-101">
          <div
            className="modal-content-101"
            style={{ backgroundColor: darkMode ? "#1C1C1E" : " #d8d8df" }}
          >
            <div className="password-modal-head">
              <div
                className="left-arrow-dlt-modal-1"
                onClick={handleBack}
                style={{
                  backgroundColor: darkMode ? "#2C2C2E" : " #d8d8df",
                }}
              >
                <img src='/assets/rightwel.png' alt="" />
              </div>
              <div className="password-mdl-cls-btn">
                <button className="close-button-1" onClick={onClose}>
                  &times;
                </button>
              </div>
            </div>

            <div className="password-mdl-content-container">
              <div className="password-mdl-top-head">Change Password</div>
              <div className="password-mdl-tail">
                Enter your Email below to change password
              </div>
              <div className="pswd-input-container">
                <span className="cng-pwd-email">Email</span>
                <input
                  type="email"
                  required
                  style={{
                    backgroundColor: darkMode ? "#1C1C1E" : " #d8d8df",
                    border: "0px",
                  }}
                />
              </div>
              <div className="password-mdl-bottom">
                <div className="password-btn-profile">
                  Send
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default UpdatePasswordModal;
