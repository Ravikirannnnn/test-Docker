import React, { useState } from "react";
import Rating from "react-rating-stars-component";
import './FeedBackForm.css';
import { API_URL4000, successMessage } from "../../../Service/ApiService";
import { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const YogaEvaluationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [teacherTraining, setTeacherTraining] = useState(0);
  const [yoga, setYoga] = useState(0);
  const [guidedPranayama, setGuidedPranayama] = useState(0);
  const [meditations, setMeditations] = useState(0);
  const [yogaTalks, setYogaTalks] = useState(0);
  const [music, setMusic] = useState(0);
  const [liveYogaClasses, setLiveYogaClasses] = useState(0);
  const [description,setDescription]=useState('')
  const [errors, setErrors] = useState({});

  const navigate=useNavigate()
  const handlenavigation=()=>{
    navigate('/Dashboard')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobile":
        setMobile(value);
        break;
        case "description":
          setDescription(value);
      default:
        break;
    }
  };

  const handleRatingChange = (rating, name) => {
    switch(name) {
      case "teacherTraining":
        setTeacherTraining(rating);
        break;
      case "yoga":
        setYoga(rating);
        break;
      case "guidedPranayama":
        setGuidedPranayama(rating);
        break;
      case "meditations":
        setMeditations(rating);
        break;
      case "yogaTalks":
        setYogaTalks(rating);
        break;
      case "music":
        setMusic(rating);
        break;
      case "liveYogaClasses":
        setLiveYogaClasses(rating);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = "Name is required.";
    // if (!lastName) newErrors.lastName = "Name is required.";
    if (!email) newErrors.email = "Invalid Email ID.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format.";
    if (!mobile) newErrors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = "Invalid mobile number.";
    // if (!description) newErrors.description = "add description.";
    if(music===0) newErrors.music="This rating is required.";
    if(yoga===0) newErrors.yoga="This rating is required.";
    if(teacherTraining===0) newErrors.teacherTraining="This rating is required.";
    if(guidedPranayama===0) newErrors.guidedPranayama="This rating is required.";
    if(meditations===0) newErrors.meditations="This rating is required.";
    if(liveYogaClasses===0) newErrors.liveYogaClasses="This rating is required.";
    if(yogaTalks===0) newErrors.yogaTalks="This rating is required.";

    return newErrors;
  };

  const FormFetch = (e) => {
    e.preventDefault();  // Prevent default form submission
    console.log('clicked')
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('accessToken');
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      user_id: user_id,
      name: `${firstName} ${lastName}`,
      email: email,
      mobile: mobile,
      teacher_training: teacherTraining,
      yoga: yoga,
      guided_pranayama: guidedPranayama,
      meditations: meditations,
      yoga_talks: yogaTalks,
      music: music,
      live_yoga_classes: liveYogaClasses,
      description:description
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(API_URL4000 + "submitFeedback", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if(result.status===true){
          successMessage(" Thank you for your valuable feedback.", {
            duration: 2000, // Duration for the toast
          });
          setTimeout(() => {
            handlenavigation()
          }, 2000);

        setEmail('');
        setFirstName('');
        setLastName('');
        setMobile('')
        setTeacherTraining(null);
        setYoga(0)
        setGuidedPranayama(0)
        setMeditations(0)
        setYogaTalks(0);
        setLiveYogaClasses(0);
        setMusic(0)
        setDescription('')
       }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
      });
  };

  return (
    <div className="wrap-form">
    <div className="form-container-ye">
       <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
      />
      <form onSubmit={(e)=>FormFetch(e)}>
        <h2>Bodsphere Survey Form</h2>

        <div className="form-group-ye">
          <label>Full Name *</label>
          <div className="name-fields">
            <div>
              
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={handleChange}
            />
            
            </div>
            <div>       
                   <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={handleChange}
            />
            </div>
          </div>
          {errors.firstName && <small>{errors.firstName}</small>}
          {/* {errors.lastName && <small>{errors.lastName}</small>} */}
        </div>

        <div className="form-group-ye">
          <label>Mobile Number *</label>
          <input
            type="text"
            name="mobile"
            placeholder="ex: 2358656565"
            value={mobile}
            onChange={handleChange}
          />
          {errors.mobile && <small>{errors.mobile}</small>}
        </div>

        <div className="form-group-ye">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={email}
            onChange={handleChange}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className="form-group-ye">
          <label>Teacher Training</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={teacherTraining}
            onChange={(rating) => handleRatingChange(rating, "teacherTraining")}
          />
          {errors.teacherTraining && <small>{errors.teacherTraining}</small>}

        </div>

        <div className="form-group-ye">
          <label>Yoga</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={yoga}
            onChange={(rating) => handleRatingChange(rating, "yoga")}
          />
          {errors.yoga && <small>{errors.yoga}</small>}

        </div>

        <div className="form-group-ye">
          <label>Guided Pranayama</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={guidedPranayama}
            onChange={(rating) => handleRatingChange(rating, "guidedPranayama")}
          />
          {errors.guidedPranayama && <small>{errors.guidedPranayama}</small>}

        </div>

        <div className="form-group-ye">
          <label>Music</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={music}
            onChange={(rating) => handleRatingChange(rating, "music")}
          />
          {errors.music && <small>{errors.music}</small>}

        </div>

        <div className="form-group-ye">
          <label>Meditations</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={meditations}
            onChange={(rating) => handleRatingChange(rating, "meditations")}
          />
          {errors.meditations && <small>{errors.meditations}</small>}

        </div>

        <div className="form-group-ye">
          <label>Live Yoga Classes</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={liveYogaClasses}
            onChange={(rating) => handleRatingChange(rating, "liveYogaClasses")}
          />
          {errors.liveYogaClasses && <small>{errors.liveYogaClasses}</small>}

        </div>

        <div className="form-group-ye">
          <label>Yoga Talks</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={yogaTalks}
            onChange={(rating) => handleRatingChange(rating, "yogaTalks")}
          />
          {errors.yogaTalks && <small>{errors.yogaTalks}</small>}

        </div>
        <div className="form-group-ye">
          <label>Any comments, questions or suggestions?</label>
          <textarea
            name="description"
            placeholder="Your feedback..."
            value={description}
            onChange={(e)=>handleChange(e)}
          />
          {/* {errors.description && <small>{errors.description}
            </small>} */}
        </div>
<div className="btn-div">
        <button className="ye-button" type="submit">Submit</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default YogaEvaluationForm;
