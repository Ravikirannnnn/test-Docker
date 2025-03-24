import React, { useState,useContext } from 'react'
import './EmailSupport.css'
import FooterView from '../WelcomePage/FooterView'
import { API_URL4007, errorMessage, successMessage } from '../../Service/ApiService';
import { Toaster } from 'react-hot-toast';
import { themeContext } from "../../Context";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export default function EmailSupport() {
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [desc,setDesc]=useState('');
const [query,setQuery]=useState('')
const navigate=useNavigate()
const userId=localStorage.getItem('user_id')
const [windowWidth, setWindowWidth] = useState(window.innerWidth);
useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// const isMobileView = windowWidth <= 480;
const isResponsiveView = windowWidth <= 800;
// const navigate=useNavigate();

const theme = useContext(themeContext);
const darkMode = theme.state.darkMode;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    if (!name.trim()) {
      errorMessage('Name is required');
      return false;
    }
    if (!email.trim() || !validateEmail(email)) {
      errorMessage('A valid email address is required');
      return false;
    }
    if (!desc.trim()) {
      errorMessage('Please provide a description');
      return false;
    }
    if (!query.trim()) {
      errorMessage('Please enter your query');
      return false;
    }
    return true;
  };

const fetchSupport=(e)=>{
  e.preventDefault();
  if (!validateForm()) {
    return;
  }
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "Name": name,
  "Email": email,
  "Description": desc,
  "aboutToConnect": query
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(API_URL4007+"addContact", requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result)
    if(result.status===true){
      successMessage(" Thank you for submitting, We will get back to you shortly.", {
        duration: 1000, // Duration for the toast
      });
      setTimeout(() => {
        // Navigate after toast
      }, 2000);
      setDesc('') ;
       setEmail('');
       setName('');
       setQuery('');
    }else{
      errorMessage('please provide proper details')
    }
  })
  .catch((error) => console.error(error));
}

const welcomePath=async()=>{
  await successMessage( ' Thank you for submitting, We will get back to you shortly.',);
  

}
  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
    <div  className='overall-em-support'>
      <div className='sup-title'>
      <h1>Connect with Bodsphere</h1>
      <p style={{color:darkMode ? 'white':'black'}}>Have a question, or just want to say hi? We're here for you - reach out anytime!</p>
      </div>
      <div className='email-supp-body'>
      <div className='in-div' >
        <input type="text" placeholder='Your name*' value={name} onChange={(e)=>setName(e.target.value)} required style={{color:darkMode?'white':'black'}}/>
      </div>
      <div className='in-div'>
        <input type="text" placeholder='Your email address*' value={email}  onChange={(e)=>setEmail(e.target.value)} required style={{color:darkMode?'white':'black'}}/>
      </div>
      <div className='in-div'>
        <input type="text" placeholder='I am looking to connect about*' value={desc} required onChange={(e)=>setDesc(e.target.value)} style={{color:darkMode?'white':'black'}} />
      </div>
      {/* <div className='in-div'>
        <input type="text" placeholder='Subject' required />
      </div> */}
      <div className='in-div-00'>
        <textarea name="message" id="" placeholder='Enter Your Query*' value={query} required onChange={(e)=>setQuery(e.target.value)} style={{color:darkMode?'white':'black'}}></textarea>
      </div>

      <button onClick={(e)=>fetchSupport(e)}>Send</button>
{/* <p>Our Bodsphere Customer Experience team is available Monday through Friday, 7am-6pm PST, at support@bodsphere.com.</p>
<p>
For press inquiries, please contact us at publications@bodsphere.com.
</p> */}
      </div>
    </div>
    {userId&&isResponsiveView 
    ?
    ''
    :
    <FooterView/>
    }
    
    </>
  )
}
