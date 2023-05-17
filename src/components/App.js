import React, { useEffect, useState} from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddCardPopup from "./AddCardPopup";
import EditAvatarPopup from "./EditAvatarPopup";
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddCardPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
    }
    return (
      <>
        <Header/>
        <Main
            handleEditProfileClick={setIsEditProfilePopupOpen}
            handleAddPlaceClick={setIsAddCardPopupOpen}
            handleEditAvatarClick={setIsEditAvatarPopupOpen}
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
        <div className="popup popup_img-card">
          <div className="popup__img-container">
            <button
                aria-label="Закрыть Popup"
                type="button"
                className="popup__close"
            />
            <img className="popup__zoom-image" src="src/components/App#" alt="" />
            <h3 className="popup__zoom-title" />
          </div>
        </div>
        {/*  Popup удаления карточки*/}
        <div className="popup popup_del-card">
          <div className="popup__container">
            <button
                type="button"
                className="popup__close"
                aria-label="Закрыть Popup"
            />
            <h3 className="popup__title">Вы уверены?</h3>
            <form className="form " name="popup__form-del-card" noValidate="">
              <button className="form__input-btn form__del-btn" type="submit">
                Да
              </button>
            </form>
          </div>
        </div>


        {/*-------------------------------------------------TEMPLATE */}
        <template id="elements__items" />
      </>

  );
}

export default App;
