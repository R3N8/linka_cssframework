import { fetchProfilePageData } from '../../services/profile/profile';
import { renderProfilePage } from './components/profilePage';
import { renderProfileError } from './components/error';
import { initProfileUI } from './ui/profileUI';
import { getStoredUsername } from './utils/getStoredUsername';

export default async function ProfilePage(): Promise<string> {
  try {
    let username = getProfileUsername();

    if (!username) {
      const currentUser = getStoredUsername();
      if (currentUser) {
        const url = `/profile?user=${encodeURIComponent(currentUser)}`;
        history.replaceState({}, '', url);
        window.__route = { path: '/profile', query: { user: currentUser } };
        username = currentUser;
      } else {
        return renderProfileError('No profile provided');
      }
    }

    const currentUser = getStoredUsername();
    const isOwnProfile = currentUser?.toLowerCase() === username.toLowerCase();
    const [profile, posts] = await fetchProfilePageData(username);
    const postList = posts.data;

    setTimeout(() => {
      initProfileUI(username!, postList, isOwnProfile);
    }, 0);

    return renderProfilePage(profile, postList, isOwnProfile);
  } catch (err) {
    return renderProfileError('Failed to load profile');
  }
}

function getProfileUsername(): string | null {
  const query = window.__route?.query;
  const username = query?.user;

  if (!username?.trim()) return null;

  return username.trim();
}
