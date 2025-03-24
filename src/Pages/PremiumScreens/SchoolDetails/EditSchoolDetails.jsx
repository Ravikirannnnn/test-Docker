import React, { useContext, useEffect, useState } from 'react'
import './EditSchoolDetails.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { API_URL4009, API_URL4010 ,errorMessage, successMessage} from '../../../Service/ApiService'
import { themeContext } from '../../../Context'
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'


export default function EditSchoolDetails() {
  const navigate=useNavigate();

  const [schoolName, setSchoolName] = useState('')
  const [adress, setAdress] = useState('')
  const [isCityListVisible, setCityListVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [link, setWebsiteLink] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [nationality, setNationality] = useState([]);


  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const toggleCityList = () => {
    setCityListVisible(!isCityListVisible);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city.nationality);
    setCityListVisible(false);
  };

  useEffect(() => {
    getSchoolDetails();
    getNationality();
  }, []);

  const getNationality = async() => {
    const token= localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(API_URL4009 + "getnationality", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setNationality(result?.response)
      })
      .catch(error => console.log('error', error));
  }

  const getSchoolDetails = async () => {
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

    fetch(API_URL4010 + "get_SchoolProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setSchoolName(result.response[0].school_name)
        setAdress(result.response[0].address)
        setSelectedCity(result.response[0].country)
        setSchoolEmail(result.response[0].school_email)
        setPhoneNumber(result.response[0].phone_no)
        setWebsiteLink(result.response[0].webSite_link)
      })
      .catch(error => console.log('error', error));
  }

  const UpdateSchoolDetails = async () => {
    // setIsLoading(true)
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "school_name": schoolName,
      "address": adress,
      "country": selectedCity,
      "school_email": schoolEmail,
      "phone_no": phoneNumber,
      "webSite_link": link
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4010 + "editSchool", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === true) {
          // setIsLoading(false)
          // ToastAndroid.show("Updated successfully..!!", ToastAndroid.SHORT);
          // navigation.replace('SchoolProfile')
          successMessage("Updated successfully..!!")
          // navigate(-1)
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)

        }
      })
      .catch(error => {
        console.log('error', error)
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        errorMessage("Network Error! Please try again.")

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
    
    <div>
      <PageTitle title={'Edit School Details'}/>
    </div>
    <div className='overall-ed-sc'>
      {/* <div className='ed-sc-title'>School - BYT -200</div> */}
      <div className='ed-sc-subtext'>School Details</div>
      <div className='ed-sc-content-01'>
        <h3>School Name</h3>
        {/* <h4>Bodsphere</h4> */}
        <input type="text" 
          value={schoolName}
          onChange={(event) => setSchoolName(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>

      </div>
      <div className='ed-sc-content-01'>
        <h3>Address</h3>
        {/* <h4>Hiyaak Systems</h4> */}
        <input type="text" 
          value={adress}
          onChange={(event) => setAdress(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>

      </div>
      <div className='ed-sc-content-01'>
        <h3>Country</h3>
        <div className='ed-sc-inside-img' onClick={toggleCityList}>
        <input type="text" 
          value={selectedCity}
          // onChange={(event) => setSchoolName(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>

          <img loading="lazy" src='/assets/Vector (3).png' alt="" />
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
      )}

      </div>
      <div className='ed-sc-content-01'>
        <h3>School Email</h3>
        {/* <h4>hiyaak@gmail.com</h4> */}
        <input type="text" 
          value={schoolEmail}
          onChange={(event) => setSchoolEmail(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>

      </div>
      <div className='ed-sc-content-01'>
        <h3>Phone Number</h3>
        {/* <h4>999999999</h4> */}
        <input type="text" 
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>

      </div>
      <div className='ed-sc-content-01'>
        <h3>Website Link</h3>
        {/* <h4>www.hiyaksystems.com</h4> */}
        <input type="text" 
          value={link}
          onChange={(event) => setWebsiteLink(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>

      </div>
      <div className='ed-sc-main-btn' onClick={UpdateSchoolDetails}>Update</div>
    </div>
    </>
  )
}
