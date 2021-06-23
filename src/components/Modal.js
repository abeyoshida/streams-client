import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals mvisible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div
          className="header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {props.title}
          <i
            onClick={props.onDismiss}
            className="close icon"
            style={{ cursor: "pointer" }}
          ></i>
        </div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
