import React, {useState} from 'react';
import classes from "./Card.module.scss";

const Index = ({card, onAddToCart, onAddToFavorite}) => {
  console.log('Card is rendered')
  const [isOnFavorite, setIsOnFavorite] = useState(false)

  const handleOnFavorite = () => {
    setIsOnFavorite(prev => !prev)
    onAddToFavorite()
  }

  return (
    <article className={classes.card}>
      <button
        className={isOnFavorite ? [classes.btnAddToFavorite, classes.active].join(' ') : classes.btnAddToFavorite}
        onClick={handleOnFavorite}
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
          className={card.isOnCart ? [classes.btnAddToCart, classes.active].join(' ') : classes.btnAddToCart}
          onClick={onAddToCart}
        >
          <span className="visually-hidden">
            {card.isOnCart ? 'remove from cart' : 'add to cart'}
          </span>
        </button>
      </div>
    </article>
  );
};

export default Index;