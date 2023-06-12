export default class ProductService {
  constructor(setProductsInCart, setProductsInFavorites) {
    this.setProductsInCart = setProductsInCart
    this.setProductsInFavorites = setProductsInFavorites
  }
  onAddToCart = product => {
    this.setProductsInCart(prev => [...prev, product])
  }

  onRemoveFromCart = product => {
    this.setProductsInCart(prev => prev.filter(prod => prod.id !== product.id))
  }

  onAddToFavorite = product => {
    this.setProductsInFavorites(prev => [...prev, product])
  }

  onRemoveFromFavorite = product => {
    this.setProductsInFavorites(prev => prev.filter(prod => prod.id !== product.id))
  }
}