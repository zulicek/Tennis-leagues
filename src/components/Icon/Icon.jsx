import React from "react";

export function Icon({ iconClass, title}) {
  return (
    <i className={`${iconClass}`} title={title} aria-hidden="true"></i>
  );
}
