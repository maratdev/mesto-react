import avatar from '../images/avatar.jpg';

export default function Header() {
    return (
        <main>
            <section className="profile page__profile">
                <button className="profile__avatar-btn" type="button">
                    <img
                        className="profile__avatar"
                        src={avatar}
                        alt="Аватарка"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name" />
                    <button
                        aria-label="Редактировать профиль"
                        type="button"
                        className="profile__edit-btn"
                    />
                    <p className="profile__subtitle" />
                </div>
                <button
                    aria-label="Добавление карточки"
                    type="button"
                    className="profile__add-btn"
                />
            </section>
            <section className="elements page__cards">
                <ul className="elements__grids list"></ul>
            </section>
        </main>
    )
}