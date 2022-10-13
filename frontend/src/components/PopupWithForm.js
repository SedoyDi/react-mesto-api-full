import React from "react";

function PopupWithForm(props) {
  const className = props.isOpen
    ? `popup popup_type_${props.name} popup_opened`
    : `popup popup_type_${props.name}`;

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div className={className}>
      <div className="popup__body" onClick={handleOverlayClick}>
        <form
          action="#"
          name={props.name}
          className="form popup-content"
          onSubmit={props.onSubmit}
        >
          <div className="form__content">
            <h2 className="form__title">{props.title}</h2>
            {props.children}
            <button type="submit" className="form__save-button submit-button">
              {props.textButtonSubmit}
            </button>
            <button
              type="button"
              className="popup__close-button"
              onClick={props.onClose}
            ></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
