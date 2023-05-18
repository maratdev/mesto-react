import React, { useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
    // Попапы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = React.useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDelCardPopupOpen(false);
        setSelectedCard(null);
    }

    // Api-> UserInfo

    useEffect(() => {
        api.getDataUser()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Api-> Card

    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
                //console.log(initialCards)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCardClick(card) {
        setSelectedCard(card);
    }
    // Api-> Like
    function handleCardLike(cardId, likes) {
        const isLiked = likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(cardId, !isLiked)
            .then((newCard) => {setCards((state) => state.map((element) => (element._id === cardId ? newCard : element)));})
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(cardId) {
        api.deleteCard(cardId)
            .then(() => { setCards((state) => state.filter((card) => card._id !== cardId));})
            .catch((error) => {
                console.log(error);
            });
    }

    function handleUpdateUser(userData) {
        api.saveDataInfo(userData)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleUpdateAvatar(userData) {
        api.saveDataProfile(userData)
            .then((userAvatar) => {
                setCurrentUser(userAvatar);
                closeAllPopups();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleAddPlaceSubmit(inputValues) {
        api.saveCardInfo(inputValues).then(cardData => {
            setCards([cardData, ...cards]);

            closeAllPopups();
        }).catch(error => console.log(error));
    }

    return (
      <>
          <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        <Main
            handleEditProfileClick={setIsEditProfilePopupOpen}
            handleAddPlaceClick={setIsAddCardPopupOpen}
            handleEditAvatarClick={setIsEditAvatarPopupOpen}
            handleConfirmDelCard={setIsConfirmDelCardPopupOpen}

            userName={currentUser.name}
            userDescription={currentUser.about}
            userAvatar={currentUser.avatar}

            onCardLike={handleCardLike}

            onCardDelete={handleCardDelete}

            onCardClick={handleCardClick}
            cards={cards}
        />
        <Footer/>
        {/*  Popup редактировать профиль*/}
        <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
        />
          {/*  Popup добавление новой карточки*/}
        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          handleAddPlaceClick={handleAddPlaceSubmit}
        />
          {/*  Popup редактирования аватарки*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/*  Popup изображения*/}
        <ImagePopup
          onClose={closeAllPopups}
        />
        {/*  Popup удаления карточки*/}
          <PopupWithForm
              isOpen={isConfirmDelCardPopupOpen}
              name="del-card"
              title="Вы уверены?"
              button="Да"
              class="true"
              onClose={closeAllPopups}
          ></PopupWithForm>

          <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}>
          </ImagePopup>
          </CurrentUserContext.Provider>
      </>

  );
}

export default App;
