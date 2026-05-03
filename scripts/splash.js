const splashTexts = [
    "Casting fireball...",
    "Knocking on ports...",
    "Summoning your instance...",
    "Scanning the void...",
    "Refreshing reality...",
    "Locking onto System32...",
    "Downloading more RAM...",
    "Contacting the mothership...",
    "Searching the multiverse...",
    "67% Complete...",
    "Installing good vibes...",
    "Touching grass simulation initializing...",
    "Peeping at your browser history...",
    "Allocating extra RAM for reasons...",
    "Locating User's BTC Wallet...",
    "Deploying serotonin patch...",
    "Turning it off and on again...",
    "Syncing with the group chat...",
    "Planning Japan trip...",
    "Downloading confidence...",
    "Applying main character energy...",
    "Loading NPC awareness...",
    "Compiling thoughts...",
    "Rendering today's experience...",
    "Spawning in...",
    "Hydrating CPU...",
    "ChatGPTing it...",
    "Collecting biometric data (jk)...",
    "Loading low_cortisol.dll...",
    "Please stand by...",
    "Finalizing nothing... ",
    "Loading loading script...",
    "Hacking the mainframe...",
    "Hello World(Print)ing...",
    "Firing when ready...",
];

let splashEl;
let interval;

function cycleSplash() {
    splashEl.style.opacity = 0;

    setTimeout(() => {
        splashEl.textContent =
            splashTexts[Math.floor(Math.random() * splashTexts.length)];
        splashEl.style.opacity = 1;
    }, 200);
}

export function startSplash() {
    splashEl = document.querySelector(".splash");
    if (!splashEl) {
        return
    }

    cycleSplash();
    interval = setInterval(cycleSplash, 1500);
}

export function stopSplash() {
    clearInterval(interval);
}