import React from "react";

import { useState } from 'react';

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue) {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
    if (event.key === 'Backspace' && !inputValue) {
      setTags(tags.slice(0, tags.length - 1));
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <div key={index} className="bg-gray-200 px-2 py-1 rounded">
          {tag}
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="border border-gray-300 rounded px-2 py-1 outline-none"
        placeholder="Add tags..."
      />
    </div>
  );
};

export default TagInput
