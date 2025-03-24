import React from 'react'
import './AlbumLayout.css'
import { useLocation,useNavigate } from 'react-router-dom';
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { errorMessage, ImagePath } from '../../Service/ApiService';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import UpgradeModal from '../WelcomePage/WelcomeModal02';
import { useContext,useState } from 'react';
import { themeContext } from '../../Context';
export default function AlbumLayout() {
  const navigate=useNavigate();
  const location=useLocation();
  const {data,title}=location.state || {};
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked = userData?.isSubscribed !== true ? true : false;
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  // const subCategory=data.subCategory;
  // const categoryID=data.category._id;
  console.log(data,'data')
    const [modalOpen, setModalOpen] = useState(false);

  const handleVideoPath=(item)=>{
    if (isLocked && item.subscriptionType === 'Pro') {
          setModalOpen(true)
        }

    const { _id, subdown_vid, subCatName, description, subcategory_img, files, downlowd_vid, audio_list, isLiked, chunk_data,Duration,intensity,categorytype,category_id} = item;
        console.log(item,'chunkdata')
        if(categorytype === 'course'){
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
              data: item.category_id
            }

          });
        }
  }
  return (
    // <>
    // <PageTitle title={title} />
    // <div className='overallDisplay-00-80'>
    //    <div className="today-classes-00-80">
    //           {/* {item.subCategory.map((subitem, index) => ( */}
    //           {data.map((item,index)=>(
    //             <div
    //               className="today-cls-wrap-00-80"
    //               key={index}
    //               onClick={() => handleVideoPath(item)}
    //             >
    //               <div className="img-cls-container-00-80">
    //                 <img src={ImagePath+item.subcategory_img} loading="lazy" alt="" />
    //                 <div className="img-txt-cls-00-80">{item.subCatName}</div>
    //                 {item.subscriptionType === "Preview" ? (
    //                   <div className="new-cls-pro-01-00-80">Preview</div>
    //                 ) : item.subscriptionType === "Pro" ? (
    //                   <div className="new-cls-pro-01-00-80">Pro</div>
    //                 ) : (
    //                   ""
    //                 )}
    //               </div>
    //               {/* <div className="cls-info-container">
    //           <div className="cls-date">{item.title}</div>
    //           <div className="cls-sub-text">{item.description}</div>
    //         </div> */}
    //             </div>
    //             ))}
    //           {/* ))} */}
    //         </div>
    // </div>
    // </>
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: "#222122", color: "#fff" },
        }}
        reverseOrder={true}
      />
    <div className='top-tit-al'>
      <PageTitle title={title}/>
      </div>
    <div className="recommended-container-al">
      {data?.map((item) => (
        <div key={item?._id} className="recommended-item-al" onClick={()=>handleVideoPath(item)}>
          {isLocked && item.subscriptionType === "Pro" && (
                <div className="black-overlay"></div>
              )}
          <img src={ImagePath + item.subcategory_img} loading="lazy" alt={item.subCatName} />
          <p>{item.subCatName}</p>
          {item.subscriptionType==='Preview' && isLocked ?( <span className="pro-badge-al">Preview</span>):item.subscriptionType==='Pro' && isLocked ?(<span className="al-lock-badge">🔒</span>):('')}

        </div>
      ))}
 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

    </div>
    </>
  )
}
