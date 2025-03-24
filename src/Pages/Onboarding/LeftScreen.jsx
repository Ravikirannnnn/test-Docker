import React from "react";
import './LeftScreen.css';
import SignUp from "./SignUp";
import Sign from "./Sign";
import ForgetPassword from './ForgotPassword';
import { useNavigate } from "react-router-dom";
import { themeContext } from "../../Context";
import { useContext } from "react";

function LeftScreen({ activeTab, onTabClick, showForgetPassword, handleForgetPasswordClick, setShowForgetPassword,handelForgotpasswordback,handlePageTitleClick,handleSignUpScreeen }) {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const navigate=useNavigate();
  const handleLandingPage=()=>{
    navigate('/')
  }
  return (
    <div className="leftwebpagecontainertty">
     
      {!showForgetPassword && (
        <div className="login-layout-left">
          <div
            className={`tab-item ${activeTab === "login" ? "activetefddgf" : ""}`}
            onClick={() => onTabClick("login")}
          >
            <span style={{color:darkMode?'white':'black'}}>Login</span>
          </div>
          <div
            className={`tab-item ${activeTab === "signup" ? "activetefddgf" : ""}`}
            onClick={() => onTabClick("signup")}
          >
            <span style={{color:darkMode?'white':'black'}}>Sign Up</span>
          </div>
        </div>
      )}

      <div className="login-layout-contentleftdghfh">
        {showForgetPassword ? (
          <ForgetPassword handleForgetPasswordClicks={handleForgetPasswordClick} setShowForgetPassword={setShowForgetPassword} handelForgotpasswordback={handelForgotpasswordback}/>
        ) : activeTab === "login" ? (
          <Sign handleForgetPasswordClick={handleForgetPasswordClick} />
        ) : (
          <SignUp />
        )}
      </div>
    </div>
  );
}

export default LeftScreen;
