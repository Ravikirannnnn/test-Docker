import React, { useEffect, useState } from 'react';
import './CertificateScreen.css';
import { themeContext } from "../../Context";
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../Components/Loader/Other/PageTitle';
import { API_URL4007 } from '../../Service/ApiService';
import InfoCard from '../../Components/InfoCard/InfoCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from '../../redux/userSlice';
import UpgradeModal from '../WelcomePage/WelcomeModal02';
export default function Certificate() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const user_id=localStorage.getItem('user_id');

  const [certificate , setCerificate] = useState([])
  const [showInfoCard, setShowInfoCard] = useState(false);
  const dispatch = useDispatch(); // Initialize useDispatch
  const userData = useSelector((state) => state.user.profile?.userdata); // Get profile from Redux
  const isLocked = !userData || userData.isSubscribed === false; 
  const [modalOpen, setModalOpen] = useState(false);

   useEffect(() => {
      if (user_id) {
        dispatch(fetchUserProfile()); 
        // console.log('triggered',user_id);
      }
    }, [user_id, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfoCard(true);
    }, 2000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const navigate=useNavigate();

  const handleCategory=()=>{
    if(isLocked){
      setModalOpen(true)
    }else{
    navigate('/Category')
  }
  }

  const back =()=> {
    navigate('/Dashboard')
  }
  const handleCertificatePath=(item)=>{
    // navigate('/Certificate')
    console.log(item);
    
    {
      navigate('/Certificate', {
        state: {
          categoryId: item.category_id, 
          subCat:item.categoryName,
          issuedOn:item.updatedAt,
          certNo:item.Certificate_Number,
          certificate:item.certificateName,
          name01:item.name
        }
      });
    }
  }
  useEffect(() => {
    getCertificates();
  }, []);

  const getCertificates = async () =>{
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    var raw = JSON.stringify({
      "user_id": user_id
    });

    // console.log(token);
    

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4007+"getCertificates", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.Status == true){
          console.log(';;;',result)
          setCerificate(result.response)
        }
        else{
          console.log(result)

        }
      })
      .catch(error => console.log('error', error));
  } 

  const CertificateContents=[
    {
      maintext:'Yoga Course 01',
      mainlink:'https://www.thecompanycheck.com/company/hiyaak-systems-technologies-private-limited/U72900KA2021PTC152285',
      text:'https://www.hiyaak-systems-technologies-private-limited',
    },
  ]
  return (
    <>
    <div>
      <PageTitle title={'Bodsphere Certificates'} back={back}/>
    </div>
    <div>
      {certificate?.length===0 ? (showInfoCard
        ?(
      <div style={{marginTop:'10%'}}>
              <InfoCard
        imageSrc='/assets/newnew_certificate (12).png'
        title="You do not have Bodsphere Certification at the moment."
        subtitle="Kindly complete any of Bodsphere's Yoga Teacher Trainings to get Bodsphere Certified."
        buttonText={isLocked ? "Discover Subscription":"Click here"}
        onButtonClick={handleCategory}
      />
           <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      </div>
      ):null)
      :
      
    <div className='certificate-wrapper'>
    {certificate?.map((item)=>(
    <div className='certificate-main-container'
    onClick={()=>handleCertificatePath(item)}
     style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}>
    <div className='document-img'>
      <img loading="lazy" src='/assets/bx_file.png'  alt="" />
    </div>
    
    <div className='doc-text-container'>
      <div className='certificate-text'>{item.categoryName}</div>
      <div className='cerficate-link'>
        <a href={item.mainlink} target="_blank" rel="noopener noreferrer" style={{color:'#ff5f67'}}>
        {item.Certificate_Number}
        </a>
        </div>
    </div>
    
    {/* <div className='imgs-container'>
      <div className='copy-doc-img'>
<img loading="lazy" src='/assets/solar_copy-linear.png')} alt="" />
      </div>
      <div className='download-doc-img'>
<img loading="lazy" src='/assets/tdesign_download-1.png')} alt="" />
      </div>
    </div> */}
    </div>))}
    </div>
      }

    </div>

    </>
  )
}
