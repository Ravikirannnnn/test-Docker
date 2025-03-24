import React, { useContext, useEffect, useState } from 'react'
import './TeacherLanguages.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { API_URL4009, API_URL4010, errorMessage, successMessage } from '../../../Service/ApiService';
import { themeContext } from '../../../Context';
import { Toaster } from 'react-hot-toast';
export default function TeacherLanguages() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [isLanguageListVisible, setLanguageListVisible] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [languages, setlanguages] = useState([
    { id: 1, name: 'Kannada' },
    { id: 2, name: 'Hindi' },
    { id: 3, name: 'English' },
    { id: 4, name: 'Marathi' },
    { id: 5, name: 'Gujarati' },
    { id: 6, name: 'Telugu' },
    { id: 7, name: 'Punjabi' },
    { id: 8, name: 'Bengali' },
    { id: 9, name: 'Tamil' },
    // Add your languages and IDs here
  ]);


  useEffect(() => {
    getSchoolDetails();
  }, [])

  const getSchoolDetails = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");
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

    fetch(API_URL4009 + "get_TeacherProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setSelectedLanguages(result.response[0].language)

      })
      .catch(error => console.log('error', error));
  }

  const addLangTeaching = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "language": selectedLanguages,
    });

    console.log(raw);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "teacher_language", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === true) {
          // ToastAndroid.show("Added successfully..!!", ToastAndroid.SHORT);
          // navigation.replace('TeacherProfile')
          successMessage("Added successfully..!!")
        } else {
          // setIsLoading(false)
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        // setIsLoading(false)
        // console.log('error', error)
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        errorMessage("Network Error! Please try again.")
      });
  }


  const handleStyleSelect = (city) => {
    setSelectedLanguages(city.name)
    setLanguageListVisible(false);
  };

  const toggleStyleList = () => {
    setLanguageListVisible(!isLanguageListVisible);
  };

  const handleLanguageSelect = (language) => {
    console.log("Selected language:", language);
    const isSelected = selectedLanguages.includes(language.name);
  
    // Add or remove the selected language
    if (isSelected) {
      const updatedLanguages = selectedLanguages.filter(
        (lang) => lang !== language.name
      );
      setSelectedLanguages(updatedLanguages);
    } else {
      setSelectedLanguages([...selectedLanguages, language.name]);
    }
  };
  

  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: "#222122", color: "#fff" },
        }}
        reverseOrder={true}
      />

    <div>
      <PageTitle title={'Languages'}/>
    </div>
    <div className='overall-edit-language-vt'>

    <div className='languages' onClick={toggleStyleList}>
  {/* Display comma-separated selected languages or 'Languages' if none are selected */}
  {selectedLanguages.length > 0 ? selectedLanguages.join(', ') : 'Languages'}
  <img loading="lazy" src='/assets/Vector (3).png' alt="" />
</div>

{isLanguageListVisible && (
  <div 
    className="city-list1" 
    style={{ backgroundColor: darkMode ? "#1E1E1F" : "rgba(180, 180, 180, 1)" }}
  >
    {languages?.map((city) => (
      <div
        className="city-item1"
        key={city.id}
        onClick={() => handleLanguageSelect(city)} // Keep this as `handleLanguageSelect`
        style={{ color: darkMode ? "#d8d8df" : "#2C2C2E" }}
      >
        {city.name}
        {/* Optionally, show an indicator for selected languages */}
        {selectedLanguages.includes(city.name)}
      </div>
    ))}
  </div>
)}

    <div className='language-btn-vt' onClick={addLangTeaching}>save</div>
    </div>

    </>
  )
}
