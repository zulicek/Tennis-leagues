import React from "react";
import ReactDOM from 'react-dom'
import './Modal.scss'

export function Modal({ children }) {
    const markup = <div className="modal-wrapper"><div className="modal">{children}</div></div>
  
    return ReactDOM.createPortal(markup, document.getElementById('portal-root'))
  }