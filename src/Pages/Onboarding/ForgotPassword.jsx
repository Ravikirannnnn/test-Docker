import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import VerificationPassword from "./VerificationPassword";
import LeftScreen from "./LeftScreen";
import Sign from "./Sign";
import Login from "./login";
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { API_URL4002, errorMessage, successMessage } from "../../Service/ApiService";
import { themeContext } from "../../Context";
import { useContext } from "react";
import PageTitle from "../../Components/Loader/Other/PageTitle";

export default function ForgotPassword({setShowForgetPassword,handelForgotpasswordback}) {
  const [showVerification, setShowVerification] = useState(false);
  const [showSignup, setShowSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const handleBackClick = () => {
    navigate('/Login');
    console.log('cclicked for') // Navigate back to the previous page
  };

  const handleForgetPasswordClick = () => {
    // successMessage("OTP Sent to Email Successfully", { autoClose: 1000 });

    setTimeout(() => {
        setShowVerification(true);
    }, 1000); // Matches autoClose duration
};

useEffect(()=>{
  if(showVerification){
  
    successMessage("OTP Sent to Email Successfully", { autoClose: 1000 });
  }
},[showVerification])

  const signUpClick=()=>{
    setShowSignUp(true)
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailError(validateEmail(emailValue) ? '' : 'Invalid email address.');
  };

  const back =()=> {
    console.log("clicking")
    handelForgotpasswordback();
  }

  // if (showVerification) {
  //   return <VerificationPassword email={email} />;
  // }
  if (showSignup) {
    return <LeftScreen/>;
  }
  const forgotPassFetch = (e) => {
    e.preventDefault();
    setLoading(true)
    // console.log('running');
    if (emailError || !email) {
      errorMessage("Please enter a valid Email Id.", { autoClose: 1000 });
      setLoading(false)
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL4002+"forgetpassword", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result,'resultforgotpass');

        if (result.Status === true) {
          // successMessage('OTP Sent to Email Successfully', {
          //   autoClose: 1000,
          //   onClose: () => {
          //   }
          // });
          setLoading(false)
          handleForgetPasswordClicks();
        } else {
          toast.error('Please sign up to Bodsphere', { autoClose: 1000 });
          setLoading(false)
        }
      })
      .catch((error) => console.error(error));
  };
 if (showVerification) {
    return <VerificationPassword handelForgotpasswordback={handelForgotpasswordback} email={email} forgotPassFetch={forgotPassFetch}/>;
  }
  return (
    // <div className="forgetpassword-header">
    //    <Toaster
    //     toastOptions={{
    //       style: { backgroundColor: '#222122', color: '#fff' },
    //     }}
    //   />
    //   {/* <div className="forgetpassword-layouth">
    //     <div className="forgetpassword-backbutton" onClick={handleBackClick} style={{ cursor: 'pointer' }}>
    //       <img src={require('../../Assets/backButton.png')} loading="lazy" style={{ height: 15, width: 10 }} />
    //     </div>
    //   </div> */}
    //   <div className="new-b-tit">
    //   <PageTitle />
    //   <span className="forgetpassword-hello" 
    //           style={{color: darkMode?'white':'black',textAlign:'center'}}
    //           >Forgot Password?</span>
    //           </div>
    //   <div className='forgetpassword-subtext'>
    //   Enter the email address associated with your account, and we’ll send you a link to reset your password.
    //   </div>
    //   {/* <div className='forgetpassword-subtext'>
    //     login with another account
    //   </div> */}
    //   <div className="forgetpassword-form">
    //     <form>
    //       <div className="forgetpassword-form-group">
    //         <input
    //           type="email"
    //           placeholder="Email"
    //           name="email"
    //           value={email}
    //           onChange={handleEmailChange}
    //           style={{color: darkMode?'white':'black'}}
    //           required
    //         />
    //         {emailError && <div className="error-text">{emailError}</div>}
    //       </div>
    //       <button className="forgetpassword-linear-button" onClick={forgotPassFetch}>Send</button>
    //     </form>
    //   </div>
    // </div>
    <div className="forgotpassword-wrap">
         <>
    
    <div className="new-paget" >
      <PageTitle back={back}/>
    </div>
    <div className='signuplayout-header-444'>
    <Toaster
      toastOptions={{
        style: { backgroundColor: '#222122', color: '#fff' },
      }}
      reverseOrder={true}
    />
    {/* <button onClick={back} >back</button> */}
    <div className='signUp-hello123-444' 
            style={{color: darkMode?'white':'black' }}
            onClick={signUpClick}
            >Forgot Password</div>
      
    <div className="signup-form123-444">
      <form>
      <div className='signUp-hello6543-subtext-444'
              style={{color: darkMode?'white':'black',textAlign:'center'}}
              >
        Enter the email address associated with your account and we’ll send you a link to reset your password.
      </div>
        <div className="form-group123-444">
        <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              style={{color: darkMode?'white':'black'}}
              required
            />
        </div>
        {emailError && <div className='error-message'>{emailError}</div>}
        <button className="linear-button123-444" 
        onClick={!loading ? forgotPassFetch : undefined} 
        style={{color:'white',
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        {loading ? (
        <span className="loader"></span> // Add your loader here
      ) : (
        "Send"
      )}
        </button>
      </form>
    </div>
  </div>
  </>
  </div>
 
  );
}
