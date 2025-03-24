import { useState, useEffect } from "react";
import Modal from "../../Components/Loader/Modal/Modal"; // Ensure this imports your custom modal component

const UpgradeModal = ({ darkMode }) => {
  const [upgradeModal, setUpgradeModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("monthly");

  useEffect(() => {
    // Check if user has already seen the modal
    const hasSeenModal = localStorage.getItem("seenUpgradeModal");

    if (!hasSeenModal) {
      setUpgradeModal(true);
      localStorage.setItem("seenUpgradeModal", "true"); // Store flag
    }
  }, []);

  const closeUpgradeModal = () => {
    setUpgradeModal(false);
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePremium = () => {
    console.log("Subscribed to:", selectedOption);
    closeUpgradeModal(); // Close modal after subscribing
  };

  return (
    <Modal isOpen={upgradeModal} onClose={closeUpgradeModal}>
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
          <div className="radio-container-st"
           style={{ cursor:'pointer',
            backgroundColor: selectedOption === "monthly" ? "#FF5F6747" : darkMode? '#2c2c2e': "white", }}
            onClick={() => handleRadioChange({ target: { value: "monthly" } })}
            >
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
                  <sup>$</sup>19.99<sub>/m</sub>
                </div>
              </div>
            </label>
          </div>

          {/* Yearly Option */}
          <div className="radio-container-st" 
          style={{ cursor:'pointer',
            backgroundColor: selectedOption === "yearly" ? "#FF5F6747" : darkMode? '#2c2c2e': "white",}}
            onClick={() => handleRadioChange({ target: { value: "yearly" } })}
            >
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
                  <sup>$</sup>129.99<sub>/y</sub>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="modal-premium-btn-st-00" onClick={handlePremium}>
          Subscribe Now
        </div>
      </div>
    </Modal>
  );
};

export default UpgradeModal;
