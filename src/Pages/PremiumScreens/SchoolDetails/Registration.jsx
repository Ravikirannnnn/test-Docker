import React, { useEffect } from 'react'
import './Registration.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { useState } from 'react';
import { AccreditedImagePath, API_URL4001, API_URL4010, errorMessage, ImagePath, successMessage } from '../../../Service/ApiService';
import { toast, Toaster } from 'react-hot-toast';


export default function Registration() {
  const [images, setImages] = useState([]);

  const [uploadCertificate,setUploadCertificate] = useState('')

  const getPictures = async () =>{
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

    fetch(API_URL4010 +"get_SchoolProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status == true){
          console.log(result.response[0].levelofregistration)
          setImages(result.response[0].levelofregistration)
        }
        else{
          console.log(result)
        }
      })
      .catch(error => console.log('error', error));
  }

  let addPic = false;

  const addPictures = async (formData) => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');
  
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
  
    formData.append("user_id", user_id);
  
    const requestOptions = {
      method: 'POST',
      body: formData,
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch(API_URL4010 + "editschllevels", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        
        if (result.status === true) {
          const imagesArray = result.response.levelofregistration;
          const lastImage = imagesArray[imagesArray.length - 1];
          setImages(prevImages => [...prevImages, lastImage]);
          successMessage(result.message);
          // getPictures()
        } else {
          errorMessage(result.message);
        }
      })
      .catch(error => {
        console.log('error', error);
        errorMessage("Network Error! Please try again.");
      });
  };

  useEffect(() => {
    getPictures();
  }, []);


  const deleteImage = async (imageUri) => {
    console.log(imageUri);
    
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "levelofregistration": imageUri
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4010+"editschllevels", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.status == true){
          // ToastAndroid.show("Updated successfully..!!", ToastAndroid.SHORT);
          successMessage("Updated successfully..!!")
          getPictures()
        }
        else{
          console.log(result)
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        errorMessage("Network Error! Please try again.")
      });
  };

  

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImages = files.map(file => URL.createObjectURL(file));
  //   setImages(prevImages => [...prevImages, ...newImages]);
  // };
  const handleImageChange = async (event) => {
    const files = event.target.files;
    console.log(files);
    
    if (files.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("clsnAndtringImages", files[i]);
      }
  
      await addPictures(formData);  // Pass the formData to addPictures
    }
  };
  

  const handleRemoveImage = (image) => {
    setImages(images.filter(img => img !== image));
  };
  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
    
    <div>
      <PageTitle  title={'Level of Registration'}/>
    </div>
    <div className='overall-lvl-rg'>
       <div className='lvl-rg-content'>
        Upload Pictures
        <div className='inside-lvl-rg'>
          <input type="file" 
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{display:'none'}}
          id={`file-input-pictures`}
          />
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  onClick={() => document.getElementById(`file-input-pictures`).click()}/>
        </div>
        
       </div>
       <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        {images.map((image, index) => (
          <div key={index} style={{ position: 'relative', margin: '10px' }}>
            
            <img
            loading="lazy"
              src={AccreditedImagePath + image}
              alt={`uploaded ${index}`}
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <button
              onClick={() => deleteImage(image)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              <img loading="lazy" src='/assets/material-symbols_delete-outline.png' alt="" style={{width:'12px',height:'12px'}}/>
            </button>
          </div>
        ))}
      </div>
    </div>
    
    </>
  )
}
