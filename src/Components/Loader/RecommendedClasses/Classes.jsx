import React from "react";
import "./Classes.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect,useContext } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { errorMessage } from "../../../Service/ApiService";
import { themeContext } from "../../../Context";
import UpgradeModal from "../../../Pages/WelcomePage/WelcomeModal02";
const Classes = ({ classes, onViewAll ,imageWidth,  imageHeight }) => {

  const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
  const navigate=useNavigate();
         const theme = useContext(themeContext);
            const darkMode = theme.state.darkMode;
  const [loaded, setLoaded] = useState(false);
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked = userData?.isSubscribed !== true ? true : false;
        const [modalOpen, setModalOpen] = useState(false);
  
  // const handleRecommendedClassClick = (classItem) => {
  // console.log(classItem,'clss')

  //   const { _id, subdown_vid, subCatName, description, subcategory_img, files, categorytype, audio_list, isLiked, chunk_data,Duration,intensity,category_id} = classItem;

  //   // if(categorytype === 'course'){
  //     navigate('/ReccomendedVideo', {
  //   state: {
  //     id: _id,
  //     // tid: training_id,
  //     vname: subdown_vid,
  //     title: subCatName,
  //     desc: description,
  //     lenimg: subcategory_img,
  //     file: files,
  //     // downloadFileName: downlowd_vid,
  //     audio_files: audio_list,
  //     likes: isLiked,
  //     chunkdatavedio: chunk_data,
  //     Duration:Duration,
  //     intensity:intensity,
  //     category_id:category_id
  //   }
  // });

  //   // }
  //   // if (item?.subscriptionType === 'Pro') {
  //   //   navigate('/Subscription');
  //   // } else {
  //   // }
  // };

  const handleRecommendedClassClick = (classItem) => {
    // console.log(classItem,'clss')
    if(isLocked && classItem.subscriptionType === 'Pro'){
      setModalOpen(true)
    }
     else if(classItem.categorytype === "course"){
        const { _id, subdown_vid, subCatName, description, subcategory_img, files, category_id, audio_list, isLiked, chunk_data,Duration,intensity} = classItem;
        navigate('/ReccomendedVideo', {
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
            likes: isLiked,
            chunkdatavedio: chunk_data,
            Duration:Duration,
            intensity:intensity,
            category_id:category_id
          }
        });
      }
      else if (classItem.categorytype === "audio"){
        {
          navigate('/InstructorAudio',
            {
              state: {
                data: classItem,
              }
            })
        }
      }
      else if(classItem.categorytype === "yogaTalks"){
        navigate('/PlayVideos',{state: {
          id: classItem._id,
          // tid: video.cat_id,
          vname: classItem.subcategory_vid,
          title: classItem.subCatName,
          desc: classItem.description,
          lenimg: classItem.subcategory_img,
          // file: files,
          downloadFileName: classItem.subcategory_vid,
          // audio_files: audio_list,
          likes: classItem.isliked,
          chunkdatavedio:classItem.chunk_data,
          // Duration:duration,
          // intensity:intensity,
          category_id:classItem.cat_id,
          // sub_Cat_ids:sub_Cat_ids,
          // cat_image:cat_image
        }});
      }
      // if (item?.subscriptionType === 'Pro') {
      //   navigate('/Subscription');
      // } else {
      // }
    };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const isMobileView = windowWidth <= 800;
  const ClassesData = isMobileView
    ? classes?.slice(0, 2) // Show only 2 items on mobile
    : classes?.slice(0, 3); // Show 3 items on larger screens

  return (
    <div className="recommended-classes">
      <Toaster
        toastOptions={{
          style: { backgroundColor: "#222122", color: "#fff" },
        }}
        reverseOrder={true}
      />
      {/* <div className="header">
        <h2>Recommended Classes</h2>
        <button className="view-all" onClick={onViewAll}>
          View All
        </button>
      </div> */}
      <div className="classes-list">
        {ClassesData.map((classItem, index) => (
          <div
            key={index}
            className="class-card"
            onClick={() => handleRecommendedClassClick(classItem)}
          >
            <div className={`image-wrapper`}>
              <div>
                {!loaded && <div className="placeholder"></div>}
                {isLocked && classItem.subscriptionType === "Pro" && (
                <div className="black-overlay"></div>
              )}
                <img
                  loading="lazy"
                  src={imgPath + classItem.subcategory_img}
                  alt={classItem.subCatName}
                  style={{ width: imageWidth, height: imageHeight }}
                  onLoad={() => setLoaded(true)}
                />
              </div>
              {classItem.subscriptionType === 'Pro' && isLocked  ? (
                <span className="classes-lock-badge">🔒</span>
              ) : classItem.subscriptionType === 'Preview' && isLocked ? (
                <span className="classes-pro-badge-01">Preview</span>
              ) : null}
              <div className="class-info">
                <h3 style={{ color: 'white' }}>{classItem.subCatName}</h3>
              </div>
            </div>
          </div>
        ))}
 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      </div>
    </div>
  );
};

export default Classes;
