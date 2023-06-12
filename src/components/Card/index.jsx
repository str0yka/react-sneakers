import React, {useContext} from 'react';
import classes from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import {AppContext} from "../../context/AppContext";

const Index = ({card}) => {
  const {productsInCart, productsInFavorites, isLoading, handleProduct} = useContext(AppContext)

  const isOnCart = isLoading ? null : productsInCart.some(product => product.id === card.id)
  const isOnFavorite = isLoading ? null : productsInFavorites.some(product => product.id === card.id)

  return (
    <article className={classes.card}>
      {isLoading
        ?
        <ContentLoader
          speed={2}
          width={150}
          height={185}
          viewBox="0 0 150 185"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
          <rect x="0" y="105" rx="10" ry="10" width="150" height="15" />
          <rect x="0" y="125" rx="10" ry="10" width="90" height="15" />
          <rect x="0" y="160" rx="10" ry="10" width="80" height="25" />
          <rect x="118" y="153" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
        :
        <>
          <button
            className={isOnFavorite ? [classes.btnAddToFavorite, classes.active].join(' ') : classes.btnAddToFavorite}
            onClick={() => isOnFavorite ? handleProduct.onRemoveFromFavorite(card) : handleProduct.onAddToFavorite(card)}
          >
            <span className="visually-hidden">
              {isOnFavorite ? 'remove from favorite' : 'add to favorite'}
            </span>
          </button>

          <img className={classes.cardImg} src={card.imageUrl} alt="sneaker" draggable='false'/>
          <h4 className={classes.cardTitle}>{card.title}</h4>
          <div className={classes.cardInfo}>
            <div className={classes.cardPrice}>
              <p>Цена:</p>
              <b>{card.price} руб.</b>
            </div>

            <button
              className={isOnCart ? [classes.btnAddToCart, classes.active].join(' ') : classes.btnAddToCart}
              onClick={() => isOnCart ? handleProduct.onRemoveFromCart(card) : handleProduct.onAddToCart(card)}
            >
              <span className="visually-hidden">
                {isOnCart ? 'remove from cart' : 'add to cart'}
              </span>
            </button>
          </div>
        </>
      }
    </article>
  );
};

export default Index;