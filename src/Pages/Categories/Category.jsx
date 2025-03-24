import React from 'react'
import PageTitle from '../../Components/Loader/Other/PageTitle';
import './Category.css'
import { useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL4004, ImagePath } from '../../Service/ApiService';
import { errorMessage } from '../../Service/ApiService';
import Loader from '../../Components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
// import Loader from '../../Components/Loader/Loader';




export default function Category() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [categoryName,setCategoryName]=useState([])
  const [files,setfiles]=useState([])
  const [categoryData,setCategoryData]=useState([])
  const [loaded, setLoaded] = useState(false);
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked = userData?.isSubscribed === false;
  const [loading,setLoading]=useState(true);

  
  // console.log('user data inside categories', !userData? 'no user data': userData);
  
   useEffect(()=>{
    GetAllCategoriesFetch()
   },[])

  const GetAllCategoriesFetch=async()=>{
    const token= await localStorage.getItem('accessToken') ;
// console.log(token,'token')
    const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+token);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  redirect: "follow"
};

fetch(API_URL4004+"getAllCategory", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    // console.log(result)
    if(result.Status===true){
      setCategoryData(result.categorydata)
    }
  })
  .catch((error) => console.error(error));
  }
  const navigate=useNavigate()
   const handleCategoryDetails=()=>{
      navigate('/CategoryDetails')
   }
  //  const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
  // console.log('category data',categoryData)
const LiveSessionPath=()=>{
  navigate('/LiveSessions')
}
const VideoAlbumPath=()=>{
  // if (isLocked){
  //   errorMessage('Please subscribe to access this content');
  //   return;
  // }

  navigate('/VideoAlbum')
}
const TeacherPath=()=>{
  // if (isLocked){
  //   errorMessage('Please subscribe to access this content');
  //   return;
  // }
  navigate('/CategoryDetails')
}


const handleCategoryClick = (item) => {
  // if (isLocked){
  //   errorMessage('Please subscribe to access this content');
  //   return;
  // }
    const { categorytype, _id, categoryImage, categoryName,layoutType } = item;
    console.log(item)
    if (categorytype === 'course') {
      if (layoutType === 1) {
          navigate('/VideoScreen', {
        state: { ids: _id, image: categoryImage, name: categoryName }
      });
      } else if (layoutType === 2) {  
        navigate('/Layout1',{
          state: { ids: _id, image: categoryImage, name: categoryName }
        })      
      } else if (layoutType === 3) {
        navigate('/Layout2',
          {
            state: { ids: _id, image: categoryImage, name: categoryName }
          }
        )
      } else if (layoutType === 4) {
        navigate('/Layout3',
          {
            state: { ids: _id, image: categoryImage, name: categoryName }
          }
        )
      }
  } else if (categorytype === 'training') {
      navigate('/Training', {
        state: { ids: _id, name: categoryName }
      });
  } else if (categorytype === 'audio') {
    navigate('/MusicAlbum',
      {
        state: {
          data: _id
        }
      });
  }
    // navigate('/Layout1')
    // if (categorytype === 'course' || categorytype === 'audio') {
    //   navigate('/VideoScreen', {
    //     state: { ids: _id, image: categoryImage, name: categoryName }
    //   });
    // } else if (categorytype === 'training') {
    //   navigate('/Training', {
    //     state: { ids: _id, name: categoryName }
    //   });
    // ===========
    // }
    // else if(){
    //   navigate('/LiveSessions')
    // }
};

  return (
    
    <div>
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <div className='title-cat'>
        Category
      {/* <PageTitle title={'Category'} /> */}
      </div>
      <div className='category-main-container'>
      <div className={`category-data `} onClick={VideoAlbumPath}>
      {!loaded && <div className="placeholder"></div>}
      {/* {isLocked && <div className="lock-icon">🔒</div>} */}
        <img  src='/assets/Categoyr - Yoga Talks.jpg' alt="" onLoad={() => setLoaded(true)}/>
        <div className='category-img-text' style={{color:'white', zIndex:'3'}}>Yoga Talks</div>
      </div>
      <div className='category-data' onClick={LiveSessionPath}>
      {!loaded && <div className="placeholder"></div>}
        <img  src='/assets/Category - Live Sessions.jpg' alt="" onLoad={() => setLoaded(true)}/>
        <div className='category-img-text ' style={{color:'white'}}>Live Sessions</div>
      </div>
      <div className={`category-data `} onClick={TeacherPath}>
      {!loaded && <div className="placeholder"></div>}
      {/* {isLocked && <div className="lock-icon">🔒</div>} */}
        <img  src='/assets/LiveSession.jpg' alt="" onLoad={() => setLoaded(true)}/>
        <div className='category-img-text ' style={{color:'white', zIndex:'3'}}>Yoga Teacher Trainings</div>
      </div>
        {categoryData
          .filter(item => item.categorytype !== "training")
          .map((item) => {
            const isLocked = userData?.isSubscribed === false; // Check subscription status
            return (
              <div
                className={`category-data `} // Add locked class
                key={item._id}
                onClick={() => handleCategoryClick(item)} // Disable click
              >
                {/* Lock Icon */}
                {/* {isLocked && <div className="lock-icon">🔒</div>} */}

                {/* Category Image */}
                <img
                  // loading="lazy"
                  src={`${ImagePath}${item.categoryImage}`}
                  alt=""
                  onLoad={() => setLoaded(true)}
                />

                {/* Category Name */}
                <div className='category-img-text' style={{color:'white', zIndex:'3'}}>
                  {item.categoryName}
                </div>
              </div>
            );
          })}

    </div>
    </div>
  )
}
