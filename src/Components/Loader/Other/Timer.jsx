import React, { useState } from 'react';
import './Timer.css';

export default function TimerPicker({ onClose, onSave }) {
  const [minutes, setMinutes] = useState(28);
  const [seconds, setSeconds] = useState(28);

  const handleMinutesChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0)); // Limit to 0-59
    setMinutes(value);
  };

  const handleSecondsChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0)); // Limit to 0-59
    setSeconds(value);
  };

  const handleSave = () => {
    onSave(minutes * 60 + seconds); // Send total seconds
  };

  return (
    <div className="timer-picker">
      <h3>How long would you like this track to play for?</h3>
      <div className="picker">
        <input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          className="number-input"
          aria-label="Minutes"
          min="0"
          max="59"
        />
        <span className="colon">:</span>
        <input
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          className="number-input"
          aria-label="Seconds"
          min="0"
          max="59"
        />
      </div>
      <div className="button-container">
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
