import React, { useState, useRef } from 'react';
import './Testimonials.css';
import { themeContext } from "../../Context";
import { useContext} from "react";
const testimonialsData = [
  {
    name: "Alejandra Martinez",
    title: "Argentina",
    quote: "Bodsphere has made Yoga accessible and affordable for everyone. So grateful!",
    // description: "Massa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.",
    imgSrc: '/assets/profile3.png'
  },
  {
    name: "Katerina Smith",
    title: "United States of America",
    quote: "Super happy to be a part of the Bodsphere Revolution!",
    // description: "Massa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.",
    imgSrc: '/assets/profile2.png'
  },
  {
    name: "Diego Rodríguez",
    title: "Spain",
    quote: "Bodsphere's Platform is a gift for this World",
    // description: "Massa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.",
    imgSrc: '/assets/profile1.png'
  },
  {
    name: "Susana Fernandes",
    title: "Thailand",
    quote: "Bodsphere Accreditation, Certifications, etc - So powerful!",
    // description: "Massa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.",
    imgSrc: '/assets/profile3.png'
  },
  {
    name: "Caiji Li",
    title: "China",
    quote: "No words. Bodsphere is simply a blessing!",
    // description: "Massa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.",
    imgSrc: '/assets/profile2.png'
  },
  {
    name: "Harpreet Kaur",
    title: "India",
    quote: "I cannot believe that I got so much high quality content at this price. Incredible!",
    // description: "Massa malesuada aliquam fames senectus vitae ornare. Fringilla sit varius mattis ultricies sed nulla.",
    imgSrc: '/assets/profile1.png'
  },
  // ... more data
];

const Testimonials = () => {
  const [loaded, setLoaded] = useState(false);

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [activeIndex, setActiveIndex] = useState(null);
  const testimonialsRef = useRef(null);

  const handleScroll = (direction) => {
    if (testimonialsRef.current) {
      const scrollAmount = direction === 'left' ? -testimonialsRef.current.clientWidth : testimonialsRef.current.clientWidth;
      testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  // const scrollLeft = () => {
  //   document.getElementById('imagerow').scrollBy({ left: -300, behavior: 'smooth' });
  // };

  // const scrollRight = () => {
  //   document.getElementById('imagerow').scrollBy({ left: 300, behavior: 'smooth' });
  // };

  return (
    <div className="testimonials-container" style={{color:'black'}}>
      <div className="testimonials-header">
        {/* <span className='headerwhattheysay'>T E S T I M O N I A L S</span> */}
        <span className='whattheysay' style={{color:darkMode ? 'white':'black'}}>What they say about <br /> Bodsphere</span>
      </div>

      <div className="button-container-02">

<div className={`button-container-right-arrow-02 ${darkMode?'':'darkrightbutton1'}`}   onClick={() => handleScroll('left')}>
{!loaded && <div className="placeholder">...</div>}
  <img src='/assets/rightwel.png' onLoad={() => setLoaded(true)}  loading="lazy" alt="ellipse" style={{height:15,width:15}} className={`scroll-icon ${darkMode ? '' : 'dark-mode'}`} />
  </div>      
  <div  className={`button-container-left-arrow-02 ${darkMode?'':'darkleftbutton1'}`}
  // style={{border:darkMode?'':'black'}}
   onClick={() => handleScroll('right')} >
     {!loaded && <div className="placeholder">Loading...</div>}
  <img src='/assets/backwel.png' onLoad={() => setLoaded(true)}  loading="lazy" alt="ellipse" style={{height:15,width:15}} className={`scroll-icon ${darkMode ? '' : 'dark-mode'}`} />
  </div>


  </div>
      <div className="testimonials-wrapper">
        {/* <button className="scroll-button left" onClick={() => handleScroll('left')}> <img src='/assets/backButton.png')} alt="" /></button> */}
        <div className="testimonials" ref={testimonialsRef}>
          {testimonialsData.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
               {!loaded && <div className="placeholder">Loading...</div>}
              <img  loading="lazy" src='/assets/pngegg.png' alt={testimonial.name} className="testimonial-image" onLoad={() => setLoaded(true)}/>
              <blockquote>{testimonial.quote}</blockquote>
              {/* <p>{testimonial.description}</p> */}
              <h3>{testimonial.name}</h3>
              <h4>{testimonial.title}</h4>
            </div>
          ))}
        </div>
        {/* <button className="scroll-button right" onClick={() => handleScroll('right')}><img src='/assets/Vector (2).png')} alt="" /></button> */}
      </div>
    </div>
  );
};

export default Testimonials;
