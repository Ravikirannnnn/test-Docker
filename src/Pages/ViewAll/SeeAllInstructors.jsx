import React, { useEffect, useState } from 'react';
import './SeeAllRecommended.css'; // Import the external CSS
import { API_URL4000, API_URL4004, ImagePath } from '../../Service/ApiService';
import { useNavigate } from "react-router-dom";
import PageTitle from '../../Components/Loader/Other/PageTitle';

const SeeAllInstructors = () => {
  const navigate=useNavigate();

  useEffect(() => {
    getAllInstructors();
},[])


const [intructor, setIntructor] = useState([]);


  const getAllInstructors = async () => {
    const accessToken= localStorage.getItem('accessToken')

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+ accessToken);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      const response = await fetch(API_URL4000+"getAllEligibleInstructors", requestOptions);
     
      const result = await response.json();

      console.log(result);
      setIntructor(result.response)

    } catch (error) {
       console.log(error);
       
    }
  };

  const handleVideoPath=(subItem)=>{
    const { description,video,_id,name} = subItem;
    navigate('/InstructorVideo', {
      state: {
        desc: description,
        chunkdatavedio: video,
        _id:_id,
        name:name
      }
    });
  }



  return (
    <>
    <div className='top-tit'>
      <PageTitle title={'Instructor'}/>
      </div>
    <div className="recommended-container">
      {intructor?.map((item) => (
        <div key={item.id} className="recommended-item" onClick={()=>handleVideoPath(item)}>
          <img src={ImagePath + item.image} loading="lazy" alt={item.name} />
          <p className='new-inst-p'>{item.name}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default SeeAllInstructors;
