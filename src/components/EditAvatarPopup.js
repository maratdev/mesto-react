export default function EditAvatarPopup( props ) {
    return (
        <div className={`popup popup_upd-avatar  ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    onClick={props.onClose}
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть Popup"
                />
                <h3 className="popup__title">Обновить аватар</h3>
                <form className="form " name="popup__form-upd-avatar" noValidate="">
                    {/* value для отладки */}
                    <input
                        id="upd-input"
                        className="form__input"
                        type="url"
                        defaultValue="https://i.pravatar.cc/300"
                        name="updInput"
                        placeholder="Ссылка на картинку"
                        required=""
                    />
                    <span className="form__span-error upd-input-error" />
                    <button className="form__input-btn" type="submit">
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    )
}