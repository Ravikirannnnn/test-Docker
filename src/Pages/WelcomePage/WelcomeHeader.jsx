import React from 'react';
import './WelcomeHeader.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { themeContext } from "../../Context";
import { useContext,useState } from "react";

const images = [
  { src: '/assets/Rectangle 7.png', alt: 'Yoga Talks Practice' },
  { src: '/assets/Rectangle 7.png', alt: 'Meditation' },
  { src: '/assets/Rectangle 7.png', alt: 'Yoga 1' },
  { src: '/assets/Rectangle 7.png', alt: 'Meditation' },
  { src: '/assets/Rectangle 7.png', alt: 'Yoga 1' },
  // Add more images as needed
];

const statsData = [
  { value: 190, suffix: '+', label: 'Countries' }, 
  { value: 1000, suffix: '+', label: 'On-Demand Classes' }, 
  { value: 100, suffix: 'K', label: 'Members' },   
  // { value: 40, suffix: '+', label: 'Live classes' },     
];

const WelcomeHeader = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const scrollLeft = () => {
    document.getElementById('imageRow').scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.getElementById('imageRow').scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="welcome-header-stats" ref={statsRef}>
        {statsData.map((stat, index) => (
          <div className="stat" key={index}>
            <div className="value">
              {statsInView && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={2.5}
                  decimals={stat.value % 1 !== 0 ? 2 : 0}
                  suffix={stat.suffix}
                />
              )}
            </div>
            <div className="label">{stat.label}</div>
          </div>
        ))}
      </div>
      {/* <div>
        <span className='welcome-headeraboutus'>About US</span>
        <span className='welcome-headeraboutussub'>When you apply to become part of Bodsphere Community, you are 
            taking the first step towards joining the World’s Biggest Community of
             Yoga Schools and Teachers that represent high quality, safe, affordable, accessible 
             and equitable Yoga.</span>
      </div> */}
        <div className="hero-section-00">
  <div className="hero-overlay" >
    <h1>Discover Your Yogic Path</h1>
    <p style={{color:darkMode?'white':'black'}}>Join our community and transform your yoga practice today.</p>
    {/* <button className="cta-button">Get Started</button> */}
  </div>
</div>
<div className="main-contents">
  <div className="content-block">
    {/* <img src={require('../../Assets/Logo123.png')} alt="Online Yoga Classes" /> */}
    <h2>Yoga Teacher Trainings</h2>
    <p>Become certified Yoga Teachers and transform your practice with World's most accessible & affordable programs.</p>
    {/* <button className="cta-button">Start Now</button> */}
  </div>
  <div className="content-block">
    {/* <img src={require('../../Assets/Logo123.png')} alt="Certified Courses" /> */}
    <h2>Yoga Classes</h2>
    <p>Join revitalizing Yoga classes of Yin, Hatha, Ashtanga, Vinyasa and a lot more, to enhance your well-being.</p>
    {/* <button className="cta-button">Explore Courses</button> */}
  </div>
  <div className="content-block">
    {/* <img src={require('../../Assets/Logo123.png')} alt="Online Yoga Classes" /> */}
    <h2>Calm Music</h2>
    <p>Experience tranquility with our calming music, perfect for relaxation and mindfulness.</p>
    {/* <button className="cta-button">Start Now</button> */}
  </div>
  <div className="content-block">
    {/* <img src={require('../../Assets/Logo123.png')} alt="Certified Courses" /> */}
    <h2>Pranayama & Meditation</h2>
    <p>Explore the power of breath and enhance your self-awareness and inner peace.</p>
    {/* <button className="cta-button">Explore Courses</button> */}
  </div>
</div>
{/* 
      <div className="button-container">

      <div className='button-container-right-arrow'   onClick={scrollLeft}>
        <img src={require('../../Assets/rightwel.png')}   alt="ellipse" style={{height:15,width:15}}/>
        </div>      
        <div className='button-container-left-arrow' 
         onClick={scrollRight} >
        <img src={require('../../Assets/backwel.png')}   alt="ellipse" style={{height:15,width:15}}/>
        </div>

      
        </div>
     
      <div className="carousel-container">
       
        <div className="image-row1234" id="imageRow">
          {images.map((image, index) => (
            <div className="image-container1234" key={index}>
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
        </div> */}
    </div>
  );
};

export default WelcomeHeader;
