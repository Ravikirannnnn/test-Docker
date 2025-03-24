import React, { useEffect, useState } from 'react';
import './BodsphereCertificates.css';
import { themeContext } from '../../../../Context';
import { useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '../../../../Components/Loader/Other/PageTitle';
import { API_URL4007, API_URL4009 } from '../../../../Service/ApiService';

export default function BodsphereCertificate() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const navigate=useNavigate();


  const [certificate, setCerificate] = useState([]);

  useEffect(() => {
    getBYTCertificates();
  }, [])

  const getBYTCertificates = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    console.log(user_id);
    
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

    fetch(API_URL4009 + "get_BYT_Certicates", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log("get_BYT_Certicates", result)
        if (result.status == true) {
          console.log(result.response)
          setCerificate(result.response);
        }
        else {
        //   ToastAndroid.show(result.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => console.log('error', error));
  }

  const handleCertificatePath=(item)=>{
    // navigate('/Certificate')
    console.log(item);
    
    {
      navigate('/Certificate', {
        state: {
        //   categoryId: item.category_id, 
          subCat:item.designationName,
          issuedOn:item.updatedAt,
        //   certificate:item.certificateName,
        }
      });
    }
  }

  return (
    <>
    <div>
      <PageTitle title={'Bodsphere Certificates'}/>
    </div>
    <div className='certificate-wrapper'>
    {certificate?.map((item)=>(
    <div className='certificate-main-container'
    onClick={()=>handleCertificatePath(item)}
     style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}>
    <div className='document-img'>
      <img loading="lazy" src='/assets/bx_file.png'  alt="" />
    </div>
    
    <div className='doc-text-container'>
      <div className='certificate-text'>{item.designationName}</div>
      <div className='cerficate-link'>
        <a href={item.mainlink} target="_blank" rel="noopener noreferrer" style={{color:'#ff5f67'}}>
        {new Date(item.createdAt).toLocaleDateString('en-CA')}    
            </a>
        </div>
    </div>
    
    {/* <div className='imgs-container'>
      <div className='copy-doc-img'>
<img loading="lazy" src={require('../../Assets/solar_copy-linear.png')} alt="" />
      </div>
      <div className='download-doc-img'>
<img loading="lazy" src={require('../../Assets/tdesign_download-1.png')} alt="" />
      </div>
    </div> */}
    </div>))}
    </div>
    </>
  )
}
