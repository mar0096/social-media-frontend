import React from "react";

function FormRowSelect({ labelText, name, value, handleChange, list }) {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <select name={name} value={value} onChange={handleChange}>
        {list.map((itemValue, index) => {
          return (
            <option value={itemValue} key={index}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FormRowSelect;
