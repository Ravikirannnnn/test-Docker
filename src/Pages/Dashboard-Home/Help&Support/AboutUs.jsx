import React, { useState } from "react";
import { themeContext } from "../../../Context";
import { useContext ,useEffect} from "react";
import { useNavigate} from "react-router-dom";
import "./AboutUs.css";
import { API_URL4007 } from "../../../Service/ApiService";
import PageTitle from "../../../Components/Loader/Other/PageTitle";

export default function AboutUs() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [appName , setAppName] = useState('')
  const [version , setVersion] = useState('')
  const [description , setDescription] = useState('')


  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    getAbout();
  }, []);

  const getAbout = async () =>{
    const token= localStorage.getItem('accessToken')

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };  
          
    fetch(API_URL4007+"getAboutApp", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.Status == true){
          console.log(result,"about")
          setAppName(result.appdata[0].AppName)
          setDescription(result.appdata[0].Description)
          setVersion(result.appdata[0].AppVersion)
        }
        else{
          console.log(result)
        }
      })
      .catch(error => console.log('error', error));
  }
 
  return (
    <div className='about-main-container'>
      {/* <div className="edit-profile-flex-start-012">
        <div
          className="left-arrow-main-012"
          onClick={handleBack}
          style={{ backgroundColor: darkMode ? "#2C2C2E" : " #d8d8df" }}
        >
          <div className="edit-profile-left-arrow-012">
            <img src={require("../../../Assets/rightwel.png")} alt="" />
          </div>
        </div>
        <div className="edit-profile-title-012">About Us</div>
      </div> */}
      <div className="abtu-titllll">
        <PageTitle title={'About Us'}/>
      </div>
      <div className="about-text-container">
        {/* <div className="about-text-1">About Bodsphere</div> */}
        <p className="about-text-2" style={{ 
            borderBottom: `2px solid ${darkMode ? "#2C2C2E" : "#d8d8df"}` ,
            color:darkMode ? 'white' :'black'
            }}>
          <strong>App Name :</strong> {appName}
        </p>
        {/* </div> */}
        <p className="about-text-2"     style={{ 
            borderBottom: `2px solid ${darkMode ? "#2C2C2E" : "#d8d8df"}` ,
             color:darkMode ? 'white' :'black'
            }}>
          <strong>Version :</strong> {version}
        </p>
        <p className="about-text-2" style={{ 
            borderBottom: `2px solid ${darkMode ? "#2C2C2E" : "#d8d8df"}` ,
             color:darkMode ? 'white' :'black'
            }}>
          <strong>Description :</strong> {description}
        </p>
      </div>
    </div>
  )
}
