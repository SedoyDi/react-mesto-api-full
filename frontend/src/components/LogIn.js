import { useState } from "react";

function LogIn(props) {
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
    if (email || password) {
      props.logInOn({ password:password, email:email });
    }
  }
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input
          type="email"
          placeholder="Email"
          className="login__input login__input_email_position"
          onChange={changeEmail}
          value={email||""}
        ></input>
        <input
          type="password"
          placeholder="Пароль"
          className="login__input login__input_password_position"
          onChange={changePassword}
          value={password||""}
        ></input>
        <button type="submit" className="login__submit-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default LogIn;
