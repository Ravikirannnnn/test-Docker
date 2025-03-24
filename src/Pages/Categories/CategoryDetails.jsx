import './CategoryDetails.css';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { themeContext } from "../../Context";
import Modal from '../../Components/Loader/Modal/Modal';
import { API_URL4004, API_URL4008, errorMessage, ImagePath } from '../../Service/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import UpgradeModal from '../WelcomePage/WelcomeModal02';
import axios from 'axios';
import { fetchPricing } from '../../redux/userSlice';


export default function CategoryDetails() {
  const [activeBarItem, setActiveBarItem] = useState('All-Levels');
  const [subCatId, setSubCatId] = useState('');
  const [trainingData, setTrainingData] = useState([]);
  const [sessionLoaded,setSessionLoaded]=useState(false)
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  // const imgPath = 'https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked=userData?.isSubscribed!==true?true:false;
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { sub_Cat_id } = location.state || {};
  const dispatch = useDispatch();
  const details = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);

  useEffect(() => {
    if (sub_Cat_id) {
      setSubCatId(sub_Cat_id);
    }
  }, [sub_Cat_id]);

  useEffect(() => {
    getMainCategory();
  }, []);

  useEffect(() => {
    if (details) {
      setCurrency(details?.monthly?.currency || '');
      setMonthlyPrice(details?.monthly?.amount || 0);
      setYearlyPrice(details?.yearly?.amount || 0);
    }
  }, [details]);

  useEffect(() => {
    dispatch(fetchPricing());
    console.log('running');
  }, [])

  const getMainCategory = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(API_URL4004 + "getAllCategory", requestOptions)
      .then(response => response.json())
      .then(result => {
        const trainingData = result?.categorydata
          .filter(item => item?.categorytype === "training")
          .sort((a, b) => new Date(b.date) - new Date(a.date)); 

          console.log(trainingData);
          console.log(result);

          
          
        if (trainingData.length > 0) {
          setTrainingData(trainingData);
        } else {
          console.log("No training data found.");
        }
      })
      .catch(error => console.log('error', error));
  };

  const navigate = useNavigate();
 

  const handleActive = (itemName) => {
    setActiveBarItem(itemName);
  };


  const [upgradeModal, setUpgradeModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("monthly");

  // useEffect(() => {
  //   // Check if user has already seen the modal
  //   const hasSeenModal = localStorage.getItem("seenUpgradeModal");

  //   if (!hasSeenModal) {
  //     setUpgradeModal(true);
  //     localStorage.setItem("seenUpgradeModal", "true"); // Store flag
  //   }
  // }, []);

  const closeUpgradeModal = () => {
    setUpgradeModal(false);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePremium = () => {
    console.log("Subscribed to:", selectedOption);
    closeUpgradeModal(); // Close modal after subscribing
  };

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
      let returnUrl = window.location.href;
      if (!returnUrl.includes("/#/")) {
        returnUrl = returnUrl.replace(window.location.origin, window.location.origin + "/#");
      }

        // Send request to backend with IP
        const response = await axios.post(
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
        errorMessage("Something went wrong! Please try again.");
    }
};
const handleInsideCategory = (item) => {

  if(isLocked){
    setUpgradeModal(true);
    return;
  }
  navigate('/InsideCategory', {
    state: {
      sub_Cat_ids: item._id,
      cat_image:item.categoryImage
    }
  });
};
  return (
    <div className='overall-details-cat'>
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      {/* <UpgradeModal/> */}

      <div className='new-tot'>
      <PageTitle title={'Yoga Teacher Trainings'} />
      </div>
      <div className='details-main-container'>
        <div className='details-bar'
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}
        >
          <div className='detail-1'
            style={{
              backgroundColor: activeBarItem === 'All-Levels' ? "#FF5F67" : undefined,
              color: activeBarItem === "All-Levels" ? "white" : undefined,
              cursor: "pointer"
            }}
            onClick={() => handleActive('All-Levels')}
          >All Levels</div>
          <div className='detail-2'
            style={{
              backgroundColor: activeBarItem === 'Continuing-Education' ? "#FF5F67" : undefined,
              color: activeBarItem === "Continuing-Education" ? "white" : undefined,
              cursor: "pointer"
            }}
            onClick={() => handleActive('Continuing-Education')}
          >Continuing Education</div>
        </div>

        {/* Display data based on the selected tab */}
        {activeBarItem === 'All-Levels' ? (
          <div className='details-content-container'>
            {trainingData.map((item) => (
              <div key={item._id} className='img-content-details' onClick={() => handleInsideCategory(item)}>
                {isLocked && <div className="black-overlay"></div>}
                <img loading="lazy" src={ImagePath + item.categoryImage} alt="" />
                {/* {item.subscriptionType === 'Preview' ? <span className="pro-badge-02">Preview</span> :
                  item.subscriptionType === 'Pro' ? <span className="pro-badge-02">PRO</span> : ''} */}
                <div className='text-container'>
                  <div className='details-maintext'>{item.categoryName}</div>
                  {/* <div className='details-subtext'><span>|</span>{item.subCatTitle}</div> */}
                </div>
                {isLocked && <span className="lock-badge-category">🔒</span>}
              </div>
            ))}
          </div>
        ) : (
          <div className='details-content-container'>
            {trainingData
              .filter(item => item.isContinuingEducation === true)
              .map((item) => (
                <div key={item._id} className='img-content-details' onClick={() => handleInsideCategory(item)}>
                   {isLocked && <div className="black-overlay"></div>}
                  <img loading="lazy" src={ImagePath + item.categoryImage} alt="" />
                  {/* {item.subscriptionType === 'Preview' ? <span className="pro-badge-02">Preview</span> :
                    item.subscriptionType === 'Pro' ? <span className="pro-badge-02">PRO</span> : ''} */}
                  <div className='text-container'>
                    <div className='details-maintext'>{item.categoryName}</div>
                    {/* <div className='details-subtext'><span>|</span>{item.subCatTitle}</div> */}
                  </div>
                {isLocked && <span className="lock-badge-category">🔒</span>}

                </div>
              ))}
          </div>
        )}
      </div>
      {
        // showModal && (
          <Modal isOpen={upgradeModal} onClose={closeUpgradeModal}>
          <div style={{ color: darkMode ? "white" : "black" }}>
            <div className="premium-top-title-st">Be Premium</div>
            <div className="premium-title-st">
              Get Unlimited <br /> Access
            </div>
            <div className="premium-text-st">
              When you subscribe, you’ll get <br />
              instant unlimited access
            </div>
    
            <div>
              {/* Monthly Option */}
              <div className="radio-container-st" style={{ backgroundColor: "#FF5F6747" }}>
                <input
                  type="radio"
                  name="option"
                  id="radio1"
                  value="monthly"
                  onChange={handleRadioChange}
                  checked={selectedOption === "monthly"}
                />
                <label className="radio-contents-container-1-st" htmlFor="radio1">
                  <div>
                    <div className="radio-head-1-st">Monthly</div>
                    <div className="radio-tail-1-st">Pay monthly</div>
                  </div>
                  <div className="radio-right-container-st">
                    <div className="radio-right-st">
                    <sup>{currency}</sup>{monthlyPrice}<sub>/m</sub>
                    </div>
                  </div>
                </label>
              </div>
    
              {/* Yearly Option */}
              <div className="radio-container-st" style={{ backgroundColor: "#FF5F6747" }}>
                <input
                  type="radio"
                  name="option"
                  id="radio2"
                  value="yearly"
                  onChange={handleRadioChange}
                  checked={selectedOption === "yearly"}
                />
                <label className="radio-contents-container-2-st" htmlFor="radio2">
                  <div>
                    <div className="radio-head-2-st">Yearly</div>
                    <div className="radio-tail-2-st">Pay for full year</div>
                  </div>
                  <div className="radio-right-container-2-st">
                    <div className="radio-right-2-st">
                    <sup>{currency}</sup>{yearlyPrice}<sub>/y</sub>
                    </div>
                  </div>
                </label>
              </div>
            </div>
    
            {/* <div className="modal-premium-btn-st-00" style={{cursor:'pointer'}} onClick={handleSubscribe}>
              Subscribe Now
            </div> */}
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
        </Modal>
        // )
      }
    </div>
  );
}
