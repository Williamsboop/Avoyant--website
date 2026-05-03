let spans;
let index = 0;
let interval;

function animate() {
    spans.forEach(s => s.classList.remove("active"));
    spans[index].classList.add("active");
    index = (index + 1) % spans.length;
}

export function startLoadingDots() {

    if (!document.querySelector("p.splash")){
        return;
    } else {
        console.log("splash element found.")
    }

    spans = document.querySelectorAll("#status span");
    interval = setInterval(animate, 200);
}

export function stopLoadingDots() {
    clearInterval(interval);
}