export default function ImagePopup( props ) {
    return (
        <div className="popup popup_img-card">
            <div className="popup__img-container">
                <button
                    aria-label="Закрыть Popup"
                    type="button"
                    className="popup__close"
                />
                <img className="popup__zoom-image" src="src/components/App#" alt="" />
                <h3 className="popup__zoom-title" />
            </div>
        </div>
    )
}