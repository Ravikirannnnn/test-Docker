import React, { useState, useContext, useEffect } from 'react';
import './Starttest.css';
import PageTitle from '../../../Components/Loader/Other/PageTitle';
import { themeContext } from '../../../Context';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL4004, errorMessage, ImagePath } from '../../../Service/ApiService';
import { toast, Toaster } from 'react-hot-toast';

export default function Test() {
  const location = useLocation();
  const { categoryId } = location.state || {};
  const [totalMarks, setTotalMarks] = useState('');
  const [testTiming, setTestTiming] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [instructions,setInstructions] = useState([])
  const [lang,setLang] = useState('')
  const [question,setQuestion] = useState('')
  const [time,setTime] = useState('')
  const [subCat,setSubCat] = useState('')
  const [image,setImage] = useState('')

console.log(instructions,'instructions')
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const navigate = useNavigate();
  // console.log(subimage,subName,training_id,'contents')
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
// console.log(sub_Cat_ids,'jkj')
  const firsttestPath = () => {
    if (isChecked) {
      // console.log("Navigating to FirstTest with sub_Cat_ids:", training_id);
      navigate('/FirstTest',{
        state:{
          categoryId : categoryId,
          subCat : subCat
        }
      });
    } else {
      errorMessage("Please read the test instructions before starting.",{
        autoClose:1000
      });
    }
  };

  useEffect(() => {
    if (categoryId) {
      FetchStartTest(categoryId);
      getTestDetails();
    }
  }, [categoryId]);

  const FetchStartTest = (categoryId) => {
    const accessToken = localStorage.getItem('accessToken');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);

    const raw = JSON.stringify({
      "category_id": categoryId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(API_URL4004+"getQNANewFlow", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result,'result');
        if (result.status === true) {
          setInstructions(result?.instructions)
        }
      })
      .catch((error) => console.error(error));
  };

  const getTestDetails = async () =>{
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);
    var raw = JSON.stringify({
      "category_id": categoryId,
      "user_id" :user_id
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(API_URL4004+"getQnaDataNewFlow", requestOptions)
      .then(response => response.json())
      .then(result => {console.log('123',result)
        setLang(result.Language)
        setQuestion(result.TotalQNA)
        setTotalMarks(result.Totalmarks)
        // setTime(result.testTiming)
        setImage(result.trainingdata[0].categoryImage)
        setSubCat(result.trainingdata[0].categoryName)
        
      })
      .catch(error => console.log('error', error));
  }


  return (
    <div className='overall-connn'>
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <PageTitle title={subCat} />
      <div>
        <div className='st-img'>
          <img src={ImagePath + image} alt="" />
        </div>
      </div>
      <div className='st-container'
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
        <div className='st-top-text'>{subCat}</div>
        <div className='lang-container'>
          <div className='lang-icon'>
            <img src='/assets/Vector (7).png' style={{filter:darkMode?'invert(0%)':'invert(100%'}} alt="" />
          </div>
          <div>
            <div className='lang-text'>Language: {lang}</div>
          </div>
        </div>
        <div className='lang-container-1'>
          <div className='lang-icon-1'>
            <img src='/assets/Vector (8).png' style={{filter:darkMode?'invert(0%)':'invert(100%'}} alt="" />
          </div>
          <div className='instr-new'>
            <div className='lang-text-1'>
              <div>{question} Questions</div>
              <div>{totalMarks} marks</div>
              <div>30 min</div>
            </div>
          </div>
        </div>
      </div>
      <div className='st-container-2'
        style={{
          backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
        }}>
        <div className='st-down-text'>Instructions</div>
        <div className='st-down-content'>
        {instructions.map((item, index) => (
  <span key={index}>{item}</span>
))}
          {/* <span>2. The test would contain multiple-choice questions with 4 options. Questions can have single option or multi option solutions.</span>
          <span>3. All questions carry 4 marks and incorrect responses carry negative 1 mark for each question.</span>
          <span>4. No marks would be awarded or deducted for unattempted questions.</span> */}
        </div>
      </div>
      <div className='check-st'>
        <input
          type="radio"
          id='radio'
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className='check-text'>Please read the instructions carefully before starting the quiz. 
          </div>
      </div>
      <div className='btn-02'>
        <div className="st-btn" onClick={firsttestPath}>Start Test</div>
      </div>
    </div>
  );
}
