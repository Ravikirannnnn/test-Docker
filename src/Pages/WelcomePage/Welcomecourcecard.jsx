// import { useState, useMemo } from "react";
import './welcomecourcecard.css'
import { themeContext } from "../../Context";
import { useContext, useState } from "react";

export default function Welcomecourcecard() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [loaded, setLoaded] = useState(false);

  const data = [
    {
      id: 1,
      title: "Preetika Bhatnagar",
      // description: "Gummi bears chocolate bar cheesecake gummies.",
      // price: "$142",
      // rating: 3,
      imageUrl: '/assets/Instructor - Preetika.jpg', // Placeholder image URL
      isFree: true,
    },
    {
      id: 2,
      title: "Samarthya Bhatnagar",
      // description: "Gummi bears chocolate bar cheesecake gummies.",
      // price: "$142",
      // rating: 4,
      imageUrl: '/assets/Instructor - Samarthya.jpg',
      isFree: true,
    },
    {
      id: 3,
      title: "Diana",
      // description: "Gummi bears chocolate bar cheesecake gummies.",
      // price: "$142",
      // rating: 4,
      imageUrl: '/assets/Instructor - Diana.jpg',
      isFree: true,
    },
    {
      id: 4,
      title: "Herkeesh",
      // description: "Gummi bears chocolate bar cheesecake gummies.",
      // price: "$142",
      // rating: 4,
      imageUrl: '/assets/Instructor - Herkeesh.jpg',
      isFree: true,
    },

    {
      id: 5,
      title: "Fitrah",
      // description: "Gummi bears chocolate bar cheesecake gummies.",
      // price: "$142",
      // rating: 4,
      imageUrl: '/assets/Instructor - Fitrah.jpg',
      isFree: true,
    },

    // Add more items as needed
  ];

  const scrollLeft = () => {
    document.getElementById('imagerow').scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    document.getElementById('imagerow').scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className='welcomecoursecordheader'>
      <div className='btn-container-wlcm'>
        <div className='welcome-cards-header'>Meet Your Instructors </div>
        <div className='new-new'>
          <span className='sub-new'>We work with the finest professionals to ensure you feel your best.</span>
        </div>
        <div className="button-container-01">

          <div className={`button-container-right-arrow-01 ${darkMode ? '' : 'darkrightbutton'}`} onClick={scrollLeft}>
            {!loaded && <div className="placeholder"></div>}
            <img src='/assets/rightwel.png' loading="lazy" alt="ellipse"
              //  style={{height:15,width:15}} 
              className={`scroll-icon ${darkMode ? '' : 'dark-mode'}`} onLoad={() => setLoaded(true)} />
          </div>
          <div className={`button-container-left-arrow-01 ${darkMode ? '' : 'darkleftbutton'}`}
            // style={{border:darkMode?'':'black'}}
            onClick={scrollRight} >
            {!loaded && <div className="placeholder"></div>}
            <img src='/assets/backwel.png' loading="lazy" alt="ellipse"
              // style={{height:15,width:15}}
              className={`scroll-icon ${darkMode ? '' : 'dark-mode'}`} onLoad={() => setLoaded(true)} />
          </div>


        </div>
      </div>



      <div className="welcome-cards-container" id='imagerow'>
        {data.map(item => (
          <div className="card" key={item.id}
            style={{ backgroundColor: darkMode ? 'black' : 'white' }}
          >
            <div className='card-image-box'>
              {!loaded && <div className="placeholder"></div>}
              <img src={item.imageUrl} alt={item.title} className="card-image" onLoad={() => setLoaded(true)} />
            </div>
            <div className="card-content-00" style={{ color: darkMode ? 'white' : 'black' }}>
              <h2 className="card-contenth2">{item.title}</h2>
              {/* <p className="card-contenthp234" style={{color:darkMode?'white':'black'}}>{item.description}</p> */}
              {/* <div className="card-footer">
              <span>From {item.price} / starting</span>
              <span className="card-rating">
                {'★'.repeat(item.rating)}
                {'☆'.repeat(5 - item.rating)}
              </span>
            </div> */}
              {/* {item.isFree && <div className="card-badge">Free</div>} */}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
