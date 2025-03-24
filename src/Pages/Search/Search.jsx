import React, { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import PageTitle from "../../Components/Loader/Other/PageTitle";
import SideDrawer from "./SideDrawer";
import { API_URL4002, API_URL4003, API_URL4004, errorMessage, ImagePath } from "../../Service/ApiService";
import { useDispatch } from 'react-redux';
import { setCourses } from '../../redux/courseSlice';
import { useSelector } from 'react-redux';
import { setActiveFilter } from '../../redux/filterSlice'; 
import { themeContext } from "../../Context";
import { toast, Toaster } from 'react-hot-toast';
import { fetchUserProfile } from "../../redux/userSlice";
import UpgradeModal from "../WelcomePage/WelcomeModal02";


export default function Search() {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [activeFilter, setActiveFilter] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
  
  const dispatch = useDispatch();
console.log(categories,'categories',filteredCourses,'filteredCourses')
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const userData = useSelector((state) => state.user.profile?.userdata);
    const isLocked = userData?.isSubscribed === false;
  const userId=localStorage.getItem('user_id')
  const courses = useSelector((state) => state.courses.data);
  const activeFilter = useSelector((state) => state.filter.activeFilter);

   useEffect(() => {
      if (userId) {
        dispatch(fetchUserProfile());
      }
    }, [userId, dispatch]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchAllCourse();
    handleGetFilters()
  }, []);
  // console.log(courseData, "courseData");
  
  
  const fetchAllCourse = async () => {
    const accessToken = localStorage.getItem('accessToken');

    const user_id = localStorage.getItem("user_id");
    // const requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };
    // console.log(user_id, "set");
    // fetch(
    //   `${API_URL4003}getAllCousrse/${user_id}`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     if (result.Status === true) {
    //       setCourseData(result.data);
    //       dispatch(setCourses(result.data));
    //       console.log(result.data);
          
    //     }
    //   })

    //   .catch((error) => console.error(error));
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer " + accessToken);

      const raw = JSON.stringify({
        "user_id": user_id
      });
      
      const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
      };

      const response = await fetch(API_URL4003 + "get_filter_Course", requestOptions);
      const result = await response.json();
      if(result.Status === true){
        console.log(result.data)
        dispatch(setCourses(result.data));
      }
      else{
        console.log(result)
      }
  } catch (error) {
      console.error("No data Found", error);
      return null;
  }
  };

  const handleGetFilters = async () =>{
    const accessToken= localStorage.getItem('accessToken')
   
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+ accessToken);
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
        const response = await fetch(API_URL4004+"get_filters", requestOptions);
        if (!response.ok) {
          // ToastAndroid.show('Failed to post data.', ToastAndroid.SHORT);
        }
        const result = await response.json();
        if(result.status == true){
          setCategories(result.response.categories.filter(category => category !== null));
          // console.log(result.response.categories)
        }
      }
      catch (error) {
      return null;
    }
   
  };

  const handleFilters = async (filter) => {
   
    const selectedCategoryArray = [filter]; // Convert selectedCategory to an array

    // Create an object to hold the filtered values
    let filterData = {};

    
    if (selectedCategoryArray.length > 0 && selectedCategoryArray[0] !== '') {
        filterData.filter_categories = selectedCategoryArray;
    }

    console.log(filterData)

    const accessToken = localStorage.getItem('accessToken');

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + accessToken);

        const raw = JSON.stringify(filterData);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(API_URL4003 + "get_filter_Course", requestOptions);
        const result = await response.json();
        if(result.Status === true){
          // setActiveFilter(filter)
          dispatch(setActiveFilter(filter));
          console.log(result.data)
          dispatch(setCourses(result.data));
        }
        else{
          console.log(result)
          errorMessage(result.message, {
            duration: 1000,
          });
        }
    } catch (error) {
        console.error("No data Found", error);
        return null;
    }
};



  const handleViewAll = () => {
    console.log("View all clicked");
    // Implement your logic to view all classes
  };
  const handleVideoPath=(subItem,item,index)=>{
    const { _id, subdown_vid, subCatName, description, subcategory_img, files, downlowd_vid, audio_list, isLiked, chunk_data,Duration,intensity,categorytype,category_id} = subItem;
        console.log(isLiked,'chunkdata')
        if(isLocked && subItem.subscriptionType === 'Pro'){
          setModalOpen(true)
          // errorMessage('Please subscribe to access this content');
          // return;
        }
        else if(categorytype === 'course'){
          navigate('/CourseVideo', {
            state: {
              videoIds:chunk_data[0]._id,
              likes: isLiked,
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
              index:  index
            }

          });
        }
     
  }

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((course) =>
          // console.log(course)
          
          course.category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, courses]);
  
const handleDisplayAllPath=(item)=>{
const allData=item;
navigate('/DisplayAll',{
  state:{data:allData}
})
}
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const isMobileView = windowWidth <= 800;
  const itemsToShow = isMobileView ? 2 : 3;

  // const newfilteredCourses = isMobileView
  //   ? filteredCourses.slice(0, 2)
  //   : filteredCourses.slice(0, 3);
  return (
    <>
      <div>
        <PageTitle title={"Yogic Knowledge"} />
      </div>
      <div className="overall-search-container">
        <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
        <div className="search-bar">
        <input
        type="text"
        placeholder="Search by category"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ color:darkMode?'#FFFFFF': '#000000',backgroundColor:darkMode?'#1C1C1E': '#FFFFFF' }}

      />
        </div>
        <SideDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />

        <div className="category-filters" style={{ color: "red" }}>
          <button className={"filter-button"} onClick={toggleDrawer} style={{backgroundColor:darkMode?'#333': '#FFFFFF',borderWidth:0.5}}>
            <div className="new-button-div">
              <img src="/assets/filter.png" alt="" loading="lazy" style={{filter: darkMode ? 'none' : 'invert(56%) sepia(6%) saturate(245%) hue-rotate(9deg) brightness(94%) contrast(86%)'}}/>
            </div>
            {/* <div>{filter.maintext}</div> */}
          </button>
          {categories.map((filter, index) => (
            <button
              key={index}
              className={`filter-button ${
                activeFilter === filter ? "active" : ""
              }`}
              // onClick={() => setActiveFilter(filter)}
              onClick={()=>handleFilters(filter)}
              style={{backgroundColor:darkMode?'#333': '#FFFFFF',borderColor:darkMode?'#1C1C1E': '#1C1C1E',borderWidth:0.5}}
            >
              {/* <div>
                <img src={filter.img} alt="" />
              </div> */}
              <div  className="new-button-div" style={{color:darkMode?'white':activeFilter === filter ?'white':'black'}}>{filter}</div>
            </button>
          ))}
        </div>
        {filteredCourses.map((item, index) => (
          <div className="wrap-course">
            <div className="top-t-container" key={index}>
              <div className="search-cls-title">
                <h3>{item.category.categoryName}</h3>
                <p onClick={()=>handleDisplayAllPath(item)} style={{color:darkMode ? 'white':'black'}}>See all</p>
              </div>
              {/* <div className="search-v-all" onClick={handleViewAll}>
                View All
              </div> */}
            </div>
            <div className="today-classes">
              {item.subCategory.slice(0, itemsToShow).map((subitem, index) => (
                <div
                  className="today-cls-wrap"
                  key={index}
                  onClick={() => handleVideoPath(subitem,item,index)}
                >
                  <div className={`img-cls-container ${subitem.subscriptionType === 'Pro' && isLocked ?  'pro-overlay-sr' : ''}`}>
                    <img src={ImagePath + subitem.subcategory_img} loading="lazy" alt="" />
                    <div className="img-txt-cls">{subitem.subCatName}</div>
                    {subitem.subscriptionType === "Preview" && isLocked ? (
                      <div className="new-cls-pro-01">Preview</div>
                    ) : subitem.subscriptionType === "Pro" && isLocked ? (
                      <div className="new-cls-pro">🔒</div>
                    ) : (
                      ""
                    )}
                  </div>
            
                </div>
              ))}
            </div>
          </div>
        ))}
           <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
      
      </div>
    </>
  );
}
