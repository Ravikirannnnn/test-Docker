import React, { useState, useEffect, useContext } from 'react';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import './SideDrawer.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { themeContext } from "../../Context";
import { API_URL4003, API_URL4004 } from '../../Service/ApiService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCourses } from '../../redux/courseSlice'; 
import { setActiveFilter } from '../../redux/filterSlice'; 
import { toast, Toaster } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';


const SideDrawer = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [duration, setDuration] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(0); 
  const [selectedIntensity, setSelectedIntensity] = useState(0); 
  const [selectedStyle, setSelectedStyle] = useState(''); 
  const [selectedDuration, setSelectedDuration] = useState(0); 
  const [intensity, setIntensity] = useState([]);
  const [selectedCat, setSelectedCat] = useState('');
  const [levels, setLevels] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [styleofyoga, setStyleofyoga] = useState([]);
 const navigate=useNavigate();
  const courses = useSelector((state) => state.courses.data);

    // console.log(courses);
    

  // const categories = ['Yoga', 'Meditation', 'Fitness', 'Education'];
  // const levels = [1, 2, 3, 4];
  const intensities = [1, 2, 3, 4];
  const styles = ['Ashtanga', 'Postnatal', 'Breathwork'];

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const primaryColor = '#ff5f67';

  const dispatch = useDispatch(); // Initialize dispatch

  const activeFilter = useSelector((state) => state.filter.activeFilter);

  useEffect(() => {
    handleGetFilters();
     }, []);


  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isOpen]);

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

        // setCategories(res.response.categories);
        const levelValues = result.response.level.map(level => Number(level));
        setLevels(levelValues); // Keep levels as numbers

        const durationValues = result.response.duration.map(d => Number(d));
        // console.log(durationValues,'durstion');
        
        setDuration(durationValues); // Store the numeric values for duration
  
        const intensityValues = result.response.intensity.map(i => Number(i));
        setIntensity(intensityValues); // Set intensity values
  
          
          setStyleofyoga(result.response.styleofyoga)
          // console.log(result.response);
          
        }
      }
      catch (error) {
      return null;
    }
   
  };


  const handleFilters = async () => {
   
    const selectedStyleArray = [selectedStyle]; // Convert selectedStyle to an array
    const selectedCategoryArray = [selectedCategory]; // Convert selectedCategory to an array

    // Create an object to hold the filtered values
    let filterData = {};

    // Validate and set filter data based on conditions
    if (selectedLevel > 0) {
        filterData.filter_level = selectedLevel.toString();
    }

    if (selectedIntensity > 0) {
        filterData.intensity = selectedIntensity.toString();
    }
// hjkhhkhhk
    if (selectedDuration > 0) {
        filterData.filter_duration = selectedDuration.toString();
    }

    if (selectedStyleArray.length > 0 && selectedStyleArray[0] !== '') {
        filterData.filter_style = selectedStyleArray;
    }
// ??lksjjdflj
    if (selectedCategoryArray.length > 0 && selectedCategoryArray[0] !== '') {
        filterData.filter_categories = selectedCategoryArray;
        dispatch(setActiveFilter(selectedCategory));

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
          console.log(result.data)
          dispatch(setCourses(result.data));
        }
        else{
          console.log(result)
          toast.error(result.message, {
            duration: 1000,
          });
        }
    } catch (error) {
        console.error("No data Found", error);
        return null;
    }
};

  
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDuration(0);
    setSelectedLevel(0);
    setSelectedIntensity(0);
    setSelectedStyle('');
    navigate(0)

  };

  const applyFilters = () => {
    console.log('Filters Applied:', {
      selectedCategory,
      duration,
      selectedLevel,
      selectedIntensity,
      selectedStyle,
    });
  };

  // Levels
const minLevel = 0; // Start from 0 for level
const maxLevel = levels.length > 0 ? Math.max(...levels) : 4; // Dynamic max
const marks = levels.reduce((acc, level) => {
  acc[level] = level.toString(); // Convert the level to string for the mark label
  return acc;
}, {});

// Duration
const minDuration = 0; // Start from 0 for duration
const maxDuration = duration.length > 0 ? Math.max(...duration) : 25; // Dynamic max
const durationMarks = duration.reduce((acc, value) => {
  acc[value] = `${value}`;
  return acc;
}, {});

// Intensity
const minIntensity = 0; // Start from 0 for intensity
const maxIntensity = intensity.length > 0 ? Math.max(...intensity) : 4; // Dynamic max
const intensityMarks = intensity.reduce((acc, value) => {
  acc[value] = `${value}`;
  return acc;
}, {});


  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction='right'
      className='profile-drawer'
      style={{
        // backgroundColor: darkMode ? '#1C1C1E' : '#ffffff',
        height: '100vh',
        width: '300px',
        color:darkMode? 'white':'black'
      }}
    >
      <div className="filters-panel">
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
        <div className="filters-header">
          <h2>Filters</h2>
          <button className="close-button-sd" onClick={onClose}>&times;</button>
        </div>

        {/* Categories Section with Radio Buttons */}
        <div className="filter-section">
          <h3>Categories</h3>
          {categories.map((category) => (
           
                          <label key={category} id='text'>
                             <div className='new-filt'>
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
              />
             <p style={{color:darkMode ? 'white':'black'}}> {category}</p>
             </div>
            </label>
          

          ))}
        </div>

        {/* Duration Section */}
        <div className="filter-section">
          <h3>Duration</h3>
          {duration.length > 0 && (
        <div className="duration-slider">
          <Slider
            min={minDuration}
            max={maxDuration}
            step={duration.length > 1 ? duration[1] - duration[0] : 1} // Ensure discrete steps
            value={selectedDuration}
            onChange={setSelectedDuration}
            marks={durationMarks}
            trackStyle={{ backgroundColor: primaryColor }}
            handleStyle={{ borderColor: primaryColor }}
            dotStyle={{ borderColor: primaryColor }}
            activeDotStyle={{ borderColor: primaryColor }}
            style={{ color: primaryColor, maxWidth: '280px' }}
          />
        </div>
      )}
        </div>

        {/* Levels Section */}
        <div className="filter-section">
          <h3>Levels</h3>
          {levels.length > 0 && (
        <Slider
          min={minLevel}
          max={maxLevel}
          value={selectedLevel}
          onChange={setSelectedLevel}
          marks={marks}
          trackStyle={{ backgroundColor: primaryColor }}
          handleStyle={{ borderColor: primaryColor }}
          dotStyle={{ borderColor: primaryColor }}
          activeDotStyle={{ borderColor: primaryColor }}
          style={{ color: primaryColor, maxWidth: '280px' }}
        />
      )}

        </div>

        {/* Intensity Section */}
        <div className="filter-section">
          <h3>Intensity</h3>
          {intensity.length > 0 && (
        <Slider
          min={minIntensity}
          max={maxIntensity}
          value={selectedIntensity}
          onChange={setSelectedIntensity}
          marks={intensityMarks}
          trackStyle={{ backgroundColor: primaryColor }}
          handleStyle={{ borderColor: primaryColor }}
          dotStyle={{ borderColor: primaryColor }}
          activeDotStyle={{ borderColor: primaryColor }}
          style={{ color: primaryColor, maxWidth: '280px' }}
        />
      )}

        </div>

        {/* Style Section with Radio Buttons */}
        <div className="filter-section">
          <h3>Style</h3>
          {styleofyoga.map((style) => (
            <label key={style}>
              <input
                type="radio"
                name="style"
                value={style}
                checked={selectedStyle === style}
                onChange={() => setSelectedStyle(style)}
              />
              {style}
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="filter-actions">
          <button className="clear-button" onClick={clearFilters}>
            Clear all
          </button>
          <button className="apply-button" onClick={()=>handleFilters()}>
            Apply
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default SideDrawer;
