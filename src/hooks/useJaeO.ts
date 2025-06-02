import { getSnapshot, subscribe, updateData } from '@/services/dataStore';
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
} from 'react';

const cache = new Map<string, { data: unknown; updatedAt: number }>();

interface useJaeOProps<T> {
  fetchKey: string;
  fetchFn: () => Promise<T>;
  onError?: () => void;
}

export function useJaeO<T>({ fetchKey, fetchFn, onError }: useJaeOProps<T>) {
  const data = useSyncExternalStore(
    useCallback((cb) => subscribe(fetchKey, cb), [fetchKey]),
    () => getSnapshot(fetchKey)
  );
  const [isLoading, setIsLoading] = useState(!cache.get(fetchKey));
  const [isError, setIsError] = useState(false);

  const fetchFnRef = useRef(fetchFn);
  const onErrorRef = useRef(onError);

  const fetchAndSetData = useCallback(
    async (ignore: boolean) => {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await fetchFnRef.current();
        if (!ignore) {
          updateData(fetchKey, { data, updatedAt: Date.now() });
        }
      } catch {
        setIsError(true);
        onErrorRef.current?.();
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    },
    [fetchKey]
  );

  const refetch = useCallback(() => {
    return fetchAndSetData(false);
  }, [fetchAndSetData]);

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    let ignore = false;

    fetchAndSetData(ignore);

    return () => {
      ignore = true;
    };
  }, [fetchAndSetData, fetchKey]);

  if (!data) return { data: null, isLoading, isError, refetch };

  return { data: data.data as T, isLoading, isError, refetch };
}
