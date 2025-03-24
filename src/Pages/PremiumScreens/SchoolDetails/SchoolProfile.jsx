import React, { useEffect } from 'react'
import './SchoolProfile.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle';
import { themeContext } from '../../../Context'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL4010, ImagePath } from '../../../Service/ApiService';
import Avatar from 'react-avatar';
export default function SchoolProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [schoolProfile, setSchoolProfile] = useState('');
  const [verification, setVerification] = useState([]);
  const [image,setImage] = useState('');
  const [name,setName]=useState('')


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const navigate=useNavigate();
  const handleInsideCredential=()=>{
    navigate('/PremiumBar')
  }
  const handleEditTeacher=()=>{
    navigate('/EditSchoolDetails')
  }
 
  useEffect(()=>{
    getSchoolProfile();
  },[])

  const getSchoolProfile = async() => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+ token);
    var raw = JSON.stringify({
      "user_id": user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4010 +"get_SchoolProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("get_SchoolProfile",result)
        if (result.status == true) {
          setName(result.response[0]?.userData.name)
          setSchoolProfile(result.response);
          setVerification(result.response[0]?.credentialData)
          setImage(result.response[0]?.userData.profile_img)
        }
      })
      .catch(error => console.log('error', error));
  }
  return (
    <>
    <div>
      <PageTitle title={'Bodsphere Accreditation'}/>
    </div>
    <div className='overall-cc-container'>
    {verification.map((item, index) => (
                item.verificationStatus === "Pending" && item.isTeacher === false ? (
                  <div>
                     <div className='top-main-cc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='top-cc-content-1'>
          {/* <img src={require('../../../Assets/59.png')} loading="lazy" alt="" /> */}
          {image ? 
              <img 
              // src={require('../../Assets/59.png')} 
              src={ `${ImagePath}${image}` }
              alt="profile-img" className='accredated-pic' /> 
              :
              <Avatar name={name} round={true} />
            }
          </div>
          <div className='top-cc-content-2'>
            <h4 style={{color:'#FF2424'}}>Currently we are reviewing your {item.designationName} profile. Please wait for admin to review & update your profile</h4>
          </div>
          
      </div>
                  </div>
                ) : (
                  item.verificationStatus === "Approved" && (
    <div className='top-main-cc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='top-cc-content-1'>
          {/* <img src={require('../../../Assets/59.png')} loading="lazy" alt="" /> */}
          {image ? 
              <img 
              // src={require('../../Assets/59.png')} 
              src={ `${ImagePath}${image}` }
              alt="profile-img" className='accredated-pic' /> 
              :
              <Avatar name={name} round={true} />
            }
          </div>
          <div className='top-cc-content-2'>
            <h4>Designation : {item?.designationName?.length > 13 ? item?.designationName?.substring(0, 13) + '...': item?.designationName}</h4>
            <h5>Initial Completeion Date - {(new Date(item?.InitialCompleteionDate)).toISOString().split('T')[0].split('-').reverse().join('/')}</h5> 
             <h5>Bodsphere join Date - {(new Date(item?.bodsphereJoinDate)).toISOString().split('T')[0].split('-').reverse().join('/')}</h5> 
            <h5>Bodsphere ID - {item?.bodsphere_Id}</h5>
          </div>
          {item.changeCrediential && !item.isPending ? 

          <div className='
          top-cc-btn' onClick={handleInsideCredential}>
            Change Credentials
          </div>
          :null
        }
      </div>
    )
                )
        ))}

      {/* <div className='down-main-cc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='down-cc-content' onClick={handleEditTeacher}>
          <h4>Edit School Details</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" onClick={toggleDropdown}/>
          
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/Faculty')}>
          <h4>Faculty</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/Registration')}>
          <h4>Level of Regestration</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/SocialMediaLinks')}>
          <h4>Social Media Links</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/Documentation')}>
          <h4>Documentation</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/TeachingExperience')}>
          <h4>Teaching Experience</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/YogaClass')}>
          <h4>Yoga Classes</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/WeTeach')}>
          <h4>We Teach</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/Languages')}>
          <h4>Languages</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/BodsphereCerificates')}>
          <h4>Bodsphere Certificates</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
        <div className='down-cc-content' onClick={()=>navigate('/OtherCertificates')}>
          <h4>Other Certificates</h4>
          <img src={require('../../../Assets/backwel.png')} loading="lazy" alt="" />
        </div>
      </div> */}
    </div>
    </>
  )
}
