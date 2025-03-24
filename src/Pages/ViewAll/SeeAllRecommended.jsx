import React, { useEffect, useState,useContext } from 'react';
import './SeeAllRecommended.css'; // Import the external CSS
import { API_URL4004, ImagePath } from '../../Service/ApiService';
import { useNavigate } from "react-router-dom";
import { Pages } from '@mui/icons-material';
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/userSlice';
import { themeContext } from '../../Context';
import UpgradeModal from '../WelcomePage/WelcomeModal02';

const SeeAllRecommended = () => {
      const [modalOpen, setModalOpen] = useState(false);
  const navigate=useNavigate();
  const dispatch = useDispatch();
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
  const userData = useSelector((state) => state.user.profile?.userdata);
    const isLocked = userData?.isSubscribed === false;
  const userId=localStorage.getItem('user_id')
  const activeFilter = useSelector((state) => state.filter.activeFilter);
  console.log(isLocked,'isloc');

   useEffect(() => {
      if (userId) {
        dispatch(fetchUserProfile());
      }
    }, [userId, dispatch]);
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
    fetchRecommendedClasses();
  }, []);


  const [classesData,setClassesData]=useState([])

   const fetchRecommendedClasses=async()=>{
     const token= localStorage.getItem('accessToken')
     const userId=localStorage.getItem('user_id')

     console.log(userId);
     

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
    console.log(result)
  })
  .catch((error) => console.error(error));

   }

   const handleRecommendedClassClick = (classItem) => {
    if(isLocked && classItem.subscriptionType === 'Pro'){
      setModalOpen(true)
    }
      else if(classItem.categorytype === "course"){
        const { _id, subdown_vid, subCatName, description, subcategory_img, files, category_id, audio_list, isLiked, chunk_data,Duration,intensity} = classItem;
        navigate('/ReccomendedVideo', {
          state: {
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
      else if (classItem.categorytype === "audio"){
        {
          console.log('arrayueyyy Yaaar')
          navigate('/InstructorAudio',
            {
              state: {
                data: classItem,
              }
            })
        }
      }
      else if(classItem.categorytype === "yogaTalks"){
        console.log(classItem,'clss')

        navigate('/PlayVideos',{state: {
          id: classItem._id,
          // tid: video.cat_id,
          vname: classItem.subcategory_vid,
          title: classItem.subCatName,
          desc: classItem.description,
          lenimg: classItem.subcategory_img,
          // file: files,
          downloadFileName: classItem.subcategory_vid,
          // audio_files: audio_list,
          likes: classItem.isLiked,
          chunkdatavedio:classItem.chunk_data,
          // Duration:duration,
          // intensity:intensity,
          category_id:classItem.cat_id,
          // sub_Cat_ids:sub_Cat_ids,
          // cat_image:cat_image
        }});
      }
      // if (item?.subscriptionType === 'Pro') {
      //   navigate('/Subscription');
      // } else {
      // }
    };
  
 

  return (
    <>
    <div className='top-tit'>
      <PageTitle title={'Recommended Classes'}/>
      </div>
    <div className="recommended-container">
      {classesData?.map((item) => (
        <div key={item.id} 
        className={`recommended-item ${item.subscriptionType === 'Pro' && isLocked ?  'pro-overlay-item' : ''}`}
        onClick={()=>handleRecommendedClassClick(item)}>
          <img src={ImagePath + item.subcategory_img} loading="lazy" alt={item.subCatName} />
          <p>{item.subCatName}</p>
          {item.subscriptionType==='Preview' && isLocked ?( <span className="sam-preview-badge">Preview</span>):item.subscriptionType==='Pro' && isLocked ?(<span className="sam-lock-badge">🔒</span>):('')}

        </div>
      ))}
                 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
    </>
  );
};

export default SeeAllRecommended;
