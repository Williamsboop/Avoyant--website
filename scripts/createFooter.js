export async function createFooter() {
    let body = document.body
    let footer = fetch('/templates/footer.html')
        if (footer) {
            footer.then(response => response.text())
            .then(data => {
                body.insertAdjacentHTML('afterend', data)
            });
        }
}