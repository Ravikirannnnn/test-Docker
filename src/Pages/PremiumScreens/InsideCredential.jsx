import React from 'react'
import './InsideCredential.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../Context'
import { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../Components/Loader/Modal/Modal';

export default function InsideCredential() {
  const [modalCredential,setModalCredential]=useState(false);

  const handleCredentialModalOpen=()=>{
    setModalCredential(true)
  }
  const handleCredentialModalClose=()=>{
    setModalCredential(false)
  }
  const navigate=useNavigate();
  const handleAccreditation=()=>{
    navigate('/Accreditation')
  }
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  return (
    <>
    <div>
      <PageTitle title={'Apply for byt Credential'}/>
    </div>
    <div className='overall-is'>
      <div className='is-main-container'
      style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}>
        <div className='is-text-container'>
        <div className='is-add'>+Add Another</div>
        <div className='is-title'>Attach your certificate (more than 1)</div>
        </div>
        <div className='is-form-container'> 
          <div className='is-main-text'>
         Certificate 1   
          </div>
          <div className='is-form-content'>
            <h3>file.jpg</h3>
            <img src='/assets/material-symbols_delete-outline.png' alt="" />
          </div>
          <div className='is-form-content'>
            <h3>Certificate 2</h3>
            <img src='/assets/tdesign_download-1.png' alt="" />
          </div>
        </div>
      </div>
      <div className='is-sub-btn' onClick={handleCredentialModalOpen}>
        Submit
      </div>
    </div>
    <Modal  isOpen={modalCredential} onClose={handleCredentialModalClose}>
      <div>
        <div className='cred-modal-t-container'>
          <div className='mdl-c-c-title'>Change Credentials</div>
          <div className='mdl-c-c-subtext'>Are you sure you want to change the <span>Teacher - BYT - 200</span>  to <span>School - BYT - 300</span> School - BYT - 300</div>
          <div className='mdl-c-c-btn' onClick={handleAccreditation}>Yes,Change</div>
          <div className='mdl-c-c-cancel' onClick={handleCredentialModalClose}>Cancel</div>
        </div>
      </div>
      </Modal>
    </>
  )
}
