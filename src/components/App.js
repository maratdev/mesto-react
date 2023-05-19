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

    const [editSubmitTitle, setEditSubmitTitle] = useState("Сохранить");
    const [avatarSubmitTitle, setAvatarSubmitTitle] = useState("Обновить");
    const [addSubmitTitle, setAddSubmitTitle] = useState("Добавить");
    const [addConfirmTitle, setAddConfirmTitle] = useState("Да");

    const handlePopup = isEditProfilePopupOpen || isAddCardPopupOpen || isEditAvatarPopupOpen || selectedCard || isConfirmDelCardPopupOpen

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDelCardPopupOpen(false);
        setSelectedCard(null);
    }

    // ----------------------------------------------------Попап закрытие по ESC и оверлею
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

    // Инициализация User info
    useEffect(() => {
        api.getDataUser()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch(console.error);
    }, []);

    // Инициализация Card
    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch(console.error)
    }, []);

    // ---------------------------------------------------------> Открыте изображение
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    // Api---------------------------------------------------------> Like
    function handleCardLike(cardId, likes) {
        const isLiked = likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(cardId, !isLiked)
            .then((newCard) => {setCards((state) => state.map((element) => (element._id === cardId ? newCard : element)));})
            .catch(console.error)
    }
    // Api---------------------------------------------------------> Удаление карточки
    function handleCardDelete() {
        setAddConfirmTitle("Сохраняем...")
        api.deleteCard(cardId)
            .then(() => { setCards(cards.filter(item => item._id !== cardId))})
            .catch(console.error)
            .finally(() => {
                closeAllPopups();
                setAddConfirmTitle("Да")
            })

    }

    function handleCardDeleteClick(card) {
        setCardId(card);
        setIsConfirmDelCardPopupOpen(true);
    }

    // Api---------------------------------------------------------> Изменение данных пользователя
    function handleUpdateUser(userData) {
        setEditSubmitTitle("Сохраняем...");
        api.saveDataInfo(userData)
            .then((updateUser) => {
                setCurrentUser(updateUser);
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => {
                setEditSubmitTitle("Сохранить")
            });
    }
    // Api---------------------------------------------------------> Изменение аватара
    function handleUpdateAvatar(userData) {
        setAvatarSubmitTitle("Обновляем...");
        api.saveDataProfile(userData)
            .then((userAvatar) => {
                setCurrentUser(userAvatar);
                closeAllPopups();
            })
            .catch(console.error)
            .finally(() => {
                setAvatarSubmitTitle("Обновить")
            })
    }

    // Api---------------------------------------------------------> Добавление карточки
    function handleAddPlaceSubmit(inputValues) {
        setAddSubmitTitle("Добавляем...");
        api.saveCardInfo(inputValues).then(cardData => {
            setCards([cardData, ...cards]);
            closeAllPopups();
        })
            .catch(console.error)
            .finally(() => {
                setAddSubmitTitle("Добавить")
            })
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
            <Footer
                date = {new Date().getFullYear()}
            />
            {/*  Popup редактировать профиль*/}
            <EditProfilePopup
                onUpdateUser={handleUpdateUser}
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                submitTitle={editSubmitTitle}
            />
            {/*  Popup добавление новой карточки*/}
            <AddCardPopup
                isOpen={isAddCardPopupOpen}
                onClose={closeAllPopups}
                handleAddPlaceClick={handleAddPlaceSubmit}
                submitTitle={addSubmitTitle}
            />
            {/*  Popup редактирования аватарки*/}
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                submitTitle={avatarSubmitTitle}
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
              submitTitle={addConfirmTitle}
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
