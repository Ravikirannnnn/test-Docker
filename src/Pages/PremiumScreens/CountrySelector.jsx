import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const CountrySelector = () => {
  const [value, setValue] = useState(null);

  // Use useMemo to generate the options list only once
  const options = useMemo(() => countryList().getData(), []);

  const handleChange = (value) => {
    setValue(value); // Update selected country
  };

  return (
    <Select
      options={options}       // Provide the country options
      value={value}           // Set the selected value
      onChange={handleChange} // Update value on selection
      placeholder="Select a country"
    />
  );
};

export default CountrySelector;
