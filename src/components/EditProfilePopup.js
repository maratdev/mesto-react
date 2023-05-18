import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup( props, isOpen ) {

    const [userName, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSetName(evt) {
        setName(evt.target.value);
    }
    function handleSetDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
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
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}

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