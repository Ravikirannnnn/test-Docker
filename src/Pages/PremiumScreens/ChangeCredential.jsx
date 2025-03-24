import React from 'react'
import './ChangeCredential.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../Context'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function ChangeCredential() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const navigate=useNavigate();
  const handleInsideCredential=()=>{
    navigate('/InsideCredential')
  }

  const handleEditTeacher=()=>{
    navigate('/EditTeacher')
  }

  const handleiteach=()=>{
    navigate('/Iteach')
  }

  const handleteachingExperience=()=>{
    navigate('/TeachingExperience')
  }

  const handleYogaClass=()=>{
    navigate('/YogaClass')
  }

  const handleLanguages=()=>{
    navigate('/Languages')
  }

  const handleOtherCertificates=()=>{
    navigate('/OtherCertificates')
  }

  const CerficateScreenPath=()=>{
    navigate('/CertificateScreen')
  }

  return (
    <>
    <div>
      <PageTitle title={'Bodsphere Accredation'}/>
    </div>
    <div className='overall-cc-container'>
      <div className='top-main-cc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='top-cc-content-1'>
          <img src='/assets/59.png' loading="lazy" alt="" />
          </div>
          <div className='top-cc-content-2'>
            <h4>Designation : BYT-200</h4>
            <h5>Initial Completeion Date - 08/08/2024</h5>
            <h5>Bodsphere join Date - 08/08/24</h5>
            <h5>Bodsphere ID - 181818</h5>
          </div>
          <div className='
          top-cc-btn' onClick={handleInsideCredential}>
            Change Credentials
          </div>
      </div>
      <div className='down-main-cc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='down-cc-content' onClick={handleEditTeacher}>
          <h4>Edit Teacher Details</h4>
          <img src='/assets/backwel.png' loading="lazy" alt="" onClick={toggleDropdown}/>
          
        </div>
        <div className='down-cc-content' onClick={handleteachingExperience}>
          <h4>Teaching Experience</h4>
          <img src='/assets/backwel.png' loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={handleYogaClass}>
          <h4>Yoga Classes</h4>
          <img src='/assets/backwel.png' loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={handleiteach}>
          <h4>I Teach</h4>
          <img src='/assets/backwel.png' loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={handleLanguages}>
          <h4>Languags</h4>
          <img src='/assets/backwel.png' loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={CerficateScreenPath}>
          <h4>Bodsphere Certificates</h4>
          <img src='/assets/backwel.png' loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={handleOtherCertificates}>
          <h4>Other Certificates</h4>
          <img src='/assets/backwel.png' loading="lazy" alt="" />
        </div>
      </div>
    </div>
    </>
  )
}
