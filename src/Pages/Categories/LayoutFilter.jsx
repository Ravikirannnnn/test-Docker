import React, { useEffect, useState,useContext } from 'react';
import './LayoutFilter.css'; // Import the external CSS
import { API_URL4000, API_URL4004, ImagePath } from '../../Service/ApiService';
import { useLocation,useNavigate } from 'react-router-dom';
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { useSelector } from 'react-redux';
import UpgradeModal from '../WelcomePage/WelcomeModal02';
import { themeContext } from '../../Context';
const SeeAllInstructors = () => {
    const location=useLocation();
    const {timeId,title,ids}=location.state || {}
    const navigate=useNavigate();
    const userData = useSelector((state) => state.user.profile?.userdata);
    const isLocked = userData?.isSubscribed !== true ? true : false;
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
        const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
      if (timeId?.duration) {
          getFilterCategory();
      }
      if (timeId?.styleOfyoga) {
          getFilterCategory1();
      }
  }, [timeId]);

const handleback=()=>{
  navigate(-1,{
    state:{
      ids:ids
    }
  })
}
const [data,setData] = useState([]);


const getFilterCategory = async () => {
    const user_id=localStorage.getItem('user_id')
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch(API_URL4004 +`filter_video_categories?filter_duration=${timeId.duration}&user_id=${user_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        console.log("filter data",result?.response.All)
        setData(result?.response?.All)
        // setCategories(result?.categories_style)


      })
      .catch((error) => console.error(error));
  }

  const getFilterCategory1 = async () => {
    const user_id=localStorage.getItem('user_id')
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch(API_URL4004 +`filter_video_categories?filter_style=${timeId.styleOfyoga}&user_id=${user_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        console.log("filter data",result)
        setData(result?.response?.All)


      })
      .catch((error) => console.error(error));
  }


  const handleVideoPath=(subItem)=>{
    const { _id, subdown_vid, subCatName, description, subcategory_img, files, downlowd_vid, audio_list, isLiked, chunk_data,Duration,intensity,category_data} = subItem;
        // console.log(chunk_data,'chunkdata',subItem)
        if(isLocked && subItem.subscriptionType === 'Pro'){
          setModalOpen(true)
          }
          else{
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
          downloadFileName: downlowd_vid,
          audio_files: audio_list,
          likes: isLiked,
          chunkdatavedio: chunk_data,
          Duration:Duration,
          intensity:intensity,
          category_id:category_data._id
        }
      })};
  }


  return (
    <div>
    <div className="new-nn-lf">
      <PageTitle title={title ? title :'yoga filters'} back={handleback}/>

    </div>
    <div className="recommended-container3">
      {data?.map((item) => (
        <div key={item._id} 
        className={`recommended-item3 ${item.subscriptionType === 'Pro' && isLocked ?  'pro-overlay-item-fl' : ''}`}
         onClick={()=>handleVideoPath(item)}>
          
          <img src={ImagePath + item.subcategory_img} alt={item.subCatName} />
          <h3>{item.subCatName}</h3>
          {item.subscriptionType==='Preview' && isLocked?( <span className="pro-badge-lf">Preview</span>):item.subscriptionType==='Pro' && isLocked?(<span className="pro-badge-lf-00">🔒</span>):('')}

        </div>
      ))}
 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

    </div>
    </div>
  );
};

export default SeeAllInstructors;
