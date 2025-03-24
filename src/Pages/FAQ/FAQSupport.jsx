import React, { useState } from 'react';
import './FAQSupport.css';
import { useLocation } from 'react-router-dom';
import PageTitle from '../../Components/Loader/Other/PageTitle';

export default function FAQSupport() {
  const location = useLocation();
  const faq = location.state;
  const title = faq[0]?.faqType;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);


  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }; 

  return (
    <>
      <PageTitle title={title} />
    <div className='overall-sss'>
    {faq.map((item, index) => (
        <div className="sup-container" key={index}>
          <p></p>
          <span onClick={() => toggleDropdown(index)}>
            0{index + 1} . {item.Question}
          </span>
          {openIndex === index && (
            <div className="subDown-item">
              {item.Answer}
            </div>
          )}
        </div>
      ))}
  
    </div>
    </>
  );
}
