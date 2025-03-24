import React ,{useEffect,useState,useContext} from 'react'
import './Billing.css'
import InfoCard from '../../Components/InfoCard/InfoCard'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import axios from 'axios'
import { API_URL4008, errorMessage } from '../../Service/ApiService'
import { Toaster } from 'react-hot-toast'
import { themeContext } from '../../Context'
import UpgradeModal from '../WelcomePage/WelcomeModal02'
import { fetchPricing } from '../../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Billing() {
    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen01, setIsOpen01] = useState(false);
  const [isOpen02, setIsOpen02] = useState(false);
  const [selectedOpt01,setSelectedOpt01]=useState('')
  const [selectedOpt02,setSelectedOpt02]=useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [showInfoCard, setShowInfoCard] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowInfoCard(true);
      }, 1000); // 1 second delay
  
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown01 = () => {
    setIsOpen01(!isOpen01);
  };

  const toggleDropdown02 = () => {
    setIsOpen02(!isOpen02);
  };



  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId=localStorage.getItem("user_id");
  const token=localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const pricedetails = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);
  const details = subscriptions.length > 0 ? subscriptions[0] : null;
  const plan=details?.planType==='monthly'?'month':'year'

  // const [plan,setPlan]=useState("");
  
  // const plan=subscriptions[0]?subscriptions[0].planType:null
  console.log('this is details',details)

  const cancelOptions=[
    {vale:'I don’t use Bodsphere enough to need a membership'},
    {vale:'It doesn’t have the features or functionality I want'},
    {vale:'I’m having technical issues with the app/website'},
    {vale:'It’s too expensive for me'},
    {vale:'I don’t like the content'},
    {vale:'Other'},
  ]

  const cancelOptions01=[
    {vale:'I haven’t sought another alternative'},
    {vale:'I went with another app/website'},
    {vale:'I went with an in-person experience (studio, gym, etc.)'},
    {vale:'Other'},
  ]
  console.log(subscriptions,'fgjtutryru');
  
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.post(API_URL4008+`getAllSubscriptionDetails`,{userId},{
        // const response = await axios.post(`http://localhost:4008/getAllSubscriptionDetails`,{userId:'67ce63e2dc3438ff7a27badd'},{
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        setSubscriptions(response.data.data);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError(err.response?.data?.message || "Failed to load subscriptions");
      } finally {
        setLoading(false);
      }
    };
    
    if(!userId || !token){
      errorMessage("something is wrong");
      return;
    }
    else{
      console.log("userId",userId, "token",token);
      
      fetchSubscriptions();
    }
  }, [userId,token]);

  useEffect(() => {
    if (pricedetails) {
      setCurrency(pricedetails?.monthly?.currency || '');
      setMonthlyPrice(pricedetails?.monthly?.amount || 0);
      setYearlyPrice(pricedetails?.yearly?.amount || 0);
    }
  }, [pricedetails]);

  useEffect(() => {
    dispatch(fetchPricing());
    console.log('running');
  }, [])

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'long', // Full month name (e.g., "March")
      day: 'numeric', // Day of the month (e.g., "25")
      year: 'numeric', // Full year (e.g., "2025")
    });
  };

  const handleCancel = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from local storage
  
      const response = await axios.post(
        API_URL4008+"cancel-subscription",
        {user_id:userId}, // Send any required body (empty in this case)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token as Bearer
            "Content-Type": "application/json"
          }
        }
      );
  
      console.log("Subscription cancelled:", response.data);
    } catch (error) {
      console.error("Error cancelling subscription:", error.response?.data || error.message);
    }
  };
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>  
      <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <div>
        <PageTitle title={'Manage Membership'} />
      </div>
      {subscriptions.length>0 ?
      <div className='overall-manage'>
        <div className='mem-schedule'>
          <h2>Your payment schedule</h2>
          <p style={{color:darkMode?'white':'black'}}>Your next payment is for {currency} {details.planType==='monthly'? monthlyPrice:yearlyPrice} on {formatDate(details.subscriptionEndDate)}. You will continue to be charged {currency} {details.planType==='monthly'? monthlyPrice:yearlyPrice} each {plan} thereafter.</p>
        </div>
      <div className="membership-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        <span>Change membership</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9662;</span>
      </div>
      {isOpen && (
        <div className="dropdown-content">
          <label className="option">
            <div className='mem-opt-div'>
              <div className='title-op-mem'>
            <input type="radio" name="membership" value="monthly" checked={selectedPlan === 'monthly'} onChange={() => setSelectedPlan('monthly')} />

              <strong>Monthly</strong>
              </div>
              <h5>Your current plan will be updated today with {currency} 0 charge, on {formatDate(details.subscriptionEndDate)}, a recurring charge of {currency} {monthlyPrice} / month, plus applicable tax for your region will automatically apply.</h5>
              <h2>{currency} {monthlyPrice} / month</h2>
            </div>
          </label>
          <label className="option">
            <div className='mem-opt-div'>
              <div className='title-op-mem'>
            <input type="radio" name="membership" value="annually" checked={selectedPlan === 'annually'} onChange={() => setSelectedPlan('annually')} />
              <strong>Annually</strong> <span className="save-tag">Save 16%</span>
              </div>
              <h5>Your current plan will be updated today with {currency} 0 charge, on {formatDate(details.subscriptionEndDate)}, a recurring charge of {currency} {yearlyPrice
                } / year, plus applicable tax for your region will automatically apply.</h5>
              <h2>{currency} {yearlyPrice} / year</h2>
            </div>
          </label>
          <div className='change-mem-btn'>
                      <button className="update-button">Update Membership</button>
                      </div>

        </div>
      )}
    </div>

    <div className="membership-container">
      <div className="dropdown-header" onClick={toggleDropdown01}>
        <span>Cancel membership</span>
        <span className={`arrow ${isOpen01 ? 'open' : ''}`}>&#9662;</span>
      </div>
      {isOpen01 && (
        <div className='wrap-mem'>
        <div className="dropdown-content">
          <div className='down-opttt'>
            <strong>We're always looking to improve.Can you take a moment to let us know why you're cancelling your membership? </strong>
          </div>
          {cancelOptions.map((item,index)=>(

          <label className="option">
              <div className='title-op-mem'>
            <input type="radio" name="option" value={item.vale} checked={selectedOpt01===item.vale} onChange={() => setSelectedOpt01(item.vale)} />

              <p style={{color:darkMode?'white':'black'}}>{item.vale}</p>
              </div>
          </label>
              ))}

          {/* <label className="option">
              <div className='title-op-mem'>
            <input type="radio" name="membership" value="semi-annually" checked={selectedPlan === 'semi-annually'} onChange={() => setSelectedPlan('semi-annually')} />
              <p style={{color:darkMode?'white':'black'}}>I’m having technical issues with the app/website</p> 
              </div>
          </label>
          <label className="option">
              <div className='title-op-mem'>
            <input type="radio" name="membership" value="annually" checked={selectedPlan === 'annually'} onChange={() => setSelectedPlan('annually')} />
              <p style={{color:darkMode?'white':'black'}}>It’s too expensive for me</p> 
              </div>
          </label>
          <label className="option">
              <div className='title-op-mem'>
            <input type="radio" name="membership" value="annually" checked={selectedPlan === 'annually'} onChange={() => setSelectedPlan('annually')} />
              <p style={{color:darkMode?'white':'black'}}>I don’t like the content</p> 
              </div>
          </label>
          <label className="option">
              <div className='title-op-mem'>
            <input type="radio" name="membership" value="annually" checked={selectedPlan === 'annually'} onChange={() => setSelectedPlan('annually')} />
              <p style={{color:darkMode?'white':'black'}}>Other</p> 
              </div>
          </label> */}
        </div>

        <div className="dropdown-content">
          <div className='down-opttt'>
            <strong>Did you choose another fitness experience to support your goals </strong>
          </div>
          {cancelOptions01.map((item,index)=>(
          <label className="option">
              <div className='title-op-mem'>
            <input type="radio" name="membership" value={item.vale} checked={selectedOpt02 === item.vale} onChange={() => setSelectedOpt02(item.vale)} />

              <p style={{color:darkMode?'white':'black'}}>{item.vale}</p>
              </div>
          </label>
         ))}
              
        </div>
        <div className='cancel-mem'>
          <button onClick={handleCancel}> Cancel Membership</button>
          </div>
        </div>
        
      )}
    </div>

      </div>
   :
   <div>
    {showInfoCard &&
  <div style={{ marginTop: '10%' }}>
          <InfoCard
            imageSrc='/assets/money.png'
            title="You do not have any active subscriptions at the moment."
            subtitle="Have a look at the great programs you can subscribe to."
            buttonText="Discover Subscriptions"
            onButtonClick={() => setModalOpen(true)}
          />
           <UpgradeModal darkMode={darkMode} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
        }
        </div>
}
{/* div
      {loading ? (
        <p>Loading subscriptions...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : subscriptions.length > 0 ? (
        <div style={{ marginTop: '5%' }}>
          <h2>My Active Subscriptions</h2>
          <ul>
            {subscriptions.map((sub) => (
              <li key={sub._id}>
                <strong>Plan:</strong> {sub.planType} | <strong>Status:</strong> {sub.status} | 
                <strong> Ends:</strong> {new Date(sub.subscriptionEndDate).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ marginTop: '10%' }}>
          <InfoCard
            imageSrc='/assets/money.png'
            title="You do not have any active subscriptions at the moment."
            subtitle="Have a look at the great programs you can subscribe to."
            buttonText="Discover Subscriptions"
            // onButtonClick={handleDiscoverClick}
          />
        </div>
      )} */}
    </div>
  );
}
