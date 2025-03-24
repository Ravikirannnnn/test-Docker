import { useState,useEffect } from "react";
import Modal from "../../Components/Loader/Modal/Modal"; // Ensure this imports your custom modal component
import axios from "axios";
import { errorMessage,successMessage } from "../../Service/ApiService";
import { API_URL4008 } from "../../Service/ApiService";
// import fetchPricing from "../../Service/fetchPricing";
import { useDispatch, useSelector } from "react-redux";
import { fetchPricing } from "../../redux/userSlice";

const TrialModal = ({ darkMode, setModalOpen,modalOpen }) => {
  // const [upgradeModal, setUpgradeModal] = useState(true);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const user_id = localStorage.getItem("user_id");
  const accessToken= localStorage.getItem('accessToken')

  const [loading, setLoading] = useState(false);

  const [sessionLoaded, setSessionLoaded] = useState(true);

  const details = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState(details.monthly.currency);
  const [monthlyPrice, setMonthlyPrice] = useState(details.monthly.amount);
  const [yearlyPrice, setYearlyPrice] = useState(details.yearly.amount);

  const closeUpgradeModal = () => {
    // setUpgradeModal(false);
    setModalOpen(false);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  

    const handlFetchPrice = async () => {
      const data=await fetchPricing();
      setCurrency(data.monthly.currency);
      setMonthlyPrice(data.monthly.amount);
      setYearlyPrice(data.yearly.amount);
      console.log(data);
    
    }

  // const handlePremium = () => {
  //   console.log("Subscribed to:", selectedOption);

    const handleTrial = async () => {
      setLoading(true);
      console.log('triggered');
      
      if (!user_id) {
          navigate('/login');
          return;
      }
  
      try {
          // Fetch user's IP address
          setSessionLoaded(false);
          const ipResponse = await axios.get("https://api64.ipify.org?format=json");
          const userIp = ipResponse.data.ip;
          // const currency=ipResponse.data.currency;
            // console.log(currency)
            const returnUrl = window.location.href;
          // Send request to backend with IP
          const response = await axios.post(API_URL4008+
            "trial-subscription",
            {
                planType: selectedOption, 
                user_id,
                ip: userIp,
                returnUrl
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
  
          console.log(response.data);
          if (response.data.sessionUrl) {
            setSessionLoaded(true);
              window.location.href = response.data.sessionUrl; // Redirect to Stripe Checkout
          }
      } catch (error) {
          console.error("Subscription error:", error);
          errorMessage("Something went wrong! Please try again.");
      }
      closeUpgradeModal(); // Close modal after subscribing
  };

  return (
    <Modal isOpen={modalOpen} onClose={closeUpgradeModal}>
      <div style={{ color: darkMode ? "white" : "black" }}>
        <div className="premium-top-title-st">Get Premium</div>
        <div className="premium-title-st">
          Start your free <br /> Trial
        </div>
        <div className="premium-text-st">
          Get access to the resources  <br />
          for 3 days
        </div>

        <div>
          {/* Monthly Option */}
          <div className="radio-container-st" style={{ backgroundColor: "#FF5F6747" }}>
            <input
              type="radio"
              name="option"
              id="radio1"
              value="monthly"
              onChange={handleRadioChange}
              checked={selectedOption === "monthly"}
            />
            <label className="radio-contents-container-1-st" htmlFor="radio1">
              <div>
                <div className="radio-head-1-st">Monthly</div>
                <div className="radio-tail-1-st">Pay monthly</div>
              </div>
              <div className="radio-right-container-st">
                <div className="radio-right-st">
                <sup>{currency}</sup>{monthlyPrice}<sub>/m</sub>
                </div>
              </div>
            </label>
          </div>

          {/* Yearly Option */}
          <div className="radio-container-st" style={{ backgroundColor: "#FF5F6747" }}>
            <input
              type="radio"
              name="option"
              id="radio2"
              value="yearly"
              onChange={handleRadioChange}
              checked={selectedOption === "yearly"}
            />
            <label className="radio-contents-container-2-st" htmlFor="radio2">
              <div>
                <div className="radio-head-2-st">Yearly</div>
                <div className="radio-tail-2-st">Pay for full year</div>
              </div>
              <div className="radio-right-container-2-st">
                <div className="radio-right-2-st">
                <sup>{currency}</sup>{yearlyPrice}<sub>/y</sub>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div
      className="modal-premium-btn-st-00"
      style={{
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={!loading ? handleTrial : undefined}
    >
      {loading ? (
        <span className="loader"></span> // Add your loader here
      ) : (
        "Start Trail"
      )}
    </div>
      </div>
    </Modal>
  );
};

export default TrialModal;
