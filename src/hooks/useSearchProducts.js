import {useMemo} from "react";

export default function useSearchProducts(products, query) {
  const searchedProducts = useMemo(() => {
    return products.filter(prod => prod.title.toLowerCase().includes(query.toLowerCase()))
  }, [products, query])

  return searchedProducts
}