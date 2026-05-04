export async function createCursor() {
    let body = document.body
    let cursor = fetch('/templates/cursor.html')
        if (cursor) {
            cursor.then(response => response.text())
            .then(data => {
                body.insertAdjacentHTML('afterbegin', data)
            });
        }
}