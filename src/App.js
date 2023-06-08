import Header from "./components/Header";
import Cart from "./components/Cart";
import Card from "./components/Card";
import {useEffect, useState} from "react";
import axios from "axios";


function App() {
  console.log('App is rendered')

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [productsInCart, setProductsInCart] = useState([])

  const fetchProducts = async () => {
    const response = await axios.get('https://6481f92529fa1c5c50326621.mockapi.io/products')
    setProducts(response.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const onRemoveFromCart = product => {
    product.isOnCart = false
    setProductsInCart(prev => prev.filter(prod => prod !== product))
  }

  const onAddToCart = product => {
    if (productsInCart.includes(product)) {
      onRemoveFromCart(product)
      return
    }
    product.isOnCart = true
    setProductsInCart(prev => [...prev, product])
  }

  return (
    <div className="wrapper">
      {isCartOpen && <Cart
        onClose={() => setIsCartOpen(false)}
        products={productsInCart}
        onRemoveFromCart={onRemoveFromCart}
      />}

      <Header onClickCart={() => setIsCartOpen(true)}/>

      <main className="content">
        <div className="contentHeader">
          <h1 className='title'>Все кроссовки</h1>
          <label className="searchBlock">
            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input type="text" placeholder='Поиск...'/>
          </label>
        </div>

        <section className="sneakers">
          {products.map(card =>
            <Card
              key={card.id}
              card={card}
              onAddToFavorite={() => console.log('added to favorite')}
              onAddToCart={() => onAddToCart(card)}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
