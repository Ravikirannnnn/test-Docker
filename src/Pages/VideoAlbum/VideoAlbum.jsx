import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoAlbum.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from "../../Context";
import { useContext } from 'react';
import { API_URL4000,API_URL4008,errorMessage,ImagePath } from '../../Service/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Modal from '../../Components/Loader/Modal/Modal';
import { fetchPricing } from '../../redux/userSlice';

export default function VideoAlbum() {
  const [videoData, setVideoData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [Category, setCategory] = useState([]); 
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked=userData?.isSubscribed!==true?true:false;
  console.log(isLocked,'isLocked')
  // console.log(userData.isSubscribed,'userData')
  const navigate=useNavigate();
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [sessionLoaded, setSessionLoaded] = useState(false)
    const dispatch = useDispatch();
  const details = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);


  useEffect(() => {
    getAllCategory();
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

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const closeUpgradeModal = () => {
    setUpgradeModal(false);
  };

  const getAllCategory = async () => {
    const accessToken =  localStorage.getItem('accessToken');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(API_URL4000 + 'getAllCategoriesNew', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result,'result')
        if (result.Status === true) {
          setCategory(result.response);
          setSelectedCategory(result.response[0]?._id);
          getCategoryById(result.response[0]?._id);
        }
      })
      .catch((error) => console.error(error));
  };

  const getCategoryById = async (category) => {
    const user_id = localStorage.getItem("user_id");
    const accessToken =  localStorage.getItem('accessToken');
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + accessToken);

    const raw = JSON.stringify({ id: category, user_id: user_id });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(API_URL4000 + 'getCategoryByIdNew', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result,'reresult')
        setVideoData(result.response.subcategories);
      })
      .catch((error) => console.error(error));
  };

  const playVideo = (item) => {
    console.log(item,'bodd');
    if(isLocked){
         setUpgradeModal(true);
      return;
    }
    const video=item;
    navigate('/PlayVideos',{state: {
      id: video._id,
      // tid: video.cat_id,
      vname: video.subcategory_vid,
      title: video.subCatName,
      desc: video.description,
      lenimg: video.subcategory_img,
      // file: files,
      downloadFileName: video.subcategory_vid,
      // audio_files: audio_list,
      likes: video.isliked,
      chunkdatavedio:video.chunk_data,
      Duration:video.duration,
      // intensity:intensity,
      category_id:video.cat_id,
      // sub_Cat_ids:sub_Cat_ids,
      // cat_image:cat_image
    }});
    console.log(video.isliked,'video.isliked')
    console.log(video,'video')
  };

  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
    <div className='y-t-p-tit'>
    <PageTitle title={'Yoga Talks & Practice'} />
  </div>
    <div className='main-222 video-album'>
     {/* <div className='videos-222'>Yoga Talks & Practice</div>
      */}
    
     <div className={`containers-222 ${darkMode === 'dark' ? 'dark-background' : ''}`}>

      <div className="main-container-222">
        <div className="category-scroll-222">
          {Category?.map((category) => (
            <button
              key={category?._id}
              className={`category-button-222 ${
                selectedCategory === category?._id ? 'active-category' : ''
              }`}
              style={{
                backgroundColor: selectedCategory === category?._id ? '#f76b6b' : '', // Dark mode for non-active buttons
                color: selectedCategory === category?._id ? 'white' :'black',
            }}
              onClick={() => {
                setSelectedCategory(category?._id);
                getCategoryById(category?._id);
              }}
            >
              {category?.categoryName}
            </button>
          ))}
        </div>

        <div className="video-slider">
          {videoData.map((item) => (
            <div key={item._id} className="video-div" onClick={() => playVideo(item)}>
            {!loaded && <div className="placeholder"></div>}
            {isLocked && <div className="black-overlay"></div>}
              <img onLoad={() => setLoaded(true)} src={`${ImagePath}${item?.subcategory_img}`} alt={item.subCatName} className="video-thumbnail" loading='lazy'/>
              <span className="video-title">{item?.subCatName}</span>
              {isLocked && <span className="lock-badge-va">🔒</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
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
              <div className="radio-container-st" style={{cursor:'pointer',
                backgroundColor: selectedOption === "monthly" ? "#FF5F6747" :darkMode? '#2c2c2e': "white",
                // selectedOption === "monthly" ? "#FF5F6747" : "gray",
              }}
              onClick={() => handleRadioChange({ target: { value: "monthly" } })}>
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
              <div className="radio-container-st" style={{cursor:'pointer',
                backgroundColor: selectedOption === "yearly" ? "#FF5F6747" :darkMode? '#2c2c2e': "white",
                // selectedOption === "monthly" ? "#FF5F6747" : "gray",
              }}
              onClick={() => handleRadioChange({ target: { value: "yearly" } })}>
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
    </>
  )
}
