import React, { useEffect } from 'react'
import './CredentialForm.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../Context'
import { useContext,useState,useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../../Components/Loader/Modal/Modal';
// import DatePicker from 'react-datepicker';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import 'react-datepicker/dist/react-datepicker.css';
import { API_URL4009, errorMessage, successMessage } from '../../Service/ApiService';
import { Toaster } from 'react-hot-toast';
// import CountrySelector from './CountrySelector';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { useRef } from 'react';

export default function CredentialForm() {
  const location=useLocation();
  const {ids,byt}=location.state || {}

  const [createdModal,setCreadetModal]=useState(false);
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [adress,setAdress] = useState('')
  const [dob,setDob] = useState(null)
  const [phoneNumber,setPhoneNumber] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [isCityListVisible, setCityListVisible] = useState(false);
  const [isLevelVisible, setLevelVisible] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [certificateFields, setCertificateFields] = useState([{ name: '' }]);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyModal,setVerifyModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null);
  const [nationality,setNationality] = useState([])
  const [levels,setLevels] = useState([ ]); 
  const [selectedCity1, setSelectedCity1] = useState('');
  const [isCityListVisible1, setCityListVisible1] = useState(false);
  const [pictures, setPictures] = useState([{ name: '' }]);
  const [bodCer1,setBodCer1]=useState('');
  const [bodCer2,setBodCer2]=useState('');
const [filechange,setfilechange]=useState('')
  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const datePickerRef = useRef(null); // Create a ref for the date picker
  
    const fileInputRef3 = useRef(null);
    const fileInputRef4 = useRef(null);

    const handleFileChange1 = (e) => {
      const file = e.target.files[0]; // Get the selected file
      if (file) {
        setBodCer1(file);
        setfilechange(true)
        console.log('bodCer1 updated:', file);
      }
    };
    
    const handleFileChange2 = (e) => {
      const file = e.target.files[0]; // Get the selected file
      if (file) {
        setBodCer2(file);
        console.log('bodCer2 updated:', file);
      }
    };
  // Handle click outside the date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false); // Close date picker if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Check if both checkboxes are checked to enable submit
  const isSubmitEnabled = termsAccepted ;

  const options = useMemo(() => countryList().getData(), []);


  const handleCreateModalOpen=()=>{
    setCreadetModal(true)
  }
  const handleCreateModalclose=()=>{
    setCreadetModal(false)
  }
  const navigate=useNavigate();
  const handleChangeCredential=()=>{
    navigate('/ChangeCredential')
  }

  const handleCalenderClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle date selection and close date picker
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setDob(date.toDateString()); // Optional: Set the DOB in the input
    setShowDatePicker(false); // Close the date picker after selection
  };

  useEffect(() => {
    getNationality();
    getLevel();
  }, []);


  const getNationality = async() =>{
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ token);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch(API_URL4009+"getnationality", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result)
        setNationality(result?.response)
      })
      .catch(error => console.log('error', error));
  }

  const getLevel =async () =>{
    const token= localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ token);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    
    fetch(API_URL4009+"getlevelofcertify", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result)
                setLevels(result?.response)
        })
      .catch(error => console.log('error', error));
  }


  const toggleCityList = () => {
    setCityListVisible(!isCityListVisible);
  };
  const changeHandler = value => {
    console.log(value);
    
    setSelectedCity(value)
  }

  const handleCitySelect = (city) => {
    console.log('Selected city:', city.nationality);
    setSelectedCity(city.nationality)
    setCityListVisible(false);
  };

  const toggleCityList1 = () => {
    setCityListVisible1(!isCityListVisible1);
  };


  const handleCitySelect1 = (city) => {
    // console.log('Selected city:', city.nationality);
    setSelectedCity1(city.levelofcertify)
    setCityListVisible1(false);
  };

  const addAnotherField = () => {
    setPictures([...pictures, { name: '' }]);
  };
  const removeField = (index) => {
    // Only allow removing if there’s more than one picture
    if (pictures.length > 1) {
      setPictures(pictures.filter((_, i) => i !== index));
    }
  };


  const handleImageInputChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ["image/png", "application/pdf", "image/jpeg"];
      if (!validExtensions.includes(file.type)) {
        errorMessage("Please upload a file in PNG, PDF, or JPEG format.");
        event.target.value = null; // Clear the input if the file is not valid
        return;
      }

      // Handle the file (e.g., save it to state or upload)
      console.log("Valid file selected:", file);
    }
    const updatedFields = [...pictures];
    updatedFields[index] = { ...updatedFields[index], name: event?.target?.files?.[0] }; 
    // console.log('567',event?.target?.files?.[0]);
  
    setPictures(updatedFields);  
  };

  const formatDate = (date) => {
    const validDate = new Date(date); // Convert input to Date object
    return `${validDate.getMonth() + 1}/${validDate.getDate()}/${validDate.getFullYear()}`;
  };
  
  
  const applyTeacher = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(selectedCity.label)
    // emailRegex.test(email)
    if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === ''  || formatDate(dob).trim() === 0 || selectedCity.label.trim() === '' || adress.trim() === '' , phoneNumber.trim() === '' || selectedCity1.trim() === '' 
    // || pictures?.some((file) => file?.name == '')
  ){
      // ToastAndroid.show("Please Fill All Fields", ToastAndroid.SHORT);
      // console.log('certificateFields',certificateFields)
      errorMessage("Please fill all the fields")
    }
    else if(!emailRegex.test(email)){
      // ToastAndroid.show("Please Enter Valid Email", ToastAndroid.SHORT);
      errorMessage("Please enter the valid email")
    }
    else if (isSubmitEnabled == false){
      errorMessage("Please accept the Terms & Conditions and Privacy Policy to proceed.")
    }
    else{
      // setIsLoading(true)
      // let applyTeacherCalled = false;
      const user_id=localStorage.getItem('user_id')
      const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ token);

    var formdata = new FormData();

    formdata.append("user_id", user_id);
    formdata.append("firstName", firstName);
    formdata.append("lastName", lastName);
    formdata.append("email", email);
    formdata.append("DOB", formatDate(dob));
    formdata.append("nationality", selectedCity.label);
    formdata.append("address", adress);
    formdata.append("phoneNumber", phoneNumber);
    formdata.append("levelOfCertification", selectedCity1);
    // certificateFields.forEach((file, index) => {
    //   formdata.append(`Critificates`, {
    //     uri: file.uri,
    //     name: file.name,
    //     type: getFileType(file.name), 
    //   });
    // });
    pictures.forEach((file, index) => {
      formdata.append(`Critificates`, file.name); 
    });
    // if (bodCer1) {
    //   formdata.append("bysImageOne", bodCer1, bodCer1?.name);
    // }
    // if (bodCer2) {
    //   formdata.append("bysImageTwo", bodCer2, bodCer2?.name);
    // }
    formdata.append("crediential_id", ids);
    // console.log("formdata",formdata)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    console.log(formdata,'techer')

    fetch(API_URL4009+"apply_Teacher", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status == true){
          // setVerifyModal(true)
          // setIsLoading(false)
          // ToastAndroid.show('Successfully created your bodsphere account. Currently we are reviewing your account.', ToastAndroid.SHORT);
          // navigation.replace('TeacherProfile')
          successMessage("Thank you for submitting your Bodsphere Accreditation's form. We will get back to you shortly!", {
            duration: 2000, // Duration for the toast
          });
          setTimeout(() => {
            navigate('/PremiumBar'); // Navigate after toast
          }, 2000);
        }
        else{
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          // setIsLoading(false)
          errorMessage(result.message)
        }
        console.log(result)
      })
      .catch(error => {
        console.log('error', error);
        
      });          
      }
  }
  // const [selectedCountry, setSelectedCountry] = useState(null);
  // const countries = countryList().getData().map(country => ({
  //   label: country.name,
  //   value: country.code,
  // }));

  // const handleCountryChange = (selectedOption) => {
  //   setSelectedCountry(selectedOption);
  // };

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? '#333' : 'rgba(236, 236, 236, 1)',
      color: darkMode ? 'rgba(236, 236, 236, 1)' : '#333',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: darkMode ? '#aaa' : '#555',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: darkMode ? 'rgba(236, 236, 236, 1)' : '#2C2C2E',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: darkMode ? '#2C2C2E' : 'rgba(236, 236, 236, 1)',
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
    
    <div className='form-top-tit'>
      <PageTitle title={'Apply for BYT Credential'}/>
    </div>


    <div className='overall-cred'>
        <div className='cred-text-container'>
          <div className='red-text'>
            {/* Teacher -  */}
            {byt}</div>
          <div className='cred-text' style={{color:darkMode ? 'white':'black'}}>Create Your Account</div>
          {/* <div className='cred-subtext'>When you apply to become part of the Bodsphere community, you are taking the first step towards joining a global community of yoga schools & teachers that represent high quality, safe, accessible and equitable yoga.</div> */}
        </div>

        {byt==="Bodsphere Yoga Teacher 200 (BYT 200)" ?
    <div className="bottom-form">
      <p  style={{color:darkMode ? 'white':'black'}}>
      Note: If you have completed both Bodsphere's 200-Hrs and 300-Hrs Yoga Teacher Training, You can apply for the BYT 500 Credential.
      
      </p>
      </div>
:null}

         {byt==="Bodsphere Yoga Teacher 500 (BYT 500)" ?
    <div className="bottom-form">
      <p  style={{color:darkMode ? 'white':'black'}}>
      Note: If you have completed both Bodsphere's 200-Hrs and 300-Hrs Yoga Teacher Training, You can apply for the BYT 500 Credential. 
      
      </p>
      </div>
:null}
        <div className='overall-cred-form'
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
          <div className='form-cred-container'>
          <div className='form-left-container' >
            <div className='form-content-1'>
             {/* First Name */}
             <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              First Name
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
              <input type="text"  
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={darkMode ? "input-dark-mode" : "input-light-mode"}
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }} />
            </div>
            <div className='form-content-1'>
             <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Last Name
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
              <input type="text" 
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              className={darkMode ? "input-dark-mode" : "input-light-mode"}
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }}/>
            </div>
            <div className='form-content-1'>
            <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Email
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
              <input type="text" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={darkMode ? "input-dark-mode" : "input-light-mode"}
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }}/>
            </div>
            <div className='form-content-d'>
             <div className='cred-dob-container'>
              <div className='cred-dob'>
                <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Date of Birth
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
                </div>
              {/* <div className='cred-cl-img'><img loading="lazy" src='/assets/Vector (4).png')} alt="" /></div> */}
              <div className='cred-cl-img'>
        {!showDatePicker && (
                <img
                  loading="lazy"
                  src="/assets/Vector (4).png"
                  alt=""
                  style={{ cursor: "pointer",filter:darkMode?"invert(0%)": "invert(100%)" }}
                  onClick={handleCalenderClick}
                />
              )}
              </div>
             </div>
              <input type="text" 
              value={dob}
              onChange={(event) => setDob(event.target.value)}
              className={darkMode ? "input-dark-mode" : "input-light-mode"}
              onFocus={() => setShowDatePicker(true)}
              readOnly
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }}/>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}
        ref={datePickerRef}
        >
                       {showDatePicker && (
                // <DatePicker
                //   selected={selectedDate}
                //   onChange={handleDateSelect} 
                //   dateFormat="MMMM d, yyyy"
                //   inline
                //   calendarClassName={darkMode ? 'dark-calendar' : 'light-calendar'}
                // />
                <div>
                           <Calendar maxDate={new Date()} onChange={handleDateSelect} value={selectedDate} />
                  
                </div>
              )}
              </div>
 
              {/* </div> */}
            </div>
            <div className='form-content-1'>
             <div className='cred-nat-container' onClick={toggleCityList}>
              <div className='cred-nat'>
                <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Nationality
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
                </div>
              {/* <div className='cred-nat-img'><img style={{filter:darkMode?"invert(0%)": "invert(100%)"}} loading="lazy" src='/assets/Vector (3).png')} alt="" /></div> */}
              
             </div>
             <div style={{color: darkMode ? 'white':'black'}}>
             <Select
      options={options}                 // Provide the country options
      value={selectedCity}               // Set the selected value
      onChange={changeHandler}           // Update value on selection
      placeholder="Select a country"     // Placeholder text
      styles={customStyles}              // Apply custom styles for dark and light mode
    />
    </div>
              {/* <input type="text"
              value={selectedCity} 
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }}/> */}
        {/* {isCityListVisible && (
        <div className="city-list3" style={{backgroundColor:darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)"}}>
          {nationality.map((city) => (
            <div
              className="city-item3"
              key={city._id}
              onClick={() => handleCitySelect(city)}
              style={{color: darkMode ? "#d8d8df" :  "#2C2C2E"}}
            >
              {city.nationality}
            </div>
          ))}
        </div>
      )} */}
            </div>
             {/* <div className='form-content-1'>
      <div className='cred-nat-container' onClick={toggleCityList}>
        <div className='cred-nat'>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: '#FF5F67',
            }}
          >
            Nationality
            <span style={{ marginLeft: 2 }}> *</span>
          </label>
        </div>
        <div className='cred-nat-img'>
          <img
            style={{ filter: darkMode ? "invert(0%)" : "invert(100%)" }}
            loading="lazy"
            src='/assets/Vector (3).png')}
            alt=""
          />
        </div>
      </div>

      <Select
        options={countries}
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="Select a nationality"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
            color: darkMode ? "#d8d8df" : "#2C2C2E",
            fontSize: 16,
          }),
          singleValue: (base) => ({
            ...base,
            color: darkMode ? "#d8d8df" : "#2C2C2E",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)",
          }),
          option: (base, { isFocused }) => ({
            ...base,
            color: darkMode ? "#d8d8df" : "#2C2C2E",
            backgroundColor: isFocused ? (darkMode ? "#333" : "#ddd") : undefined,
          }),
        }}
      />
    </div> */}
          </div>


          <div   className='form-right-container'>
 <div className='form-content-1'>
             <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Address
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
              <input type="text" 
              value={adress}
              onChange={(event) => setAdress(event.target.value)}
              className={darkMode ? "input-dark-mode" : "input-light-mode"}
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }}/>
            </div>
            <div className='form-content-1'>
             <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Phone Number
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
              <input type="text" 
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className={darkMode ? "input-dark-mode" : "input-light-mode"}
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }}/>
            </div>
            <div className='form-content-1'>
             <div className='cred-cer-container' onClick={toggleCityList1}>
              <div className='cred-cer'>
                <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Level of Certification
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
                </div>
              <div className='cred-cer-img'><img style={{filter:darkMode?"invert(0%)": "invert(100%)"}} loading="lazy" src='/assets/Vector (3).png' alt="" /></div>
             </div>
              <input type="text" 
                value={selectedCity1} 
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
        }}/>
        {isCityListVisible1 && (
        <div className="city-list3" style={{backgroundColor:darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)"}}>
          {levels?.map((city) => (
            <div
              className="city-item3"
              key={city._id}
              onClick={() => handleCitySelect1(city)}
              style={{color: darkMode ? "#d8d8df" :  "#2C2C2E"}}
            >
              {city.levelofcertify}
            </div>
          ))}
        </div>
      )}
            </div>
            {byt==="Bodsphere Yoga Teacher 500 (BYT 500)"?

            <div className='form-content-1'>
             <div className='cred-up-container'>
              <div className='cred-up'>
              <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Upload Certificates
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
                </div>
              {/* <div className='cred-up-img'>
              {index === pictures.length - 1 && pictures.length > 1 && (
          <img
            src='/assets/remove.png')}
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
                <img loading="lazy" 
              src='/assets/material-symbols_upload.png')} alt="" 
              style={{filter:darkMode?"invert(0%)": "invert(100%)" }}
              onClick={() => document.getElementById(`file-input-pictures-${index}`).click()}/>
              

              </div> */}
             </div>
              {/* <input  
              type="file" 
              accept=".png, .pdf, .jpeg" 
             //  ref={fileInputRef} 
             //  value={certificate.name} 
              onChange={(event) => handleImageInputChange(index, event)} 
              id={`file-input-pictures-${index}`} // Unique id for this loop
              style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
        }}/> */}
         <div className='cred-up-container' style={{marginTop:'2%',borderBottom:'1px solid #9A9996'}}>
          <div>
         Upload Bodsphere's 200-Hrs Certificate 
         <div  style={{marginBottom:'-2%',marginTop:'3%'}}>{bodCer1?.name}</div>
         </div>
          {/* <div className=''>
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
          <div className='cred-up-img'>
          <img loading="lazy" src='/assets/material-symbols_upload.png')} alt=""  
          onClick={() => fileInputRef3.current.click()} style={{filter:darkMode?"invert(0%)": "invert(100%)" }}/>
          </div>
          </div> */}

           <div className='' style={{display:'flex',flexDirection:'column'}}>
          <input
          type="file" 
          accept="image/*" 
          ref={fileInputRef3}           
          // value={certificate.name} 
          onChange={handleFileChange1}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          {/* {bodCer1?.name ?(
          <div style={{flexGrow: 1, marginRight: 10,whiteSpace:'nowrap'}}>{bodCer1?.name}</div>
        ):( */}
          <div className='cred-up-img' style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  
          onClick={() => fileInputRef3.current.click()} style={{filter:darkMode?"invert(0%)": "invert(100%)" }}/>
          </div>
          {/* )} */}
          </div>
        </div>
        <div className='cred-up-container' style={{marginTop:'2%'}}>
          <div>
                  Upload Bodsphere's 300-Hrs Certificate 
         <div style={{marginBottom:'-2%',marginTop:'3%'}}>{bodCer2?.name}</div>
         </div>
   
           {/* <div > */}
          <input
          type="file" 
          accept="image/*" 
          ref={fileInputRef4}           
          // value={certificate.name} 
          onChange={handleFileChange2}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
           {/* {bodCer2?.name ?(
          <div >{bodCer2?.name}</div>
        ):( */}
          <div className='cred-up-img'>
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  
          onClick={() => fileInputRef4.current.click()} style={{filter:darkMode?"invert(0%)": "invert(100%)" }}/>
          </div>
          {/* )} */}
          </div>
        </div>
            // </div>
:null}
            {/* {pictures.map((certificate, index) => (

            <div className='form-content-1'>
             <div className='cred-up-container'>
              <div className='cred-up'>
              <label style={{ display: "inline-flex", alignItems: "center" ,color:'#FF5F67'}}>
              Upload Certificates
              <span style={{ marginLeft: 2 }}> *</span>
            </label>
                </div>
              <div className='cred-up-img'>
              {index === pictures.length - 1 && pictures.length > 1 && (
          <img
            src='/assets/remove.png')}
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
                <img loading="lazy" 
              src='/assets/material-symbols_upload.png')} alt="" 
              style={{filter:darkMode?"invert(0%)": "invert(100%)" }}
              onClick={() => document.getElementById(`file-input-pictures-${index}`).click()}/>
              

              </div>
             </div>
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
                  <div>{certificate?.name?.name}</div>

            </div>
                    ))} */}
{pictures.map((certificate, index) => (
  byt !== "Bodsphere Yoga Teacher 500 (BYT 500)" && (
    <div className="form-content-1" key={index}>
      <div className="cred-up-container">
        <div className="cred-up">
          <label style={{ display: "inline-flex", alignItems: "center", color: "#FF5F67" }}>
            Upload Certificate <span style={{ marginLeft: 2 }}>*</span>
          </label>
        </div>
        <div className="cred-up-img">
          {index === pictures.length - 1 && pictures.length > 1 && (
            <img
              src="/assets/remove.png"
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
          <img
            loading="lazy"
            src="/assets/material-symbols_upload.png"
            alt="Upload"
            style={{ filter: darkMode ? "invert(0%)" : "invert(100%)" }}
            onClick={() => document.getElementById(`file-input-pictures-${index}`)?.click()}
          />
        </div>
      </div>
      <input
        type="file"
        accept=".png, .pdf, .jpeg"
        onChange={(event) => handleImageInputChange(index, event)}
        id={`file-input-pictures-${index}`}
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
        }}
      />
    <div>{certificate?.name?.name || certificate?.name?.fileName || certificate?.name?.toString()}</div>

    </div>
  )
))}

            <div className='cred-add' onClick={addAnotherField}>+Add Another</div>

          </div>
          </div>
          {/* <div className='bottom-form'>By clicking on submit, you understand and agree to Bodsphere <strong style={{color:'#ff5f67',cursor:'pointer'}} onClick={()=>navigate('/Privacy')}>Privacy Policy</strong>  and <strong style={{color:'#ff5f67',cursor:'pointer'}} onClick={()=>navigate('/Terms')}>Terms & Conditions</strong></div> */}
       
        </div>
        <div className="bottom-form">
      <p  style={{color:darkMode ? 'white':'black'}}>
        By clicking on submit, you understand and agree to Bodsphere's 
        <strong style={{color:'#ff5f67',cursor:'pointer'}} onClick={() => navigate('/Privacy')}> Privacy Policy</strong> and 
        <strong style={{color:'#ff5f67',cursor:'pointer'}} onClick={() => navigate('/Terms')}> Terms & Conditions</strong>.
      </p>

      <div style={{ display: "flex", alignItems: "center" }} className='new-bottom-agree'>
  <input
    type="radio"
    checked={termsAccepted}
    onChange={() => setTermsAccepted(!termsAccepted)}
  />
  <label className='new-new-lab'  style={{color:darkMode ? 'white':'black'}}>I agree to the Terms and Conditions and the Privacy Policy.</label>
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
        <div className='cred-sub-btn' onClick={applyTeacher}>Submit</div>

    </div>
    <Modal isOpen={createdModal} onClose={handleCreateModalclose}>
  <div className='cred-modal-main-container'>
    <div className='cred-tick'>
      <img src='/assets/Tick Circle.png' alt="" />
    </div>
    <div className='cred-modal-title'>Created Successfully</div>
    <div className='cred-modal-text'>Successfully created your bodsphere account. Currently we are reviewing your account.</div>
    <div className='cred-modal-btn' onClick={handleChangeCredential}>Done</div>
  </div>
</Modal>
    </>
  )
}
