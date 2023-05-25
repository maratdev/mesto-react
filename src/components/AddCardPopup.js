import React, { useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";

export default function AddCardPopup(props, isOpen ) {

    const {handleChange, resetForm, errors, isValid } = useFormWithValidation();
    const [name, setName] = useState('');
    const [link, setLink] = useState('');


   useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    // useEffect(() => {
    //     resetForm();
    // }, [resetForm])

    function handleNameChange(evt) {
        handleChange(evt);
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        handleChange(evt);
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        resetForm();
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
            onSubmitValidation={isValid}
        >
            <input
                id="image-input"
                className="form__input form__input_string_place"
                type="text"
                value={name || ''}
                onChange={handleNameChange}
                name="card_name"
                placeholder="Название"
                maxLength={30}
                minLength={2}
            />
            <span className="form__span-error image-input-error" >  {errors.card_name || ''}  </span>
            <input
                id="src-input"
                className="form__input form__input_string_src"
                value={link || ''}
                type="url"
                onChange={handleLinkChange}
                name="card_src"
                placeholder="Ссылка на картинку"
            />
            <span className="form__span-error src-input-error">{errors.card_src || ''}</span>

        </PopupWithForm>
    )
}