import React from "react";
import "./DeleteModal.css";
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL4007, successMessage } from "../../../Service/ApiService";
import { toast, Toaster } from 'react-hot-toast';

const DeleteAccountModal = ({ show, onClose }) => {
  
  const navigate= useNavigate();
  const handleBack=()=>{
    navigate(-1)
  }
  useEffect(() => {
    if (show) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [show]);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  if (!show) {
    return null;
  }

  const deleteAccount = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    const raw = JSON.stringify({
      "user_id": user_id
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL4007+"deleteAccount", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        console.log('deleteAccount',result);
        localStorage.clear()
       successMessage('Signing Off', {
          autoClose:1000,
          onClose:  handleLandingPage(),
        });
      })
      .catch((error) => console.error(error));
  }

  const handleLandingPage=()=>{
    navigate('/')
  }



  return (
    <div className="modal-overlay">
      <div className="modal-content-dl" style={{backgroundColor:darkMode ? "#1C1C1E" : " #d8d8df"}}>
        <div className="dlt-modal-head">
          {/* <div className="left-arrow-dlt-modal" 
          onClick={handleBack}
          style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df"}}>
            <img src={require("../../../Assets/rightwel.png")} alt="" />
          </div> */}
          <div className="dlt-mdl-cls-btns">
          <button className="close-button" onClick={onClose} style={{color:'black'}} >
            &times;
          </button>
          </div>
        </div>

        <div className="dlt-mdl-content-container">
        <div className="dlt-mdl-top-head-00"> 
        {/* Are you sure you want to delete <br /> your account permanently?  */}
        Confirm permanent <br /> account deletion?
        </div>
        <div className="dlt-mdl-tail-00">
       {/* Deleting your account will remove all of your {' '}  */}
       {/* <br />  */}
       {/* information & subscription from our database. */}
        {/* <br /> */}
         {/* This cannot be undone. */}
         Deleting your account will erase all data and subscriptions permanently.
        </div>
        </div>
        <div className="dlt-mdl-bottom">
        <div className="dlt-btn-profile" onClick={deleteAccount}>Yes, Delete</div>
        <div className="cancel-btn-dlt-mdl" style={{cursor:'pointer',}} onClick={onClose}>Cancel</div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
