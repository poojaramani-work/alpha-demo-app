import React, { ChangeEvent } from 'react';

type Props = {
    label: string;
    value: string;
    options: string[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField: React.FC<Props> = ({ label, options, onChange, value }) => {
    return (
        <div className="w-64">
            <label htmlFor="options" className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id="options"
                className="mt-1 block w-full pl-3 pr-10 py-2 border text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                onChange={onChange}
                value={value}
            >
                {options.map((option, index) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectField;