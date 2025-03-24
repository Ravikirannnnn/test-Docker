import React from 'react'
import './DisplayAll.css'
import { useLocation,useNavigate } from 'react-router-dom';
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { ImagePath } from '../../Service/ApiService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/userSlice';
import { useEffect ,useContext,useState} from 'react';
import { themeContext } from "../../Context";

import UpgradeModal from '../WelcomePage/WelcomeModal02';
export default function DisplayAll() {
  const navigate=useNavigate();
  const location=useLocation();
  const {data}=location.state || {};
   const [modalOpen, setModalOpen] = useState(false);
   const theme = useContext(themeContext);
     const darkMode = theme.state.darkMode;
  const subCategory=data.subCategory;
  const categoryID=data.category._id;
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.profile?.userdata);
    const isLocked = userData?.isSubscribed === false;
  const userId=localStorage.getItem('user_id')
  const activeFilter = useSelector((state) => state.filter.activeFilter);

   useEffect(() => {
      if (userId) {
        dispatch(fetchUserProfile());
      }
    }, [userId, dispatch]);

  const handleVideoPath=(item,index)=>{
    const { _id, subdown_vid, subCatName, description, subcategory_img, files, downlowd_vid, audio_list, isLiked, chunk_data,Duration,intensity,categorytype,category_id} = item;
        console.log(item,'chunkdata')
        if(isLocked && item.subscriptionType === 'Pro'){
          setModalOpen(true)
          // errorMessage('Please subscribe to access this content');
          // return;
        }
        else if(categorytype === 'course'){
          navigate('/CourseVideo', {
            state: {
              id: _id,
              // tid: training_id,
              vname: subdown_vid,
              title: subCatName,
              desc: description,
              lenimg: subcategory_img,
              file: files,
              // downloadFileName: downlowd_vid,
              audio_files: audio_list,
              liked: isLiked,
              chunkdatavedio: chunk_data,
              Duration:Duration,
              intensity:intensity,
          category_id:category_id
            }
          });
        }
        else if(categorytype === 'audio'){
          navigate('/Audio', {
            state: {
              index: index
            }

          });
        }
  }
  return (
    <>
    <PageTitle title={data.category.categoryName}/>
    <div className='overallDisplay-00'>
       <div className="today-classes-00">
              {/* {item.subCategory.map((subitem, index) => ( */}
              {subCategory.map((item,index)=>(
                <div
                  className="today-cls-wrap-00"
                  key={index}
                  onClick={() => handleVideoPath(item,index)}
                >
                  <div className={`img-cls-container-00 ${item.subscriptionType === 'Pro' && isLocked ?  'pro-overlay-da' : ''}`}>
                    <img src={ImagePath+item.subcategory_img} loading="lazy" alt="" />
                    <div className="img-txt-cls-00">{item.subCatName}</div>
                    {item.subscriptionType === "Preview" && isLocked ? (
                      <div className="new-cls-pro-01-00">Preview</div>
                    ) : item.subscriptionType === "Pro" && isLocked ? (
                      <div className="new-cls-pro-01-001">🔒</div>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="cls-info-container">
              <div className="cls-date">{item.title}</div>
              <div className="cls-sub-text">{item.description}</div>
            </div> */}
                </div>
                ))}
              {/* ))} */}
            </div>
                       <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
    </>
  )
}
