import React from 'react'
import './Accreditation.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../../Context'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Accreditation() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const navigate=useNavigate()
  const handleProfileCredential=()=>{
    navigate('/ProfileCredential')
  }
  return (
    <>
    <div>
      <PageTitle title={'Bodsphere Accreditation'}/>
    </div>
    <div className='overall-atn'>
        <div className='act-top-container'
         style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
          <div className='act-img'>
            <img loading="lazy" src='/assets/59.png' alt="" />
          </div>
          <div className='act-container'>
            <h3>Designation : BYT-200</h3>
            <p>Currently we are reviewing your BYT-500 profile. Please wait let admin to review & Update your profile</p>
          </div>
          
        </div>
        <div className='act-down-container'
           style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
            <div className='act-content-container'>
              <h3>Designation : BYT-200</h3>
              <h4>Initial Completeion Date-12/08/2024</h4>
              <h4>Bodsphere Jion Date-12/08/2024</h4>
              <h4>Bodsphere ID - 3634343</h4>
            </div>
            <div className='act-btn' onClick={handleProfileCredential}>Change Credential</div>
          </div>
    </div>
    </>
  )
}
