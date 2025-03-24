
import React from 'react'
import PageTitle from '../../Components/Loader/Other/PageTitle';
import './Training.css'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL4004 } from '../../Service/ApiService';
export default function Category() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [categoryName,setCategoryName]=useState([])
  const [files,setfiles]=useState([])
  const [categoryData,setCategoryData]=useState([])


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
  .then((result) => {console.log(result)
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
   const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';

   const handleCategoryClick = (item) => {
    const { categorytype, _id, categoryImage, categoryName } = item;

    if (categorytype === 'course' || categorytype === 'audio') {
      navigate('/VideoScreen', {
        state: { ids: _id, image: categoryImage, name: categoryName }
      });
    } else if (categorytype === 'training') {
      navigate('/Training', {
        state: { ids: _id, name: categoryName }
      });
    }
    // else{
    //   navigate('/LiveSessions')
    // }
};
//  const navigate = useNavigate();

  const handleSubTraining = (item) => {
    // console.log('ooo',item)
    const id = item._id;
    const image = item.categoryImage
    // console.log('id',item._id)
    
    navigate('/InsideCategory', {
      state: {
        sub_Cat_ids: id,
        cat_image:image
      },
    });    
  };
  
  return (
    <div>
      <div>
       <PageTitle title={'Yoga Teacher Trainings'} />
      </div>
       <div className='category-main-container-07'>
      {categoryData
          .filter((item) => item.categorytype === 'training')
          .map((item) => (
      <div className='category-data-07'  key={item.id} // Use a unique key
            onClick={() => handleSubTraining(item)}>
        <img src={imgPath+item.categoryImage} alt="" />
        <div className='category-img-text-07'>{item.categoryName}</div>
       </div>
      
     
     ))}
    </div>
    </div>
  )
}
