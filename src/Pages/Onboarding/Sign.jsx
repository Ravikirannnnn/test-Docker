import React, { useState, useContext } from 'react';
import './Sign.css';
import { themeContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from 'react-hot-toast';
import { API_URL4001, API_URL4002, API_URL4003, API_URL4004, errorMessage } from '../../Service/ApiService';
import { getFirebaseToken } from '../../Service/FirebaseConfig';
import { auth, googleProvider,provider,OAuthProvider } from '../../Service/FirebaseConfig'; // Adjust the path as needed
import { signInWithPopup,getAuth } from 'firebase/auth';
import CustomModal from '../../Components/Loader/Modal/Modal'

export default function Sign({ handleForgetPasswordClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [CommonModal1, setCommonModal1] = useState(false);
  // const [tokenFound,setTokenFound]= useState(null)
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [Modalpassword, setModalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ModalpasswordError, setModalPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [modalEmail,setModalEmail]=useState('');
  const ModalvalidatePassword = (value) => {
    setModalPassword(value);
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (value.length < 8) {
      setModalPasswordError("Password must be at least 8 characters long.");
    } else if (!specialCharRegex.test(value)) {
      setModalPasswordError("Password must include at least one special character.");
    } else {
      setModalPasswordError("");
    }
  };

  const validateConfirmPassword = (value) => {
    setConfirmPassword(value);
    if (value !== Modalpassword) {
      setConfirmPasswordError("Confirm password does not match the password.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const navigate = useNavigate();
  const handlePrivacy = () => {
    navigate('/Privacy')
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
      await LoginGoogle(result.user.email);  // Ensure we await this function
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };
  // useEffect(()=>{
  // getFirebaseToken(setTokenFound)
  // },[])
  const handleTerms = () => {
    navigate('/Terms')
  }
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
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!password) {
      setPasswordError('Password is required');
    } else if (!strongPasswordRegex.test(password)) {
      setPasswordError(
        'Password must be 8+ characters,|Example:  Yoga@123'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };


  const LoginFetch = async (e) => {

    e.preventDefault();
    const fcmToken = await sessionStorage.getItem('firebaseToken')
    if (emailError || passwordError) {
      return errorMessage(emailError || passwordError || 'Invalid Email ID or Password!');
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
      token: fcmToken,
    });
    console.log('rawlog', raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4002 + "userLogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.Status === true) {
          localStorage.setItem('user_id', result.user._id);
          localStorage.setItem('accessToken', result.accessToken);
          toast.success("Login successful!", {
            duration: 1000, // Duration for the toast
          });
          setTimeout(() => {
            navigate('/Dashboard'); // Navigate after toast
          }, 1000); // Delay to match the toast duration
        } else {
          // toast.error("Invalid Email ID or Password.", {
          //   duration: 1000,
          // });
          toast.error(result.message, {
            duration: 1000,
          });
        }
      })
      .catch((error) => console.error(error));
  };

  const logInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
      // setEmail(result.user.email);
      // console.log(email,'email')
      LoginGoogle(result.user.email);
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
    // const accessToken = credential.accessToken;
    // const idToken = credential.idToken;

    // const email =credential.email || email00;
console.log(email,'email');

    LoginApple(email)
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



const LoginApple = async (mail) => {
  const fcmToken = await sessionStorage.getItem('firebaseToken');

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // setEmail(mail)
  const raw = JSON.stringify({
    email: mail,
    token: fcmToken,
  });
  console.log('rawlog', raw);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(API_URL4002 + "userLogin", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result, 'userLogin');
      if (result.Status === true) {
        localStorage.setItem('user_id', result.user._id);
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('email', result.user.email)
        localStorage.setItem('CustId', result.user.customersId)
        toast.success("Login successful!", {
          duration: 1000,
        });

        setTimeout(() => {
          navigate('/Dashboard'); // Navigate after toast
        }, 1000);
      } else {
        if (result.message == 'Please Set Your Password And Login') {
          // setModalMessage1(result.message)
          setTimeout(() => {
            openPasswordModal(result?.user?.email);
          }, 1000);
          errorMessage(result.message);
          localStorage.setItem('accessToken', result.accessToken);
        }

        else {
          // setModalMessage(result.message)
          // setCommonModal(true)
          errorMessage(result.message);
          // Alert.alert(result.message)
        }
      }
    })
    .catch((error) => console.error("Error during login fetch:", error));
};


  const LoginGoogle = async (mail) => {
    const fcmToken = await sessionStorage.getItem('firebaseToken');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // setEmail(mail)
    const raw = JSON.stringify({
      email: mail,
      token: fcmToken,
    });
    console.log('rawlog', raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4002 + "userLogin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, 'userLogin');
        if (result.Status === true) {
          localStorage.setItem('user_id', result.user._id);
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('email', result.user.email)
          localStorage.setItem('CustId', result.user.customersId)
          toast.success("Login successful!", {
            duration: 1000,
          });

          setTimeout(() => {
            navigate('/Dashboard'); // Navigate after toast
          }, 1000);
        } else {
          if (result.message == 'Please Set Your Password And Login') {
            // setModalMessage1(result.message)
            setTimeout(() => {
              openPasswordModal(result?.user?.email);
            }, 1000);
            errorMessage(result.message);
            localStorage.setItem('accessToken', result.accessToken);
          }

          else {
            // setModalMessage(result.message)
            // setCommonModal(true)
            errorMessage(result.message);
            // Alert.alert(result.message)
          }
        }
      })
      .catch((error) => console.error("Error during login fetch:", error));
  };

  const openPasswordModal =(modalemail)=> {
    setModalEmail(modalemail);
    setCommonModal1(true);
  }

  const closePasswordModal =()=> {
    setCommonModal1(false);
  }

  const SetPassword = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "email": modalEmail,
        "password": Modalpassword,
        "confirmpassword": confirmPassword
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const data = await fetch(API_URL4002 + 'setPassword', requestOptions);
      const result = await data.json();
      console.log('setpassword', result);
      if (!data.ok) {
        throw new Error (result.message || 'password not set');
      }
      localStorage.setItem('user_id', result?.userdata?._id);
      localStorage.setItem('accessToken', result?.userdata?.token);
      localStorage.setItem('email', result?.userdata?.email);
      localStorage.setItem('CustId', result?.userdata?.customersId);
      closePasswordModal();
      toast.success("Password set successfully", {
        duration: 1000,
      });
      LoginApple(result?.userdata?.email)

      // setTimeout(() => {
      //   navigate('/Dashboard'); // Navigate after toast
      // }, 1000);
    } catch (error) {
      console.log('setpassword', error);
      errorMessage(error.message);
    }
  }

  return (
    <div className='signuplayout-header'>
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <div className='signUp-hello123'
        style={{ color: darkMode ? 'white' : 'black' }}
      >Welcome back</div>
      <div className="signup-form123">
        <form>
          <div className="form-group123">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleEmailChange}
              style={{ color: darkMode ? 'white' : 'black' }}
              required
            />
          </div>
          {emailError && <div className='error-message-00'>{emailError}</div>}

          <div className="form-group123">
            <div className="password-container"
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                onChange={handlePasswordChange}
                style={{ color: darkMode ? 'white' : 'black' }}

              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ?
                  <img loading="lazy" src='/assets/openeye.png' alt="" style={{ width: '30%' }} />
                  : <img loading="lazy" src='/assets/closeeye.png' alt="" style={{ width: '30%' }} />
                }
              </span>
            </div>
          </div>
          {passwordError && <div className='error-message-00'> {passwordError.split('|').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}</div>}

          <div className='form-group1234'>
            <div className='forget-password123' onClick={handleForgetPasswordClick}>
              Forgot Password
            </div>
          </div>
          <button className="linear-button123" onClick={(e) => LoginFetch(e)} style={{ color: 'white' }}>
            Login
          </button>
        </form>
        <div className='social-login-types11234'>
          <div className='social-login-types123' style={{ backgroundColor: darkMode ? 'white' : '#454545' }}
            onClick={logInWithGoogle}>
            <img loading="lazy" src='/assets/png-transparent-google-logo-google-text-trademark-logo-thumbnail-removebg-preview.png' style={{marginTop:'0.6px', marginLeft:'1.2px', height: 28, width: 28 }} alt="Google Login" />
          </div>

          <div className='social-login-types123' style={{ backgroundColor: darkMode ? 'white' : '#454545' }}
          onClick={handleAppleLogin}>
            <img loading="lazy" src='/assets/Apple.png' style={{marginBottom:'4px', height: 28, width: 28, filter: darkMode ? "invert(100%)" : "invert(0%)" }} alt="Apple Login" />
          </div>
          {/* <div className='social-login-types123' style={{ backgroundColor: darkMode ? 'white' : '#454545' }} >
            <img loading="lazy" src='/assets/Facebook_Logo_2023-removebg-preview.png')} style={{ height: 28, width: 28 }} alt="Facebook Login" />
          </div> */}
        </div>
        <div>
          <div className='sinup-bottom-text123' style={{ color: darkMode ? '#B1B8BE' : '#000' }}>
            <span style={{ color: darkMode ? '#B1B8BE' : '#000' }}>
              By logging in, you understand and agree to Bodsphere
            </span>
            <span style={{ color: '#FF5F67', cursor: 'pointer' }} onClick={handlePrivacy}>{' '}Privacy{'  '}Policy </span>and
            <span style={{ color: '#FF5F67', cursor: 'pointer' }} onClick={handleTerms}> Terms & Conditions</span>
          </div>
        </div>
      </div>
      <CustomModal isOpen={CommonModal1} title={'Create Password'} onClose={closePasswordModal} >
        <div className="form-group123">
          <input
            type="email"
            placeholder="Password"
            value={Modalpassword}
            onChange={(e) => ModalvalidatePassword(e.target.value)}
            style={{ color: darkMode ? 'white' : 'black' }}
            required
          />
        </div>
        {ModalpasswordError && (
          <p style={{ color: "red", fontSize: 8, paddingTop: 5, textAlign: 'start' }}>{ModalpasswordError}</p>
        )}

        <div className="form-group123">
          <input
            type="email"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => validateConfirmPassword(e.target.value)}
            style={{ color: darkMode ? 'white' : 'black' }}
            required
          />
        </div>
        {confirmPasswordError && (
          <p style={{ color: "red", fontSize: 8, paddingTop: 5, textAlign: 'start' }}>{confirmPasswordError}</p>
        )}
        <div className='setpasswordmodal-button'>
          <button className="linear-button123" onClick={(e) => SetPassword(e)} style={{ color: 'white' }}>
            Change Password
          </button>
        </div>
      </CustomModal>
    </div>
  );
}
