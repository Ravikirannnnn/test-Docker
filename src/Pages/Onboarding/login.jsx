import React, { useState, useContext } from "react";
import "./Login.css";
import { themeContext } from "../../Context";
import SimpleSlider from "./SimpleSlider";
import LeftScreen from "./LeftScreen";
import Sign from "./Sign";

function Login() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [activeTab, setActiveTab] = useState("login");
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [signUpScreen,setSignUpScreen]=useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleForgetPasswordClick = () => {
    setShowForgetPassword(true);
  };
  const handelForgotpasswordback =()=> {
    setShowForgetPassword(false);
  }
  const handleSignUpScreeen=()=>{
    setSignUpScreen(true)
  }

  const handleBackToLoginClick = () => {
    setShowForgetPassword(false);
  };
  const handlePageTitleClick = () => {
    setSignUpScreen(false); // Go back to signup screen
  };
  return (
    <div className={`login-layout ${darkMode ? "background-black" : "background-white"}`}>
    <LeftScreen
      activeTab={activeTab}zzz
      onTabClick={handleTabClick}
      showForgetPassword={showForgetPassword}
      handleForgetPasswordClick={handleForgetPasswordClick}
      setShowForgetPassword={setShowForgetPassword}
      handelForgotpasswordback={handelForgotpasswordback}
      handleSignUpScreeen={handleSignUpScreeen}
      signUpScreen={signUpScreen}
      handlePageTitleClick={handlePageTitleClick}
    />
    <SimpleSlider />
  </div>
  );
}

export default Login;
