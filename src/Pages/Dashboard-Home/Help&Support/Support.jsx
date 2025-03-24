import React, { useState } from 'react'
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Support.css'
import { API_URL4007, errorMessage, successMessage } from '../../../Service/ApiService';
import { toast, Toaster } from 'react-hot-toast';
import PageTitle from '../../../Components/Loader/Other/PageTitle';

  
export default function Support() {
  
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [connect,setConnect]=useState('')
  const navigate=useNavigate();
  const handleBack=()=>{
    navigate(-1)
  }

  const validateEmail = (email) => {
    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const uploadSupport = async() =>{
    const token= localStorage.getItem('accessToken')
    const user_id=localStorage.getItem('user_id')

    if (!validateEmail(email)) {
      const msg = 'Invalid email format. Please enter a valid email address.';
      errorMessage(msg)
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    var raw = JSON.stringify({
      "user_id": user_id
      ,
      "Name": name,
      "Email": email,
      "Description": description,
       "aboutToConnect": "connectNow"
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4007+"addSupport", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status === true){
          console.log(result)
          successMessage('Thanks for submitting your message. We will get back to you shortly! ')
          setDescription('')
          setEmail('')
          setConnect('')
          setName('')
        }
        else{
          console.log(result)
          if(result.message == 'please provide proper details'){
            errorMessage(result.message)
          }
        }
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div className='support-main-container'>
            <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
           {/* <div className="edit-profile-flex-start-008">
            <div className="left-arrow-main-008"
            onClick={handleBack}
             style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df"}}>
              <div className="edit-profile-left-arrow-008">
                <img src={require("../../../Assets/rightwel.png")} alt="" />
              </div>
            </div>
            <div className="edit-profile-title-008">Help & Support</div>
          </div> */}
          <div className='hel-tit'>
            <PageTitle title={'Help & Support'}/>
          </div>

          <div className='support-contents-holder' style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df"}}>
              <div className='content-title-container'>
                <div className='content-title'>Details</div>
                {/* <div className='title-icon'>
                  <img src={require('../../../Assets/Vector (3).png')} alt="" />
                </div> */}
              </div>

              <div>
              <div className='support-content-1'>
                <div className='support-top-text-1'>Name</div>
                <div className='support-down-text-1'>
                <input type="text" placeholder='' value={name} onChange={(event) => setName(event.target.value)} style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                  
                </div>
              </div>
              <div className='support-content-3'>
                <div className='support-top-text-2'>Email</div>
                <div className='support-down-text-2'>
                <input type="text" placeholder='' value={email} onChange={(event) => setEmail(event.target.value)} style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                </div>
              </div>
              <div className='support-content-3'>
                <div className='support-top-text-3'>Description</div>
                <div className='support-down-text-3'>
                  <input type="text" placeholder='' value={description} onChange={(event) => setDescription(event.target.value)} style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                </div>
              </div>
              {/* <div className='support-content-3'>
                <div className='support-top-text-3'>About to Connect</div>
                <div className='support-down-text-3'>
                  <input type="text" placeholder='' value={connect} onChange={(event) => setConnect(event.target.value)} style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df",color: darkMode ? "#d8d8df" :  "#2C2C2E"}}/>
                </div>
              </div> */}
              </div>
          </div>

          <div className='note-supp'>
          Note: Once you submit your query, we will reach out to you via email, if required, and you'll also receive a notification in your account when your case is resolved.
          </div>
          <div className="submit-btn-support" onClick={uploadSupport}>Submit</div>

          
    </div>
  )
}
