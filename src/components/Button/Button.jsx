import React from "react";
import "./Button.scss";

export function Button({ type = "default", onClick, children }) {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}
