import React, { useEffect, useState,useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './SubscriptionSuccess.css';  // Assuming the CSS is in this file
import { themeContext } from "../../Context";
import { API_URL4008 } from '../../Service/ApiService';
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../redux/userSlice";

const SubscriptionSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const location = useLocation();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const hasFetched = useRef(false);
  const dispatch = useDispatch();
  
  const sessionId = new URLSearchParams(location.search).get('session_id');
  const user_id=localStorage.getItem('user_id');
  console.log('accessed',sessionId);
  
  useEffect(() => {
    if (sessionId && !hasFetched.current) {
        // Get accessToken (Assuming it's stored in localStorage or obtained from state/context)
        const accessToken = localStorage.getItem("accessToken"); // Modify as needed
        hasFetched.current = true;

        // Call backend to verify the payment session
        axios.post(
            API_URL4008+"subscription-success",
            { session_id: sessionId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            // On successful verification, you can display a success message and set a timer to redirect
            setLoading(false);
            dispatch(fetchUserProfile());
            setTimeout(() => {
                navigate("/dashboard"); // Redirect the user
            }, 5000);
        })
        .catch((error) => {
            setLoading(false);
            setError("There was an error processing your subscription. Please try again.");
        });
    }
}, [sessionId]);

  useEffect(()=>{
  if(!user_id){
    navigate('/login');
  }
  },[user_id])

  const handleDash=()=>{
    navigate('/Dashboard')
  }
  if (loading) {
    return (
      <div className={`subscription-container ${darkMode ? 'dark' : ''}`}>
        <div className="loading-spinner">🔄</div>
        <p>Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className={`subscription-container `}>
      {error ? (
        <div className="error-message">
          <h2>Subscription Failed</h2>
          <p>{error}</p>
        </div>
      ) : (
        <div>
          <h2>Subscription Successful!</h2>
          <p>Thank you for subscribing! You will be redirected shortly.</p>
          <button className="redirect-btn" onClick={handleDash}>Go to Dashboard</button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSuccess;
