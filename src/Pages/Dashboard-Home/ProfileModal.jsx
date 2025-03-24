import React from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './ProfileModal.css'
import Switch from "react-switch";
import { FormControlLabel } from '@material-ui/core';
import { themeContext } from "../../Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../../Components/Loader/Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL4002, API_URL4008, API_URL4010, errorMessage, ImagePath, successMessage } from '../../Service/ApiService';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon } from 'react-icons/fa';
import ThemeSwitch from './ThemeSwitch';
import { fetchUserProfile } from "../../redux/userSlice";
import { fetchSchoolProfile } from "../../redux/schoolSlice";
import axios from 'axios';
import { fetchPricing } from '../../redux/userSlice';

const ProfileModal = ({ isOpen, onClose }) => {
  const [signOutModal, setSignOutModal] = useState(false);
  const [upgradeModal, setUpgradeModal] = useState(false)
  const [image, setImage] = useState('');
  const [name, setName] = useState('')
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const userProfile = useSelector((state) => state.user.profile);
  const userId = localStorage.getItem('user_id')

  const [selectedOption, setSelectedOption] = useState("monthly");
  const [destName, setDestName] = useState([])
  const [newArray, setNewArray] = useState([])
  const [subscription,setSubscription]=useState('')
  const { data, designationNames, error } = useSelector((state) => state.schoolProfile);
  // console.log(userProfile,'designationNames',designationNames);
  const [loading, setLoading] = useState(false);
  const [sessionLoaded,setSessionLoaded]=useState(false)
  const dispatch = useDispatch();
  const details = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const userData = useSelector((state) => state.user.profile?.userdata);
    const isLocked = userData?.isSubscribed === false;

    // console.log('isLocked',isLocked);
    
  const user_id=localStorage.getItem('user_id');
    const accessToken=localStorage.getItem('accessToken')
    const handleSubscribe = async () => {
      setLoading(true);
      console.log('triggered');
      
      if (!user_id) {
          navigate('/login');
          return;
      }
  
      try {
          // Fetch user's IP address
          setSessionLoaded(false);
          const ipResponse = await axios.get("https://api64.ipify.org?format=json");
          const userIp = ipResponse.data.ip;
          // const currency=ipResponse.data.currency;
          // console.log(currency)
          const returnUrl = window.location.href;
          // Send request to backend with IP
          const response = await axios.post(
            // "https://bodspheretest.bodsphere.com:4008/stripe-subscription",
                      API_URL4008+"stripe-subscription",
            {
            
                planType: selectedOption, 
                user_id,
                ip: userIp,
                returnUrl
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
  
          console.log(response.data);
          if (response.data.sessionUrl) {
            setSessionLoaded(true);
              window.location.href = response.data.sessionUrl; // Redirect to Stripe Checkout
          }
      } catch (error) {
          console.error("Subscription error:", error);
          errorMessage("Something went wrong!");
      }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = windowWidth <= 800;

  // console.log(subscription,'subscription')

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  // console.log(userProfile,'fetchUserProfile')
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile());
      dispatch(fetchSchoolProfile())
      // getAcceredation()
      // handlFetchPrice();
    }
  }, [userId, dispatch]);

  useEffect(()=>{
    dispatch(fetchPricing());
    console.log('running');
  },[])

    useEffect(() => {
      if (details) {
        setCurrency(details?.monthly?.currency || '');
        setMonthlyPrice(details?.monthly?.amount || 0);
        setYearlyPrice(details?.yearly?.amount || 0);
      }
    }, [details]);


  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const handleToggle = (darkModeEnabled) => {
  //   setIsDarkMode(darkModeEnabled);
  //   document.body.style.backgroundColor = darkModeEnabled ? '#222' : '#fff';
  // };
  // useEffect(()=>{
  //   checkUser()
  // },[])

  // console.log(destName,'destname')
  // const getAcceredation = () => {
  //   const user_id = localStorage.getItem("user_id");
  //   const token = localStorage.getItem("accessToken");

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", "Bearer " + token);

  //   const raw = JSON.stringify({
  //     user_id: user_id,
  //   });
  //  console.log(user_id,'dd')
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(API_URL4010 + "get_SchoolProfile", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //     if(result.status===true){
  //       setNewArray(result.response)
  //       const extractedDesignationNames = result.response.flatMap((item) =>
  //         item.credentialData
  //           .filter((cred) => cred.isApproval) 
  //           .map((cred) => cred.designationName) 
  //       );
  //       console.log(extractedDesignationNames);

  //     }
  //     })
  //     .catch((error) => console.error("Error fetching accreditation:", error));
  // };

  // Extracting designationName from each credentialData array
  const extractedDesignationNames = data.flatMap((item) =>
    item.credentialData
      .filter((cred) => cred.isApproval)
      .map((cred) => cred.designationName)
  );

  // console.log(extractedDesignationNames,'extractedDesignationNames')
  // // Setting the extracted values in the state
  useEffect(() => {
    setDestName(extractedDesignationNames);
  }, []);
  // console.log(userProfile,'userprofile');


  const NEWdesignationsNames = [
    ...userProfile?.schoolCredentials || [],
    ...userProfile?.teacherCredentials || [],
  ].filter(credential => credential?.isApproved === "Approved")
    .map(credential => credential?.designationName);

  // console.log(NEWdesignationsNames,'mannnn');

  const handleClick = () => {
    console.log("clicking dark mode");
    theme.dispatch({ type: "toggle" });
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);
  const openSignOutModal = () => {
    onClose()
    setSignOutModal(true)
  }
  const closeSignOutModal = () => {
    setSignOutModal(false)
  }
  const openUpgradeModal = () => {
    onClose()
    // navigate('/Premium')
    setUpgradeModal(true)
  }
  const closeUpgradeModal = () => {
    onClose()
    setUpgradeModal(false)
  }
  // const userId=localStorage.getItem('user_id')

  const removeDownloadsForUser = (userId) => {
    let userDownloads = JSON.parse(localStorage.getItem('DownloadedAudios')) || {};
    let videoDownloads = JSON.parse(localStorage.getItem('DownloadedVideos')) || {};

    // Remove only the logged-in user's data
    if (userDownloads[userId]) {
        delete userDownloads[userId];
        localStorage.setItem('DownloadedAudios', JSON.stringify(userDownloads));
    }

    if (videoDownloads[userId]) {
        delete videoDownloads[userId];
        localStorage.setItem('DownloadedVideos', JSON.stringify(videoDownloads));
    }

    console.log(`Downloads cleared for user: ${userId}`);
};
const handleLogout = async() => {
  console.log("running");
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("accessToken");
  // if (userId) {
  //   console.log('foundddddddddddddd');
  //   localStorage.removeItem(`DownloadedAudios_${userId}`); // Remove user-specific audios
  //   localStorage.removeItem(`DownloadedVideos_${userId}`); // Remove user-specific videos (if needed)
  // }
  try {

    const response = await axios.post(
        API_URL4002 + "logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    console.log(response.data);
    localStorage.removeItem("token");
    // successMessage("Logout successful");
} catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
}
  // setAudios([]); // Clear state in UI
  console.log("User logged out, downloaded audios removed.");
  
  // Redirect to login or home page if needed
  // navigate("/login");
};

  // const checkUser = async () => {
  //   const userId=localStorage.getItem('user_id')
  //   const accessToken=localStorage.getItem('accessToken')

  //   // const value1 = JSON.parse(value)
  //   // console.log('value', value)
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", "Bearer " + accessToken);

  //   var raw = JSON.stringify({
  //     "user_id": userId
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch(API_URL4002 + "getUserProfile", requestOptions)
  //     .then(response => response.json())
  //     .then(async result => {
  //       console.log('userProfile',result)
  //       if (result.status === true) {
        
  //         const subscriptions=result.userdata.subscriptionStatus;
  //         setSubscription(subscriptions)
  //       }
        
  //     })
  //     .catch(error => { console.log('error', error) })
  // }
  const signOut = () => {
    handleLogout();
    localStorage.clear()
    // localStorage.removeItem('user_id');
    // if(subscription==="not-active"){
    // localStorage.removeItem("seenUpgradeModal");
    // }
    sessionStorage.removeItem(`seenUpgradeModal_${userId}`);
    // localStorage.removeItem('darkMode');
    removeDownloadsForUser(userId)
    handleLogout();
    // localStorage.clear();
    closeSignOutModal()
    navigate('/')
    // navigate(0);
    //  await toast.success('Signing Off', {
    //   autoClose:1000,
    //   onClose:  handleLandingPage(),
    // });
  }
  const navigate = useNavigate();
  const EditProfilePath = () => {
    onClose()
    navigate('/EditProfile')
  }
  const AccountPath = () => {
    onClose()
    navigate('/Account')
  }
  const HelpPath = () => {
    onClose()
    navigate('/Help')
  }
  const PrivacyPath = () => {
    onClose()
    navigate('/Privacy')
  }
  const TermsPath = () => {
    onClose()
    navigate('/Terms')
  }
  const AboutUsPath = () => {
    onClose()
    navigate('/AboutUs')
  }
  const NotificationPath = () => {
    onClose()
    navigate('/SideNotification')
  }
  const CerficateScreenPath = () => {
    onClose()
    navigate('/CertificateScreen')
  }
  const DownloadPath = () => {
    onClose()
    navigate('/Downloads')
  }
  const LiveEventsPath = () => {
    onClose()
    navigate('/LiveEvents')
  }

  const AccreditedPath = () => {
    onClose()
    navigate('/AccreditedCertificates')
  }
  const FavoritesPath = () => {
    onClose()
    navigate('/Favorites')
  }
  const BillingPath = () => {
    onClose()
    navigate('/Billing')
  }
  const handlePremium = () => {
    onClose()
    // closeUpgradeModal()
    navigate('/Premium')
  }
  const handleLandingPage = () => {
    window.location.reload()
    navigate('/')
  }
  const handleLiveSessions = () => {
    onClose()
    navigate('/GetLiveSessions')
  }
  const AIPath = () => {
    onClose()
    navigate('/AIMusic')
  }
  // useEffect(() => {
  //   getUserProfile();
  // }, []);

  // const getUserProfile =  () => {
  //   const user_id=localStorage.getItem('user_id')
  //   const token= localStorage.getItem('accessToken')

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", "Bearer " + token);

  //   var raw = JSON.stringify({
  //     "user_id": user_id
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch(API_URL4002 + "getUserProfile", requestOptions)
  //     .then(response => response.json())
  //     .then(async result => {
  //       console.log('123',result)       
  //       setImage(result.userdata.profile_img)
  //       setName(result.userdata.name)
  //     })
  //     .catch(error => console.log('error', error));
  // }
  //   const approvedDesignations = userProfile?.credentialData
  //   .filter(item => item?.isApproved === 'Approved')
  //   .map(item => item?.designationName);

  // console.log(approvedDesignations);
  const selectedImage = '/assets/59.png'

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={onClose}
        direction='right'
        className='profile-drawer'
        style={{
          // backgroundColor:darkMode ? "#1C1C1E" : "#ffffff", 
          width: '100vw', maxWidth: '375px', height: '100vh'
          , boxShadow: darkMode
            ? '-5px 0px 15px rgba(0, 0, 0, 0.2), -5px 0px 15px rgba(255, 255, 255, 0.2)' // Left shadow in dark mode
            : '-5px 0px 15px rgba(0, 0, 0, 0.3)',
        }}
      >

        {/* <div className={`new-header ${darkMode ? "backgrond-black" : "background-white"}`}></div> */}
        <div className='profile-modal-main-container' style={{ color: darkMode ? 'white' : 'black' }}>
          <ToastContainer />
          <div className='profile-mdl-wrap'>
            <div className='profile-modal-head'>
              <div className='profile-img-div'>
                {userProfile?.userdata?.profile_img ?
                  <img
                    // src='/assets/59.png')} 
                    src={ImagePath + userProfile?.userdata?.profile_img}
                    alt="profile-img" className='profile-pic' />
                  :
                  <Avatar name={userProfile?.userdata?.name} round={true} className='avatar' />
                }
              </div>
              <div className='profile-name-container'>
                <div className='proifle-name-1' >{userProfile?.userdata?.name}</div>
                  <div className="new-profile-des">
                    {Array.isArray(NEWdesignationsNames) &&
                      // NEWdesignationsNames.map((item) =>
                      //   item === "Bodsphere Yoga Teacher 300 (BYT 300)"
                      //     ? "BYT_300"
                      //     : item === "Bodsphere Yoga Teacher 200 (BYT 200)"
                      //       ? "BYT-200"
                      //       : item === "Bodsphere Yoga School 300 (BYS 300)"
                      //         ? "BYS-300"
                      //         : item === "Bodsphere Yoga School 500 (BYS 500)"
                      //           ? "BYS-500"
                      //           : item === "Bodsphere Yoga Teacher 500 (BYT 500)"
                      //             ? "BYT-500"
                      //             : item === "Bodsphere Yoga School 200 (BYS 200)"
                      //               ? "BYS-200"
                      //               : item === "Bodsphere Continuing Education Provider (BCEP)"
                      //                 ? "BCEP"
                      //                 : ""
                      // )
                      [...new Set(NEWdesignationsNames.map((item) =>
                        item === "Bodsphere Yoga Teacher 300 (BYT 300)"
                          ? "BYT_300"
                          : item === "Bodsphere Yoga Teacher 200 (BYT 200)"
                          ? "BYT-200"
                          : item === "Bodsphere Yoga School 300 (BYS 300)"
                          ? "BYS-300"
                          : item === "Bodsphere Yoga School 500 (BYS 500)"
                          ? "BYS-500"
                          : item === "Bodsphere Yoga Teacher 500 (BYT 500)"
                          ? "BYT-500"
                          : item === "Bodsphere Yoga School 200 (BYS 200)"
                          ? "BYS-200"
                          : item === "Bodsphere Continuing Education Provider (BCEP)"
                          ? "BCEP"
                          : ""
                      ))]
                        .filter(Boolean) // Remove empty strings
                        .join(", ")}
                  </div>

                {/* <div className='proifle-name-2'>{userProfile?.userdata?.name.substring(4,9)}</div> */}
              </div>

            </div>
            <div className='profile-modal-conatiner-1' style={{
              backgroundColor: darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)"
              , boxShadow: darkMode
                ? '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2)'
                : '5px 5px 20px rgba(0, 0, 0, 0.3)',
            }}>
              <div className='profile-1-container-content-1' onClick={EditProfilePath}>
                <div className='content-1-head'>Edit Profile</div>
                <div className='content-1-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              <div className='profile-1-container-content-2' onClick={CerficateScreenPath}>
                <div className='content-2-head'>Bodsphere Certificates</div>
                <div className='content-2-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              {/* <span>Certificates</span> */}
              {/* <span>Account</span> */}
              <div className='profile-1-container-content-3' onClick={AccountPath}>
                <div className='content-3-head'>Account</div>
                <div className='content-3-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              <div className='profile-1-container-content-3' onClick={handleLiveSessions}>
                <div className='content-3-head'>Live Classes</div>
                <div className='content-3-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              {/* <span>Billing</span> */}
              <div className='profile-1-container-content-4' onClick={FavoritesPath}>
                <div className='content-4-head'>
                  Favorites</div>
                <div className='content-4-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>

            </div>
            {/* <div className='profile-modal-conatiner-03' style={{backgroundColor:darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)"}} >
           
          </div> */}
            <div className='profile-modal-conatiner-2' style={{
              backgroundColor: darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)", boxShadow: darkMode
                ? '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2)'
                : '5px 5px 20px rgba(0, 0, 0, 0.3)',
                cursor:'pointer'
            }} onClick={handlePremium}>
              <img src='/assets/Vector (1).png' alt="certificate-icon" className='certificate-icon' style={{ filter: darkMode ? 'invert(0%)' : 'invert(100%)' }} />
              <div className='profile-certificate-text'>
                Use Your Certificates & <br />
                <strong style={{ color: '#FF5F67', fontWeight: '600' }} >Get Accredited by Bodsphere </strong>for Free
              </div>
            </div>
            <div className='profile-modal-conatiner-3' style={{
              backgroundColor: darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)"
              , boxShadow: darkMode
                ? '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2)'
                : '5px 5px 20px rgba(0, 0, 0, 0.3)',
            }} >
              <div className='profile-1-container-content-3' onClick={DownloadPath}>
                <div className='content-3-head'>Downloads</div>
                <div className='content-3-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              <div className='profile-1-container-content-3' onClick={LiveEventsPath}>
                <div className='content-4-head'>
                  Live Events</div>
                <div className='content-4-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              <div className='profile-1-container-content-4' onClick={AccreditedPath}>
                <div className='content-4-head'>
                  Bodsphere Accreditation</div>
                <div className='content-4-tail'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>

            </div>
            <div className='profile-modal-conatiner-5' style={{
              backgroundColor: darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)"
              , boxShadow: darkMode
                ? '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2)'
                : '5px 5px 20px rgba(0, 0, 0, 0.3)',
            }}>
              <div className='profile-modal-notification' onClick={NotificationPath}>
                <div className='profile-notification-title'>Notification</div>
                <div className='profile-notification-icon'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>

              <div className='profile-modal-lightmode'>
                {darkMode ?
                  <div className='profile-lightmode-title'>Lightmode</div>
                  :
                  <div className='profile-lightmode-title'>Darkmode</div>

                }
                {/* className={`toggle ${darkMode ? 'toggle-dark' : 'toggle-light'}`}  */}
                {/* <div className={`toggle ${darkMode ? 'toggle-dark' : 'toggle-light'}`} onChange={handleClick}> */}
                <div className='profile-lightmode-icon'>
                  {/* <FormControlLabel
      control={
        <Switch
          checked={!darkMode} // Dark mode is true when switch is off
          onChange={handleClick}
          color="default"
        />
      }
      label={
        darkMode ? (
          <FaMoon size={20} color="yellow" />
        ) : (
          <FaSun size={20} color="orange" />
        )
      }
      labelPlacement="start"
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    /> */}
                  <div style={{ color: darkMode ? '#fff' : '#000' }}>
                    {/* <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1> */}
                    <ThemeSwitch onToggle={handleClick} />
                  </div>
                </div>
                {/* </div> */}
              </div>
              <div className='profile-modal-notification'onClick={BillingPath}
                style={ { borderBottom: 'none' }}
              >
                <div className='profile-download-title-03'>Manage Membership</div>
                <div className='profile-download-icon-03'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>

              {/* {!isMobileView && <div className='profile-modal-download-03' onClick={AIPath}>
                <div className='profile-download-title-03'>AI Music</div>
                <div className='profile-download-icon-03'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>} */}



            </div>
            <div className='profile-modal-conatiner-5' style={{
              backgroundColor: darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)"
              , boxShadow: darkMode
                ? '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2)'
                : '5px 5px 20px rgba(0, 0, 0, 0.3)',
            }}>
              <div className='profile-modal-policy' onClick={PrivacyPath}>
                <div className='profile-policy-title'>Privacy Policy</div>
                <div className='profile-policy-icon'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              <div className='profile-modal-terms' onClick={TermsPath}>
                <div className='profile-terms-title'>Terms & Conditions</div>
                <div className='profile-terms-icon'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
              <div className='profile-modal-help' onClick={HelpPath}>
                <div className='profile-help-title' >Help & Support</div>
                <div className='profile-help-icon'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>

              <div className='profile-modal-about' onClick={AboutUsPath}>
                <div className='profile-about-title'>About Us</div>
                <div className='profile-about-icon'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
              </div>
            </div>
            {isLocked &&
            <div className='profile-modal-conatiner-6' style={{
              backgroundColor: darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)"
              , boxShadow: darkMode
                ? '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2)'
                : '5px 5px 20px rgba(0, 0, 0, 0.3)',
                cursor:'pointer'
            }}
            onClick={openUpgradeModal}>
              <div className='profile-upgrade-pro'>
                <div className='profile-pro'>
                  PRO
                </div>
                <div className='profile-premium-head'>
                  Upgrade to Premium
                </div >
                <div className='profile-premium-tail'>
                  When you subscribe, you’ll get instant unlimited access
                </div>
              </div>
              <div className='profile-pro-icon'><img src='/assets/Vector (2).png' alt="arrow-icon" /> </div>
            </div>
            }
            <div className='profile-modal-conatiner-7' style={{
              backgroundColor: darkMode ? "#1C1C1E" : "rgba(236, 236, 236, 1)"
              , boxShadow: darkMode
                ? '5px 5px 15px rgba(0, 0, 0, 0.2), -5px -5px 15px rgba(255, 255, 255, 0.2)'
                : '5px 5px 20px rgba(0, 0, 0, 0.3)',
                cursor:'pointer'
            }}
              onClick={openSignOutModal}>
              <div className='profile-signout-title'>Sign Out</div>
              <div className='extra-space'>

              </div>
            </div>
            {/* <div className='profile-modal-conatiner-2'></div> */}
          </div>

        </div>


      </Drawer>
      <Modal isOpen={signOutModal} onClose={closeSignOutModal} >
        <div className='signoutbtn' style={{ color: darkMode ? 'white' : 'black' }}>
          <h1>Are you sure that you <br /> want to sign out?</h1>
          <div className='sign0ut-text'>Your progress remains saved. <br />See you soon?</div>
          <button onClick={signOut}>Yes</button>
          <h5 onClick={closeSignOutModal}>Cancel</h5>
        </div>
      </Modal>
      <Modal isOpen={upgradeModal} onClose={closeUpgradeModal} >
        <div style={{ color: darkMode ? 'white' : 'black' }}>
          {/* <div className="cover-st-mdl"> */}
          {/* <div
            className="premium-modal-st"
            style={{
              backgroundColor: darkMode
                ? "rgba(28, 28, 30, 1)"
                : "rgba(236, 236, 236, 1)",
            }}
          > */}
          <div className="premium-top-title-st">Be Premium</div>
          <div className="premium-title-st">
            Get Unlimited <br /> Access
          </div>
          <div className="premium-text-st">
            When you subscribe, you’ll get <br />
            instant unlimited access
          </div>

          <div>
            <div
              className="radio-container-st"
              style={{cursor:'pointer',
                backgroundColor: selectedOption === "monthly" ? "#FF5F6747" :darkMode? '#2c2c2e': "white",
                // selectedOption === "monthly" ? "#FF5F6747" : "gray",
              }}
              onClick={() => handleRadioChange({ target: { value: "monthly" } })}
            >
              <input
                type="radio"
                name="option"
                id="radio1"
                value="monthly"
                onChange={handleRadioChange}
                checked={selectedOption === "monthly"}
              />
              <div className="radio-contents-container-1-st" for="radio1">
                <div>
                  <div className="radio-head-1-st" >Monthly</div>
                  <div
                    className="radio-tail-1-st"
                  // style={{
                  //   color:
                  //     selectedOption === "monthly" ? "#ff5f67" : "#ffffff",
                  // }}
                  >
                    Pay monthly
                  </div>
                </div>
                <div className="radio-right-container-st">
                  <div className="radio-right-st">
                  <sup>{currency}</sup>{monthlyPrice}<sub>/m</sub>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="radio-container-st"
              style={{cursor:'pointer',
                backgroundColor: selectedOption === "yearly" ? "#FF5F6747" :darkMode? '#2c2c2e': "white",
                // selectedOption === "monthly" ? "#FF5F6747" : "gray",
              }}
              onClick={() => handleRadioChange({ target: { value: "yearly" } })}
            >
              <input
                type="radio"
                name="option"
                id="radio2"
                value="yearly"
                onChange={handleRadioChange}
                checked={selectedOption === "yearly"}
              />
              <div className="radio-contents-container-2-st">
                <div>
                  <div className="radio-head-2-st" >Yearly</div>
                  <div
                    className="radio-tail-2-st"
                  // style={{
                  //   color:
                  //     selectedOption === "yearly" ? "#ff5f67" : "#ffffff",
                  // }}
                  >
                    Pay for full year
                  </div>
                </div>
                <div className="radio-right-container-2-st">
                  <div className="radio-right-2-st">
                  <sup>{currency}</sup>{yearlyPrice}<sub>/y</sub>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
      className="modal-premium-btn-st-00"
      style={{
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={!loading ? handleSubscribe : undefined}
    >
      {loading ? (
        <span className="loader"></span> // Add your loader here
      ) : (
        "Subscribe Now"
      )}
    </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </Modal>
    </>

  );
}

export default ProfileModal;
