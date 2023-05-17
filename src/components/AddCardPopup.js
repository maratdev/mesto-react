import PopupWithForm from "./PopupWithForm";

export default function AddCardPopup( props ) {
    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            button="Создать"
            isOpen={props.isOpen}
            onClose={props.onClose}
        >

            <input
                id="image-input"
                className="form__input form__input_string_place"
                type="text"
                name="card_name"
                placeholder="Название"
                maxLength={30}
                minLength={2}
                required
            />
            <span className="form__span-error image-input-error" />
            <input
                id="src-input"
                className="form__input form__input_string_src"
                defaultValue="https://loremflickr.com/g/1080/720/paris"
                type="url"
                name="card_src"
                placeholder="Ссылка на картинку"
                required
            />
            <span className="form__span-error src-input-error" />
        </PopupWithForm>
    )
}