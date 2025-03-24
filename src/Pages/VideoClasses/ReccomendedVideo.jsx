import React, { useEffect } from 'react';
import './ReccommendedVideos.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import ReactPlayer from 'react-player';
import { themeContext } from '../../Context'
import { useContext ,useState,useRef} from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import TimerPicker from '../../Components/Loader/Other/Timer';
import Modal from "../../Components/Loader/Modal/Modal";
import { API_URL4004, errorMessage, ImagePath, successMessage, vidPath } from '../../Service/ApiService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import forwardIcon from '/assets/forward.png'; // Adjust the path as needed
import backwardIcon from '/assets/backward.png'; // Adjust the path as needed
import Swal from 'sweetalert2';
import { CircularProgressbar } from 'react-circular-progressbar';
import { toast, Toaster } from 'react-hot-toast';
import { fetchUserProfile } from '../../redux/userSlice';
import UpgradeModal from '../WelcomePage/WelcomeModal02';


export default function CourseVideo() {
  const location=useLocation();
  const navigate=useNavigate();
  const {id,tid,vname,title,desc,lenimg,file,downloadFileName,audio_files,category_id,chunkdatavedio,Duration,intensity,likes}=location.state || {}
  // console.log(likes,'1010');
  // console.log(vname,'vname',chunkdatavedio[0].vid_name,'chunvid',downloadFileName,'download');
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [showSettings, setShowSettings] = useState(false);
  const [showAudioSettings,setShowAudioSettings]=useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [videoId, setVideoId] = useState(chunkdatavedio[0]?._id);
  const [title1, setTitle1] = useState(title);
  const [desc1, setDesc1] = useState(desc);
  const [image, setImage] = useState(lenimg);
  const [VideoImage, setVideoImage] = useState(lenimg);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(Duration);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [upgradeModal,setUpgradeModal]=useState(false);
  const [getPremiumModal,setGetPremiumModal]=useState(false);
  const [selectedOption, setSelectedOption] = useState('monthly');
  const [showControls, setShowControls] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [data, setData] = useState([])
  const [chunkdatavedio1, setChunkDataVedio1] = useState(chunkdatavedio);
  const [isAudioPressed, setIsAudioPressed] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [subCourse, setsubCourse] = useState([]);
  const [liked, setLiked] = useState(likes);
  const [progress, setProgress] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [description, setDescription] = useState("");
  const [reportModal, setReportModal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
      const [modalOpen, setModalOpen] = useState(false);

    const [videoLoaded, setVideoLoaded] = useState(false);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.profile?.userdata);
    const isLocked = userData?.isSubscribed === false;
  const userId=localStorage.getItem('user_id')

  // console.log(userData,'isloc');
  
   useEffect(() => {
      if (userId) {
        dispatch(fetchUserProfile());
      }
    }, [userId, dispatch]);

  const handleClick = (event) => {
    event.stopPropagation();
    setIsClicked(!isClicked); // Toggle clicked state
    setShowControls(!isClicked); // Toggle controls based on clicked state
};
  const openReportModal = () => {
    setReportModal(true);
  };
  const closeReportModal = () => {
    setReportModal(false);
  };
  // State to track if the task is completed
  const [isCompleted, setIsCompleted] = useState(false);

  const groupedData = data.reduce((acc, item) => {
    const section = item.headings || "Section 1"; // Default to Section 1 if no section provided
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {});

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    if (!openReportModal) {
      setDescription(""); // Reset description when modal is closed
    }
  }, [openReportModal]);

  const [isPipActive, setIsPipActive] = useState(false);

  // const [selectedVideo, setSelectedVideo] = useState(chunkdatavedio[0]?.vid_name); // Default to the first video
  // const [playlist, setPlaylist] = useState([chunkdatavedio[0]?.vid_name]); // Initial playlist with the first video

  // const handleVideoChunkClick = (videoName) => {
  //   setSelectedVideo(videoName); // Set the selected video to play
  //   if (!playlist.includes(videoName)) {
  //     setPlaylist([...playlist, videoName]); // Add to playlist if not already present
  //   }
  // };
  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePremiumModalClose = () => {
    setGetPremiumModal(false);
  };

  const handlePremiumModalOpen = () => {
    setUpgradeModal(false);
    setGetPremiumModal(true);
  };

  const handleUpgradeOpen = () => {
    setUpgradeModal(true);
  };

  const handleUpgradeclose = () => {
    setUpgradeModal(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTime = (seconds) => {
    const newTime = videoRef.current.currentTime + seconds;
    videoRef.current.currentTime = newTime < 0 ? 0 : newTime;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value / 100;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
    console.log(videoRef);
    
    const track = videoRef.current.textTracks[0];
    track.mode = showSubtitles ? 'showing' : 'hidden';
  };

  const handleOpenPicker = () => {
    setIsPickerOpen(true);
  };

  const handleClosePicker = () => {
    setIsPickerOpen(false);
  };

  const handleSaveTime = (timeInSeconds) => {
    setSelectedTime(timeInSeconds);
    setIsPickerOpen(false);
    console.log(`Selected time: ${timeInSeconds} seconds`);
  };

  const showAudio = () => {
    // setShowAudioSettings(!showAudioSettings);
    // setShowSettings(false);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    getsubCourse()
    setImage(lenimg)
  }, []);
  

  const getsubCourse = () =>{
    const token= localStorage.getItem('accessToken')
//     const myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer "+token);


// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow"
// };

// fetch(API_URL4004+"get_recommanded_Classes", requestOptions)
//   .then((response) => response.json())
//   .then((result) => {console.log(result)
//     if(result.Status===true){
//         setsubCourse(result.response)
//     }
//   })
//   .catch((error) => console.error(error));
const userId=localStorage.getItem('user_id')
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+token);

const raw = JSON.stringify({
  "user_id": userId
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(API_URL4004+"get_recommanded_Classes", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if(result.Status === true){
      const audioData = result.response.filter(item => item.categorytype !== "audio" && item.categorytype !== "yogaTalks");

      setsubCourse(audioData);

    }
    console.log(result)
  })
  .catch((error) => console.error(error));

  }

  const handleScreenshare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error('Error accessing display media.', error);
    }
  };
  const speedOptions = [0.25, 0.5, 1, 1.5, 2];

  const changePlaybackSpeed = (speed) => {
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  // const handleReportPlayback = () => {
  //   setShowSettings(false)
  //   Swal.fire({
  //     title: 'Report Playback Issue',
  //     input: 'textarea',
  //     inputPlaceholder: 'Describe the issue...',
  //     showCancelButton: true,
  //     confirmButtonText: 'Submit',
  //     cancelButtonText: 'Cancel',
  //     customClass: {
  //       popup: 'swal-custom-popup',
  //     },
  //     preConfirm: (text) => {
  //       if (!text) {
  //         Swal.showValidationMessage('Please enter a description of the issue');
  //         return false;
  //       }
  //       return text;
  //     },
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const reportText = result.value;
  //       handleSubmitReport(reportText);
  //     }
  //   });
  // };

  const onEnd = async () => {
    // console.log("currentTime", currentTime)
    // console.log("duration", duration)

    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    // const { id, tid, vaname ,} = route?.params;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "lesson_id": videoId,
      "category_id": category_id,
      "user_id": user_id
    });

    console.log("the lessonCompleted raw", raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4004 + "lessonCompletedNewFlow", requestOptions)
      .then(response => response.json())
      .then(result => console.log("lessonCompleted", result))
      .catch(error => console.log('error', error));
  };


  const handleSubmitReport = async (reportText) => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
        console.log('Report submitted:', user_id);

    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      "video_id": id,
      "message": reportText,
      "user_id": user_id
    });

    // console.log("video report", raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4004 + "reportPlayBack", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('reportPlayBack',result)
        if (result.status === true) {
          successMessage('Thank you for reporting the issue!')
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Report Submitted',
          //   text: 'Thank you for reporting the issue!',
          // });
        }
        // else {
        // }
      })
      .catch(error => {
        console.log('error', error)
      });
    
  };
  
  const handleSubmit = () => {
    if (!description.trim()) {
      errorMessage("Please enter a description of the issue");
      return;
    }
    handleSubmitReport(description);
    setDescription(""); // Reset the textarea after submission
    closeReportModal(); // Close the modal
  };
  
// console.log(vidPath+chunkdatavedio[0].vid_name,'video')


const playerRef = useRef(null);

const handleSeek = (seconds) => {
  if (playerRef.current) {
    // Get current time and seek to new time
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + seconds, 'seconds');
  }
};

const handelerror = (message, e) => {
  console.error(message, e);
};

const styles = { 
  backwardButton: {
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: 'translateY(-50%)',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 1,
    display: showControls ? 'block' : 'none', // Show/hide based on state

  },
  forwardButton: {
    position: 'absolute',
    top: '50%',
    right: '10%',
    transform: 'translateY(-50%)',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: 'none',
    borderRadius: '50%',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 1,
    display: showControls ? 'block' : 'none', // Show/hide based on state

  },

   icon: {
    width: '24px',
    height: '24px',
  },
}
// Helper function to safely handle slashes between path and file name
function ensureTrailingSlash(path) {
    return path.replace(/\/+$/, '') + '/'; // Remove trailing slashes and ensure one at the end
}

// Ensure input safety by trimming and defaulting to an empty string if null/undefined
const safeVidPath = vidPath?.trim() || '';
const safeVidName = chunkdatavedio1?.[0]?.vid_name?.trim() || '';

// Encode path and name
const encodedVidPath = encodeURI(safeVidPath); // Encode the base path
const encodedVidName = encodeURIComponent(safeVidName); // Encode the video file name

// Safely concatenate the encoded parts
const encodedURL = `${ensureTrailingSlash(encodedVidPath)}${encodedVidName}`;

// console.log(encodedURL);
// console.log(chunkdatavedio[0]._id,'chunkid')
// const encodedURL = encodeURI(vidPath + chunkdatavedio[0].vid_name);
// const encodedVidPath = encodeURI(vidPath); 
// const encodedVidName = encodeURIComponent(chunkdatavedio[0].vid_name); 

// Safely concatenate the encoded parts
// const encodedURL = `${encodedVidPath}${encodedVidPath.endsWith('/') ? '' : '/'}${encodedVidName}`;

// console.log("Encoded Video URL:", encodedURL);
const availableLanguages = chunkdatavedio1.map(item => item.language_name);
const [language, setLanguage] = useState(availableLanguages[0]);

// const showLanguageModal = () => {
//   setShowSettings(false)
//   const inputOptions = availableLanguages.reduce((options, lang) => {
//     options[lang] = lang; // Use the language name as both key and value
//     return options;
//   }, {});

//   Swal.fire({
//     title: 'Select Language',
//     input: 'select',
//     inputOptions: inputOptions,
//     inputPlaceholder: 'Select language',
//     showCancelButton: true,
//     confirmButtonText: 'Apply',
//     preConfirm: (value) => {
//       if (!value) {
//         Swal.showValidationMessage('You need to select a language');
//       }
//       return value;
//     }
//   }).then((result) => {
//     if (result.isConfirmed) {
//       const selectedLanguage = result.value;
//       setLanguage(selectedLanguage);
//     }
//   });
// }

const getVideoNameByLanguage = (language) => {
  const videoItem = chunkdatavedio1.find(item => item.language_name === language);
  return videoItem ? videoItem.vid_name : chunkdatavedio1[0].vid_name; 
};


useEffect(() => {
  getCourse()
}, []);


const getCourse = async () => {
  const user_id=localStorage.getItem('user_id')
  const token= localStorage.getItem('accessToken')

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  var raw = JSON.stringify({
    "category_id": category_id,
    "user_id": user_id
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(API_URL4004 + "getLessonsNewFlow", requestOptions)
    .then(response => response.json())
     
      .then(result => {
        console.log('API Response:', result); 

        if (result.Status === true) {
          console.log('advvf',result)
          setData(result.data)

        } else {
          console.log('Error in response:', result);
        }
      })

       .catch(error => console.log('error', error));
}

const handleVideoChange = (selectedItem) => {
  if(isLocked && selectedItem.subscriptionType === 'Pro'){
    setModalOpen(true)
  }else{
  setVideoLoaded(false);
  console.log(selectedItem);  
  setIsPipActive(false)
  const chunkData = selectedItem.chunk_data;
  setChunkDataVedio1(chunkData);
  setVideoId(chunkData[0]._id);
  setTitle1(selectedItem.subCatName) 
  setDesc1(selectedItem.description)
  setImage(selectedItem.subcategory_img)
  setLiked(selectedItem.isLiked)
  setVideoImage(selectedItem.lesson_img)
  setDuration(selectedItem.Duration)
}
};

const uniqueKey = `${chunkdatavedio1[0]._id}-${getVideoNameByLanguage(language)}`;

const handleAudioPress = () => {
  setIsAudioPressed(true);
};

const handleEnablePip = () => {
  setIsPipActive(true); // PiP is activated
};

const handleDisablePip = () => {
  setIsPipActive(false); // PiP is deactivated
};

const   getCourseLikes = async (vid) => {
  console.log(vid);
  
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('accessToken');

  // try {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", "Bearer " + token);

  //   const raw = JSON.stringify({
  //     "video_id": [vid],
  //     "user_id": user_id,
  //   });    

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   const response = await fetch(API_URL4004 + "like_Course", requestOptions);
  //   const result = await response.json();

  //   if (result.status) {
  //     console.log(result);
  //     setLiked(!liked);
  //     getsubCourse()
  //   } else {
  //     console.log("Error liking the course", result);
  //   }
  // } catch (error) {
  //   console.error("Error:", error);
  // }
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

fetch(API_URL4004+"like_Course", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    setLiked(!liked);
    getsubCourse()
  })
  .catch((error) => console.error(error));



};


const renderCourseContent = () => {
    return (
      <>
        {subCourse
          .filter(item => 
            // videoId !== 
            item._id) // Filter out items where videoId matches item._id
          .map((item, itemIndex) => (
            <div
              key={item._id}
              // className="video-right-container-course-rc"
        className={`video-right-container-course-rc ${item.subscriptionType === 'Pro' && isLocked ?  'pro-overlay-item-02' : ''}`}

              style={{
                backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
              }}
              onClick={() => handleVideoChange(item)} // Change video on click
            >
              <div className="side-videos-rc">
                <img src={ImagePath + item.subcategory_img} loading="lazy" alt="" />
              </div>
              <div className="right-midle-rc">
              <div className="video-text-00-rc">
                    {`${itemIndex + 1}. ${item.subCatName.length > 23 ? item.subCatName.slice(0, 23) + "..." : item.subCatName}`}
                    </div>

                <div className="video-time-rc">{`${Math.floor(Math.round(item?.Duration) / 60)}:${Math.round(item?.Duration) % 60 < 10 ? '0' : ''}${Math.round(item?.Duration) % 60}`} min</div>
    {item.subscriptionType==='Preview' && isLocked ?( <span className="pro-badge-rv">Preview</span>):item.subscriptionType==='Pro' && isLocked ?(<span className="pro-badge-rv-00">🔒</span>):('')}

              </div>
            </div>
          ))}

      </>
    );
  };

const [downloadList, setDownloadList] = useState([]);
  
  const getDownloadedVideos = async () => {
    try {
      const downloadedVideos = await localStorage.getItem('DownloadedVideos');
      const videos = downloadedVideos ? JSON.parse(downloadedVideos) : [];
      setDownloadList(videos);
    } catch (error) {
      console.error('Error retrieving downloaded videos:', error);
    }
  };

  // Handle the download logic
  // const handleDownload = async () => {
  //   console.log("downloadList", downloadList);
  //   console.log("Download file name:", `${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`);
  
  //   // Check if the video is already downloaded
  //   const isAlreadyDownloaded = downloadList.some(video => video.videoFileName === `${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`);
  //   console.log("isAlreadyDownloaded: ", isAlreadyDownloaded);
  
  //   if (isAlreadyDownloaded) {
  //     // If the video is already downloaded, navigate to the Downloads screen
  //     // navigate('/Downloads', { videoInfo: null },);
  //     handleImageClick()
  //   } else {
  //     // Start download and create a video object
  //     const video = {
  //       videodescription: desc1,
  //       videoImage: image,
  //       videotitle: title1,
  //       videoFileName: `${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`,
  //     };
  
  //     // Fetch existing downloaded videos from AsyncStorage
  //     let updatedDownloadList = [...downloadList, video];
  
  //     // Save the updated list to AsyncStorage
  //     try {
  //       await localStorage.setItem('DownloadedVideos', JSON.stringify(updatedDownloadList));
  //       console.log("Video downloaded and stored:", video);
  //     } catch (error) {
  //       console.error('Error saving downloaded video:', error);
  //     }
  
  //     // Navigate to the Downloads screen with the updated list
  //     // navigate('/Downloads', { videoInfo: video });
  //     handleImageClick()
  //   }
  // };
    const handleDownload = async () => {
      const userId = localStorage.getItem("user_id"); // Get the logged-in user ID
      if (!userId) {
        console.error("User ID not found");
        return;
      }
    
      // Fetch stored downloads for the user
      const storedData = localStorage.getItem(`DownloadedVideos_${userId}`);
      const userDownloadList = storedData ? JSON.parse(storedData) : [];
    
      console.log("downloadList", userDownloadList);
      console.log(
        "Download file name:",
        `${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`
      );
    
      // Check if the video is already downloaded
      const isAlreadyDownloaded = userDownloadList.some(
        (video) =>
          video.videoFileName ===
          `${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`
      );
    
      console.log("isAlreadyDownloaded: ", isAlreadyDownloaded);
    
      if (isAlreadyDownloaded) {
        successMessage('You have already downloaded this video!')
        setProgress(0);
        // handleImageClick();
      } else {
        // Create a video object
        const video = {
          videodescription: desc1,
          videoImage: image,
          videotitle: title1,
          videoFileName: `${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`,
        };
    
        // Update the user's download list
        const updatedDownloadList = [...userDownloadList, video];
    
        // Save to localStorage under the user-specific key
        try {
          localStorage.setItem(
            `DownloadedVideos_${userId}`,
            JSON.stringify(updatedDownloadList)
          );
          console.log("Video downloaded and stored:", video);
        } catch (error) {
          console.error("Error saving downloaded video:", error);
        }
    
        handleImageClick();
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
      successMessage('Download complete!');
      setTimeout(() => {
        setProgress(0);      // Reset progress
        setShowImage(true);   // Show the image again
      }, 2000); // Delay to allow the user to see the completed progress
    }
    
    
  }, [progress]);

  useEffect(() => {
    // Fetch the list of downloaded videos when the component mounts
    getDownloadedVideos();
  }, []);

  if (!openReportModal) return null;

  return (
    <div className='overall-container-rc'>
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
     <div  className='video-title-rc'>
        <PageTitle title={title1}/>
        </div>
        <div className='top-items-continer-rc'>
        
        {/* <div className='top-icons-container'>
          <div className='icon-img-01'>
            <img src='/assets/Vector.png')}  alt="" />
          </div>
          <div className='icon-img-02'>
          <img src='/assets/Vector (5).png')}  alt="" />
          </div>
          <div className='icon-img-03'>
          <img src='/assets/Vector (6).png')}  alt="" />
          </div>
        </div> */}
        </div>
<div  className='video-main-container-rc'>
  <div className='left-container-rc'>
        <div className='video-player-rc'
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => {setShowControls(false);setShowSettings(false);}}
        onTouchStart={() => setShowControls(true)}
onClick={handleClick}
        >
        {/* <video controls>
  <source 
  onError={(e)=>handelerror(e)}
    src="https://bodespherbucket.s3.ap-south-1.amazonaws.com/m3u8/1725366343859_Ger.m3u8" 
    type="application/x-mpegURL" 
  />
  Your browser does not support t
  he video tag.
</video> */}
{vidPath && chunkdatavedio1.length > 0 && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <ReactPlayer
          // pip={true}
          pip={false}
          key={uniqueKey}
          ref={playerRef}
          url={`${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`}
          // playing={!isPlaying}
          playing={true}
          playsinline={true}
          controls={true}  
          width="100%"
          height="100%"
          playbackRate={playbackRate}
          config={{
            file: {
              // forceHLS: true, // Force HLS for .m3u8 URLs
              attributes: {
                controlsList: 'nodownload', // Disable download controls
                crossOrigin: 'anonymous', // Enable cross-origin requests
              },
              // tracks: [
              //   { kind: 'subtitles', src: 'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt', srcLang: 'en', },
              //   { kind: 'subtitles', src: 'https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt', srcLang: 'ja' },
              // ],
            },
          }}
          onEnablePIP={handleEnablePip}
          onDisablePIP={handleDisablePip}
          onError={(e) => handelerror("Error loading video:", e)}
          onEnded={onEnd}
          onReady={() => setVideoLoaded(true)} // Show video only when ready
          style={{ visibility: videoLoaded ? "visible" : "hidden",
          // opacity:videoLoaded ? 1: 0,
          transition:"opacity 0.3s ease-in-out"
          }} // Hide until loaded
        />
  
        {isPipActive && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '75%',
              backgroundImage: `url("${ImagePath}${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // zIndex: -5000, 
            }}
          />
        )}
      </div>
  
)}
            
            {/* <div style={{
  width: '100px',
  height: '100px',
  backgroundImage: `url("https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/image_1725372907921.jpg")`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
}} /> */}
  



      {/* Backward Button */}
      <button
        onClick={() => handleSeek(-10)}
        style={styles.backwardButton}
        className="ios-hide"
      >
        <img src={backwardIcon} alt="Backward 10s" loading="lazy" style={styles.icon} />
      </button>

      {/* Forward Button */}
      <button
        onClick={() => handleSeek(10)}
        style={styles.forwardButton}
        className="ios-hide"
      >
        <img src={forwardIcon} alt="Forward 10s" loading="lazy" style={styles.icon} />
      </button>
        {/* <ReactPlayer width={400} height={300} controls
        onError={(e)=>handelerror(e)}
                                      url={require('https://bodespherbucket.s3.ap-south-1.amazonaws.com/m3u8/1725366343859_Ger.m3u8')}
                                    /> */}
            {/* <VideoPlayer url={'https://bodespherbucket.s3.ap-south-1.amazonaws.com/m3u8/1725366343859_Ger.m3u8'} /> */}
        {/* <Player
              ref={videoRef}
              fluid
              onPlay={handlePlayPause}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              source={vidPath+vname}
            >
              <source src={"https://bodespherbucket.s3.ap-south-1.amazonaws.com/m3u8/"+"1725366343859_Ger.m3u8"} />
              <BigPlayButton position="" />
              <ControlBar autoHide>
                <PlayToggle />
                <ForwardControl seconds={10} order={3.1} />
                <ReplayControl seconds={10} order={2.1} />
                <VolumeMenuButton vertical />
              </ControlBar>
            </Player> */}
            <div className='video-controls-container-rc'>
              {/* <div>
                <div className='video-control-1' style={{display: showControls ? 'flex' : 'none'}}>
                  <img src='/assets/rightwel.png')} loading="lazy" alt="" />
                </div>
              </div> */}
              <div className='video-controls-right-rc'>
                {/* <div className='video-control-2' onClick={handleEnablePip}>
                  <img src='/assets/videocontrol-2.png')} alt="" />
                </div>
                <div className='video-control-3' onClick={handleDisablePip}>
                  <img src='/assets/videocontrol-1.png')} alt="" />
                </div> */}
                <div className='video-control-4-rc' onClick={toggleSettings} style={{display: showControls ? 'flex' : 'none'}}>
                  <img src='/assets/videocontrol-3.png' loading="lazy" alt="" />
                </div>
                {showSettings && !showAudioSettings && !isPickerOpen && (
                  <div className='video-settings-rc'>
                    {/* <div className='settings-title'>Settings</div> */}
                    <ul>
                    {/* <li>
                    <label htmlFor="speed-select"
                     id="speed-select"
                     value={playbackSpeed}
                     onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}>Playback Speed:</label>
                    <select
                      id="speed-select"
                      value={playbackSpeed}
                      onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}
                    >
                      {speedOptions.map((speed) => (
                        <option key={speed} value={speed}>
                          {speed}x
                        </option>
                      ))}
                    </select>
                  </li> */}
                      {/* <li onClick={handleScreenshare}>Screenshare</li> */}
                      {/* <li onClick={toggleSubtitles}>Subtitles</li> */}
                      {/* <li onClick={showLanguageModal}>Select Language</li> */}
                      <li style={{ color: '#ff2424' }} onClick={openReportModal}>Report a Playback</li>
                    </ul>
                  </div>
                )}
                 <Modal isOpen={reportModal} onClose={closeReportModal}>
                  <div
                    className="signoutbtn-rs"
                    style={{ color: darkMode ? "white" : "black" }}
                  >
                    <h1>Report Playback Issue</h1>
                    <textarea
                      placeholder="Describe the issue..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <button onClick={handleSubmit}>Yes</button>
                    <h5 onClick={closeReportModal} style={{cursor:'pointer'}}>Cancel</h5>
                  </div>
                </Modal>

        {showAudioSettings && (
                  <div className='audio-settings-rc'>
                    <div className='title-container-rc'>
                      <div className='audio-title-rc'>Audio</div>
                      <div onClick={() => setShowAudioSettings(false)}>x</div>
                    </div>
                    <ul>
                      {audio_files.map((audio, index) => (
                        <li key={index}>
                          <input type="radio" name="audio" value={audio} />
                          {audio}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              {/* {showTimer && (
                  <div className="timer-settings">
                    <div className='timer-text'>How long would you like this track to play for?</div>
                    <div className='video-timer'>
                    <div className='time-left'>
                    <div className='item'>27</div>
                    <div>28</div>
                    <div>29</div>
                    </div>
                    <div className='time-right'>
                    <div>27</div>
                    <div>28</div>
                    <div>29</div>
                    </div>

                    </div>
                    <div className='time-btn'>
        <div className='time-c-btn'
        >Cancel</div>
        <div className='time-s-btn'>Next</div>
      </div>
                    </div>
                )} */}
            </div>
            
            
          </div>
          {/* <div className='video-buttons-container'>
            <div className='video-btn-1'>
              <img src='/assets/Repeat.png')} alt="" />
            </div>
            <div className='video-btn-2'  onClick={() => skipTime(-10)}>
              <img src='/assets/Skip Back.png')} alt="" />
            </div>
            <div className='video-btn-3' onClick={handlePlayPause}>
              <img src='/assets/Pause.png')} alt="" />
            </div>
            <div className='video-btn-4' onClick={() => skipTime(10)}>
              <img src='/assets/Skip Fwd.png')} alt="" />
            </div>
            <div className='video-btn-5' >
              <img src='/assets/Volume Up.png')} alt="" />
            </div>
          </div> */}
        </div>
        <div className='small-main-container-rc'>
        <div style={{display:'flex',flexDirection:'row',gap:'1rem',width:'50%'}}>

          <div className='small-div-1-rc'
           >
            <div className='small-icon-1-rc'>
              <img src='/assets/play-button.png' style={{filter:'invert(100%)'}} alt="play button" loading='lazy' />
            </div>
            <div className="small-text-1-rc"> {`${Math.floor(Math.round(duration) / 60)}:${Math.round(duration) % 60 < 10 ? '0' : ''}${Math.round(duration) % 60}`} min</div>
            </div>
          <div className='small-div-2-rc'
            >
            <div className='small-icon-2-rc'>
            <img src='/assets/Intencity.png' loading="lazy" alt="" />
            </div>
            <div className='small-text-2-rc'>
              {intensity}
            </div>
            {/* <div style={{marginLeft:'30px'}}>
            <img
              src={liked ? require('../../Assets/red-heart.png') : require('../../Assets/heart.png')}
              alt="Heart"
              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
              onClick={() => getCourseLikes(videoId)}
            />
            </div> */}
            </div>
            </div>
          
            <div className='new-ffav-rc'> {/* Container for right-aligned icons */}
    <div className="fav-icon-rc">
      {/* <img
        style={{filter:darkMode?'invert(100%)':'invert(0%)'}}
        src={liked ? require('../../Assets/red-heart.png') : require('../../Assets/heart.png')}
        alt="Heart"
        onClick={() => getCourseLikes(videoId)}
      /> */}
       {liked ?
          <img
              src='/assets/222heart.png'
              alt="Heart"
              // style={{ width: '50px', height: '50px', marginRight: '20px', cursor: 'pointer' }}
              onClick={() => getCourseLikes(videoId)}
            />
            :
             <img
              src='/assets/1111heart (1).png'
              alt="Heart"
              style={{filter:darkMode?'invert(100%)' :'invert(0%)'}}
              onClick={() => getCourseLikes(videoId)}
            />
          }
    </div>
    {showImage && (
        <div className="fav-icon1-rc" onClick={handleDownload}>
          <img
            style={{ filter: darkMode ? 'invert(0%)' : 'invert(100%)' }}
            src='/assets/download.png'
            alt="Download"
          />
        </div>
      )}
       { progress > 0 && (
        <div className='download-bar-00'>
          <CircularProgressbar  styles={{
    path: {
      stroke: '#FF5F67',
      strokeWidth: 10,
      transition: 'stroke-dashoffset 0.5s ease 0s',
    },
    trail: {
      stroke: '#d6d6d6',
    },
    text: {
      fill: '#FF5F67',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',  // Ensures the text is centered horizontally
      dominantBaseline: 'middle',  // Centers vertically
      textAnchor: 'middle',  // Ensures text is anchored at the center horizontally
      transform: 'translateY(0px)',  // Fine-tune vertical alignment if necessary
    },
  }} value={progress} text={`${progress}%`} />
        </div>
      )}
  </div>
        </div>

        <div className='video-description-rc'>
        <div className='video-disc-rc'>{title1}</div>
        <div className='video-para-rc'>{desc1}</div>
        </div>
        </div>
        <div className='overall-videos-rc'>
       {renderCourseContent()}
        <Modal isOpen={upgradeModal} onClose={handleUpgradeclose}>
          <div className='overall-upgrade-container-rc'>
            <div className='upgrade-icon-rc'>
              <img src='/assets/ic_round-workspace-premium.png' loading="lazy" alt="" />
            </div>
            <div className='upgrade-text-container-rc'>
              <div className='upgrade-title-rc'>
              UPGRADE TO <br /> PREMIUM
              </div>
              <div className='upgrade-subtext-rc'>
                When you subscribe,you'll get <br />instant unlimited access
              </div>
            </div>

            <div className='upgrade-btn-container-rc'>
              <div  className='upgrade-btn-rc' onClick={handlePremiumModalOpen}>Be Premium</div>
              <div className='up-cancel-btn-rc'>Cancel</div>
            </div>
           
          </div>
          </Modal>
          <Modal isOpen={getPremiumModal} onClose={handlePremiumModalClose} >
        <div>
          <div className="premium-top-title-rc">BE PREMIUM</div>
          <div className="premium-title-rc">Get Unlimited <br /> Access</div>
          <div className="premium-text-rc">When you subscribe, you’ll get <br />
          instant unlimited access</div>

          <div >
            <div className='radio-container-rc'style={{backgroundColor: selectedOption==='monthly' ? '#FF5F6747':'#2c2c2e'}} >
              <input type="radio"
               name="option"
               id="radio1" 
              value='monthly'
               onChange={handleRadioChange}
               checked={selectedOption==='monthly'}
               />
              <div className="radio-contents-container-1-rc" for='radio1'>
                <div>
                  <div className="radio-head-1-rc">Monthly</div>
                  <div className="radio-tail-1-rc" style={{color: selectedOption === 'monthly' ? '#ff5f67':'#ffffff',}}>Pay monthly</div>
                </div>
              <div className="radio-right-container-rc">
                <div className="radio-right-rc">
                  <sup>$</sup>
                  19.99
                  <sub>/m</sub></div>
              </div>
            </div>
            </div>
            <div className='radio-container-rc'style={{backgroundColor: selectedOption==='yearly' ? '#FF5F6747':'#2c2c2e'}}>
              <input type="radio"
               name="option"
                id="radio2"
                 value="yearly"
                   onChange={handleRadioChange}
               checked={selectedOption==='yearly'}
               />
              <div className="radio-contents-container-2-rc">
                <div>
                  <div className="radio-head-2-rc">Yearly</div>
                  <div className="radio-tail-2-rc" style={{color: selectedOption==='yearly' ?'#ff5f67':'#ffffff'}}>Pay for full year</div>
                </div>
              <div className="radio-right-container-2-rc">
                <div className="radio-right-2-rc">
                  <sup>$</sup>
                  129.99
                  <sub>/y</sub></div>
              </div>
            </div>
            </div>
          </div>
        <div className="modal-premium-btn-rc">Subscribe Now</div>

        </div>
        </Modal>
        </div>
        <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

</div>      
    </div>
  )
  
}

