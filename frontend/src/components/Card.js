import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const likeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn && "card__delete-button_show"
  }`;
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="card" key={props.card._id}>
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__title-wrap">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-box">
          <button
            type="button"
            className={likeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="card__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </div>
  );
}

export default Card;
