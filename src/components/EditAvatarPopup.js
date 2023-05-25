import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup( props ) {
    const ref = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: ref.current.value,
        });
    }

    return (
        <PopupWithForm
            submitTitle={props.isLoading ? 'Обновляем...' : 'Обновить'}
            name="upd-avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            {/* value для отладки */}
            <input
                id="upd-input"
                ref={ref}
                className="form__input"
                type="url"
                defaultValue="https://i.pravatar.cc/300"
                name="updInput"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="form__span-error upd-input-error" />
        </PopupWithForm>
    )
}