import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleCardLike(card) {
    props.onCardLike(card);
  }

  function handleCardDelete(card) {
    props.onCardDelete(card);
  }

  return (
    <main>
      <section className="profile">
        <button
          type="button"
          className="profile__edit-avatar"
          onClick={props.onEditAvatar}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__nick-name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-photo"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="photo-grid" id="card-list">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
