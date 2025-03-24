import React from "react";
import "./BecomeMember.css";
import { useContext, useState } from "react";
import { themeContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import FooterView from "../WelcomePage/FooterView";
import Welcomebenefits from "../WelcomePage/Welcomebenefits";
import { API_URL4008, errorMessage } from "../../Service/ApiService";
import axios from "axios";

export default function BecomeMember() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [loading, setLoading] = useState(false);
  const [sessionLoaded,setSessionLoaded]=useState(false)

  const user_id=localStorage.getItem('user_id')
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
        let returnUrl = window.location.href;
        if (!returnUrl.includes("/#/")) {
          returnUrl = returnUrl.replace(window.location.origin, window.location.origin + "/#");
        }
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

        // console.log(response.data);
        if (response.data.sessionUrl) {
          setSessionLoaded(true);
            window.location.href = response.data.sessionUrl; // Redirect to Stripe Checkout
        }
    } catch (error) {
        console.error("Subscription error:", error);
        errorMessage("Something went wrong!");
    }
};

  const navigate=useNavigate();
  const handleTecherForm=()=>{
    navigate('/Login')
  }
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the element is visible
  });

  const steps = [
    { number: 1, title: 'Step 1', description: 'Subscribe to Bodspheres Mobile App and get access to all the Yoga Teacher Trainings, Music, Yoga Classes and a lot more', icon:'/assets/subscribe.png' },
    { number: 2, title: 'Step 2', description: "Complete the Yoga Teacher Trainings at your own pace and get the Certificate instantly", icon:  '/assets/newfilm.png' },
    { number: 3, title: 'Step 3', description: "Use your Bodsphere's International Certification to submit your application for Bodspheres Accreditation from mobile/ web app and get accredited for FREE", icon: '/assets/digital-certificate.png' },
    // { number: 4, title: 'Time', description: 'Lorem ipsum dolor sit amet', icon: '⏳' },
    // { number: 5, title: 'Success', description: 'Lorem ipsum dolor sit amet', icon: '🏆' }
  ];


  const texts=[
    {title:'Free of Cost',subtext:'Bodsphere Accreditation is free of cost, no renewal/ application fees. Making Yoga accessible & affordable for everyone.'},
    {title:  "World's most accessible and affordable programs",subtext:"Get access to all the Yoga Teacher Trainings, Resources, Music, and Classes for just $5."},
    {title:' Shared Ethical Commitment',subtext:'  Bodsphere is dedicated to upholding high ethical standards in yoga to create a more equitable and inclusive community.'},
    {title: "Join World's Biggest Yoga Community ever, in 190+ Countries",subtext:'Bodsphere events give members the opportunity to connect, collaborate and learn from each other.'},


  ]
  return (
    <div>
      <div className="img-mem-01">
        <img loading="lazy" src="/assets/DSC00100 copy.jpg" alt="" />
        <h3>
        Become a Bodsphere Accredited Yoga Teacher, for Free.
        </h3>
        <button onClick={handleTecherForm} >Start Application</button>
      </div>

      <div
        className="overall-bm"
        style={{
          backgroundColor: darkMode ? "#000" : "rgba(236, 236, 236, 1)",
        }}
      >
        <div className="first-top-bm" >
          <h3>Our Registered Yoga Teacher credentials promote <br />high-quality, inclusive yoga environments.</h3>
          <p  style={{color:darkMode?'white':'black'}}>
          As a Bodsphere Accredited Yoga Teacher, you’re fostering growth and leading a new wave of awareness. By partnering with Bodsphere, you enrich your journey and become a member of the World's Biggest Yoga community. 
{/* <br /> */}
We provide three Bodsphere accredited credentials, all of which require compliance with Bodsphere’s Ethical Commitment.
          </p>
        </div>
        {/* <div className="second-top-bm">
          <h4>CHART YOUR UNIQUE PATH</h4>
          <p>
            Diverse Level of Yoga Experience At GOYA, we recognize the varied
            journeys and expertise of our Certified Yoga Teachers. Our tiered
            certifications celebrate this diversity, allowing teachers to
            specialize and showcase their unique skills and training. From
            foundational hours to specialized practices like Children's Yoga or
            Restorative Yoga, each level represents a teacher's commitment to
            deepening their knowledge and enhancing their teaching prowess.
          </p>
        </div> */}

        {/* 
        
         */}

        {/* <div className="middle-bm-con">
          <h4>Empowering Journeys: Celebrating Yoga Practitioners</h4>
          <span>Student: Yoga Practitioners Matter</span>
          <p  style={{color:darkMode?'white':'black'}}> 
            In essence, student practitioners are the lifeblood of yoga's
            present and the promise of its future. Their passion, dedication,
            and continuous exploration ensure that yoga remains relevant,
            authentic, and ever-evolving. By recognizing and valuing their
            contribution, we not only honour the core principles of yoga but
            also ensure its vibrant growth for generations to come.
          </p>
        </div> */}
      

        {/* <div className="bm-bottom-cont-1">
          <h5>Chart your unique path</h5>
          <h3>Diverse Level of yoga experience</h3>
          <p  style={{color:darkMode?'white':'black'}}>
            We recognize the varied journeys and expertise of our Certified Yoga
            Teachers. Our tiered certifications celebrate this diversity,
            allowing teachers to specialize and showcase their unique skills and
            training. From foundational hours to specialized practices like
            Children's Yoga or Restorative Yoga, each level represents a
            teacher's commitment to deepening their knowledge and enhancing
            their teaching prowess.
          </p>
        </div> */}

        <div className="bottom-box-bm-1">
          <h3>Certified Bodsphere Yoga Teacher 200 (BYT 200)</h3>
          <li>Application Fee: None</li>
          <li>Renewal Fee: None</li>
          <li>
          Teaching Requirements: None
          </li>
          <text>Note: Teachers can achieve the BYT 500 credential by finishing Bodsphere's 200-Hour and 300-Hour Yoga Teacher Training Programs.</text>
        </div>
        <div className="bottom-box-bm-2">
          <h3>Certified Bodsphere Yoga Teacher 500 (BYT 500)</h3>
          <li>Application Fee: None</li>
          <li>Renewal Fee: None</li>
          <li>
          Teaching Requirements: Teachers must have at least 10 hours of teaching experience or personal practice following the completion of their 500 hours of training.
          </li>
          <li>Teachers can achieve the BYT 500 credential by finishing Bodsphere's 200-Hour and 300-Hour Yoga Teacher Training Programs.</li>
        </div>
        <div className="bottom-box-bm-3">
          <h3>Certified Bodsphere Continuing Education Provider (BCEP)</h3>
          <li>Application Fee: None</li>
          <li>Renewal Fee: None</li>
          <li>
          Teaching Requirements: None
          </li>
          <li>Teachers can achieve the BYT 200 credential by finishing Bodsphere's Yoga Teacher Trainings like Yoga Nidra, Yin Yoga, Children's Yoga, Prenatal.</li>
          <li>Restorative Yoga, Ayurveda and other courses (except Bodsphere's 200-Hour and 300-Hour Yoga Teacher Training).</li>
        </div>

              <div className="middle-main-tags">
                <h1>Why apply for Bodsphere Credential?</h1>
              {texts.map((text)=>(
                <div className="tag-middle">
                  <h3>{text.title}</h3>
                  <p  style={{color:darkMode?'white':'black'}}>{text.subtext}</p>
                </div>
                 ))}
              </div>


              <div className="main-bar-bm" ref={statsRef}>
          <div className="bar-bm-div01">
            <h3>
              {statsInView && <CountUp start={0} end={120000} duration={5} suffix="+"/>}
            </h3>
            <p >
              Members <br /> Enrolled
            </p>
          </div>
          {/* <div className="bar-bm-div02">
            <h3>
              {statsInView && (
                <CountUp start={0} end={190} duration={5} suffix="+" />
              )}
            </h3>
            <p  style={{color:darkMode?'white':'black'}}>
              Global Presence <br /> Countries
            </p>
          </div> */}
          <div className="bar-bm-div03">
            <h3>
              {statsInView && <CountUp start={0} end={190} duration={5} suffix="+"/>}
            </h3>
            <p>
            Global Presence <br /> Countries
            </p>
          </div>
        </div>

<div className="new-middd">        
  <h1>How to Apply?</h1>
  <div className="flow-chart" >
      {steps.map((step) => (
        <div key={step.number} className="flow-step" >
          {/* <div className="step-number">{step.title}</div> */}
          {/* <img >{step.icon}</img> */}
          <img style={{filter:darkMode? 'invert(100%)':'invert(0%)'}} className="step-icon" src={step.icon} alt="" />
          <h3 className="step-title" style={{color:darkMode?'white':'black'}}>{step.title}</h3>
          <p className="step-description"  style={{color:darkMode?'white':'black'}}>{step.description}</p>
        </div>
      ))}
    </div>
    </div>
<div className="new-desc-box">
    <div className="cover-prm-mdl" >

          <div className="discreption-box">
          <h1> Get unlimited access to everything</h1>
            <h2>Unlimited Access to all Yoga Teacher Trainings (World’s First and Most Affordable and Accessible Trainings)</h2>
            <div className="lis-div">
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
          <div className='new-pricing-div-bm'>
          <div
            className="premium-modal"
            style={{
              backgroundColor: darkMode
                ? "rgba(28, 28, 30, 1)"
                : "rgba(236, 236, 236, 1)",
            }}
          >
            {/* <div className="premium-top-title-bm">Be Premium</div> */}
            <div className="premium-title-bm">
            Become a part of Bodsphere's <br />Yogic Revolution
            </div>
            {/* <div className="premium-text-bm">
              When you subscribe, you’ll get <br />
              instant unlimited access
            </div> */}

            <div>
              <div
                className="radio-container-bm"
                style={{
                  cursor:'pointer',
                  backgroundColor:
                    selectedOption === "monthly" ? "#FF5F6747" :darkMode? '#2c2c2e': "white",
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
                <div className="radio-contents-container-1-bm" for="radio1">
                  <div>
                    <div className="radio-head-1-bm">Monthly</div>
                    <div
                      className="radio-tail-1-bm"
                      // style={{
                      //   color:
                      //     selectedOption === "monthly" ? "#ff5f67" : "#ffffff",
                      // }}
                    >
                      Pay monthly
                    </div>
                  </div>
                  <div className="radio-right-container-bm">
                    <div className="radio-right-bm">
                      <sup>$</sup>
                      5
                      <sub>/m</sub>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="radio-container-bm"
                style={{
                  cursor:'pointer',
                  backgroundColor:
                    selectedOption === "yearly" ? "#FF5F6747" : darkMode? '#2c2c2e': "white",
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
                <div className="radio-contents-container-2-bm">
                  <div>
                    <div className="radio-head-2-bm">Yearly</div>
                    <div
                      className="radio-tail-2-bm"
                      // style={{
                      //   color:
                      //     selectedOption === "yearly" ? "#ff5f67" : "#ffffff",
                      // }}
                    >
                      Pay for full year
                    </div>
                  </div>
                  <div className="radio-right-container-2-bm">
                    <div className="radio-right-2-bm">
                      <sup>$</sup>
                      49
                      <sub>/y</sub>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
      className="modal-premium-btn-bm"
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
        <Welcomebenefits />


        {/* <div className="footer-screen">
          <img src='/assets/welcomefooter.png")} alt="" />
          <div className="footer-contets">
            <div className="foot-text" style={{color:'white'}}>
              <h3>Want to join our program</h3>
              <p>
                Ob zu Hause oder unterwegs – dein Yoga ist immer dabei – und
                dank der praktischen Downloadfunktion kannst du auch Videos
                üben, wenn du offline bist.
              </p>
            </div>
            <div className="foot-btn">REGISTER </div>
          </div>
        </div> */}
      </div>
      <FooterView />

    </div>
  );
}
