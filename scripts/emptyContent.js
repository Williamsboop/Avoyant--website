export async function contentIsEmpty() {
    const contentWrapper = document.getElementById("contentWrapper");
    
    if (!contentWrapper) {
        console.error("Element div#contentWrapper not found.");
        return;
    }

    if (contentWrapper && !contentWrapper.textContent.trim().legnth) {
        console.log('content wrapper is empty.');
    } else {
        console.log('content wrapper is NOT empty.')
    }
}