import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setPlaceName] = useState("");
  const [link, setLink] = useState("");

  function handleChangePlaceName(evt) {
    setPlaceName(evt.target.value);
  }

  function handleChangePlaceLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({ name, link });
  }

  useEffect(() => {
    setPlaceName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="create-card"
      title="Новое место"
      textButtonSubmit="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="place-input"
        className="form__input form__input_place_position"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
        value={name || ""}
        onChange={handleChangePlaceName}
      />
      <span className="place-input-error form__input-error form__input-error_place-input_position"></span>
      <input
        type="url"
        name="link"
        id="place-link-input"
        className="form__input form__input_place-link_position"
        placeholder="Ссылка на картинку"
        required
        value={link || ""}
        onChange={handleChangePlaceLink}
      />
      <span className="place-link-input-error form__input-error form__input-error_place-link-input_position"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
