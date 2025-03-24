import React, { useContext, useState, useEffect } from 'react';
import './Downloads.css';
import PageTitle from '../../../Components/Loader/Other/PageTitle';
import { themeContext } from "../../../Context";
import { useLocation ,useNavigate} from 'react-router-dom';
import { ImagePath } from '../../../Service/ApiService';
import InfoCard from '../../../Components/InfoCard/InfoCard';

function Downloads() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const location = useLocation();
  const navigate=useNavigate();
  const [videos, setVideos] = useState([]);
  const [audios,setAudios]=useState([])
  const [selectedRadios, setSelectedRadios] = useState([]); // Track selected radios
  const [activeBarItem, setActiveBarItem] = useState('Videos');
  const [selectAll, setSelectAll] = useState(false);

  const handleMusic=()=>{
    navigate('/SeeAllMusic')
  }
 const handleVideo=()=>{
    navigate('/Category')
  }
  const handlePlayVideo=(item)=>{
    navigate('/PlayDownloads',{state:item})
  }
  const handlePlayAudio=(item)=>{
    navigate('/PlayAudio',{state:item})
  }
  // Fetch videos from localStorage on component mount
  const userId=localStorage.getItem('user_id')
  useEffect(() => {
    const fetchVideos = async () => {
      const downloadedVideos = await localStorage.getItem(`DownloadedVideos_${userId}`);
      const videoList = downloadedVideos ? JSON.parse(downloadedVideos) : [];
      setVideos(videoList);
    };
    // const fetchAudios = async () => {
    //   const downloadedAudios = await localStorage.getItem('DownloadedAudios');
    //   const AudioList = downloadedAudios ? JSON.parse(downloadedAudios) : [];
    //   setAudios(AudioList);
     
    // };
    fetchVideos();
    // fetchAudios();
  }, [userId]);


  useEffect(() => {
    getDownloadedAudios(userId);
  }, [userId]);

  const getDownloadedAudios = async (userId) => {
    try {
      if (!userId) return; // Ensure userId exists

      const downloadedAudios = await localStorage.getItem(`DownloadedAudios_${userId}`);
      const audios = downloadedAudios ? JSON.parse(downloadedAudios) : [];
      setAudios(audios);
    } catch (error) {
      console.error("Error retrieving downloaded audios:", error);
    }
  };
  console.log(videos, 'videos',audios,'audios');

  // Handle radio button toggle (select/deselect)
  const handleRadioChange = (index) => {
   if (selectedRadios.includes(index)) {
      setSelectedRadios(selectedRadios.filter(i => i !== index));
      setSelectAll(false);
    } else {
      const updatedSelected = [...selectedRadios, index];
      setSelectedRadios(updatedSelected);
      if (updatedSelected.length === (activeBarItem === 'Videos' ? videos.length : audios.length)) {
        setSelectAll(true);
      }
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRadios([]);
    } else {
      setSelectedRadios(activeBarItem === 'Videos' ? videos.map((_, i) => i) : audios.map((_, i) => i));
    }
    setSelectAll(!selectAll);
  };
  // Handle "Cancel" - Clear all selected radios
  const handleCancel = () => {
    setSelectedRadios([]);
    setSelectAll(false);
  };

  // Handle "Delete" - Remove all selected videos
  const handleDeleteVideos = () => {
    const remainingVideos = videos.filter((_, index) => !selectedRadios.includes(index));
    setVideos(remainingVideos);
    setSelectedRadios([]); // Clear selection
    // localStorage.setItem('DownloadedVideos', JSON.stringify(remainingVideos));
    localStorage.setItem(`DownloadedVideos_${userId}`, JSON.stringify(remainingVideos));

    // const remainingAudios = audios.filter((_, index) => !selectedRadios.includes(index));
    // setAudios(remainingAudios);
    // setSelectedRadios([]); // Clear selection
    // localStorage.setItem('DownloadedAudios', JSON.stringify(remainingAudios));
  };

  const handleDeleteAudios = () => {
    // const remainingVideos = videos.filter((_, index) => !selectedRadios.includes(index));
    // setVideos(remainingVideos);
    // setSelectedRadios([]); // Clear selection
    // localStorage.setItem('DownloadedVideos', JSON.stringify(remainingVideos));

    const remainingAudios = audios.filter((_, index) => !selectedRadios.includes(index));
    setAudios(remainingAudios);
    setSelectedRadios([]); // Clear selection
    // localStorage.setItem('DownloadedAudios', JSON.stringify(remainingAudios));
    localStorage.setItem(`DownloadedAudios_${userId}`, JSON.stringify(remainingAudios));

  };
  const handleActive = (itemName) => {
    setActiveBarItem(itemName);
    setSelectedRadios([]);
    setSelectAll(false);
  };
  return (
    < >
    <div className='overall-downloade'>
      <div>
        <PageTitle title={"Downloads"} />
      </div>
<div>
<div className='fav-bar-999'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}>
            <div className='fav-videos-999'
              style={{
                backgroundColor: activeBarItem === 'Videos' ? "#FF5F67" : undefined,
                color: activeBarItem === "Videos" ? "white" : undefined,
                cursor: "pointer"
              }}
              onClick={() => handleActive('Videos')}
            >Videos</div>
            <div className='fav-audios-999'
              style={{
                backgroundColor: activeBarItem === 'Music' ? "#FF5F67" : undefined,
                color: activeBarItem === "Music" ? "white" : undefined,
                cursor: "pointer"
              }}
              onClick={() => handleActive('Music')}
            >Music</div>
          </div>

      <div className='backround-dow'>
      
      {activeBarItem === 'Videos' ? (
        videos?.length === 0 ? (
          <InfoCard
            imageSrc='/assets/newnewplay.png'
            title="No Videos Available"
            subtitle="It looks like you haven’t downloaded any videos yet. Browse our catalog to find something you'll love."
            buttonText="Discover Videos"
            onButtonClick={handleVideo}
          />
        ) : (
          <>
          <div className='checkboc'>
          Select All
          <input type="radio" checked={selectAll} onChange={handleSelectAll} />
        </div>
        <div>
         
        {videos.map((item, index) => (
          <div
            key={index}
            className='download-container'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
          >
            <div className='img-dow-container' 
            onClick={()=>handlePlayVideo(item)}
            >
              <img src={ImagePath + item.videoImage} alt="" />
            </div>
            <div className='dow-text-container'
            onClick={()=>handlePlayVideo(item)}
            >
              <div className='dow-text'>{item.videotitle}</div>
              {/* <div className='dow-time'>{item.videodescription}</div> */}
            </div>
            <div className='gold-dai'>
              <input
                type="radio"
                checked={selectedRadios.includes(index)}
                onClick={() => handleRadioChange(index)}
                readOnly // Prevents React warning about uncontrolled input
              />
            </div>
           
          </div>
        ))}
          <div className='buttons-container'>
          <div className='dow-cancel' onClick={handleCancel}>
            Cancel
          </div>
          <div className='dow-delete' onClick={handleDeleteVideos}>
            Delete
          </div>
        </div>
        </div>
        </>
        )
      ) : activeBarItem === 'Music' ? (
        audios?.length === 0 ? (
          <InfoCard
          imageSrc='/assets/musical-note.png'
            title="No Music Available"
            subtitle="It looks like you haven’t downloaded any music yet. Browse our catalog to find something you'll love."
            buttonText="Discover Music"
            onButtonClick={handleMusic}
          />
        ) : (
          <>
          <div className='checkboc'>
          Select All
          <input type="radio" checked={selectAll} onChange={handleSelectAll} />
        </div>
        <div>
          
            {audios.map((item, index) => (

          <div
            key={index}
            className='download-container'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}
            onClick={()=>handlePlayAudio(item)}
          >
            <div className='img-dow-container' 
            
            >
              <img src={ImagePath + item.audioImage} alt="" />
            </div>
            <div className='dow-text-container'
            // onClick={()=>handlePlayVideo(item)}
            >
              <div className='dow-text'>{item.audioTitle}</div>
              {/* <div className='dow-time'>{item.audioDescription}</div> */}
            </div>
            <div className='gold-dai'>
              <input
                type="radio"
                checked={selectedRadios.includes(index)}
                onClick={() => handleRadioChange(index)}
                readOnly // Prevents React warning about uncontrolled input
              />
            </div>
          
          </div>
        ))}
          <div className='buttons-container'>
          <div className='dow-cancel' onClick={handleCancel}>
            Cancel
          </div>
          <div className='dow-delete' onClick={handleDeleteAudios}>
            Delete
          </div>
        </div>
        </div>
        </>
        )
      ) : ''}
 
       
      </div>
      </div>
      
      
      </div>
    </>
  );
}

export default Downloads;


// import React from 'react';
// import './Downloads.css'
// import PageTitle from '../../../Components/Loader/Other/PageTitle'
// import { themeContext } from "../../../Context";
// import { useContext,useState,useEffect} from 'react';
// import { useLocation } from 'react-router-dom';
// import { ImagePath } from '../../../Service/ApiService';

// function Downloads() {
//   const theme = useContext(themeContext);
//   const darkMode = theme.state.darkMode;
//   const location=useLocation()
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       const downloadedVideos = await localStorage.getItem('DownloadedVideos');
//       const videoList = downloadedVideos ? JSON.parse(downloadedVideos) : [];
//       setVideos(videoList);
//     };

//     fetchVideos();
//   }, []);
//   // useEffect(() => {
//   //   const storedVideos = JSON.parse(localStorage.getItem('downloadedVideos')) || [];
//   //   setVideos(storedVideos);
//   // }, []);

//   console.log(videos,'videos')

//   const [selectAll, setSelectAll] = useState(false);
//   const [checkedItems, setCheckedItems] = useState(new Array(videos.length).fill(false));

//   const handleSelectAll = () => {
//     setSelectAll(!selectAll);
//     setCheckedItems(new Array(videos.length).fill(!selectAll));
//   };

//   const handleCheckboxChange = (index) => {
//     const updatedCheckedItems = [...checkedItems];
//     updatedCheckedItems[index] = !updatedCheckedItems[index];
//     setCheckedItems(updatedCheckedItems);
//     setSelectAll(updatedCheckedItems.every(item => item));
//   };
//   return (
//     <>
//     <div>
//       <PageTitle title={"Downloads"}/>
//     </div>
  
//     <div className='backround-dow'
//      >
//     <div className='checkboc'>
//     Select all
//       <input type="radio"
//       id='radio'
//       checked={selectAll}
//       onChange={handleSelectAll} />
//     </div>
// {videos.map((item,index)=>(
//   <div className='download-container'
//   style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}>
//     <div className='img-dow-container'>
// <img src={ImagePath+item.videoImage} alt="" />
//     </div>
//     <div className='dow-text-container'>
//     <div className='dow-text'>{item.videotitle}</div>
//     <div className='dow-time'>{item.videodescription}</div>
//     </div>
//     <div>
//       <input type="radio" 
//       checked={checkedItems[index]}
//       id='radio'
//       onChange={() => handleCheckboxChange(index)}/>
//     </div>
//   </div>
//   ))}
//   <div className='buttons-container'>
// <div className='dow-cancel'>Cancel</div>
// <div className='dow-delete'>Delete</div>
//   </div>
//   </div>
//     </>
//   )
// }

// export default Downloads
