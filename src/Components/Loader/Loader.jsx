import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../public/assets/Animation - 1726140385294.json';
import './loader.css';
import { useContext } from 'react';
import { themeContext } from '../../Context';

const Loader = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const defaultOptions = {
    loop: true,
    autoplay: true, // Change to false if you don't want autoplay
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className="loader-container"
      style={{
        backgroundColor: darkMode ? '#000' : 'rgba(236, 236, 236, 1)',
        color: darkMode ? '#fff' : '#000',
      }}
    >
      <Lottie options={defaultOptions} height={300} width={300} />
      {/* <div className="loader-text" style={{
        color: darkMode ? '#fff' : '#000',
      }}>Loading...!</div> */}
    </div>
  );
};

export default Loader;
