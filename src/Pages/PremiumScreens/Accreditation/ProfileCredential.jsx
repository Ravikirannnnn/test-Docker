import React, { useEffect } from 'react'
import './ProfileCredential.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../../Context'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL4009, ImagePath } from '../../../Service/ApiService';
import Avatar from 'react-avatar';
export default function ProfileCredential() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [image,setImage] = useState('');
  const [verification, setVerification] = useState([]);
  const [name,setName]=useState('')


  const teacherProfile = async () =>{
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

    fetch(API_URL4009+"get_TeacherProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status == true){
          console.log(result)
          setVerification(result.response[0]?.credentialData)
          setImage(result.response[0]?.userData.profile_img)
          setName(result.response[0]?.userData.name)

          }
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    teacherProfile();
  }, []);


  const navigate=useNavigate();
  const handleInsideCredential=()=>{
    navigate('/PremiumBar')
  }
  const handleEditTeacher=()=>{
    navigate('/EditTeacher')
  }
  const handleiteach=()=>{
    navigate('/Iteach')
  }
  const handleteachingExperience=()=>{
    navigate('/TeacherTeachingExperience')
  }
  const handleYogaClass=()=>{
    navigate('/TeacherOnlineOffline')
  }
  const handleLanguages=()=>{
    navigate('/TeacherLanguages')
  }
  const handleOtherCertificates=()=>{
    navigate('/TeacherOtherCertificate')
  }
  const CerficateScreenPath=()=>{
    navigate('/TeacherBodsphereCertificates')
  }
  return (
    <>
    <div>
      <PageTitle title={'Apply for byt credential'}/>
    </div>
    <div className='overall-pc-container'>
      {/* <div className='top-main-pc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='top-pc-content-1'>
          <img loading="lazy" src={require('../../../Assets/59.png')} alt="" />
          </div>
          <div className='top-pc-content-2'>
            <h4>Designation : BYT-200</h4>
            <h5>Initial Completeion Date - 08/08/2024</h5>
            <h5>Bodsphere join Date - 08/08/24</h5>
            <h5>Bodsphere ID - 181818</h5>
          </div>
          <div className='
          top-pc-btn' onClick={handleInsideCredential}>
            Change Credentials
          </div>
      </div> */}
      {verification.map((item, index) => (
                item.verificationStatus === "Pending" && item.isTeacher === true ? (
                  <div>
                     <div className='top-main-pc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='top-pc-content-1'>
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
          <div className='top-pc-content-2'>
            <h4 style={{color:'#FF2424'}}>Currently we are reviewing your {item.designationName} profile. Please wait for admin to review & update your profile</h4>
          </div>
          
      </div>
                  </div>
                ) : (
                  item.verificationStatus === "Approved" && item.isTeacher === true && (

      <div className='top-main-pc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='top-pc-content-1'>
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
          <div className='top-pc-content-2'>
            <h4>Designation : {item.designationName.length > 13 ? item.designationName.substring(0, 13) + '...': item.designationName}</h4>
            <h5>Initial Completeion Date - {(new Date(item.InitialCompleteionDate)).toISOString().split('T')[0].split('-').reverse().join('/')}</h5>
            <h5>Bodsphere join Date - {(new Date(item.bodsphereJoinDate)).toISOString().split('T')[0].split('-').reverse().join('/')}</h5>
            <h5>Bodsphere ID - {item.bodsphere_Id}</h5>
          </div>
          {item.changeCrediential && !item.isPending ? 

          <div className='
          top-pc-btn' onClick={handleInsideCredential}>
            Change Credentials
          </div>
          :null
        }
      </div>
                  )
                )
        ))}


{/* <div className='midle-pc-container'
 style={{
  backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
}}>
      <h4> Designation  : BYT-200</h4>
      <h4>Initial Completion Date - 12/08/2024</h4>
</div> */}

      {/* <div className='down-main-pc-container'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='down-pc-content' onClick={handleEditTeacher}>
          <h4>Edit Teacher Details</h4>
          <img loading="lazy" src={require('../../../Assets/backwel.png')} alt="" />
          
        </div>
        <div className='down-pc-content' onClick={handleteachingExperience}>
          <h4>Teaching Experience</h4>
          <img loading="lazy"src={require('../../../Assets/backwel.png')} alt="" />
        </div>
        <div className='down-pc-content' onClick={handleYogaClass}>
          <h4>Yoga Classes</h4>
          <img loading="lazy" src={require('../../../Assets/backwel.png')} alt="" />
        </div>
        <div className='down-pc-content'onClick={handleiteach}>
          <h4>I Teach</h4>
          <img loading="lazy" src={require('../../../Assets/backwel.png')} alt="" />
        </div>
        <div className='down-pc-content' onClick={handleLanguages}>
          <h4>Languags</h4>
          <img loading="lazy" src={require('../../../Assets/backwel.png')} alt="" />
        </div>
        <div className='down-pc-content' onClick={CerficateScreenPath}>
          <h4>Bodsphere Certificates</h4>
          <img loading="lazy" src={require('../../../Assets/backwel.png')} alt="" />
        </div>
        <div className='down-pc-content' onClick={handleOtherCertificates}>
          <h4>Other Certificates</h4>
          <img loading="lazy" src={require('../../../Assets/backwel.png')} alt="" />
        </div>
      </div> */}
    </div>
    </>
  )
}
