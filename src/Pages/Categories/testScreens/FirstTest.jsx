import React, { useState, useEffect, useContext } from 'react';
import './FirstTest.css';
import PageTitle from '../../../Components/Loader/Other/PageTitle';
import { ProgressBar } from 'react-bootstrap';
import { themeContext } from '../../../Context';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { API_URL4004, errorMessage } from '../../../Service/ApiService';
export default function FirstTest() {
  const location = useLocation();
  const { categoryId,subCat } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]); 
  const [timeRemaining, setTimeRemaining] = useState(900); 
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState(0);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const navigate = useNavigate();

  // console.log(selectedOption,'se;se')

  useEffect(() => {
    if (categoryId) {
      fetchQNA(categoryId);
      // addTestPreview()
    }
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Handle time up situation (e.g., submit test automatically)
          submitTestPath();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [categoryId]);

  
  
  const fetchQNA = (categoryId) => {
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
        if (result.status === true) {
          setQuestions(result.questions);
        }
      })
      .catch((error) => console.error(error));
  };

  const handleOptionChange = (option) => {
    const updatedOptions = [...selectedOption];
    updatedOptions[currentQuestionIndex] = option; // Store the selected option for the current question
    setSelectedOption(updatedOptions);
  };
  const testResults = questions.map((question, index) => ({
    Qid: question._id,
    correctAnswer: question.correctAnswer,
    marks: question.marks,
    selectedOption: selectedOption[index] || null, // Default to null if no option selected
  }));

  const addTestPreview = () => {
    const accessToken = localStorage.getItem('accessToken');
    const user_id = localStorage.getItem('user_id');
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${accessToken}`);
  
    // Prepare the data to be sent
    testResults.forEach(result => {
      const raw = JSON.stringify({
        "user_id": user_id,
        "category_id": categoryId,
        "QandA_id": result.Qid,
        "user_answer": result.selectedOption
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      fetch(API_URL4004+"addTestResponseNewFlow", requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result.response.isCorrect)
          if(result.status === true){
            navigate('/SubmitTest', {
              state: {
                testResults,  
                categoryId:categoryId, 
                totalQuestions: questions.length,
                subCat:subCat
              }
            });
          }
        })
        .catch(error => console.error(error));
    });
  };
  
  const submitTestPath = () => {
    testResults.forEach(result => {
      console.log(result.selectedOption);
  });
  addTestPreview();
    
  };

  const goToNextQuestion = () => {
    if (!selectedOption[currentQuestionIndex]) {
      errorMessage("Please select an option before proceeding.",{
        autoClose:1000
      }); 
      return; 
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitTestPath(); 
    }
  };
  // Convert seconds to MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div>
  <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <PageTitle title={'Yoga Teacher Training'} />
      <div className='main-q-container'>
        <div className='bar-q-container'
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
          <div className='type-1'>{currentQuestionIndex + 1} of {questions.length}</div>
          <div className='type-2'>
            <ProgressBar variant="success"
              now={(currentQuestionIndex + 0) / questions.length * 100}
               // Adjust progress bar color
            />
          </div>
          <div className='type-3'> {formatTime(timeRemaining)}m</div>
        </div>
        
        {questions.length > 0 && (
          <div className='ques-opt'>
            <div>{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</div>
            <div className='opts'>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div className='input-opt' key={index}>
                  <input
                    type="radio"
                    id='radio'
                    checked={selectedOption[currentQuestionIndex] === option}
                    onChange={() => handleOptionChange(option)}
                    style={{cursor:'pointer'}}
                  />{'  '}
                  <span>
                  {option}
                  </span>
                </div>
              ))}
            </div>
            <div className='opt-btn-container'>
              {currentQuestionIndex > 0 && (
                <div className='opt-p-btn'
                  style={{
                    backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
                    color:darkMode ? "white" : "black",
                  }}
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                >
                  Previous
                </div>
              )}
              <div className='opt-n-btn' onClick={goToNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
