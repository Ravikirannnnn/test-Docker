import React from 'react'
import './ContactUs.css';
import { useNavigate } from 'react-router-dom';
import FooterView from '../WelcomePage/FooterView';

export default function ContactUs() {

const navigate=useNavigate()
const EmailSupportPath=()=>{
  navigate('/EmailSupport')
}
  return (
    <>
    <div className='contact-overall'>
      <div className='top-contact-text'> 
        <h1>Contact Us</h1>
        <p>We're here to help you</p>
      </div>
      <div className='contact-container'>
        {/* <div className='container-text'>
          <p>Can't find the answer to your question?</p>
          <h3>WE'RE HERE TO HELP</h3>
        </div> */}

        <div className='img-content-container'>
          {/* <div className='img-content'>
            <img src='/assets/communications.png')}alt="" />
            <span>Chat</span>
            <h5>Mon-Fri:6AM-3:30PM PT <br /> Sat-Sun: 8:00AM PT-4:30PM PT</h5>
            <button>Get in touch</button>
          </div> */}
          <div className='img-content'>
            <img src='/assets/telephone.png' alt="" />
            <span>Call</span>
            <h5>Mon-Fri:6AM-3:30PM PT <br /> Sat-Sun: 8:00AM PT-4:30PM PT</h5>
            <a>+91 855-343-2342 <br /> or <br />+91 855-343-2342 </a>
          </div>
          <div className='img-content'>
            <img src='/assets/email.png' alt="" />
            <span>E-mail</span>
            <h5>Mon-Fri:6AM-3:30PM PT <br /> Sat-Sun: 8:00AM PT-4:30PM PT</h5>
            <button onClick={EmailSupportPath}>Get in touch</button>
          </div>
        </div>
      </div>
      
    </div>
    <FooterView/>

    </>
  )
}
