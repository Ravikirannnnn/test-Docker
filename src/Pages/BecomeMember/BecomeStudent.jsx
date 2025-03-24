import React from 'react';
import './BecomeStudent.css'
import { themeContext } from "../../Context";
import CountUp from "react-countup";
import { useContext,useState } from 'react';
import { useInView } from "react-intersection-observer";
import FooterView from '../WelcomePage/FooterView';
import Welcomebenefits from '../WelcomePage/Welcomebenefits';
import { useNavigate } from 'react-router-dom';
import {useRef} from "react";
import { useEffect } from 'react';
import axios from 'axios';
import { API_URL4008, errorMessage } from '../../Service/ApiService';

export default function BecomeStudent() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionLoaded,setSessionLoaded]=useState(false)
  
  const imageRef = useRef(null);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleLogin=()=>{
    navigate('/login')
  }
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
  const handleSchoolForm=()=>{
    navigate('/Login')
  }

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

  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger when 20% of the element is visible
  });
  const arrayCardtext=[
    {
      head:"2 annual Yoga Cenferences:",
      tail:'assa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.'
    },
    {
      head:"Community Connection:",
      tail:'assa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.'
    },
    {
      head:"Featureed as a student:",
      tail:'assa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.'
    }
  ]
  const texts=[
    {title:'Free of Cost',subtext:'Bodsphere Accreditation is free of cost, no renewal/ application fees. Making Yoga accessible & affordable for everyone.'},
    {title:' Worlds most accesible and affordable Programs',subtext:' Get access to ALL the Yoga Teacher Trainings, Resources, Music, Classes in just $5.'},
    {title:' Shared Ethical Commitment',subtext:'  Bodsphere is dedicated to upholding high ethical standards in yoga to create a more equitable and inclusive community.'},
    {title:' Join Worlds Biggest Yoga Community ever, in 190+ Countries',subtext:'Bodsphere events give members the opportunity to connect, collaborate and learn from each other.'},
  ]
  const steps = [
    { number: 1, title: 'Step 1', description: "Subscribe to Bodsphere's Mobile App and get access to all the Yoga Teacher Trainings, Music, Yoga Classes and a lot more", icon:'/assets/subscribe.png' },
    { number: 2, title: 'Step 2', description: "Complete the Yoga Teacher Trainings at your own pace and get the Certificate instantly", icon:  '/assets/newfilm.png' },
    { number: 3, title: 'Step 3', description: "Use your Bodsphere's International Certification to submit your application for Bodspheres Accreditation from mobile/ web app and get accredited for FREE", icon: '/assets/digital-certificate.png' },
    // { number: 4, title: 'Time', description: 'Lorem ipsum dolor sit amet', icon: '⏳' },
    // { number: 5, title: 'Success', description: 'Lorem ipsum dolor sit amet', icon: '🏆' }
  ];

  const pdfUrl ='https://morth.nic.in/sites/default/files/dd12-13_0.pdf'; 

  return (
    <div>
            <div className="img-mem-02">
        <img loading="lazy" src='/assets/DSC00100 copy.jpg' alt="" />
        {/* <div className='top-im-text' > */}
        {/* <h4>GOYA-CYS200</h4> */}
        <h3>
        Become a Bodsphere Accredited Yoga School, for Free.
        </h3>
        <button onClick={handleSchoolForm}>Start Application</button>
        {/* </div> */}
      </div>

      <div className='overall-stu'   style={{
          backgroundColor: darkMode ? "#000" : "rgba(236, 236, 236, 1)",
        }}>
        {/* <div className='stu-top-headings'>
          <h5>Our vision includes value</h5>
          <h3>Your membership translates to value</h3>
        </div> */}

        {/* <div className='stu-top-cards-main'>
          <h3>Student benifiets</h3>
          <div className='stu-cards-wrapper'>
          {arrayCardtext.map((item, index) => (
              <div className='stu-cards' key={index} style={{color:'white'}}>
                <img loading="lazy" src='/assets/card-back.png')} alt="" />
                <h4>{item.head}</h4>
                <p>{item.tail}</p>
              </div>
            ))}
          </div>
        </div> */}
        <div className='stu-middle-text'>
          <h3>Our Bodsphere Yoga School credentials promote high-quality, inclusive yoga environments.</h3>
          <p style={{color:darkMode?'white':'black'}}>As a Bodsphere Accredited Yoga School, you’re fostering growth and leading a new wave of awareness. By partnering with Bodsphere, you enrich your journey and become a member of the World's Biggest Yoga community. </p>
        </div>
        {/* <div
          className="img-content-container-st"
          style={{
            backgroundColor: darkMode ? "rgba(91, 47, 51, 0.29)" : "rgba(236, 236, 236, 1)",
          }}
        >
          <div className="rectangle-img-st">
            <img loading="lazy" src='/assets/Rectangle 977.png")} alt="" />
          </div>
          <div className="right-main-container-st">
           
            <div className="rectangle-right-container-1-st">
              <div className="rectangle-text-st">
                STILL HAVE QUESTIONS?
              </div>
              <div className='sub'>
                  we're here to help you navigate.
                </div>
              <div className='rec-btn'>Register </div>
            </div>
           
          </div>
        </div> */}

        {/* <div className="middle-st-con">
          <h4>Empowering Journeys: Celebrating Yoga Practitioners</h4>
          <span>Student: Yoga Practitioners Matter</span>
          <p>
            In essence, student practitioners are the lifeblood of yoga's
            present and the promise of its future. Their passion, dedication,
            and continuous exploration ensure that yoga remains relevant,
            authentic, and ever-evolving. By recognizing and valuing their
            contribution, we not only honour the core principles of yoga but
            also ensure its vibrant growth for generations to come.
          </p>
        </div> */}

   

              {/* <div className='st-nourish-text'>
                <h2>Nourish your mind & body. <br />
                Cultivate wisdom as you expand your practice.
                </h2>
                <p>From sun salutations to moonlit meditations, we've got resources that'll align your chakras and tickle your funny bone.</p>
                <span> Subscribe today for a journey through mind, body, and spirit.</span>
              </div> */}

        {/* <div className="st-bottom-cont-1">
          <h5>Chart your unique path</h5>
          <h3>Diverse level of yoga experience</h3>
          <p>
            We recognize the varied journeys and expertise of our Certified Yoga
            Teachers. Our tiered certifications celebrate this diversity,
            allowing teachers to specialize and showcase their unique skills and
            training. From foundational hours to specialized practices like
            Children's Yoga or Restorative Yoga, each level represents a
            teacher's commitment to deepening their knowledge and enhancing
            their teaching prowess.
          </p>
        </div> */}

        <div className="bottom-box-st-1">
          <h3>Certified Bodsphere Yoga School 200 (BYS 200)</h3>
          <li>Application Fee: None</li>
          <li>Renewal Fee: None</li>
          <li>
          The core curriculum for BYS 200 must encompass the following four Educational Categories:
          </li>
          <span>
          1. Techniques, Training, and Practice <br />
          2. Anatomy and Physiology <br />
          3. Yoga Humanities <br />
          4. Professional Essentials
          </span>
          <li>
          Each BYS program should evaluate the knowledge, skills, and experiences of trainees prior to awarding a 200-hour yoga teacher training certificate.
          </li>
          <text>
          Note: Bodsphere members can now open their own Yoga School using their own training content or can register for Bodsphere World through which they can make use of videos, resources, etc and conduct every training with Bodsphere Team's help and support (information given below)
          </text>
          <div className="button-container">
      <button className="open-pdf-button" style={{color:darkMode?'white':'black'}} onClick={() => window.open(pdfUrl, '_blank')}>
        Click here for more information
      </button>
    </div>
        </div>
        <div className="bottom-box-st-2">
          <h3>Certified Bodsphere Yoga School 300 (BYS 300)</h3>
          <li>Application Fee: None</li>
          <li>Renewal Fee: None</li>
          <li>
          A BYS 300-Hour Advanced Teacher Training Program expands and deepens trainees' comprehension of the fundamental concepts of yoga practice and teaching.
          </li>
          <li>The core curriculum for BYS 300 programs should include these Educational Categories:</li>
          <span>
          1. Techniques, Training, and Practice <br />
          2. Teaching Methodology <br />
          3. Anatomy and Physiology <br />
          4. Yoga Philosophy, Lifestyle, and Ethics for Yoga Teachers <br />
          5. Practicum
          </span>
          <li>
          Each BYS program must assess the knowledge, skills, and experiences of its trainees before issuing a 300-Hour Yoga Teacher Training Certificate.
          </li>
          <text>
          Note: Bodsphere members can now open their own Yoga School using their own training content or can register for Bodsphere World through which they can make use of videos, resources, etc provided by us and conduct every training with Bodsphere Team's help and support (information given below)
          </text>
          <div className="button-container">
      <button className="open-pdf-button" style={{color:darkMode?'white':'black'}} onClick={() => window.open(pdfUrl, '_blank')}>
      Click here for more information
      </button>
    </div>
        </div>
        <div className="bottom-box-st-3">
          <h3>Certified Bodsphere Yoga School 500 (BYS 500)</h3>
          <li>Application Fee: None</li>
          <li>Renewal Fee: None</li>
          <li>
          A BYS 500-Hour Advanced Teacher Training Program expands and deepens trainees' comprehension of the fundamental concepts of yoga practice and teaching.
          </li>
          <li>The core curriculum for BYS 500 programs should include these Educational Categories:</li>
          <span>
          1. Techniques, Training, and Practice <br />
          2. Teaching Methodology <br />
          3. Anatomy and Physiology <br />
          4. Yoga Philosophy, Lifestyle, and Ethics for Yoga Instructors <br />
          5. Practicum
          </span>
          <li>Each BYS program must assess the knowledge, skills, and experiences of its trainees before issuing a 500-Hour Yoga Teacher Training Certificate.</li>
          <text>
          Note: Bodsphere members can now open their own Yoga School using their own training content or can register for Bodsphere World through which they can make use of videos, resources, etc and conduct every training with Bodsphere Team's help and support (information given below)
          </text>
          <div className="button-container" >
      <button className="open-pdf-button" onClick={() => window.open(pdfUrl, '_blank')} style={{color:darkMode?'white':'black'}}>
      Click here for more information
      </button>
    </div>
</div>

        <div className="bottom-box-st-3">
          <h3>Certified Bodsphere Continuing Education Provider (BCEP)</h3>
          <li>Application Fee: None</li>
          <li>Renewal Fee: None</li>
          <li>
          Teaching Requirements: None
          </li>
          <li>Teachers can achieve the BCEP credential by finishing Bodsphere's Yoga Teacher Trainings like Yoga Nidra, Yin Yoga, Children's Yoga, Prenatal, Restorative Yoga, Ayurveda and other courses (except Bodsphere's 200-Hour and 300-Hour Yoga Teacher Training)</li>
          <text>
          Note: Bodsphere members can now open their own Yoga School using their own training content or can register for Bodsphere World through which they can make use of videos, resources, etc and conduct every training with Bodsphere Team's help and support (information given below)
          </text>
          <div className="button-container">
      <button className="open-pdf-button" style={{color:darkMode?'white':'black'}} onClick={() => window.open(pdfUrl, '_blank')}>
      Click here for more information
      </button>
    </div>
        </div>

        <div className="bottom-box-st-3">
          <h3>Bodsphere World</h3>
         <text>
         Bodsphere World is a collaborative platform that enables Yoga Teachers who are subscribed to our app to conduct Yoga Teacher Training Programs (YTTs) independently while leveraging Bodsphere’s world-class curriculum and resources. This feature bridges the gap between yoga education and accessibility, empowering teachers to grow their impact while we provide the tools and support they need to succeed.
         </text>
          <text>
          Note: You can either open your Yoga School using any of the BYS Credentials, using your own content OR you can do the same by joining Bodsphere World for FREE, starting your own Yoga School with all of Bodsphere's Ready Content and Curriculum.  
          </text>
          <div className="button-container">
      <button className="open-pdf-button" style={{color:darkMode?'white':'black'}} onClick={() => window.open(pdfUrl, '_blank')}>
      Click here for more information
      </button>
    </div>
        </div>

        <div className="hero-section">
  <div className="hero-overlay" >
    <h1>Bodsphere World</h1>
    <p style={{color:darkMode?'white':'black'}}>Where every Bodsphere Teacher can open a Yoga School using Bodsphere's Curriculum.</p>
  </div>
</div>
<div className="main-contents">
  <div className="content-block">
    <h2>Unlimited access to Bodsphere's Content</h2>
    <p >Give access to Bodsphere's videos and resources to your Yoga School members.</p>
  </div>
  <div className="content-block">
    <h2>Collaboration of Practical & Theoretical Knowledge</h2>
    <p >You get to lead all yoga, meditation, and pranayama classes, while the Bodsphere Team handles philosophy, anatomy, Ayurveda, and a lot more via the Bodsphere app.</p>
  </div>
  <div className="content-block">
    <h2>Teach Yoga with Ease</h2>
    <p >Sit back, relax and simply teach Yoga as Bodsphere will help you establish your Yoga School .</p>
  </div>
  <div className="content-block">
    <h2>Unlimited Support</h2>
    <p >All theoretical and other questions of your Yoga School members will be taken care by Bodsphere.</p>
  </div>
</div>
        <div className="middle-main-tags-00">
                <h1>Why apply for Bodsphere Credential?</h1>
              {texts.map((text)=>(
                <div className="tag-middle-00">
                  <h3>{text.title}</h3>
                  <p  style={{color:darkMode?'white':'black'}}>{text.subtext}</p>
                </div>
                 ))}
              </div>

              <div className="main-bar-bm-00" ref={statsRef}>
          <div className="bar-bm-div01-00">
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
          <div className="bar-bm-div03-00">
            <h3>
              {statsInView && <CountUp start={0} end={190} duration={5} suffix="+"/>}
            </h3>
            <p>
            Global Presence <br /> Countries
            </p>
          </div>
        </div>



        <div className="welcome-page-middle-container-1-99">
         
         <div className="main-side-img-99">
          <div className="left-side-01-99">
          <div className="video-text-01-99" >
                <h2> Our Bodsphere Yoga Schools’ credentials define the ethical and educational guidelines for yoga providers. </h2>
                <p style={{color:darkMode? 'white':'black'}}>Whether you are already a Yoga School, or wish to start your own Yoga School or want to collaborate with us through Bodsphere World, everything is possible.</p>
                <div className="welcome-page-member-button-01-99" onClick={handleLogin}>
            <button><span>Get Accredited</span></button>
          </div>
              </div>
          </div>
          <div className="side-img-99" style={{borderRadius:'40px'}}>
            <img ref={imageRef} src='/assets/Roadmap.png' loading="lazy" alt="" className={animate ? "slide-in-3d" : ""} />
          </div>
         </div>
        </div>

        <div className="new-middd-00">        
  <h1>How to Apply?</h1>
  <div className="flow-chart-00" >
      {steps.map((step) => (
        <div key={step.number} className="flow-step-00" >
          {/* <div className="step-number-00">{step.number}</div> */}
          {/* <img >{step.icon}</img> */}
          <img style={{filter:darkMode? 'invert(100%)':'invert(0%)'}} className="step-icon-00" src={step.icon} alt="" />
          <h3 className="step-title-00" style={{color:darkMode?'white':'black'}}>{step.title}</h3>
          <p className="step-description-00"  style={{color:darkMode?'white':'black'}}>{step.description}</p>
        </div>
      ))}
    </div>
    </div>
    <div className="new-desc-box-00">
    <div className="cover-st-mdl">
    <div className="discreption-box-00">
            <h1> Get unlimited access to everything</h1>
            <h2>World’s First and Most Affordable and Accessible Trainings</h2>
            <div className="lis-div-00">
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
          <div className='new-pricing-div'>
          <div
            className="premium-modal-st"
            style={{
              backgroundColor: darkMode
                ? "rgba(28, 28, 30, 1)"
                : "rgba(236, 236, 236, 1)",
            }}
          >
            {/* <div className="premium-top-title-st">Be Premium</div> */}
            <div className="premium-title-st">
              {/* Get Unlimited <br /> Access */}
              Become a part of Bodsphere's <br /> Yogic Revolution
            </div>
            {/* <div className="premium-text-st">
              When you subscribe, you’ll get <br />
              instant unlimited access
            </div> */}

            <div>
              <div
                className="radio-container-st"
                style={{
                  cursor:'pointer',
                  backgroundColor:
                  selectedOption === "monthly" ? "#FF5F6747" : darkMode? '#2c2c2e': "white",
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
                    <div className="radio-head-1-st">Monthly</div>
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
                      <sup>$</sup>
                      19.99
                      <sub>/m</sub>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="radio-container-st"
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
                <div className="radio-contents-container-2-st">
                  <div>
                    <div className="radio-head-2-st">Yearly</div>
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
                      <sup>$</sup>
                      129.99
                      <sub>/y</sub>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                        <div
      className="modal-premium-btn-st"
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

        <Welcomebenefits/>

        {/* <div className="footer-screen-st">
          <img src='/assets/welcomefooter.png")} alt="" />
          <div className="footer-contets-st">
            <div className="foot-text-st" style={{color:'white'}}>
              <h3>Want to join our program?</h3>
              <p>
                Ob zu Hause oder unterwegs – dein Yoga ist immer dabei – und
                dank der praktischen Downloadfunktion kannst du auch Videos
                üben, wenn du offline bist.
              </p>
            </div>
            <div className="foot-btn-st">REGISTER </div>
          </div>
        </div> */}
      </div>
      <FooterView />

    </div>
  )
}
