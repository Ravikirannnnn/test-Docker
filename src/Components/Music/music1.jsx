import React, { useEffect, useState } from "react";
import "./music1.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { API_URL4000, ImagePath } from "../../Service/ApiService";

const Music1 = () => {
    const [audioData, setAudioData] = useState([]);

//   const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
  const navigate=useNavigate();

  useEffect(() => {
    getCategory2();
},[])


const getCategory2 = async () => {
    try {
        const accessToken= localStorage.getItem('accessToken')
        const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + accessToken);
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: "",
        redirect: "follow"
      };
  
      const response = await fetch(API_URL4000 + "get_Allcourse", requestOptions);
      const result = await response.json();
  
      // Filter the result to only include categories where categoryType is "audio"
      const filteredData = result.data.filter(item => item.category.categorytype === "audio");
  
      console.log(filteredData);
      setAudioData(filteredData)
      
    } catch (error) {
      console.error(error);
    }
  }
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const isMobileView = windowWidth <= 800;
  const slicedAudioData = isMobileView
    ? audioData.slice(0, 2) // Show only 2 items on mobile
    : audioData.slice(0, 3); // Show 3 items on larger screens


  const handleRecommendedClassClick = (classItem) => {
  console.log(classItem,'clss')
  };

  return (
    <div className="recommended-container2">
        {slicedAudioData?.map((classItem, index) => (

            <div key={index} className="recommended-item2" onClick={()=>navigate('/Audio',
              {
                state: {
                  data: classItem.category._id
                }
              }
            )}>
              <img loading="lazy" src={ImagePath+classItem.subCategory[0].subcategory_img} alt={classItem.subCatName} />
              {classItem.subscriptionType==='Preview' ?( <span className="pro-badge1">Preview</span>):classItem.subscriptionType==='Pro' ?(<span className="pro-badge1">Pro</span>):('')}
              <h3>{classItem.subCategory[0].subCatName}</h3>

            </div>
            
        ))}
    </div>
  );
};

export default Music1;
