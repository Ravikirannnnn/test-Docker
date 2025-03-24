import React, { useEffect } from 'react';
import './Modal.css';
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { color } from '@mui/system';

const Modal = ({ isOpen, onClose, children, title }) => {
  // Close the modal when the escape key is pressed
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27 && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Render the modal only if isOpen is true
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{backgroundColor:darkMode ? "#1C1C1E" : " #d8d8df",boxShadow:darkMode ? ' 0px 0px 1px 1px #FFFFFF':'0px 0px 2px 1px #00BBD140'}}>
    <button className="modal-close" onClick={onClose} style={{color:'black'}}>
            &times;
          </button>
          <div className='modal-head-body'>
        <div className="modal-header">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">
          {children}
        </div>
        </div>
        {/* <div className="modal-footer">
          <button className="modal-close" onClick={onClose}>
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;