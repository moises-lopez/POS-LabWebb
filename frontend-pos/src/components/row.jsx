import React from "react";

const Row = ({ label, name, value, handleChange }) => {
  return (
    <div className="row">
      <div className="label">{label}</div>
      <input
        id={name}
        type="text"
        value={value}
        className="form-control"
        name={name}
        placeholder={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default Row;
