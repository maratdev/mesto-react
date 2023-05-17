export default function AddCardPopup( props ) {
    return (
        <div className={`popup popup_add-card ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    onClick={props.onClose}
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть Popup"
                />
                <h3 className="popup__title">Новое место</h3>
                <form
                    className="form form_add-card"
                    name="popup__form-add-card"
                    noValidate=""
                >
                    <input
                        id="image-input"
                        className="form__input form__input_string_place"
                        type="text"
                        name="card_name"
                        placeholder="Название"
                        maxLength={30}
                        minLength={2}
                        required=""
                    />
                    <span className="form__span-error image-input-error" />
                    <input
                        id="src-input"
                        className="form__input form__input_string_src"
                        defaultValue="https://loremflickr.com/g/1080/720/paris"
                        type="url"
                        name="card_src"
                        placeholder="Ссылка на картинку"
                        required=""
                    />
                    <span className="form__span-error src-input-error" />
                    <button className="form__input-btn" type="submit">
                        Создать
                    </button>
                </form>
            </div>
        </div>
    )
}