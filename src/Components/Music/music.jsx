import React, { useEffect, useState ,useContext} from "react";
import "./music.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
import { API_URL4000, API_URL4004, ImagePath } from "../../Service/ApiService";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { themeContext } from "../../Context";
import UpgradeModal from "../../Pages/WelcomePage/WelcomeModal02";
const Music = () => {
  const [audioData, setAudioData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //   const imgPath='https://bodespherbucket.s3.ap-south-1.amazonaws.com/images/';
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.profile?.userdata);
  const isLocked = userData?.isSubscribed !== true ? true : false;
        const [modalOpen, setModalOpen] = useState(false);
  const theme = useContext(themeContext);
            const darkMode = theme.state.darkMode;
  useEffect(() => {
    getAudioNew();
  }, []);

  const getCategory2 = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + accessToken);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: "",
        redirect: "follow",
      };

      const response = await fetch(
        API_URL4000 + "get_Allcourse",
        requestOptions
      );
      const result = await response.json();

      // Filter the result to only include categories where categoryType is "audio"
      const filteredData = result.data.filter(
        (item) => item.category.categorytype === "audio"
      );

      // console.log(filteredData, "audiii");
      setAudioData(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const getAudioNew = () => {
    const user_id = localStorage.getItem("user_id");
    // console.log(user_id);

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(API_URL4004 + "getLikedAudio/" + user_id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log("New new", result.response);
        setAudioData(result.response);
      })
      .catch((error) => console.error(error));
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = windowWidth <= 800;
  const slicedAudioData = isMobileView
    ? audioData?.slice(0, 2) // Show only 2 items on mobile
    : audioData?.slice(0, 3); // Show 3 items on larger screens

  const handleRecommendedClassClick = (classItem, index) => {
    // console.log(classItem, "clss");
    if (isLocked && classItem.subscriptionType === 'Pro') {
      setModalOpen(true)
    }

    navigate("/Audio", {
      state: {
        data: classItem.category_id,
        isLiked: classItem.isLiked,
        index: index,
      },
    });
  };

  return (
    <div className="recommended-classes1">
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
      <div className="classes-list1">
        {slicedAudioData?.map((classItem, index) => (
          <div
            key={index}
            className="class-card1"
            onClick={() => handleRecommendedClassClick(classItem, index)}
          >
            <div className="image-wrapper1"
            >
              {!loaded && <div className="placeholder"></div>}
              {isLocked && classItem.subscriptionType === "Pro" && (
                <div className="black-overlay"></div>
              )}
              <img
                loading="lazy"
                src={ImagePath + classItem?.subcategory_img}
                alt={""}
                onLoad={() => setLoaded(true)}
              />
              {/* {classItem.subscriptionType==='Preview' ?( <span className="pro-badge1">Preview</span>):classItem.subscriptionType==='Pro' ?(<span className="pro-badge1">Pro</span>):('')} */}
            </div>
            <div className="music-class-info1">
              <h3 style={{ color: "white" }}>{classItem?.subCatName}</h3>
              {classItem.subscriptionType === "Pro" && isLocked ? (
                <span className=" music-lock-badge">🔒</span>
              ) : classItem.subscriptionType === "Preview" &&isLocked ? (
                <span className="music-pro-badge-l1">Preview</span>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
 <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />

      </div>
    </div>
  );
};

export default Music;
