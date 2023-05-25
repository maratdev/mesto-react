import React, { useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

export default function AddCardPopup(props, isOpen ) {

    const {inputHandler, emailDirty, emailError, formValid } = useFormWithValidation();
    const [name, setName] = useState('');
    const [link, setLink] = useState('');


   useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleNameChange(evt) {
        inputHandler(evt);
        setName(evt.target.value);

    }

    function handleLinkChange(evt) {
        inputHandler(evt);
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.handleAddPlaceClick({
            name: name,
            link: link,
        });
    }


    return (

        <PopupWithForm
            submitTitle={props.isLoading ? 'Добавляем...' : 'Добавить'}
            name="add-card"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            onSubmitValidation={formValid}
        >
            <input
                id="image-input"
                className="form__input form__input_string_place"
                type="text"
                onChange={handleNameChange}
                defaultValue={name}
                name="card_name"
                placeholder="Название"
                maxLength={30}
                minLength={3}
            />
            <span className="form__span-error image-input-error" >{(emailError) && emailError}</span>
            <input
                id="src-input"
                className="form__input form__input_string_src"
                defaultValue={link}
                type="url"
                onChange={handleLinkChange}
                name="card_src"
                placeholder="Ссылка на картинку"
            />
            <span className="form__span-error src-input-error"></span>

        </PopupWithForm>
    )
}