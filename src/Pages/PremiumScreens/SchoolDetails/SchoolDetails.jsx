import React, { useRef } from 'react'
import './SchoolDetails.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../../Context'
import { useContext,useState,useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL4010, errorMessage, successMessage } from '../../../Service/ApiService';
import { toast, Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
// import CountrySelector from './CountrySelector';
import Select from 'react-select';
import countryList from 'react-select-country-list';

export default function SchoolDetails() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const location=useLocation();
  const options = useMemo(() => countryList().getData(), []);
  const {ids,byt}=location.state || {}
// console.log(ids);

  const [isCityListVisible, setCityListVisible] = useState(false);
  const [isStyleListVisible, setStyleListVisible] = useState(false);
  const [style, setSelectedStyle] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [facultyList, setFacultyList] = useState([{ id: 1, name: '' }]);
  const [pictures, setPictures] = useState([{ name: '' }]);
  const [pictures1, setPictures1] = useState([{ name: '' }]);
  const [schoolName, setSchoolName] = useState('');
  const [firstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('')
  const [schoolLogo, setSchoolLogo] = useState('')
  const [adress, setAdress] = useState('')
  const [schoolEmail, setSchoolEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [link, setLink] = useState('');
  // const [styleYoga, setstyleYoga] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [bodCer1,setBodCer1]=useState('');
  const [bodCer2,setBodCer2]=useState('');
  const [selectedOption,setSelectedOption]=useState(true)

  const user_id=localStorage.getItem('user_id')
  const token= localStorage.getItem('accessToken')

  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [privacyAccepted, setPrivacyAccepted] = useState(false);

  // Check if both checkboxes are checked to enable submit
  const isSubmitEnabled = termsAccepted ;

  

  const fileInputRef = useRef(null);
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];    
    // console.log(file);
        
    // updateImage(file)
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
    // setBodCer1(event?.target?.files?.[0])

  };

  const handleImageClick1 = () => {
    fileInputRef1.current.click();
    // setBodCer2(event?.target?.files?.[0])

  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setBodCer1(file);
      // console.log('bodCer1 updated:', file);
    }
  };
  
  const handleFileChange2 = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setBodCer2(file);
      // console.log('bodCer2 updated:', file);
    }
  };

  
  const handleImageClick2 = (event) => {
    fileInputRef2.current.click();
    // console.log(event.target.files[0]);
    
    setSchoolLogo(event?.target?.files?.[0])
  };


  const nationality = [
    { _id: 1, nationality: 'American' },
    { _id: 2, nationality: 'Indian' },
    { _id: 3, nationality: 'Australian' },
    { _id: 4, nationality: 'Canadian' },
    { _id: 5, nationality: 'British' },
  ];

  const styleOdYoga = [
    { _id: 1, nationality: 'cobra' },
    { _id: 2, nationality: 'Asana' },
    { _id: 3, nationality: 'Pranama' },
    { _id: 4, nationality: 'snake pose' },
  ];

  const addAnotherField = () => {
    if (pictures.length < 5) {
      setPictures([...pictures, { name: '' }]);
    } else {
      // Optional: Show a message or handle the case when the limit is reached
      errorMessage('Maximum of 5 pictures reached');
    }
  };
  
  const removeField = (index) => {
    // Only allow removing if there’s more than one picture
    if (pictures.length > 1) {
      setPictures(pictures.filter((_, i) => i !== index));
    }
  };


  const addAnotherField1 = () => {
    setPictures1([...pictures1, { name: '' }]);
  };

  const removeField1 = (index) => {
    // Only allow removing if there’s more than one picture
    if (pictures1.length > 1) {
      setPictures1(pictures1.filter((_, i) => i !== index));
    }
  };


  const toggleCityList = () => {
    setCityListVisible(!isCityListVisible);
  };

  const changeHandler = value => {
    
    setSelectedCity(value)
  }

  const handleCitySelect = (city) => {
    setSelectedCity(city.nationality)
    setCityListVisible(false);
  };

  const toggleStyleList = () => {
    setStyleListVisible(!isStyleListVisible);
  };


  const handleStyleSelect = (city) => {
    setSelectedStyle(city.nationality)
    setStyleListVisible(false);
  };



 const navigate=useNavigate()
 const handleEditSchool=()=>{
  navigate('/EditSchoolDetails')
 }

 const handleFaculty=()=>{
  navigate('/Faculty')
 }
 const handleRegistration=()=>{
  navigate('/Registration')
 }
 const handleSocialmedialinks=()=>{
  navigate('/SocialMediaLinks')
 }
 const handleDocumentation=()=>{
  navigate('/Documentation')
 }
 const handleWeTeach=()=>{
  navigate('/WeTeach')
 }
 const addAnotherFaculty = () => {
  setFacultyList([...facultyList, { id: facultyList.length + 1, name: '' }]);
};
const removeFaculty = (index) => {
  if (facultyList.length > 1) {
    setFacultyList(facultyList.filter((_, i) => i !== index));
  }
};


const handleInputChange = (index, event) => {
  const updatedList = [...facultyList];
  updatedList[index] = {
    ...updatedList[index], 
    name: event.target.value 
  };
  setFacultyList(updatedList);
};

const handleImageInputChange = (index, event) => {
  
  const updatedFields = [...pictures];
  updatedFields[index] = { ...updatedFields[index], name: event?.target?.files?.[0] }; 
  // console.log('567',event?.target?.files?.[0]);

  setPictures(updatedFields);  
};

const handleImageInputChange1 = (index, event) => {
  const updatedFields = [...pictures1];
  updatedFields[index] = { ...updatedFields[index], name: event?.target?.files?.[0] }; 
  
  setPictures1(updatedFields);  
};

const getFileType = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return 'image/jpeg'; // Adjust the content type for images
    case 'pdf':
      return 'application/pdf'; // Content type for PDF files
    default:
      return 'application/octet-stream'; // Default content type
  }
};


let addSchool = false;

// console.log(selectedOption,'selelele');
const phonePattern = /^\+?[0-9]{10,15}$/; // Allows + at start, 10-15 digits

const AddSchoolDetails = async () => {
  // console.log("clickeddddd",schoolLogo?.name);
  
  const updatedfaculty = facultyList.filter((item) => item.name != '')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // console.log(pictures?.length);
  // console.log(isSubmitEnabled);
  // console.log({
  //   schoolLogo: schoolLogo?.name,
  //   schoolName,
  //   firstName,
  //   lastName,
  //   instagram,
  //   facebook,
  //   linkedin,
  //   twitter,
  //   adress,
  //   selectedCity,
  //   schoolEmail,
  //   phoneNumber,
  //   link,
  //   style,
  //   user_id,
  //   ids,
  //   bodCer1,
  //   bodCer2,
  //   selectedOption,
  //   pictures,
  //   pictures1,
  //   updatedfaculty,
  // });
  if (!selectedCity?.label?.trim()) {
    errorMessage("Please select a city");
  }
  if (!phonePattern.test(phoneNumber)) {
    toast.error("Enter a valid phone number!");
    isValid = false;
  }
  if (!pictures || !Array.isArray(pictures) || pictures.some((file) => !file?.name)) {
    errorMessage("Please upload valid images.");
  }
  if (firstName.trim() === lastName.trim() === schoolName.trim() === '' || schoolLogo === "" || adress.trim() === '' || selectedCity.label.trim() === '' || schoolEmail.trim() === '' ||
    phoneNumber.trim() === '' || link.trim() === '' || style.trim() === '' || pictures?.some((file) => file?.name == '') || pictures1?.some((file) => file?.name == '')) {
      errorMessage("Please Fill All Fields")
  }
  else if (!emailRegex.test(schoolEmail)) {
    errorMessage("Please Enter Valid Email")
  }
  // else if (pictures.length !== 5){
  //   errorMessage("Please upload 5 pictures of your classes and training.")
  // }
  else if (isSubmitEnabled == false){
    errorMessage("Please accept the Terms & Conditions and Privacy Policy to proceed.")
  }
  else {

    // const photo = {
    //   uri: schoolLogo?.assets?.[0]?.uri,
    //   type: schoolLogo?.assets?.[0]?.type,
    //   name: schoolLogo?.assets?.[0]?.fileName,
    // };
    // const { crediential_id } = route?.params;
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

//     const formdata = new FormData();
//     formdata.append("user_id", user_id );
//     formdata.append("school_name", schoolName);
//     formdata.append("instagram", instagram);
//     formdata.append("facebook", facebook);
//     formdata.append("linkedin", linkedin);
//     formdata.append("twitter", twitter);
//     formdata.append("address", adress);
//     formdata.append("country", selectedCity.label);
//     formdata.append("school_email", schoolEmail);
//     formdata.append("phone_no", phoneNumber);
//     formdata.append("webSite_link", link);
//     formdata.append("styleOfyoga", style);
//     formdata.append("facalty", "jack");
// formdata.append("BYC_title", "good");
//     updatedfaculty.forEach((file, index) => {
//       // console.log(file.name);
      
//       formdata.append(`facalty`, file.name);
//     });
//     pictures1.forEach((file, index) => {
//       // console.log(file.name.name);
      
//       formdata.append(`training_manual`, file.name); 
//     });
    
//     pictures.forEach((file, index) => {
//       formdata.append(`clsnAndtringImages`, file.name); 
//     });
    
//     formdata.append("logo_school", schoolLogo.name);
//     formdata.append("crediential_id", ids);
//     // if (bodCer1) {
//     //   formdata.append("bysImageOne", bodCer1, bodCer1.name);
//     // }
//     // if (bodCer2) {
//     //   formdata.append("bysImageTwo", bodCer2, bodCer2.name);
//     // }
    

//     formdata.append("join_Bodsphere", selectedOption);

const formdata = new FormData();
formdata.append("user_id", user_id);
formdata.append("firstName",firstName);
formdata.append("lastName",lastName)
formdata.append("school_name",schoolName);
formdata.append("instagram", instagram);
formdata.append("facebook", facebook);
formdata.append("linkedin", linkedin);
formdata.append("twitter", twitter);
formdata.append("address", adress);
formdata.append("country", selectedCity?.label);
formdata.append("school_email", schoolEmail);
formdata.append("phone_no", phoneNumber);
formdata.append("webSite_link",link);
formdata.append("styleOfyoga", style);
updatedfaculty.forEach((file, index) => {
        // console.log(file.name);
        
        formdata.append(`facalty`, file?.name);
      });
      pictures.forEach((file, index) => {
              formdata.append(`clsnAndtringImages`, file?.name); 
            });
pictures1.forEach((file, index) => {
        // console.log(file.name.name);
        
        formdata.append(`training_manual`, file?.name); 
      });
      formdata.append("logo_school", schoolLogo?.name);
formdata.append("crediential_id", ids);
updatedfaculty.forEach((file, index) => {
  // console.log(file.name);
  
  formdata.append(`facalty`, file?.name);
});
formdata.append("BYC_title", byt);
formdata.append("join_Bodsphere", selectedOption);
  if (bodCer1) {
      formdata.append("bysImageOne", bodCer1, bodCer1?.name);
    }
    if (bodCer2) {
      formdata.append("bysImageTwo", bodCer2, bodCer2?.name);
    }
    // console.log(schoolLogo)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    // console.log(formdata,'fffffffffffform');
    
    fetch(API_URL4010+"apply_School", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result,'resultt');
        
        if (result?.status === true) {
          successMessage("Thank you for submitting your Bodsphere Accreditation's form. We will get back to you shortly!", {
            duration: 2000, // Duration for the toast
          });
          setTimeout(() => {
            navigate('/PremiumBar'); // Navigate after toast
          }, 2000);
        }
        else {
          errorMessage(result?.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        // if (!addSchool) {
        //   addSchool = true;
        //   AddSchoolDetails();
        // }
      });
  }
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '#333',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: darkMode ? '#aaa' : '#555',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: darkMode ? '#fff' : '#2C2C2E',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: darkMode ? '#2C2C2E' : '#fff',
    color: darkMode ? '#fff' : '#2C2C2E',
  }),
  option: (provided, { isFocused, isSelected }) => ({
    ...provided,
    backgroundColor: isFocused
      ? darkMode
        ? '#444'
        : '#e6e6e6'
      : isSelected
      ? darkMode
        ? '#555'
        : '#ddd'
      : darkMode
      ? '#2C2C2E'
      : '#fff',
    color: darkMode ? '#fff' : '#2C2C2E',
  }),
};

  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
    
    <div className='scj-top-tit'>
      <PageTitle title={'Apply for BYS Credential'}/>
    </div>
    <form>
    <div className='overall-sd'>
        <div className='sd-out-container'>
          <h3>
            {/* School -  */}
            {byt}</h3>
          <h4 style={{color:darkMode ? 'white':'black'}}>Create Your Account</h4>
          {/* <p>When you apply to become part of the Bodsphere community, you are taking the first step towards joining a global community of yoga schools & teachers that represent high quality, safe, accessible and equitable yoga.</p> */}
        </div>
        <div className='sd-details-top'
         style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
          <div className='sd-in-top'>
          <div className='sd-d-2'>Add School Details</div>
          {/* <div className='sd-d-1'>+Add Another</div> */}
          </div>
          {/* <form> */}

          <div className='sd-in' 
        >
          <label  style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              First Name
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <input type="text" 
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className={darkMode ? "input-dark-mode" : "input-light-mode"}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>


        <div className='sd-in' 
        >
          <label  style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Last Name
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <input type="text" 
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className={darkMode ? "input-dark-mode" : "input-light-mode"}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>

          <div className='sd-in' 
        >
          <label  style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              School Name
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <input type="text" 
          value={schoolName}
          onChange={(event) => setSchoolName(event.target.value)}
          className={darkMode ? "input-dark-mode" : "input-light-mode"}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in'
        // onClick={handleEditSchool}
        >
          <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
          Address
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <input type="text" 
          value={adress}
          onChange={(event) => setAdress(event.target.value)}
          className={darkMode ? "input-dark-mode" : "input-light-mode"}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in'
        // onClick={handleEditSchool}
        >
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Nationality
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          {/* <div className='in-inside-img' onClick={toggleCityList}>
          <input type="text"  
          value={selectedCity}
          // onChange={(event) => setSelectedCity(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
          <img loading="lazy" src='/assets/Vector (3).png')} alt="" />
          </div>
          {isCityListVisible && (
        <div className="city-list" style={{backgroundColor:darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)"}}>
          {nationality.map((city) => (
            <div
              className="city-item"
              key={city._id}
              onClick={() => handleCitySelect(city)}
              style={{color: darkMode ? "#d8d8df" :  "#2C2C2E"}}
            >
              {city.nationality}
            </div>
          ))}
        </div>
      )} */}
  <div style={{color: darkMode ? 'white':'black'}}>
             <Select
      options={options}                 // Provide the country options
      value={selectedCity}               // Set the selected value
      onChange={changeHandler}           // Update value on selection
      placeholder="Select a country"     // Placeholder text
      styles={customStyles}              // Apply custom styles for dark and light mode
    />
    </div>
        </div>
        <div className='sd-in'
        // onClick={handleEditSchool}
        >
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            School Email
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <input type="email"
          value={schoolEmail}
          onChange={(event) => setSchoolEmail(event.target.value)}   
          className={darkMode ? "input-dark-mode" : "input-light-mode"}     
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in'
        // onClick={handleEditSchool}
        >
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Phone Number
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <input type="text"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)} 
          className={darkMode ? "input-dark-mode" : "input-light-mode"}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in'
        // onClick={handleEditSchool}
        >
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Website Link
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <input type="text" 
          value={link}
          onChange={(event) => setLink(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in' onClick={toggleStyleList}>
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
          Style of Yoga Practice
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          <div className='in-inside-img'>
          <input 
          type="text" 
          value={style}
          // onChange={(event) => setSelectedStyle(event.target.value)} 
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
          <img loading="lazy" src='/assets/Vector (3).png' alt="" />
          </div>
          {isStyleListVisible && (
        <div className="city-list" style={{backgroundColor:darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)"}}>
          {styleOdYoga.map((city) => (
            <div
              className="city-item"
              key={city._id}
              onClick={() => handleStyleSelect(city)}
              style={{color: darkMode ? "#d8d8df" :  "#2C2C2E"}}
            >
              {city.nationality}
            </div>
          ))}
        </div>
      )}
        </div>
        <div className='sd-d-2' >
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Faculty
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          </div>
        {facultyList.map((faculty, index) => (
        <div className='sd-in' key={index}>
          {`Faculty ${index + 1}`}
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
          <input type="text" 
          value={faculty.name}
          onChange={(event) => handleInputChange(index, event)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,width:'90%'
          }}/>
                              {index === facultyList.length - 1 && facultyList.length > 1 && (
          <img
            src='/assets/remove.png'
            alt="Remove"
            onClick={() => removeFaculty(index)}
            style={{
              cursor: "pointer",
              width: 20,
              height: 20,
              marginRight: 8,
            }}
          />
        )}

</div>
        </div>
                  ))}
        <div className='sd-level-top'>
              {/* <div className='sd-level-title'>Level Of Registration</div> */}
              <div className='sd-level-add' onClick={addAnotherFaculty}>+Add Another</div>
            </div>
        </div>
       <div className='sd-level-r-container' style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}
        >
            <div className='sd-level-top1'>
              <div className='sd-level-title'>
                <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
                Level of registration
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
                </div>
              {/* <div className='sd-level-add'>+Add Another</div> */}
            </div>
            <div className='sd-img-in'>
            Upload picture of your classes and training
          {/* <input 
           
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/> */}
        </div>
        {pictures.map((certificate, index) => (
        <div className='sd-in'>
         Upload
          <div className='in-inside-img-upload'>
          <input
           type="file" 
           accept=".png, .pdf, .jpeg"
          //  ref={fileInputRef} 
          //  value={certificate.name} 
           onChange={(event) => handleImageInputChange(index, event)} 
           id={`file-input-pictures-${index}`} // Unique id for this loop
           style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          <div style={{flexGrow: 1, marginRight: 10}}>{certificate?.name?.name}</div>
          <div className="icon-container">

          {index === pictures.length - 1 && pictures.length > 1 && (
          <img
            src='/assets/remove.png'
            alt="Remove"
            onClick={() => removeField(index)}
            style={{
              cursor: "pointer",
              width: 20,
              height: 20,
              marginRight: 8,
            }}
          />
        )}


          <img loading="lazy" src='/assets/material-symbols_upload.png' alt="" 
          onClick={() => document.getElementById(`file-input-pictures-${index}`).click()}
          style={{filter:darkMode?"invert(0%)": "invert(100%)" }}
          />
          </div>
          </div>
        </div>
        ))}
        {/* <div className='sd-level-top'>
              <div className='sd-level-add' onClick={addAnotherField}>+Add Another</div>
            </div> */}
       </div>

          <div className='sml-main-container'  style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}
        >
            <div className='sml-title'>
            <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Social Media Links
              {/* <span style={{ marginLeft: 2 }}> *</span> */}
            </label>
            </div>
            <div className='sd-in'>
          Instagram
          <input type="text" 
          value={instagram}
          onChange={(event) => setInstagram(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in'>
          Facebook
          <input type="text" 
          value={facebook}
          onChange={(event) => setFacebook(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in'>
          Twitter
          <input type="text" 
          value={twitter}
          onChange={(event) => setTwitter(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        <div className='sd-in'>
        LinkedIn
          <input type="text" 
          value={linkedin}
          onChange={(event) => setLinkedin(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
          </div>

       <div className='sd-doc-container' 
       style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
        <div className='sd-doc-title'>
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Documentation
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          </div>
        <div className='sd-img-in'>
        Attach your Teacher Training Manual
          <input type="text" 
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
        {pictures1.map((certificate, index) => (
        <div className='sd-in' key={index}>
         Upload
          <div className='in-inside-img-upload'>
          <input 
          type="file" 
          accept=".png, .pdf, .jpeg"
          // ref={fileInputRef1}           
          // value={certificate.name} 
          onChange={(event) => handleImageInputChange1(index, event)} 
          id={`file-input-pictures1-${index}`}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          <div style={{flexGrow: 1, marginRight: 10}}>{certificate?.name?.name}</div>
          <div className="icon-container">

          {index === pictures1.length - 1 && pictures1.length > 1 && (
          <img
            src='/assets/remove.png'
            alt="Remove"
            onClick={() => removeField1(index)}
            style={{
              cursor: "pointer",
              width: 20,
              height: 20,
              marginRight: 8,
            }}
          />
        )}
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  
          onClick={() => document.getElementById(`file-input-pictures1-${index}`).click()}
          style={{filter:darkMode?"invert(0%)": "invert(100%)" }}
          />
          </div>
          </div>
        </div>
        ))}
        <div className='sd-level-top'>
              {/* <div className='sd-level-title'>Level Of Registration</div> */}
              <div className='sd-level-add' onClick={addAnotherField1}>+Add Another</div>
            </div>
       </div>

       <div className='sd-logo-container'
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
        <div className='sd-logo-top1'>
        <div className='sd-logo-title'>
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Attach logo of your school
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          </div>
        {/* <div className='sd-logo-add'>+Add Another</div> */}
        </div>
        <div className='sd-in' style={{marginTop:'2%'}}>
         Upload 
          <div className='in-inside-img-upload'>
          <input
          type="file" 
          accept="image/*" 
          ref={fileInputRef2}           
          // value={certificate.name} 
          onChange={(event) => handleImageClick2(event)}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          <div style={{flexGrow: 1, marginRight: 10}}>{schoolLogo?.name}</div>
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  
          onClick={(event)=>handleImageClick2(event)} style={{filter:darkMode?"invert(0%)": "invert(100%)" }}/>
          </div>
        </div>
       </div>
          {byt==="Bodsphere Yoga School 500 (BYS 500)"?
       <div className='sd-logo-container'
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
        <div className='sd-logo-top1'>
        <div className='sd-logo-title'>
          <label style={{ display: "inline-flex", alignItems: "center",color:'#FF5F67' }}>
            Attach Bodsphere Certificates
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
          </div>
        {/* <div className='sd-logo-add'>+Add Another</div> */}
        </div>
        <div className='sd-in' style={{marginTop:'2%'}}>
         Upload Bodsphere's 200-Hrs Certificate 
          <div className='in-inside-img-upload'>
          <input
          type="file" 
          accept="image/*" 
          ref={fileInputRef3}           
          // value={certificate.name} 
          onChange={handleFileChange1}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          <div style={{flexGrow: 1, marginRight: 10}}>{bodCer1?.name}</div>
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  
          onClick={() => fileInputRef3.current.click()} style={{filter:darkMode?"invert(0%)": "invert(100%)" }}/>
          </div>
        </div>
        <div className='sd-in' style={{marginTop:'2%'}}>
        Upload Bodsphere's 300-Hrs Certificate 
          <div className='in-inside-img-upload'>
          <input
          type="file" 
          accept="image/*" 
          ref={fileInputRef4}           
          // value={certificate.name} 
          onChange={handleFileChange2}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          <div style={{flexGrow: 1, marginRight: 10}}>{bodCer2?.name}</div>
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  
          onClick={() => fileInputRef4.current.click()} style={{filter:darkMode?"invert(0%)": "invert(100%)" }}/>
          </div>
        </div>
       </div>
       :null}

       <div className='sd-logo-container'
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
        <div className='sd-in-que' style={{marginTop:'2%'}}>
        Would you like to join the Bodsphere World to collaborate with Bodsphere Team for conducting the Yoga Teacher Trainings further? (Information given on the "Get Accredited" Page on our App/ website) 
          <div className='in-inside-n-que'>
          <input
          type="radio" 
          checked={selectedOption=== true}
          onChange={()=>setSelectedOption(true)}
          style={{ cursor: 'pointer' }} 
          />
       Yes
          </div>
          <div className='in-inside-n-que'>
          <input
          type="radio" 
          checked={selectedOption=== false}
          onChange={()=>setSelectedOption(false)}
          style={{ cursor: 'pointer' }} 
          />
       No
          </div>
        </div>


       </div>

       <div className="sd-bottom-content">
      <p  style={{color:darkMode ? 'white':'black'}}>
        By clicking on submit, you understand and agree to Bodsphere's 
        <strong onClick={() => navigate('/Privacy')}> Privacy Policy</strong> and 
        <strong onClick={() => navigate('/Terms')}> Terms & Conditions</strong>.
      </p>

      <div className='new-agree' style={{ display: "flex", alignItems: "center" }}>
        <input
          type="radio"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
        />
        <label className='new-labb' style={{color:darkMode ? 'white':'black'}}>I agree to the Terms and Conditions and the Privacy Policy.</label>
      </div>

      {/* <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
        <input
          type="radio"
          checked={privacyAccepted}
          onChange={() => setPrivacyAccepted(!privacyAccepted)}
        />
        <label>I agree to the Privacy Policy</label>
      </div> */}

      </div>
       <div className='sd-main-btn' onClick={AddSchoolDetails}>Submit</div>
    </div>
    </form>
    </>
  )
}
