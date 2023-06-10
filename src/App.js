import Header from "./components/Header";
import Cart from "./components/Cart";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, Route, Routes} from "react-router-dom";
import Card from "./components/Card";


function App() {
  console.log('App is rendered')

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [productsInCart, setProductsInCart] = useState([])
  const [productsInFavorites, setProductsInFavorites] = useState([])
  const [query, setQuery] = useState('')
  const searchedProducts = products.filter(card => card.title.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    axios.get('https://6481f92529fa1c5c50326621.mockapi.io/products')
      .then(response => setProducts(response.data))

    if (localStorage.getItem('cart')) {
      setProductsInCart(JSON.parse(localStorage.getItem('cart')))
    }

    if (localStorage.getItem('favorites')) {
      setProductsInFavorites(JSON.parse(localStorage.getItem('favorites')))
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(productsInCart))
  }, [productsInCart])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(productsInFavorites))
  }, [productsInFavorites])

  const onAddToCart = product => {
    setProductsInCart(prev => [...prev, product])
  }

  const onRemoveFromCart = product => {
    setProductsInCart(prev => prev.filter(prod => prod.id !== product.id))
  }

  const onAddToFavorite = product => {
    setProductsInFavorites(prev => [...prev, product])
  }

  const onRemoveFromFavorite = product => {
    setProductsInFavorites(prev => prev.filter(prod => prod.id !== product.id))
  }

  const onSearch = event => {
    setQuery(event.target.value)
  }

  return (
    <div className="wrapper">
      {isCartOpen &&
        <Cart
          onClose={() => setIsCartOpen(false)}
          products={productsInCart}
          onRemoveFromCart={onRemoveFromCart}
        />
      }

      <Header onClickCart={() => setIsCartOpen(true)}/>

      <main className="content">
        <Routes>
          <Route path='/' element={
            <>
              <div className="contentHeader">
                <h1 className='title'>Все кроссовки</h1>
                <label className="searchBlock">
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    placeholder='Поиск...'
                    value={query}
                    onChange={onSearch}
                  />
                  {query &&
                    <button
                      className='searchClear'
                      onClick={() => setQuery('')}
                    >
                      <span className="visually-hidden">очистить поиск</span>
                    </button>
                  }
                </label>
              </div>

              <section className="sneakers">
                {searchedProducts
                  .map(card =>
                    <Card
                      key={card.id}
                      card={card}
                      productsInCart={productsInCart}
                      productsInFavorites={productsInFavorites}
                      onAddToFavorite={() => onAddToFavorite(card)}
                      onRemoveFromFavorite={() => onRemoveFromFavorite(card)}
                      onAddToCart={() => onAddToCart(card)}
                      onRemoveFromCart={() => onRemoveFromCart(card)}
                    />
                  )}
              </section>
            </>
          }/>
          <Route path='/favorites' element={
            <>
              <div className="contentHeader favorites">
                <Link to='/' className='uiButton'>
                  <svg viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 11L1 6L6 1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </Link>
                <h1 className="title">Мои закладки</h1>
              </div>

              <section className="sneakers">
                {productsInFavorites
                  .map(card =>
                    <Card
                      key={card.id}
                      card={card}
                      productsInCart={productsInCart}
                      productsInFavorites={productsInFavorites}
                      onAddToFavorite={() => onAddToFavorite(card)}
                      onRemoveFromFavorite={() => onRemoveFromFavorite(card)}
                      onAddToCart={() => onAddToCart(card)}
                      onRemoveFromCart={() => onRemoveFromCart(card)}
                    />
                  )}
              </section>
            </>
          }/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
