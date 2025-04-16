import { useEffect, useState } from "react";

export const useQuery = <T>(asyncFunc: () => Promise<T>) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    setLoading(true)
    asyncFunc()
      .then((res) => {
        setData(res)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { loading, error, data }
}