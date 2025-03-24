import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import { themeContext } from "../../../Context";
import VerificationModal from "./Verification";
import { API_URL4002, successMessage } from "../../../Service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/userSlice";
import { toast, Toaster } from 'react-hot-toast';

const ChangePasswordModal = ({ show, onClose }) => {
  const [isVerificationOpen, setVerificationOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email,setEmail] = useState('')
  const dispatch = useDispatch(); // Initialize useDispatch
  const userData = useSelector((state) => state.user.profile?.userdata);
  const userId=localStorage.getItem('user_id');
  const [loading, setLoading] = useState(false);
  
  const closeModal=()=>{
    setLoading(false);
    onClose()
  }
    useEffect(() => {
      if (userId) {
        dispatch(fetchUserProfile()); 
        // console.log('triggered',user_id);
      }
    }, [userId, dispatch]);

    const openVerificationModal = () => {
      setLoading(false)
      successMessage("OTP Sent to Email Successfully!", { autoClose: 1000 });
  
      setTimeout(() => {
          setVerificationOpen(true);
          onClose(); // Move onClose inside setTimeout to prevent immediate closing
      }, 1000);
  };
  

  const closeVerificationModal = () => {
    setVerificationOpen(false);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (show || isVerificationOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show, isVerificationOpen]);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  if (!show && !isVerificationOpen) {
    return null;
  }

  const emailVerification = (e) =>{
    e.preventDefault();
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": userData.email
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4002+"forgetpassword", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.Status === true){
          openVerificationModal()
          // navigation.replace('ChangeOtp',{result:email})
        }
        else{
          if(result.message == 'Please Provide Valid Email'){
            // setModalMessage('Please Enter Email')
          }
          if(result.message == 'Please SignUp to Bodsphere'){
            // setModalMessage('Please Enter Valid Email')
          }
        }
        console.log(result)
      })
      .catch(error => {console.log('error', error)});
  }
 

  return (
    <>
      {show && (
        <div className="modal-overlay-1">
          <div
            className="modal-content-1"
            style={{ backgroundColor: darkMode ? "#1C1C1E" : " #d8d8df" }}
          >
             <Toaster
      toastOptions={{
        style: { backgroundColor: '#222122', color: '#fff' },
      }}
      reverseOrder={true}
    />
            <div className="password-modal-head">
              {/* <div
                className="left-arrow-dlt-modal-1"
                onClick={onClose}
                style={{
                  backgroundColor: darkMode ? "#2C2C2E" : " #d8d8df",
                }}
              >
                <img src={require("../../../Assets/rightwel.png")} alt="" />
              </div> */}
              <div className="password-mdl-cls-btns">
                <button className="close-button-1" onClick={closeModal}>
                  &times;
                </button>
              </div>
            </div>

            <div className="password-mdl-content-container">
              <div className="password-mdl-top-head">Change Password</div>
              <div className="password-mdl-tail">
                {/* Enter your Email below to change password. */}
                Your registered email is shown below. This cannot be changed.
              </div>
              <div className="pswd-input-container">
                {/* <span className="cng-pwd-email">Email</span> */}
                <input
                  type="email"
                  placeholder="Email"
                  readOnly
                  value={userData.email}
                  required
                  style={{
                    backgroundColor: darkMode ? "#1C1C1E" : " #d8d8df",
                    border: "0px",
                    color: darkMode ? "#d8d8df" :  "#2C2C2E"
                  }}
                />
              </div>
              <div className="password-mdl-bottom">
                <div className="password-btn-profile" style={{
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
       onClick={!loading ? emailVerification : undefined}>
                 {loading ? (
        <span className="loader"></span> // Add your loader here
      ) : (
        "Send"
      )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isVerificationOpen && (
        <VerificationModal
          show={isVerificationOpen}
          onclose={closeVerificationModal}
          emailVerification={emailVerification}
        />
      )}
    </>
  );
};

export default ChangePasswordModal;
