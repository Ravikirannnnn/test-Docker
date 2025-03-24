import React, { useEffect, useState ,useContext} from 'react'
import './Premium.css';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { API_URL4002 } from '../../Service/ApiService';
import { themeContext } from '../../Context'

export default function Premium() {
  const [selectedOption,setSelectedOption]=useState('Teacher')
  const navigate=useNavigate()
  const [isSchool, setIsSchool] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const getAbout = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
      "user_id": user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4002 + "getUserProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.Status === true) {
          console.log(result)
          setIsSchool(result.userdata.isSchool)
          setIsTeacher(result.userdata.isTeacher)
        }
        // setName(result.userdata.About)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getAbout();
  }, []);


  const handlePremiumBar=()=>{
    console.log(selectedOption);
    if  (selectedOption === 'Teacher' ){
      navigate('/PremiumBar',{state:{selectedOption}})
    }
    //  else if (isTeacher && selectedOption === 'Teacher') {
    //   navigate('/ProfileCredential',{state:{selectedOption}})
    // } else if(isSchool) {
    //   navigate('/SchoolProfile',{state:{selectedOption}})

    // }
     else {
      navigate('/PremiumBar',{state:{selectedOption}})
    }

  }
  return (
    <>
    <div className='primium-top-top'>
      <PageTitle title={'Get Accredited By Bodsphere'}/>
    </div>
    <div className='overall-premium'>
      <div className='premium-img'>
      <img  loading="lazy" src='/assets/Banner Image.jpg' alt="" />
      </div>
      <div className='apply-container'>
        <div className='apply-maintext'>
          {/* Apply for Bodsphere Credential */}
          Apply for Bodsphere International Accreditation
        </div>
        <div className='apply-subtext' style={{color:darkMode ? 'white':'black'}}>
        When you apply to become part of Bodsphere Community, you are taking the first step towards joining the World’s Biggest Community of Yoga Schools and Teachers that represent high quality, safe, affordable, accessible and equitable Yoga.
        </div>
      </div>
      <div className='pre-container'>
        <div className='pre-text'>
    How would you describe yourself?
        </div>
        <div className='radio-container1'>
          <div className='radio-school'>
            <input type="radio"
            style={{ cursor: 'pointer' }}
             checked={selectedOption=== 'School'}
             onChange={()=>setSelectedOption('School')}
             />School</div>
          <div className='radio-teacher'>
            <input type="radio" 
            checked={selectedOption=== 'Teacher'}
            onChange={()=>setSelectedOption('Teacher')}
            style={{ cursor: 'pointer' }} 
            />Teacher</div>
        </div>
        <div className='apply-btn' onClick={handlePremiumBar}>
          Apply
        </div>
      </div>
    </div>
    </>
  )
}
