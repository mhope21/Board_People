// FilterPosts.jsx
import React from 'react';

const FilterPosts = ({ options, selectedOption, onSelectChange }) => {
    return (
        <select value={selectedOption} onChange={onSelectChange}>
            <option value="">All Posts</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}

export default FilterPosts;
