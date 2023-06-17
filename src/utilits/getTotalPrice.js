export default function getTotalPrice(productsInCart) {
  const stringPriceToNumber = product => {
    return +product.replace(' ', '')
  }

  const totalPrice = productsInCart.reduce((sum, product) => sum + stringPriceToNumber(product.price), 0)

  return totalPrice
}