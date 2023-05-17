import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup( props ) {
    return (
        <PopupWithForm
            name="upd-avatar"
            title="Обновить аватар"
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            {/* value для отладки */}
            <input
                id="upd-input"
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