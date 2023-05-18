import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card(card) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.ownerId === currentUser._id;
    const isLiked = card.likes && card.likes.some((i) => i._id === currentUser._id);
    const cardElementButtonClassName = `card__like ${isLiked && "card__like_active"}`;

    function handleClick() {
        card.onCardClick({ name: card.name, link: card.link });
    }

    function handleLikeClick() {
        card.onCardLike(card.cardId, card.likes);
    }
    function handleDeleteCard() {
        card.onCardDelete(card.cardId);
    }

    return (
        <li key={card.keys} className="elements__items">
            <article className="card">
                {isOwn && (
                <button aria-label="Удалить" className="card__trash" type="button" />
                )}
                <img className="card__item"
                     src={card.link}
                     alt={card.name}
                     onClick={handleClick}
                />

                <div className="card__desc">
                    <h2 className="card__title" >{card.name}</h2>
                    <div className="card__place">
                        <button aria-label="Лайк"
                                type="button"
                                className={cardElementButtonClassName}
                                onClick={handleLikeClick}
                        />
                        <p className="card__like-count">{card.likes.length}</p>
                    </div>
                </div>
            </article>
        </li>
    )
}