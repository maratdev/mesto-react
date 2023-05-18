import React from "react";
import Card from "./Card";

import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile page__profile">
                <button onClick={props.handleEditAvatarClick} className="profile__avatar-btn" type="button">
                    <img
                        className="profile__avatar"
                        src={props.userAvatar}
                        alt="Аватарка"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{props.userName}</h1>
                    <button
                        onClick={props.handleEditProfileClick}
                        aria-label="Редактировать профиль"
                        type="button"
                        className="profile__edit-btn"
                    />
                    <p className="profile__subtitle" > {props.userDescription}</p>
                </div>
                <button
                    onClick={props.handleAddPlaceClick}
                    aria-label="Добавление карточки"
                    type="button"
                    className="profile__add-btn"
                />
            </section>
            <section className="elements page__cards">
                <ul className="elements__grids list">
                    {props.cards.map((card, i) => (
                    <Card
                        key={i}
                        name={card.name}
                        link={card.link}
                        ownerId={card.owner._id}
                        likes={card.likes}
                        onCardLike={props.onCardLike}
                        cardId={card._id}
                        onCardDelete={props.onCardDelete}
                        onCardClick={props.onCardClick}
                    />
                    ))}
                </ul>
            </section>
        </main>
    )
}