import React, { useContext, useEffect, useState } from 'react';
import './SubmitTest.css';
import PageTitle from '../../../Components/Loader/Other/PageTitle';
import { themeContext } from '../../../Context';
import { useNavigate, useLocation } from 'react-router-dom';
import ConfettiExplosion from 'react-confetti-explosion';

export default function SubmitTest() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isExploding, setIsExploding] = useState(false); // State to trigger the confetti explosion
  const location = useLocation();

  const {
    testResults = [], categoryId, totalQuestions,subCat
  } = location.state || {};

  console.log(categoryId);
  

  // Calculate total marks and the number of correct/incorrect answers
  let totalMarksScored = 0;
  let correctAnswersCount = 0;
  let incorrectAnswersCount = 0;

  testResults.forEach(result => {
    if (result.correctAnswer === result.selectedOption) {
      correctAnswersCount += 1;
      totalMarksScored += parseInt(result.marks);
    } else {
      incorrectAnswersCount += 1;
    }
  });

  const totalMarks = testResults.reduce((total, result) => total + parseInt(result.marks), 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Trigger confetti explosion if total marks scored is equal to total marks
    if (totalMarksScored === totalMarks) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2000); // Explosion lasts for 2 seconds
    }
  }, [totalMarksScored, totalMarks]);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const navigate = useNavigate();
  const certificatePath = () => {
    if(totalMarksScored === totalMarks){
          // navigate('/Certificate');
    navigate('/Certificate', {
      state: {
        categoryId: categoryId, 
        subCat:subCat
      }
    });
    }
    else{
      // console.log('oooooooooo');
      // navigate('/Dashboard');
      navigate('/FirstTest',{
        state:{
          categoryId : categoryId,
          subCat : subCat
        }
      });
    }
  };
 const back=()=>{
  navigate('/Dashboard')
 }
  return (
    <div>
      <PageTitle title={'Yoga Teacher Training'} back={back}/>
      <div className='ans-wrap'>
        {isExploding && (
          <div style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <ConfettiExplosion 
              force={0.8}          // Controls the explosion force
              duration={4000}      // Duration of the explosion
              particleCount={250}  // Number of particles
              width={1600} // Make sure it covers the whole screen
            />
          </div>
        )}
        <div className='submit-main-container'
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
          <div className='subtest-top-text'>{subCat}</div>
          <div className='sub-lang-container'>
            <div className='sub-lang-icon'>
              <img src='/assets/Vector (7).png' style={{filter:darkMode?'invert(0%)':'invert(100%)'}} alt="" />
            </div>
            <div>
              <div className='sub-lang-text'>Language: English</div>
            </div>
          </div>
          <div className='sub-lang-container-1'>
            <div className='sub-lang-icon-1'>
              <img src='/assets/Vector (8).png' style={{filter:darkMode?'invert(0%)':'invert(100%)'}} alt="" />
            </div>
            <div>
              <div className='sub-lang-text-1'>
                <div>{totalQuestions} Questions</div>
                <div>{totalMarks} marks</div>
                <div>15 min</div>
              </div>
            </div>
          </div>
        </div>
        <div className='marks-show'
          style={{
            backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
          }}>
          <div className='marks-title'>Total marks scored</div>
          <div className='marks-sub'><strong>{totalMarksScored}</strong>/{totalMarks} marks</div>
        </div>

        <div className='ans-container'>
          <div className='ans-sub-1'
            style={{
              backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
            }}>
            <div className='crt-ans'>Correct Answers</div>
            <div className='crt-ans-num'>{correctAnswersCount}</div>
          </div>
          <div></div>
          <div className='ans-sub-2'
            style={{
              backgroundColor: darkMode ? "#2C2C2E" : "rgba(236, 236, 236, 1)",
            }}>
            <div className='incrt-ans'>Incorrect Answers</div>
            <div className='incrt-ans-num'>{incorrectAnswersCount}</div>
          </div>
        </div>
        <div className='for-Align'>
        <div className="ans-btn" onClick={certificatePath}>{totalMarksScored === totalMarks ? 'Your Certificate Awaits'  : 'Retake Test' }</div>
        </div>
      </div>
    </div>
  );
}
