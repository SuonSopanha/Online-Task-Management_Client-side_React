import React, { useState } from 'react';

const TaskSeveritySelector = ({ initValue, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(initValue);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setSelectedOption(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="relative inline-block text-left">
            <select
                className="border-0 p-1 bg-blue-100 text-gray-600 text-xs leading-none rounded-md font-semibold hover:text-black"
                id="severity"
                name="severity"
                value={selectedOption}
                onChange={handleChange}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
            </select>
        </div>
    );
};

export default TaskSeveritySelector;
