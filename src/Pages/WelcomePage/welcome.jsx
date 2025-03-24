import React,{useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";
import { themeContext } from "../../Context";
import { useContext,useState } from "react";
import { useEffect } from "react";
import Welcomecourcecard from "./Welcomecourcecard";
import WelcomeYogaTraning from "./WelcomeYogaTraning";
import WelcomeHeader from "./WelcomeHeader";
import Welcomefooterview from "./Welcomefooterview";
import Testimonials from "./Testimonials";
import FooterView from "./FooterView";
import Welcomebenefits from "./Welcomebenefits";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/userSlice"; 
import { getFirebaseToken } from "../../Service/FirebaseConfig";
import axios from "axios";
import { successMessage,errorMessage, API_URL4008 } from "../../Service/ApiService";
import { Toaster } from 'react-hot-toast';

import UpgradeModal from "./WelcomeModal02";
import { fetchPricing } from "../../redux/userSlice";


export default function Welcome() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const userId=localStorage.getItem('user_id')
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("monthly");
  const dispatch = useDispatch(); // Initialize useDispatch
  const userProfile = useSelector((state) => state.user.profile);
  const userData = useSelector((state) => state.user.profile?.userdata); // Get profile from Redux
  const isLocked = !userData || userData.isSubscribed === false; 
    const [modalOpen, setModalOpen] = useState(false);
  
  // const isLocked = userData?.isSubscribed === false;
  // console.log(isLocked,'loggg');
  const details = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);
   // Get profile from Redux
  // const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [loaded, setLoaded] = useState(false);
  const [sessionLoaded, setSessionLoaded] = useState(true);
  const [animate, setAnimate] = useState(false);
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const user_id=localStorage.getItem('user_id');
  const accessToken= localStorage.getItem('accessToken')
  // console.log('this is loading',loading);
  // console.log(userId);
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  console.log('user profile',userProfile);

  useEffect(()=>{
    getFirebaseToken()
    // handlFetchPrice();
  },[])

  useEffect(() => {
    if (details) {
      setCurrency(details?.monthly?.currency || '');
      setMonthlyPrice(details?.monthly?.amount || 0);
      setYearlyPrice(details?.yearly?.amount || 0);
    }
  }, [details]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile()); 
      // dispatch(fetchPricing());
      // console.log('triggered',user_id);
    }
  }, [userId, dispatch]);

  // console.log(userProfile);
  
useEffect(()=>{
  dispatch(fetchPricing());
  console.log('running');
},[])

  const Loginpath = () => {
    navigate('/Login')
  };
  const Premiumpath = () => {
    navigate('/PremiumBar')
  };
  const BecomeMemberpath = () => {
    if(!isLocked && user_id){
      navigate('/Premium')
    }
    else if(user_id){
      setModalOpen(true)
    }
    else{
    navigate('/Login')
  }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = windowWidth <= 480;
  const isResponsiveView = windowWidth <= 800;

  const text = "the Yogic  World."; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the image is visible
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

    // const fetchPricing = async () => {
    //   try {
    //     // Fetch user's public IP
    //     console.log('running')
    //     const ipResponse = await axios.get("https://api64.ipify.org?format=json");
    //     const userIp = ipResponse.data.ip;
    
    //     // Send request with IP in the body (POST request)
    //     const response = await axios.post("http://localhost:4008/get-stripe-pricing", { ip: userIp });
        
    //     console.log(response,"response");
    //     setCurrency(response.data.pricing.monthly.currency);
    //     setMonthlyPrice(response.data.pricing.monthly.amount);
    //     setYearlyPrice(response.data.pricing.yearly.amount);
    //   } catch (error) {
    //     console.error("Error fetching pricing:", error);
    //     return null;
    //   }
    // };

  const handleSubscribe = async () => {
    setLoading(true)
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
        let returnUrl = window.location.href;
        if (!returnUrl.includes("/#/")) {
          returnUrl = returnUrl.replace(window.location.origin, window.location.origin + "/#");
        }
        // console.log("this is id",user_id,"this is token",accessToken);
        console.log(returnUrl)
        // Send request to backend with IP
        const response = await axios.post(
          // "http://localhost:4008/stripe-subscription",
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
        // console.error("Subscription error:", error);
        console.log(error.response.data.message); 
        errorMessage(`Something went wrong! Error:${error.response.data.message}`);
    }
};


  return (
    
    <div className={`welcome-page-main-container ${darkMode ? "backgrond-black" : "background-white"}`} 
    // style={{paddingBottom:isMobileView&&userId ? '':'10%'}}
    >
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }} />
     {!isMobileView ? (
     <>
        <div className="welcome-page-wrapper">
          <div className="welcome-page-main-content">
            <div className="welcome-page-heading">
              Welcome to <br />
              <strong>
              {text.split("").map((char, index) => (
          <span
            key={index}
            className="fade-letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for correct spacing */}
          </span>
        ))}
      </strong>
            </div>
            <div className="welcome-page-first-text">
            Yoga Teacher Trainings, Classes, Meditation, Pranayama, Music, Philosophy & More.
            <br/>
            {/* <span>Everything under $10.</span> */}
            </div>
            <div className="new-div-">
              <div className="welcome-button" onClick={Loginpath}>
                {!userId &&
                <button className="welcome-signup-button">
                  <span
                    style={{
                      width: "67px",
                      height: "21px",
                      fontFamily: "Poppins-Medium",
                      fontSize:'20px'
                    }}
                  >
                    Sign up
                  </span>
                </button>
                }
              </div>
            </div>
          </div>

          {/* <div className={`welcome-page-main-img ${darkMode ? 'dark-mode' : ''}`}>
            {darkMode ?  <img loading="lazy"
              // src={require("../../Assets/Ellipse 1 (2).png")}
              src={require("../../Assets/DSC00065.jpg")}
              alt="ellipse"
            />: <img loading="lazy"
            // src={require("../../Assets/Ellipse 1 (2).png")}
            src={require("../../Assets/DSC00065.jpg")}
            alt="ellipse"
          />}
           
          </div> */}
        </div>
        </>):(
           <>
           {/* <div className="welcome-page-wrapper"> */}
            <div className="new-mbl-res">
           {/* <div className="welcome-page-main-img" >
           {darkMode ?  <img 
              // src={require("../../Assets/Ellipse 1 (2).png")}
              src={require("../../Assets/DSC00065.jpg")}
              alt="ellipse"
              loading="lazy"
            />: <img 
            // src={require("../../Assets/Ellipse 1 (2=).png")}
            src={require("../../Assets/DSC00065.jpg")}
            alt="ellipse"
            loading="lazy"
          />}
             </div> */}
             <div className="welcome-page-main-content">
             <div className="welcome-page-heading">
              Welcome to <br />
              <strong>
              {text.split("").map((char, index) => (
          <span
            key={index}
            className="fade-letter"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {char === ' ' ? '\u00A0' : char} {/* Use non-breaking space for correct spacing */}
          </span>
        ))}
      </strong>
            </div>
               <div className="welcome-page-first-text">            
               Yoga Teacher Trainings, Classes, Meditation, Pranayama, Music, Philosophy & More. 
               {/* <span>Everything under $5.</span> */}
               </div>
               <div className="center-btn">
                 <div className="welcome-button" onClick={Loginpath}>
                 {!userId &&
                   <button className="welcome-signup-button">
                     <span
                       style={{
                         width: "67px",
                         height: "21px",
                         color:'black'
                        //  fontFamily: "Poppins-Medium",
                       }}
                     >
                       Login/Sign Up
                     </span>
                   </button>
}
                 </div>
               </div>
             </div>
             </div>
             
           {/* </div> */}
           </>
        )}
        <WelcomeHeader />
          <div className="welcome-page-middle-container-1">
            {/* <div className="welcome-page-middle-div-1">
              Get Accredited by Bodsphere
            </div> */}
            {/* <div className="welcome-page-video-img">
              <video autoPlay muted loop id="myVideo" alt=""  >
                <source src={video01} type="video/mp4" />
              </video>
                <div className="video-text">
                  <h2> Get Internationally Accredited by Bodsphere, from the comfort of your home </h2>
                  <p>Join the Bodsphere Community and take the first step towards joining the World’s
                  Biggest Community of Yoga Schools and Teachers that represent high quality, safe, affordable, accessible and equitable Yoga.</p>
                  <div className="welcome-page-member-button" onClick={BecomeMemberpath } >
              <button>Get Accredited</button>
            </div>
                </div>
            </div> */}
            {/* <div className="welcome-page-video-text">
              When you apply to become part of Bodsphere Community, you are taking the first step towards joining the World’s <br /> Biggest Community of Yoga Schools and Teachers that represent high quality, safe, affordable, accessible and <br /> equitable Yoga.
            </div> */}
           <div className="main-side-img">
            <div className="left-side-01">
            <div className="video-text-01" >
                  <h2> Get Internationally Accredited by Bodsphere, from the comfort of your home </h2>
                  <p style={{color:darkMode? 'white':'black'}}>Join the Bodsphere Community and take the first step towards joining the World’s
                  Biggest Community of Yoga Schools and Teachers that represent high quality, safe, affordable, accessible and equitable Yoga.</p>
                  <div className="welcome-page-member-button-01" style={{color:'black'}} onClick={BecomeMemberpath } >
              <button style={{color:'black'}}><span>Get Accredited</span></button>
            </div>
                </div>
            </div>
            <div className="side-img" style={{borderRadius:'40px'}}>
            {!loaded && <div className="placeholder"></div>}
              <img ref={imageRef} src='/assets/Roadmap.png' onLoad={() => setLoaded(true)}  alt=""  className={animate ? "slide-in-3d" : ""} />
            </div>
           </div>
                      <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
           
          </div>
     

        <Welcomecourcecard />
        <Welcomebenefits />
        <Testimonials />
{isLocked===true?
        <div className="new-desc-box-55">
    <div className="cover-prm-mdl-55" >

          <div className="discreption-box-55">
          <h1> Get unlimited access to everything</h1>
            <h2>Unlimited Access to all Yoga Teacher Trainings (World’s First and Most Affordable and Accessible Trainings)</h2>
            <div className="lis-div-55">
            <li>30-Hrs Yoga Nidra Teacher Training</li>
            <li>40-Hrs Chakra Teacher Training</li>
            <li>50-Hrs Pranayama Teacher Training</li>
            <li>60-hrs Yin Yoga Teacher Training</li>
            <li>200-Hrs Yoga Teacher Training</li>
            <li>300-Hrs Yoga Teacher Training</li>
            <li>Become Certified Yoga Teachers from the comfort of your home
            </li>
            <li>Unlimited Access to trainings on Ayurveda, Anatomy & Physiology, etc</li>
            <li>Unlimited Yoga Classes, Meditations, Pranayama & Music</li>
            <li>Free Accreditation by Bodsphere to teach Yoga globally</li>
            </div>
          </div>
          <div className='new-pricing-div-55'>
          <div
            className="premium-modal-55"
            style={{
              backgroundColor: darkMode
                ? "rgba(28, 28, 30, 1)"
                : "rgba(236, 236, 236, 1)",
            }}
          >
            {/* <div className="premium-top-title-bm">Be Premium</div> */}
            <div className="premium-title-bm-55">
            Become a part of Bodsphere's <br />Yogic Revolution
            </div>
            {/* <div className="premium-text-bm">
              When you subscribe, you’ll get <br />
              instant unlimited access
            </div> */}

            <div>
              <div
                className="radio-container-bm-55"
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedOption === "monthly" ? "#FF5F6747" : darkMode ? '#2c2c2e' : "white",
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
                <div className="radio-contents-container-1-bm-55" for="radio1">
                  <div>
                    <div className="radio-head-1-bm-55">Monthly</div>
                    <div
                      className="radio-tail-1-bm-55"
                      // style={{
                      //   color:
                      //     selectedOption === "monthly" ? "#ff5f67" : "#ffffff",
                      // }}
                    >
                      Pay monthly
                    </div>
                  </div>
                  <div className="radio-right-container-bm-55">
                    <div className="radio-right-bm-55">
                      <sup>{currency}</sup>
                      {monthlyPrice}
                      <sub>/m</sub>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="radio-container-bm-55"
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedOption === "yearly" ? "#FF5F6747" : darkMode ? '#2c2c2e' : "white",
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
                <div className="radio-contents-container-2-bm-55">
                  <div>
                    <div className="radio-head-2-bm-55">Yearly</div>
                    <div
                      className="radio-tail-2-bm-55"
                      // style={{
                      //   color:
                      //     selectedOption === "yearly" ? "#ff5f67" : "#ffffff",
                      // }}
                    >
                      Pay for full year
                    </div>
                  </div>
                  <div className="radio-right-container-2-bm-55">
                    <div className="radio-right-2-bm-55">
                      <sup>{currency}</sup>
                      {yearlyPrice}
                      <sub>/y</sub>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
      className="modal-premium-btn-bm-55"
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
          </div>
        </div>
        </div>
        : null
        }
        <WelcomeYogaTraning />
        <div style={{paddingBottom:userId &&isResponsiveView ?'10%':''}}>
        <Welcomefooterview />
        </div>
        {userId &&isResponsiveView ? ""
        :
        <FooterView /> 
      }

     
    </div>
  );
}
