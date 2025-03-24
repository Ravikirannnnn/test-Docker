import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';

const ModalBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const TimerContainer = styled.div`
  padding: 20px;
  height: 200px;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const TimeColumn = styled.div`
  width: 50px;
  overflow: hidden;
  color: #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeItem = styled(animated.div)`
  padding: 5px;
  font-size: 1.5rem;
  color: ${({ selected }) => (selected ? '#ffffff' : '#666666')};
  background: ${({ selected }) => (selected ? '#444' : 'transparent')};
  border-radius: 5px;
  width: 100%;
  text-align: center;
`;

const Picker = ({ items, selected, setSelected }) => {
  const [dragOffset, setDragOffset] = useState(0);

  const bind = useDrag(
    ({ movement: [, my], memo = dragOffset }) => {
      setDragOffset(my + memo);

      // Snap the selection to the closest item if movement exceeds certain distance
      if (my < -50 && selected < items.length - 1) {
        setSelected(selected + 1);
        setDragOffset(0);
      } else if (my > 50 && selected > 0) {
        setSelected(selected - 1);
        setDragOffset(0);
      }

      return memo;
    },
    { axis: 'y' } // Lock drag to vertical direction
  );

  return (
    <TimeColumn {...bind()}>
      {items.map((item, index) => (
        <TimeItem
          key={item}
          style={{ transform: `translateY(${(index - selected) * 5 + dragOffset}px)` }}
          selected={index === selected}
        >
          {item}
        </TimeItem>
      ))}
    </TimeColumn>
  );
};

const TimePickerModal = ({ closeModal }) => {
  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);

  return (
    <ModalBackground onClick={closeModal}>
      <div style={{display:'flex',flexDirection:'row'}}>
      <TimerContainer onClick={(e) => e.stopPropagation()}>
        <Picker items={hours} selected={selectedHour} setSelected={setSelectedHour} />
        <div style={{ fontSize: '1.5rem', color: '#cecece' }}>:</div>
        <Picker items={minutes} selected={selectedMinute} setSelected={setSelectedMinute} />
      </TimerContainer>
      </div>
      {/* Display the selected time at the bottom */}
      <div style={{ marginTop: '20px', fontSize: '1.5rem', color: '#ce3ace' }}>
        Selected Time: {String(selectedHour).padStart(2, '0')}:{String(selectedMinute).padStart(2, '0')}
      </div>
    </ModalBackground>
  );
};

export default TimePickerModal;
