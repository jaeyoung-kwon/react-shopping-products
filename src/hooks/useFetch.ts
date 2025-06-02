import { getSnapshot, subscribe, updateData } from '@/services/dataStore';
import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

export const useFetch = <T>(key: string, fetchFn: () => Promise<T>) => {
  const fetchFnRef = useRef(fetchFn);

  const data = useSyncExternalStore(
    useCallback((cb) => subscribe(key, cb), [key]),
    () => getSnapshot(key)
  );

  useEffect(() => {
    fetchFnRef.current = fetchFn;
  }, [fetchFn]);

  // key에 해당하는 값이 없으면 fetchFn 실행
  useEffect(() => {
    console.log(data);
    if (!data) {
      fetchFnRef.current().then((result) => {
        updateData(key, { data: result, updatedAt: Date.now() }); // 스토어에 저장하고, 구독자에 알림
      });
    }
  }, [key, data, fetchFn]);

  if (!data) return null;

  return data.data as T;
};
