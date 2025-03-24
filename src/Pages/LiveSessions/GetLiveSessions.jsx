import React, { useState, useEffect } from "react";
import "./GetLiveSessions.css";
import { Navigate, useNavigate } from "react-router-dom";
import PageTitle from "../../Components/Loader/Other/PageTitle";
import { API_URL4004, errorMessage, ImagePath } from "../../Service/ApiService";
import moment from "moment-timezone";
import InfoCard from "../../Components/InfoCard/InfoCard";
import Modal from "../../Components/Loader/Modal/Modal";
import { Toaster } from "react-hot-toast";

export default function GetLiveSessions() {
  const [session, setSessions] = useState([]);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [waitTime, setWaitTime] = useState("");
  const [sessionDate,setSessionDate]=useState('');
  const [startTimeer,setStartTime]=useState('');
  const [zone,setZone]=useState('');  
  const [showInfoCard, setShowInfoCard] = useState(false);
  
  console.log(timeZone, "timezone");
  useEffect(() => {
    getBookedClass();
  }, []);


    useEffect(() => {
      const timer = setTimeout(() => {
        setShowInfoCard(true);
      }, 1000); // 1 second delay
  
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

  const navigate = useNavigate();
  const handleLive = () => {
    navigate("/LiveSessions");
  };

  const getBookedClass = async () => {
    const id = await localStorage.getItem("user_id");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(API_URL4004 + `getBookedClass?user_id=${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          setSessions(result.response);
          console.log(result,'liveclass'); // Debug the response here
        }
      })
      .catch((error) => console.error(error));
  };

  // const handleJoinPress = (link) => {
  //   try {
  //     const newWindow = window.open(link, '_blank');
  //     if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
  //       throw new Error('Failed to open the URL');
  //     }
  //   } catch (err) {
  //     console.error('Failed to open URL:', err);
  //   }
  // };
  const openTimeModal = () => {
    setIsPopupVisible(true);
  };
  const closeTimeModal = () => {
    setIsPopupVisible(false);
  };

  const handleJoinPress = (link, startTime, endTime, sessionDate,timeZone) => {
    if (!startTime || !endTime || !sessionDate) {
      console.error("Invalid start, end time, or session date:", {
        startTime,
        endTime,
        sessionDate,
      });
      alert("Invalid session timing.");
      return;
    }
    setStartTime(startTime);
    setSessionDate(sessionDate);
    setZone(timeZone);

    console.log(
      { startTime, endTime, sessionDate },
      "Inputs before constructing Date"
    );

    // Ensure sessionDate is in the correct format (YYYY-MM-DD)
    const formattedSessionDate = new Date(sessionDate)
      .toISOString()
      .split("T")[0];
    if (!formattedSessionDate) {
      console.error("Invalid sessionDate format:", sessionDate);
      alert("Invalid session date.");
      return;
    }

    // Construct Date objects with combined date and time
    const sessionStartTime = new Date(`${formattedSessionDate}T${startTime}`);
    const sessionEndTime = new Date(`${formattedSessionDate}T${endTime}`);

    console.log({ sessionStartTime, sessionEndTime }, "Parsed session times");

    if (isNaN(sessionStartTime) || isNaN(sessionEndTime)) {
      console.error("Parsed start/end time is invalid:", {
        sessionStartTime,
        sessionEndTime,
      });
      alert("Error with session timings.");
      return;
    }

    const currentTime = new Date();

    console.log(
      { sessionStartTime, sessionEndTime, currentTime },
      "Date Comparisons"
    );

    if (currentTime < sessionStartTime) {
      const timeDifferenceMs = sessionStartTime - currentTime;
      const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
      const minutes = Math.ceil(
        (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      setWaitTime(
        `${hours > 0 ? `${hours} hour(s) and ` : ""}${minutes} minute(s)`
      );
      openTimeModal();
    } else if (currentTime > sessionEndTime) {
      errorMessage("The session has already ended.");
    } else {
      try {
        window.open(link, "_blank");
      } catch (err) {
        console.error("Failed to open URL:", err);
      }
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const convertToUserTimezone = (date, time, timezone) => {
    if (!date || !time) {
      console.error("Date or Time is missing!");
      return "Invalid Time";
    }

    try {
      // Log raw values for debugging
      console.log("Raw Date:", date, "Raw Time:", time, "Timezone:", timezone);

      // Combine the date and time
      const combinedDateTime = `${date.split("T")[0]}T${time}:00`;
      console.log("Combined DateTime:", combinedDateTime);

      // Parse the combined date and time assuming Asia/Kolkata timezone
      const kolkataDate = new Date(combinedDateTime);
      const utcTimestamp = new Date(
        kolkataDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      ).getTime();

      console.log("UTC Timestamp:", utcTimestamp);

      // Convert to the target timezone
      const targetDate = new Date(
        new Date(utcTimestamp).toLocaleString("en-US", { timeZone: timezone })
      );

      // Format the target date-time to 12-hour format (hh:mm A)
      const options = { hour: "2-digit", minute: "2-digit", hour12: true };
      const formattedTime = targetDate.toLocaleTimeString("en-US", options);

      console.log("Converted Time:", formattedTime);
      return formattedTime;
    } catch (error) {
      console.error("Error converting time:", error);
      return "Invalid Time"; // Return a fallback error message
    }
  };

  //   const handleJoinPress = (link, startTime, endTime, sessionDate,timeZone) => {
  //   const newSessionDate=convertDateToUserTimezone(sessionDate,timeZone)
  //   const newStartTime=convertToUserTimezone(sessionDate,startTime,timeZone);
  //   const newEndTime=convertToUserTimezone(sessionDate,endTime,timeZone);

  //   if (!newStartTime || !newEndTime || !newSessionDate) {
  //     console.error("Invalid start, end time, or session date:", { newStartTime, newEndTime, newSessionDate });
  //     alert("Invalid session timing.");
  //     return;
  //   }

  //   console.log({ newStartTime, newEndTime, newSessionDate }, "Inputs before constructing Date");

  //   const formattedSessionDate = new Date(newSessionDate).toISOString().split('T')[0];
  //   if (!formattedSessionDate) {
  //     console.error("Invalid sessionDate format:", newSessionDate);
  //     errorMessage("Invalid session date.");
  //     return;
  //   }
  //   console.log(new Date(newSessionDate.toLocaleString("en-US", {timeZone: timeZone})), "test");

  //   const sessionStartTime = new Date(`${formattedSessionDate}T${newStartTime}`);
  //   const sessionEndTime = new Date(`${formattedSessionDate}T${newEndTime}`);

  //   console.log({ sessionStartTime, sessionEndTime }, "Parsed session times");

  //   if (isNaN(sessionStartTime) || isNaN(sessionEndTime)) {
  //     console.error("Parsed start/end time is invalid:", { sessionStartTime, sessionEndTime });
  //     errorMessage("Error with session timings.");
  //     return;
  //   }

  //   const currentTime = new Date();

  //   console.log({ sessionStartTime, sessionEndTime, currentTime }, "Date Comparisons");

  //   if (currentTime < sessionStartTime) {
  //     const timeDifferenceMs = sessionStartTime - currentTime;
  //     const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  //     const minutes = Math.ceil((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
  //     setWaitTime(`${hours > 0 ? `${hours} hour(s) and ` : ''}${minutes} minute(s)`);
  //     openTimeModal();
  //   } else if (currentTime > sessionEndTime) {
  //     errorMessage('The session has already ended.');
  //   } else {
  //     try {
  //       window.open(link, '_blank');
  //     } catch (err) {
  //       console.error('Failed to open URL:', err);
  //     }
  //   }
  // };

  //   if (!date || !time) {
  //     console.error("Date or time is missing:", { date, time });
  //     return "Invalid Time";
  //   }

  //   try {
  //     // Combine date and time into a single string in UTC format
  //     const combinedDateTime = `${date.split("T")[0]}T${time}:00`;

  //     // Parse the combined date-time as UTC
  //     const utcMoment = moment.utc(combinedDateTime); // This ensures it's treated as UTC

  //     // If a timezone is passed in, use it; otherwise, use the system timezone
  //     const currentSystemTimezone = timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata'; // Default to Kolkata if no timezone detected

  //     // Log for debugging
  //     console.log("Using Timezone: ", currentSystemTimezone);
  //     console.log("UTC Moment: ", utcMoment.toString());

  //     // Convert the UTC moment to the user-specified timezone
  //     const localTime = utcMoment.clone().tz(currentSystemTimezone, true);

  //     // Return formatted time in the user's local timezone
  //     return localTime.format("hh:mm A"); // 12-hour format with AM/PM
  //   } catch (error) {
  //     console.error("Error converting time:", error);
  //     return "Invalid Time";
  //   }
  // };

  console.log(
    "System Timezone:",
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const formatDate = (date) => {
    if (!date) return "Invalid Date";

    const parsedDate = moment(date);

    if (!parsedDate.isValid()) {
      console.error("Invalid Date Format:", date); // Log any issues
      return "Invalid Date";
    }

    return parsedDate.tz(timeZone).format("DD/MM/YYYY");
  };

  console.log(session, "SESSIONM"); // Log the full session object inside the map

  const givenTime = session.StartTime;

  // const TimezoneConverter = ({ givenTime }) => {
  // const convertToUserTimezone = (time) => {
  //   const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   const date = new Date(time);
  //   return date.toLocaleString("en-US", { timeZone: userTimeZone });
  // };
  // };

  return (
    <>
      <Toaster />
      <div className="top-wrap-00">
        <PageTitle title={"Live Classes"} />
        <div>
          {session?.length === 0 ? (
            showInfoCard ? (
            <div style={{ marginTop: "10%" }}>
              <InfoCard
                imageSrc="/assets/newresponsive.png"
                title="Let's practice yoga together."
                subtitle="Have a look at the great Programs you can subscribe to."
                buttonText="Click here"
                onButtonClick={handleLive}
              />
            </div>
             ):null)
          : (
            <div className="wrap-sss-00">
              {session?.map((session) => (
                <div className="session-main-container-00" key={session._id}>
                  <div className="session-left-container-00">
                    <div className="session-img-00">
                      <img
                        src={ImagePath + session.instructorImg}
                        alt="liveSession"
                        loading="lazy"
                      />
                    </div>
                    <div className="session-details-00">
                      <h3>{session.sessionName}</h3>
                      <h5>Date: {formatDate(session.classDate)}</h5>
                      <h5>
                        Start:{" "}
                        {convertToUserTimezone(
                          session.classDate,
                          session.StartTime,
                          timeZone
                        )}
                      </h5>
                      <h5>
                        End:{" "}
                        {convertToUserTimezone(
                          session.classDate,
                          session.endTime,
                          timeZone
                        )}
                      </h5>
                    </div>
                  </div>
                  <div className="session-right-container-00">
                    <button
                      onClick={() =>
                        handleJoinPress(
                          session.link,
                          session.StartTime,
                          session.endTime,
                          session.classDate,
                          timeZone
                        )
                      }
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>
              You're early! The live session will start in{" "}
              <strong>{waitTime} minutes</strong>.
            </p>
            <button onClick={closePopup}>Okay</button>
          </div>
        </div>
      )} */}
        <Modal isOpen={isPopupVisible} onClose={closeTimeModal}>
          <div className="signoutbtn-live">
            <h1>You’re early, which is great!</h1>
            <div className="sign0ut-text-live">
              {" "}
              The session starts at{" "}
              {convertToUserTimezone(
                sessionDate,
                startTimeer,
                zone
              )}
              . <br /> Please relax and get ready for your practice.
            </div>
            <button onClick={closeTimeModal}>OK</button>
          </div>
        </Modal>
      </div>
    </>
  );
}
