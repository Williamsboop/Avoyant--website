import { stopSplash } from "./splash.js";
import { stopLoadingDots } from "./loading_dots.js";

let splashEl;
let gitLinkBtn;

export async function findLocal() {
    splashEl = document.querySelector(".splash");
    gitLinkBtn = document.querySelector(".gitLink");

    if (!splashEl) {
        return
    }

    console.log("Looking for local instance...");

    const MIN_WAIT = 5000;
    const start = Date.now();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    let found = false;

    try {
        const res = await fetch("https://avoyant.local:8700", {
            signal: controller.signal
        });

        if (res.ok) found = true;
    } catch {}

    clearTimeout(timeout);

    const elapsed = Date.now() - start;
    if (elapsed < MIN_WAIT) {
        await new Promise(r => setTimeout(r, MIN_WAIT - elapsed));
    }

    // SUCCESS
    if (found) {
        splashEl.textContent = "Instance found. Connecting...";
        stopSplash();
        stopLoadingDots();

        window.location.href = "http://avoyant.local:8000";
        return;
    }

    // FAILURE
    stopSplash();
    stopLoadingDots();

    splashEl.style.opacity = 0;

    setTimeout(() => {
        splashEl.innerHTML =
            "No local instance found.<br><br>Visit our github to get started.";

        splashEl.style.opacity = 1;
        splashEl.classList.add("shifted");
    }, 200);

    document.getElementById("status")?.remove();

    setTimeout(() => {
        gitLinkBtn.style.opacity = "1";
    }, 1000);

    console.log("No local instance found.");
}