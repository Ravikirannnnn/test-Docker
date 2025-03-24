import React from 'react'
import './Welcomebenefits.css'
import ScrollTrigger from "react-scroll-trigger";
import { themeContext } from "../../Context";
import { useContext,useState } from "react";
export default function Welcomebenefits() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [isTriggered, setIsTriggered] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleTriggerEnter = () => setIsTriggered(true);
  const handleTriggerExit = () => setIsTriggered(false);
  return (
    <ScrollTrigger onEnter={handleTriggerEnter} onExit={handleTriggerExit}>
      {/* <div className={`welcome-benefit-container ${isTriggered ? 'animate' : ''}`}>
      <div className="benefit-heading">
            <span className="benefit-subtitle">WHY CHOOSE US</span>
            <span className="benefit-title">Benefits</span>
          </div>
        <div className="benefit-left-container">
         
          <div className="benefit-main-grid">
            <div className='benefit-main-grid-icontextimg'>
            <img src='/assets/Icon.png')} alt="icon-1" className="grid-icon" />
             <div className='benefit-main-grid-icontextimg123'>
            <span className='benefit-main-grid-icontextimg123Mplus' >
           Cutting-Edge Technology
            </span>
            <span className="benefit-main-grid-icontextimg123Mplussub123">
                Id eleifend quis urna tellus tempor facilisis at <br /> semper ac. Interdum tortor ut ac.
              </span>
            </div>
            </div>


            <div className='benefit-main-grid-icontextimg'>
            <img src='/assets/Icon (2).png')} alt="icon-2" className="grid-icon" />
             <div className='benefit-main-grid-icontextimg123'>
             <span className='benefit-main-grid-icontextimg123Mplus' >
            User Empowerment
            </span>
            <span className="benefit-main-grid-icontextimg123Mplussub123">
            Id eleifend quis urna tellus tempor facilisis at <br /> semper ac. Interdum tortor ut ac.
              </span>
            </div>
            </div>

            <div className='benefit-main-grid-icontextimg'>
            <img src='/assets/Icon (1).png')} alt="icon-3" className="grid-icon" />
             <div className='benefit-main-grid-icontextimg123'>
             <span className='benefit-main-grid-icontextimg123Mplus' >
            Transparent and Secure
            </span>
            <span className="benefit-main-grid-icontextimg123Mplussub123">
            Id eleifend quis urna tellus tempor facilisis at <br /> semper ac. Interdum tortor ut ac.
              </span>
            </div>
            </div>   
           
           
          </div>
          <div className="benefit-right-img">
          <img src='/assets/iPad Mini (1).png')} alt="i-pad-mini"  className='benefit-right-imgleftimge'/>
        </div>
        </div>
       
      </div> */}
      <div class="yoga-banner">
  <div class="banner-left">
  {!loaded && <div className="placeholder">...</div>}
    <img  loading="lazy" src='/assets/slim-woman-in-sport-clothing-exercising-online-via-2024-11-07-13-11-09-utc (1).jpg' alt="Yoga Image" onLoad={() => setLoaded(true)} />
  </div>
  <div class="banner-right">
    <h1>Yoga Like Never Before</h1>
    <p style={{color:darkMode? 'white':'black'}}>Becoming a Yoga Teacher has never been so easy. You can even download your favorite classes so they’re always available when you want them.</p>
    <div className='welcomefooter-playapple'>
<div className='welcomefooter-downplaystore'>
{!loaded && <div className="placeholder">Loading...</div>}
<img src='/assets/Apple.png'  loading="lazy" alt="ellipse" style={{ height: 30, width: 30 }} onLoad={() => setLoaded(true)}/>
<div className='welcomefooter-downplaystore-sub'>
    <span className='welcomefooter-downplaystore-subtext'>Get in</span>
    <span className='welcomefooter-downplaystore-subtext1'>Apple store</span>
</div>
</div>
<div className='welcomefooter-downplaystore'>
{!loaded && <div className="placeholder">Loading...</div>}
<img src='/assets/playstore.png'  loading="lazy" alt="ellipse" style={{ height: 30, width: 30 }} onLoad={() => setLoaded(true)}/>
<div className='welcomefooter-downplaystore-sub'>
    <span  className='welcomefooter-downplaystore-subtext'>Get in</span>
    <span className='welcomefooter-downplaystore-subtext1'>Play store</span>
</div>
</div>
</div>
  </div>
</div>

      </ScrollTrigger>
  
  )
}
