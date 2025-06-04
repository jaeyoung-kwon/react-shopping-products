type Data = { data: unknown; updatedAt: number };

type Store = Record<string, Data>;
type Listener = () => void;

const store: Store = {};
const listeners: Record<string, Set<Listener>> = {};

export function subscribe(key: string, callback: Listener) {
  if (!listeners[key]) {
    listeners[key] = new Set();
  }
  if (!listeners[key].has(callback)) {
    listeners[key].add(callback);
  }

  // cleanup export function 반환
  return () => {
    listeners[key]?.delete(callback);
  };
}

export function getSnapshot(key: string) {
  return store[key];
}

export function updateData(key: string, newValue: Data) {
  store[key] = newValue;

  // 해당 key에 연결된 listener만 실행
  listeners[key]?.forEach((cb) => cb());
}
