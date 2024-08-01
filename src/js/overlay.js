import { overlay, setting } from "./modal.js";

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
