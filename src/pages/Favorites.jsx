import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Card from "../components/Card";
import {AppContext} from "../context/AppContext";
import Info from "../components/Info";

const Favorites = () => {
  const {productsInCart, productsInFavorites, handleProduct} = useContext(AppContext)

  return (
    <>
      <div className="contentHeader favorites">
        <Link to='/' className='uiButton'>
          <svg viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 11L1 6L6 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <h1 className="title">Мои закладки</h1>
      </div>

      <section className="sneakers">
        {productsInFavorites.length
          ?
          productsInFavorites
            .map(card =>
              <Card
                key={card.id}
                card={card}
                productsInCart={productsInCart}
                productsInFavorites={productsInFavorites}
                handleProduct={handleProduct}
              />
            )
          :
          <Info title='Закладок нет :(' subtitle='Вы ничего не добавляли в закладки' imageUrl='./images/sad-emoji.png'/>
        }
      </section>
    </>
  );
};

export default Favorites;