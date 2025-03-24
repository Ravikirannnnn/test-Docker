import React, { useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { themeContext } from '../../Context';

const ThemeSwitch = ({ onToggle }) => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const handleToggle = () => {
    theme.dispatch({ type: 'TOGGLE_DARK_MODE' }); // Assuming your context supports dispatching
    onToggle(!darkMode); // Pass the mode back to the parent component
  };

  return (
    <div
      onClick={handleToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: darkMode ? 'flex-end' : 'flex-start',
        width: '50px',
        height: '25px',
        backgroundColor: darkMode ? '#333' : '#ddd',
        borderRadius: '30px',
        cursor: 'pointer',
        padding: '0px',
        position: 'relative',
        transition: 'background-color 0.3s ease, justify-content 0.3s ease',
        
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: darkMode ? 'calc(100% - 20px)' : '5px',
          transform: 'translateY(-50%)',
          color: darkMode ? 'yellow' : 'orange',
          transition: 'left 0.3s ease',
        }}
      >
        {darkMode ? <FaMoon size={15} /> : <FaSun size={15} />}
      </div>
    </div>
  );
};

export default ThemeSwitch;
