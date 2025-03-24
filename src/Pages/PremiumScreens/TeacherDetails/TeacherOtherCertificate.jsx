import React, { useContext, useEffect, useState } from 'react'
import './TeacherOtherCertificate.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../../Context';
import { API_URL4009, errorMessage, successMessage } from '../../../Service/ApiService';
import { Toaster } from 'react-hot-toast';

export default function TeacherOtherCertificte() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [pictures1, setPictures1] = useState([{ name: '' }]);
  const [certificates, setCertificates] = useState([]);
  const [totalCertificates, setTotalCertificates] = useState(0);


  const handleImageInputChange1 = (index, event) => {
    const updatedFields = [...pictures1];
    updatedFields[index] = { ...updatedFields[index], name: event?.target?.files?.[0] }; 
    setPictures1(updatedFields);  
  };
  
  const addAnotherField1 = () => {
    setPictures1([...pictures1, { name: '' }]);
  };

  useEffect(() => {
    getOtherCertificates();
  }, [])

  const getOtherCertificates = async () => {
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

    fetch(API_URL4009 + "getCerticates", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('getCerticates:', result.response);
        if (result.status == true) {
          setCertificates(result.response);
          setTotalCertificates(result.response.length)
        }
      })
      .catch(error => console.log('error', error));
  }

  const addCertificate = async () => {

    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    if (pictures1?.some((file) => file?.name !== '')) {
      // Create FormData object
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      const formdata = new FormData();
      
      pictures1.forEach((file, index) => {
        // console.log(file.name.name);
        formdata.append(`Critificates`, file.name); 
      });
      
      formdata.append('user_id', user_id)

      // console.log('formdata', formdata);

      // Make API call
      fetch(API_URL4009 + "addCerticates", {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      })
        .then(response => response.json())
        .then(result => {
          console.log("addCerticates", result);
          if (result.status == true) {
            // ToastAndroid.show('Certificate Added Successfully', ToastAndroid.SHORT);
            successMessage('Certificate Added Successfully')
            getOtherCertificates();
            setPictures1([{ name: '' }]);
          }
          else {
            // setIsLoading(false);
            // ToastAndroid.show(result.message, ToastAndroid.SHORT);
            errorMessage(result.message)
          }
        })
        .catch(error => {
          console.log('error', error);
          // console.log('addCretificates', addCretificates);
          errorMessage('Network error! Please try again.')
        });
    }
    else {
      // ToastAndroid.show('Please pick one or more certificate', ToastAndroid.SHORT);
      errorMessage('Please pick one or more certificate')
    }
  }

  const deleteCertificate = async (certId) => {
    console.log(certId);
    
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "_id": certId
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4009 + "deleteCerticates", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('deleteCerticates', result);
        if (result.status == true) {
          const updatedCertificates = certificates.filter(item => item._id !== certId);
          setCertificates(updatedCertificates);
          setTotalCertificates(totalCertificates - 1);
          // ToastAndroid.show('Certificate Deleted', ToastAndroid.SHORT);
          successMessage('Certificate Deleted')
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        // ToastAndroid.show('Network Error! Please try again.', ToastAndroid.SHORT);
        errorMessage('Network Error! Please try again.')
        // setIsLoading(false);
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
      <PageTitle title={'Other Certificates'}/>
      </div>
      <div>
      <div className='oc-form-container'> 
      {certificates.map((manual, index) => (
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <div className='ment-red-text1' key={index}>
      Certificate {index + 1}
    </div>
    <img loading="lazy" src='/assets/material-symbols_delete-outline.png' alt="" style={{width:'25px',height:'25px',marginTop:'3%',cursor:'pointer'}} onClick={()=>deleteCertificate(manual._id)}/>
    </div>

    ))}

          
      {pictures1.map((certificate, index) => (
        <div className='sd-in3' key={index}>
         Upload pictures
          <div className='in-inside-img-upload3'>
          <input 
          type="file" 
          accept="image/*" 
          // ref={fileInputRef1}           
          // value={certificate.name} 
          onChange={(event) => handleImageInputChange1(index, event)} 
          id={`file-input-pictures1-${index}`}
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          <div>{certificate?.name?.name}</div>
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt=""  onClick={() => document.getElementById(`file-input-pictures1-${index}`).click()}/>
          </div>
        </div>
        ))}
        <div style={{display:'flex',justifyContent:'space-between'}}>
    <div className='ment-btn2' onClick={addAnotherField1}>+ Add Another</div>
    <div className='ment-btn2' onClick={addCertificate}>Submit</div>
    </div>

        </div>
      </div>
      </>
  )
}
