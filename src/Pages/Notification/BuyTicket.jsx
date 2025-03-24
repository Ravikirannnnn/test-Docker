import React, { useContext, useEffect, useState,useRef } from 'react';
import './BuyTicket.css'
import PageTitle from '../../Components/Loader/Other/PageTitle'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL4000, API_URL4005, API_URL4011, ImagePath } from '../../Service/ApiService';
import { toast, Toaster } from 'react-hot-toast';
import { themeContext } from "../../Context";
import Modal from '../../Components/Loader/Modal/Modal';
import axios from 'axios';
import { successMessage,errorMessage } from '../../Service/ApiService';

export default function BuyTicket() {
  const navigate=useNavigate()

const location=useLocation();
const [arrayTicket, setArrayTicket] = useState(location.state?.arrayTicket || null);
// const [isEventAdded, setIsEventAdded] = useState(false);
const [count, setCount] = useState(1);
const [ticketModal,setTicketModal]=useState(false)
// const [click,setClick]=useState(false)
const theme = useContext(themeContext);
const darkMode = theme.state.darkMode;
const [showControls, setShowControls] = useState(false);
const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("accessToken");
  const [isBooked,setIsBooked]=useState(false);
useEffect(() => {
  if (arrayTicket?.type === 'live') {
    setShowControls(true);
  }
}, [arrayTicket]);
const handleTicketsClick = async () => {
  setShowControls(true);
}
const handleModalClick = async () => {
  buyTicket(arrayTicket);
}
const openTicketModal=()=>{
  setTicketModal(true)
}
const closeTicketModal=()=>{
  setTicketModal(false)
}
console.log(JSON.stringify(arrayTicket, null, 2));

// 

const startDate=arrayTicket?.event_date;
const endDate=arrayTicket?.event_end_date;

const availableTickets=arrayTicket?.TotalTickets-arrayTicket?.bookedTockets;

const [searchParams] = useSearchParams();
const session_id = searchParams.get("session_id");

useEffect(() => {
  if (!arrayTicket) {
    const storedTicket = localStorage.getItem("arrayTicket");
    if (storedTicket) {
      setArrayTicket(JSON.parse(storedTicket)); // ✅ Restore arrayTicket after returning
      localStorage.removeItem("arrayTicket"); // ✅ Cleanup after retrieval
    }
  }
}, [arrayTicket]);

// console.log('windows pathname',window.location.pathname)
  useEffect(() => {
    if (session_id) {
      console.log('running');
      axios.post(`${API_URL4011}ticketConfirm`, { session_id },{
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }})
        .then((response) => {
          successMessage("Payment confirmed, ticket booked!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error confirming payment:", error);
          errorMessage("Failed to confirm payment.");
        })
    }
  }, [session_id]);

  useEffect(() => {
    if (arrayTicket?.usersBooked?.includes(user_id)) {
      setIsBooked(true);
    } else {
      setIsBooked(false);
    }
  }, [arrayTicket, user_id]);

// const handleAddEvent = async () => {
//   try {
//     await createCalendarEvent();
//   } catch (error) {
//     console.error('Error adding event: ', error);
//   }
// };

// const signInWithGoogle = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     const tokens = await GoogleSignin.getTokens();
//     return tokens.accessToken;
//   } catch (error) {
//     console.error('Error signing in with Google: ', error);
//     throw error;
//   }
// };


// const createCalendarEvent = async () => {
//   const event = {
//     summary: event_name,
//     location: location,
//     start: {
//       dateTime: formatEndTime(event_date, start_time),
//       timeZone: 'UTC',
//     },
//     end: {
//       dateTime: formatEndTime(event_date, end_time),
//       timeZone: 'UTC',
//     },
//     reminders: {
//       useDefault: false,
//       overrides: [
//         { method: 'email', minutes: 24 * 60 },
//         { method: 'popup', minutes: 10 },
//       ],
//     },
//   };

//   try {
//     const accessToken = await signInWithGoogle();
//     const response = await fetch(
//       'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(event),
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Error creating event: ' + response.statusText);
//     }

//     const data = await response.json();
   
//     if (data.status === "confirmed"){

//       console.log('Event created: ', data);
//       setIsEventAdded(true);
//     }
//   } catch (error) {
//     console.error('Error creating event: ', error);
//   }
// };
useEffect(() => {
  if (!arrayTicket) {
    const storedTicket = localStorage.getItem("arrayTicket");
    if (storedTicket) {
      setArrayTicket(JSON.parse(storedTicket)); // ✅ Restore arrayTicket after returning
      localStorage.removeItem("arrayTicket"); // ✅ Cleanup after retrieval
    }
  }
}, [arrayTicket]);


const buyTicket = async (arrayTicket) => {
  
  const return_url = window.location.href; // Store current page URL
  localStorage.setItem("arrayTicket", JSON.stringify(arrayTicket));

  if (!user_id || !token) {
    errorMessage("User not logged in.");
    return;
  }

  try {
    const response = await axios.post(
      `${API_URL4011}ticketCreation`,
      {
        price: arrayTicket.price,
        user_id,
        event_id: arrayTicket._id,
        return_url,
      },
      {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      }
    );

    window.location.href = response.data.url; // Redirect to Stripe Checkout

  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    errorMessage("Payment failed. Please try again.");
  }
};


const formatDateWithDay = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', // Day of the week
    // year: 'numeric', // Year
    month: 'short',   // Full month name
    day: 'numeric'   // Day of the month
  });
};

const handleMinusClick = () => {
  if (count > 1) {
    setCount(count - 1);
  }
};

const handlePlusClick = () => {
  if (count < availableTickets) {
    setCount(count + 1);
  } else {
    // ToastAndroid.show("Cannot add more tickets than available",ToastAndroid.SHORT);
    toast.error('You have reached maximum number', {
      duration: 1000,
    });  }
};

const handleJoinPress = (link) => {
  try {
      const newWindow = window.open(link, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          throw new Error('Failed to open the URL');
      }
  } catch (err) {
      console.error("Failed to open URL:", err);
  }
};
// console.log(arrayTicket,'array');

  return (
    <>   
     {arrayTicket && <div className='overall-buy-tic-container'>
      <div className='new-back'>
        <PageTitle title={arrayTicket?.event_name}/>
      </div>
     <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
      <div className='top-img-tic'>
        <img src={ImagePath+arrayTicket?.image} alt="" />
        {/* <div className='arow-tic'>
          <PageTitle/>
        </div> */}
      </div>
      <div className='tic-name-container'>
        <div className='tic-name'>{arrayTicket?.event_name}</div>
        {/* <div className='tic-icons-container'>
          <div className='tic-fav-icon'>
            <img src='/assets/Vector.png')} alt="fav" />
          </div>
          <div className='tic-share-icon'>
            <img src='/assets/Vector (6).png')} alt="share" />
          </div>
        </div> */}
      </div>
      <div className='tic-timings-container'>

        <div className='tic-date'>{(formatDateWithDay(startDate))}
           {/* To {(formatDateWithDay(endDate))} */}
           </div>
        <div className='tic-time'>{arrayTicket.start_time} -{arrayTicket.end_time} </div>

        {/* <div className='tic-calender' >
          <img src='/assets/calender.png')} style={{filter:darkMode ? 'invert(0%)' : 'invert(100%)'}} alt="" />
         <span>Add to calander</span> 
        </div> */}
          {arrayTicket?.location ?

        <div className='tic-calender-00'>
          <img src='/assets/location.png' style={{filter:darkMode ? 'invert(0%)' : 'invert(100%)'}} alt="" />
          {arrayTicket?.location}
        </div>
          :null}

          {/* <div>

          </div> */}

      </div>
      <div className='tickets-container'>
        <div className='tic-about-continer'>
          {arrayTicket?.TotalTickets ? 
        <div className='tic-tic-content-0'>
            <div className='tic-abt-0'>Total Tickets : {arrayTicket?.TotalTickets}</div>
            <div className='tic-sub-text-0'>Available Tickets :{availableTickets}</div>
          </div>
          :null}
          <div className='tic-tic-content-1'>
            <div className='tic-abt'>About</div>
            <div className='tic-sub-text'>{arrayTicket?.about}</div>
          </div>
          <div className='tic-tic-content-2'>
            <div className='tic-abt-02'>Refund Policy</div>
            <div className='tic-sub-text-02'>{arrayTicket?.refund_policy}</div>
          </div>
          {arrayTicket?.website_link ? 
          <div className='tic-tic-content-3'>
            <div className='tic-abt-03'>For more information visit our website</div>
            <div className='tic-sub-text-03'>{arrayTicket?.website_link}</div>
          </div>
          :''}
          </div>
          <div className='tic-ticket-container'>
            <div className='tic-price' style={{ color: 'white' }}>
              <div className='tic-p'>Price</div>
              <div className='tic-dollar'>${arrayTicket?.price * count}</div>
            </div>
            {showControls ?
              <div className="plus-minus" style={{ color: 'white' }}>
                {arrayTicket?.type === 'live' ? null :
                  <>
                    <div className="icon-wrapper" onClick={handleMinusClick}>
                      <img
                        src='/assets/minus.png'
                        alt="minus"
                        className="icon"
                        style={{ filter: 'invert(0%)' }}
                      />
                    </div>
                    <span className="count">{count}</span>
                    <div className="icon-wrapper" onClick={handlePlusClick}>
                      <img
                        src='/assets/plus.png'
                        alt="plus"
                        className="icon"
                        style={{ filter: 'invert(0%)' }}
                      />
                    </div>
                  </>
                }
              </div>

              : null
            }

            <div className='buy-tic-btn'
              onClick={() => {

                if (showControls) {
                  if (arrayTicket.type === 'live') {
                    openTicketModal()
                  } else {
                    buyTicket(arrayTicket);
                  }
                } else {
                  handleTicketsClick();
                }
              }}
              style={{ color: 'white' }}
            >
              {isBooked ? 'Already Booked' : 'Buy Tickets'}
            </div>
          </div>
        </div>
      </div>}

    <Modal isOpen={ticketModal} onClose={closeTicketModal} >
      <div className='signoutbtn-pp' style={{color:darkMode?'white':'black'}}>
        <h1>Buy Ticket</h1>
        <div className='sign0ut-text-pp'> This event will combine relaxation, meditation, and guided practice suitable for all levels.</div>
        <h5>Event Name:{arrayTicket?.event_name}</h5>
        <h5>Ticket Price:${arrayTicket?.price}</h5>
        {/* <h5></h5> */}
        {isBooked ?
      <button onClick={() => handleJoinPress(arrayTicket?.eventLink)}>Join Now</button>:
      <button onClick={handleModalClick}>Buy</button>
        }
      {/* <h5>Cancel</h5> */}
      </div>
    </Modal>
    </>

  )
}
