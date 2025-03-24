import React from 'react'
import './MusicAlbum.css'
import { useLocation,useNavigate } from 'react-router-dom';
import { useContext,useEffect,useState } from 'react';
import { themeContext } from '../../Context';
import { API_URL4004, ImagePath } from '../../Service/ApiService';
import PageTitle from '../../Components/Loader/Other/PageTitle';

export default function MusicAlbum() {
  const location = useLocation();
  const navigate=useNavigate();
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const { data } = location.state || {};
  const [liked, setLiked] = useState(false);
  const [name,setName]=useState()
  const [image,setImage]=useState()
  const [courseData,setCourseData]=useState([])

  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // The currently playing audio
  const [subCategories, setSubCategories] = useState([]); // All audios

  useEffect(() => {
    getAudios();
  }, []);

const hanleAudio=(index)=>{
  navigate('/Audio',
    {
      state: {
        index: index
      }
    });
}
  const getCourseLikes = async (vid) => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');
  
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + token);
  
      const raw = JSON.stringify({
        "video_id": vid._id,
        "user_id": user_id,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      const response = await fetch(API_URL4004 + "like_Course", requestOptions);
      const result = await response.json();
  
      if (result.status) {
        console.log(result);
        // Update the liked state only after a successful response
        setLiked(!liked);
        setSelectedSubCategory((prev) => ({
          ...prev,
          isLiked: !liked,
        }));
      } else {
        console.log("Error liking the course", result);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          setName(result.data.categorydata.categoryName);
          setImage(result.data.categorydata.categoryImage);
          setCourseData(result.data.courseData)
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
    <div>
      <div className='new-mus-tii'>
             <PageTitle title={name}/>
             </div>
 
      <div className='overall-musicAlbumb'>
      <div className='big-img'>
        <img src={ImagePath+image}alt=""  />
      </div>
      <div>
      <div className="down-music-00">
  {courseData.map((item, index) => (
  <div
    className="video-card-00"
    style={{backgroundColor:darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)"}}
    key={item._id || index} // Prefer unique IDs if available
    onClick={() => hanleAudio(index)} // Play selected audio and move it to the top
  >
    <div className="video-thumbnail-00">
      <img
        src={`${ImagePath}${item.subcategory_img}`}
        alt={item.subCatName}
      />
    </div>
    <div className="new-audio-pro-00">
    <div className="video-info-00">
      <h3 className="video-title-00">{item.subCatName}</h3>
      
      <div className="video-details-00">
        <span className="video-time-00">
          {`${Math.floor(Math.floor(item.Duration) / 60)}:${String(Math.floor(item.Duration) % 60).padStart(2, '0')}`} min
        </span>
      </div>
    </div>
    <div className="new-funct-00">
    <span className="video-preview-00">Preview</span>

    </div>
    </div>
  </div>
))}

      </div>
      </div>
      </div>
    </div>
  )
}
