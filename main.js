import { startSplash } from "./scripts/splash.js";
import { startLoadingDots } from "./scripts/loading_dots.js";
import { findLocal } from "./scripts/instance_check.js";
import {setFavicon} from "./scripts/favicon.js";
import { contentIsEmpty } from "./scripts/emptyContent.js";
import { createNav } from "./scripts/createNav.js";
import { createFooter } from "./scripts/createFooter.js";

await setFavicon();
await createNav();
await createFooter();
startSplash();
startLoadingDots();
findLocal();
contentIsEmpty();

/**
 * Fetches, injects, and initializes the custom diamond cursor.
 */
export async function handleCursor() {
    try {
        // 1. Fetch and Inject the template
        const response = await fetch('/templates/cursor.html');
        if (!response.ok) throw new Error('Cursor template not found');
        
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);

        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        // 2. Physics & State Variables
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        const weight = 0.06; // Lower = heavier/draggier

        // 3. Mouse Movement Listener
        document.addEventListener('mousemove', (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        });

        // 4. Animation Loop (Smoothing)
        function render() {
            currentX += (targetX - currentX) * weight;
            currentY += (targetY - currentY) * weight;

            cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(render);
        }
        render();

        // 5. Hover Logic (Event Delegation)
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button')) {
                cursor.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('a, button')) {
                cursor.classList.remove('cursor-hover');
            }
        });

    } catch (err) {
        console.error("Cursor initialization failed:", err);
    }
}

handleCursor();