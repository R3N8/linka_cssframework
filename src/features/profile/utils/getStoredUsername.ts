import { getLocalItem } from '../../../utils/storage';

export function getStoredUsername(): string | null {
  let user = getLocalItem('user');

  if (!user) {
    try {
      const token = getLocalItem('accessToken');

      if (typeof token === 'string' && token.split('.').length === 3) {
        const payload = JSON.parse(atob(token.split('.')[1]));

        const nameFromToken =
          payload?.name || payload?.username || payload?.sub;

        if (typeof nameFromToken === 'string' && nameFromToken.trim()) {
          user = nameFromToken.trim();

          try {
            localStorage.setItem('user', JSON.stringify(user));
          } catch {}
        }
      }
    } catch {}
  }

  if (!user) return null;

  if (typeof user === 'string') return user.trim() || null;

  if (typeof user === 'object') {
    const name = (user as any).name || (user as any).profile?.name;
    if (typeof name === 'string' && name.trim()) return name.trim();

    const email = (user as any).email;
    if (typeof email === 'string' && email.includes('@')) {
      return email.split('@')[0];
    }
  }

  return null;
}
