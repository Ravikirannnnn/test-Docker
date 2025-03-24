import { useState } from "react";
import "./header.css";
import { themeContext } from "../../Context";
import { useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sign from "../../Pages/Onboarding/Sign";
import ProfileModal from "../../Pages/Dashboard-Home/ProfileModal";
import { API_URL4002, ImagePath, successMessage } from "../../Service/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/userSlice"; 
import { fetchNotifications } from '../../redux/notificationSlice'; // Import the action
import Badge from '@mui/material/Badge';
import Avatar from 'react-avatar';
import '../../Service/FirebaseConfig'
import { getFirebaseToken} from "../../Service/FirebaseConfig";
import TrialModal from "../../Pages/WelcomePage/TrialModal";

export default function Headers() {
  const [login,setLogin]=useState(false);
  const [isDrawerOpen,setDrawerOpen]=useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationCount,setNotificationCount]=useState('')
  const userProfile = useSelector((state) => state.user.profile); // Get profile from Redux
  const dispatch = useDispatch(); // Initialize useDispatch
  const userId=localStorage.getItem('user_id')
  const { notifications, loading, error } = useSelector((state) => state.notifications);
  const userData = useSelector((state) => state.user.profile?.userdata); // Get profile from Redux
  const isLocked = !userData || userData.isSubscribed === false; 
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile()); 
      // console.log('triggered',user_id);
    }
  }, [userId, dispatch]);
  // console.log("headrnotifications count",notifications);
  

  const [tokenFound,setTokenFound]=useState(null);

  // console.log(userProfile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile()); 
      
    }
  }, [userId, dispatch]);

  useEffect(()=>{
    getFirebaseToken(setTokenFound)
    
  },[])

useEffect(()=> {
  setTimeout(()=>{
    if (userId) {
      dispatch(fetchNotifications());
    }
  },10000)
  
},[notifications,dispatch]);



//   const genralNotification=()=>{
//     const user_id=localStorage.getItem('user_id');
//     const accessToken=localStorage.getItem('accessToken');
//     const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", `Bearer ${accessToken}`);

// const raw = JSON.stringify({
//   "user_id": user_id
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("https://bodspheretest.bodsphere.com:4005/getNotification", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
//   }

// useEffect(()=>{
//   genralNotification();
// },[])


//   const ProfileFetch=()=>{
//     const user_id=localStorage.getItem('user_id')
//     const token= localStorage.getItem('accessToken')
//     const myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "Bearer"+token);

// const raw = JSON.stringify({
//   "user_id": user_id
// });

// const requestOptions = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow"
// };

// fetch("https://bodspheretest.bodsphere.com:4002/getUserProfile", requestOptions)
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
//   }
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  const handleItemClick = (item) => {
    setActiveItem(item);
    // Add your routing or path functions here
    // if (item === 'Our Impact') {
    //   OurImpactPath();
    // } else if (item === 'Login') {
    //   Loginpath();
    // }
  };

const user_id=localStorage.getItem('user_id')

useEffect(() => {
  setLogin(!!user_id);
}, [user_id]);


  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };
  

  const theme = useContext(themeContext);

  const darkMode = theme.state.darkMode;

  const handleClick = () => {
    console.log("clicking dark mode");
    theme.dispatch({ type: "toggle" });
  };

  const navigate = useNavigate();
  const Loginpath = () => {
    setLogin(!login)
    navigate('/Login')
  };
  
  const DashboardPath=()=>{
    navigate('/Dashboard')
    setDrawerOpen(false);
  }

  const Categories=()=>{
    navigate('/Category')
    setDrawerOpen(false);

  }

  const Notify=()=>{
    navigate('/Notification')
    setDrawerOpen(false);
  }
  const Search=()=>{
    navigate('/Search')
  }
  const LandingPage=()=>{
    navigate('/')
    setDrawerOpen(false);

  }
  const OurImpactPath=()=>{
    navigate('/Impact');
  }
  const AccreditedPath=()=>{
    navigate('/Premium')
  }
  const BecomeMemberPath=()=>{
    navigate('/BecomeMember');
    toggleDropdown()
  }
  const BecomeStudentPath=()=>{
    navigate('/BecomeStudent');
    toggleDropdown()
  }
  const handleFreeTrail = () => {
    console.log('clickkk');
    
    setModalOpen(true);
  };

  const LoginFreeTrail=()=>{
      navigate('/Login'); // Navigate after toast
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 


  const isMobileView = windowWidth <= 800;

  



 
  return (
    <>
    {!isMobileView ? 
    (
      <>
       {user_id ? 
       (
      <div className={`new-header 
       ${"background-white"}
      `}>
        
      <div className="new-logo-img" onClick={LandingPage}>
       {/* {darkMode ?( <img src={require('../../Assets/whitenewlogo.png')}
        style={{  width: 150 ,cursor:'pointer'}}
         alt="logo" 
         className="mb-logo"/>) :
         ( */}
           <img loading="lazy"
           src='/assets/newwlogo.png'
        style={{ width: 150 ,cursor:'pointer'}}
         alt="logo" 
         className="mb-logo"/>
        {/* ) */}
         {/* } */}
         
      </div>
      <div className="new-header-contents">
        <div className="header-content-1" style={{cursor:'pointer'}} onClick={DashboardPath}>Home</div>
        <div className="header-content-2" style={{cursor:'pointer'}} onClick={Categories}>Categories</div>
        <div className="header-content-3" style={{cursor:'pointer'}} onClick={Notify}> 
         {notifications?.unreadCount ? 
         ( <Badge
          color="secondary"
          badgeContent={notifications?.unreadCount}
          max={50}
          className="custom-badge"
        />) :null}
          Notification</div>
          {isLocked ?
        <div className="header-content-5" style={{cursor:'pointer'}} onClick={handleFreeTrail}>Start your free trial</div> 
        :
        <div className="header-content-5" style={{cursor:'pointer'}} onClick={AccreditedPath}>Get Accredited</div>
      }
    {modalOpen && <TrialModal darkMode={darkMode} setModalOpen={setModalOpen} modalOpen={modalOpen}/>}

        <div 
          className={`toggle ${darkMode ? 'toggle-dark' : 'toggle-light'}`} 
          onClick={handleClick}
        >{darkMode ?(
          <img 
            src='/assets/dark.png'
            style={{ width: 22, height: 20 }} 
            alt="Mode Toggle"
          />
        ): <img 
        src='/assets/light.png'
        style={{ width: 22, height: 20 }} 
        alt="Mode Toggle"
      />}
          <span className="hover-text">
    {darkMode ? "Light up the space, let's shine." : "Dim the lights, let's focus"}
  </span>
        </div>
        <div className="header-content-4" onClick={toggleDrawer} style={{cursor:'pointer'}}>
          {/* <img src={require('../../Assets/Group 77013 (1).png')} 
        style={{width:30,height:30}}
        loading="lazy"
        alt="" /> */}
        {userProfile?.userdata?.profile_img ?
          <img 
          style={{width:40,height:40,borderRadius:50}}
          loading="lazy"
          src={ ImagePath + userProfile?.userdata?.profile_img} 
          alt="profile" 
        />
        :
        <img 
          style={{width:40,height:40,borderRadius:50}}
          loading="lazy"
          src='/assets/profile.png'
          alt="profile" 
        />
      }
        </div>
        
        {/* <DrawerComponent isOpen={isDrawerOpen} onClose={toggleDrawer} /> */}
        <ProfileModal isOpen={isDrawerOpen} onClose={toggleDrawer}/>
      </div>
     </div>
    ):(
      <div className={`header ${"background-white"} `}>
        
          
          <div className="header-left" 
          onClick={LandingPage}
          >
       {/* {darkMode ? (
        <>
        <img
          src={require("../../Assets/whitenewlogo.png")}
          style={{ width: 150 ,cursor:'pointer'}}
          alt="Logo"
          // onClick={LandingPage}
        />
        </>):( */}
          <>
          <img
          src='/assets/newwlogo.png'
          style={{ width: 150 ,cursor:'pointer'}}
          alt="Logo"
          loading="lazy"
        />
        </>
        {/* )} */}
      </div>
      <div className="header-right">
        <span onClick={OurImpactPath}
        > Our Impact</span>
               <div className="dropdown-container">
  <span>Get Accredited</span>
  <div className="dropdown" style={{ backgroundColor: '#fff' }}>
    <div className="dropdown-item" onClick={BecomeMemberPath}>
      Teacher 
      {/* <span className="arrow-right"></span> */}
    </div>
    <div className="dropdown-item" onClick={BecomeStudentPath}>
      School 
      {/* <span className="arrow-right"></span> */}
    </div>
  </div>
</div>


       {/* <div className="dropdown-container">
        <span onClick={toggleDropdown}>Get Accredited</span>
        {isDropdownOpen && (
         <div className="dropdown" style={{backgroundColor:darkMode?'#1c1c1c':'#ffff'}}>
         <div className="dropdown-item" onClick={BecomeMemberPath}>
           Teacher <span className="arrow-right"> </span>
         </div>
         <div className="dropdown-item" onClick={BecomeStudentPath}>
           Student <span className="arrow-right">  </span>
         </div>
       </div>
      )}
      </div> */}
      <div className="header-right-free">
          <span onClick={LoginFreeTrail}>Start your free trial</span>
        </div>
        <span onClick={Loginpath}>Login</span>
       
        <div 
          className={`toggle ${darkMode ? 'toggle-dark' : 'toggle-light'}`} 
          onClick={handleClick}
        >{darkMode ?(
          <img 
            src='/assets/dark.png' 
            style={{ width: 22, height: 20 }} 
            alt="Mode Toggle"
          />
        ): <img 
        src='/assets/light.png' 
        style={{ width: 22, height: 20 }} 
        alt="Mode Toggle"
      />}
          <span className="hover-text">
    {darkMode ? "Light up the space, let's shine.": "Dim the lights, let's focus"}
  </span>
        </div>
      </div>
    </div>

     
    )}
    
      </>
    ): login && user_id ?
     (
      <>
       {/* Mobile Bottom Navigation */}
     <div className="mobile-bottom-header"
     style={{backgroundColor: "white",color: "black"}}>
        <div onClick={DashboardPath} 
          style={{cursor:'pointer'}}
          >
          {/* {darkMode ? (
          <img src={require('../../Assets/Home.png')} alt="home" />
        ):( */}
          <img loading="lazy"
          src='/assets/HomeFocused.png' alt="home" />
        {/* )} */}
          <span>Home</span>
        </div>
        <div onClick={Categories}
          style={{cursor:'pointer'}}
          >
        {/* {darkMode ? (
          <img src={require('../../Assets/search.png')} alt="search" />
        ):( */}
          <img loading="lazy"
          src='/assets/searchFocused.png' alt="search" />
        {/* )} */}
          <span>Category</span>
        </div>
        <div onClick={LandingPage} className="home-nav" style={{backgroundColor:"white",cursor:'pointer' }}>
          <img loading="lazy"
          src='/assets/bod_fevicon.png' alt="Home" />
          {/* <span>Home</span> */}
        </div>
        <div
  className="new-badd"
  onClick={Notify}
  style={{ cursor: "pointer" }}
>
  <img
    loading="lazy"
    src='/assets/NotificationFocused.png'
    alt="search"
  />
  <span>
    {notifications?.unreadCount ? (
      <Badge
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "#FF5F67",
            color: "white",
            fontSize: "0.75rem",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.3)",
            top: "-2rem",
            right: "-2.5rem",
          },
        }}
        badgeContent={notifications?.unreadCount}
        max={50}
      />
    ) : null}
    Notification
  </span>
</div>

        <div onClick={toggleDrawer}
          style={{cursor:'pointer'}}
          >
            {userProfile?.userdata?.profile_img ? 
          <img loading="lazy"
          style={{width:24,height:24,borderRadius:12}}
          src={ImagePath + userProfile?.userdata?.profile_img}
          alt="Cart" /> 
          :
          <img loading="lazy"
          style={{width:24,height:24,borderRadius:12}}
          src='/assets/profile.png'
          alt="Cart" />
        }
          <span>Profile</span>
        </div>

      </div>
      <ProfileModal isOpen={isDrawerOpen} onClose={toggleDrawer}/>

      </>
    ):(
      <>
      <div className={`header
       ${"background-white"}` 
      }>
        
        <div className="header-left"  
          style={{cursor:'pointer'}}
          >
         {/* {darkMode ? (
          <>
          <img
            src={require("../../Assets/whitenewlogo.png")}
            style={{width: 150 }}
            alt="Logo"
            onClick={LandingPage}
          /> */}
           {/* <ProfileModal isOpen={isDrawerOpen} onClose={toggleDrawer}/> */}
          {/* </>):( */}
            <>
            <img
            src='/assets/newwlogo.png'
            style={{ width: 150 }}
            alt="Logo"
            onClick={LandingPage}
            loading="lazy"
          />
           {/* <ProfileModal isOpen={isDrawerOpen} onClose={toggleDrawer}/> */}
          </>
          {/* )} */}
        </div>
        <div className="header-right">
        {/* <span onClick={Loginpath}>Login</span> */}
          <span onClick={OurImpactPath} >Our Impact</span>
          <div className="dropdown-container">
  <span>Get Accredited</span>
  <div className="dropdown" style={{ backgroundColor:'#fff' }}>
    <div className="dropdown-item" onClick={BecomeMemberPath}>
      Teacher 
      {/* <span className="arrow-right"></span> */}
    </div>
    <div className="dropdown-item" onClick={BecomeStudentPath}>
      School 
      {/* <span className="arrow-right"></span> */}
    </div>
  </div>
</div>
          <div className="header-right-free">
            <span onClick={LoginFreeTrail}>Start your free trial</span>
          </div>
          <div 
          className={`toggle ${darkMode ? 'toggle-dark' : 'toggle-light'}`} 
          onClick={handleClick}
        >{darkMode ?(
          <img 
            src='/assets/dark.png'
            style={{ width: 22, height: 20 }} 
            alt="Mode Toggle"
          />
        ): <img 
        src='/assets/light.png' 
        style={{ width: 22, height: 20 }} 
        alt="Mode Toggle"
      />}
          <span className="hover-text">
    {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  </span>
        </div>
        </div>
      </div></>
    )}

    </>
  );
}
