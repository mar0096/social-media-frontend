import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  className,
}) => {
  return (
    <div className={className}>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className=""
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormRow;
