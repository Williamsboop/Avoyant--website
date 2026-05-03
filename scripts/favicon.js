export async function setFavicon() {
    const faviUrl = "/assets/logo.png";

    let link = document.querySelector("link[rel~='icon']");

    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }

    link.type = 'image/png';
    link.href = faviUrl;
}