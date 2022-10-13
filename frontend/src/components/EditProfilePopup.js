import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("Пользователь");
  const [description, setDescription] = useState("О себе");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      username: name,
      userjob: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textButtonSubmit="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name-input"
        className="form__input form__input_name_position"
        minLength={2}
        maxLength={40}
        required
        placeholder="Имя пользователя"
        value={name}
        onChange={handleChangeName}
      />
      <span className="name-input-error form__input-error form__input-error_name_position"></span>
      <input
        type="text"
        name="about"
        id="about-input"
        className="form__input form__input_prof_position"
        minLength={2}
        maxLength={200}
        required
        placeholder="О себе"
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="about-input-error form__input-error form__input-error_profession_position"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
