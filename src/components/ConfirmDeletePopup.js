import React from 'react'
import PopupWithForm from './PopupWithForm'
function ConfirmDeletePopup(props) {
const submitButton = document.querySelector('.form__del-btn')

    function handleSubmit(evt) {
        evt.preventDefault();
        submitButton.textContent = 'Сохранение...';
        props.onConfirm()
    }

    return(
        <PopupWithForm
            name="del-card"
            title="Вы уверены?"
            button="Да"
            class="true"

            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup