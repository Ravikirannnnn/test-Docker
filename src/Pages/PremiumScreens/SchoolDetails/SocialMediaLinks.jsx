import React, { useEffect } from 'react'
import './SocialMediaLinks.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from "../../../Context";
import { useContext, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import { API_URL4010, errorMessage, successMessage } from '../../../Service/ApiService';

export default function SocialMediaLinks() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [insta, setInsta] = useState('')
  const [facebook, setFacebook] = useState('')
  const [twitter, setTwitter] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSchoolLinks();
  }, []);

  const getSchoolLinks = async () => {
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
        setInsta(result.response[0].social_medialink.instagram)
        setFacebook(result.response[0].social_medialink.facebook)
        setTwitter(result.response[0].social_medialink.twitter)
        setLinkedIn(result.response[0].social_medialink.linkedIn)

      })
      .catch(error => console.log('error', error));
  }

  const UpdateSchoolLinks = async () => {
    // setIsLoading(true)
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "instagram": insta,
      "facebook": facebook,
      "twitter": twitter,
      "linkedIn": linkedIn
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4010 + "editschlsociallinks", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === true) {
          // setIsLoading(false)
          // ToastAndroid.show("Updated successfully..!!", ToastAndroid.SHORT);
          // navigation.replace('SchoolProfile')
          successMessage("Updated successfully..!!")
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
      <PageTitle title={'Social Media Links'}/>
    </div>
    <div className='overall-link'>
      <div className='link-content'>
        Instagram
        <input 
        type="text" 
        value={insta}
        onChange={(event) => setInsta(event.target.value)}
        style={{
          backgroundColor: darkMode ? "#1C1C1E" : " white",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E"
        }}/>
      </div>
      <div className='link-content'>
        Facebook
        <input type="text"
        value={facebook}
        onChange={(event) => setFacebook(event.target.value)}
        style={{
          backgroundColor: darkMode ? "#1C1C1E" : " white",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E"
        }}/>
      </div>
      <div className='link-content'>
        Twitter
        {/* <div className='inside-link'> */}
        <input type="text" 
        value={twitter}
        onChange={(event) => setTwitter(event.target.value)}
        style={{
          backgroundColor: darkMode ? "#1C1C1E" : " white",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E"
        }}/>
        {/* <img loading="lazy" src={require('../../../Assets/Vector (3).png')} alt="" /> */}
        {/* </div> */}
      </div>
      <div className='link-content'>
        LinkedIn
        <input type="text"
        value={linkedIn}
        onChange={(event) => setLinkedIn(event.target.value)}
        style={{
          backgroundColor: darkMode ? "#1C1C1E" : " white",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E"
        }}/>
      </div>
      <div className='link-btn' onClick={UpdateSchoolLinks}>Save</div>
    </div>
    </>
  )
}
