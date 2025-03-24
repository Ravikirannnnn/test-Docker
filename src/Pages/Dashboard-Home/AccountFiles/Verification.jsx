import React from "react";
import "./Verification.css";
import "./UpdatePassword.css"
import { themeContext } from "../../../Context";
import { useContext } from "react";
import UpdatePasswordModal from "./UpdatePassword";
import { useState } from "react";
import { useEffect } from "react";
import Modal from "../../../Components/Loader/Modal/Modal";
import { API_URL4002, errorMessage, successMessage } from "../../../Service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../redux/userSlice";
import { toast, Toaster } from 'react-hot-toast';

const VerificationModal = ({ show, onclose, emailVerification }) => {
  const [isUpdateOpen, setisUpdateOpen] = useState(false);
  const [modalOpen,setModalOpen]=useState(false)
    const [otp,setOtp]=useState('');
    const dispatch = useDispatch(); // Initialize useDispatch
  const userData = useSelector((state) => state.user.profile?.userdata);
  const userId=localStorage.getItem('user_id');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
      const handleBackClick = () => {
        successMessage("Password reset successful!", { autoClose: 1000 });
    
        setTimeout(() => {
          onclose();
        }, 1000); // Matches autoClose duration
    };
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false); // Enable the resend button when timer reaches 0
    }
  }, [timer]);

    const handleResendOTP = (e) => {
      // Logic to resend OTP
      setTimer(120); // Reset the timer
      setIsResendDisabled(true); // Disable the resend button again
      // Add your API call to resend OTP here
      emailVerification(e);
    };

      const ResetPasswordFetch = (e) => {
        e.preventDefault();
    
        if (password.length < 8 || password.length > 16) {
          errorMessage("Password must be between 8 and 16 characters long.",{
            autoClose:1000
          });
          return;
        }
        const uppercaseRegex = /[A-Z]/;
        if (!uppercaseRegex.test(password)) {
          errorMessage("Password must contain at least one uppercase letter.", { autoClose: 1000 });
          return;
        }
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharRegex.test(password)) {
          errorMessage("Password must contain at least one special character.",{
            autoClose:1000
          });
          return;
        }
    
        if (password !== confirmPassword) {
          errorMessage("Passwords do not match!",{
            autoClose:1000
          });
          return;
        }
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
          email: userData.email,
          password: password,
          confirmpassword: confirmPassword
        });
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
    
        fetch(API_URL4002+"updatepassword", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log('result',result)
            if(result.Status===true){
              // successMessage('Password Reset Succesfull',{
              //   autoClose:1000,
              //   onClose:()=>{
              //       // return <Sign />;
              //   }
              // })
                    handleBackClick()
    
            }
            else{
              errorMessage(result.message,{
                autoClose:1000
              })
            }
          })
          .catch((error) => {
            console.error(error);
            errorMessage("An error occurred. Please try again.",{
              autoClose:1000
            });
          });
      };

    useEffect(() => {
      if (userId) {
        dispatch(fetchUserProfile()); 
        // console.log('triggered',user_id);
      }
    }, [userId, dispatch]);
  // const [showModal, setShowModal] = useState(false);
  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };
  const openUpdateModal = () => {
    // setModalOpen(true)
    successMessage("OTP Verified Successfully!", { autoClose: 1000 });
  
    setTimeout(() => {
      setModalOpen(true);
      console.log("Opening UpdatePasswordModal - Expected true", modalOpen);
  
      setTimeout(() => {
        // onClose(); // Close the first modal only after the state updates
        
      }, 500);
    }, 1000);
  };
  
  
  const closeModal=()=>{
    onclose()
    setModalOpen(false)
  }

    const VerifyOTP=(e)=>{
      e.preventDefault();
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        "email": userData.email,
        "Otp": otp
      });
      
      console.log('eeerwa',raw);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      fetch(API_URL4002+"OtpVerify", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result,'resultforgotpass');
  
          if (result.status === true) {
            // successMessage('OTP Verified Successfully', {
            //   autoClose: 1000,
            //   onClose: () => {
            //   }
            // });
            openUpdateModal();
          } else {
            errorMessage('Invalid OTP!', { autoClose: 1000 });
          }
        })
        .catch((error) => console.error(error));
    }
  // const modalUpdate=()=>{
  //   if(openUpdateModal===true){
  //     hide()
  //   }
  // }
  useEffect(() => {
    console.log("isUpdateOpen changed:", isUpdateOpen);
  }, [isUpdateOpen]);
  
  const closeUpdateModal = () => {
    setisUpdateOpen(false);
  };
  useEffect(() => {
    if (show || isUpdateOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [show, isUpdateOpen]);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  if (!show && !isUpdateOpen) {
    return null;
  }

  return (
    <>
         <Toaster
          toastOptions={{
            style: { backgroundColor: '#222122', color: '#fff' },
          }}
          reverseOrder={true}
        />
    {show &&(
      <Modal isOpen={show} onClose={onclose}>
        <div className="vrfy-mdl-content-container">
          <div className="vrfy-mdl-top-head">Verification</div>
          <div className="vrfy-mdl-tail">
            Check your email. We’ve sent you the OTP at your email.
          </div>
          <div className="verification-form-001">
            <form>
              <div className="verification-form-group-001">
                <input
                  style={{ color: darkMode ? "white" : "black" }}
                  required
                  type="otp"
                  value={otp}
                  placeholder="Enter OTP here"
                  name="otp"
                  size={6}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              {/* <div className="verification-above-btn-text-001">
                Click here to resend.
              </div> */}
               <div className='verification-above-btn-text-001'
          onClick={isResendDisabled ? '' :handleResendOTP}
          disabled={isResendDisabled}
          style={{ color:
            //  isResendDisabled ? 'gray' : 
             '#FF5F67', cursor: isResendDisabled ? 'not-allowed' : 'pointer' }}
          >
            {/* <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResendDisabled}
              style={{ color: isResendDisabled ? 'gray' : 'blue', cursor: isResendDisabled ? 'not-allowed' : 'pointer' }}
            >
              Resend OTP
            </button> */}
            {isResendDisabled ?
            <span>
            Waiting for secure code {`  `}  {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
            </span>
            :
            <span>
           Resend OTP
            </span>}
          </div>
              <button
                className="verification-linear-button-001"
                onClick={VerifyOTP}
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </Modal>
    )}

      <Modal isOpen={modalOpen} onClose={closeModal}>
      <div className="change-password-header-ver">
        {/* <div className="change-password-layout">
          <div className="change-password-backbutton" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
            <img loading="lazy" src='/assets/backButton.png' style={{ height: 15, width: 10 }} />
          </div>
        </div> */}
        
        <span className="change-password-hello-ver">Change Password?</span>
        <div className='change-password-subtext-ver'>
          Enter your new password below 
        </div>
        {/* <div className='change-password-subtext'>
          login with another account
        </div> */}
        <div className="change-password-form-ver">
          <form>
            <div className="change-password-form-group-ver">
              <div className="input-eye-ver">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ color: darkMode ? "white" : "black" }}
                />
                <span
                  className="eye-icon-ver"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  style={{ cursor: "pointer" }}
                >
                 {showPassword?
              <img loading="lazy" src='/assets/openeye.png' alt="" style={{width:'30%'}} />
              :<img loading="lazy" src='/assets/closeeye.png' alt="" style={{width:'30%'}}/>
              }
                </span>
              </div>
              <div className="input-eye-ver">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ color: darkMode ? "white" : "black" }}
                />
                <span
                  className="eye-icon-ver"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  style={{ cursor: "pointer" }}
                >
                  {showPassword?
              <img loading="lazy" src='/assets/openeye.png' alt="" style={{width:'30%'}} />
              :<img loading="lazy" src='/assets/closeeye.png' alt="" style={{width:'30%'}}/>
              }
                </span>
              </div>
            </div>
            <div>
              <button
                className="change-password-linear-button-ver"
                onClick={(e) => ResetPasswordFetch(e)}
                style={{color:'white'}}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
      </Modal>

  </>
  );
};

export default VerificationModal;
