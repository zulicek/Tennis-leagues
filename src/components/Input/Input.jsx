import React from "react";
import "./Input.scss";

export function Input({ name, icon, type, onChange, iconDecoration, value, checked, error }) {
  return (
    <div className={`input-wrapper${type === undefined || type === "radio" || type === "checkbox" ? ' no-border' : ''}`}>
      {icon && <i className={icon} aria-hidden="true"></i>}
      {console.log(type)}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={name}
        defaultValue={value}
        checked={checked}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
      />
      <label id={name} htmlFor={name}>{name}</label>
      {iconDecoration}
      {error && (
          <div className="error">{error}</div>
        )}
    </div>
  );
}
