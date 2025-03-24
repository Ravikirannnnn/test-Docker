import React, { useEffect } from 'react';
import './PlayVideo.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import ReactPlayer from 'react-player';
import { themeContext } from '../../Context'
import { useContext ,useState,useRef} from 'react';
import { Navigate, useLocation ,useNavigate} from 'react-router-dom';
import TimerPicker from '../../Components/Loader/Other/Timer';
import Modal from "../../Components/Loader/Modal/Modal";
import { API_URL4000, API_URL4004, errorMessage, ImagePath, successMessage, vidPath } from '../../Service/ApiService';
import 'react-circular-progressbar/dist/styles.css'; 
import forwardIcon from '/assets/forward.png'; // Adjust the path as needed
import backwardIcon from '/assets/backward.png'; // Adjust the path as needed
import Swal from 'sweetalert2';
import { CircularProgressbar } from 'react-circular-progressbar';
import { toast, Toaster } from 'react-hot-toast';


export default function PlayVideos() {
  const location=useLocation();
  const navigate=useNavigate()
  const {id,tid,vname,title,desc,lenimg,file,downloadFileName,audio_files,category_id,chunkdatavedio,Duration,intensity,likes,sub_Cat_ids,cat_image,fav}=location.state || {}
  console.log(likes,'1010');
  // console.log(vname,'vname',chunkdatavedio[0].vid_name,'chunvid',downloadFileName,'download');
  // console.log(chunkdatavedio,'chunkdatavedio',uniqueKey)
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [showSettings, setShowSettings] = useState(false);
  const [showAudioSettings,setShowAudioSettings]=useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [videoId, setVideoId] = useState(id);
  const [title1, setTitle1] = useState(title);
  const [desc1, setDesc1] = useState(desc);
  const [image, setImage] = useState(lenimg);
  const [VideoImage, setVideoImage] = useState(lenimg);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // const [duration, setDuration] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [upgradeModal,setUpgradeModal]=useState(false);
  const [getPremiumModal,setGetPremiumModal]=useState(false);
  const [selectedOption, setSelectedOption] = useState('monthly');
  const [showControls, setShowControls] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedItem,setSelectedItem]=useState([])
  const [data, setData] = useState([])
  const [chunkdatavedio1, setChunkDataVedio1] = useState(chunkdatavedio);
  const [isAudioPressed, setIsAudioPressed] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [liked, setLiked] = useState(likes);
  const [duration, setDuration] = useState(Duration); // Initialize with 0 or any default value
  const [timeInSecondss, setTimeInSeconds] = useState(duration);
  const [progress, setProgress] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [description, setDescription] = useState("");
  const [reportModal, setReportModal] = useState(false);
  const [newDuration,setNewDuration]=useState(0);
  const [isClicked, setIsClicked] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setIsClicked(!isClicked); // Toggle clicked state
    setShowControls(!isClicked); // Toggle controls based on clicked state
};

  const handleDuration = (totalTime) => {
    console.log("Total duration:", totalTime); // Check the returned value
    if (!isNaN(totalTime)) {
      setNewDuration(totalTime); // Update the state with the valid duration
    }
  };

  console.log(Number(duration).toFixed(2),'Number(duration).toFixed(2)')
  const openReportModal = () => {
    setReportModal(true);
  };
  const closeReportModal = () => {
    setReportModal(false);
  };
  // State to track if the task is completed
  const [isCompleted, setIsCompleted] = useState(false);
  // Update timeInSeconds when duration changes
  useEffect(() => {
    setTimeInSeconds(Duration);
    setImage(lenimg)
  }, [duration]);
  
  console.log(likes,'likeeeee')
  useEffect(() => {
    if (!openReportModal) {
      setDescription(""); // Reset description when modal is closed
    }
  }, [openReportModal]);

  const formatTimes = (Duration) => {
    const minutes = Math.floor(Duration / 60);
    const remainingSeconds = Duration % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

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
  const handleInsideCategory = (selectedView) => {
    const view = selectedView;
    navigate('/InsideCategory', {state:{view,sub_Cat_ids,cat_image} });
    console.log(selectedView,'fdfdfd',sub_Cat_ids,cat_image)
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
  //     preConfirm: (text) => {
  //       if (!text) {
  //         Swal.showValidationMessage('Please enter a description of the issue');
  //         return false;
  //       }
  //       return text;
  //     }
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
          Swal.fire({
            icon: 'success',
            title: 'Report Submitted',
            text: 'Thank you for reporting the issue!',
          });
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
console.log(chunkdatavedio);

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
 const toggleControls = () => setShowControls((prev) => !prev);

  useEffect(() => {
    let timer;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 3000); // Auto-hide controls after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showControls]);
  
const getVideoNameByLanguage = (language) => {
  const videoItem = chunkdatavedio1.find(item => item.language_name === language);
  return videoItem ? videoItem.vid_name : chunkdatavedio1[0].vid_name; 
};


useEffect(() => {
  getYogaTalksFav();
  getAllCategory();
  // getCourseLikes()
  // console.log(liked)
}, []);

const getCategoryById = async (category) => {
  const accessToken = await localStorage.getItem('accessToken');
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', 'Bearer ' + accessToken);

  const raw = JSON.stringify({ id: category });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(API_URL4000 + 'getCategoryByIdNew', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result,'reresult')
      setLiked(result.response.subcategories.isliked);
    })
    .catch((error) => console.error(error));
};
const getYogaTalksFav = () => {
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('accessToken');

  if (!user_id || !token) {
    console.error("User ID or Access Token is missing");
    return;
  }

  console.log("Calling getYogaTalksFav with user_id:", user_id); // Check if function is called

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer " + token);

  const raw = JSON.stringify({ "user_id": user_id });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(API_URL4000 + "getaddSubCategoryNewLikesForVideo", requestOptions)
    .then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok", response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      console.log("API Result:", result); // Check the API response here
      if (result.status === true) {
        console.log(result.response);
        // setData2(result.response);
      } else {
        console.warn("API returned status false", result);
      }
    })
    .catch((error) => console.error("Fetch error:", error));
};


const handleVideoChange = (selectedItem) => {
  setVideoLoaded(false);
  // console.log(selectedItem);
  setIsPipActive(false)
  const chunkData = selectedItem.chunk_data;
  setSelectedItem(selectedItem)
  setChunkDataVedio1(chunkData);
  setVideoId(selectedItem._id);
  setTitle1(selectedItem.lesson_title) 
  setDesc1(selectedItem.description)
  setImage(selectedItem.subcategory_img)
  setLiked(selectedItem.isLiked)
  setVideoImage(selectedItem.lesson_img)
  setDuration(selectedItem?.Duration)
};
console.log(selectedItem,'selec')
const uniqueKey = `${chunkdatavedio1[0]._id}-${getVideoNameByLanguage(language)}`;
const uniqueId = `${chunkdatavedio1[0]._id}`
console.log(chunkdatavedio,'chunkdatavedio',uniqueId)

const handleAudioPress = () => {
  setIsAudioPressed(true);
};

const handleEnablePip = () => {
  setIsPipActive(true); // PiP is activated
};

const handleDisablePip = () => {
  setIsPipActive(false); // PiP is deactivated
};

// const renderCourseContent = () => {
//   const filteredSections = Object.keys(groupedData); // Get all sections without filtering by videoId
//   // console.log(filteredSections, 'filtered');

//   return (
//     <>
//       <div className='less-ply'>Lessons</div>
//       {filteredSections.map((section, sectionIndex) => (
//         <div key={sectionIndex} className="section-container-ply">
//           {/* Section heading with dropdown */}
//           <div className="section-heading-ply" style={{backgroundColor: darkMode ? 'rgb(44, 44, 46)' : '#f7f9fa'}} onClick={() => toggleSection(section)}>
//             {`Section ${sectionIndex + 1}: ${section}`}
//             <span className="dropdown-arrow-ply">
//               {openSection === section ? "▲" : "▼"}
//             </span>
//           </div>

//           {/* Display items if the section is open */}
//           {openSection === section && (
//             <div className="section-items-ply">
//               {groupedData[section].map((item, itemIndex) => ( // Remove filter condition
//                 <div
//                   key={item._id}
//                   className="video-right-container-ply"
//                   onClick={() => handleVideoChange(item)} // Change video on click
//                 >
//                   <div className="right-midle-ply">
//                     <div className="video-text-00-ply">
//                       {`${itemIndex + 1}. ${item.lesson_title}`}
//                     </div>
//                     <div className="video-time-ply">{Math.round(item.Duration)} min</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

console.log(liked,'liked')
const getAllCategory = async () => {
  const accessToken =  localStorage.getItem('accessToken');
  const myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + accessToken);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(API_URL4000 + 'getAllCategoriesNew', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result,'result')
      if (result.Status === true) {
        // setCategory(result.response);
        // setSelectedCategory(result.response[0]?._id);
        // getCategoryById(result.response[0]?._id);
      }
    })
    .catch((error) => console.error(error));
};

const getCourseLikes = async (vid,likes) => {
  console.log(uniqueId,'vid');
  
  const user_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('accessToken');
  //  console(vid,'vido')
  try {
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+token);

const raw = JSON.stringify({
  "video_id": [uniqueId],
  "user_id": user_id,
  "isliked":likes
});
console.log('raw',raw)
const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

const response = await fetch(API_URL4000 + "addSubCategoryNewLike", requestOptions);
const result = await response.json();

if (result.status) {
  console.log(result);
  setLiked(!liked);
  getAllCategory();
  getYogaTalksFav()
  // getCourse()
} else {
  console.log("Error liking the course", result);
}
} catch (error) {
console.error("Error:", error);
}
};
const [downloadList, setDownloadList] = useState([]);

  // Function to fetch downloaded videos from AsyncStorage
  const getDownloadedVideos = async () => {
    try {
      const downloadedVideos = await localStorage.getItem('DownloadedVideos');
      const videos = downloadedVideos ? JSON.parse(downloadedVideos) : [];
      setDownloadList(videos);
    } catch (error) {
      console.error('Error retrieving downloaded videos:', error);
    }
  };

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
// const handleDownload = async () => {
//   try {
//     const response = await fetch(`${encodeURI(vidPath)}${encodeURIComponent(getVideoNameByLanguage(language))}`);
//     const blob = await response.blob();
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const base64Video = reader.result; // Convert blob to base64
//       const videos = JSON.parse(localStorage.getItem('downloadedVideos')) || [];
//       videos.push({ url: base64Video, name: title1 });
//       localStorage.setItem('downloadedVideos', JSON.stringify(videos));
      
//       navigate('/Downloads'); // Navigate to the downloads page
//     };

//     reader.readAsDataURL(blob);
//   } catch (error) {
//     console.error('Error downloading the video:', error);
//   }
// };
if (!openReportModal) return null;
console.log(vidPath+chunkdatavedio1[0]?.vid_name,'chunkdatavedio1[0]?.vid_name');
  return (
    <div className='overall-container-ply'>
       <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
     <div  className='video-title-ply'>
        <PageTitle title={title1}/>
        </div>
        <div className='top-items-continer-ply'>
        
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
<div  className='video-main-container-ply'>
  <div className='left-container-ply'>
        <div className='video-player-ply'
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
          url={`${encodeURI(vidPath)}${encodeURIComponent(chunkdatavedio1[0]?.vid_name)}`}
          // playing={!isPlaying}
          playing={true}
          // muted={true}
          playsinline={true}
          controls={true}  
          width="100%"
          height="100%"
          onDuration={handleDuration}
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
          onError={(e) => handelerror('Error loading video:', e)}
          onEnded={onEnd}
          onReady={() => setVideoLoaded(true)} // Show video only when ready
          style={{ visibility: videoLoaded ? "visible" : "hidden",
          opacity:videoLoaded ? 1: 0,
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
            <div className='video-controls-container-ply'>
              {/* <div>
                <div className='video-control-1' style={{display: showControls ? 'flex' : 'none'}}>
                  <img src='/assets/rightwel.png')} loading="lazy" alt="" />
                </div>
              </div> */}
              <div className='video-controls-right-ply'>
                {/* <div className='video-control-2' onClick={handleEnablePip}>
                  <img src='/assets/videocontrol-2.png')} alt="" />
                </div>
                <div className='video-control-3' onClick={handleDisablePip}>
                  <img src='/assets/videocontrol-1.png')} alt="" />
                </div> */}
                
                <div className='video-control-4-ply' onClick={toggleSettings} style={{display: showControls ? 'block' : 'none'}}>
                  <img src='/assets/videocontrol-3.png' loading="lazy" alt="" />
                </div>
                {showSettings && !showAudioSettings && !isPickerOpen && (
                  <div className='video-settings-ply' >
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
                    className="signoutbtn-ps"
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
                  <div className='audio-settings-ply'>
                    <div className='title-container-ply'>
                      <div className='audio-title-ply'>Audio</div>
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
        <div className="small-main-container-ply">
  <div className="small-div-1-ply">
    <div className="small-icon-1-ply">
      <img src='/assets/play-button.png'
      style={{ filter: "invert(100%)" }}
       loading="lazy" alt="" />
    {/* <div className="small-text-1-ply"> */}
    </div>
    <span>
      {`${Math.floor(Math.round(Number(newDuration).toFixed(2)) / 60)}:${Math.round(Number(newDuration).toFixed(2)) % 60 < 10 ? '0' : ''}${Math.round(Number(newDuration).toFixed(2)) % 60}`}min
    </span>
    </div>
  {/* </div> */}

 


  <div className='new-ffav-ply' style={{float:'right'}}>
  {/* <div className="dropdown-icon">
      <img
      style={{filter:darkMode ? 'invert(100%)':'invert(0%)'}}
        src='/assets/vidcategory.png')}
        alt="Menu"
        className="icon"
      />
      <div className="dropdown-content">
        <div onClick={()=>handleInsideCategory('OverView')}>OverView</div>
        <div onClick={()=>handleInsideCategory('Resources')}>Resource</div>
        <div onClick={()=>handleInsideCategory('Lessons')}>Lessons</div>
        <div onClick={()=>handleInsideCategory('Q&A')}>Test</div>
      </div>
    </div> */}
    <div className="fav-icon-ply">
      {/* <img
        style={{filter:darkMode?'invert(100%)':'invert(0%)'}}
        src={liked ? require('../../Assets/red-heart.png') : require('../../Assets/heart.png')}
        alt="Heart"
        onClick={() => getCourseLikes(videoId)}
      /> */}
      {fav ?'':
      <div>
       {liked ?
          <img
              src='/assets/222heart.png'
              alt="Heart"
              // style={{ width: '50px', height: '50px', marginRight: '20px', cursor: 'pointer' }}
              onClick={() => getCourseLikes(chunkdatavedio[0]._id,false)}
            />
            :
             <img
              src='/assets/1111heart (1).png'
              alt="Heart"
              style={{filter:darkMode?'invert(100%)' :'invert(0%)'}}
              onClick={() => getCourseLikes(chunkdatavedio[0]._id,true)}
            />
          }
          </div>
        }
    </div>
    {showImage && (
        <div className="fav-icon1-ply" onClick={handleDownload}>
          <img
            style={{ filter: darkMode ? 'invert(0%)' : 'invert(100%)' }}
            src='/assets/download.png'
            alt="Download"
          />
        </div>
      )}
   { progress > 0 && (
        <div className='download-bar'>
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
      fill: '#FF5F67 !important',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',  // Ensures the text is centered horizontally
      dominantBaseline: 'middle',  // Centers vertically
      textAnchor: 'middle',  // Ensures text is anchored at the center horizontally
      transform: 'translateY(0px)',  // Fine-tune vertical alignment if necessary
    },
  }}

   value={progress} text={`${progress}%`} />
        </div>
       )} 
  </div>
</div>

        <div className='video-description-ply'>
        <div className='video-disc-ply'>{title1}</div>
        <div className='video-para-ply'>{desc1}</div>
        </div>
        </div>
      
</div>      
    </div>
  )
  
}

