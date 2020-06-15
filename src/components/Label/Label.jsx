import React from "react";
import "./Label.scss";

export function Label({ name, icon }) {
  return (
    <div className="label-wrapper">
      {icon && <i className={icon} aria-hidden="true"></i>}
      <label id={name} htmlFor={name}>{name}</label>
    </div>
  );
}
