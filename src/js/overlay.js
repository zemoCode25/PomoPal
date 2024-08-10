import { getOverlay, setting } from "./modal.js";

const overlay = getOverlay();

overlay.addEventListener("click", () => {
  removeOverlay();
  removeSettingModal();
});

export function removeOverlay() {
  overlay.classList.remove("overlay-active");
}

export function removeSettingModal() {
  setting.classList.remove("setting-active");
}
