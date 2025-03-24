import React from 'react'
import './PremiumBar.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../Context'
import { useContext,useState ,useEffect} from 'react';
import { useNavigate ,useLocation} from 'react-router-dom';
import { API_URL4000, API_URL4002, API_URL4009, API_URL4010, errorMessage, ImagePath, successMessage } from '../../Service/ApiService';
import { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

export default function PremiumBar() {
  const [activeBarItem,setActiveBarItem]=useState('Teacher')
  const [schoolCredential,setSchoolCredential] = useState([])
  const [isBYT,setIsBYT] = useState([])
  const [modalVisible1, setModalVisible1] = useState(false);
  const [title, setTitle] = useState('')
  const [crediential_id, setCrediential_id] = useState('')
  const [isSchool, setIsSchool] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [teacherCredential,setTeacherCredential] = useState([])
  const [selectedResponse,setSelectedResponse] = useState([])



  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.selectedOption) {
      setActiveBarItem(location.state.selectedOption);
    }
  }, [location.state]);

  useEffect(()=>{
    getSchoolProfile();
    getSchoolCredential()
    getUser()
    getTeacherCredential()
  },[])

  const getUser = async () => {

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

       fetch(API_URL4002+"getUserProfile", requestOptions)
         .then(response => response.json())
         .then(result => {
          if(result.Status == true){
            console.log(result)
            setIsSchool(result.userdata.isSchool)
            setIsTeacher(result.userdata.isTeacher)
          }
          // setName(result.userdata.About)
         })
         .catch(error => console.log('error', error));
  }


  const getSchoolCredential = async () =>{
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    console.log(token);
    console.log(user_id);
    
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

    fetch(API_URL4010+"get_school_Change_Credential", requestOptions)
      .then(response => response.json())
      .then(result => {
          if(result.status == true){
          console.log(result)
          setSchoolCredential(result.response)
          // setIsBYT(result.selectedResponse)
        }
        else{
          console.log(result)
        }
      })
      .catch(error => console.log('error', error));

    // const token= localStorage.getItem('accessToken')

    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer "+ token);

    // const raw = "";

    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow"
    // };

    // fetch(API_URL4009+"getSchoolCredientials", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if(result.status === true){
    //       setSchoolCredential(result.response)
    //     }
    //     console.log(result)
    //   })
    //   .catch((error) => console.error(error));
  }

  const getSchoolProfile = async() => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
      "user_id": user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4010+"get_school_Change_Credential", requestOptions)
      .then(response => response.json())
      .then(result => {
          if(result.status == true){
          console.log(result)
          setSchoolCredential(result.response)
          // setIsBYT(result.selectedResponse)
        }
        else{
          console.log(result)
        }
        // console.log(result)
      })
      .catch(error => console.log('error', error));

    // const token= localStorage.getItem('accessToken')

    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer "+ token);

    // const raw = "";

    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow"
    // };

    // fetch(API_URL4009+"getSchoolCredientials", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if(result.status === true){
    //       setSchoolCredential(result.response)
    //     }
    //     console.log(result)
    //   })
    //   .catch((error) => console.error(error));
  }

  const getTeacherCredential = async () =>{
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

    fetch(API_URL4009+"get_teacher_Change_Credential", requestOptions)
      .then(response => response.json())
      .then(result => {
             if(result.status == true){
              console.log(result)
              setTeacherCredential(result.response)
            }
            else{
              console.log(result)
            }})
      .catch(error => console.log('error', error));
    
    // const token= localStorage.getItem('accessToken')

    // const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer "+ token);

    // const raw = "";

    // const requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow"
    // };

    // fetch(API_URL4009+"getTeacherCredientials", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if(result.status === true){
    //       setTeacherCredential(result.response)
    //     }
    //     console.log(result)
    //   })
    //   .catch((error) => console.error(error));
  }


  const handleBarActive=(item)=>{
    setActiveBarItem(item)
  }

  const navigate=useNavigate()
  const handleCredentialPath=()=>{
    navigate('/CredentialForm')
  }
  const handleSchoolDetails=(school)=>{
    // navigate('/SchoolDetails')
    navigate('/SchoolDetails', {
      state: { ids: school._id, }
    });
  }

  const  showChangeCredentialsModal = (title) => {
    Swal.fire({
      title: 'Change Credentials',
      text: `Are you sure you want to change to School - ${title}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Change',
      cancelButtonText: 'Cancel',
      background: darkMode ? '#1b1b1b' : '#ffffff',
      color: darkMode ?  '#ffffff' : '#000',
  
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
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+ token);

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

    fetch(API_URL4009+"change_Credential", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status == true){
          console.log(result)
          setModalVisible1(false);
          // navigation.replace('TeacherProfile')
          getSchoolCredential()
        }
        else{
          setModalVisible1(false);
          console.log(result)
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.log('error', error)})
        // ToastAndroid.show("Network error Please Try again", ToastAndroid.SHORT),
  };

  
  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
    
    <div className='top-accc-title'>
      <PageTitle title={'Get Accredited By Bodsphere'}/>
    </div>
    <div className='overall-premium-bar'>
        <div>
          <div className='premium-bar'
            style={{
              backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
            }}>
            <div className='bar-school'
             onClick={()=>handleBarActive('School')}
             style={{
               backgroundColor:
                 activeBarItem === "School" ? "#FF5F67" : undefined,
               color: activeBarItem === "School" ? "white" : undefined,
               cursor: "pointer",
             }}>School</div>
            <div className='bar-teacher'
             onClick={()=>handleBarActive('Teacher')}
             style={{
               backgroundColor:
                 activeBarItem === "Teacher" ? "#FF5F67" : undefined,
               color: activeBarItem === "Teacher" ? "white" : undefined,
               cursor: "pointer",
             }}>Teacher</div>
          </div>
      {activeBarItem==='Teacher' ? (
      <div>
        {teacherCredential.map((item,index) => (
          <div className='p-b-container' key={index}
          // onClick={handleCredentialPath}
          onClick={() => {
            // if (selectedResponse.length > 0) {
            //   setCrediential_id(item._id)
            //   setTitle(item.BYC_title)
            //   // setModalVisible1(true);     
            //   showChangeCredentialsModal(item.BYC_title)             
            // }
            // else{
            // if(isTeacher == false && isSchool == false){
            if(item.verificationStatus == "Pending" ){
              errorMessage("Your Application is in progress.")
            }
            else if(item.verificationStatus == "Rejected"){
              navigate('/CredentialForm', {
                state: { ids: item._id,byt:item.BYC_title }
              });

            }
            else if(item.verificationStatus == "Approved"){
              // successMessage("You are already accredited. Go to Settings > Accreditation to check your Bodsphere Credential.")
              successMessage("The Application has been approved")
            }
            else if (item.verificationStatus == "Not Available"){
              navigate('/CredentialForm', {
                state: { ids: item._id,byt:item.BYC_title }
              });
              console.log(clicked)
            }
            // }
            // if(isTeacher == false && isSchool == true){
            //   errorMessage("U Are Already in school")
            // }
            // }
        }}
           style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
             <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Image on the left */}
          <img
            src={ImagePath +item.credientialImage}
            alt={`${item.BYC_title} image`}
            style={{
              width: '50px', 
              height: '50px',
              marginRight: '15px',
              objectFit: 'cover', 
              borderRadius:'25px'
            }}
          />

          <div>
            <h3>{item.BYC_title}</h3>
            <p style={{color:darkMode?'white':'black'}}>
              {item.BYC_Description.split('<br />').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
          </div>
          ))}
          </div>
          ):activeBarItem==='School' ?(
            <div>
              {schoolCredential.map((item) => (
      <div
        key={item._id}
        className="p-b-container"
        onClick={() => {
          // if (isBYT.length > 0) {
          //   setCrediential_id(item._id);
          //   setTitle(item.BYC_title);
          //   showChangeCredentialsModal(item.BYC_title)            
          // } else {
          //   if (isTeacher === false && isSchool === false) {
                
              if(item.verificationStatus == "Pending" ){
                errorMessage("Your Application is in progress")
              }
              else if(item.verificationStatus == "Rejected"){
                navigate('/SchoolDetails', {
                  state: { ids: item._id,byt:item.BYC_title }
                });
  
              }
              else if(item.verificationStatus == "Approved"){
                successMessage("The Application has been approved.")
              }
              else if (item.verificationStatus == "Not Available"){
                navigate('/SchoolDetails', {
                  state: { ids: item._id,byt:item.BYC_title }
                });
              }         
          //   } else if (isTeacher === true && isSchool === false) {
          //     errorMessage("You are already a teacher")
          //   }
          // }
        }}
        
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Image on the left */}
          <img
            src={ImagePath +item.credientialImage}
            alt={`${item.BYC_title} image`}
            style={{
              width: '50px', 
              height: '50px',
              marginRight: '15px',
              objectFit: 'cover', 
              borderRadius:'25px'
            }}
          />

          <div>
            <h3>{item.BYC_title}</h3>
            <p style={{color:darkMode?'white':'black'}}>
              {item.BYC_Description.split('<br />').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    ))}



          </div>
          ):('')}
        </div>
    </div>
    </>
  )
}
