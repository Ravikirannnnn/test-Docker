import React from 'react';
import './Impact.css';
import { useState ,useContext} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';
import axios from "axios";

import Welcomebenefits from '../WelcomePage/Welcomebenefits';
import FooterView from '../WelcomePage/FooterView';
import { themeContext } from "../../Context";
import {successMessage,errorMessage} from '../../Service/ApiService';
import Modal from '../../Components/Loader/Modal/Modal';
import { API_URL4011 } from '../../Service/ApiService';

export default function BecomeMember() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [frequency, setFrequency] = useState('One Time');
  const [amount, setAmount] = useState('5');
  const [customAmount, setCustomAmount] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const [selectedCause, setSelectedCause] = useState('global-health');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Custom email validation logic
    if (name === "email") {
      // Basic HTML5 email validation will be triggered when the user submits, but you can also add custom checks
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(value)) {
        setFormData({
          ...formData,
          email: value,
          emailError: "Please enter a valid email address",  // Custom error message
        });
      } else {
        setFormData({
          ...formData,
          email: value,
          emailError: "",  // Clear error if the email is valid
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCauseChange = (event) => {
    setSelectedCause(event.target.value);
  };
  
  console.log("selectedCause",selectedCause);

  // const handleFrequencyChange = (newFrequency) => {
  //   setFrequency(newFrequency);
  // };

  const handleAmountChange = (newAmount) => {
    setAmount(newAmount);
    setIsOtherSelected(newAmount === 'Other');
  };

  const handleCustomAmountChange = (e) => {
    let value = e.target.value;
  
    // Remove non-numeric characters except digits
    value = value.replace(/[^0-9]/g, "");
  
    // Ensure the first digit is not 0
    if (value.startsWith("0")) {
      value = value.substring(1);
    }
  
    // Restrict length to 10 digits
    if (value.length > 10) {
      value = value.substring(0, 10);
    }
  
    setCustomAmount(value);
    setAmount(value);
  };
  

  // const handleSubmit = async () => {
  //   successMessage("Login successful!");
  //   console.log("trigerrred");
  //   // Here, integrate with Stripe or any other payment gateway
  // };

  console.log("amount",amount);
  console.log("object",formData);


  const handlePayment = async () => {
    const { username, email, phone } = formData;

    let finalAmount = amount === "" ? Number(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) {
      errorMessage("Please enter a valid amount");
      return;
    }
    if (!username || !email || !phone || !selectedCause ) {
      errorMessage("Please fill in all the details");
      return;
    }
  
    try {
      // Call backend to create an order
      const { data } = await axios.post(API_URL4011+"razorpay-donation-create-order", {
        amount: finalAmount,
        name: username,
        email,
        phone,
        cause:selectedCause
      });
      console.log(data);
  
      if (!data || !data.orderId) {
        errorMessage("Error creating order");
        return;
      }
  
      // Razorpay payment options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount * 100, // Convert to paisa
        currency: "USD",
        name: "Bodsphere",
        description: "Donation",
        order_id: data.orderId, // Order ID from backend
        handler: function (response) {
          successMessage("Thank you for your donation!");
          verifyPayment(response); // Call backend to verify payment
        },
        prefill: {
          name:username,
          email,
          contact: phone,
        },
        theme: {
          color: "#528FF0",
        },
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Payment error:", error);
      errorMessage("Error processing payment");
    }
  };

  const verifyPayment = async (paymentResponse) => {
    try {
      await axios.post(API_URL4011+"razorpay-donation-verify-payment", paymentResponse);
      successMessage("Thank you for your donation!");
    } catch (error) {
      console.error("Payment verification error:", error);
    }
  };

  return (
    <div>
    <Toaster
            toastOptions={{
              style: { backgroundColor: '#222122', color: '#fff' },
            }}/>
      {/* Top section with the main vision */}
      <div className='img-mem'>
        <img loading="lazy" src='/assets/multi-racial-smiling-people-lie-on-mats-after-doin-2024-08-05-16-35-07-utc.jpg' alt="" />
        <h3>Our vision is to improve people’s health and the sustainability of society and the planet.</h3>
      </div>

      {/* Main content section */}
      <div className='overall-im' style={{
          backgroundColor: darkMode ? "#000" : "white",
        }}>
        <div className='all-top-contents-container'>
          {/* Repeated content blocks */}
          <div className='im-content-main'>
            <div className='im-content-img'>
            <img loading="lazy" src='/assets/meet-up-retired-wellbeing-pensioner-workout-concep-2023-11-27-05-13-07-utc.jpg' alt="" />
            </div>
            <div className='im-contnet-text'>
              <h2>Global Health</h2>
              <p style={{color:darkMode?'white':'black'}}>Bodsphere addresses common health issues such as Diabetes, Cardiovascular Diseases, Cancer, Tuberculosis and a lot more.</p>
            </div>
          </div>

          <div className='im-content-main'>
            <div className='im-contnet-text'>
              <h2>Women empowerment</h2>
              <p style={{ color:darkMode?'#fff':'#000'}}>
                Bodsphere promotes gender equality and ensures that women have equal rights, opportunities, and resources to thrive. We work upon fostering self-confidence, encouraging leadership, and supporting women's access to education, healthcare, and economic opportunities.</p>
            </div>
            <div className='im-content-img'>
              {/* <img loading="lazy" src='/assets/group-of-smiling-indian-school-children-in-uniform-2023-11-27-05-34-41-utc.jpg')} alt="" /> */}
              <img loading="lazy" src='/assets/strong-women-support-group-2023-11-27-05-15-15-utc (1).jpg' alt="" />

            </div>
          </div>

          <div className='im-content-main'>
            <div className='im-content-img'>
              <img loading="lazy" src='/assets/group-of-smiling-indian-school-children-in-uniform-2023-11-27-05-34-41-utc.jpg' alt="" />
            </div>
            <div className='im-contnet-text'>
              <h2>Education</h2>
              <p style={{ color:darkMode?'#fff':'#000'}}>
                Bodsphere fosters inclusive learning environments and promotes lifelong learning to break down barriers and create opportunities, inspiring individuals to reach their full potential for a brighter future.</p>
            </div>
          </div>

          <div className='im-content-main'>
            <div className='im-contnet-text'>
              <h2>Water, Sanitation & Hygiene</h2>
              <p style={{ color:darkMode?'#fff':'#000'}}>Bodsphere Foundation is committed to ensuring universal access to clean water, adequate sanitation, and proper hygiene practices.</p>
            </div>
            <div className='im-content-img'>
            <img loading="lazy" src='/assets/asian-boy-help-her-mother-or-senior-woman-to-wash-2023-11-27-05-23-12-utc.jpg' alt="" />
              {/* <img loading="lazy" src='/assets/multi-racial-smiling-people-lie-on-mats-after-doin-2024-08-05-16-35-07-utc.jpg')} alt="" /> */}
            </div>
          </div>
          {/* <div className='im-content-main'>
            <div className='im-content-img'>
                          <img loading="lazy" src='/assets/meet-up-retired-wellbeing-pensioner-workout-concep-2023-11-27-05-13-07-utc.jpg')} alt="" />
            </div>
            <div className='im-contnet-text'>
              <h2>Education</h2>
              <p style={{ color:darkMode?'#fff':'#000'}}>
                Bodsphere fosters inclusive learning environments and promotes lifelong learning to break down barriers and create opportunities, inspiring individuals to reach their full potential for a brighter future.</p>
            </div>
          </div> */}

          {/* <div className='im-content-main'>
            <div className='im-content-img'>
              <img loading="lazy" src='/assets/natu-img-2.png')} alt="" />
            </div>
            <div className='im-contnet-text'>
              <h2>Water Sanitation</h2>
              <p>Infectious diseases, diabetes, obesity and cardiovascular disease are a threat to global public health.</p>
            </div>
          </div>

          <div className='im-content-main'>
            <div className='im-contnet-text'>
              <h2>Women Empowerment</h2>
              <p>Infectious diseases, diabetes, obesity and cardiovascular disease are a threat to global public health.</p>
            </div>
            <div className='im-content-img'>
              <img loading="lazy" src='/assets/natu-img-1.png')} alt="" />
            </div>
          </div> */}
        </div>

        {/* Client image and quote section */}
        <div className='client-img'>
          <img  loading="lazy" src='/assets/DSC00050 copy.jpg' alt="" />
          <h5> “In the unity of yoga, every breath connects us. When we work as one, we create harmony not only within ourselves but throughout the world.”</h5>
        </div>

        {/* Middle text section */}
        <div className='middle-text'>
          <h3>Empowering Our Present & Future Together</h3>
          <p style={{color:darkMode?'#fff':'#000'}}>
          The Bodsphere Foundation is dedicated to fostering a world where every individual has the opportunity to thrive. Our mission is to empower communities by 
promoting health, education, and sustainable development. Through innovative programs and 
strategic partnerships, we aim to create lasting change that uplifts lives and inspires hope.
          </p>
        </div>

        {/* Donation call-to-action section */}
        <div className='n-div'>
        <div className='donation-section'>
            <h3>Donate to Bodsphere</h3>
            <span className='new-nnn'>Every  Donation matters</span>
            <div className='donation-container' style={{
          backgroundColor: darkMode ? "#000" : "rgba(206, 216, 206, 133)",
          color:darkMode?'#fff':'#000'
        }}>
              {/* <div className='dona-top-top'>
                <h4 style={{ color:darkMode?'#fff':'#000'}}>Donation Frequency</h4>
                <div className='don-freq-cont'>
                  <div className={`time-don ${frequency === 'One Time' ? 'selected' : ''}`} onClick={() => handleFrequencyChange('One Time')}>One Time</div>
                  <div className={`month-don ${frequency === 'Monthly' ? 'selected' : ''}`} onClick={() => handleFrequencyChange('Monthly')}>Monthly</div>
                  <div className={`year-don ${frequency === 'Yearly' ? 'selected' : ''}`} onClick={() => handleFrequencyChange('Yearly')}>Yearly</div>
                </div>
              </div> */}

              <div className='dona-top-middle'>
                <h4 style={{ color:darkMode?'#fff':'#000'}}>Your contribution amount </h4>
                <div className='don-amount'>
                  {['5', '10', '15', '20', '25', '30', 'Other'].map((amt) => (
                    <div
                      key={amt}
                      className={`dollar-1 ${amount === amt ? 'selected' : ''}`}
                      onClick={() => handleAmountChange(amt)}
                    >
                      {amt === 'Other' ? amt : `$${amt}`}
                    </div>
                  ))}
                </div>
              </div>

              {isOtherSelected && (
                <div className='don-inllll'>
                <input
                style={{
                  backgroundColor: darkMode ? "#000" : "rgba(236, 236, 236, 1)",
                  borderColor: darkMode ? "#000" : "white",
                  color:darkMode?'#fff':'#000'
                }}
                  type="number"
                  placeholder="Enter your amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="custom-amount-input"
                />
                </div>
              )}

             

              <div className='donate-div' >
              <h2 className="donate-heading"  style={{color:darkMode?'white':'black'}} >Why do you want to donate?</h2>
                <div className="donate-select-container">
                  <label className="donate-label">
                    
                    <select className="donate-dropdown" name="donationCause" onChange={handleCauseChange}>
                      <option value="global-health">Global Health</option>
                      <option value="women-empowerment">Women Empowerment</option>
                      <option value="education">Education</option>
                      <option value="water-sanitation">Water Sanitization & Hygiene</option>
                    </select>
                  </label>
                </div>
                <button className="donate-btn" onClick={() => setIsModalOpen(true)}>Donate</button>
              </div>

              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={{ textAlign: "center", width: "100%" }}>
                <h2 style={{fontSize:'1.6rem', marginTop:'-10px'}}>Enter Your Details</h2>
                  <div className="modal-form">
                    <label className='donate-input '>
                      
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className='name-input donate-input'
                      />
                    </label>
                    <label className='donate-input'>
                      
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className='email-input donate-input'
                      />
                      {formData.emailError && <p className="error-message">{formData.emailError}</p>}
                    </label>
                    <label className='donate-input'>
                     
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone"
                        className='phone-input'
                        maxLength="10"
                      />
                    </label>
                    <button className="donate-btn confirm" onClick={handlePayment}>
                      Confirm Donation
                    </button>
                  </div>
                </div>
              </Modal>

              <div className='payment-info'>
                <p style={{color:darkMode?'white':'black'}}>You will be forwarded to Razorpay for the payment processing. All donations are in USD.</p>
                <div className='visa-icons'>
                  <img loading="lazy" src='/assets/visa_img.png' alt="" />
                  
                  <img loading="lazy" src='/assets/Screenshot 2024-09-30 115735.png' alt="" />
                  <img loading="lazy" src='/assets/Screenshot 2024-09-30 115848.png' alt="" />
                  <img loading="lazy" src='/assets/Screenshot 2024-09-30 115905.png' alt="" />
                  <img loading="lazy" src='/assets/Screenshot 2024-09-30 115930.png' alt="" />
                  <img loading="lazy" src='/assets/Screenshot 2024-09-30 115948.png' alt="" />
                  <img loading="lazy" src='/assets/Screenshot 2024-09-30 120004.png' alt="" />
                </div>
              </div>


            </div>
        {/* <div className='end-thankyou'>
          <h2>THANK YOU!</h2>
          <p>Every contribution you make significantly bolsters our mission to nurture and revolutionize the world. Your generosity and unwavering belief in our cause serve as a daily inspiration to us. Sharon Neish | Community Engagement Lead</p>
          <div class="floating-objects"></div>
<div class="orbiting-orbs"></div>
<div class="mandala-center"></div>
        </div> */}
        

          </div>
          </div>
        <Welcomebenefits />

        </div>

        <FooterView />      
        <ToastContainer/>
      </div>
  );
}