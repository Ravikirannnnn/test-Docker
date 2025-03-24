import React, { useEffect } from "react";
import "./VideoScreen.css";
import PageTitle from "../../Components/Loader/Other/PageTitle";
import ReactPlayer from "react-player";
import { themeContext } from "../../Context";
import { useContext, useState, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import TimerPicker from "../../Components/Loader/Other/Timer";
import Modal from "../../Components/Loader/Modal/Modal";
import {
  API_URL4004,
  errorMessage,
  ImagePath,
  successMessage,
  vidPath,
} from "../../Service/ApiService";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import forwardIcon from "/assets/forward.png"; // Adjust the path as needed
import backwardIcon from "/assets/backward.png"; // Adjust the path as needed
import Swal from "sweetalert2";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function VideoScreen() {
  // const { data1,lessons } = useSelector((state) => state.lessons);
  // console.log(data1);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
    tid,
    vname,
    title,
    desc,
    lenimg,
    file,
    downloadFileName,
    audio_files,
    category_id,
    chunkdatavedio,
    Duration,
    intensity,
    likes,
    sub_Cat_ids,
    cat_image,
    NewId,
  } = location.state || {};
  // console.log(likes,'1010');
  // console.log(vname,'vname',chunkdatavedio[0].vid_name,'chunvid',downloadFileName,'download');
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [showSettings, setShowSettings] = useState(false);
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);
  const [videoId, setVideoId] = useState(id);
  const [LikedId, setLikedId] = useState(NewId);
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
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [getPremiumModal, setGetPremiumModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [showControls, setShowControls] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedItem, setSelectedItem] = useState([]);
  const [data, setData] = useState([]);
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
  const [isClicked, setIsClicked] = useState(false);

  const [videoLoaded, setVideoLoaded] = useState(false);
  // const [castSession, setCastSession] = useState(null);

  // useEffect(() => {
  //   if (window.chrome && window.chrome.cast) {
  //     window.chrome.cast.initialize(
  //       new window.chrome.cast.ApiConfig(
  //         new window.chrome.cast.SessionRequest(window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID),
  //         (session) => setCastSession(session),
  //         (error) => console.error("Chromecast error:", error)
  //       )
  //     );
  //   }
  // }, []);

  // const startCasting = () => {
  //   if (!castSession) return alert("Chromecast not available.");

  //   const mediaInfo = new window.chrome.cast.media.MediaInfo(playerRef.current.props.url, "video/mp4");
  //   const request = new window.chrome.cast.media.LoadRequest(mediaInfo);

  //   castSession.loadMedia(request, () => console.log("Casting started"), console.error);
  // };

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
  // Update timeInSeconds when duration changes
  useEffect(() => {
    setTimeInSeconds(Duration);
    setImage(lenimg);
  }, [duration]);

  useEffect(() => {
    if (!openReportModal) {
      setDescription(""); // Reset description when modal is closed
    }
  }, [openReportModal]);

  const formatTimes = (Duration) => {
    const minutes = Math.floor(Duration / 60);
    const remainingSeconds = Duration % 60;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const groupedData = data.reduce((acc, item) => {
    const section = item?.headings || "Section 1"; // Default to Section 1 if no section provided
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
    navigate("/InsideCategory", { state: { view, sub_Cat_ids, cat_image } });
    console.log(selectedView, "fdfdfd", sub_Cat_ids, cat_image);
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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
    console.log(videoRef);

    const track = videoRef.current.textTracks[0];
    track.mode = showSubtitles ? "showing" : "hidden";
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
      console.error("Error accessing display media.", error);
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

    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");
    // const { id, tid, vaname ,} = route?.params;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      lesson_id: videoId,
      category_id: category_id,
      user_id: user_id,
    });

    console.log("the lessonCompleted raw", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4004 + "lessonCompletedNewFlow", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log("lessonCompleted", result))
      .catch((error) => console.log("error", error));
  };

  const handleSubmitReport = async (reportText) => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");
    console.log("Report submitted:", user_id);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      video_id: id,
      message: reportText,
      user_id: user_id,
    });

    // console.log("video report", raw)

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4004 + "reportPlayBack", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("reportPlayBack", result);
        if (result.status === true) {
          successMessage("Thank you for reporting the issue!");

          // Swal.fire({
          //   icon: 'success',
          //   title: 'Report Submitted',
          //   text: 'Thank you for reporting the issue!',
          // });
        }
        // else {
        // }
      })
      .catch((error) => {
        console.log("error", error);
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
      playerRef.current.seekTo(currentTime + seconds, "seconds");
    }
  };

  const handelerror = (message, e) => {
    console.error(message, e);
  };

  const styles = {
    backwardButton: {
      position: "absolute",
      top: "50%",
      left: "10%",
      transform: "translateY(-50%)",
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: "none",
      borderRadius: "50%",
      padding: "10px",
      cursor: "pointer",
      zIndex: 1,
      display: showControls ? "block" : "none", // Show/hide based on state
    },
    forwardButton: {
      position: "absolute",
      top: "50%",
      right: "10%",
      transform: "translateY(-50%)",
      // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: "none",
      borderRadius: "50%",
      padding: "10px",
      cursor: "pointer",
      zIndex: 1,
      display: showControls ? "block" : "none", // Show/hide based on state
    },

    icon: {
      width: "24px",
      height: "24px",
    },
  };

  const toggleControls = () => setShowControls((prev) => !prev);

  useEffect(() => {
    let timer;
    if (showControls) {
      timer = setTimeout(() => setShowControls(false), 3000); // Auto-hide controls after 3 seconds
    }
    return () => clearTimeout(timer);
  }, [showControls]);

  // Helper function to safely handle slashes between path and file name
  function ensureTrailingSlash(path) {
    return path.replace(/\/+$/, "") + "/"; // Remove trailing slashes and ensure one at the end
  }

  // Ensure input safety by trimming and defaulting to an empty string if null/undefined
  const safeVidPath = vidPath?.trim() || "";
  const safeVidName = chunkdatavedio1?.[0]?.vid_name?.trim() || "";

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
  const availableLanguages = chunkdatavedio1?.map(
    (item) => item?.language_name
  );
  const [language, setLanguage] = useState(availableLanguages[0]);

  // const showLanguageModal = () => {
  //   setShowSettings(false)
  //   const inputOptions = availableLanguages?.reduce((options, lang) => {
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
  //     if (result?.isConfirmed) {
  //       const selectedLanguage = result.value;
  //       setLanguage(selectedLanguage);
  //     }
  //   });
  // }

  const getVideoNameByLanguage = (language) => {
    const videoItem = chunkdatavedio1?.find(
      (item) => item.language_name === language
    );
    return videoItem ? videoItem?.vid_name : chunkdatavedio1[0]?.vid_name;
  };

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      category_id: category_id,
      user_id: user_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4004 + "getLessonsNewFlow", requestOptions)
      .then((response) => response.json())

      .then((result) => {
        console.log("API Response:", result);

        if (result.Status === true) {
          console.log("advvf", result);
          setData(result?.data);
        } else {
          console.log("Error in response:", result);
        }
      })

      .catch((error) => console.log("error", error));
  };

  const handleVideoChange = (selectedItem) => {
    setVideoLoaded(false);
    console.log(selectedItem.chunk_data[0]._id);
    setIsPipActive(false);
    const chunkData = selectedItem?.chunk_data;
    setSelectedItem(selectedItem);
    setChunkDataVedio1(chunkData);
    setVideoId(selectedItem?._id);
    setLikedId(selectedItem.chunk_data[0]._id);
    setTitle1(selectedItem?.lesson_title);
    setDesc1(selectedItem?.description);
    setImage(selectedItem?.subcategory_img);
    setLiked(selectedItem?.isLiked);
    setVideoImage(selectedItem?.lesson_img);
    setDuration(selectedItem?.Duration)
  };
  // console.log(selectedItem,'selec')
  const uniqueKey = `${chunkdatavedio1[0]._id}`
  // -${getVideoNameByLanguage(
  //   language)}`;

  const handleAudioPress = () => {
    setIsAudioPressed(true);
  };

  const handleEnablePip = () => {
    setIsPipActive(true); // PiP is activated
  };

  const handleDisablePip = () => {
    setIsPipActive(false);
  };

  const renderCourseContent = () => {
    const filteredSections = Object.keys(groupedData); // Get all sections without filtering by videoId
    // console.log(filteredSections, 'filtered');

    return (
      <>
        <div className="less">Lessons</div>
        {filteredSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="section-container">
            {/* Section heading with dropdown */}
            <div
              className="section-heading"
              style={{
                backgroundColor: darkMode ? "rgb(44, 44, 46)" : "#f7f9fa",
              }}
              onClick={() => toggleSection(section)}
            >
              {`Section ${sectionIndex + 1}: ${section}`}
              <span className="dropdown-arrow">
                {openSection === section ? "▲" : "▼"}
              </span>
            </div>

            {/* Display items if the section is open */}
            {openSection === section && (
              <div className="section-items">
                {groupedData[section].map(
                  (
                    item,
                    itemIndex // Remove filter condition
                  ) => (
                    <div
                      key={item._id}
                      className="video-right-container"
                      onClick={() => handleVideoChange(item)} // Change video on click
                    >
                      <div className="right-midle">
                        <div className="video-text-00">
                          {`${itemIndex + 1}. ${item.lesson_title}`}
                        </div>
                        {/* <div className="video-info">
                        {item.description}
                        </div> */}
                        <div className="video-time">
                        {`${Math.floor(Math.round(item?.Duration) / 60)}:${Math.round(item?.Duration) % 60 < 10 ? '0' : ''}${Math.round(item?.Duration) % 60}`} min
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  const getCourseLikes = async (vid) => {
    console.log(vid);

    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);

      const raw = JSON.stringify({
        video_id: [vid],
        user_id: user_id,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        API_URL4004 + "like_lessons",
        requestOptions
      );
      const result = await response.json();

      if (result.status) {
        console.log(result);
        setLiked(!liked);
        getCourse();
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
      const downloadedVideos = await localStorage.getItem("DownloadedVideos");
      const videos = downloadedVideos ? JSON.parse(downloadedVideos) : [];
      setDownloadList(videos);
    } catch (error) {
      console.error("Error retrieving downloaded videos:", error);
    }
  };

  // Handle the download logic
  // const handleDownload = async () => {
  //   console.log("downloadList", downloadList);
  //   console.log(
  //     "Download file name:",
  //     `${encodeURI(vidPath)}${encodeURIComponent(
  //       getVideoNameByLanguage(language)
  //     )}`
  //   );

  //   // Check if the video is already downloaded
  //   const isAlreadyDownloaded = downloadList.some(
  //     (video) =>
  //       video.videoFileName ===
  //       `${encodeURI(vidPath)}${encodeURIComponent(
  //         getVideoNameByLanguage(language)
  //       )}`
  //   );
  //   console.log("isAlreadyDownloaded: ", isAlreadyDownloaded);

  //   if (isAlreadyDownloaded) {
  //     // If the video is already downloaded, navigate to the Downloads screen
  //     // navigate('/Downloads', { videoInfo: null },);
  //     handleImageClick();
  //   } else {
  //     // Start download and create a video object
  //     const video = {
  //       videodescription: desc1,
  //       videoImage: image,
  //       videotitle: title1,
  //       videoFileName: `${encodeURI(vidPath)}${encodeURIComponent(
  //         getVideoNameByLanguage(language)
  //       )}`,
  //     };

  //     // Fetch existing downloaded videos from AsyncStorage
  //     let updatedDownloadList = [...downloadList, video];

  //     // Save the updated list to AsyncStorage
  //     try {
  //       await localStorage.setItem(
  //         "DownloadedVideos",
  //         JSON.stringify(updatedDownloadList)
  //       );
  //       console.log("Video downloaded and stored:", video);
  //     } catch (error) {
  //       console.error("Error saving downloaded video:", error);
  //     }

  //     // Navigate to the Downloads screen with the updated list
  //     // navigate('/Downloads', { videoInfo: video });
  //     handleImageClick();
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
  
  // Function to remove downloads for a specific user

  
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
      successMessage("Download complete!");
      setTimeout(() => {
        setProgress(0); // Reset progress
        setShowImage(true); // Show the image again
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
  // console.log(vidPath+chunkdatavedio1[0]?.vid_name,'chunkdatavedio1[0]?.vid_name');

  return (
    <div className="overall-container">
      <Toaster
        toastOptions={{
          style: { backgroundColor: "#222122", color: "#fff" },
        }}
      />
      <div className="video-title-444">
        <PageTitle title={title1} />
      </div>
      <div className="top-items-continer">
        {/* <div className='top-icons-container'>
          <div className='icon-img-01'>
            <img src={require('../../Assets/Vector.png')}  alt="" />
          </div>
          <div className='icon-img-02'>
          <img src={require('../../Assets/Vector (5).png')}  alt="" />
          </div>
          <div className='icon-img-03'>
          <img src={require('../../Assets/Vector (6).png')}  alt="" />
          </div>
        </div> */}
      </div>
      <div className="video-main-container">
        <div className="left-container">
          <div
            className="video-player"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => {
              setShowControls(false);
              setShowSettings(false);
            }}
            // onClick={toggleControls}
            onTouchStart={() => setShowControls(true)}
            onClick={handleClick}
            // onTouchEnd={() => setShowControls(false)}
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
            {vidPath && chunkdatavedio1?.length > 0 && (
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <ReactPlayer
                  // pip={false}
                  pip={false}
                  key={uniqueKey}
                  ref={playerRef}
                  url={`${encodeURI(vidPath)}${encodeURIComponent(
                    chunkdatavedio1[0]?.vid_name
                  )}`}
                  // playing={!isPlaying}
                  playing={true}
                  // muted={true}
                  playsinline={true} // Important for iOS
                  controls={true}
                  width="100%"
                  height="100%"
                  playbackRate={playbackRate}
                  config={{
                    file: {
                      // forceHLS: true, // Force HLS for .m3u8 URLs
                      attributes: {
                        controlsList: "nodownload", // Disable download controls
                        crossOrigin: "anonymous", // Enable cross-origin requests
                        
                      },
                      // tracks: [
                      //   {
                      //     kind: "subtitles",
                      //     src: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt",
                      //     srcLang: "en",
                      //   },
                      //   {
                      //     kind: "subtitles",
                      //     src: "https://bitdash-a.akamaihd.net/content/sintel/subtitles/subtitles_en.vtt",
                      //     srcLang: "ja",
                      //   },
                      // ],
                    },
                  }}
                  onEnablePIP={handleEnablePip}
                  onDisablePIP={handleDisablePip}
                  onReady={() => setVideoLoaded(true)} // Show video only when ready
                  onError={(e) => handelerror("Error loading video:", e)}
                  onEnded={onEnd}
                  style={{ visibility: videoLoaded ? "visible" : "hidden",
                    opacity:videoLoaded ? 1: 0,
                    transition:"opacity 0.3s ease-in-out"
                   }} // Hide until loaded

                />

                {isPipActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "75%",
                      backgroundImage: `url("${ImagePath}${image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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
              <img
                src={backwardIcon}
                alt="Backward 10s"
                loading="lazy"
                style={styles.icon}
              />
            </button>

            {/* Forward Button */}
            <button onClick={() => handleSeek(10)} style={styles.forwardButton} className="ios-hide">
              <img
                src={forwardIcon}
                alt="Forward 10s"
                loading="lazy"
                style={styles.icon}
              />
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
            <div className="video-controls-container">
              {/* <div>
                <div className='video-control-1' style={{display: showControls ? 'flex' : 'none'}}>
                  <img src={require('../../Assets/rightwel.png')} loading="lazy" alt="" />
                </div>
              </div> */}
              <div className="video-controls-right">
                {/* <div className='video-control-2' onClick={handleEnablePip}>
                  <img src={require('../../Assets/videocontrol-2.png')} alt="" />
                </div>
                <div className='video-control-3' onClick={handleDisablePip}>
                  <img src={require('../../Assets/videocontrol-1.png')} alt="" />
                </div> */}
                <div
                  className="video-control-4"
                  onClick={toggleSettings}
                  style={{ display: showControls ? "block" : "none" }}
                >
                  <img
                    src="/assets/videocontrol-3.png"
                    loading="lazy"
                    alt=""
                  />
                </div>
                {showSettings && !showAudioSettings && !isPickerOpen && (
                  <div className="video-settings">
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
                    <li
                      style={{ color: "#ff2424" }}
                      onClick={openReportModal}
                    >
                      Report a Playback
                    </li>
                    {/* <li
                      style={{ color: "#ff2424" }}
                      onClick={startCasting}
                    >
                      Start casting
                    </li> */}
                    </ul>
                  </div>
                )}
                <Modal isOpen={reportModal} onClose={closeReportModal}>
                  <div
                    className="signoutbtn-vs"
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
                  <div className="audio-settings">
                    <div className="title-container">
                      <div className="audio-title">Audio</div>
                      <div onClick={() => setShowAudioSettings(false)}>x</div>
                    </div>
                    <ul>
                      {audio_files?.map((audio, index) => (
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
              <img src={require('../../Assets/Repeat.png')} alt="" />
            </div>
            <div className='video-btn-2'  onClick={() => skipTime(-10)}>
              <img src={require('../../Assets/Skip Back.png')} alt="" />
            </div>
            <div className='video-btn-3' onClick={handlePlayPause}>
              <img src={require('../../Assets/Pause.png')} alt="" />
            </div>
            <div className='video-btn-4' onClick={() => skipTime(10)}>
              <img src={require('../../Assets/Skip Fwd.png')} alt="" />
            </div>
            <div className='video-btn-5' >
              <img src={require('../../Assets/Volume Up.png')} alt="" />
            </div>
          </div> */}
          </div>
          <div className="small-main-container">
            <div className="small-div-1">
              <div className="small-icon-1">
                <img
                  src="/assets/play-button.png"
                  style={{ filter: "invert(100%)" }}
                  alt="play button"
                />
              </div>
              <div className="small-text-1">
              {`${Math.floor(Math.round(duration) / 60)}:${Math.round(duration) % 60 < 10 ? '0' : ''}${Math.round(duration) % 60}`} min
              </div>
            </div>

            <div className="new-ffav-444">
              <div className="dropdown-icon-444">
                <img
                  style={{ filter: darkMode ? "invert(100%)" : "invert(0%)" }}
                  src="/assets/vidcategory.png"
                  alt="Menu"
                  className="icon"
                />
                <div className="dropdown-content">
                  <div onClick={() => handleInsideCategory("OverView")}>
                    OverView
                  </div>
                  <div onClick={() => handleInsideCategory("Resources")}>
                    Resource
                  </div>
                  <div onClick={() => handleInsideCategory("Lessons")}>
                    Lessons
                  </div>
                  <div onClick={() => handleInsideCategory("Q&A")}>Test</div>
                </div>
              </div>
              <div className="fav-icon">
                {/* <img
        style={{filter:darkMode?'invert(100%)':'invert(0%)'}}
        src={liked ? require('../../Assets/red-heart.png') : require('../../Assets/heart.png')}
        alt="Heart"
        onClick={() => getCourseLikes(videoId)}
      /> */}
                {liked ? (
                  <img
                    src="/assets/222heart.png"
                    alt="Heart"
                    // style={{ width: '50px', height: '50px', marginRight: '20px', cursor: 'pointer' }}
                    onClick={() => getCourseLikes(LikedId)}
                  />
                ) : (
                  <img
                    src="/assets/1111heart (1).png"
                    alt="Heart"
                    style={{ filter: darkMode ? "invert(100%)" : "invert(0%)" }}
                    onClick={() => getCourseLikes(LikedId)}
                  />
                )}
              </div>
              {showImage && (
                <div className="fav-icon1" onClick={handleDownload}>
                  <img
                    style={{ filter: darkMode ? "invert(0%)" : "invert(100%)" }}
                    src="/assets/download.png"
                    alt="Download"
                  />
                </div>
              )}
              {progress > 0 && (
                <div className="download-bar-vc">
                  <CircularProgressbar
                    styles={{
                      path: {
                        stroke: "#FF5F67",
                        strokeWidth: 10,
                        transition: "stroke-dashoffset 0.5s ease 0s",
                      },
                      trail: {
                        stroke: "#d6d6d6",
                      },
                      text: {
                        fill: "#FF5F67",
                        fontSize: "24px",
                        fontWeight: "bold",
                        textAlign: "center", // Ensures the text is centered horizontally
                        dominantBaseline: "middle", // Centers vertically
                        textAnchor: "middle", // Ensures text is anchored at the center horizontally
                        transform: "translateY(0px)", // Fine-tune vertical alignment if necessary
                      },
                    }}
                    value={progress}
                    text={`${progress}%`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="video-description">
            <div className="video-disc">{title1}</div>
            <div className="video-para">{desc1}</div>
          </div>
        </div>
        <div className="overall-videos">
          {renderCourseContent()}
          <Modal isOpen={upgradeModal} onClose={handleUpgradeclose}>
            <div className="overall-upgrade-container">
              <div className="upgrade-icon">
                <img
                  src="/assets/ic_round-workspace-premium.png"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="upgrade-text-container">
                <div className="upgrade-title">
                  UPGRADE TO <br /> PREMIUM
                </div>
                <div className="upgrade-subtext">
                  When you subscribe,you'll get <br />
                  instant unlimited access
                </div>
              </div>

              <div className="upgrade-btn-container">
                <div className="upgrade-btn" onClick={handlePremiumModalOpen}>
                  Be Premium
                </div>
                <div className="up-cancel-btn" style={{cursor:'pointer'}}>Cancel</div>
              </div>
            </div>
          </Modal>
          <Modal isOpen={getPremiumModal} onClose={handlePremiumModalClose}>
            <div>
              <div className="premium-top-title">BE PREMIUM</div>
              <div className="premium-title">
                Get Unlimited <br /> Access
              </div>
              <div className="premium-text">
                When you subscribe, you’ll get <br />
                instant unlimited access
              </div>

              <div>
                <div
                  className="radio-container"
                  style={{
                    backgroundColor:
                      selectedOption === "monthly" ? "#FF5F6747" : "#2c2c2e",
                  }}
                >
                  <input
                    type="radio"
                    name="option"
                    id="radio1"
                    value="monthly"
                    onChange={handleRadioChange}
                    checked={selectedOption === "monthly"}
                  />
                  <div className="radio-contents-container-1" for="radio1">
                    <div>
                      <div className="radio-head-1">Monthly</div>
                      <div
                        className="radio-tail-1"
                        style={{
                          color:
                            selectedOption === "monthly"
                              ? "#ff5f67"
                              : "#ffffff",
                        }}
                      >
                        Pay monthly
                      </div>
                    </div>
                    <div className="radio-right-container">
                      <div className="radio-right">
                        <sup>$</sup>
                        19.99
                        <sub>/m</sub>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="radio-container"
                  style={{
                    backgroundColor:
                      selectedOption === "yearly" ? "#FF5F6747" : "#2c2c2e",
                  }}
                >
                  <input
                    type="radio"
                    name="option"
                    id="radio2"
                    value="yearly"
                    onChange={handleRadioChange}
                    checked={selectedOption === "yearly"}
                  />
                  <div className="radio-contents-container-2">
                    <div>
                      <div className="radio-head-2">Yearly</div>
                      <div
                        className="radio-tail-2"
                        style={{
                          color:
                            selectedOption === "yearly" ? "#ff5f67" : "#ffffff",
                        }}
                      >
                        Pay for full year
                      </div>
                    </div>
                    <div className="radio-right-container-2">
                      <div className="radio-right-2">
                        <sup>$</sup>
                        129.99
                        <sub>/y</sub>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-premium-btn">Subscribe Now</div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
