export interface NavItem {
  id: string;
  label: string;
  route: string;
}

export const NAV_ITEMS: NavItem[] = [
  {
    id: 'feed',
    label: 'Feed',
    route: '/feed',
  },
  {
    id: 'profile',
    label: 'Profile',
    route: '/profile',
  },
];
