import {
  followUser,
  unfollowUser,
  checkIfFollowing,
} from "../services/followService";
import { getStoredUsername } from "../utils/getStoredUsername";

export async function initFollowUI(targetUsername: string) {
  const btn = document.getElementById("follow-btn") as HTMLButtonElement;
  if (!btn) return;

  const currentUser = getStoredUsername();
  if (!currentUser) return;

  let isFollowing = await checkIfFollowing(currentUser, targetUsername);

  update(btn, isFollowing);

  btn.addEventListener("click", async () => {
    const prev = isFollowing;

    try {
      btn.disabled = true;

      if (isFollowing) {
        await unfollowUser(targetUsername);
        isFollowing = false;
      } else {
        await followUser(targetUsername);
        isFollowing = true;
      }

      update(btn, isFollowing);
    } catch {
      isFollowing = prev;
      update(btn, prev);
    } finally {
      btn.disabled = false;
    }
  });
}

function update(btn: HTMLButtonElement, state: boolean) {
  btn.classList.toggle("bg-slate-500", state);
  btn.classList.toggle("bg-orange-500", !state);
  btn.textContent = state ? "Following" : "Follow";
}