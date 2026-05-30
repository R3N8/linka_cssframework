import { initProfileAnimations } from "./animations";
import { initFollowUI } from "./followUI";
import { initializeTabs } from "./tabsUI";

export function initProfileUI(
  username: string,
  isOwn: boolean
) {
  initializeTabs(username);

  if (!isOwn) {
    initFollowUI(username);
  }

  initProfileAnimations();
}