export async function createNav() {
    let body = document.body
    let nav = fetch('/templates/nav.html')
        if (nav) {
            nav.then(response => response.text())
            .then(data => {
                body.insertAdjacentHTML('afterbegin', data)
            });
        }
}