import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { useContext,useState } from "react";
import { themeContext } from "../../Context";

const FooterView = () => {
  const theme = useContext(themeContext);
  // const darkMode = theme.state.darkMode;
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const TermsPath = () => {
    navigate("/Terms");
  };
  const PrivacyPath = () => {
    navigate("/Privacy");
  };
  const FAQPath = () => {
    navigate("/FAQ");
  };
  const ContactUsPath = () => {
    navigate("/EmailSupport");
  };
  const LandingPage = () => {
    navigate("/");
  };
  const AboutUsPath = () => {
    navigate("/AboutUs");
  };
  return (
    <div className="footer-container" style={{ backgroundColor: "white" }}>
      <div className="footerfviewconatiner-header">
        <div className="footer-subscribe">
          {/* {darkMode ? (
          <>
          <img
            src={require("../../Assets/whitenewlogo.png")}
            style={{width: 150 }}
            alt="Logo"
            onClick={LandingPage}
          /> */}
          {/* <ProfileModal isOpen={isDrawerOpen} onClose={toggleDrawer}/> */}
          {/* </>):( */}
          <div className="log-pic">
          {!loaded && <div className="placeholder">Loading...</div>}
            <img
              src='/assets/newwlogo.png'
              style={{ width: 150 }}
              alt="Logo"
              loading="lazy"
              onClick={LandingPage}
              onLoad={() => setLoaded(true)}
            />
          </div>
          <div className="log-text">
            Download the <strong>Bodsphere App</strong> to take classes offline
            and practice anytime,anywhere.
          </div>
          <div className="welcomefooter-playapple-000">
            <div className="welcomefooter-downplaystore-000">
            {!loaded && <div className="placeholder">Loading...</div>}
              <img
                src='/assets/Apple.png'
                loading="lazy"
                alt="ellipse"
                style={{ height: 30, width: 30 }}
                onLoad={() => setLoaded(true)}
              />
              <div className="welcomefooter-downplaystore-sub-000">
                <span className="welcomefooter-downplaystore-subtext-000">
                  Get in
                </span>
                <span className="welcomefooter-downplaystore-subtext1-000">
                  Apple store
                </span>
              </div>
            </div>
            <div className="welcomefooter-downplaystore-000">
            {!loaded && <div className="placeholder">Loading...</div>}
              <img
                src='/assets/playstore.png'
                loading="lazy"
                alt="ellipse"
                style={{ height: 30, width: 30 }}
                onLoad={() => setLoaded(true)}
              />
              <div className="welcomefooter-downplaystore-sub-000">
                <span className="welcomefooter-downplaystore-subtext-000">
                  Get in
                </span>
                <span className="welcomefooter-downplaystore-subtext1-000">
                  Play store
                </span>
              </div>
            </div>
          </div>
          {/* )} */}
          {/* <span className='footer-subscribe-span'>Subscribe to our Bodsphere</span> */}
          {/* <div className="footeremailview">
            <input className='footer-subscribe-input' type="email" placeholder="Email address" />
            <div className="footerbackwel-icon">
              <img src='/assets/backwel.png' alt="Back" style={{height:15,width:15}} />
            </div>
          </div> */}
        </div>
        {/* <div className="footer-links"> */}
        <div className="headings">
          {/* <div>
       <h4 className='footer-links-h4'>Guest Rules</h4>
        </div> */}
          <div onClick={FAQPath}>
            <h4 className="footer-links-h4">FAQ</h4>
          </div>
          {/* <div onClick={AboutUsPath}>
       <h4 className='footer-links-h4'>About Us</h4>
        </div> */}
          <div onClick={ContactUsPath}>
            <h4 className="footer-links-h4">Contact Us</h4>
          </div>
          <div className="social">
            <div className="new-one">
              <h4 className="footer-links-h4">Follow Bodsphere</h4>
            </div>
            <div className="footer-link-socialicons">
              <div className="footer-link-socialiconsdiv">
                <a
                  href="https://www.facebook.com/bodsphere"
                  target="_blank"
                  rel="noopener noreferrer" // This is important for security
                >
                  {!loaded && <div className="placeholder">Loading...</div>}
                  <img
                  
                    loading="lazy"
                    src='/assets/fb.png'
                    className="footer-link-socialiconsdivimg"
                    alt="icon-3"
                    onLoad={() => setLoaded(true)}
                  />
                </a>
              </div>

              <div className="footer-link-socialiconsdiv">
              <a
                  href="https://www.youtube.com/c/Bodsphere"
                  target="_blank"
                  rel="noopener noreferrer" // This is important for security
                >
                  {!loaded && <div className="placeholder">Loading...</div>}
                <img
                  src='/assets/new-yt.png'
                  className="footer-link-socialiconsdivimg"
                  loading="lazy"
                  alt="icon-3"
                  onLoad={() => setLoaded(true)}
                />
                </a>

              </div>

              <div className="footer-link-socialiconsdiv">
                <a
                  href="https://www.linkedin.com/company/bodsphere/"
                  target="_blank"
                  rel="noopener noreferrer" // This is important for security
                >
                   {!loaded && <div className="placeholder">Loading...</div>}
                  <img
                    src='/assets/linkedin.png'
                    className="footer-link-socialiconsdivimg"
                    loading="lazy"
                    alt="icon-3"
                    onLoad={() => setLoaded(true)}
                  />
                </a>
              </div>

              <div className="footer-link-socialiconsdiv">
                <a
                  href="https://www.instagram.com/bodsphere/?igsh=MXRxcm90Z3UxcnMwZA%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer" // This is important for security
                >
                   {!loaded && <div className="placeholder">Loading...</div>}
                  <img
                    src='/assets/instagram.png'
                    className="footer-link-socialiconsdivimg"
                    loading="lazy"
                    alt="icon-3"
                    onLoad={() => setLoaded(true)}
                  />
                </a>
              </div>
            </div>
          </div>
          {/* <div>
       <h4 className='footer-links-h4'>Our Story</h4>
        </div> */}
          {/* <div>
       <h4 className='footer-links-h4'>Reservation Guide</h4>
        </div> */}
          {/* <div>
       <h4 className='footer-links-h4'>Blog</h4>
        </div> */}
        </div>

        {/* </div> */}
        {/* </div> */}
      </div>
      <div className="footer-bottom" style={{ color: "black" }}>
        <span> © 2024 Bodsphere. All Rights Reserved.</span>
      </div>
      <div className="foot" style={{ color: "black" }}>
        <span onClick={TermsPath}>Terms</span>{" "}
        <span onClick={PrivacyPath}>Privacy</span>
        {/* <span>Cookies</span> */}
      </div>
    </div>
  );
};

export default FooterView;
