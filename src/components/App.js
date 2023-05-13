import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";


function App() {
  return (
      <>
        <Header/>
        <Main/>
        <Footer/>
        {/*  Popup редактировать профиль*/}
        <div className="popup popup_edit-user">
          <div className="popup__container">
            <button
                type="button"
                className="popup__close"
                aria-label="Закрыть Popup"
            />
            <h3 className="popup__title">Редактировать профиль</h3>
            <form
                className="form form_edit-user"
                name="popup__form-edit-user"
                noValidate=""
            >
              <input
                  id="name-input"
                  className="form__input form__input_string_name"
                  type="text"
                  name="user_name"
                  placeholder="Ваше имя"
                  required=""
                  maxLength={40}
                  minLength={2}
              />
              <span className="form__span-error name-input-error" />
              <input
                  id="user-job-input"
                  className="form__input form__input_string_job"
                  type="text"
                  name="user_job"
                  defaultValue=""
                  placeholder="О себе"
                  required=""
                  maxLength={200}
                  minLength={2}
              />
              <span className="form__span-error user-job-input-error" />
              <button className="form__input-btn" type="submit">
                Сохранить
              </button>
            </form>
          </div>
        </div>
        {/*  Popup добавление новой карточки*/}
        <div className="popup popup_add-card">
          <div className="popup__container">
            <button
                type="button"
                className="popup__close"
                aria-label="Закрыть Popup"
            />
            <h3 className="popup__title">Новое место</h3>
            <form
                className="form form_add-card"
                name="popup__form-add-card"
                noValidate=""
            >
              <input
                  id="image-input"
                  className="form__input form__input_string_place"
                  type="text"
                  name="card_name"
                  placeholder="Название"
                  maxLength={30}
                  minLength={2}
                  required=""
              />
              <span className="form__span-error image-input-error" />
              <input
                  id="src-input"
                  className="form__input form__input_string_src"
                  defaultValue="https://loremflickr.com/g/1080/720/paris"
                  type="url"
                  name="card_src"
                  placeholder="Ссылка на картинку"
                  required=""
              />
              <span className="form__span-error src-input-error" />
              <button className="form__input-btn" type="submit">
                Создать
              </button>
            </form>
          </div>
        </div>
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
        {/*  Popup редактирования аватарки*/}
        <div className="popup popup_upd-avatar">
          <div className="popup__container">
            <button
                type="button"
                className="popup__close"
                aria-label="Закрыть Popup"
            />
            <h3 className="popup__title">Обновить аватар</h3>
            <form className="form " name="popup__form-upd-avatar" noValidate="">
              {/* value для отладки */}
              <input
                  id="upd-input"
                  className="form__input"
                  type="url"
                  defaultValue="https://i.pravatar.cc/300"
                  name="updInput"
                  placeholder="Ссылка на картинку"
                  required=""
              />
              <span className="form__span-error upd-input-error" />
              <button className="form__input-btn" type="submit">
                Сохранить
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
