import React from 'react';
import './VideoScreen.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import ReactPlayer from 'react-player';
import { themeContext } from '../../Context'
import { useContext ,useState,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import TimerPicker from '../../Components/Loader/Other/Timer';
import Modal from "../../Components/Loader/Modal/Modal";
import { vidPath } from '../../Service/ApiService';

import forwardIcon from '/assets/forward.png'; // Adjust the path as needed
import backwardIcon from '/assets/backward.png'; // Adjust the path as needed



export default function VideoScreen() {
  const location=useLocation();
  const {id,tid,vname,title,desc,lenimg,file,downloadFileName,audio_files,liked,chunkdatavedio,Duration,intensity}=location.state || {}
  console.log(id,tid,vname,title,desc,lenimg,file,downloadFileName,audio_files,liked,chunkdatavedio,'1010');
  console.log(vname,'vname',chunkdatavedio[0].vid_name,'chunvid',downloadFileName,'download');
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [showSettings, setShowSettings] = useState(false);
  const [showAudioSettings,setShowAudioSettings]=useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [upgradeModal,setUpgradeModal]=useState(false);
  const [getPremiumModal,setGetPremiumModal]=useState(false);
  const [selectedOption, setSelectedOption] = useState('monthly');
  const [showControls, setShowControls] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
      const [videoLoaded, setVideoLoaded] = useState(false);
  
  // const [selectedVideo, setSelectedVideo] = useState(chunkdatavedio[0]?.vid_name); // Default to the first video
  // const [playlist, setPlaylist] = useState([chunkdatavedio[0]?.vid_name]); // Initial playlist with the first video

  // const handleVideoChunkClick = (videoName) => {
  //   setSelectedVideo(videoName); // Set the selected video to play
  //   if (!playlist.includes(videoName)) {
  //     setPlaylist([...playlist, videoName]); // Add to playlist if not already present
  //   }
  // };
  const handleClick = (event) => {
    event.stopPropagation();
    setIsClicked(!isClicked); // Toggle clicked state
    setShowControls(!isClicked); // Toggle controls based on clicked state
};

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
  const handleReportPlayback = () => {
    alert('Playback issue reported!');
    // Or open a dialog/modal for more detailed reporting
  };

console.log(vidPath+chunkdatavedio[0].vid_name,'video')


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
const safeVidName = chunkdatavedio?.[0]?.vid_name?.trim() || '';

// Encode path and name
const encodedVidPath = encodeURI(safeVidPath); // Encode the base path
const encodedVidName = encodeURIComponent(safeVidName); // Encode the video file name

// Safely concatenate the encoded parts
const encodedURL = `${ensureTrailingSlash(encodedVidPath)}${encodedVidName}`;

console.log(encodedURL);
console.log(chunkdatavedio[0]._id,'chunkid')
// const encodedURL = encodeURI(vidPath + chunkdatavedio[0].vid_name);
// const encodedVidPath = encodeURI(vidPath); 
// const encodedVidName = encodeURIComponent(chunkdatavedio[0].vid_name); 

// Safely concatenate the encoded parts
// const encodedURL = `${encodedVidPath}${encodedVidPath.endsWith('/') ? '' : '/'}${encodedVidName}`;

console.log("Encoded Video URL:", encodedURL);
  return (
    <div className='overall-container'>

        <div className='top-items-continer'>
        <div  className='video-title'>
        <PageTitle title={title}/>
        </div>
        <div className='top-icons-container'>
          <div className='icon-img-01'>
            <img src='/assets/Vector.png' loading="lazy" alt="" />
          </div>
          <div className='icon-img-02'>
          <img src='/assets/Vector (5).png' loading="lazy" alt="" />
          </div>
          <div className='icon-img-03'>
          <img src='/assets/Vector (6).png' loading="lazy" alt="" />
          </div>
        </div>
        </div>
<div  className='video-main-container'>
  <div className='left-container'>
        <div className='video-player'
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
{vidPath && chunkdatavedio.length > 0 && (
              <ReactPlayer
              key={chunkdatavedio[0]._id}
              ref={playerRef}
              url={encodedURL}
              // playing={!isPlaying}
              playing={true}
              // muted={true}
              playsinline={true}
              controls={true}
              width="100%"
              height="100%"
              playbackRate={playbackSpeed}
              config={{
                file: {
                  // forceHLS: true, // Force HLS for .m3u8 URLs
                  attributes: {
                    controlsList: 'nodownload', // Disable download controls
                    crossOrigin: 'anonymous', // Enable cross-origin requests
                  },
                  // tracks: [
                  //   { kind: 'subtitles', src: 'subs/subtitles.en.vtt', srcLang: 'en', default: true },
                  // ],
                },
              }}
              onError={(e) => handelerror('Error loading video:', e)}
              onReady={() => setVideoLoaded(true)} // Show video only when ready
              style={{ visibility: videoLoaded ? "visible" : "hidden",
              opacity:videoLoaded ? 1: 0,
              transition:"opacity 0.3s ease-in-out"
              }} // Hide until loaded
            />
            )}



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
            <div className='video-controls-container'>
              {/* <div>
                <div className='video-control-1'>
                  <img src='/assets/rightwel.png')} loading="lazy" alt="" />
                </div>
              </div> */}
              <div className='video-controls-right'>
                <div className='video-control-2'>
                  <img src='/assets/videocontrol-2.png' loading="lazy" alt="" />
                </div>
                <div className='video-control-3' onClick={handleUpgradeOpen}>
                  <img src='/assets/videocontrol-1.png' loading="lazy" alt="" />
                </div>
                <div className='video-control-4' onClick={toggleSettings}>
                  <img src='/assets/videocontrol-3.png' loading="lazy" alt="" />
                </div>
                {showSettings && !showAudioSettings && !isPickerOpen && (
                  <div className='video-settings'>
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
                      <li onClick={handleScreenshare}>Screenshare</li>
                      <li onClick={toggleSubtitles}>{showSubtitles ? 'Hide Subtitles' : 'Show Subtitles'}</li>
                      <li onClick={showAudio}>Audio</li>
                      <li style={{ color: '#ff2424' }} onClick={handleReportPlayback}>Report a Playback</li>
                    </ul>
                  </div>
                )}
        {showAudioSettings && (
                  <div className='audio-settings'>
                    <div className='title-container'>
                      <div className='audio-title'>Audio</div>
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
        <div className='small-main-container'>
        <div style={{display:'flex',flexDirection:'row',gap:'1rem',width:'50%'}}>
          
          <div className='small-div-1'
           >
            <div className='small-icon-1'>
              <img src='/assets/play-button.png' style={{filter:'invert(100%)'}} alt="play button" loading='lazy' />
            </div>
            <div className='small-text-1'> {`${Math.floor(Math.round(Duration) / 60)}:${Math.round(Duration) % 60 < 10 ? '0' : ''}${Math.round(Duration) % 60}`} min</div>
            </div>
          <div className='small-div-2'
           >
            <div className='small-icon-2'>
            <img src='/assets/Intencity.png' loading="lazy" alt="" />
            </div>
            <div className='small-text-2'>{intensity}</div>
            </div>
            </div>
        </div>
        <div className='video-description'>
        <div className='video-disc'>{title}</div>
        <div className='video-para'>{desc}</div>
        </div>
        </div>
        <div className='overall-videos'>
      {chunkdatavedio.map((item)=>(
        <div className='video-right-container'
         style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }} onClick={handleUpgradeOpen}>
               <div className='side-videos'>
      <video loading="lazy" src={vidPath+item.vid_name}></video>      
       </div>
       <div className='right-midle'>
        <div className='video-text'>
          {item.language_name}
        </div>
        <div  className='video-time'>{item.time}
          
        </div>
        
       </div>
       <div className='video-arrow'>
        <img loading="lazy" src='/assets/backwel.png' alt="" />
       </div>
        </div>
        ))}
        <Modal isOpen={upgradeModal} onClose={handleUpgradeclose}>
          <div className='overall-upgrade-container'>
            <div className='upgrade-icon'>
              <img src='/assets/ic_round-workspace-premium.png' loading="lazy" alt="" />
            </div>
            <div className='upgrade-text-container'>
              <div className='upgrade-title'>
              UPGRADE TO <br /> PREMIUM
              </div>
              <div className='upgrade-subtext'>
                When you subscribe,you'll get <br />instant unlimited access
              </div>
            </div>

            <div className='upgrade-btn-container'>
              <div  className='upgrade-btn' onClick={handlePremiumModalOpen}>Be Premium</div>
              <div className='up-cancel-btn'>Cancel</div>
            </div>
           
          </div>
          </Modal>
          <Modal isOpen={getPremiumModal} onClose={handlePremiumModalClose} >
        <div>
          <div className="premium-top-title">BE PREMIUM</div>
          <div className="premium-title">Get Unlimited <br /> Access</div>
          <div className="premium-text">When you subscribe, you’ll get <br />
          instant unlimited access</div>

          <div >
            <div className='radio-container'style={{backgroundColor: selectedOption==='monthly' ? '#FF5F6747':'#2c2c2e'}} >
              <input type="radio"
               name="option"
               id="radio1" 
              value='monthly'
               onChange={handleRadioChange}
               checked={selectedOption==='monthly'}
               />
              <div className="radio-contents-container-1" for='radio1'>
                <div>
                  <div className="radio-head-1">Monthly</div>
                  <div className="radio-tail-1" style={{color: selectedOption === 'monthly' ? '#ff5f67':'#ffffff',}}>Pay monthly</div>
                </div>
              <div className="radio-right-container">
                <div className="radio-right">
                  <sup>$</sup>
                  19.99
                  <sub>/m</sub></div>
              </div>
            </div>
            </div>
            <div className='radio-container'style={{backgroundColor: selectedOption==='yearly' ? '#FF5F6747':'#2c2c2e'}}>
              <input type="radio"
               name="option"
                id="radio2"
                 value="yearly"
                   onChange={handleRadioChange}
               checked={selectedOption==='yearly'}
               />
              <div className="radio-contents-container-2">
                <div>
                  <div className="radio-head-2">Yearly</div>
                  <div className="radio-tail-2" style={{color: selectedOption==='yearly' ?'#ff5f67':'#ffffff'}}>Pay for full year</div>
                </div>
              <div className="radio-right-container-2">
                <div className="radio-right-2">
                  <sup>$</sup>
                  129.99
                  <sub>/y</sub></div>
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
  )
  
}

