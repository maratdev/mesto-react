import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup( props ) {
    return (
        <PopupWithForm
            name="edit-user"
            title="Редактировать профиль"
            button="Сохранить"
            isOpen={props.isOpen}
            onClose={props.onClose}

        >
            <input
                id="name-input"
                className="form__input form__input_string_name"
                type="text"
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
                placeholder="О себе"
                maxLength={200}
                minLength={2}
            />
            <span className="form__span-error user-job-input-error" />

        </PopupWithForm>
    )
}