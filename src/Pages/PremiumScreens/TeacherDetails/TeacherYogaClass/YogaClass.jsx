import React, { useEffect, useState } from 'react'
import "./YogaClass.css"
import PageTitle from '../../../../Components/Loader/Other/PageTitle';
import Switch from "react-switch";
import { FormControlLabel } from '@material-ui/core';
import { API_URL4009, API_URL4010, errorMessage, successMessage } from '../../../../Service/ApiService';
import { Toaster } from 'react-hot-toast';

export default function YogaClass() {
  const [online, setOnline] = useState(true);
  const [offline, setOffline] = useState(true);


  useEffect(() => {
    getSchoolProfile();
  }, []);


  const getSchoolProfile = async() => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    // console.log(user_id)
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

    fetch(API_URL4010 +"get_SchoolProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("get_SchoolProfile",result)
        if (result.status == true) {
         setOffline(result?.response[0]?.OffersOffline)
         setOnline(result?.response[0]?.OffersOnline)
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleOfferOnline = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    var raw = JSON.stringify({
      "user_id": user_id,
      "isSchool": true
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "Offers_Online", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("Offers_Online", result)
        if (result.status == true) {
          setOnline(result.response?.OffersOnline);
          // dispatch(addSchoolData(result.response));
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          successMessage(result.message)
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error);
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        errorMessage("Network Error! Please try again.")
      });
  }

  const handleOfferOffline = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "isSchool": true
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "Offers_Offline", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("Offers_Offline", result)
        if (result.status == true) {
          setOffline(result.response?.OffersOffline);
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          successMessage(result.message)
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          successMessage(result.message)
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
      <PageTitle title={'Online Yoga Classes'}/>
    </div>
    <div className='overall-yoga-cls'>
        <div className='online-cls'>
          Online Classes
          <FormControlLabel 
                  control={<Switch 
                    checked={online} onChange={()=>handleOfferOnline()} 
                    />}  
                /> 
        </div>
        <div className='online-cls'>
          Offline Classes
          <FormControlLabel
                  control={<Switch 
                    checked={offline} onChange={()=>handleOfferOffline()} 
                    />}  
                /> 
        </div>
    </div>
    
    </>
  )
}
