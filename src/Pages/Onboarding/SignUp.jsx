import React, { useState, useContext, useEffect } from 'react';
import './SignUp.css';
import { themeContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL4001, errorMessage, successMessage } from '../../Service/ApiService';
import { getFirebaseToken } from '../../Service/FirebaseConfig';
import {  auth, googleProvider, facebookProvider, OAuthProvider,provider} from '../../Service/FirebaseConfig'; // Adjust the path as needed
import { signInWithPopup,fetchSignInMethodsForEmail,getAuth } from 'firebase/auth';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword]=useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
      // setEmail(result.user.email);
      // console.log(email,'email')
      RegisterFetchGoogle(result.user.email);
      //  navigate('/Dashboard')
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const auth = getAuth();

  const handleAppleLogin=()=>{
    provider.addScope('email'); // Request email explicitly
  provider.addScope('name');
signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    const uid = user.uid;

    console.log(user,'userApple');
    const email = result.additionalUserInfo?.profile?.email || user.email  || `apple_${uid}@privaterelay.appleid.com` ; 
    // Apple credential
    const credential = OAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    const idToken = credential.idToken;

    // const email =credential.email || email00;
console.log(email,'email');

    RegisterFetchApple(accessToken,idToken,email)
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The credential that was used.
    const credential = OAuthProvider.credentialFromError(error);

    // ...
  });
}

  // const auth = getAuth();
// const facebookProvider = new FacebookAuthProvider();

const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("User Info:", result.user);

    // Use the email to register or proceed with login
    RegisterFetchGoogle(result.user.email);
    // Uncomment if navigation is needed
    // navigate('/Dashboard');
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      const email = error.customData?.email; // Get the email associated with the account
      const pendingCredential = error.credential; // Get the Facebook credential
      if (email) {
        try {
          // Fetch sign-in methods for the email
          const signInMethods = await fetchSignInMethodsForEmail(auth, email);

          if (signInMethods.includes("google.com")) {
            // Inform the user to sign in with Google
            alert(
              `This email is already associated with Google. Please sign in with Google.`
            );

            // Optionally, sign in with Google to link the Facebook credential
            // const googleResult = await signInWithPopup(auth, googleProvider);
            // await linkWithCredential(
            //   googleResult.user,
            //   pendingCredential
            // );
            console.log("Facebook credential linked to Google account.");
          } else {
            alert(
              `This email is associated with another provider: ${signInMethods.join(
                ", "
              )}.`
            );
          }
        } catch (fetchError) {
          console.error("Error fetching sign-in methods:", fetchError.message);
        }
      }
    } else {
      console.error("Error signing in with Facebook:", error.message);
    }
  }
};

  // useEffect(()=>{
  //   getFirebaseToken(setTokenFound)
  //   },[])

  const handleDashBoadrd = () => {
    navigate('/Dashboard');
  };
  const handlePrivacy=()=>{
    navigate('/Privacy')
  }
  const handleTerms=()=>{
    navigate('/Terms')
  }
  // const validateEmail = (email) => {
  //   // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   // return emailRegex.test(email);
  //   if (!email) {
  //     setEmailError('Email is required');
  //   } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
  //     setEmailError('Please enter a valid email');
  //   } else {
  //     setEmailError('');
  //   }
  // };
  const validateEmail = (email) => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[\w-+.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };
  
  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}_|<>]/;
    if (password.length < 8 ) {
      return "Password must be 8+characters long.";
    }
    if (password.length > 16 ) {
      return "Password is too long.";
    }
    if (!specialCharRegex.test(password)) {
      return "Password must have a special character.";
    }
    return '';
  };

  const handleChangeEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    // setEmailError(validateEmail(emailValue) ? '' : 'Please provide a valid email!');
    validateEmail(emailValue)
  };

  const handleChangePassword = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setPasswordError(validatePassword(passwordValue));
  };

  const handleChangeConfirmPassword = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (confirmPasswordValue !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const RegisterFetch =async(e)=> {
    
    e.preventDefault();
    const fcmToken=await sessionStorage.getItem('firebaseToken')

    if (emailError || passwordError || confirmPasswordError || !email || !password || !confirmPassword) {
      errorMessage(emailError || passwordError || confirmPasswordError||'Invalid Email ID or Password!', { autoClose: 1000 });
      return;
    }


    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": email,
  "password": password,
  "confirmpassword": confirmPassword,
  "token": fcmToken
});
console.log('rawdds',raw);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
// alert("Success");
fetch(API_URL4001+"userRegistration", requestOptions)
  .then((response) => response.json())
  .then(result => 
    {
     if(result.Status===true){
      successMessage('Registration Successful!',{
        duration: 1000, // Duration for the toast
          });
          setTimeout(() => {
            navigate('/Dashboard'); // Navigate after toast
          }, 1000); 
        localStorage.setItem('user_id',result.newUser._id)
        console.log(localStorage.getItem('user_id'),'jai')
      localStorage.setItem('accessToken',result.accessToken)
      localStorage.setItem('email_id',result.newUser.email)
      // console.log(localStorage.getItem('accessToken'))
     }
     else{
      console.log(result)
      errorMessage(result.message,{
        autoClose:1000
      })
     } 
  })
  .catch((error) => console.error(error));
   
  };

  
  const RegisterFetchGoogle =async(mail)=> {
    console.log()
    // e.preventDefault();
    const fcmToken=await sessionStorage.getItem('firebaseToken');

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": mail,
  // "password": password,
  // "confirmpassword": confirmPassword,
  "token": fcmToken
});
console.log('rawdds',raw);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
// alert("Success");
fetch(API_URL4001+"userRegistration", requestOptions)
  .then((response) => response.json())
  .then(result => 
    {
     if(result.Status===true){
      successMessage('Registration Successful',{
        duration: 1000, // Duration for the toast
          });
          setTimeout(() => {
            navigate('/Dashboard'); // Navigate after toast
          }, 1000); 
        localStorage.setItem('user_id',result.newUser._id)
        console.log(localStorage.getItem('user_id'),'jai')
      localStorage.setItem('accessToken',result.accessToken)
      localStorage.setItem('email_id',result.newUser.email)
      // console.log(localStorage.getItem('accessToken'))
     }
     else{
      console.log(result)
      errorMessage(result.message,{
        autoClose:1000
      })
     } 
  })
  .catch((error) => console.error(error));
   
  };

  const RegisterFetchApple =async(accessToken,idToken,email)=> {
    console.log(accessToken,'accessToken',idToken,"idToken",email,"email")
    // e.preventDefault();
    // const fcmToken=await sessionStorage.getItem('firebaseToken');

    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email": email,
  // "password": password,
  // "confirmpassword": confirmPassword,
  "token": accessToken,
  // "idToken": idToken
});
console.log('rawdds',raw);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
// alert("Success");
fetch(API_URL4001+"userRegistration", requestOptions)
  .then((response) => response.json())
  .then(result => 
    {
     if(result.Status===true){
      console.log(result,'result');
      
      successMessage('Registration Successful',{
        duration: 1000, // Duration for the toast
          });
          setTimeout(() => {
            navigate('/Dashboard'); // Navigate after toast
          }, 1000); 
        localStorage.setItem('user_id',result.newUser._id)
        console.log(localStorage.getItem('user_id'),'jai')
      localStorage.setItem('accessToken',result.accessToken)
      localStorage.setItem('email_id',result.newUser.email)
      // console.log(localStorage.getItem('accessToken'))
     }
     else{
      console.log(result)
      errorMessage(result.message,{
        autoClose:1000
      })
     } 
  })
  .catch((error) => console.error(error));
   
  };
  return (
    <div className='signuplayout-header' >
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
      <div className='signUp-hello6543' 
              style={{color: darkMode?'white':'black'}}
              >Hello</div>
     
      {/* <div className='signUp-hello6543-subtext'
              style={{color: darkMode?'white':'black'}}
              >
        login with another account
      </div> */}

      <div className="signup-form123">
        
        <form >
        <div className='signUp-hello6543-subtext'
              style={{color: darkMode?'white':'black',textAlign:'center'}}
              >
        Enter your information below 
      </div>
          <div className="form-group568">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              style={{color: darkMode?'white':'black'}}
            />
          </div>
          {emailError && <div className="error-text">{emailError}</div>}

          <div className="form-group568">
            <div className="password-container568">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={handleChangePassword}
               style={{color: darkMode?'white':'black'}}
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
          {passwordError && <div className="error-text">{passwordError}</div>}

          <div className="form-group568">
            <div className="password-container568">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
               style={{color: darkMode?'white':'black'}}
              />
               <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            style={{ cursor: "pointer" }}
          >
            {showPassword?
              <img loading="lazy" src='/assets/openeye.png' alt="" style={{width:'30%'}} />
              :<img loading="lazy"src='/assets/closeeye.png' alt="" style={{width:'30%'}}/>
              }
          </span>
            </div>
          </div>
          {confirmPasswordError && <div className="error-text">{confirmPasswordError}</div>}

          <div className="form-group5689" >
            <button className="linear-button568" type="button" onClick={(e)=>RegisterFetch(e)} style={{color:'white'}}>
              Sign Up
            </button>
          </div>
        </form>

        <div className='social-login-types5681' style={{cursor:'pointer'}}>
          <div className='social-login-types568' onClick={signInWithGoogle}>
            <img loading="lazy" src='/assets/png-transparent-google-logo-google-text-trademark-logo-thumbnail-removebg-preview.png' alt="Google" style={{ height: 28, width: 28 }} />
          </div>
          <div className='social-login-types568' style={{cursor:'pointer'}} onClick={handleAppleLogin}>
            <img loading="lazy" src='/assets/Apple.png' alt="Apple" style={{ height: 28, width: 28 }} />
          </div>
          {/* <div className='social-login-types568' onClick={signInWithFacebook} style={{cursor:'pointer'}}>
            <img loading="lazy" src='/assets/Facebook_Logo_2023-removebg-preview.png')} alt="Facebook" style={{ height: 28, width: 28 }} />
          </div> */}
        </div>

        <div>
        <div className='sinup-bottom-text123' style={{ color: darkMode ? '#B1B8BE' : '#000' }}>
            <span style={{ color: darkMode ? '#B1B8BE' : '#000' }}>
              By logging in, you understand and agree to Bodsphere  
            </span>
            <span style={{ color: '#FF5F67',cursor:'pointer' }} onClick={handlePrivacy}>{' '}Privacy{'  '}Policy </span>and
            <span style={{ color: '#FF5F67',cursor:'pointer' }} onClick={handleTerms}> Terms & Conditions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
