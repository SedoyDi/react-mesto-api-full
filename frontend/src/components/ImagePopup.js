import React from "react";

function ImagePopup(props) {
  const className = props.card
    ? `popup popup_type_${props.name} popup_opened`
    : `popup popup_type_${props.name}`;

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div className={className} id="max-img">
      <div className="popup__body" onClick={handleOverlayClick}>
        <div className="popup__content-max-img popup-content">
          <img
            className="popup__max-img"
            src={props.card && props.card.link}
            alt={props.card && props.card.name}
          />
          <h2 className="popup__max-img-title">
            {props.card && props.card.name}
          </h2>
          <button
            type="button"
            className="popup__close-button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
