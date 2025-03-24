import React from 'react'
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './Help.css'
import PageTitle from '../../../Components/Loader/Other/PageTitle';
  
export default function Help() {
  
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const navigate=useNavigate();
  const handleBack=()=>{
    navigate(-1)
  }
  return (
    <div className='help-main-container'>
      <div className='new-hel-tittt'>
        <PageTitle title={'Help & Support'} />
      </div>
     {/* <div className="edit-profile-flex-start-007">
            <div className="left-arrow-main-007"
            onClick={handleBack}
             style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df"}}>
              <div className="edit-profile-left-arrow-007">
                <img src={require("../../../Assets/rightwel.png")} alt="" />
              </div>
            </div>
            <div className="edit-profile-title-007">Help & Support</div>
          </div> */}
             <div className='help-content-holder'  style={{backgroundColor:darkMode ? "#2C2C2E" : " #d8d8df"}}>

            <div className='help-content-1' onClick={()=>navigate('/Support')}>
              <div className='help-text-1'>Support</div>
              <div className='hlp-arrow-icon-1'>
                <img src='/assets/backwel.png' alt="" />
              </div>
            </div>

          </div>
    </div>
  )
}
