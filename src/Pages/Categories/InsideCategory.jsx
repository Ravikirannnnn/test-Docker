import React, { useState } from 'react'
import './InsideCategory.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { themeContext } from '../../Context'
import { useContext ,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import ProgressBar from '@ramonak/react-progress-bar';
import { API_URL4004, ImagePath } from '../../Service/ApiService';
import Modal from '../../Components/Loader/Modal/Modal';
import { useDispatch, useSelector } from "react-redux";
import { fetchLessons } from "../../redux/lessonsSlice";
import { useRef } from 'react';
// import {Api}
export default function InsideCategory() {
  const dispatch = useDispatch();
  const { lessons, loading, error } = useSelector((state) => state.lessons);

const location=useLocation()
// const {view}=location.state || {};
const {view,sub_Cat_ids,cat_image}=location.state || {};
  const [activeBarItem,setActiveBarItem]=useState(view ? view:'OverView')
  const [lessonData,setLessonData]=useState([])
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  // const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
  // const vidPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/m3u8/';
  const [reTakeTest, setReTakeTest] = useState(false)
  const [alreadyTest, setAlreadyTest] = useState(false)
  const [takeTest, setTakeTest] = useState(false)
  const [premium, setPremium] = useState(false)
  const [showCertificateButton, setShowCertificateButton] = useState(false);
  const [subCat,setSubCat] = useState('')
  const hasFetched = useRef(false);

console.log(view,'view',location.state)


const accessToken=localStorage.getItem('accessToken');
const user_id=localStorage.getItem('user_id');

// console.log(sub_Cat_ids);

const courses = [
  {
    section: "Section 1 - Introductory Course",
    items: [
      {
        title: "So, what is a stock?",
        type: "Video",
        duration: "03:03 mins",
      },
      {
        title: "Quiz on What is a Stock",
        type: "Quiz",
        questions: "3 questions",
      },
    ],
  },
  {
    section: "Section 2 - Stock Basics",
    items: [
      {
        title: "How is Money Made with Stocks?",
        type: "Video",
        duration: "04:29 mins",
      },
     
    ],
  },
];


const [getPremiumModal,setGetPremiumModal]=useState(false);
const [selectedOption, setSelectedOption] = useState('monthly');
const [testStatus,setTestStatus]=useState('')
const [lessonsCovered,setLessonsCovered]=useState(0)

const [resoourceData,setResourceData]=useState([]);
const [selectedCategory, setSelectedCategory] = useState(resoourceData?.length > 0 ? resoourceData[0]?.languages : '');

// const [duration,setDuration]=useState();
// const [timeInSeconds, setTimeInSeconds] = useState(duration);
const [announcement,setAnnouncement]=useState([])
const [subCategory,setSubCategory]=useState([]);
const [subimage,setSubImage]=useState();
const [subName,setSubName]=useState();
const [subTitle,setSubTitle]=useState();
const [subDesTitle,setSubDesTitle]=useState();
const [training_id,setTraining_id]=useState()
const [subDes,setSubDes]=useState()
  const handleBarActive=(item)=>{
    setActiveBarItem(item)
  }
  const [duration, setDuration] = useState(0); // Initialize with 0 or any default value
  const [timeInSeconds, setTimeInSeconds] = useState(duration);
  
  // Update timeInSeconds when duration changes
  useEffect(() => {
    setTimeInSeconds(duration);
  }, [duration]);
  
  const formatTime = (duration) => {
    const minutes = Math.floor(duration / 60);
    const remainingSeconds = duration % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  };
  
  // console.log(training_id,subimage,subName,subDesTitle,'huhuhu')

  const navigate=useNavigate();
  const startTestPath=()=>{
    navigate('/Starttest',{
      state:{
      categoryId:sub_Cat_ids
    }
    })
  }
  const handleVideoPath=(item)=>{
    const { subscriptionType, _id, training_id, lesson_vid, lesson_title, description, lesson_img, files, downlowd_vid, audio_list, isLiked, chunk_data,category_id,intensity,Duration} = item;
    console.log(chunk_data[0]._id);
    
    if (subscriptionType === 'Preview') {
      navigate('/VideoScreen', {
        state: {
          NewId: chunk_data[0]._id,
          id: _id,
          tid: training_id,
          vname: lesson_vid,
          title: lesson_title,
          desc: description,
          lenimg: lesson_img,
          file: files,
          downloadFileName: downlowd_vid,
          audio_files: audio_list,
          likes: isLiked,
          chunkdatavedio: chunk_data,
          Duration:Duration,
          intensity:intensity,
          category_id:category_id,
          sub_Cat_ids:sub_Cat_ids,
          cat_image:cat_image
        }
      });
    } else if (subscriptionType === 'Pro' ) {
      navigate('/VideoScreen', {
        state: {
          id: _id,
          tid: training_id,
          vname: lesson_vid,
          title: lesson_title,
          desc: description,
          lenimg: lesson_img,
          file: files,
          downloadFileName: downlowd_vid,
          audio_files: audio_list,
          liked: isLiked,
          chunkdatavedio: chunk_data,
          Duration:duration,
          intensity:intensity,
          category_id:category_id,
          sub_Cat_ids:sub_Cat_ids,
          cat_image:cat_image
        }
      });
    } else {
      navigate('/InsideCategory');
    }
  }
  useEffect(() => {
    if (sub_Cat_ids) {
      // fetchSubTraining(sub_Cat_ids)
      SubTraningFetch(sub_Cat_ids)
    }
  }, [sub_Cat_ids]);
// console.log(sub_Cat_ids,'subcat')
useEffect(() => {
  if (training_id) {
    // LessonsFetch(training_id);
    // ResourceFetch(training_id)
    // fetchTest(training_id)
  }
}, [training_id]);

const SubTraningFetch=(sub_Cat_Ids)=>{
  const accessToken=localStorage.getItem('accessToken');
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
  const raw = JSON.stringify({
    "category_id": sub_Cat_Ids
  });
  // console.log(raw,'kkk',sub_Cat_Ids,'raw')
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch(API_URL4004+"get_training", requestOptions)
    .then((response) => response.json())
    .then((result) => {console.log(result)
      if(result.Status===true){
        setSubCategory(result.data.SubCategory)
        // image,name,title,descriptionTitle,description;
        setSubImage(result.data.SubCategory[0]?.subcategory_img)
        // setSubName(result.data.SubCategory[0]?.subCatName)
        setSubTitle(result.data.SubCategory[0]?.subCatTitle)
        setSubDesTitle(result.data.SubCategory[0]?.descriptionTitle)
        setSubDes(result.data.SubCategory[0]?.description)
        setTraining_id(result.data.SubCategory[0]?._id)
      }
    })
    .catch((error) => console.error(error));
}

useEffect(() => {
  getOverview()
  LessonsFetch()
  ResourceFetch()
  // fetchTest()
  getQA()
  dispatch(fetchLessons({ sub_Cat_ids }));

}, []);


const getOverview = () =>{
  const user_id=localStorage.getItem('user_id');

  const accessToken=localStorage.getItem('accessToken')
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const raw = JSON.stringify({
    category_id: sub_Cat_ids,
    user_id: user_id
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch(API_URL4004+"get_Overview", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('overview',result)
      if(result.Status === true){
        console.log(result.data.lessonsCovered);
        setLessonsCovered(result.data.lessonsCovered)
        setSubName(result.data.Category.categoryName)
        setDuration(result.data.totalVideoTime)
        setAnnouncement(result.data.announcement)
      }
    })
    .catch((error) => console.error(error));
  }

  const LessonsFetch = (training_id) => {
    const user_id = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("accessToken");
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
    const raw = JSON.stringify({
      "category_id": sub_Cat_ids,
      "user_id": user_id,
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    fetch(API_URL4004 + "getLessonsNewFlow", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("getLessonsNewFlow", result);
        if (result.Status === true) {
          setLessonData(result.data);
        }
      })
      .catch((error) => console.error(error));
  };
  
  const groupByHeadings = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr.headings]) {
        acc[curr.headings] = [];
      }
      acc[curr.headings].push(curr);
      return acc;
    }, {});
  };
  
  
  useEffect(() => {
    if(!hasFetched.current){
      hasFetched.current=true;
      fetchTest()
    }
    return () => {
      // This will run when the component loses focus (unmounts)
      console.log("Component is out of focus");
    };
  }, [location]);


  useEffect(() => {
    console.log("alreadyTest", alreadyTest);
    if (alreadyTest || !premium) {
      console.log('uiuiui.........');
      
      setTakeTest(false);
    }
  }, [alreadyTest, premium]);
 
  // const accessToken=localStorage.getItem('accessToken')
  // console.log(accessToken);

  const getQA = async() => {
    const accessToken=localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+accessToken);
    var raw = JSON.stringify({
      "category_id": sub_Cat_ids
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4004 + "getQNANewFlow", requestOptions)
      .then(response => response.json())
      .then(result => { console.log(result)
      
       })
      .catch(error => console.log('error', error));
  }


  const fetchTest=(training_id)=>{
    const user_id=localStorage.getItem('user_id');
    const accessToken=localStorage.getItem('accessToken')
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const raw = JSON.stringify({
      "user_id": user_id,
      "category_id": sub_Cat_ids
    });

    

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL4004+"getAllTestResponseNewFlow", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result,'NEWREs')
        if(result.status===true){
          //  setReTakeTest(result.testResult.retakeTest)
           setTakeTest(result.testResult.takeTest)
           setAlreadyTest(result.hasCertificate)
           setPremium(true)
          console.log('getAllTestResponseNewFlow',result)
          if (result.response.length > 0 && result.hasCertificate == false) {
            console.log('yes')
            setShowCertificateButton(true);
            setSubCat(result.response[0].subCatName)
          } else {
            setShowCertificateButton(false);
            console.log('no')
          }
        //   if (result.response.length > 0) {
        //     const hasCorrectAnswer = result?.response?.every(item => item?.isCorrect === true);
        //     const hasCorrectAnswer1 = result?.response?.some(item => item?.isCorrect === false);

        //     // console.log('!!!!!!!!!!!',hasCorrectAnswer , hasCorrectAnswer1,result.response[0].isCorrect);
            
            
        //     if (hasCorrectAnswer) {
        //         setShowCertificateButton(true);
        //     } else if (hasCorrectAnswer1) {
        //         setReTakeTest(true);
        //     }
        //     else{
        //       setShowCertificateButton(false);

        //     }
        // }
        }
      })
      .catch((error) => console.error(error));
  }

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handlePremiumModalClose=()=>{
    setGetPremiumModal(false);
  }
  const handlePremiumModalOpen=()=>{
    setGetPremiumModal(true);
  }
  
  const ResourceFetch=(training_id)=>{
    const accessToken=localStorage.getItem('accessToken')
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${accessToken}`);

const raw = JSON.stringify({
  "category_id": sub_Cat_ids
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(API_URL4004+"getResourcesNewFlow", requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result)
    if(result.Status===true){
      setResourceData(result.data)
    }
  })
  .catch((error) => console.error(error));
  }

  const back =()=> {
    console.log("clicking")
    setSelectedCategory()
    // navigate('/Dashboard')?
  }
  const staticResourceData=[
    {
      img:'/assets/Image (2).png',
      maintext:'Yoga Course 01',
      subtext:'lets begin your day with surya namskara'
    },
    {
      img:'/assets/Image (2).png',
      maintext:'Yoga Course 01',
      subtext:'lets begin your day with surya namskara'
    },
    {
      img:'/assets/Image (2).png',
      maintext:'Yoga Course 01',
      subtext:'lets begin your day with surya namskara'
    },
    {
      img:'/assets/Image (2).png',
      maintext:'Yoga Course 01',
      subtext:'lets begin your day with surya namskara'
    },
    {
      img:'/assets/Image (2).png',
      maintext:'Yoga Course 01',
      subtext:'lets begin your day with surya namskara'
    },
  ]


  const handleBackPath = () =>{
    setSelectedCategory(null)
  }

  const lessonOffset = (sectionIndex, data) => {
    const grouped = groupByHeadings(data);
    let offset = 0;
    Object.values(grouped).forEach((lessons, index) => {
      if (index < sectionIndex) {
        offset += lessons.length;
      }
    });
    return offset + 1; // +1 to start from 1 rather than 0
  };

  return (
    <>
    {/* {subCategory.map((item,index)=>{ */}
    <div className='inside-details-main' >
      <PageTitle title={subName}/>
      <div className='big-img'>
        <img src={ImagePath+cat_image} alt="" />
      </div>
      
      <div className='big-bar-main-continer'
       style={{
        backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
      }}
      >
        <div
        className='big-bar-content-1'
        onClick={()=>handleBarActive('OverView')}
        style={{
          backgroundColor:
            activeBarItem === "OverView" ? "#FF5F67" : undefined,
          color: activeBarItem === "OverView" ? "white" : undefined,
          cursor: "pointer",
        }}
        >Overview</div>
        <div
        className='big-bar-content-2'
        onClick={()=>handleBarActive('Lessons')}
        style={{
          backgroundColor:
            activeBarItem === "Lessons" ? "#FF5F67" : undefined,
          color: activeBarItem === "Lessons" ? "white" : undefined,
          cursor: "pointer",
        }}
        >Lessons</div>
        <div
        style={{
          backgroundColor:
            activeBarItem === "Resources" ? "#FF5F67" : undefined,
          color: activeBarItem === "Resources" ? "white" : undefined,
          cursor: "pointer",
        }}
        className='big-bar-content-3'
        onClick={()=>handleBarActive('Resources')}
        >Resources</div>
        <div
        className='big-bar-content-4'
        onClick={()=>handleBarActive('Q&A')}
        style={{
          backgroundColor:
            activeBarItem === "Q&A" ? "#FF5F67" : undefined,
          color: activeBarItem === "Q&A" ? "white" : undefined,
          cursor: "pointer",
        }}
        >Q&A</div>
      </div>

      <div className='subitems-continer'>
        <div>
          <div className='page-subtitle-1'>{subName}</div>
          <div  className='page-subtitle-2'>{subTitle}</div>
        </div>
        {/* <div className='icons-container'>
          <div className='icon-img-1'>
            <img src='/assets/Vector.png')}  alt="" />
          </div>
          <div className='icon-img-3'>
          <img src='/assets/Vector (5).png')}  alt="" />
          </div>
          <div className='icon-img-3'>
          <img src='/assets/Vector (6).png')}  alt="" />
          </div>
        </div> */}
      </div>
        {activeBarItem==='OverView' ? (
      <div className='display-1'>
        <div>
        <ProgressBar
        completed={lessonsCovered}
        maxCompleted={100}
        className='progressive-bar' // Base class for the bar
        completedClassName='barCompleted'
      />
      <style>
        {`
          .barCompleted {
            background-color: #ff5f67;
            height: 20px;
            width: var(--progress-bar-width, 10%);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            border-radius: inherit;
            transition: width 1s ease-in-out;
          }
        `}
      </style>
      <style>
      {`
        .progressive-bar {
          --progress-bar-width: ${lessonsCovered > 0 ? lessonsCovered : 10}%; /* Set dynamic width */
        }
      `}
    </style>
         </div>
         <div className='playing'
           style={{
            backgroundColor: '#FF5F67',
          }}>
          <div className='play-icon-O'><img src='/assets/play-button.png' style={{filter:'invert(100%)'}} alt="play button" /></div>
          <div className='play-time' style={{color:'white'}}>{formatTime(timeInSeconds)} min</div>
         </div>
      
      <div className='subitem-bottom-main-container'>
      <div>
        <div className='user-name-head'>{subDesTitle}</div>
        <div className='user-name-tail'>{subDes}</div>
      </div>
      <div className='down-rectangle-container'>
      {announcement.length>0 &&
        <div className='bottom-subtitle'>Announcements</div>
      }
        {announcement.map((item, index) => (
                  <div key={index} className="rectangle-container-1" style={{ backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)" }}>
                    <div className="rectangle-content-top-1">
                      {item.title} <span>new</span>
                    </div>
                    <div className="rectangle-content-down-1">{item.message}</div>
                  </div>
                ))}
        {/* <div className='rectangle-container-2'
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
          <div className='rectangle-content-top-2'>Live Classes will start from 10 Nov 2023 <span>new</span></div>
          <div className='rectangle-content-down-2'>Loreum ipsum is a dummy text that was generated by a system</div>
        </div> */}
      </div>
      
      </div>
      </div>
      ):activeBarItem==='Lessons'?(
        <div> 
          <div >
          <div className='playing'
           style={{
            backgroundColor: '#FF5F67',
          }}>
          <div className='play-icon'><img loading="lazy" src='/assets/play-button.png' style={{filter:'invert(100%)'}} alt="play button" /></div>
          <div className='play-time' style={{color:'white'}}> {`${Math.floor(Math.round(duration) / 60)}:${Math.round(duration) % 60 < 10 ? '0' : ''}${Math.round(duration) % 60}`}min</div>
         </div>
         {/* {lessonData.map((item,index)=>(      
        
         <div className='lesson-main-container' 
           style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}
          onClick={()=>handleVideoPath(item)}>
          <div className='lessons-video'>
            <img loading="lazy" src={ImagePath+item.lesson_img} alt="" />
          </div>
          <div className='lessons-text-container'>
            <div className='lessons-text-1'>{item.lesson_title}  {item.subscriptionType==='Preview' ?
              (<span>Preview</span>): item.subscriptionType==='Pro' ? (<span>Pro</span>):('')}</div>
            <div  className='lessons-text-2'>{item.Duration}</div>
           

          </div>
          <div className='lessons-arrow'>
            <img loading="lazy" src='/assets/backwel.png')} alt="" />
          </div>

         </div>
          ))} */}
             <div className="container1">
             {Object.entries(groupByHeadings(lessonData))?.map(([heading, lessons], sectionIndex) => (
  <div key={sectionIndex} className="course-section">
    <div className="course-item">
      <h2>Section {sectionIndex + 1} : {heading}</h2>
      {lessons.map((course, lessonIndex) => (
        <div
          key={lessonIndex}
          className="course-details"
          onClick={() => handleVideoPath(course)}
        >
          <div className="title">
            {lessonIndex + lessonOffset(sectionIndex, lessonData)}.&nbsp;
            {course.lesson_title}
          </div>
          <div className="duration">
            &nbsp;&nbsp;&nbsp; {`${Math.floor(Math.round(course.Duration) / 60)}:${Math.round(course.Duration) % 60 < 10 ? '0' : ''}${Math.round(course.Duration) % 60}`} min
          </div>
        </div>
      ))}    
    </div>
  </div>
))}
            </div>
        </div>
       
        </div>
 
      ):activeBarItem==='Resources'?(
        
        <div>
          <div className='playing'
           style={{
            backgroundColor: "#FF5F67",
          }}>
          <div className='play-icon'><img loading="lazy" src='/assets/play-button.png' style={{filter:'invert(100%)'}} alt="play button" /></div>
          <div className='play-time' style={{color:'white'}}> {`${Math.floor(Math.round(duration) / 60)}:${Math.round(duration) % 60 < 10 ? '0' : ''}${Math.round(duration) % 60}`} min</div>
         </div>
         {/* {resoourceData.map((item)=>(
         <div className='lesson-main-container' 
           style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
          <div className='lessons-video'>
            <img loading="lazy" src='/assets/Image (2).png')} ></img>
          </div>
          <div className='lessons-text-container' onClick={()=>
             navigate('/Documents', {
              state: {
                document: item.document,
              }
            })
          }>
            <div className='lessons-text-1'>{item.documentTittle} </div>
            <div  className='lessons-text-21'>{item.description}</div>
          </div>
         </div>
         ))} */}
             <div className="container2">
             <div>
        {/* <div className='com-flex-start1'>
          <div
            className='com-left-arrow-main1'
            style={{ backgroundColor: darkMode ? "#2C2C2E" : "#d8d8df",cursor:'pointer' }}
            onClick={handleBackPath}
          >
            <div className='com-left-arrow1' >
              <img loading="lazy" src='/assets/rightwel.png')} alt="" />
            </div>
          </div>
          <div className='com-title1'>Resources</div>
        </div> */}
    </div>
      {!selectedCategory ? (
        <div className="scroll-container">
          {resoourceData
            ?.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.languages === item.languages)
            )
            .map((item) => (
              <div
                key={item._id}
                className={`category-item`}
                onClick={() => setSelectedCategory(item.languages)}
                style={{backgroundColor: darkMode ? '#2C2C2E' :'#ECECEC',
                  color:darkMode?'white':'black'
                }}
              >
                <p className="category-text" style={{color:darkMode?'white':'black'}}>
                  {item.languages.length > 12
                    ? item.languages.slice(0, 12) + '...'
                    : item.languages}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <div className="selected-category-container">
          <div className='btn-kali'>
                      <PageTitle back={back}  />
                      </div>

          {/* <button onClick={() => setSelectedCategory()}>back</button> */}
          <div className="doc-list">
            {resoourceData
              ?.filter((doc) => !selectedCategory || doc.languages === selectedCategory)
              .map(({ documentTittle, description, image, document }, index) => (
                <div key={index} className={`document-item`}  style={{backgroundColor: darkMode ? '#2C2C2E' :'#ECECEC'}}
                onClick={()=>
                  navigate('/Documents', {
                   state: {
                     document: document,
                   }
                 })
               }
                >
                  <img
                    src='/assets/Image (2).png'
                    alt="document"
                    className="doc-image"
                  />
                  <div className="doc-details">
                    <h3 className="doc-title">{documentTittle}</h3>
                    {/* <p className="doc-description">{description}</p> */}
                  </div>
                  {/* <img
                    src='/assets/docdownload.png')}
                    alt="download"
                    className="download-icon"
                    onClick={() => window.open(document, '_blank')}
                  /> */}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>

        </div>
        
      ):activeBarItem==='Q&A' ? (
        <div>
        {!premium && lessonsCovered === !100? (
      <div className='qa-container'>
        
        <div className='qa-title'>Q&A was hidden</div>
        <div className='qa-sub'>join as premium member to take test & get <br />Certified as professional Trainee </div>
        {/* <div className="qa-btn" onClick={startTestPath}>{testStatus}</div> */}
        <div className="qa-btn" onClick={handlePremiumModalOpen}>Be Premium</div>
     
      </div>
    ):('')}
    {premium && takeTest &&  lessonsCovered === 100 &&  (
            <div className='qa-container'>
        
            {/* <div className='qa-title'>Q&A Test123</div> */}
            <div className='qa-sub'>Click below to get Certified</div>
            {/* <div className="qa-btn" onClick={startTestPath}>{testStatus}</div> */}
            <div className="qa-btn" onClick={startTestPath}>Take Test</div>
          </div>
    )}
    {premium && takeTest && lessonsCovered !== 100  &&(
      <div className='qa-container'>
      <div className='qa-title'>Please finish course to take the test</div>
      </div>
    )}
    {reTakeTest && !showCertificateButton &&(
        <div className='qa-container'>
        <div className='qa-title'>Q&A Test</div>
        <div className='qa-sub'>Take test to get certified as a Yoga teacher Trainee</div>
        <div className="qa-btn" onClick={startTestPath}>Re-take Test</div>
     
      </div>
    )}
    {showCertificateButton && (
      <div className='qa-container'>
        
      <div className='qa-title'>You have already passed the test.</div>
      <div className='qa-sub'>Check your certification below.</div>
      <div className="qa-btn"
      onClick={()=>
        navigate('/Certificate', {
          state: {
            categoryId: sub_Cat_ids, 
            subCat:subName
          }
        })
     }
      >Check your certification</div>
   
    </div>

    )}
    {alreadyTest && (
      <div className='qa-container'>
        
      <div className='qa-title'>You have already passed the test.</div>
      <div className='qa-sub'>Already passed the test? Check your certification below.</div>
      <div className="qa-btn"
      onClick={()=>
        navigate('/CertificateScreen', {
          
        })
     }
      >Check your certification</div>
   
    </div>

    )}
      {/* {showCertificateButton && (
         <div className='qa-container'>
         <div className='qa-title'>You have already passed the test.</div>
         <div className='qa-sub'>Get your certification below.</div>
         <div className="qa-btn">Generate Certificate</div>
       </div>
   
      )} */}
      </div>

      ):null}
       <Modal isOpen={getPremiumModal} onClose={handlePremiumModalClose} >
        <div>
          <div className="premium-top-title">BE PREMIUM</div>
          <div className="premium-title">Get Unlimited <br /> Access</div>
          <div className="premium-text">When you subscribe, you’ll get <br />
          instant unlimited access</div>

          <div >
            <div className='radio-container'style={{backgroundColor: selectedOption==='monthly' ? '#FF5F6747':'#2c2c2e'}} >
              <input type="radio"
               name="option"
               id="radio1" 
              value='monthly'
               onChange={handleRadioChange}
               checked={selectedOption==='monthly'}
               />
              <div className="radio-contents-container-1" for='radio1'>
                <div>
                  <div className="radio-head-1">Monthly</div>
                  <div className="radio-tail-1" style={{color: selectedOption === 'monthly' ? '#ff5f67':'#ffffff',}}>Pay monthly</div>
                </div>
              <div className="radio-right-container">
                <div className="radio-right">
                  <sup>$</sup>
                  19.99
                  <sub>/m</sub></div>
              </div>
            </div>
            </div>
            <div className='radio-container'style={{backgroundColor: selectedOption==='yearly' ? '#FF5F6747':'#2c2c2e'}}>
              <input type="radio"
               name="option"
                id="radio2"
                 value="yearly"
                   onChange={handleRadioChange}
               checked={selectedOption==='yearly'}
               />
              <div className="radio-contents-container-2">
                <div>
                  <div className="radio-head-2">Yearly</div>
                  <div className="radio-tail-2" style={{color: selectedOption==='yearly' ?'#ff5f67':'#ffffff'}}>Pay for full year</div>
                </div>
              <div className="radio-right-container-2">
                <div className="radio-right-2">
                  <sup>$</sup>
                  129.99
                  <sub>/y</sub></div>
              </div>
            </div>
            </div>
          </div>
        <div className="modal-premium-btn">Subscribe Now</div>

        </div>
        </Modal>
      </div>
      {/* // })} */}
      </>
  )
}
