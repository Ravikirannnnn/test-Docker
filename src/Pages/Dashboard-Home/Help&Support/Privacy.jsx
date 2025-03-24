import React, { useEffect, useState } from 'react'
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Privacy.css'
import { API_URL4007 } from '../../../Service/ApiService';
import PageTitle from '../../../Components/Loader/Other/PageTitle';
  
export default function Privacy() {
  const [data, setData] = useState([])

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const navigate=useNavigate();
  const handleBack=()=>{
    navigate(-1)
  }

  useEffect(() => {
    getPrivacy();
  }, []);

  const getPrivacy = async () => {
    const token= localStorage.getItem('accessToken')

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(API_URL4007 + "getAllPrivacy", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result,'privacyy')
        setData(result.Privacy)

      })
      .catch(error => console.log('error', error));
  }

  return (

          <>
          <div className='prev-tit'>
            <PageTitle title={'Privacy & Policy'}/>
          </div>
    <div className='privacy-main-container'>

          <div className='privacy-text-container'>
            {data?.map((privacy,index)=>(
          <div className='privacy-text-1' style={{ whiteSpace: "pre-line" }}>
         <ul>
          <li>
            {privacy.Privacy}
          </li>
         </ul>
          </div >
          ))}
          {/* <div className='privacy-text-2'>

            Consectetur adipiscing elit. Natoque phasellus lobortis mattis cursus faucibus hac proin risus. Turpis phasellus massa ullamcorper volutpat. Ornare commodo non integer fermentum nisi, morbi id. Vel tortor mauris feugiat amet, maecenas facilisis risus, in faucibus. Vestibulum ullamcorper fames eget enim diam fames faucibus duis ac. Aliquam non tellus semper in dignissim nascetur venenatis lacus.
            </div> */}
            {/* {data.map((item, index) => (
        <p className='privacy-text-2' key={index}>{item.Privacy}</p>
      ))} */}
        </div>
    </div>
    </>
  )
}
