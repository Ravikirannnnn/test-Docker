import './FAQ.css';
import FooterView from '../WelcomePage/FooterView';
import { themeContext } from "../../Context";
import { useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL4000, API_URL4004, errorMessage } from '../../Service/ApiService';
import { Toaster } from 'react-hot-toast';

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [faqType,setFaqType]=useState('')
  const [faq,setFaq]=useState([])
  const navigate=useNavigate()
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const userId=localStorage.getItem('user_id')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const isMobileView = windowWidth <= 480;
  const isResponsiveView = windowWidth <= 800;
  console.log(faq,'faq')
// useEffect(() => {
//  fetchFAQ()
// }, []);

  const FAQcontents=[
    {
      title:"Account & Billing",
      img:'/assets/user.png'
    },
    {
      title:"Classes & Series",
      img:'/assets/videoAnimated.png'
    },
    {
      title:"Devices",
      img:'/assets/responsive-design.png'
    },
    {
      title:"Features",
      img:'/assets/category.png'
    },
    {
      title:"Free Trial",
      img:'/assets/trial.png'
    },
    {
      title:"Membership",
      img:'/assets/member-card.png'
    }
  ]

  const handleScreenFAQ=(item)=>{
      const type=item.title;
      setFaqType(type);
      fetchFAQ(type)
      console.log('clicked')
      console.log(type,'type',faq)
  }

  const fetchFAQ = (type) => {
    // debugger;
    const accessToken=localStorage.getItem('accessToken')
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+accessToken);

const raw = JSON.stringify({
  "faqType": type
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(API_URL4000+"getFAQNew", requestOptions)
  .then((response) => response.json())
  .then((result) => {console.log(result)
    if(result.status===true){
      setFaq(result?.FAQs)
      navigate('/FaqArticles',{
      // navigate('/FAQSupport',{
        state:result?.FAQs
      })
    }else{
      errorMessage(result.message)
    }
  })
  .catch((error) => console.error(error));
  };
  
  const handleArticles=()=>{
    navigate('/ContactUs')
  }
  return (
    <>
    <Toaster/>
    <div className="faq-container">
      <h1 className="faq-title">FAQ</h1>
      <h2 className="faq-subtitle" onClick={handleArticles}>How can we help?</h2>

      <div className="faq-search">
        <input 
          style={{backgroundColor:darkMode ? "#2C2C2E" : "#d8d8df"}}
          type="text" 
          placeholder="Search FAQs" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button className="faq-search-icon">
          <img src='/assets/search-i.png' alt="Search" /> {/* Add your search icon */}
        </button>
      </div>
      <div className="faq-categories">
{FAQcontents.map((item,index)=>(
        <div className="faq-category" key={index} onClick={()=>handleScreenFAQ(item)}>
          <img src={item.img} alt="Account & Billing" />
          <span>{item.title}</span>
        </div>
))}
        </div>
    </div>
    {userId && isResponsiveView ?
    ''
    :
    <FooterView/>}
    </>
  )
}
