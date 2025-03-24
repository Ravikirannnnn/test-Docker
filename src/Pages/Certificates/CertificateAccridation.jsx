import React, { useEffect, useState } from 'react';
import './CertificateAccridation.css'
import { themeContext } from '../../Context'
import { useContext } from 'react';
import { API_URL4002, API_URL4004, API_URL4006, DocumentPath, successMessage } from '../../Service/ApiService';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import Modal from '../../Components/Loader/Modal/Modal';
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { fetchUserProfile } from "../../redux/userSlice"; 
import { useDispatch, useSelector } from "react-redux";


export default function Certificate() {
  const navigate=useNavigate();

  const [names, setNames] = useState("")
  const [showSettings, setShowSettings] = useState(false);
  const [signOutModal,setSignOutModal]=useState(false);
  const [name,setName]=useState('')
  const [email, setEmail] = useState('')
  const [showInfoCard, setShowInfoCard] = useState(false);
  const [load,setLoad]=useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfoCard(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const userProfile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch(); // Initialize useDispatch
  const userId=localStorage.getItem('user_id')


   useEffect(() => {
      if (userId) {
        dispatch(fetchUserProfile()); 
      }
    }, [userId, dispatch]);

    console.log(userProfile,'userProfile')
    // setEmail(userProfile)

  const openSignOutModal=()=>{
    if(names === ""){

    setSignOutModal(true)
    }
    // else{
    //   generateImageAndCreateFormData()
    // }
  }

  const closeSignOutModal=()=>{
    setSignOutModal(false)
  }
  const location = useLocation();
  const { ids,byt,generatedAt } = location.state || {};
  // console.log(byt);
  
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'long', // Full month name (e.g., "March")
      day: 'numeric', // Day of the month (e.g., "25")
      year: 'numeric', // Full year (e.g., "2025")
    });
  };


  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    var raw = JSON.stringify({
      "user_id": user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4002 + "getUserProfile", requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.Status == true) {
          console.log('getUserProfile',result.userdata.name)
          // if (route?.params?.name !== undefined) {
          //   setNames(route.params.name);
          //   console.log('0000')
          // } else {
            setNames(result.userdata.name) 
            // setEmail(result?.userdata?.email)   
            // console.log('999',result?.userdata?.email)
          // }
          // setEmail(result?.userdata?.email)
        }
        else {
          console.log(result)
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleDownload = () => {
    const element = document.querySelector('.certificate-img1'); // Target the div with class certificate-img
    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'certificate.png'; // The name of the downloaded file
      link.click();
    });
  };

console.log(email,'emaillll');

 
  const handleUpdate = async () => {
    const token= localStorage.getItem('accessToken')
    // const email_id=localStorage.getItem('email_id')

// console.log(accessToken)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    var raw = JSON.stringify({
      "name": name,
      "email": userProfile?.userdata?.email,
    });

    console.log('raw123', raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4006 + "userBasicDetails", requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log(result)
        if (result.Status === true) {
                dispatch(fetchUserProfile()); 
          closeSignOutModal()
          successMessage('Thank you for updating your user name!')
          // Swal.fire({
          //   icon: 'success',
          //   title: 'User name updated',
          //   text: 'Thank you for updating user name!',
          // });
          getProfile();
        }
      })
      .catch(error => {console.log('error', error)});
  }


  
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

const handleHome=()=>{
  navigate('/Dashboard')
}
  return (
    <div className='overall-certi'>
      <Toaster/>
      <PageTitle />
      {/* <div className='com-flex-start-111'>
          <div
            className='com-left-arrow-main-11'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
          >
            <div className='com-left-arrow-11' style={{cursor:'pointer'}} 
            onClick={handleHome}
            >
              <img loading="lazy" src='/assets/rightwel.png')} alt="" />
            </div>
          </div>
          <div className='com-title-11'>jkjk</div>
        </div> */}
        
      <div className='certificate-container'>
      <div className='certificate-img1' style={{ position: 'relative' }}>
        {byt==="Bodsphere Yoga Teacher 300 (BYT 300)" ? (
      <img  onLoad={() => setLoad(true)}  loading="lazy" src='/assets/T-300.png' alt="" />
    ): byt==="Bodsphere Yoga Teacher 200 (BYT 200)" ?(
      <img  onLoad={() => setLoad(true)}  loading="lazy" src='/assets/T-200.png' alt="" />
 ): byt==="Bodsphere Yoga School 300 (BYS 300)" ?(
  <img  onLoad={() => setLoad(true)}  loading="lazy" src='/assets/S-300.png' alt="" />
):byt==="Bodsphere Yoga School 500 (BYS 500)" ?(
  <img  onLoad={() => setLoad(true)}  loading="lazy" src='/assets/S-500.png' alt="" />
): byt==="Bodsphere Yoga Teacher 500 (BYT 500)" ?(
  <img  onLoad={() => setLoad(true)}  loading="lazy" src='/assets/T-500.png' alt="" />
): byt==="Bodsphere Yoga School 200 (BYS 200)" ?(
  <img  onLoad={() => setLoad(true)}  loading="lazy" src='/assets/S-200.png' alt="" />
): byt==="Bodsphere Continuing Education Provider (BCEP)" ?(
  <img  onLoad={() => setLoad(true)}  loading="lazy" src='/assets/BCEP-new.png' alt="" />
):''}
      <div className='qr-code'>
      {/* <h2>QR Code Example</h2> */}
      {/* <QRCode
              value={DocumentPath + Images}
              size={80} 
            /> */}
    </div>
    {/* {showSettings ?( */}
{load===true ?
    <div>
    <div className='cer-top-cont'>
    {userProfile?.schoolCredentials?.some(cred => cred.designationName === byt) ? (
  <div className='certi-div'>
    {userProfile.schoolCredentials.find(cred => cred.designationName === byt)?.firstName}
    {' '}
    {userProfile.schoolCredentials.find(cred => cred.designationName === byt)?.lastName}

  </div>
) : userProfile?.teacherCredentials?.some(cred => cred.designationName === byt) ? (
  <div className='certi-div'>
    {userProfile.teacherCredentials.find(cred => cred.designationName === byt)?.firstName}
    {' '}
    {userProfile.teacherCredentials.find(cred => cred.designationName === byt)?.lastName}

  </div>
) : null}


  
          <div className='certi-title1'>
            {byt}
        </div>
        </div>

        <div>
          <div className='certi-sub1-valid'>
            VALID FROM
          </div>
        <div className='certi-sub1'>
           {formatDate(generatedAt)}
        </div>
        </div>

<div>
<div className='certi-sub1-until'>
  VALID UNTIL
</div>
        <div className='certi-sub1-tail'>
           Till the end of Subscription
        </div>
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div className='certi-sub-sub-head'>
            BODSPHERE ID
          </div>
        <div className='certi-sub-sub1'>
           {ids? ids : null}
        </div>
        </div>

        </div>
        :''}
        {/* ):(null)} */}

        {/* <div className='cerificate-sub-text'>
      Use this Certificate & {' '}
       <strong style={{color:'#ff5f67'}}>Get Accredited by Bodsphere</strong> for free
      </div> */}
      </div>

        <div className='cer-btn-container'>
        {/* <div className='cer-p-btn'
         style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>Copy</div> */}
       <div 
            className='cer-n-btn' 
            onClick={ handleDownload}
            >
            {/* {userProfile?.userdata?.name === "" ? 'Update Name' : 'Download'}
             */}
             Download
        </div>
      </div>
      </div>
      {/* <div className='cerificate-sub-text'>
      Use this Certificate & <br />
       <strong style={{color:'#ff5f67'}}>Get Accredited by Bodsphere</strong> for free
      </div> */}
      {/* <Modal isOpen={signOutModal} onClose={closeSignOutModal} >
      <div className='signoutbtn1-00' style={{color:darkMode?'white':'black'}}>
        <h1>Update Name</h1>
        <div className='sign0ut-text1-00'><input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}/></div>
      <button onClick={handleUpdate}>Update</button>
      <h5>Cancel</h5>
      </div>
    </Modal> */}
    </div>
  )
}
