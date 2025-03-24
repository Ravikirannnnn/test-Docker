import React, { useEffect } from 'react'
import './TeacherTeachingExperience.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from "../../../Context";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL4009, API_URL4010 } from '../../../Service/ApiService';

export default function SchoolTeachingExperience() {
 
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [Designation, setDesignation] = useState([]);
     

  const navigate=useNavigate()
  const handleExForm=(item)=>{
    navigate('/TeacherExperienceForm', {
      state: {
        id: item._id,
        School : item.school,
        Designation : item.designation,
        StartDate : item.startDate,
        EndDate : item.endDate,
        Address : item.location,
        WebsiteLink : item.webSite
      }
    });
  }

  useEffect(() => {
    getTeacherExperience();
  }, []);

  const getTeacherExperience = async () => {
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

    fetch(API_URL4009 + "getTeachingExperience", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setDesignation(result.response)
      })
      .catch(error => console.log('error', error));

  }
  return (
    <>
    <div>
      <PageTitle title={'Teaching Experience'}/>
    </div>
    <div className='overall-ex'>
    {Designation?.map((item, index) => (
        <div className='top-ex-main-continer' key={index}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
          <div className='ex-content'>
            <h3>{item.school}</h3>
            <h4>{item.dedesignation}</h4>
            <h4>{item.startDate} to {item.endDate}</h4>
            <h4>{item.location}</h4>
            <h4>{item.webSite}</h4>
          </div>
          <div className='ex-btn' onClick={()=>handleExForm(item)}>Edit</div>
        </div>
         ))}
        <span className='teaching-btn' style={{marginTop:'20px'}} onClick={()=>navigate('/TeacherExperienceForm')}>Add Another</span>

    </div>
    </>
  )
}
