import React, { useContext, useEffect, useState,useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./PlayAudio.css";
import { API_URL4004, AudioPath, errorMessage, ImagePath, successMessage } from "../../../Service/ApiService";
import { useLocation ,useNavigate} from 'react-router-dom';
import { themeContext } from '../../../Context';
import Modal from "../../../Components/Loader/Modal/Modal";
import { toast, Toaster } from 'react-hot-toast';

const PlayAudio = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const audios=location.state;

  console.log(audios,'audiso')
  const [liked, setLiked] = useState(false);


  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // The currently playing audio
  const [subCategories, setSubCategories] = useState([]); // All audios

  const [isModalOpen, setIsModalOpen] = useState(false); // Timer modal state
  const [selectedTime, setSelectedTime] = useState(0); // Timer value (in seconds)
  const [timerId, setTimerId] = useState(null);
  const [timeInput, setTimeInput] = useState("00:00");
  const audioPlayerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0); 

  const handleAudioProgress = (e) => {
    const playedSeconds = Math.floor(e.target.currentTime);
    setCurrentTime(playedSeconds);
  
    if (selectedTime > 0 && playedSeconds >= selectedTime) {
      audioPlayerRef.current.audio.current.pause(); // Pause the audio
      successMessage("Audio paused at the selected time!"); // Optional notification
      setSelectedTime(0); // Reset timer to avoid multiple triggers
    }
  };
  
  // Start timer when audio starts playing
  const handleAudioPlay = () => {
    if (selectedTime > 0) {
      startTimer(selectedTime); // Start the timer based on selected time
    }
  };
  
  const startTimer = (durationInSeconds) => {
    if (timerId) clearTimeout(timerId); // Clear any previous timer
  
    const newTimerId = setTimeout(() => {
      audioPlayerRef.current?.audio.current.pause(); // Pause the audio
      successMessage("Audio paused at the selected time!"); // Optional: Notify the user
    }, durationInSeconds * 1000); // Convert seconds to milliseconds
  
    setTimerId(newTimerId); // Save the new timer ID
  };
  
  const handleSetTimer = () => {
    const [minutes, seconds] = timeInput.split(":").map(Number); // Split mm:ss format
    const totalSeconds = minutes * 60 + seconds; // Convert to total seconds
  
    if (totalSeconds > 0) {
      setSelectedTime(totalSeconds); // Set the selected time
      setIsModalOpen(false); // Close the modal
    } else {
      errorMessage("Please enter a valid time."); // Handle invalid input
    }
  };
  
  // Monitor audio progress and pause if it reaches the selected time
  // const handleAudioProgress = (e) => {
  //   const playedSeconds = Math.floor(e.target.currentTime);
  //   setCurrentTime(playedSeconds);

  //   if (selectedTime > 0 && playedSeconds >= selectedTime) {
  //     audioPlayerRef.current.audio.current.pause(); // Pause the audio
  //     successMessage("Audio paused at the selected time!"); // Optional notification
  //     setSelectedTime(0); // Reset timer to avoid multiple triggers
  //   }
  // };
  // const startTimer = (durationInSeconds) => {
  //   if (timerId) clearTimeout(timerId); // Clear any previous timer

  //   const newTimerId = setTimeout(() => {
  //     audioPlayerRef.current?.audio.current.pause(); // Pause the audio
  //     successMessage("Audio paused at the selected time!"); // Optional: Notify the user
  //   }, durationInSeconds * 1000); // Convert seconds to milliseconds

  //   setTimerId(newTimerId); // Save the new timer ID
  // };
  
  // const handleSetTimer = () => {
  //   const [minutes, seconds] = timeInput.split(":").map(Number); // Split mm:ss format
  //   const totalSeconds = minutes * 60 + seconds; // Convert to total seconds

  //   if (totalSeconds > 0) {
  //     startTimer(totalSeconds); // Start the timer
  //     setIsModalOpen(false); // Close the modal
  //   } else {
  //     errorMessage("Please enter a valid time."); // Handle invalid input
  //   }
  // };

  // const getCourseLikes = async (vid) => {
  //   const user_id = localStorage.getItem('user_id');
  //   const token = localStorage.getItem('accessToken');
  
  //   try {
  //     const myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");
  //     myHeaders.append("Authorization", "Bearer " + token);
  
  //     const raw = JSON.stringify({
  //       "video_id": vid._id,
  //       "user_id": user_id,
  //     });
  
  //     const requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow",
  //     };
  
  //     const response = await fetch(API_URL4004 + "like_Course", requestOptions);
  //     const result = await response.json();
  
  //     if (result.status) {
  //       console.log(result);
  //       // Update the liked state only after a successful response
  //       setLiked(!liked);
  //       setSelectedSubCategory((prev) => ({
  //         ...prev,
  //         isLiked: !liked,
  //       }));
  //     } else {
  //       console.log("Error liking the course", result);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  




  return (
    <div  className='overall-audio-pl' style={{ 
      background: "linear-gradient(#EAD0D0, #000000)", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center" 
    }}>
  <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      {/* Display the current playing audio */}
        <div style={{ marginTop: "50px" }}>
          <img
            src={ImagePath + audios.audioImage}
            alt=""
            style={{ borderRadius: "10px" }}
            className="responsive-image-pl"

          />
          <h4 style={{ marginTop: "15px",color:'white' }}>{audios.audioTitle}</h4>
          <div className='new-fav-facv-pl' >
            {/* {liked ?
          <img
              src={ require('../../../Assets/222heart.png')}
              alt="Heart"
              // style={{ width: '50px', height: '50px', marginRight: '20px', cursor: 'pointer' }}
              onClick={() => getCourseLikes(selectedSubCategory)}
            />
            :
             <img
              src={require('../../../Assets/1111heart (1).png')}
              alt="Heart"
              style={{filter:'invert(100%) brightness(200%)' }}
              onClick={() => getCourseLikes(selectedSubCategory)}
            />
          } */}
          {/* <img
            id='1121'
              src={require("../../../Assets/download.png")}
              alt=""
              style={{ marginRight: '0px', filter:"invert(0%) brightness(200%)" }}
            /> */}
            <img
            id='111'
              src='/assets/minutes.png'
              alt=""
              style={{ marginRight: '20px', filter:"invert(100%) brightness(200%)" }}
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Audio Player */}
          <div className="audio-container-pl">
            <AudioPlayer
             ref={audioPlayerRef}
              src={audios.audioFileName}
              // onPlay={() => console.log("Playing")}
              autoPlay={true}
              onTimeUpdate={handleAudioProgress} // Monitor progress
              onPlay={handleAudioPlay} // Start timer on play
              style={{
                backgroundColor: "#f3a27d",
                color: "#fff",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>

      {/* Display remaining audios */}
      {/* <div className="down-music">
  {subCategories.map((item, index) => (
  <div
    className="video-card"
    key={item._id || index} // Prefer unique IDs if available
    onClick={() => handleCardClick(item)} // Play selected audio and move it to the top
  >
    <div className="video-thumbnail">
      <img
        src={`${ImagePath}${item.subcategory_img}`}
        alt={item.subCatName}
      />
    </div>
    <div className="new-audio-pro">
    <div className="video-info">
      <h3 className="video-title">{item.subCatName}</h3>
      
      <div className="video-details">
        <span className="video-time">
          {`${Math.floor(Math.floor(item.Duration) / 60)}:${String(Math.floor(item.Duration) % 60).padStart(2, '0')}`} min
        </span>
      </div>
    </div>
    <div className="new-funct">
    <span className="video-preview">Preview</span>

    </div>
    </div>
  </div>
))}

      </div> */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
        <div className="timer-modal-pl">
        <h2>Select Timer</h2>
        <input
          type="text"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          placeholder="mm:ss"
        />
        <button onClick={handleSetTimer}>Set Timer</button>
        </div>
      </Modal>

    </div>
  );
};

export default PlayAudio;
