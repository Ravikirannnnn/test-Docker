import { useState, useEffect } from "react";
import Modal from "../../Components/Loader/Modal/Modal"; // Ensure this imports your custom modal component
import axios from "axios";
import { errorMessage } from "../../Service/ApiService";
import { API_URL4008 } from "../../Service/ApiService";
import { fetchPricing } from "../../redux/userSlice";
import { useSelector } from "react-redux";

const UpgradeModal = ({ darkMode, setModalOpen, modalOpen }) => {
  const [selectedOption, setSelectedOption] = useState("monthly");
  const user_id = localStorage.getItem("user_id");
  const accessToken = localStorage.getItem("accessToken");
  const [sessionLoaded, setSessionLoaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const details = useSelector((state) => state.user.pricing);
  const [currency, setCurrency] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState(0);
  const [yearlyPrice, setYearlyPrice] = useState(0);


  useEffect(() => {
    if (details) {
      setCurrency(details?.monthly?.currency || '');
      setMonthlyPrice(details?.monthly?.amount || 0);
      setYearlyPrice(details?.yearly?.amount || 0);
    }
  }, [details]);

  const closeUpgradeModal = () => {
    setModalOpen(false);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const handlePremium = async () => {
  //   console.log("Subscribed to:", selectedOption);

  //   if (!user_id) {
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     setSessionLoaded(false);
  //     const ipResponse = await axios.get("https://api64.ipify.org?format=json");
  //     const userIp = ipResponse.data.ip;
  //     const returnUrl = window.location.href;

  //     const response = await axios.post(
  //       API_URL4008 + "premium-subscription",
  //       {
  //         planType: selectedOption,
  //         user_id,
  //         ip: userIp,
  //         returnUrl,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //     if (response.data.sessionUrl) {
  //       setSessionLoaded(true);
  //       window.location.href = response.data.sessionUrl;
  //     }
  //   } catch (error) {
  //     console.error("Subscription error:", error);
  //     errorMessage("Something went wrong! Please try again.");
  //   }
  //   closeUpgradeModal();
  // };
  const handleSubscribe = async () => {
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
        let returnUrl = window.location.href;
        if (!returnUrl.includes("/#/")) {
          returnUrl = returnUrl.replace(window.location.origin, window.location.origin + "/#");
        }
        // Send request to backend with IP
        const response = await axios.post(
          // "https://bodspheretest.bodsphere.com:4008/stripe-subscription",
                    API_URL4008+"stripe-subscription",
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

        // console.log(response.data);
        if (response.data.sessionUrl) {
          setSessionLoaded(true);
            window.location.href = response.data.sessionUrl; // Redirect to Stripe Checkout
        }
    } catch (error) {
        console.error("Subscription error:", error);
        errorMessage("Something went wrong!");
    }
};
  return (
    <Modal isOpen={modalOpen} onClose={closeUpgradeModal}>
      <div style={{ color: darkMode ? "white" : "black" }}>
        <div className="premium-top-title-st">Be Premium</div>
        <div className="premium-title-st">
          Get Unlimited <br /> Access
        </div>
        <div className="premium-text-st">
          When you subscribe, you’ll get <br />
          instant unlimited access
        </div>

        <div>
          {/* Monthly Option */}

          <div className="radio-container-st" style={{cursor:'pointer',
                backgroundColor: selectedOption === "monthly" ? "#FF5F6747" :darkMode? '#2c2c2e': "white",
                // selectedOption === "monthly" ? "#FF5F6747" : "gray",
              }}
              onClick={() => handleRadioChange({ target: { value: "monthly" } })}>

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

          <div className="radio-container-st" style={{cursor:'pointer',
                backgroundColor: selectedOption === "yearly" ? "#FF5F6747" :darkMode? '#2c2c2e': "white",
                // selectedOption === "monthly" ? "#FF5F6747" : "gray",
              }}
              onClick={() => handleRadioChange({ target: { value: "yearly" } })}>

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
      onClick={!loading ? handleSubscribe : undefined}
    >
      {loading ? (
        <span className="loader"></span> // Add your loader here
      ) : (
        "Subscribe Now"
      )}
    </div>
      </div>
    </Modal>
  );
};

export default UpgradeModal;
