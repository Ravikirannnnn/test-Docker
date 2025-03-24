import React, { useEffect, useState,useContext,useRef } from "react";
import "./AIMusic.css"; // Import the external CSS
import { API_URL4000, API_URL4004, ImagePath } from "../../Service/ApiService";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { themeContext } from "../../Context";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';


const SPOTIFY_CLIENT_ID = '29d8576d9d6e48daae3a03d1323b67b3';
const SPOTIFY_CLIENT_SECRET = 'b2005c4008904589b9203f42e4ca7e75';
// dffffffffffff
const encodeBase64 = (str) => {
  return btoa(unescape(encodeURIComponent(str)));
};

// Function to fetch Spotify token
const getSpotifyToken = async () => {
  const credentials = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
  const encodedCredentials = encodeBase64(credentials);
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
    }
  );
  return response.data.access_token;
};

const AIMusic = () => {
  const scrollRef = useRef(null);

  const [tracks, setTracks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Meditation');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [time, setTime] = useState('10:00');
  
  const closeTimePicker = () => {
    setIsTimePickerOpen(false);
  };
console.log(currentTrack);

  
  const openTimePicker = () => {
    console.log('oioi')
    setIsTimePickerOpen(true);
  };

  const categoryMapping = {
    Meditation: "Deep Meditation",
    Yoga: "Peaceful Yoga",
    Rain: "Rain Sounds",
    Sleep: "Sleep Music",
    Nature: "Mother Nature",
    Calm: "Calm Atmosphere",
    Relaxation: "Relaxing Music",
    "Nature and Noise": "Ambient Nature Sounds",
    "Happy Uplifting": "Uplifting Music",
    Ambient: "Ambient Music",
    Focus: "Focus Music",
  };

  const categories = ["Meditation", "Yoga", "Rain", "Sleep", "Nature", "Calm","Relaxation","Nature and Noise","Happy Uplifting","Ambient","Focus"];


  
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchTracksByCategory(category);
  };

  const fetchTracksByCategory = async (category) => {
    try {
      const token = await getSpotifyToken();
  
      // Map the selected category to the query string
      const query = categoryMapping[category] || category;
  
      const playlistResponse = await axios.get(
        'https://api.spotify.com/v1/search',
        {
          params: {
            q: query,
            type: 'playlist',
            limit: 1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check if playlists exist
      const playlists = playlistResponse.data.playlists.items;
      if (playlists.length === 0) {
        console.warn(`No playlists found for category: ${category}`);
        setTracks([]);
        return;
      }
  
      const playlistId = playlists[0].id;
  
      const tracksResponse = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Set tracks from the API response
      setTracks(tracksResponse.data.items.map(item => item.track));
    } catch (error) {
      console.error('Error fetching tracks', error);
      setTracks([]); // Clear tracks if an error occurs
    }
  }; 
  const openModalWithTrack = (track) => {
    setCurrentTrack(track);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrack(null);
    setIsPlaying(false);
  };
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };
  

  useEffect(() => {
    fetchTracksByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
    <div className="category-container" 
  // style={{ backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)" }}
>
<button 
  className="slider-button left"
  style={{ backgroundColor: darkMode ? "rgba(236, 236, 236, 1)" : "#2C2C2E", color: darkMode ? 'black' : 'white' }}
  onClick={scrollLeft}
>
  ‹
</button>

<div className="category-scroll" ref={scrollRef}>
  {categories.map((category) => (
    <button
      key={category}
      className={`category-button ${category === selectedCategory ? "active" : ""}`}
      onClick={() => handleCategoryClick(category)}
      style={{
        backgroundColor: category === selectedCategory
          ? "#f76b6b"
          : darkMode
          ? "#f3f3f3"
          : "#c0c0c0",
      }}
    >
      {category}
    </button>
  ))}
</div>


  <button 
  className="slider-button right" 
  style={{ backgroundColor: darkMode ? "rgba(236, 236, 236, 1)" : "#2c2c2e", color: darkMode ? 'black' : 'white' }}
  onClick={scrollRight}
>
  ›
</button>
</div>

<div className="recommended-container1">
  {tracks?.map((track, index) => (
    <div key={`${track.id}-${index}`} className="recommended-item1">
      <img 
        src={track?.album?.images[0]?.url} 
        alt={track.name} 
        onClick={() => openModalWithTrack(track)} 
        style={{ cursor: 'pointer' }} 
      />
      <div>
        <h3>{track.name}</h3>
        <p style={{ color: darkMode ? 'white' : 'black' }}>{track.artists[0].name}</p>
      </div>
    </div>
  ))}
</div>


      {isModalOpen && currentTrack && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" style={{ backgroundColor: darkMode ? 'black' : '#FFFFFF' }} onClick={(e) => e.stopPropagation()}>
            <img src={currentTrack.album.images[0].url} alt={currentTrack.name} />
            {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',marginTop:'10px' ,marginBottom:'10px'}}> */}
              <h3 style={{ marginRight: '10px' }}>{currentTrack.name}</h3>
              {/* <img src={require('../../Assets/stopwatch.png')} alt="Stopwatch" style={{ width: '24px', height: '24px' }} onClick={openTimePicker} /> */}
            {/* </div> */}
            <p>{currentTrack.artists[0].name}</p>
            <ReactH5AudioPlayer
  src={currentTrack?.preview_url}
  autoPlay={true}
  onPlay={() => setIsPlaying(true)}
  onPause={() => setIsPlaying(false)}
  onEnded={() => setIsPlaying(false)}
  showDownloadProgress={false}
  showFilledProgress={false}
  loop={true}
/>
          </div>
        </div>
      )}
{/* {isTimePickerOpen && (
        <div >
          <TimePicker
            onChange={setTime}
            value={time}
            onClose={closeTimePicker}
          />
        </div>
      )}
 */}

    </div>
  );
};

export default AIMusic;
