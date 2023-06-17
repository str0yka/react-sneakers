import React, {useContext, useState} from 'react';
import axios from "axios";

import {AppContext} from "../../context/AppContext";
import Info from "../Info";
import getTotalPrice from "../../utilits/getTotalPrice";

import classes from "./Cart.module.scss";

const Cart = ({onClose}) => {
  const {productsInCart, setProductsInCart, setProductsConfirmed, handleProduct, isCartOpen} = useContext(AppContext)

  const [isConfirmed, setIsConfirmed] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const totalCost = getTotalPrice(productsInCart)

  const confirmOrder = async () => {
    try {
      setIsLoading(true)

      const { data } = await axios.post('https://6481f92529fa1c5c50326621.mockapi.io/confirmedOrders', {
        items: productsInCart
      })

      setOrderId(data.id)
      setProductsInCart([])

      setProductsConfirmed(prev => [...prev, ...productsInCart])

      const uniqueId = new Set()
      setProductsConfirmed(prev => prev.filter(product => {
        if (uniqueId.has(product.id)) {
          return false
        } else {
          uniqueId.add(product.id)
          return true
        }
      }))

      setIsConfirmed(true)
    } catch (error) {
      setIsConfirmed(false)
      alert('Что-то пошло не так, попробуйте еще раз')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <aside className={`${classes.cartWrapper} ${isCartOpen && classes.cartWrapperVisible}`} onClick={onClose}>
      <div className={classes.cart} onClick={event => event.stopPropagation()}>
        <div className={classes.cartHeader}>
          <h3 className={classes.cartTitle}>Корзина</h3>
          <button
            className={classes.cancelIcon}
            onClick={onClose}
          >
            <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.6653 5.13122H7.20214V1.66821C7.20214 0.332846 5.13114 0.332846 5.13114 1.66821V5.13122H1.668C0.332935 5.13122 0.332935 7.20215 1.668 7.20215H5.13114V10.6652C5.13114 12.0005 7.20214 12.0005 7.20214 10.6652V7.20215H10.6653C12.0005 7.20215 12.0005 5.13122 10.6653 5.13122Z"/>
            </svg>
          </button>
        </div>

        {productsInCart.length
          ?
          <>
            <section className={classes.cartList}>

              {productsInCart.map(product =>
                <article className={classes.cartItem} key={product.id}>
                  <img src={product.imageUrl} alt="sneaker"/>
                  <div className={classes.cartItemInfo}>
                    <h4>{product.title}</h4>
                    <b>{product.price} руб.</b>
                  </div>
                  <button
                    className={classes.cancelIcon}
                    onClick={() => handleProduct.onRemoveFromCart(product)}
                  >
                    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.6653 5.13122H7.20214V1.66821C7.20214 0.332846 5.13114 0.332846 5.13114 1.66821V5.13122H1.668C0.332935 5.13122 0.332935 7.20215 1.668 7.20215H5.13114V10.6652C5.13114 12.0005 7.20214 12.0005 7.20214 10.6652V7.20215H10.6653C12.0005 7.20215 12.0005 5.13122 10.6653 5.13122Z"/>
                    </svg>
                  </button>
                </article>
              )}
            </section>

            <ul className={classes.cartTotalBlock}>
              <li>
                <span>Итого</span>
                <div></div>
                <b>{totalCost} руб.</b>
              </li>
              <li>
                <span>Налог 5%</span>
                <div></div>
                <b>{Math.ceil(totalCost * 0.05 * 100) / 100} руб.</b>
              </li>
              <li>
                <button
                  className={classes.cartButton}
                  onClick={confirmOrder}
                  disabled={isLoading}
                >
                  Оформить заказ
                  <svg viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </li>
            </ul>
          </>
          :
          <Info
            title={isConfirmed ? 'Заказ оформлен!' : 'Корзина пустая'}
            subtitle={isConfirmed ? `Ваш заказ №${orderId} скоро будет передан курьерской службе` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'}
            imageUrl={isConfirmed ? './images/confirmed.png' : './images/box.jpg'}
            onClick={onClose}
          />
        }
      </div>
    </aside>
  );
};

export default Cart;