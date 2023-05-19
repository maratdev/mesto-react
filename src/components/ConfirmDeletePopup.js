import React from 'react';
import PopupWithForm from './PopupWithForm'
function ConfirmDeletePopup(props) {


    function handleSubmit(evt) {
        evt.preventDefault();
        props.onConfirm()
    }

    return(
        <PopupWithForm
            submitTitle={props.submitTitle}
            name="del-card"
            title="Вы уверены?"
            elemClass="true"

            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    )
}

export default ConfirmDeletePopup