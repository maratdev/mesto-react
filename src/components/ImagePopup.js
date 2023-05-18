export default function ImagePopup( props  ) {
    console.log(props.card)
    return (
        <div className={`popup popup_img-card ${props} ? 'popup_opened' : '' `}>
            <div className="popup__img-container">
                <button
                    aria-label="Закрыть Popup"
                    type="button"
                    className="popup__close"
                />
                <img className="popup__zoom-image" src="" alt="" />
                <h3 className="popup__zoom-title">  </h3>
            </div>
        </div>
    )
}