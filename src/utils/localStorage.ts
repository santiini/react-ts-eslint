/**
 * localStorage methods
 */
const localStorage = window && window.localStorage;

export function set(key: string, value: string): void {
  if (!key || !value) {
    return;
  }
  return localStorage.setItem(key, value);
}

export function get(key: string): string | null {
  return localStorage.getItem(key);
}

export function remove(key: string): void {
  return localStorage.removeItem(key);
}

export function clear(): void {
  return localStorage.clear();
}

interface TokenOptions {
  token: string | null;
  expired: string | null;
}
export function getToken(): TokenOptions {
  const token = localStorage.getItem('access_token');
  let expired = localStorage.getItem('expired_at');
  if (Date.now() > Number(expired)) {
    expired = null;
  }
  return {token, expired};
}

const storeUtil = {
  clear,
  get,
  remove,
  set,
};

export default storeUtil;
