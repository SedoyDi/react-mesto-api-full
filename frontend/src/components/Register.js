import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function changeEmail(evt) {
    setEmail(evt.target.value);
  }

  function changePassword(evt) {
    setPassword(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.registerOn({ password: password, email: email });
  }
  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input
          type="email"
          placeholder="Email"
          className="register__input register__input_email_position"
          onChange={changeEmail}
          value={email || ""}
        ></input>
        <input
          type="password"
          placeholder="Пароль"
          className="register__input register__input_password_position"
          onChange={changePassword}
          value={password || ""}
        ></input>
        <button type="submit" className="register__submit-button">
          Зарегистрироваться
        </button>
        <Link className="register__link" to={"/signin"}>
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
