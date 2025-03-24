import React, { useState,useContext} from "react";
import "./ChangePassword.css";
import Sign from "./Sign";
import Modal from "../../Components/Loader/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import { API_URL4002, errorMessage, successMessage } from "../../Service/ApiService";
import { themeContext } from "../../Context";
import PageTitle from "../../Components/Loader/Other/PageTitle";

export default function ChangePassword({email,handelForgotpasswordback}) {
  const [showLogin, setShowLogin] = useState(false);
  const [resetSuccessModal, setResetSuccessModal] = useState(false);
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
// const [showLogin,setShowLogin]=useState(false)
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const navigate = useNavigate();

  const Email=localStorage.getItem('email_id')||email;
  if (showLogin) {
    return <Sign />;
  }
  // const handleBackClick = () => {
  //   // console.log('sfdsfsd');
  //   setShowLogin(true);
  // };
  const handleBackClick = () => {

    successMessage("Password reset Successfull!", { autoClose: 1000 });


    setTimeout(() => {
      setShowLogin(true);
    }, 1000); // Matches autoClose duration
};

// const handlePasswordValidate=()=>{
//   if(password.length<8||password.length>16){
//     errorMessage('Password must be between 8 and 16 characters long.',{
//       autoClose:1000
//     })
//     return;
//   }
//   const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
//   if (!specialCharRegex.test(password)) {
//     errorMessage("Password must contain at least one special character.",{
//       autoClose:1000
//     });
//     return;
//   }
//   const uppercaseRegex = /[A-Z]/;
//   if (!uppercaseRegex.test(password)) {
//     errorMessage("Password must contain at least one uppercase letter.", { autoClose: 1000 });
//     return;
//   }
//   if (password !== confirmPassword) {
//     errorMessage("Passwords do not match!",{
//       autoClose:1000
//     });
//     return;
//   }
// }
  
  const openRestModal=()=>{
    setResetSuccessModal(true)
  }

  const ResetPasswordFetch = (e) => {
    e.preventDefault();

    if (password.length < 8 || password.length > 16) {
      errorMessage("Password must be between 8 and 16 characters long.",{
        autoClose:1000
      });
      return;
    }

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      errorMessage("Password must contain at least one special character.",{
        autoClose:1000
      });
      return;
    }
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(password)) {
      errorMessage("Password must contain at least one uppercase letter.", { autoClose: 1000 });
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
      email: Email,
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

  return (
    <>
      <div className="change-password-header">
        {/* <div className="change-password-layout">
          <div className="change-password-backbutton" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
            <img loading="lazy" src='/assets/backButton.png' style={{ height: 15, width: 10 }} />
          </div>
        </div> */}
        <div className="chnage-back">
        <PageTitle back={handelForgotpasswordback}/>
        </div>
        <span className="change-password-hello">Change Password?</span>
        <div className='change-password-subtext'>
          Enter your new password below 
        </div>
        {/* <div className='change-password-subtext'>
          login with another account
        </div> */}
        <div className="change-password-form">
          <form>
            <div className="change-password-form-group">
              <div className="input-eye">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               style={{color: darkMode?'white':'black',backgroundColor:darkMode?'black':'white'}}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  style={{ cursor: "pointer" }}
                >
                 {showPassword?
              <img loading="lazy" src='/assets/openeye.png' alt="" />
              :<img loading="lazy" src='/assets/closeeye.png' alt="" />
              }
                </span>
              </div>
              <div className="input-eye">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               style={{color: darkMode?'white':'black',backgroundColor:darkMode?'black':'white'}}
                />
                <span
                  className="eye-icon"
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
                className="change-password-linear-button"
                onClick={(e) => ResetPasswordFetch(e)}
                style={{color:'white'}}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={resetSuccessModal} onClose={() => setResetSuccessModal(false)}>
        <div className="entire-modal" style={{ backgroundColor: '#1C1C1E', color: 'white' }}>
          <div className='verified-tick'>
            <img loading="lazy" src='/assets/Tick Circle.png' alt="verification-tick" />
          </div>
          <div className='verify-text-content'>
            <span className='reset-head-text'>Reset Password Successful</span>
            <span className='reset-tail-text'>Please wait... <br /> You will be redirected to the home page.</span>
          </div>
          <div className='reset-loading-png'>
            <img loading="lazy" src='/assets/Regular.png' alt="loading" />
          </div>
        </div>
      </Modal>

      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
    </>
  );
}
