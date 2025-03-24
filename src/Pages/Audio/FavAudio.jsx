import React, { useContext, useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./Audio.css";
import { API_URL4004, AudioPath, ImagePath } from "../../Service/ApiService";
import { useLocation } from 'react-router-dom';
import { themeContext } from '../../Context';

const Audio = () => {
  const location = useLocation();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const { data } = location.state || {};
  const [liked, setLiked] = useState(false);


  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // The currently playing audio
  const [subCategories, setSubCategories] = useState([]); // All audios

  useEffect(() => {
    getAudios();
  }, []);

  
  const getAudios = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const user_id = localStorage.getItem('user_id');

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + accessToken);

    var raw = JSON.stringify({
      "category_id": data,
      "user_id": user_id
    });

    console.log(data);
    

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4004 + "getSubCategory_course", requestOptions)
      .then(response => response.json())
      .then(async result => {
        if (result.Status === true) {
          console.log(result);
          setLiked(result.data.courseData[0].isLiked)
          const courseData = result.data.courseData;
          setSubCategories(courseData.slice(1)); // Store the rest of the audios (excluding the first)
          setSelectedSubCategory(courseData[0]); // Play the first audio by default
        } else {
          console.log(result);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <div style={{ 
      background: "linear-gradient(#EAD0D0, #000000)", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center" 
    }}>
      {/* Display the current playing audio */}
      {selectedSubCategory && (
        <div style={{ marginTop: "50px" }}>
          <img
            src={ImagePath + selectedSubCategory.subcategory_img}
            alt=""
            style={{ borderRadius: "10px" }}
            className="responsive-image"

          />
          <h4 style={{ marginTop: "15px",color:'white' }}>{selectedSubCategory.subCatName}</h4>
          {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
              src={liked ? require('../../Assets/red-heart.png') : require('../../Assets/heart.png')}
              alt="Heart"
              style={{ width: '50px', height: '50px', marginRight: '20px', cursor: 'pointer' }}
              onClick={() => getCourseLikes(selectedSubCategory)}
            />
            <img
              src={require("../../Assets/timer.png")}
              alt=""
              style={{ width: "50px", height: "50px", marginRight: '20px', filter: "invert(100%) brightness(200%)" }}
            />
          </div> */}

          {/* Audio Player */}
          <div className="audio-container">
            <AudioPlayer
              src={AudioPath + selectedSubCategory.subdown_audio}
              onPlay={() => console.log("Playing")}
              autoPlay={true}
              style={{
                backgroundColor: "#f3a27d",
                color: "#fff",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Audio;
