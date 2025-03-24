import React, { useEffect, useRef, useState } from "react";
import "./EditProfile.css";
import { themeContext } from "../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL4002, API_URL4006, errorMessage, ImagePath, successMessage } from "../../Service/ApiService";
import { toast, Toaster } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/userSlice"; 
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";

export default function EditProfile() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  
  const [selectedImage, setSelectedImage] = useState("/assets/59.png");

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [selectedCity, setSelectedCity] = useState('');
  const [languages, setLanguages] = useState('');
  const [industry, setIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [prof, setProf] = useState('');
  const [image, setImage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [website, setwebsite] = useState('');
  const [Instagram, setInstagram] = useState('');
  const [Facebook, setFacebook] = useState('');
  const [Twitter, setTwitter] = useState('');
  const [Linkedin, setLinkedin] = useState('');
  const dispatch = useDispatch(); // Initialize useDispatch

  const userId=localStorage.getItem('user_id')
  const options = [
    { value: "af", label: "Afrikaans" },
  { value: "sq", label: "Albanian" },
  { value: "am", label: "Amharic" },
  { value: "ar", label: "Arabic" },
  { value: "hy", label: "Armenian" },
  { value: "az", label: "Azerbaijani" },
  { value: "eu", label: "Basque" },
  { value: "be", label: "Belarusian" },
  { value: "bn", label: "Bengali" },
  { value: "bs", label: "Bosnian" },
  { value: "bg", label: "Bulgarian" },
  { value: "ca", label: "Catalan" },
  { value: "ceb", label: "Cebuano" },
  { value: "zh", label: "Chinese" },
  { value: "co", label: "Corsican" },
  { value: "hr", label: "Croatian" },
  { value: "cs", label: "Czech" },
  { value: "da", label: "Danish" },
  { value: "nl", label: "Dutch" },
  { value: "en", label: "English" },
  { value: "eo", label: "Esperanto" },
  { value: "et", label: "Estonian" },
  { value: "fi", label: "Finnish" },
  { value: "fr", label: "French" },
  { value: "fy", label: "Frisian" },
  { value: "gl", label: "Galician" },
  { value: "ka", label: "Georgian" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "gu", label: "Gujarati" },
  { value: "ht", label: "Haitian Creole" },
  { value: "ha", label: "Hausa" },
  { value: "he", label: "Hebrew" },
  { value: "hi", label: "Hindi" },
  { value: "hu", label: "Hungarian" },
  { value: "is", label: "Icelandic" },
  { value: "id", label: "Indonesian" },
  { value: "ga", label: "Irish" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "jv", label: "Javanese" },
  { value: "kn", label: "Kannada" },
  { value: "kk", label: "Kazakh" },
  { value: "km", label: "Khmer" },
  { value: "ko", label: "Korean" },
  { value: "ku", label: "Kurdish" },
  { value: "ky", label: "Kyrgyz" },
  { value: "lo", label: "Lao" },
  { value: "la", label: "Latin" },
  { value: "lv", label: "Latvian" },
  { value: "lt", label: "Lithuanian" },
  { value: "lb", label: "Luxembourgish" },
  { value: "mk", label: "Macedonian" },
  { value: "mg", label: "Malagasy" },
  { value: "ms", label: "Malay" },
  { value: "ml", label: "Malayalam" },
  { value: "mt", label: "Maltese" },
  { value: "mi", label: "Maori" },
  { value: "mr", label: "Marathi" },
  { value: "mn", label: "Mongolian" },
  { value: "my", label: "Myanmar (Burmese)" },
  { value: "ne", label: "Nepali" },
  { value: "no", label: "Norwegian" },
  { value: "ny", label: "Nyanja" },
  { value: "ps", label: "Pashto" },
  { value: "fa", label: "Persian" },
  { value: "pl", label: "Polish" },
  { value: "pt", label: "Portuguese" },
  { value: "pa", label: "Punjabi" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "sm", label: "Samoan" },
  { value: "gd", label: "Scottish Gaelic" },
  { value: "sr", label: "Serbian" },
  { value: "st", label: "Sesotho" },
  { value: "sn", label: "Shona" },
  { value: "sd", label: "Sindhi" },
  { value: "si", label: "Sinhala" },
  { value: "sk", label: "Slovak" },
  { value: "sl", label: "Slovenian" },
  { value: "so", label: "Somali" },
  { value: "es", label: "Spanish" },
  { value: "su", label: "Sundanese" },
  { value: "sw", label: "Swahili" },
  { value: "sv", label: "Swedish" },
  { value: "tl", label: "Tagalog" },
  { value: "tg", label: "Tajik" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "th", label: "Thai" },
  { value: "tr", label: "Turkish" },
  { value: "uk", label: "Ukrainian" },
  { value: "ur", label: "Urdu" },
  { value: "uz", label: "Uzbek" },
  { value: "vi", label: "Vietnamese" },
  { value: "cy", label: "Welsh" },
  { value: "xh", label: "Xhosa" },
  { value: "yi", label: "Yiddish" },
  { value: "yo", label: "Yoruba" },
  { value: "zu", label: "Zulu" },
  ];

  const validateForm = () => {
    let isValid = true;
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/;

    if (website && !urlPattern.test(website)) {
      errorMessage("Enter a valid Website URL");
      isValid = false;
    }
    if (Instagram && !/^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+$/.test(Instagram)) {
      errorMessage("Enter a valid Instagram URL");
      isValid = false;
    }
    if (Facebook && !/^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_.]+$/.test(Facebook)) {
      errorMessage("Enter a valid Facebook URL");
      isValid = false;
    }
    if (Twitter && !/^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_.]+$/.test(Twitter)) {
      errorMessage("Enter a valid Twitter URL");
      isValid = false;
    }
    if (Linkedin && !/^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_.-]+$/.test(Linkedin)) {
      errorMessage("Enter a valid LinkedIn URL");
      isValid = false;
    }

    return isValid;
  };

  const updateProfile = () => {
    if (userId) {
      dispatch(fetchUserProfile());
    }
  };
  
  const handleChange = (selectedOption) => {
    console.log("Selected Language:", selectedOption);
    setLanguages(selectedOption)
  };
  console.log("d Language:", languages);

  const handleCalenderClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Handle date selection and close date picker
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setDob(date.toDateString()); // Optional: Set the DOB in the input
    setShowDatePicker(false); // Close the date picker after selection
  };
  const fileInputRef = useRef(null);

  useEffect(() => {
    getUserProfile();
  }, []);


  const navigate= useNavigate();
  const handleBack=()=>{
    navigate(-1)
  }

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    const imageUrl = URL.createObjectURL(file);
    
    updateImage(file)
  };

  const updateImage = async (image) => {
    
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    var formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("image", image);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(API_URL4006 + "updateProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status == true) {
          getUserProfile()
          updateProfile();

          console.log(result)
          successMessage(result.message)

        }
        else {
          console.log(result)
          errorMessage(result?.message)
        }

      })
      .catch(error => { 
        console.log('error', error);
        errorMessage(error?.message)
       });
  }


  const getUserProfile = async () => {
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

    fetch(API_URL4002 + "getUserProfile", requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log('123',result)       
        setEmail(result?.userdata?.email)
        setName(result?.userdata?.name)
        setDob(result?.userdata?.DOB)
        setSelectedCity(result?.userdata?.city)
        setIndustry(result?.userdata?.industry)
        setLanguages(result?.userdata?.language)
        setProf(result?.userdata?.profession)
        setImage(result.userdata.profile_img)
        setwebsite(result.userdata.website)
        setInstagram(result.userdata.Instagram)
        setFacebook(result.userdata.Facebook)
        setTwitter(result.userdata.Twitter)
        setLinkedin(result.userdata.Linkedin)
      })
      .catch(error => console.log('error', error));
  }

  const updateSocailLinks = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "website": website,
      "Instagram": Instagram,
      "Facebook": Facebook,
      "Twitter": Twitter,
      "Linkedin": Linkedin
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4006 + "userMediaDetails", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.Status === true) {
          // setModalMessage(result.message)
          // setCommonModal(true)

        }
      })
      .catch(error => console.log('error', error));
  }



  const basicDetails = async () => {
     const token= localStorage.getItem('accessToken')
    // const date1 = formatDate(dob1)
// validateForm();
    setIsLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    var raw = JSON.stringify({
      "name": name,
      "email": email,
      "city": selectedCity,
      "industry": industry,
      "profession": prof,
      "language": languages,
      "DOB": dob
    });


    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4006 + "userBasicDetails", requestOptions)
      .then(response => response.json())
      .then(async result => {
        console.log(result)
        if (result.Status === true) {
          successMessage(result.message)
          updateProfile();
          console.log(result);
          updateSocailLinks();
        } else {
          setIsLoading(false)
          errorMessage(result?.message)

        }
      })
      .catch(error => {console.log('error', error)
        errorMessage(error?.message)

      });
  }


  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      
      <div
        className={`edit-profile-main-container ${
          darkMode ? "backgrond-black" : "background-white"
        }`}
        // style={{backgroundColor:darkMode ? "#1C1C1E" : " #f4f1f3"}}
      >

        <div>
          <div className="edit-profile-flex-start">
            <div className="left-arrow-main"
            onClick={handleBack}
             style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df"}}>
              <div className="edit-profile-left-arrow">
                <img src="/assets/rightwel.png" alt="" />
              </div>
            </div>
            <div className="edit-profile-title">Edit profile</div>
          </div>

          <div className="edit-profile-containers-holder" >
            <div className="Edit-profile-info-container-1" style={{backgroundColor:darkMode ? " #2C2C2E" : "rgba(236, 236, 236, 1)"}}>
              <div className="info-container-1">
                <div className="info-content-title-1">Basic Details</div>
                {/* <div className="info-content-img-1">
                  <img src="/assets/Vector (3).png")} styalt="" />
                </div> */}
              </div>
              <div className="info-container-2">
                <div className="info-content-title-2" style={{color:'#FF5F67'}}>Profile Picture</div>
                <div className="profile-edit-img-container">
                  <div className="info-content-img-2">
                  <img 
        // src={selectedImage}
        src={image ? `${ImagePath}${image}` : selectedImage}
 
        alt="Selected" 
        onClick={handleImageClick} 
        style={{ cursor: 'pointer' }}
      />
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        style={{ display: 'none' }}
      />
                  
                    </div>
                  <div className="profile-pic-icon">
                    <div className="inside-icon">
                      <img src="/assets/Camera.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="info-container-3">
                <div className="info-content-title-3" style={{color:'#FF5F67'}} >About Me</div>
                <input type="text" placeholder=''   style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
              </div> */}
            </div>

            <div>
              <div>
                <div className="Edit-profile-info-container-2" style={{backgroundColor:darkMode ? " #2C2C2E" : "rgba(236, 236, 236, 1)"}}>
                  <div className="info-container-about-1">
                    <div className="info-about-title-1">About</div>
                    {/* <div className="info-about-img-1">
                      <img
                        src="/assets/Vector (3).png")}
                        styalt=""
                      />
                    </div> */}
                  </div>

                  <div className="about-name-container">
                    <div className="about-name-top">Name</div>
                    <div className="about-name">
                  <input type="text" placeholder='' value={name} onChange={(event) => setName(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                    </div>
                  </div>
                  <div className="about-email-container">
                    <div className="about-email-top">Email</div>
                    <div className="about-email">
                  <input type="email" placeholder='' value={email}   style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                      
                    </div>
                  </div>

                  <div className="profile-dob-container">
      <div className="about-dob-container">
        <div className="about-dob-top">Date of Birth</div>
        <div className="about-dob">
          {/* Input field, always visible */}
          <input
            type="text"
            placeholder={selectedDate ? selectedDate.toDateString() : 'Select Your Date of Birth'}
            value={dob}
            onChange={(event) => setDob(event.target.value)}
            readOnly
            style={{
              backgroundColor:"transparent",
              color: darkMode ? "#d8d8df" : "#2C2C2E",
            }}
          />
        </div>
      </div>

      {/* Only show the calendar icon when the date picker is hidden */}
      {!showDatePicker && (
        <div className="dob-icon">
          <img
            src="/assets/Vector (4).png"
            alt="Click to show date picker"
            onClick={handleCalenderClick}
            style={{ cursor: "pointer" ,filter:darkMode?'invert(0%)':'invert(100%)'}}
          />
        </div>
      )}

      {/* Conditionally render the date picker */}
      {showDatePicker && (
        <div className="date-pick">
        {/* <DatePicker
          selected={selectedDate}
          onChange={handleDateSelect} // Close after date is selected
          dateFormat="MMMM d, yyyy"
          inline
        /> */}
         <Calendar maxDate={new Date()} onChange={handleDateSelect} value={selectedDate} />
        </div>
      )}
    </div>

                  <div className="profile-city-container">
                    <div className="about-city-container">
                      <div className="about-city-top">City</div>
                      <div className="about-city">
                  <input type="text" placeholder='' value={selectedCity} onChange={(event) => setSelectedCity(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                        
                      </div>
                    </div>
                    {/* <div className="city-icon">
                      <img
                        src="/assets/Vector (3).png")}
                        alt=""
                      />
                    </div> */}
                  </div>

                  <div className="profile-industry-container">
                    <div className="about-industry-container">
                      <div className="about-industry-top">Industry</div>
                      <div className="about-industry">                
                          <input type="text" placeholder='' value={industry} onChange={(event) => setIndustry(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                      </div>
                    </div>
                    {/* <div className="industry-icon">
                      <img
                        src="/assets/Vector (3).png")}
                        alt=""
                      />
                    </div> */}
                  </div>

                  <div className="profile-sl-container">
                    <div className="about-sl-container">
                      <div className="about-sl-top">Spoken Language</div>
                      <div className="about-sl">
                  {/* <input type="text" placeholder='' value={languages} onChange={(event) => setLanguages(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/> */}
                  <Select placeholder="Select a Language" 
                   options={options} onChange={handleChange} value={languages}/>
                      </div>
                    </div>
                    {/* <div className="sl-icon">
                      <img
                        src="/assets/Vector (3).png")}
                        alt=""
                      />
                    </div> */}
                  </div>

                  <div className="profile-mp-container">
                    <div className="about-mp-container">
                      <div className="about-mp-top">My Profession</div>
                      <div className="about-mp">
                  <input type="text" placeholder='' value={prof} onChange={(event) => setProf(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                        
                      </div>
                    </div>
                    {/* <div className="mp-icon">
                      <img
                        src="/assets/Vector (3).png")}
                        alt=""
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="Edit-profile-info-container-3" style={{backgroundColor:darkMode ? " #2C2C2E" : "rgba(236, 236, 236, 1)"}}>
                <div className="info-container-media-1">
                  <div className="info-media-title-1">Social Media Links</div>
                  {/* <div className="info-media-img-1">
                    <img
                      src="/assets/Vector (3).png")}
                      styalt=""
                    />
                  </div> */}
                </div>
                <div className="media-website-container">
                  <div className="media-website-top">Website</div>
                  <div className="website-name">
                  <input type="url" placeholder='' value={website} onChange={(event) => setwebsite(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                    
                  </div>
                </div>
                <div className="media-insta-container">
                  <div className="media-insta-top">Instagram</div>
                  <div className="insta-name">
                  <input type="text" placeholder='' value={Instagram} onChange={(event) => setInstagram(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                    
                  </div>
                </div>
                <div className="media-fb-container">
                  <div className="media-fb-top">Facebook</div>
                  <div className="fb-name">
                  <input type="text" placeholder='' value={Facebook} onChange={(event) => setFacebook(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                    
                  </div>
                </div>
                <div className="media-twitter-container">
                  <div className="media-twitter-top">Twitter</div>
                  <div className="twitter-name">
                  <input type="text" placeholder='' value={Twitter} onChange={(event) => setTwitter(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                    
                  </div>
                </div>
                <div className="media-linkdin-container">
                  <div className="media-linkdin-top">Linkedin</div>
                  <div className="linkdin-name">
                  <input type="text" placeholder='' value={Linkedin} onChange={(event) => setLinkedin(event.target.value)} style={{backgroundColor:"transparent",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="edit-btn-profile" onClick={basicDetails}>Save</div>
          </div>
        </div>
      </div>
    </>
  );
}
