import React, { useEffect, useState } from "react";
import "./instructor.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { API_URL4000, ImagePath } from "../../Service/ApiService";

const Instructor = () => {
    const [intructor, setIntructor] = useState([]);
    const [loaded, setLoaded] = useState(false);
//   const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
  const navigate=useNavigate();

  useEffect(() => {
    getAllInstructors();
},[])

  

  const getAllInstructors = async () => {
    const accessToken= localStorage.getItem('accessToken')

    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+ accessToken);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      
      const response = await fetch(API_URL4000+"getAllEligibleInstructors", requestOptions);
     
      const result = await response.json();

      // console.log(result);
      setIntructor(result.response)

    } catch (error) {
       console.log(error);
       
    }
  };

  const handleVideoPath=(subItem)=>{
    // console.log(subItem);
    
    const { description,video,_id,name} = subItem;
      navigate('/InstructorVideo', {
        state: {
          desc: description,
          chunkdatavedio: video,
          _id:_id,
          name:name
        }
      });
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const isMobileView = windowWidth <= 800;
  const intructorData = isMobileView
    ? intructor?.slice(0, 2) // Show only 2 items on mobile
    : intructor?.slice(0, 3); // Show 3 items on larger screens
  return (
    <div className="recommended-classes2">
      {/* <div className="header">
        <h2>Recommended Classes</h2>
        <button className="view-all" onClick={onViewAll}>
          View All
        </button>
      </div> */}
      <div className="classes-list2">
        {intructorData?.map((classItem, index) => (
          <div key={index} className="class-card2">

            <div className="image-wrapper2" onClick={()=>handleVideoPath(classItem)}>
            {!loaded && <div className="placeholder"></div>}
              <img loading="lazy" src={ImagePath+classItem.image} onLoad={() => setLoaded(true)} alt={classItem.subCatName} />
            </div>
            <div className="class-info2">
              <h3 style={{color:'white'}}>{classItem.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructor;
