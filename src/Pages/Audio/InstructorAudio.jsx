
import React, { useContext, useEffect, useState,useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import "react-ios-time-picker/dist/index.css";
import "./Audio.css";
import { API_URL4004, AudioPath, errorMessage, ImagePath, successMessage } from "../../Service/ApiService";
import { useLocation ,useNavigate} from 'react-router-dom';
import { themeContext } from '../../Context';
import Modal from "../../Components/Loader/Modal/Modal";
import { toast, Toaster } from 'react-hot-toast';
// import { TimePicker } from 'react-ios-time-picker';
import { CircularProgressbar } from 'react-circular-progressbar';
import DurationPicker from 'react-duration-picker';
// import 'react-duration-picker/dist/index.css';


const InstructorAudio = () => {
  const location = useLocation();
  const navigate=useNavigate()
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const { data } = location.state || {};
  const [liked, setLiked] = useState(data.isLiked);

  // console.log(data);

  const [selectedSubCategory, setSelectedSubCategory] = useState(data); // The currently playing audio
  const [subCategories, setSubCategories] = useState([]); // All audios

  const [isModalOpen, setIsModalOpen] = useState(false); // Timer modal state
  const [selectedTime, setSelectedTime] = useState(0); // Timer value (in seconds)
  const [timerId, setTimerId] = useState(null);
  const [timeInput, setTimeInput] = useState({ hours: 0, minutes: 0 });
  const audioPlayerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0); // Track audio playtime
  const [downloadList, setDownloadList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showImage, setShowImage] = useState(true);
  // State to track if the task is completed
  const [isCompleted, setIsCompleted] = useState(false);
  const [button,setButton]=useState(true);
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [message,setMessage]=useState(selectedTime)
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
  useEffect(() => {
    getAudios();
    getDownloadedAudios();
  }, []);

  const getDownloadedAudios = async () => {
    try {
      const downloadedAudios = await localStorage.getItem('DownloadedAudios');
      const audios = downloadedAudios ? JSON.parse(downloadedAudios) : [];
      setDownloadList(audios);
    } catch (error) {
      console.error('Error retrieving downloaded audios:', error);
    }
  };
  const handleDurationChange = (newDuration) => {
    setTimeInput(newDuration);
  };
  // Handle the audio download logic
  const handleDownload = async () => {
    if (!selectedSubCategory) return; // Ensure there is a selected audio

    const audioFileName = `${AudioPath}${selectedSubCategory.subdown_audio}`;
    
    // Check if the audio is already downloaded
    const isAlreadyDownloaded = downloadList.some(audio => audio.audioFileName === audioFileName);
    
    if (isAlreadyDownloaded) {
      // Navigate to the Downloads screen if already downloaded
      // navigate('/Downloads', { audioInfo: null });
      handleImageClick()
    } else {
      // Create an audio object for download
      const audio = {
        audioDescription: selectedSubCategory.description, // Use appropriate property
        audioImage: selectedSubCategory.subcategory_img,   // Use appropriate property
        audioTitle: selectedSubCategory.subCatName,        // Use appropriate property
        audioFileName: audioFileName,
      };

      // Update the download list and save to localStorage
      const updatedDownloadList = [...downloadList, audio];
      try {
        await localStorage.setItem('DownloadedAudios', JSON.stringify(updatedDownloadList));
        console.log("Audio downloaded and stored:", audio);
        // navigate('/Downloads', { audioInfo: audio }); // Navigate to Downloads screen
        handleImageClick()
      } catch (error) {
        console.error('Error saving downloaded audio:', error);
      }
    }
  };
  const handleImageClick = () => {

    setShowImage(false);

    setProgress(0); // Reset progress to 0 when image is clicked
    setIsCompleted(false); // Reset completion status

    // Simulate a task by updating progress over time
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10; // Increment the progress
        } else {
          clearInterval(interval); // Clear interval once task is completed
          setIsCompleted(true); // Mark the task as completed
          return prevProgress;
        }
      });
    }, 500); // Update progress every 500ms
  };

  useEffect(() => {
    if (progress === 100) {
      successMessage('Download Complete, Kindly check the Downloads Section in Settings to view your downloads.');
      setTimeout(() => {
        setProgress(0);      // Reset progress
        setShowImage(true);   // Show the image again
      }, 2000); // Delay to allow the user to see the completed progress
    }
  }, [progress]);
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

  const handleConfirmTimer = () => {
    if (timeInput) {
      const hours = timeInput.hours;  // Corrected here
      const minutes = timeInput.minutes;  // Corrected here
      const totalSeconds = (hours * 60 + minutes) * 60;
  
      if (totalSeconds > 0) {
        setSelectedTime(totalSeconds);
        setMessage(totalSeconds);
        setIsModalOpen(false);
  
        const formattedTime = formatSeconds(totalSeconds);
        successMessage(`${formattedTime} set successfully`);
      } else {
        errorMessage("Please enter a valid time.");
      }
    } else {
      errorMessage("Please select a time.");
    }
  };
  
  const formatSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} hr`;
  };
  
  // const successMessage = (msg) => {
  //   successMessage
  //   console.log(msg); // You can replace this with your actual success message logic
  // };

  // const  errorMessage = (msg) => {
  //   console.log(msg); // You can replace this with your actual error message logic
  // };

  // const handleConfirmTimer = () => {
  //   debugger;
  //   if (timeInput) {
  //     const [hours, minutes] = timeInput.split(":").map(Number);
  //     const totalSeconds = (hours * 60 + minutes) * 60;

  //     if (totalSeconds > 0) {
  //       setSelectedTime(totalSeconds);
  //       // successMessage()
  //       setMessage(totalSeconds);
  //       setIsModalOpen(false);
  //       const formattedTime = formatSeconds(totalSeconds);
        
  //       successMessage(`${formattedTime} set successfully`);
  //     } else {
  //       errorMessage("Please enter a valid time.");
  //     }
  //   } else {
  //     errorMessage("Please select a time.");
  //   }
  // };

  // const formatSeconds = (seconds) => {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} hr`;
  // };
  
  const handleCancelTimer = () => {
    setIsModalOpen(false);
  };


  // const handleSetTimer = () => {
  //   const [minutes, seconds] = timeInput.split(":").map(Number); // Split mm:ss format
  //   const totalSeconds = minutes * 60 + seconds; // Convert to total seconds
  
  //   if (totalSeconds > 0) {
  //     setSelectedTime(totalSeconds); // Set the selected time
  //     setIsModalOpen(false); // Close the modal
  //   } else {
  //     errorMessage("Please enter a valid time."); // Handle invalid input
  //   }
  // };
  
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

  const getCourseLikes = async (vid,like) => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    
    const raw = JSON.stringify({
      "video_id": [
       vid
      ],
      "user_id": user_id
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch(API_URL4004+"like_CourseAudio", requestOptions)
      .then((response) => response.json())
      .then((result) => {
           if (result.status) {
        console.log(result);
        setLiked(!liked);
        // setSelectedSubCategory((prev) => ({
        //   ...prev,
        //   isLiked: !liked,
        // }));
      } else {
        console.log("Error liking the course", result);
      }
      })
      .catch((error) => console.error(error));
    
  };
  


  const handleCardClick = (item) => {
    // When a new audio is selected, move it to the top and push the previous one down
    // console.log(item);
    setLiked(item.isLiked)
    if (selectedSubCategory?._id !== item._id) {
      setSubCategories((prev) => {
        // Move the current playing audio to the bottom
        const updatedList = [selectedSubCategory, ...prev.filter((subCat) => subCat._id !== item._id)];
        return updatedList;
      });
      setSelectedSubCategory(item); // Play the selected audio
    }
  };

  const getAudios = async () => {
    // const accessToken = localStorage.getItem('accessToken');
    // const user_id = localStorage.getItem('user_id');

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer " + accessToken);

    // var raw = JSON.stringify({
    //   "category_id": data,
    //   "user_id": user_id
    // });

    // console.log(data);
    

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow'
    // };

    // fetch(API_URL4004 + "getSubCategory_course", requestOptions)
    //   .then(response => response.json())
    //   .then(async result => {
    //     if (result.Status === true) {
    //       console.log(result);
    //       const courseData = result.data.courseData;
    //       console.log(courseData);
          
    //       setSubCategories(courseData.slice(1)); 
    //       setSelectedSubCategory(courseData[0]); 
    //     } else {
    //       console.log(result);
    //     }
    //   })
    //   .catch(error => console.log('error', error));
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  return (
    <div  className='overall-audio' style={{ 
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
      {selectedSubCategory && (
        <div style={{ marginTop: "50px" }}>
          <img
            src={ImagePath + selectedSubCategory.subcategory_img}
            alt=""
            style={{ borderRadius: "10px" }}
            className="responsive-image"

          />
          <h4 style={{ marginTop: "15px",color:'white' }}>{selectedSubCategory.subCatName}</h4>
          <div className='new-fav-facv'style={{cursor:'pointer'}} >
            {liked ?
          <img
              src='/assets/222heart.png'
              alt="Heart"
              // style={{ width: '50px', height: '50px', marginRight: '20px', cursor: 'pointer' }}
              onClick={() => getCourseLikes(selectedSubCategory)}
            />
            :
             <img
              src='/assets/1111heart (1).png'
              alt="Heart"
              style={{filter:'invert(100%) brightness(200%)' }}
              onClick={() => getCourseLikes(selectedSubCategory)}
            />
          }
           {showImage && (
          <div style={{cursor:'pointer'}}>
          <img
            id='1121'
              src="/assets/download.png"
              alt=""
              style={{ marginRight: '0px', filter:"invert(0%) brightness(200%)" }}
              onClick={handleDownload}
            />
            </div>
               )}
                { progress > 0 && (
        <div className='download-bar' style={{width:'30px'}}>
          <CircularProgressbar
  styles={{
    path: {
      stroke: '#FF5F67',
      strokeWidth: 10,
      transition: 'stroke-dashoffset 0.5s ease 0s',
    },
    trail: {
      stroke: '#d6d6d6',
    },
    text: {
      fill: '#FFF',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',  // Ensures the text is centered horizontally
      dominantBaseline: 'middle',  // Centers vertically
      textAnchor: 'middle',  // Ensures text is anchored at the center horizontally
      transform: 'translateY(0px)',  // Fine-tune vertical alignment if necessary
    },
  }}
  value={progress}
  text={`${progress}%`}
/>
        </div>
      )}
            <img
            id='111'
              src="/assets/minutes.png"
              alt=""
              style={{ marginRight: '20px', filter:"invert(100%) brightness(200%)" }}
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Audio Player */}
          <div className="audio-container">
            <AudioPlayer
             ref={audioPlayerRef}
              src={AudioPath + selectedSubCategory.subdown_audio}
              // onPlay={() => console.log("Playing")}
              autoPlay={true}
              onTimeUpdate={handleAudioProgress} // Monitor progress
              onPlay={handleAudioPlay} // Start timer on play
              onListen={handleAudioProgress}
              style={{
                backgroundColor: "#f3a27d",
                color: "#fff",
                borderRadius: "15px",
              }}
            />
          </div>
        </div>
      )}

      {/* Display remaining audios */}
      <div className="down-music">
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

      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
      <div className="timer-modal"  >
        <h2>Select Timer</h2>
        {/* <TimePicker
          onChange={setTimeInput}
          value={timeInput}
          theme={darkMode ? 'dark' : 'light'}// Optional: dark theme for time picker
          cancelText="Cancel"
          confirmText="Confirm"
          onClick={()=>setButton(false)}
        /> */}
       <DurationPicker
        value={timeInput}
        onChange={handleDurationChange}
        hoursLabel="Hours"
        minutesLabel="Minutes"
        className
      />
       <div style={{marginTop:'4%'}}>
       <h5>Selected Duration: {`${timeInput.hours}:${timeInput.minutes < 10 ? '0' + timeInput.minutes : timeInput.minutes}`}</h5>
      </div>
        {button===true
?        (<div className="neww-btn" style={{ display: 'flex', gap: '10px', marginTop: '20px',justifyContent:'center'}}>
          {/* <button onClick={handleCancelTimer}>Cancel</button> */}
          <button onClick={handleConfirmTimer}>Confirm</button>
        </div>):null
        }
      </div>
    </Modal>
    </div>
  );
};

export default InstructorAudio;
