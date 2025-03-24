import React, { useContext, useEffect, useState } from 'react'
import './Documentation.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../../Context';
import { AccreditedImagePath, API_URL4010, errorMessage, successMessage } from '../../../Service/ApiService';
import { Toaster } from 'react-hot-toast';

export default function Documentation() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [pictures1, setPictures1] = useState([{ name: '' }]);
  const [pictures, setPictures] = useState([{ name: '' }]);
  const [logo, setLogo] = useState('');
  const [trainingManual , setTrainingManual] = useState([])

  const handleImageInputChange = (index, event) => {
    const updatedFields = [...pictures];
    updatedFields[index] = { ...updatedFields[index], name: event?.target?.files?.[0] }; 
    // console.log('567',event?.target?.files?.[0]);
    const image = event?.target?.files?.[0]
    addSchoolLogo(image);
    setPictures(updatedFields);  
  };

  const addSchoolLogo = async (image) => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    var formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("logo_school",
      image
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(API_URL4010+"editdoculogo", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('editdoculogo',result);
        if (result.status == true) {
          // ToastAndroid.show('Logo added  successfully!', ToastAndroid.SHORT);
          console.log('editdoculogo', result.response?.logo_school);
          setLogo(result.response?.logo_school);
          successMessage('Logo added  successfully!')
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error);
        // ToastAndroid.show('Network error! Please try again.', ToastAndroid.SHORT);
        errorMessage('Network error! Please try again.')
      });
  }

  
  const handleImageInputChange1 = (index, event) => {
    const updatedFields = [...pictures1];
    updatedFields[index] = { ...updatedFields[index], name: event?.target?.files?.[0] }; 
    setPictures1(updatedFields);  
  };
  
  const addAnotherField1 = () => {
    setPictures1([...pictures1, { name: '' }]);
  };

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
        console.log("get_SchoolProfile",result.response[0].training_manual)
        if (result.status == true) {
          setLogo(result.response[0].logo_school)
          setTrainingManual(result.response[0].training_manual)
        }
      })
      .catch(error => console.log('error', error));
  }

  const addCertificate = async () => {
    console.log(pictures1);
    
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    if (pictures1?.some((file) => file?.name !== '')){
      // setIsLoading(true);
       // Create FormData object
       const myHeaders = new Headers();
       myHeaders.append("Authorization", "Bearer "+ token);
    const formdata = new FormData();
    // certificateFields.forEach((file, index) => {
    //   formdata.append(`training_manual`, {
    //     file.name
    //   });
    // });
    pictures1.forEach((file, index) => {
      // console.log(file.name.name);
      formdata.append(`training_manual`, file.name); 
    });
    
    formdata.append('user_id', user_id)

    console.log('formdata', formdata);
    
    // Make API call
    fetch(API_URL4010+"editdocutraining", {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    })
    .then(response => response.json())
    .then(result => {
        console.log("editdocutraining",result.response.training_manual);
        if(result.status == true) {
          // dispatch(addSchoolData(result.response));
          // ToastAndroid.show('Training manual added successfully', ToastAndroid.SHORT);
          // setCertificateFields([]);
          // setIsLoading(false);
          // setTrainingModules(result.response?.training_manual)
          successMessage('Training manual added successfully')
          setTrainingManual(result.response.training_manual)
          setPictures1([{ name: '' }])
        }
        else {
          // setIsLoading(false);
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        // ToastAndroid.show('Network Error! Please try again.', ToastAndroid.SHORT);
        // setIsLoading(false);
        errorMessage('Network Error! Please try again.')
      });
    }
   else {
    // ToastAndroid.show('Please pick one or more certificate', ToastAndroid.SHORT);
    errorMessage('Please pick one or more certificate')
   }
  }

  const deleteTrainingManual = async (manual) => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+ token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "training_manual": manual
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4010+"editdocutraining", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("editdocutraining",result)
        if (result.status == true) {
          // dispatch(addSchoolData(result.response));
          // const updatedModules = trainingModules.filter((item)=>item !== manual);
          // setTrainingModules(updatedModules);
          // ToastAndroid.show('Manual deleted successfully', ToastAndroid.SHORT);
          successMessage('Manual deleted successfully')
          getSchoolProfile()
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error);
        // ToastAndroid.show('Network error! Please try again.', ToastAndroid.SHORT);
        errorMessage('Network error! Please try again.')
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
     <PageTitle title={'Documentation'}/>
    </div>
  <div className='overall-ment'>
    <div className='ment-add'>+ Add Another</div>
    <div>
    <div className='ment-title'>Attach logo of your school</div>
    {/* <div className='ment-red-text'>Logo of your school</div>
    <div className='ment-content'>
    file.jpg
     <img loading="lazy" src={require('../../../Assets/material-symbols_delete-outline.png')} alt="" />
    </div> */}
    {pictures.map((certificate, index) => (
        <div className='sd-in2'>
         Upload pictures
          <div className='in-inside-img-upload2'>
          <input
           type="file" 
           accept="image/*" 
          //  ref={fileInputRef} 
          //  value={certificate.name} 
           onChange={(event) => handleImageInputChange(index, event)} 
           id={`file-input-pictures-${index}`} // Unique id for this loop
           style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16,display:'none'
          }}/>
          {/* <div>{certificate?.name?.name}</div> */}
          <img loading="lazy" src={AccreditedImagePath + logo} alt="" style={{width:'70px',height:'70px'}}/>
          <img loading="lazy" src='/assets/material-symbols_upload.png' alt="" onClick={() => document.getElementById(`file-input-pictures-${index}`).click()}/>
          </div>
        </div>
        ))}
    </div>
    <div>
    <div className='ment-title'>Attach Your teacher training manual (more than 1)</div>
    {/* <div className='ment-red-text'>Teacher Training Manual 1</div> */}
    {trainingManual.map((manual, index) => (
      <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
    <div className='ment-red-text' key={index}>
      Teacher Training Manual {index + 1}  
    </div>
    <img loading="lazy" src='/assets/material-symbols_delete-outline.png' alt="" style={{width:'25px',height:'25px',marginTop:'3%',cursor:'pointer'}} onClick={()=>deleteTrainingManual(manual)}/>
    </div>

  ))}

    {/* <div className='ment-content'>
    file.jpg
<img loading="lazy" src={require('../../../Assets/material-symbols_delete-outline.png')} alt="" />
    </div> */}
    </div>
    <div>
    {/* <div className='ment-content-02'>
    Upload
<img loading="lazy" src={require('../../../Assets/material-symbols_upload.png')} alt="" /> */}
    {/* </div> */}
    {pictures1.map((certificate, index) => (
        <div className='sd-in2' key={index}>
         Upload pictures
          <div className='in-inside-img-upload2'>
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
    </div>
    <div style={{display:'flex',justifyContent:'space-between'}}>
    <div className='ment-btn' onClick={addAnotherField1}>+ Add Another</div>
    <div className='ment-btn' onClick={addCertificate}>Submit</div>
    </div>

  </div>
  </>
  )
}
