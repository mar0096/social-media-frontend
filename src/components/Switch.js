import React from "react";

function Switch({ value, handleSwitch, name }) {
  return (
    <div className="switch">
      <label className="switch-name">{name}</label>

      <input
        name={name}
        type="checkbox"
        id={name}
        className="switch-input"
        checked={value}
        onChange={handleSwitch}
      />
      <label htmlFor={name} className="switch-label"></label>
    </div>
  );
}

export default Switch;
