import api from "../utils/api";
import { registration, authorization, checkToken } from "../utils/auth"
import Main from "./Main";
import LogIn from "./LogIn";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useState, useEffect } from "react";

function App() {
  const history = useHistory();
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    name: "Пользователь",
    link: "",
    about: "О себе",
  });
  const [selectedCard, setSelectedCard] = useState(null);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [registerResult, setRegisterResult] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }
  function handleRegister(registerInfo) {
    registration(registerInfo)
      .then(() => {
        setRegisterResult(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setRegisterResult(false);
        setIsInfoTooltipOpen(true);
      });
  }
  function handleLogin(userInfo) {
    authorization(userInfo)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setUserEmail(userInfo.email);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  }
  function handleLogOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }
  function handleCheckToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getDataAll()
        .then(([cards, userInfo]) => {
          setCurrentUser(userInfo);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleUpdateUser(data) {
    api
      .changeProfileInfo(data)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCardApi(card._id)
      .then((res) => {
        console.log(res);
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header email={userEmail} logOut={handleLogOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <LogIn logInOn={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register registerOn={handleRegister} />
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          res={registerResult}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
