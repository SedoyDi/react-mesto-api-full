import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const textInput = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: textInput.current.value,
    });
  }

  useEffect(() => {
    textInput.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textButtonSubmit="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        id="avatar-input"
        className="form__input form__input_avatar-link_position"
        placeholder="Ссылка на аватар"
        minLength={2}
        maxLength={200}
        ref={textInput}
        required
      />
      <span className="avatar-input-error form__input-error form__input-error_avatar-link_position"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
