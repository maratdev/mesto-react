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

function App() {
    // Попапы
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmDelCardPopupOpen, setIsConfirmDelCardPopupOpen] = useState(false);

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsConfirmDelCardPopupOpen(false);
       // setSelectedCard({});
    }
    return (
      <>
        <Header/>
        <Main
            handleEditProfileClick={setIsEditProfilePopupOpen}
            handleAddPlaceClick={setIsAddCardPopupOpen}
            handleEditAvatarClick={setIsEditAvatarPopupOpen}
            handleConfirmDelCard={setIsConfirmDelCardPopupOpen}
        />
        <Footer/>
        {/*  Popup редактировать профиль*/}
        <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
        />
          {/*  Popup добавление новой карточки*/}
        <AddCardPopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
        />
          {/*  Popup редактирования аватарки*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
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


        {/*-------------------------------------------------TEMPLATE */}
        <template id="elements__items" />
      </>

  );
}

export default App;
