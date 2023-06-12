import {useState} from "react";

export default function useFetch(callback) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')

  const fetching = async () => {
    try {
      setIsLoading(true)
      await callback()
    } catch (error) {
      setIsError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return [fetching, isLoading, isError]
}