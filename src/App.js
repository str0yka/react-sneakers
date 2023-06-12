import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./pages/Home";

import useFetch from "./hooks/useFetch";
import React, {useEffect, useState} from "react";
import {AppContext} from "./context/AppContext";

import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Favorites from "./pages/Favorites";
import ProductService from "./utilits/ProductService";
import User from "./pages/User";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [productsInCart, setProductsInCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
  const [productsInFavorites, setProductsInFavorites] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [])
  const [productsConfirmed, setProductsConfirmed] = useState(localStorage.getItem('confirmed') ? JSON.parse(localStorage.getItem('confirmed')) : [])
  const handleProduct = new ProductService(setProductsInCart, setProductsInFavorites)

  const [fetching, isLoading, isError] = useFetch(async () => {
    const response = await axios.get('https://6481f92529fa1c5c50326621.mockapi.io/products')
    setProducts(response.data)
  })

  useEffect(() => {
    fetching()
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(productsInCart))
  }, [productsInCart])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(productsInFavorites))
  }, [productsInFavorites])

  useEffect(() => {
    localStorage.setItem('confirmed', JSON.stringify(productsConfirmed))
  }, [productsConfirmed])

  return (
    <AppContext.Provider
      value={{
        products,
        productsInCart,
        setProductsInCart,
        productsInFavorites,
        productsConfirmed,
        setProductsConfirmed,
        handleProduct,
        isLoading,
        isError,
        setIsCartOpen
    }}
    >
      <div className="wrapper">
        { isCartOpen && <Cart onClose={ () => setIsCartOpen(false) }/> }
        <Header onClickCart={() => setIsCartOpen(true)}/>
        <main className="content">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/user' element={<User/>}/>
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );
}

export default App;
