import React from "react";

export default function Card(props) {
  const { value, handleClick } = props;
  return (
    <button className="card" data-value={value} onClick={handleClick}>
      {value}
    </button>
  );
}
