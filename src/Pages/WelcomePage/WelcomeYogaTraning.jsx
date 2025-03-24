import './WelcomeYogaTraning.css';
import { useState } from 'react';
import TrialModal from './TrialModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/userSlice"; 
import { useEffect } from "react";
import { themeContext } from "../../Context";
import { useContext } from "react";

export default function WelcomeYogaTraning() {
  const [isRotated, setIsRotated] = useState(false);
  const navigate = useNavigate();
  const user_id=localStorage.getItem('user_id');
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch(); // Initialize useDispatch
  const userData = useSelector((state) => state.user.profile?.userdata); // Get profile from Redux
  const isLocked = !userData || userData.isSubscribed === false; 
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

   useEffect(() => {
      if (user_id) {
        dispatch(fetchUserProfile()); 
        // console.log('triggered',user_id);
      }
    }, [user_id, dispatch]);

  const handleClick = () => {
    if(!user_id){
      navigate('/login');
      return;
    }
    console.log('clicked');
    setModalOpen(true);
  };

  console.log(modalOpen);
  return (
    <>
    {modalOpen && <TrialModal darkMode={darkMode} setModalOpen={setModalOpen} modalOpen={modalOpen}/>}
    <div>
      {isLocked ?
      <div className='welcome-yoga-traning-header'>
        <div className='welcome-yoga-traning'>
          <div className='welcome-yoga-text'>
            <span className='welcome-rec-yoga'>R e c o m m e n d e d</span>
            <span className='welcome-yoga-rec'>Get access to the entire content and transform your life.</span>
            <div className='join-button-welcome'>
              <button className='join-button' onClick={handleClick} style={{color:'black'}}>Start Your Free Trial</button>
            </div>
          </div>
        </div>
      </div>
      :
      null
      }
      {/* <div className='welcome-yoga-sub'>
        <div className='welcome-yoga-sub-item' style={{ backgroundImage: `url(${require('../../Assets/welcome1.png')})` }}>
          <div className='welcome-yoga-sub-text'>
            <span className='welcome-yoga-sub-h2'>U N I Q U E H O M E S</span>
            <span className='welcome-yoga-sub-p'>Learn the art of yoga with our guides.</span>
            <div className='join-button-welcome1'>
              <button className='join-button'>Join now</button>
            </div>
          </div>
        </div>
        <div className='welcome-yoga-sub-item' style={{ backgroundImage: `url(${require('../../Assets/welcome2.png')})` }}>
          <div className='welcome-yoga-sub-text'>
          <span className='welcome-yoga-sub-h2'>S T A Y A T H O M E</span>
            <span className='welcome-yoga-sub-p'>Cheapest way to learn meditation.</span>
            <div className='join-button-welcome1'>
              <button className='join-button'>Join now</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
    </>
  );
}
