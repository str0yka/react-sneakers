import React from 'react';
import classes from "./Card.module.scss";

const Index = ({card, onAddToCart, productsInFavorites, onAddToFavorite, onRemoveFromFavorite, onRemoveFromCart, productsInCart}) => {
  const isOnCart = productsInCart.find(product => product.id === card.id)
  const isOnFavorite = productsInFavorites.find(product => product.id === card.id)

  return (
    <article className={classes.card}>
      <button
        className={isOnFavorite ? [classes.btnAddToFavorite, classes.active].join(' ') : classes.btnAddToFavorite}
        onClick={isOnFavorite ? onRemoveFromFavorite : onAddToFavorite}
      >
        <span className="visually-hidden">
          {isOnFavorite ? 'remove from favorite' : 'add to favorite'}
        </span>
      </button>

      <img className={classes.cardImg} src={card.imageUrl} alt="sneaker"/>
      <h4 className={classes.cardTitle}>{card.title}</h4>
      <div className={classes.cardInfo}>
        <div className={classes.cardPrice}>
          <p>Цена:</p>
          <b>{card.price} руб.</b>
        </div>

        <button
          className={isOnCart ? [classes.btnAddToCart, classes.active].join(' ') : classes.btnAddToCart}
          onClick={isOnCart ? onRemoveFromCart : onAddToCart}
        >
          <span className="visually-hidden">
            {isOnCart ? 'remove from cart' : 'add to cart'}
          </span>
        </button>
      </div>
    </article>
  );
};

export default Index;