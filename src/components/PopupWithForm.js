export default function PopupWithForm( props ) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    onClick={props.onClose}
                    type="button"
                    className="popup__close"
                    aria-label="Закрыть Popup"
                />
                <h3 className="popup__title">{props.title}</h3>
                <form
                    className={`form form_${props.name}`}
                    name={`popup__form-${props.name}`}
                    onSubmit={props.onSubmit}
                    noValidate
                >
                    {props.children}
                    <button className={`form__input-btn ${props.class ? 'form__del-btn' : ''}`} type="submit">
                        {props.button}
                    </button>
                </form>
            </div>
        </div>
    )
}