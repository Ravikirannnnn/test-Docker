import React, { useEffect, useState } from 'react';
import './Certificate.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../../Context'
import { useContext } from 'react';
import { API_URL4002, API_URL4004, API_URL4006, DocumentPath, errorMessage, successMessage } from '../../../Service/ApiService';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Toaster } from 'react-hot-toast';
import Modal from '../../../Components/Loader/Modal/Modal';
import {jsPDF} from "jspdf";

export default function Certificate() {
  const navigate=useNavigate();

  const [names, setNames] = useState("")
  const [showSettings, setShowSettings] = useState(false);
  const [signOutModal,setSignOutModal]=useState(false);
  const [name,setName]=useState('');
  const [load,setLoad]=useState(false)

  // useEffect(()=>{
    // if(name01){
    // setNames(name01);
  // }
  // },[])
  const openSignOutModal=()=>{
    if(names === ""){

    setSignOutModal(true)
    }
    else{
      generateImageAndCreateFormData()
    }
  }
  const closeSignOutModal=()=>{
    setSignOutModal(false)
  }
  const location = useLocation();
  const { categoryId,subCat,issuedOn,certNo,certificate,name01 } = location.state || {};
  // console.log(subCat);
  console.log(certNo,'cer');
  
  const [email, setEmail] = useState('')
  const [Images, setImages] = useState(certificate)


  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
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
        if (result.status === true) {
          console.log('getUserProfile',result.userdata)
          // if (route?.params?.name !== undefined) {
          //   setNames(route.params.name);
          //   console.log('0000')
          // } else {
            setNames(result.userdata.name) 
            setEmail(result?.userdata?.email)   
          //   console.log('999')
          // }
          // setEmail(result?.userdata?.email)
        }
        else {
          console.log(result)
        }
      })
      .catch(error => console.log('error', error));
  }

  // const handleDownload = () => {
  //   const element = document.querySelector('.certificate-img'); // Target the div with class certificate-img
  //   html2canvas(element).then(canvas => {
  //     const link = document.createElement('a');
  //     link.href = canvas.toDataURL('image/png');
  //     link.download = 'certificate-new.png'; // The name of the downloaded file
  //     link.click();
  //   });
  // };
  const handleDownload = () => {
    const element = document.querySelector(".certificate-img");
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      // Get image dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      // Convert px to mm (1 px = 0.2645 mm)
      const pdfWidth = imgWidth * 0.2645;
      const pdfHeight = imgHeight * 0.2645;
  
      // Create a PDF with auto width & height
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? "landscape" : "portrait",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Bodsphere-certificate.pdf");
    });
  };

  const generateImageAndCreateFormData = async () => {
    const element = document.querySelector('.certificate-img');
    
    // Capture the div as a canvas
    const canvas = await html2canvas(element);
  
    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Create FormData and append the blob
        const formData = new FormData();
        formData.append('file', blob, 'certificate.png'); // 'file' is the key, 'certificate.png' is the filename
  
        // Log FormData by iterating over its entries
        for (let [key, value] of formData.entries()) {
          console.log(value);
          saveCertificate(value)

        }
        setImages(true);
      } else {
        console.error('Blob generation failed.');
      }
    }, 'image/png');
  };
  

  const saveCertificate =  (image) =>{
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    // console.log(token);
    

      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      
      const formdata = new FormData();
      formdata.append("document", image);
      formdata.append("category_id", categoryId);
      formdata.append("user_id", user_id);
      formdata.append("name", names);
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      console.log(formdata);
      
      
      fetch(API_URL4004+"saveCertificate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result)
          if(result.Status === true){
            navigate('/CertificateScreen');
          }
        })
        .catch((error) => console.error(error));
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleReportPlayback = () => {
    if(names === ""){
      // setShowSettings(false)
    Swal.fire({
      title: 'Update Name',
      input: 'textarea',
      inputPlaceholder: 'Enter Your Name',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      preConfirm: (text) => {
        if (!text) {
          Swal.showValidationMessage('Please enter name');
          return false;
        }
        return text;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const reportText = result.value; 
        handleUpdate(reportText); 
      }
    });
    }
    else{
      generateImageAndCreateFormData()
    }
    
  };

  const handleUpdate = async () => {
    const token= localStorage.getItem('accessToken')
    // const email_id=localStorage.getItem('email_id')
// console.log(accessToken)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    var raw = JSON.stringify({
      "name": name,
      "email": email,
    });

    console.log('raw123', raw)

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
          successMessage('Thank you for updating your user name!');
          closeSignOutModal()
          // Swal.fire({
          //   icon: 'success',
          //   title: 'User name updated',
          //   text: 'Thank you for updating user name!',
          // });
          getProfile();
        }else{
          errorMessage(result.message)
        }
      })
      .catch(error => {console.log('error', error)});
  }


  
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  function formatUTCDate(utcString) {
    const date = new Date(utcString);
  
    const day = date.getUTCDate();
    const month = date.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.getUTCFullYear();
  
    // Function to add ordinal suffix (st, nd, rd, th)
    function getOrdinalSuffix(day) {
      if (day >= 11 && day <= 13) return "th"; // Special case for 11th, 12th, 13th
      const lastDigit = day % 10;
      if (lastDigit === 1) return "st";
      if (lastDigit === 2) return "nd";
      if (lastDigit === 3) return "rd";
      return "th";
    }
  
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }
const handleHome=()=>{
  navigate(-1)
}

const back =()=> {
  navigate('/Dashboard')
}
  return (
    <div className='overall-certi'>
      <Toaster/>
      {/* <div className='com-flex-start-11'>
          <div
            className='com-left-arrow-main-11'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
          >
            <div className='com-left-arrow-11' style={{cursor:'pointer'}} 
            onClick={handleHome}
            >
              <img loading="lazy" src='/assets/rightwel.png' alt="" />
            </div>
          </div>
          <div className='com-title-11'>{subCat}</div>
        </div> */}
        <div>
          <PageTitle title={subCat} back={back}/>
        </div>
      <div className='certificate-container'>
      <div className='certificate-img' style={{ position: 'relative' }}>
      <img onLoad={()=>setLoad(true)} loading="lazy" src='/assets/certificate-new.png' alt="" />
      {load===true ?
      <>
      <div className='qr-code-00'>
      {/* <h2>QR Code Example</h2> */}
      <QRCode
              value={DocumentPath + Images}
              size={80} // Size of the QR code
            />
    </div>
      <div className='certifi-prf-name' 
      // style={{
      //       position: 'absolute',
      //       top: '37%', // Adjust based on where you want the name
      //       left: '50%',
      //       transform: 'translate(-50%, -50%)',
      //       color: 'black', // Change the color based on the certificate
      //       fontSize: '24px', // Adjust font size as needed
      //       fontWeight: 'bold',
      //     }}
          >
            {name01 ? (name01.toUpperCase()):(names.toUpperCase())}
          {/* //  { names.toUpperCase()} */}
            {/* {names} */}
          </div>
          <div className='certi-title'>
            {subCat}
        </div>
        <div className='certi-sub'>
           Issued on {issuedOn ? formatUTCDate(issuedOn) : formattedDate}
        </div>
        {certNo &&
        <div className='certi-sub-sub'>
           Certificate Number :  {certNo}
        </div>
        }
        </>
     :''  }
      </div>

      {load===true ?
      <>
      <div className='cerificate-sub-text' onClick={()=>navigate('/Premium')} style={{cursor:'pointer'}}>
      Use this Certificate & {' '}
       <strong style={{color:'#ff5f67'}}>Get Accredited by Bodsphere</strong> for free
      </div>

        <div className='cer-btn-container'>
        {/* <div className='cer-p-btn'
         style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>Copy</div> */}
        {
          !Images ? <div className='cer-n-btn'onClick={openSignOutModal} >{names == "" ? 'Update Name' : 'Generate'}</div> : null     

        }
          {Images ?  <div className='cer-n-btn'onClick={handleDownload} >Download</div> : null}
      </div>
      </>
      :''}
      </div>
      {/* <div className='cerificate-sub-text'>
      Use this Certificate & <br />
       <strong style={{color:'#ff5f67'}}>Get Accredited by Bodsphere</strong> for free
      </div> */}
      <Modal isOpen={signOutModal} onClose={closeSignOutModal} >
      <div className='signoutbtn1' style={{color:darkMode?'white':'black'}}>
        <h1>Update Name</h1>
        <div className='sign0ut-text1'><input type="text" placeholder='Enter your name' 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        style={{
          backgroundColor: darkMode ? "#1C1C1E" : " #d8d8df",
          border: "0px",
          color: darkMode ? "#d8d8df" :  "#2C2C2E"
        }}/></div>
      <button onClick={handleUpdate}>Update</button>
      <h5>Cancel</h5>
      </div>
    </Modal>
    </div>
  )
}
