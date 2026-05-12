import { useCallback, useEffect, useState } from "react";

export interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useFetch<T>(
  url: string,
  errorMessage?: string,
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = useCallback(() => {
    setFetchCount((c) => c + 1);
  }, []);

  useEffect(
    function runFetch() {
      const fallback = errorMessage ?? "An error occurred. Please try again.";

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(null);
      setLoading(true);

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error(fallback);
          return res.json() as Promise<T>;
        })
        .then((result) => setData(result))
        .catch((err) => setError(err instanceof Error ? err.message : fallback))
        .finally(() => setLoading(false));
    },
    // fetchCount triggers a re-run when refetch() is called
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, fetchCount],
  );

  return { data, loading, error, refetch };
}
