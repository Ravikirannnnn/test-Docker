import React, { useState, useEffect } from "react";
import "./VerificationPassword.css";
import ChangePassword from "./ChangePassword";
import { useNavigate } from 'react-router-dom';
import PageTitle from "../../Components/Loader/Other/PageTitle";
import { themeContext } from "../../Context";
import { useContext } from "react";
import { API_URL4002, errorMessage, successMessage } from "../../Service/ApiService";
import { toast, Toaster } from 'react-hot-toast';

export default function VerificationPassword({ email,forgotPassFetch,handelForgotpasswordback}) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  // console.log('this is email',email);
  const navigate = useNavigate();

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

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const ChangeVerification = () => {
    successMessage("OTP Verified Successfully!", { autoClose: 1000 });

    setTimeout(() => {
      setShowChangePassword(true);
    }, 1000); // Matches autoClose duration
  };

  const VerifyOTP = (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "Otp": otp
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL4002 + "OtpVerify", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          ChangeVerification();
        } else {
          errorMessage('Invalid OTP!', { autoClose: 1000 });
        }
      })
      .catch((error) => console.error(error));
  };


  const handleResendOTP = (e) => {
    // Logic to resend OTP
    setTimer(120); // Reset the timer
    setIsResendDisabled(true); // Disable the resend button again
    // Add your API call to resend OTP here
    forgotPassFetch(e);
  };

  if (showChangePassword) {
    return <ChangePassword email={email} handelForgotpasswordback={handelForgotpasswordback}/>;
  }

  return (
    <div className="Verificationlayout-header">
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <div className="ver-back">
              <PageTitle back={handelForgotpasswordback}/>
              </div>

      <span className="Verificationlayout-hello">Verification</span>

      <div className='Verification-hello-subtext'>
        Kindly check your email for the OTP
      </div>

      <div className="Verification-form">
        <form>
          <div className="Verification-form-group">
            <input
              style={{ color: darkMode ? 'white' : 'black' }}
              required
              type="otp"
              value={otp}
              placeholder="Enter OTP here"
              name="password"
              size={6}
              onChange={(e) => setOtp(e.target.value)}
            />
            {/* <span className="Verification-timer">
              {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
            </span> */}
          </div>
          <div className='Verification-above-btn-text'
          onClick={isResendDisabled ? "":handleResendOTP}
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
          <button className="Verification-linear-button" style={{ color: 'white' }} onClick={VerifyOTP}>Verify</button>
        </form>
      </div>
    </div>
  );
}