import React from 'react'
import './AccreditedCertificates.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../Context'
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL4000, API_URL4002, API_URL4009, API_URL4010, errorMessage, ImagePath } from '../../Service/ApiService';
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import InfoCard from '../../Components/InfoCard/InfoCard';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from '../../redux/userSlice';
import UpgradeModal from '../WelcomePage/WelcomeModal02';

export default function PremiumBar() {
  const [activeBarItem, setActiveBarItem] = useState('Teacher')
  const [schoolCredential, setSchoolCredential] = useState([])
  const [isBYT, setIsBYT] = useState([])
  const [modalVisible1, setModalVisible1] = useState(false);
  const [title, setTitle] = useState('')
  const [crediential_id, setCrediential_id] = useState('')
  const [isSchool, setIsSchool] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [teacherCredential, setTeacherCredential] = useState([])
  const [selectedResponse, setSelectedResponse] = useState([])
  const [loading, setLoading] = useState(true);
  const [showInfoCard, setShowInfoCard] = useState(false);
  const user_id=localStorage.getItem('user_id');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInfoCard(true);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
  
  const dispatch = useDispatch(); // Initialize useDispatch
  const userData = useSelector((state) => state.user.profile?.userdata); // Get profile from Redux
  const isLocked = !userData || userData.isSubscribed === false; 
  const [modalOpen, setModalOpen] = useState(false);

   useEffect(() => {
      if (user_id) {
        dispatch(fetchUserProfile()); 
        // console.log('triggered',user_id);
      }
    }, [user_id, dispatch]);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const location = useLocation();

  useEffect(() => {
    getTeacherCredential()
  }, [])
  useEffect(() => {
    if (location.state && location.state.selectedOption) {
      setActiveBarItem(location.state.selectedOption);
    }
  }, [location.state]);

  useEffect(() => {
    getSchoolProfile();
    getSchoolCredential()
    getUser()
  }, [])

  const getUser = async () => {

    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('accessToken')

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

    fetch(API_URL4002 + "getUserProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status == true) {
          console.log(result)
          setIsSchool(result?.userdata?.isSchool)
          setIsTeacher(result?.userdata?.isTeacher)
        }
        // setName(result.userdata.About)
      })
      .catch(error => console.log('error', error));
  }


  const getSchoolCredential = async () => {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('accessToken')
    // console.log(token);
    // console.log(user_id);

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

    fetch(API_URL4009 + "get_school_Change_Credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == true) {
          console.log(result)
          setSchoolCredential(result.response)
          setIsBYT(result?.selectedResponse)
        }
        else {
          console.log(result)
        }
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  }

  const getSchoolProfile = async () => {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('accessToken')
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

    fetch(API_URL4009 + "get_school_Change_Credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == true) {
          console.log(result)
          setSchoolCredential(result.response)
          setIsBYT(result?.selectedResponse)
          // setImage(result.response[0].credientialImage)
        }
        else {
          console.log(result)

        }
        // console.log(result)
      })
      .catch(error => console.log('error', error))
      .finally(() => setLoading(false));
  }

  const getTeacherCredential = async () => {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      "userId": user_id
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL4000 + "certificateForApprovedUser", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          console.log(result)
          setTeacherCredential(result?.userData?.certificates || [])
        } else {
          setTeacherCredential([]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }
  console.log(teacherCredential, 'teaCHER')

  const handleBarActive = (item) => {
    setActiveBarItem(item)
  }

  const navigate = useNavigate()
  const handleCredentialPath = () => {
    navigate('/CredentialForm')
  }
  const handleCategory = () => {
    if(isLocked){
      setModalOpen(true)
    }else{
    navigate('/Category')
  }
  }
  const handleSchoolDetails = (school) => {
    // navigate('/SchoolDetails')
    navigate('/SchoolDetails', {
      state: { ids: school._id, }
    });
  }

  const showChangeCredentialsModal = (title) => {
    Swal.fire({
      title: 'Change Credentials',
      text: `Are you sure you want to change to School - ${title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Change',
      cancelButtonText: 'Cancel',
      background: darkMode ? '#1b1b1b' : '#ffffff',
      color: darkMode ? '#ffffff' : '#000',

    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Credentials changed to:", title);
        closeModal()
      } else {
        console.log("Change canceled");
      }
    });
  }

  const closeModal = async () => {
    // Close the modal
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "crediential_id": crediential_id
    });

    console.log(raw);


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "change_Credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status == true) {
          console.log(result)
          setModalVisible1(false);
          // navigation.replace('TeacherProfile')
          getSchoolCredential()
        }
        else {
          setModalVisible1(false);
          console.log(result)
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.log('error', error)
      })
    // ToastAndroid.show("Network error Please Try again", ToastAndroid.SHORT),
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />

      <div className='title-accederation' >
        <PageTitle title={'Bodsphere Accreditation'} />
      </div>
      <div className='overall-premium-bar'>
        <div>
          {teacherCredential?.length === 0 ? (
            showInfoCard ? (
            <div style={{ marginTop: '10%' }}>
              <InfoCard
                imageSrc='/assets/newnew_certificate (12).png' // Replace with your image URL
                title="You do not have Bodsphere Accreditation at the moment."
                subtitle="Kindly complete any of Bodsphere's Yoga Teacher Trainings to get Bodsphere Accredited. "
                buttonText={isLocked ? "Discover Subscription":"Click here"}
                onButtonClick={handleCategory}
              />
                         <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
              
            </div>
            ):null)
            :
            <div>
              {teacherCredential.map((item, index) => (
                <div className='p-b-container' key={index}
                  onClick={() => {
                    navigate('/CertificateAccridation', {
                      state: { ids: item.certificateId, byt: item.designationName ,generatedAt:item.generatedAt }
                    });
                  }}
                  style={{
                    backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                      <h3>{item.designationName}</h3>
                      <p style={{ color: darkMode ? 'white' : 'black', marginBottom: 0 }}>
                        certificateId : {item.certificateId}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          }

        </div>
      </div>
    </>
  )
}
