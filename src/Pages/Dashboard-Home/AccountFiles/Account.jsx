import React, { useContext, useState } from 'react';
import './Account.css';
import { themeContext } from "../../../Context";
import DeleteAccountModal from './DeleteAccountModal'; 
import ChangePasswordModal from './ChangePassword';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../../Components/Loader/Other/PageTitle';

export default function Account() {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  
  const navigate = useNavigate();

  const handleBackPath = () => {
    navigate(-1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openPasswordModal = () => {
    setOpen(true);  
  };

  const closePasswordModal = () => {
    setOpen(false);
  };

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <>
    <div style={{marginLeft:'10px'}}>
      <div className='title-ttit'>
    <PageTitle title={"Account"}/>
    </div>
    </div>
    
    <div className='account-main-container' >
      <div>

        <div className='account-containers-holder'>
          <div
            className='account-info-container-1'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)" }}
          >
            <div className='info-container-11' onClick={openPasswordModal}>
              <div className='info-content-title-11'>Change Password</div>
              {/* <div className='info-content-img-11'>
                <img src={require('../../../Assets/Vector (3).png')} alt="" />
              </div> */}
            </div>
            <ChangePasswordModal show={open} onClose={closePasswordModal} />
            
            <div className='info-container-31' onClick={toggleModal}>
              <div className='info-content-title-31'>Delete Account</div>
            </div>
            <DeleteAccountModal show={showModal} onClose={toggleModal} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
