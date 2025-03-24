import React, { useEffect, useState,useContext } from "react";
import "./Layout2.css"; // Import the stylesheet
import { API_URL4004, ImagePath } from "../../Service/ApiService";
import Music1 from "../../Components/Music/music1";
import { useLocation,useNavigate } from 'react-router-dom';
import { themeContext } from "../../Context";
import PageTitle from "../../Components/Loader/Other/PageTitle";
import Welcomebenefits from "../WelcomePage/Welcomebenefits";
import Classes from "../../Components/Loader/RecommendedClasses/Classes";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import UpgradeModal from "../WelcomePage/WelcomeModal02";

const Layout1 = () => {
  const location=useLocation();
  const {ids,image,name}=location.state || {}
  const navigate=useNavigate()
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked = userData?.isSubscribed !== true ? true : false;
        const [modalOpen, setModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [meditationTimes, setMeditationTimes] = useState([]);
  const [yogaNames, setYogaNames] = useState([]);
  const [data, setData] = useState([]);
  const [title,setTitle]=useState('')
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredData = data?.filter(item => 
    item.subCatName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [classesData,setClassesData]=useState([])

  useEffect(() => {
    getCourse();
    fetchRecommendedClasses();
  }, []);

  const fetchRecommendedClasses=async()=>{
    const token=await localStorage.getItem('accessToken')
    const userId=localStorage.getItem('user_id')

//      const myHeaders = new Headers();
//  myHeaders.append("Authorization", "Bearer "+token);


//  const requestOptions = {
//    method: "GET",
//    headers: myHeaders,
//    redirect: "follow"
//  };

//  fetch(API_URL4004+"get_recommanded_Classes", requestOptions)
//    .then((response) => response.json())
//    .then((result) => {console.log(result)
//      if(result.Status===true){
//        setClassesData(result.response);
//      }
//    })
//    .catch((error) => console.error(error));
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
     setClassesData(result.response);
   }
   console.log(result)
 })
 .catch((error) => console.error(error));
  }




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
          console.log(result.data.filter_types.filetrDurations);
          setData(result.data.courseData)
          setMeditationTimes(result.data.filter_types.filetrDurations);
          setYogaNames(result.data.filter_types.filterstyleOfYoga)
          setTitle(result.data.categorydata.categoryName)
        } else {
          console.log(result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleVideoPath=(subItem)=>{
    const { _id, subdown_vid, subCatName, description, subcategory_img, files, category_id, audio_list, isLiked, chunk_data,Duration,intensity,categorytype} = subItem;

    if(isLocked && subItem.subscriptionType === 'Pro'){
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
  const yogaImages = [
    '/assets/yoga1.png',
    '/assets/yoga2.png',
    '/assets/yoga3.png',
    '/assets/yoga4.png', 
    '/assets/yoga6.png', 
    '/assets/yoga7.png', 
    '/assets/yoga8.png', 
    '/assets/yoga9.png', 
    '/assets/yoga10.png', 
    '/assets/yoga5.png', 
  
  ];
  
  const defaultImage = '/assets/yoga4.png'

  const SeeAll=()=>{
    navigate('/AlbumLayout',
      {state:{data:data,title:title}})
  }

  return (
    <div className="overall-layout-02-09">
      <Toaster
        toastOptions={{
          style: { backgroundColor: "#222122", color: "#fff" },
        }}
        reverseOrder={true}
      />
      <div className="new-title-09">
      <PageTitle title={title} />
      </div>
      <div className="layout-container-09">
        <div className="search-bar-09">
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
        <div className="new-all-02-09" onClick={SeeAll}>See all</div>
      <div className="recommended-container1-09">
        {filteredData?.slice(0, 5).map((item) => (
          <div key={item._id} className="recommended-item1-09" onClick={()=>handleVideoPath(item)}>
            {isLocked && item.subscriptionType === "Pro" && (
                <div className="black-overlay"></div>
              )}

            <img loading="lazy" src={ImagePath + item.subcategory_img} alt={""} />
            <h3>{item.subCatName}</h3>
            {item.subscriptionType === 'Pro' && isLocked  ? (
                <span className="layout2-lock-badge">🔒</span>
              ) : item.subscriptionType === 'Preview' && isLocked ? (
                <span className="layout2-preview-badge-l2">Preview</span>
              ) : null}

          </div>
        ))}
      </div>
      </div>
      <div >
      <Welcomebenefits />
      </div>
      <div className="duration-container2-09">
        {yogaNames.map((time, index) => (
          <div key={index} className="duration-div2-09" onClick={()=>navigate('/LayoutFilter',{
            state: {
              ids:ids,
              title:'Browse Yoga by Style',
              timeId: time,
            }
          })}>
            <img loading="lazy" src={index < yogaImages.length ? yogaImages[index] : defaultImage} alt={"yoga style"} style={{height:'20px',width:'20px',filter: darkMode ? 'invert(100%)' : 'none'}} />
            <p style={{color:darkMode?'white':'black'}}>{time.styleOfyoga.slice(0, 8)}</p>
          </div>
        ))}
      </div>

      <div className="Browse_Time-09">
        <h2>Browse Yoga By Time</h2>
      </div>
      <div className="duration-container-09">
        {meditationTimes.map((time, index) => (
          <div key={index} className="duration-div-09" onClick={()=>navigate('/LayoutFilter',{
            state: {
              title:'Browse Yoga by Time',
              timeId: time,
            }
          })}>
            <p style={{color:darkMode ? 'white':'black'}}>{time.duration} Min</p>
          </div>
        ))}
 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      </div>

      <div className="music-div-09">
        <div className="new-rec-new-09">
        <h2 style={{ display: "flex", marginLeft: "25px", marginTop: "10px" }}>
        Recommended Classes
        </h2>
        <span className="home-down-see-more-09" onClick={()=>navigate('/SeeAllRecommended')}>See all</span>
        </div>
        <div className="cls-cls-new-09">       
           <Classes classes={classesData} />
        </div>

      </div>
    </div>
  );
};

export default Layout1;
