import { useState } from "react";

interface UseMutationReturn<T> {
  loading: boolean;
  error: boolean;
  data: T | null;
  mutate: (...args: any[]) => Promise<void>;
}

export const useMutation = <T>(
  asyncFunc: (...args: any[]) => Promise<T>
): UseMutationReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const mutate = async (...args: any[]) => {
    setLoading(true);
    setError(false);
    try {
      const res = await asyncFunc(...args);
      setData(res);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, mutate };
};
