import React, { useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from './ConfirmDeletePopup'
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
    // Попапы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardId, setCardId] = useState('');
    const handlePopup = isEditProfilePopupOpen || isAddCardPopupOpen || isEditAvatarPopupOpen || selectedCard

    // Попап закрытие по ESC и оверлею
    useEffect(() => {
        function closeByEscape(evt) {
            if(evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        const handleOverlay = (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closeAllPopups();
            }
        };

        if(handlePopup) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            document.addEventListener('mousedown', handleOverlay);
                return () => {
                document.removeEventListener('keydown', closeByEscape);
                document.removeEventListener('mousedown', handleOverlay);
                }
        }
    }, [handlePopup])


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDelCardPopupOpen(false);
        setSelectedCard(null);
    }


    // Инициализация User info
    useEffect(() => {
        api.getDataUser()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Инициализация Card
    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleCardClick(card) {
        setSelectedCard(card);
    }
    // Api---------------------------------------------------------> Like
    function handleCardLike(cardId, likes) {
        const isLiked = likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(cardId, !isLiked)
            .then((newCard) => {setCards((state) => state.map((element) => (element._id === cardId ? newCard : element)));})
            .catch((err) => {
                console.log(err);
            });
    }
    // Api---------------------------------------------------------> Удаление карточки
    const submitButton = document.querySelector('.form__del-btn')
    function handleCardDelete() {
       // console.log(cardId)
        api.deleteCard(cardId)
            .then(() => { setCards(cards.filter(item => item._id !== cardId))})
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                closeAllPopups();
                submitButton.textContent = 'Да';
            })

    }

    function handleCardDeleteClick(card) {
        setCardId(card);
        setIsConfirmDelCardPopupOpen(true);
    }

    // Api---------------------------------------------------------> Изменение данных пользователя
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
    // Api---------------------------------------------------------> Изменение аватара
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

    // Api---------------------------------------------------------> Добавление карточки
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

            onCardLike={handleCardLike}

            onCardDeleteClick={handleCardDeleteClick}

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

          <ConfirmDeletePopup
              isOpen={isConfirmDelCardPopupOpen}
              onClose={closeAllPopups}
              onConfirm={handleCardDelete}
          >
          </ConfirmDeletePopup>
          <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}>
          </ImagePopup>
          </CurrentUserContext.Provider>
      </>

  );
}

export default App;
