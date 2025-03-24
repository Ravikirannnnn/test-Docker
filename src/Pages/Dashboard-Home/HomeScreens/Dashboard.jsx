import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.css";
import { themeContext } from "../../../Context";
import { useNavigate } from "react-router-dom";
import Classes from "../../../Components/Loader/RecommendedClasses/Classes";
import Modal from "../../../Components/Loader/Modal/Modal";
import { API_URL4002, API_URL4003, API_URL4004, API_URL4008, ImagePath, socket } from "../../../Service/ApiService";
import Instructor from "../../../Components/Instructor/instructor";
import Music from "../../../Components/Music/music";
import MembershipCard from "../../../Components/JoinBodsphere/MembershipCard";
import {useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { errorMessage } from "../../../Service/ApiService";
import WelcomeModal from "../../WelcomePage/WelcomeModal02";
import axios from "axios";
import { fetchPricing } from "../../../redux/userSlice";

const Dashboard = () => {
  const [trainingData,setTrainingData]=useState([])
  const [sessionLoaded,setSessionLoaded]=useState(false)
  const [loading, setLoading] = useState(false);

  const [upgradeModal, setUpgradeModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [modalTrail,setModalTrail]=useState(false)
  const [getPremiumModal,setGetPremiumModal]=useState(false);
  // const [selectedOption, setSelectedOption] = useState('monthly');
  const [categoryData,setCategoryData]=useState([])
  const [trainingCategory,setTrainingCategory]=useState([])
  const [chunkData,setChunkData]=useState([])
  const [categoryImage,setCategoryImage]=useState([])
  const [categoryName,setCategoryName]=useState('')
  const [categoryId,setCategoryId]=useState('')
  const [signOutModal,setSignOutModal]=useState(false);
  const [loaded, setLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);
  const imageRef = useRef(null);
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked = userData?.isSubscribed === false;
  const subscriptions=userData?.subscriptionStatus;
  const blockUser=userData?.BlockStatus;
  const dispatch = useDispatch();
  const details = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);
  // console.log(isLocked,'loggg',subscriptions);
  const user_id=localStorage.getItem('user_id');
  
  if(blockUser){
    openSignOutModal(true);
  }
  // const [subscription,setSubscription]=useState('')
  const [dataArray,setDataArray]=useState([])
  const [selectedCategory, setSelectedCategory] = useState(() => {
  return dataArray?.length > 0 ? dataArray[0]?.category?.categoryName : '';
});
const selectedCategoryData = selectedCategory
  ? (dataArray.find(item => item.category.categoryName === selectedCategory)?.subCategory || [])
  : [];


  useEffect(() => {
    fetchRecommendedClasses();
    fetchAllCourse()
    getMainCategory()
    
    // checkUser()
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


  const openSignOutModal=()=>{
    // onClose()
    setSignOutModal(true)
  }
  const closeSignOutModal=()=>{
    setSignOutModal(false)
    signOut()
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
  //         // if (result.userdata.subscriptionStatus) {
  //         //   setSubscription(result.userdata.subscriptionStatus);
  //         // }
          
  //         if (result.userdata.BlockStatus == true) {
  //           // setModalMessage('Admin Has Blocked')
  //           // setCommonModal(true)
  //           openSignOutModal()
  //         }
  //         // const subscription=result.userdata.subscriptionStatus;
  //         // setSubscription(subscription)
  //         // console.log(result)
  //       }
        
  //     })
  //     .catch(error => { console.log('error', error) })
  // }

  const getMainCategory = async () => {
    const accessToken=localStorage.getItem('accessToken')
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
        // console.log('getAllCategory',result)
          const trainingData = result?.categorydata
          ?.filter(item => item?.categorytype === "training")
          .sort((a, b) => new Date(b.date) - new Date(a.date)); 

          if (trainingData.length > 0) {
          const latestTraining = trainingData[0];
          setTrainingData(trainingData);
          // setTrainingName(latestTraining?.categoryName);
          // setImage(latestTraining?.categoryImage);
          // setMainId(latestTraining?._id);
          // setMainImg(latestTraining?.categoryName);
          } else {
          console.log("No training data found.");
          }

      })
      .catch(error => console.log('error', error));
  }

  const getId = async () => {
    const userId=localStorage.getItem('user_id')

    const data = { userid: userId, socketid: socket.id };
    // console.log('userloggedin', data);
    socket.emit('userloggedin', data);
  };


  useEffect(()=>{
    getId();
  },[])

  const signOut=()=>{
    // localStorage.clear()
    localStorage.removeItem('user_id');
  localStorage.clear()
       localStorage.removeItem('darkMode');
       navigate('/')
    //  await toast.success('Signing Off', {
    //   autoClose:1000,
    //   onClose:  handleLandingPage(),
    // });
  }
  
  // console.log(socket);
  

  useEffect(() => {
    socket.on('userBlockStatus', data => {
      if (data.data.BlockStatus == true) {
        signOut();
      }
    });
    // getCategory();
    // getCategory2()
  }, []);


  useEffect(() => {
    if (trainingCategory) {
      // trainingFetch();
    }
  }, [trainingCategory]);
  useEffect(() => {
    if (dataArray.length > 0) {
      setSelectedCategory(dataArray[0]?.category?.categoryName || '');
      setActiveBarItem(dataArray[0]?.category?.categoryName || '');
    }
  }, [dataArray]);


  //  const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';

   const [classesData,setClassesData]=useState([])

   const fetchRecommendedClasses=async()=>{
     const token=await localStorage.getItem('accessToken')
     const userId=localStorage.getItem('user_id')

//      const myHeaders = new Headers();
//  myHeaders.append("Authorization", "Bearer "+token);
 
 
//  const requestOptions = {
//    method: "GET",
//    headers: myHeaders,
//    redirect: "follow"
//  };
 
//  fetch(API_URL4004+"get_recommanded_Classes", requestOptions)
//    .then((response) => response.json())
//    .then((result) => {console.log(result)
//      if(result.Status===true){
//        setClassesData(result.response);
//      }
//    })
//    .catch((error) => console.error(error));
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+token);

const raw = JSON.stringify({
  "user_id": userId
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(API_URL4004+"get_recommanded_Classes", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if(result.Status === true){
      setClassesData(result.response);
    }
    // console.log(result)
  })
  .catch((error) => console.error(error));
   }
 
   const fetchAllCourse=async()=>{
  const user_id=localStorage.getItem('user_id')
     const requestOptions = {
       method: "GET",
       redirect: "follow"
     };
    //  console.log(user_id,'set')
     fetch(API_URL4003+`getAllCousrse/${user_id}`, requestOptions)
       .then((response) => response.json())
       .then((result) => {
        // console.log(result,'subbbbbb')
         if(result.Status===true){
          setDataArray(result.data)
          const categoryName = result.data[0]?.category?.categoryName;
      setSelectedCategory(categoryName || '');
          // console.log(result.data,'arra',result.data[0]?.subCategory[0]?.chunk_data,'subarra')
          setChunkData(result.data[0]?.subCategory[0]?.chunk_data)
          // console.log(result.data[0]?.subCategory.chunk_data,'subarra')

         }
       })
       .catch((error) => console.error(error));
   }

  // const handleRadioChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  const handlePremiumModalClose=()=>{
    setGetPremiumModal(false);
  }
  const handlePremiumModalOpen=()=>{
    setModalTrail(false);
    setGetPremiumModal(true);
  }
  const handleModalClose=()=>{
    setIsModalOpen(false);
  }
  const handleModalOpen=()=>{
    setIsModalOpen(true);
  }

  const trailModalClose=()=>{
    setModalTrail(false);
  }
  const trailModalOpen=()=>{
    setIsModalOpen(false)
    setModalTrail(true)
  }
  useEffect(() => {
    if (modalTrail) {
      handleModalClose();
    }
  }, [modalTrail]);
  

  const handleViewAll = () => {
    console.log("View all clicked");
    // Implement your logic to view all classes
  };

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [activeBarItem, setActiveBarItem] = useState("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const isMobileView = windowWidth <= 800;
  const itemsToShow = isMobileView ? 2 : 3;

  const dashTrainingData = isMobileView
    ? trainingData?.slice(0, 2) // Show only 2 items on mobile
    : trainingData?.slice(0, 3); // Show 3 items on larger screens


    // const ArrayData = isMobileView
    // ? dataArray.slice(0, 2) 
    // : data.slice(0, 3);

  // const yogaTalksVidoes = isMobileView
  //   ? yogaTalks.slice(0, 2)
  //   : yogaTalks.slice(0, 3);

  // const meditationVedios = isMobileView
  //   ? meditation.slice(0, 2)
  //   : meditation.slice(0, 3);

  // const teacherVedios = isMobileView
  //   ? teacher.slice(0, 2)
  //   : teacher.slice(0, 3);
  const handleBarItemClick = (itemName) => {
    setActiveBarItem(itemName);
    
  };

  const navigate=useNavigate();
  const BecomeStudentPath=()=>{
    navigate('/BecomeStudent')
  }
  const PremiumPath=()=>{
    if(isLocked){
      setUpgradeModal(true)
    }else{
    navigate('/Premium')
  }
  }

  const handleSearch=()=>{
    navigate('/Search')
  }
  // const handlePremium=()=>{
  //   navigate('/Premium')
  // }
  const handleInsides=()=>{
    navigate('/InsideCategory')
  }
  const handleTraining=()=>{
    navigate('/CategoryDetails')
  }
  
  const handleDetails = (item) => {
    const id = item._id;
    const image = item.categoryImage
    if(isLocked){
      setUpgradeModal(true);
      return;
    }
    navigate('/InsideCategory', {
      state: {
        sub_Cat_ids: id,
        cat_image:image
      },
    });
  };
  

  // useEffect(() => {
  //   // console.log(subscriptions,'subscription');
    
  //   // Check if user has already seen the modal
  //   const hasSeenModal = localStorage.getItem("seenUpgradeModal");

  //   // if (subscriptions==="not-active") {
  //     if (!hasSeenModal) {
  //     // setUpgradeModal(true);
  //     localStorage.setItem("seenUpgradeModal", "true"); // Store flag
  //   }
  // }, []);
  useEffect(() => {
    // console.log("isLocked:", isLocked, "subscriptions:", subscriptions, "userId:", user_id);

    if (isLocked && subscriptions === "not-active" && user_id) {
      const hasSeenModal = sessionStorage.getItem(`seenUpgradeModal_${user_id}`);

      if (!hasSeenModal) {
        setTimeout(() => {
          setUpgradeModal(true);
        }, 1000);
        sessionStorage.setItem(`seenUpgradeModal_${user_id}`, "true"); // Store flag in sessionStorage (not localStorage)
      }
    }
  }, [isLocked, subscriptions, user_id]); 

  const handleJoin=()=>{
    setUpgradeModal(true);
  }

  const closeUpgradeModal = () => {
    setUpgradeModal(false);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const handlePremium = () => {
  //   closeUpgradeModal(); // Close modal after subscribing
  // };
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

const handleVideoPath=(subItem)=>{
  const { _id, subdown_vid, subCatName, description, subcategory_img, files, category_id, audio_list, isLiked, chunk_data,Duration,intensity,categorytype} = subItem;
      // console.log(subItem,'chunkdata')

      if(isLocked && subItem.subscriptionType === 'Pro'){
        setUpgradeModal(true)
        // errorMessage('Please subscribe to access this content');
        // return;
      }

      else if(categorytype === 'course'){
        navigate('/CourseVideo', {
      state: {
        videoIds:chunk_data[0]._id,
        id: _id,
        // tid: training_id,
        vname: subdown_vid,
        title: subCatName,
        desc: description,
        lenimg: subcategory_img,
        file: files,
        // downloadFileName: downlowd_vid,
        audio_files: audio_list,
        likes: isLiked,
        chunkdatavedio: chunk_data,
        Duration:Duration,
        intensity:intensity,
        category_id:category_id
      }
    });
      }
    
}

  return (
    <div
      className={`dashboard-layout ${
        darkMode ? "background-dashboardblack" : "background-white"
      }`}
    >
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      {/* <WelcomeModal/> */}
      <div className="top-row">
        <div className="dashboard-layoutheader">
          <span className="home-top-title">Yoga Teacher Trainings</span>
          <span className="home-top-see-more" onClick={handleTraining}>See all</span>
        </div>
        <div className="new-top-training">
        {dashTrainingData?.map((item, index) => (
          <div className="top-teacher-training-main-container" onClick={()=>handleDetails(item)} key={index}>
       
            <div className="top-teacher-contents-holder" >
              <div className="top-teacher-training-contents">
              {!loaded && <div className="placeholder"></div>}
              {isLocked && <div className="black-overlay-dash"></div>}
                <img onLoad={() => setLoaded(true)} loading='lazy' src={ImagePath + item?.categoryImage} alt={`Training ${index}` } 
                // style={{opacity:darkMode?'1':'.8'}}
                />
                {/* {item.isPro && <span className="pro-badge">PRO</span>} */}
                <div className="top-timings">
                  <div className="top-content-day" style={{color:'white'}}>{item?.categoryName}</div>
                  {isLocked && <span className="lock-badge-dash">🔒</span>}
                </div>
              </div>
            </div>
        </div>
           ))} 
        </div>
      </div>
      <div className="welcome-page-middle-container-1-11">
           
           <div className="main-side-img-11">
            <div className="left-side-01-11">
            <div className="video-text-01-11" >
                  <h2> Get Internationally Accredited by Bodsphere, from the comfort of your home </h2>
                  <p style={{color:darkMode? 'white':'black'}}>Join the Bodsphere Community and take the first step towards joining the World’s
                  Biggest Community of Yoga Schools and Teachers that represent high quality, safe, affordable, accessible and equitable Yoga.</p>
                  <div className="welcome-page-member-button-01-11" >
              <button onClick={PremiumPath} style={{color:'black'}}><span>Get Accredited</span></button>
            </div>
                </div>
            </div>
            <div className="side-img-11" style={{borderRadius:'40px'}}>
            {!loaded && <div className="placeholder"></div>}
              <img src='/assets/Roadmap.png' ref={imageRef} onLoad={() => setLoaded(true)} loading="lazy" alt="" className={animate ? "slide-in-3d" : ""}/>
            </div>
           </div>
          </div>


      <div className="bar-main-container">
        {/* <div className="main-title-02">Yoga Classes</div> */}
        <div className="bar-row">
          <div
            className="contents-bar"
            // style={{
            //   backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
            // }}
          >
        {dataArray?.map((item,index) => (
              <div
                className="bar-text-1"
                style={{
                  backgroundColor: activeBarItem === item.category.categoryName ? "#FF5F67" : undefined,
                  color: activeBarItem === item.category.categoryName ? "white" : undefined,
                  cursor: "pointer",
                }}
                onClick={() => handleBarItemClick(item.category.categoryName)}
                key={index}
              >
                {item?.category?.categoryName}
              </div>
            ))}
          </div>
          <div className="bar-tail" onClick={handleSearch}>See all</div>
        </div>
        {dataArray?.map((item, index) => (
          <div key={index}>
            {activeBarItem === item.category.categoryName && (
              <div className="teacher-training-main-container-01">
                {item.subCategory?.slice(0, itemsToShow).map((subItem, subIndex) => (
                  <div
                    className="teacher-contents-holder-01"
                    key={subIndex}
                    onClick={() => handleVideoPath(subItem)}
                  >
                    <div className={`teacher-training-contents-01 ${subItem.subscriptionType === 'Pro' && isLocked ?  'pro-overlay' : ''}`}>
                      {!loaded && <div className="placeholder"></div>}
                      <img
                        src={ImagePath + subItem?.subcategory_img}
                        alt=""
                        onLoad={() => setLoaded(true)}
                      />
                      <div className="timings-01">
                        <div className="content-day-01" style={{ color: 'white' }}>
                          {subItem?.subCatName}
                        </div>
                        {subItem.subscriptionType === 'Pro' && isLocked ? (
                          <span className="pro-badge-002">🔒</span>
                        ) : subItem.subscriptionType === 'Preview'&& isLocked? (
                          
                          <span className="preview-button" >Preview</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
      </div>
    )}
  </div>
))}



      </div>
     
      <div className="dash-bottom-container">
      <div className="down-title-container">
          <span className="home-down-title">Recommended Classes</span>
          <span className="home-down-see-more" onClick={()=>navigate('/SeeAllRecommended')}>See all</span>
        </div>
        <Classes classes={classesData} onViewAll={handleViewAll} />
        <div className="down-title-container">
          <span className="home-down-title">Instructor</span>
          <span className="home-down-see-more" onClick={()=>navigate('/SeeAllInstructors')}>See all</span>
        </div>
        <Instructor/>
        <div className="down-title-container">
          <span className="home-down-title">Music</span>
          <span className="home-down-see-more" onClick={()=>navigate('/SeeAllMusic')}>See all</span>
        </div>
        <Music/>
        {isLocked &&
        <div>
      <MembershipCard
        title="Join Bodsphere Membership"
        description="Unlimited Access to all Yoga Teacher Trainings (World's First and Most Affordable and Accessible Trainings)"
        buttonText="Join now"
        onButtonClick={handleJoin}
      />
    </div>
  }
      </div>
      <Modal isOpen={signOutModal} onClose={closeSignOutModal} >
      <div className='signoutbtn' style={{color:darkMode?'white':'black'}}>
        <h1>Admin blocked this user</h1>
        {/* <div className='sign0ut-text'>Your progress remains saved. <br />See you soon?</div> */}
      <button onClick={signOut}>Ok</button>
      </div>
    </Modal>
{isLocked && 
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
              <div className="radio-container-st" style={{
                cursor: 'pointer',
                backgroundColor: selectedOption === "monthly" ? "#FF5F6747" : darkMode ? '#2c2c2e' : "white",
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
              <div className="radio-container-st" style={{
                cursor: 'pointer',
                backgroundColor: selectedOption === "yearly" ? "#FF5F6747" : darkMode ? '#2c2c2e' : "white",
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
        }
      {/* <div className="dash-bottom-container">
      <div className="down-title-container">
          <span className="home-down-title">Instructor</span>
          <span className="home-down-see-more">View all</span>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
