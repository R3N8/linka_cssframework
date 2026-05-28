import { initNavbarEvents } from './navbar.events';
import { renderNavbar } from './navbar.template';

export default function Navbar() {
  return renderNavbar();
}

export function initNavbar() {
  initNavbarEvents();
}