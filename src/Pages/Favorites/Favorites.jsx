import React, { useEffect, useContext, useState } from 'react';
import './Favorites.css';
import PageTitle from '../../Components/Loader/Other/PageTitle';
import { themeContext } from "../../Context";
import { API_URL4000, API_URL4004, ImagePath } from '../../Service/ApiService';
import { useNavigate } from "react-router-dom";
import InfoCard from '../../Components/InfoCard/InfoCard';

export default function Favorites() {
  const navigate=useNavigate();

  const [activeBarItem, setActiveBarItem] = useState('Videos');
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  const [selectAll, setSelectAll] = useState(false);
  const [selectAll1, setSelectAll1] = useState(false);


  const [yogaTalks, setYogaTalks] = useState(null);
  const [courseLike, setCourseLike] = useState(null);
  const [courseLike1, setCourseLike1] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedIds1, setSelectedIds1] = useState([]);

  const [selectedIds2, setSelectedIds2] = useState([]);


  const fav='fav'
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const back =()=> {
    console.log("clicking")
    navigate('/Dashboard')
  }

  // Call getAllVideo or getAllAudio based on activeBarItem change
  useEffect(() => {
    if (activeBarItem === 'Videos') {
      getLessonFav()
      getAllVideo();
      getYogaTalksFav()
      getRecomendedFav()
    } else if (activeBarItem === 'Music') {
      getAllAudio();
    }
    
  }, [activeBarItem]);

  const getLessonFav = () =>{
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    
    const raw = JSON.stringify({
      "user_id": user_id
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch(API_URL4004+"getLikedLessons", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if(result.status === true){
          console.log(result.response);
          
          setData1(result.response)
        }
        else{
          setData1([])
        }
      })
      .catch((error) => console.error(error));
  }

  const getRecomendedFav = () =>{
    const userId=localStorage.getItem('user_id')
    const token = localStorage.getItem('accessToken');

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
        if (result.Status === true) {
          // Filter items with isLiked === true
          const likedClasses = result.response.filter(item => item.isLiked === true && item.categorytype !== 'audio' && item.categorytype!== "yogaTalks"

          );
          console.log(likedClasses);
          // You can now use `likedClasses` as needed, for example:
          // setsubCourse(likedClasses);
          // setData3(likedClasses);
        } else {
          console.log("No valid data in response");
        }
            console.log(result)
      })
      .catch((error) => console.error(error));

  }



  const getYogaTalksFav = () =>{
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    
    const raw = JSON.stringify({
      "user_id":user_id
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch(API_URL4000+"getaddSubCategoryNewLikesForVideo", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      if(result.status === true){
        console.log(result.response);
        
        setData2(result.response)
      }
      else{
        setData2([])
      }
    })
    .catch((error) => console.error(error));
  }
  // Function to handle the active item (Videos or Music)
  const handleActive = (itemName) => {
    setActiveBarItem(itemName);
  };

  const disLikeYogaTalks = async (item) =>{
      console.log(item,'vid');
      setYogaTalks(item)
    
  }

  const toggleSelection = (id, source) => {
    setSelectedIds((prevSelected) => {
      const exists = prevSelected.find((item) => item.id === id && item.source === source);
      if (exists) {
        return prevSelected.filter((item) => !(item.id === id && item.source === source));
      } else {
        return [...prevSelected, { id, source }];
      }
    });
  };

  const toggleSelection1 = (id, source) => {
    setSelectedIds2((prevSelected) => {
      const exists = prevSelected.find((item) => item.id === id && item.source === source);
      if (exists) {
        return prevSelected.filter((item) => !(item.id === id && item.source === source));
      } else {
        return [...prevSelected, { id, source }];
      }
    });
  };

  
const handleCheckboxChange = (id) => {
  console.log(id);
  
  setSelectedIds1((prevSelected) =>
    prevSelected.includes(id)
      ? prevSelected.filter((itemId) => itemId !== id) // Remove ID if already selected
      : [...prevSelected, id] // Add ID if not selected
  );
};



  // console.log(yogaTalks);

  const getCourseLikes1 = async (vid) => {
    // console.log(courseLike1);
    
    // const user_id = localStorage.getItem('user_id');
    // const token = localStorage.getItem('accessToken');
  
    // try {
    //   const myHeaders = new Headers();
    //   myHeaders.append("Content-Type", "application/json");
    //   myHeaders.append("Authorization", "Bearer " + token);
  
    //   const raw = JSON.stringify({
    //     "video_id": vid,
    //     "user_id": user_id,
    //   });    
  
    //   const requestOptions = {
    //     method: "POST",
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: "follow",
    //   };
  
    //   const response = await fetch(API_URL4004 + "like_Course", requestOptions);
    //   const result = await response.json();
  
    //   if (result.status) {
    //     console.log(result);
    //     setLiked(!liked);
    //     getsubCourse()
    //   } else {
    //     console.log("Error liking the course", result);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };
  
  
  const getCourseLikes = async (vid) => {
    console.log(selectedIds1);

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        const raw = JSON.stringify({
            "video_id": selectedIds1,
            "user_id": user_id,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        const apiUrl = courseLike?.categorytype === "course" 
            ? `${API_URL4004}like_Course`
            : `${API_URL4004}like_lessons`;

        const response = await fetch(apiUrl, requestOptions);
        const result = await response.json();

        if (result.status) {
            console.log(result);
            getLessonFav();
            getAllVideo();
        } else {
            console.log("Error liking the course", result);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const cancel = () =>{
  setSelectedIds([]);
}

const cancel1 = () =>{
  setSelectedIds2([]);
}


const deleteAllSelected = async () => {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("accessToken");

  const courseIds = selectedIds.filter((item) => item.source === "course").map((item) => item.id);
  const lessonIds = selectedIds.filter((item) => item.source === "lesson").map((item) => item.id);
  const subcategoryIds = selectedIds.filter((item) => item.source === "subcategory").map((item) => item.id);
  const recommendedIds = selectedIds.filter((item) => item.source === "recomended").map((item) => item.id);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const apiCalls = [];

    if (courseIds.length > 0) {
      apiCalls.push(
        fetch(`${API_URL4004}like_Course`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            video_id: courseIds,
            user_id,
          }),
        })
      );
    }

    if (lessonIds.length > 0) {
      apiCalls.push(
        fetch(`${API_URL4004}like_lessons`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            video_id: lessonIds,
            user_id,
          }),
        })
      );
    }

    if (subcategoryIds.length > 0) {
      apiCalls.push(
        fetch(`${API_URL4000}addSubCategoryNewLike`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            video_id: subcategoryIds,
            user_id,
            isliked: false,
          }),
        })
      );
    }

    if (recommendedIds.length > 0) {
      apiCalls.push(
        fetch(`${API_URL4004}like_CourseAudio`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            video_id: recommendedIds,
            user_id,
          }),
        })
      );
    }

    const results = await Promise.all(apiCalls);
    const jsonResults = await Promise.all(results.map((res) => res.json()));

    jsonResults.forEach((result, index) => {
      if (result.status) {
        console.log(`API ${index + 1} success`, result);
      } else {
        console.error(`API ${index + 1} failed`, result);
      }
    });

    // Clear selected IDs and refresh data
    setSelectedIds([]);
    getLessonFav();
    getAllVideo();
    getYogaTalksFav();
    getRecomendedFav()
  } catch (error) {
    console.error("Error in deleteAllSelected:", error);
  }
};

const deleteAllSelected1 = async () => {
  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("accessToken");

  const courseIds = selectedIds2.filter((item) => item.source === "Musics").map((item) => item.id);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const apiCalls = [];

    if (courseIds.length > 0) {
      apiCalls.push(
        fetch(`${API_URL4004}like_CourseAudio`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            video_id: courseIds,
            user_id,
          }),
        })
      );
    }

    
    const results = await Promise.all(apiCalls);
    const jsonResults = await Promise.all(results.map((res) => res.json()));

    console.log(results);
    

    jsonResults.forEach((result, index) => {
      if (result.status) {
        console.log(`API ${index + 1} success`, result);
      } else {
        console.error(`API ${index + 1} failed`, result);
      }
    });

    // Clear selected IDs and refresh data
    setSelectedIds2([]);
    getAllAudio()
  } catch (error) {
    console.error("Error in deleteAllSelected:", error);
  }
};

  const dislikeYogaTalks1 = async () =>{
      const user_id = localStorage.getItem('user_id');
      const token = localStorage.getItem('accessToken');
      console.log(selectedIds);
      
      try {
        const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    
    const raw = JSON.stringify({
      "video_id": selectedIds,
      "user_id": user_id,
      "isliked": false
    });
    console.log('raw',raw)
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    const response = await fetch(API_URL4000 + "addSubCategoryNewLike", requestOptions);
    const result = await response.json();
    
    if (result.status) {
      console.log(result);
      getYogaTalksFav()
    } else {
      console.log("Error liking the course", result);

    }
    } catch (error) {
    console.error("Error:", error);
    }
    
  }

  const getAllVideo = async () => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(API_URL4004 + `getLikedVideos/${user_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        let combinedData = [];
        console.log(result);

        result?.response.forEach(item => {
          if (item?.course_data) {
            combinedData.push({ ...item.course_data, type: 'course' });
          }
          // if (item?.lession_data) {
          //   combinedData.push({ ...item.lession_data, type: 'lesson' });
          // }
        });
        
        setData(combinedData);
      })
      .catch((error) => console.error(error));
  };

  const getAllAudio = async () => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(API_URL4004 + `getLikedAudio/${user_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const likedClasses = result.response.filter(item => item.isLiked === true);
        setData4(likedClasses);
      })
      .catch((error) => console.error(error));
  };

  const CourseVideo = (item) =>{
    const video=item;
    console.log(item);
    
    navigate('/PlayVideos',{state: {
      id: video._id,
      // tid: video.cat_id,
      // title:
      vname: video.subcategory_vid,
      title: video.subCatName,
      desc: video.description,
      lenimg: video.subcategory_img,
      // file: files,
      downloadFileName: video.subcategory_vid,
      // audio_files: audio_list,
      // liked: isLiked,
      chunkdatavedio:video.chunk_data,
      // Duration:duration,
      // intensity:intensity,
      category_id:video.cat_id,
      // sub_Cat_ids:sub_Cat_ids,
      // cat_image:cat_image
      fav:fav

    }});
  }
console.log(data,'ffff',data1,'ffff',data2

)
  const LessonVideo = (item) =>{
    const video=item;
    console.log(item);

    navigate('/PlayVideos',{state: {
      id: video._id,
      // tid: video.cat_id,
      vname: video.subcategory_vid,
      title: video.lesson_title,
      desc: video.description,
      lenimg: video.subcategory_img,
      // file: files,
      downloadFileName: video.subcategory_vid,
      // audio_files: audio_list,
      // liked: isLiked,
      chunkdatavedio:video.chunk_data,
      // Duration:duration,
      // intensity:intensity,
      category_id:video.cat_id,
      // sub_Cat_ids:sub_Cat_ids,
      // cat_image:cat_image
      fav:fav

    }});
  }

  const yogaTalksVideo = (item) =>{
    const video=item;
    console.log(item);

    navigate('/PlayVideos',{state: {
      id: video._id,
      // tid: video.cat_id,
      // vname: video.subCatName,
      title: video.subCatName,
      desc: video.description,
      lenimg: video.subcategory_img,
      // file: files,
      // downloadFileName: video.subcategory_vid,
      // audio_files: audio_list,
      // liked: isLiked,
      chunkdatavedio:video.chunk_data,
      // Duration:duration,
      // intensity:intensity,
      category_id:video.cat_id,
      fav:fav
      // sub_Cat_ids:sub_Cat_ids,
      // cat_image:cat_image
    }});
  }
  const handleMusic=()=>{
    navigate('/SeeAllMusic')
  }
 const handleVideo=()=>{
    navigate('/Category')
  }

  const handleSelectAll = () => {
    if (!selectAll) {
      // Combine all IDs from data, data1, and data2 with their respective sources
      const allSelections = [
        ...data.map((item) => ({ id: item?.chunk_data[0]?._id, source: 'course' })),
        ...data1.map((item) => ({ id: item?.chunk_data[0]?._id, source: 'lesson' })),
        ...data2.map((item) => ({ id: item?.chunk_data[0]?._id, source: 'subcategory' })),
        ...data3.map((item) => ({ id: item?._id, source: 'recomended' })),
      ];
      setSelectedIds(allSelections);
    } else {
      setSelectedIds([]); // Clear all selections
      console.log('here');
      
    }
    setSelectAll(!selectAll);
  };

  const handleSelectAll1 = () => {
    if (!selectAll1) {
      // Combine all IDs from data, data1, and data2 with their respective sources
      const allSelections = [
        ...data4.map((item) => ({ id: item?._id, source: 'Musics' })),
      ];
      setSelectedIds2(allSelections);
    } else {
      setSelectedIds2([]); // Clear all selections
      
    }
    setSelectAll1(!selectAll);
  };


  return (
    <>
      <div>
        <PageTitle back={back} title={'Favorites'} />
      </div>
      <div className='overall-fav-container'>
        <div>
          <div className='fav-bar'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }}>
            <div className='fav-videos'
              style={{
                backgroundColor: activeBarItem === 'Videos' ? "#FF5F67" : undefined,
                color: activeBarItem === "Videos" ? "white" : undefined,
                cursor: "pointer"
              }}
              onClick={() => handleActive('Videos')}
            >Videos</div>

            {/* <div className='fav-videos'
              style={{
                backgroundColor: activeBarItem === 'YogaTalksVideo' ? "#FF5F67" : undefined,
                color: activeBarItem === "YogaTalksVideo" ? "white" : undefined,
                cursor: "pointer"
              }}
              onClick={() => handleActive('YogaTalksVideo')}
            >Yoga Talks Video</div>
             */}
            <div className='fav-audios'
              style={{
                backgroundColor: activeBarItem === 'Music' ? "#FF5F67" : undefined,
                color: activeBarItem === "Music" ? "white" : undefined,
                cursor: "pointer"
              }}
              onClick={() => handleActive('Music')}
            >Music</div>
          </div>
        </div>
        {activeBarItem === 'Videos' ? (
          <>
          {data?.length === 0 && data1?.length===0 && data2?.length===0 && data3?.length === 0 ? 
          <div>
            <InfoCard
            imageSrc='/assets/newnewplay.png'
            title="No Videos Available"
            subtitle="It looks like you haven’t put any videos in favourites yet. Browse our catalog to find something you'll love."
            buttonText="Discover Videos"
            onButtonClick={handleVideo}
          />
          </div>:
          
          <div style={{display:'flex',flexDirection:'column'}}>
          <div className="checkboc-fv">
            Select All
            <input 
              type="radio" 
              checked={selectAll} 
              readOnly
              // onChange={handleSelectAll} 
              onClick={(event) => {
                event.stopPropagation();
                handleSelectAll();
              }}
            />
          </div>
          <div>
            {data?.map((item, index) => (
              <div key={index} className='fav-contents-container' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} onClick={()=>CourseVideo(item)}>
                <div className='fav-img'>
                  <img loading="lazy" src={ImagePath + item?.subcategory_img} alt="" />
                </div>
                <div className='fav-text-container'>
                  <div className='fav-text'>{item?.subCatName}</div>
                  {/* <div className='fav-time'>{`${item?.Duration?.charAt(0)}:${item?.Duration?.substring(1, 2)}`} Min</div> */}
                </div>
                <div className='rad-newww'>
                <input
                  type="radio"
                  checked={selectedIds.some((sel) => sel.id === item?.chunk_data[0]?._id && sel.source === 'course')}
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSelection(item?.chunk_data[0]?._id, 'course'); // Pass 'course' as the source
                  }}
                />
            </div>
              </div>
            ))}
           
            {data1?.map((item, index) => (
              <div key={index} className='fav-contents-container' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} onClick={()=>LessonVideo(item)}>
                <div className='fav-img'>
                  <img loading="lazy" src={ImagePath + item?.lesson_img} alt="" />
                </div>
                <div className='fav-text-container'>
                  <div className='fav-text'>{item?.lesson_title}</div>
                  {/* <div className='fav-time'>{`${item?.Duration?.charAt(0)}:${item?.Duration?.substring(1, 2)}`} Mins</div> */}
                </div>
                <div className='rad-newww'>
                <input
                  type="radio"
                  checked={selectedIds.some((sel) => sel.id === item?.chunk_data[0]?._id && sel.source === 'lesson')}
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSelection(item?.chunk_data[0]?._id, 'lesson'); // Pass 'lesson' as the source
                  }}
                />
            </div>
              </div>
            ))}
                    {data2?.map((item, index) => (
              <div key={index} className='fav-contents-container' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} onClick={()=>yogaTalksVideo(item)}>
                <div className='fav-img'>
                  <img loading="lazy" src={ImagePath + item?.subcategory_img} alt="" />
                </div>
                <div className='fav-text-container'>
                  <div className='fav-text'>{item?.subCatName}</div>
                  {/* <div className='fav-time'>{`${item?.duration}`} Mins</div> */}
                </div>
                <div className='rad-newww'>
                <input
                  type="radio"
                  checked={selectedIds.some((sel) => sel.id === item?.chunk_data[0]?._id && sel.source === 'subcategory')}
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSelection(item?.chunk_data[0]?._id, 'subcategory'); // Pass 'subcategory' as the source
                  }}
                />
            </div>
              </div>
            ))}
            {data3?.map((item, index) => (
              <div key={index} className='fav-contents-container' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} onClick={()=>CourseVideo(item)}>
                <div className='fav-img'>
                  <img loading="lazy" src={ImagePath + item?.subcategory_img} alt="" />
                </div>
                <div className='fav-text-container'>
                  <div className='fav-text'>{item?.subCatName}</div>
                  {/* <div className='fav-time'>{`${item?.Duration?.charAt(0)}:${item?.Duration?.substring(1, 2)}`} Min 123</div> */}
                </div>
                <div className='rad-newww'>
                <input
                  type="radio"
                  checked={selectedIds.some((sel) => sel.id === item?._id && sel.source === 'recomended')}
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSelection(item?._id, 'recomended'); // Pass 'course' as the source
                  }}
                />
            </div>
              </div>
            ))}
           
             <div className='buttons-container-fav'>
          <div className='dow-cancel-fav' onClick={cancel}>
            Cancel
          </div>
          <div className='dow-delete-fav' onClick={()=>deleteAllSelected()}>
            Delete
          </div>
        </div>
             </div>
             </div>
        }

          </>
        ) : activeBarItem === 'Music' ? (
          <>
          {data4?.length===0 ? 
        <div>
          <InfoCard
          imageSrc='/assets/musical-note.png'
            title="No Music Available"
            subtitle="It looks like you haven’t put any music in favourites yet. Browse our catalog to find something you'll love."
            buttonText="Discover Music"
            onButtonClick={handleMusic}
          />
        </div>  
        :
        <>
        <div style={{display:'flex',flexDirection:'column'}}>
          <div className="checkboc-fv">
            Select All
            <input 
              type="radio" 
              checked={selectAll1} 
              readOnly
              // onChange={handleSelectAll} 
              onClick={(event) => {
                event.stopPropagation();
                handleSelectAll1();
              }}
            />
          </div>
          <div>
            {data4?.map((item, index) => (
              <div key={index} className='fav-contents-container' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} 
              onClick={()=>navigate('/FavAudio',
                {
                  state: {
                    data: item.category_id
                  }
                }
              )}>
                <div className='fav-img'>
                  <img loading="lazy" src={ImagePath + item?.subcategory_img} alt="" />
                </div>
                <div className='fav-text-container'>
                  <div className='fav-text'>{item?.subCatName}</div>
                  {/* <div className='fav-time'>{`${item?.Duration?.charAt(0)}:${item?.Duration?.substring(1, 3)}`} Mins</div> */}
                </div>
                <div className='rad-newww'>
                <input
                  type="radio"
                  checked={selectedIds2.some((sel) => sel.id === item?._id && sel.source === 'Musics')}
                  readOnly
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleSelection1(item?._id, 'Musics'); // Pass 'course' as the source
                  }}
                />
            </div>
              </div>
            ))}
             <div className='buttons-container-fav'>
          <div className='dow-cancel-fav' onClick={cancel1}>
            Cancel
          </div>
          <div className='dow-delete-fav' onClick={deleteAllSelected1}>
            Delete
          </div>
        </div>
            </div>
            </div>
            </>
        }

          </>
        ) :
        //  activeBarItem === 'YogaTalksVideo' ? (
        //   <>
        //   {data2?.length===0 ? 
        //   <div>
        //     <InfoCard
        //     imageSrc='/assets/newnewplay.png')}
        //     title="No Videos Available"
        //     subtitle="It looks like you haven’t put any videos in favourites yet. Browse our catalog to find something you'll love."
        //     buttonText="Discover Videos"
        //     onButtonClick={handleVideo}
        //   />
        //   </div>:
        //   <>
          
        //   <div>
            
            
        //      {data2?.map((item, index) => (
        //       <div key={index} className='fav-contents-container' style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df" }} onClick={()=>yogaTalksVideo(item)}>
        //         <div className='fav-img'>
        //           <img loading="lazy" src={ImagePath + item?.subcategory_img} alt="" />
        //         </div>
        //         <div className='fav-text-container'>
        //           <div className='fav-text'>{item?.subCatName}</div>
        //           <div className='fav-time'>{`${item?.duration}`} Mins</div>
        //         </div>
        //         <div>
        //         <input
        //           type="radio"
        //           checked={selectedIds.includes(item?.chunk_data[0]?._id)} 
        //           readOnly 
        //           onClick={(event) => {
        //             event.stopPropagation();
        //             toggleSelection(item?.chunk_data[0]?._id);
        //           }}
        //         />
        //     </div>
        //       </div>
        //     ))}
        //      <div className='buttons-container-fav'>
        //   <div className='dow-cancel-fav'>
        //     Cancel
        //   </div>
        //   <div className='dow-delete-fav'  onClick={()=>dislikeYogaTalks1()}>
        //     Delete
        //   </div>
        // </div>
        //      </div>
        //      </>
        // }

        //   </>
        // ) : 
        ""}
      </div>
    </>
  );
}
