import React, { useState, useEffect } from 'react';

function FilterPosts({ options, selectedOption, onSelectChange }) {
  // Use selectedOption instead of selectedFilter to avoid conflicts
  const [selectedValue, setSelectedValue] = useState(selectedOption);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    onSelectChange(value);
  };

  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  return (
    <div className="post-filter">
      <select value={selectedValue} onChange={handleFilterChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterPosts;







