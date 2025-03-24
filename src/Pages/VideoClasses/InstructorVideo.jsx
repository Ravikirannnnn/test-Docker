import React, { useEffect } from 'react';
import './InstructorVideo.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import ReactPlayer from 'react-player';
import { themeContext } from '../../Context'
import { useContext ,useState,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import TimerPicker from '../../Components/Loader/Other/Timer';
import Modal from "../../Components/Loader/Modal/Modal";
import { API_URL4004, ImagePath, vidPath } from '../../Service/ApiService';

// import forwardIcon from '../../Assets/forward.png'; // Adjust the path as needed
// import backwardIcon from '../../Assets/backward.png'; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from '../../redux/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import UpgradeModal from '../WelcomePage/WelcomeModal02';


export default function InstructorVideo() {
  const location=useLocation();
  const navigate=useNavigate();
      const [modalOpen, setModalOpen] = useState(false);

  const {title,desc,chunkdatavedio,_id,name}=location.state || {}
//   console.log(id,tid,vname,title,desc,lenimg,file,downloadFileName,audio_files,liked,chunkdatavedio,'1010');
//   console.log(vname,'vname',chunkdatavedio[0].vid_name,'chunvid',downloadFileName,'download');
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [showSettings, setShowSettings] = useState(false);
  const [showAudioSettings,setShowAudioSettings]=useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [upgradeModal,setUpgradeModal]=useState(false);
  const [getPremiumModal,setGetPremiumModal]=useState(false);
  const [selectedOption, setSelectedOption] = useState('monthly');
  const [showControls, setShowControls] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

  const [instructor, setInstructor] = useState([]);
  // const[]
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

  
  const handleVideoPath=(subItem)=>{
    const { _id, subdown_vid, subCatName, description, subcategory_img, files, downlowd_vid, audio_list, isLiked, chunk_data,Duration,intensity,categorytype,category_id,instructor_data} = subItem;
        // console.log(subItem,'chunkdata')
        if(isLocked && subItem.subscriptionType === 'Pro'){
          setModalOpen(true)
        }
       else if(categorytype === 'course'){
          navigate('/CourseVideo', {
        state: {
          _id: _id,
          // tid: training_id,
          vname: subdown_vid,
          title: subCatName,
          desc: description,
          lenimg: subcategory_img,
          file: files,
          // downloadFileName: downlowd_vid,
          audio_files: audio_list,
          likes: isLiked,
          chunkdatavedio: chunk_data,
          Duration:Duration,
          intensity:intensity,
          instructor_id:instructor_data?._id
          // category_id:category_id
        }
      });
        }
    else if(categorytype === "audio"){
      console.log('arrayueyyy Yaaar')
      navigate('/InstructorAudio',
        {
          state: {
            data: subItem,
          }
        })
    }
      
  }

  console.log(_id,'ssssss')

  const handleUpgradeclose = () => {
    setUpgradeModal(false);
  };

 
 
  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles);
    const track = videoRef.current.textTracks[0];
    track.mode = showSubtitles ? 'showing' : 'hidden';
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
 
  const handleReportPlayback = () => {
    alert('Playback issue reported!');
    // Or open a dialog/modal for more detailed reporting
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
const safeVidName = chunkdatavedio || '';

// Encode path and name
const encodedVidPath = encodeURI(safeVidPath); // Encode the base path
const encodedVidName = encodeURIComponent(safeVidName); // Encode the video file name

// Safely concatenate the encoded parts
const encodedURL = `${ensureTrailingSlash(encodedVidPath)}${encodedVidName}`;

useEffect(() => {
  getInstructor();
  
},[])


const getInstructor = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');

  try {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + accessToken);

    // Remove the 'body' property since GET requests cannot have a body
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
   
    const response = await fetch(`${API_URL4004}get_instructor_course?instructor_id=${_id}&user_id=${user_id}`, requestOptions);
    const result = await response.json(); // Parsing the response
    if(result.Status === true){
      console.log(result,'instructors');
    setInstructor(result.response)
    // setCatName(result.response.subCatName);
    // setInstructorId(result.response.instructor_id);

    }
    
  } catch (error) {
    console.log(error);
    return null;
  }
};


  return (
    <>
    <div className='nit-title'>
    <PageTitle title={instructor[0]?.instructor_data.name}/>
    </div>
    <div className='overall-container-00'>
       
        <div className='top-items-continer-00'>
        {/* <div  className='video-title-00'>
        <PageTitle title={title}/>
        </div> */}
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
<div  className='video-main-container-00'>
  <div className='left-container-00'>
        <div className='video-player-00'
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() =>{ setShowControls(false);setShowSettings(false);}}
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
<div className='player-container'>
{vidPath && chunkdatavedio !== "" && (
              <ReactPlayer
              key={chunkdatavedio}
              ref={playerRef}
              url={encodedURL}
              playing={true}
                  // muted={true}
                  playsinline={true}
              // playing={!isPlaying}
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
              controls={false}
              loop={true}
              onReady={() => setVideoLoaded(true)} // Show video only when ready
              style={{ visibility: videoLoaded ? "visible" : "hidden",
              opacity:videoLoaded ? 1: 0,
              transition:"opacity 0.3s ease-in-out"
              }} // Hide until loaded
            />
            )}
</div>


      {/* <button
        onClick={() => handleSeek(-10)}
        style={styles.backwardButton}
      >
        <img src={backwardIcon} alt="Backward 10s" style={styles.icon} />
      </button>

      <button
        onClick={() => handleSeek(10)}
        style={styles.forwardButton}
      >
        <img src={forwardIcon} alt="Forward 10s" style={styles.icon} />
      </button> */}
        
            {/* <div className='video-controls-container'>
              <div>
                <div className='video-control-1'>
                  <img src='/assets/rightwel.png')} alt="" />
                </div>
              </div>
              <div className='video-controls-right'>
                <div className='video-control-2'>
                  <img src='/assets/videocontrol-2.png')} alt="" />
                </div>
                <div className='video-control-3'>
                  <img src='/assets/videocontrol-1.png')} alt="" />
                </div>
                <div className='video-control-4' onClick={toggleSettings}>
                  <img src='/assets/videocontrol-3.png')} alt="" />
                </div>
                {showSettings && !showAudioSettings && !isPickerOpen && (
                  <div className='video-settings'>
                    <ul>
                    
                      <li onClick={handleScreenshare}>Screenshare</li>
                      <li onClick={toggleSubtitles}>{showSubtitles ? 'Hide Subtitles' : 'Show Subtitles'}</li>
                      <li onClick={showAudio}>Audio</li>
                      <li style={{ color: '#ff2424' }} onClick={handleReportPlayback}>Report a Playback</li>
                    </ul>
                  </div>
                )}
            </div>
            
            
          </div> */}
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
        {/* <div className='small-main-container-00'>
          <div className='small-div-1-00'
           style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
            <div className='small-icon-1-00'>
              <img src='/assets/Play.png')} alt="" />
            </div>
            </div>
          <div className='small-div-2-00'
            style={{
              backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
            }}>
            <div className='small-icon-2-00'>
            <img src='/assets/Intencity.png')} alt="" />
            </div>
            </div>
        </div> */}
        <div className='video-description-00'>
        {/* <div className='video-para-00'>{name}</div> */}
        <div className='video-para-00'>Description : <span>{desc}</span> </div>
        </div>
        </div>
        <div className='overall-videos-00'>
      {instructor?.map((item,index)=>(
        <div>
        {item?.instructor_id===_id &&
        <div 
        // className='video-right-container-00'
        className={`video-right-container-00 ${item.subscriptionType === 'Pro' && isLocked ?  'pro-overlay-item-01' : ''}`}
        
        key={item._id}
         style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }} onClick={()=>handleVideoPath(item)}>
               <div className='side-videos-00'>
      {/* <video src={vidPath+item.vid_name}></video>       */}
      {/* <div className='video-arrow1-00'> */}
        <img src={ImagePath + item.subcategory_img} alt="" />
       {/* </div> */}
       </div>
       <div className='right-midle-00'>
  <div className='video-info-00'> {/* Wrap text and time */}
    <div className='video-text-00'>
      {item.subCatName}
    </div>
    <div className='video-time-00'>{`${Math.floor(Math.round(item?.Duration) / 60)}:${Math.round(item?.Duration) % 60 < 10 ? '0' : ''}${Math.round(item?.Duration) % 60}`} min</div>
    {item.subscriptionType==='Preview' && isLocked ?( <span className="pro-badge-iv">Preview</span>):item.subscriptionType==='Pro' && isLocked ?(<span className="pro-badge-iv-00">🔒</span>):('')}
  </div>
</div>

       <div className='video-arrow-00'>
        <img src='/assets/backwel.png' alt="" />
       </div>
        </div>
        }
        </div>
        ))}
                 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

        <Modal isOpen={upgradeModal} onClose={handleUpgradeclose}>
          <div className='overall-upgrade-container-00'>
            <div className='upgrade-icon-00'>
              <img src='/assets/ic_round-workspace-premium.png' alt="" />
            </div>
            <div className='upgrade-text-container-00'>
              <div className='upgrade-title-00'>
              UPGRADE TO <br /> PREMIUM
              </div>
              <div className='upgrade-subtext-00'>
                When you subscribe,you'll get <br />instant unlimited access
              </div>
            </div>

            <div className='upgrade-btn-container-00'>
              <div  className='upgrade-btn-00' onClick={handlePremiumModalOpen}>Be Premium</div>
              <div className='up-cancel-btn-00'>Cancel</div>
            </div>
           
          </div>
          </Modal>
          <Modal isOpen={getPremiumModal} onClose={handlePremiumModalClose} >
        <div>
          <div className="premium-top-title-00">BE PREMIUM</div>
          <div className="premium-title-00">Get Unlimited <br /> Access</div>
          <div className="premium-text-00">When you subscribe, you’ll get <br />
          instant unlimited access</div>

          <div >
            <div className='radio-container-00'style={{backgroundColor: selectedOption==='monthly' ? '#FF5F6747':'#2c2c2e'}} >
              <input type="radio"
               name="option"
               id="radio1" 
              value='monthly'
               onChange={handleRadioChange}
               checked={selectedOption==='monthly'}
               />
              <div className="radio-contents-container-1-00" for='radio1'>
                <div>
                  <div className="radio-head-1-00">Monthly</div>
                  <div className="radio-tail-1-00" style={{color: selectedOption === 'monthly' ? '#ff5f67':'#ffffff',}}>Pay monthly</div>
                </div>
              <div className="radio-right-container-00">
                <div className="radio-right-00">
                  <sup>$</sup>
                  19.99
                  <sub>/m</sub></div>
              </div>
            </div>
            </div>
            <div className='radio-container-00'style={{backgroundColor: selectedOption==='yearly' ? '#FF5F6747':'#2c2c2e'}}>
              <input type="radio"
               name="option"
                id="radio2"
                 value="yearly"
                   onChange={handleRadioChange}
               checked={selectedOption==='yearly'}
               />
              <div className="radio-contents-container-2-00">
                <div>
                  <div className="radio-head-2-00">Yearly</div>
                  <div className="radio-tail-2-00" style={{color: selectedOption==='yearly' ?'#ff5f67':'#ffffff'}}>Pay for full year</div>
                </div>
              <div className="radio-right-container-2-00">
                <div className="radio-right-2-00">
                  <sup>$</sup>
                  129.99
                  <sub>/y</sub></div>
              </div>
            </div>
            </div>
          </div>
        <div className="modal-premium-btn-00">Subscribe Now</div>

        </div>
        </Modal>
        </div>
</div>      
    </div>
    </>
  )
  
}

