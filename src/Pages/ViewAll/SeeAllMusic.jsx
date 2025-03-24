import React, { useEffect, useState,useContext } from 'react';
import './SeeAllRecommended.css'; // Import the external CSS
import { API_URL4000, API_URL4004, ImagePath } from '../../Service/ApiService';
import { useNavigate } from "react-router-dom";
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { themeContext } from '../../Context';
import UpgradeModal from '../WelcomePage/WelcomeModal02';

const SeeAllMusic = () => {
    const [audioData, setAudioData] = useState([]);
      const [modalOpen, setModalOpen] = useState(false);
       const theme = useContext(themeContext);
          const darkMode = theme.state.darkMode;
    const navigate=useNavigate();
    const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked = userData?.isSubscribed !== true ? true : false;

  const recommendedItems = [
    { id: 1, imageUrl: 'image1.jpg', title: 'Image 1' },
    { id: 2, imageUrl: 'image2.jpg', title: 'Image 2' },
    { id: 3, imageUrl: 'image3.jpg', title: 'Image 3' },
    { id: 4, imageUrl: 'image4.jpg', title: 'Image 4' },
    { id: 5, imageUrl: 'image5.jpg', title: 'Image 5' },
    // { id: 6, imageUrl: 'image6.jpg', title: 'Image 6' },
    // Add more items as needed
  ];

  useEffect(() => {
    getCategory2();
},[])


const getCategory2 = async () => {
    // try {
    //     const accessToken= localStorage.getItem('accessToken')
    //     const myHeaders = new Headers();
    //   myHeaders.append("Authorization", "Bearer " + accessToken);
  
    //   const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: "",
    //     redirect: "follow"
    //   };
  
    //   const response = await fetch(API_URL4000 + "get_Allcourse", requestOptions);
    //   const result = await response.json();
  
    //   const filteredData = result.data.filter(item => item.category.categorytype === "audio");
  
    //   console.log(filteredData);
    //   setAudioData(filteredData)
      
    // } catch (error) {
    //   console.error(error);
    // }
    const user_id=localStorage.getItem('user_id')
    console.log(user_id);
    
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch(API_URL4004 + "getLikedAudio/" + user_id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('New new',result.response)
        setAudioData(result.response)
      })
      .catch((error) => console.error(error));
  }
 const handleAudio=(subItem)=>{
  if(isLocked && subItem.subscriptionType === 'Pro'){
    setModalOpen(true)
  }
  else if (anotherCondition) {
    navigate('/Audio', {
        state: { data: subItem._id, index: index },
    });
} 
 }

  return (
    <>
    <div className='top-tit'>
      <PageTitle title={'Music'}/>
      </div>
    <div className="recommended-container">
    {audioData?.map((subItem,index) => (
  <div key={subItem._id} className={`recommended-item ${subItem.subscriptionType === 'Pro' && isLocked ?  'pro-overlay-item' : ''}`}>
        {/* {isLocked && subItem.subscriptionType === "Pro" && (
          <div className="black-overlay"></div>
        )} */}
    <img 
      src={ImagePath + subItem.subcategory_img} 
      loading="lazy" 
      alt={subItem.subCatName} 
      onClick={handleAudio} 
    />
    <p>{subItem.subCatName}</p>
    {subItem.subscriptionType==='Preview' && isLocked?( <span className="sam-preview-badge">Preview</span>):subItem.subscriptionType==='Pro' && isLocked  ?(<span className="sam-lock-badge">🔒</span>):('')}

  </div>
))}   
 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
 </div>
    </>
  );
};

export default SeeAllMusic;
