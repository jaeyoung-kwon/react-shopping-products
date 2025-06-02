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
  console.log(`[subscribe] key: ${key}`);
  console.log(listeners[key]);

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

  console.log(`[updateData] key: ${key}`);
  console.log(store[key]);
  console.log(listeners[key]);

  // 해당 key에 연결된 listener만 실행
  listeners[key]?.forEach((cb) => cb());
}
