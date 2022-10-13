import React from "react";
import icon from "../image/Infotooltip/iconYes.jpg";
import unIcon from "../image/Infotooltip/iconNo.jpg";

function InfoTooltip(props) {
  const className = props.isOpen ? `popup popup_opened` : `popup`;
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }
  return (
    <div className={className}>
      <div className="popup__body" onClick={handleOverlayClick}>
        <div className=" info-tooltip popup-content">
          <img
            className="info-tooltip__icon"
            src={props.res ? icon : unIcon}
            alt={props.res ? "иконка всё ok" : "иконка ошибки"}
          ></img>
          <p className="info-tooltip__massage">
            {props.res
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз"}
          </p>
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

export default InfoTooltip;
