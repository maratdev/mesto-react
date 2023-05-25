import React, { useEffect, useState, useContext} from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup( props, isOpen ) {

    const [userName, setUserName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setUserName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSetName(evt) {
        setUserName(evt.target.value);
    }
    function handleSetDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmits(evt) {
        evt.preventDefault();
        props.onUpdateUser({
            userName,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit-user"
            title="Редактировать профиль"
            submitTitle={props.isLoading ? 'Сохраняем...' : 'Сохранить'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmits}

        >
            <input
                id="name-input"
                className="form__input form__input_string_name"
                type="text"
                defaultValue={userName}
                onChange={handleSetName}
                name="user_name"
                placeholder="Ваше имя"
                maxLength={40}
                minLength={2}
            />
            <span className="form__span-error name-input-error" />
            <input
                id="user-job-input"
                className="form__input form__input_string_job"
                type="text"
                name="user_job"
                defaultValue={description}
                onChange={handleSetDescription}
                placeholder="О себе"
                maxLength={200}
                minLength={2}
            />
            <span className="form__span-error user-job-input-error" />

        </PopupWithForm>
    )
}