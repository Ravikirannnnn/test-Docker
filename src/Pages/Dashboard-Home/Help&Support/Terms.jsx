import React, { useEffect, useState } from "react";
import { themeContext } from "../../../Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Terms.css";
import { API_URL4007 } from "../../../Service/ApiService";
import PageTitle from "../../../Components/Loader/Other/PageTitle";

export default function Terems() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [data, setData] = useState([])

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    getTerms();
  }, []);

  const getTerms = async () =>{
    const token= localStorage.getItem('accessToken')

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(API_URL4007+"getAllTerms", requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result.Terms)
        setData(result.Terms)
        console.log(result,'result');
        
      })
      .catch(error => console.log('error', error));
  }
 


  return (
    <>
      {/* <div className="edit-profile-flex-start-011">
        <div
          className="left-arrow-main-011"
          onClick={handleBack}
          style={{ backgroundColor: darkMode ? "#2C2C2E" : " #d8d8df" }}
        >
          <div className="edit-profile-left-arrow-011">
            <img src={require("../../../Assets/rightwel.png")} alt="" />
          </div>
        </div>
        <div className="edit-profile-title-011">Terms & Conditions</div>
      </div> */}
      <div className="terms-tit">
      <PageTitle title={'Terms & Conditions'}/>
      </div>
    <div className="terms-main-container">

      <div className="terms-text-container">
        {data?.map((terms,index)=>(
        <div className="terms-text-1" style={{ whiteSpace: "pre-line" }}>
          <ul>
            <li>
            {terms.Terms}
            </li>
          </ul>
        </div>
      ))}
        {/* {data.map((item, index) => (
        <p className='terms-text-2' key={index}>{item.Terms}</p>
      ))} */}
      </div>
    </div>
    </>
  );
}
