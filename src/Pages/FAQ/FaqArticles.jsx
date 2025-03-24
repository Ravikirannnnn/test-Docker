import React from 'react'
import './FaqArticles.css';
import { useNavigate ,useLocation} from 'react-router-dom';
import { useState } from 'react';
import { ImagePath } from '../../Service/ApiService';
// import './FaqArticles.css'
const faqData = [
  { id: 1, question: "What email am I logged in with?" },
  { id: 2, question: "How do I manage my membership?" },
  { id: 3, question: "What do I do if I’ve received a failed payment?" },
  { id: 4, question: "What is the currency of our subscription price?" },
  { id: 5, question: "How do I cancel my Alo Moves membership?" },
  { id: 6, question: "How do I cancel my membership in the Alo Moves mobile app?" },
  { id: 7, question: "How do I update my credit card?" },
];
function FaqArticles() {
    const navigate = useNavigate();
    const location = useLocation();
  const faq = location.state;
  const title = faq[0]?.faqType;
  const [activeQuestion, setActiveQuestion] = useState(faq[0]._id); 
  const activeQuestionData = faq.find((item) => item._id === activeQuestion);

  console.log(title,'title',faq)

    const handleBackClick = () => {
      navigate(-1); // Go back to the previous page
    };
    const handleFaqClick = () => {
      navigate('/FAQ'); // Go back to the previous page
    };
    const handleWElcomeClick = () => {
      navigate('/'); // Go back to the previous page
    };
    const handleQuestionClick = (_id) => {
      setActiveQuestion(_id); // Set the clicked question as active
    };
  return (
    <div>
      <div className='article-title'>FAQ Articles</div>
      <div className="faq-container">
      <nav className="breadcrumb">
        <span onClick={handleWElcomeClick}>Bodsphere &gt;</span>
        <span onClick={handleFaqClick}>FAQ {title} &gt; </span>
        <span>Device Articles</span>
      </nav>
<div className='dividing-div'>
  <div className='faq-left'>
  <h2>Articles about {title}</h2>
  <ul className="article-list">
              {faq.map((item,index) => (
                <li
                  key={index}
                  className={activeQuestion === item._id ? 'active' : ''}
                  onClick={() => handleQuestionClick(item._id)}
                >
                  {item.Question}
                </li>
              ))}
            </ul>
  {/* <ul className="article-list">
              {faqData.map((item) => (
                <li
                  key={item.id}
                  className={activeQuestion === item.id ? 'active' : ''}
                  onClick={() => handleQuestionClick(item.id)}
                >
                  {item.question}
                </li>
              ))}
            </ul> */}
  </div>
  {activeQuestionData &&(
        <div className="content">
        <button className="back-button" onClick={handleBackClick}>
          &#8592; BACK
        </button>

        <h1>{activeQuestionData.Question}</h1>
        <h5>
         {activeQuestionData.Answer}
        </h5>

        <h2>Instructions</h2>
        <h5>
          <em>*Available on both Mobile and Desktop devices.</em>
        </h5>
        <ul>
          {activeQuestionData.instructions.map((item,index)=>(
          <li>
            {item}
          </li>
          ))}
        </ul>
        <div className='st-img'>
          <img src={ImagePath+activeQuestionData.faqImage} alt="" />
        </div>
      </div>
      )}
      </div>

    </div>
    </div>
  )
}

export default FaqArticles
