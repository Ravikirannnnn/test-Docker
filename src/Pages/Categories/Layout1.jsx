import React, { useEffect, useState,useContext } from "react";
import "./Layout1.css"; // Import the stylesheet
import { API_URL4004, errorMessage, ImagePath } from "../../Service/ApiService";
import Music1 from "../../Components/Music/music1";
import { useLocation } from 'react-router-dom';
import { themeContext } from '../../Context'
import { useNavigate } from 'react-router-dom';
import PageTitle from "../../Components/Loader/Other/PageTitle";
import Music from "../../Components/Music/music";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Welcomebenefits from "../WelcomePage/Welcomebenefits";
import UpgradeModal from "../WelcomePage/WelcomeModal02";


const Layout1 = () => {
  const location=useLocation();
  const {ids,image,name}=location.state || {}
  const navigate=useNavigate()

  // console.log(ids,image,name);
  
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
        const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [meditationTimes, setMeditationTimes] = useState([]);
  const [data, setData] = useState([]);
  const [title,setTitle]=useState('')
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked=userData?.isSubscribed!==true?true:false;


  const recommendedItems = [
    { id: 1, imageUrl: "image_1725371754814.jpg", title: "Image 1" },
    { id: 2, imageUrl: "image_1725371754814.jpg", title: "Image 2" },
    { id: 3, imageUrl: "image_1725371754814.jpg", title: "Image 3" },
    { id: 4, imageUrl: "image_1725371754814.jpg", title: "Image 4" },
    { id: 5, imageUrl: "image_1725371754814.jpg", title: "Image 5" },
    // { id: 6, imageUrl: 'image6.jpg', title: 'Image 6' },
    // Add more items as needed
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getCourse();
  }, []);

  const filteredData = data?.filter(item => 
    item.subCatName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const getCourse = async () => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("accessToken");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = JSON.stringify({
      category_id: ids,
      user_id: user_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4004 + "getSubCategory_course", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        if (result.Status == true) {
          console.log(result.data.courseData);
          setData(result.data.courseData)
          setMeditationTimes(result.data.filter_types.filetrDurations);
          setTitle(result.data.categorydata.categoryName)

        } else {
          console.log(result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleVideoPath=(subItem)=>{
    const { _id, subdown_vid, subCatName, description, subcategory_img, files, category_id, audio_list, isLiked, chunk_data,Duration,intensity,categorytype} = subItem;
    if(isLocked && subItem.subscriptionType==='Pro'){
    setModalOpen(true)
    }

       else if(categorytype === 'course'){
          navigate('/CourseVideo', {
        state: {
          videoIds:chunk_data[0]._id,
          id: _id,
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
          category_id:category_id
        }
      });
        }
      
  }

  const SeeAll=()=>{
    navigate('/AlbumLayout',
      {state:{data:data,title:title}})
  }

  return (
    <div className="overall-layout-01">
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <div className="new-nn">
        <PageTitle title={title}/>
      </div>
      <div className="layout-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by category"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ color:darkMode?'#FFFFFF': '#000000',backgroundColor:darkMode?'#1C1C1E': '#FFFFFF',borderRadius:'25px' }}
          />
        </div>
      </div>
      <div>
        <div className="new-all" onClick={SeeAll}>See all</div>
      <div className="recommended-container1">
      {filteredData?.slice(0, 5).map((item) => (
          <div key={item._id} className="recommended-item1" onClick={() =>handleVideoPath(item)}>
            {isLocked && item.subscriptionType==='Pro' && <div className="black-overlay"></div>}
            <img loading="lazy" src={ImagePath + item.subcategory_img} alt={item.subCatName} />
            <h3>{item.subCatName}</h3>
            {item.subscriptionType==='Pro' && isLocked ?( <span className="lock-badge">🔒</span>):item.subscriptionType==='Preview' && isLocked  ?(<span className="layout1-pro-badge-l1">Preview</span>):('')}
          </div>
        ))}
      </div>
            <Welcomebenefits/>
      </div>
      <div className="Browse_Time">
        <h2>Browse Meditation By Time</h2>
      </div>
      <div className="duration-container">
        {meditationTimes?.map((time, index) => (
          <div key={index} className="duration-div" onClick={()=>navigate('/LayoutFilter',{
            state: {
              title:'Browse Meditation by Time',
              timeId: time,
            }
          })}>
            <p style={{color:darkMode?'white':'black'}}>{time.duration} Min</p>
          </div>
        ))}
 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      </div>

      <div className="music-div">
        <div className="bottom-music-cont">
        <h2 style={{ display: "flex", marginLeft: "25px", marginTop: "10px" }}>
          Music
        </h2>
        <span className="mus-seeall" onClick={()=>navigate('/SeeAllMusic')}>See all</span>
        </div>
        <div className="wrap-mus">
        <Music/>
        </div>
      </div>
    </div>
  );
};

export default Layout1;
