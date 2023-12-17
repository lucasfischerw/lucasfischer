function openMenu() {
    if(document.querySelector(".mobile-menu").classList.contains("open")) {
        document.querySelector(".mobile-menu").classList.remove("open");
        document.querySelector("#nav-btn").classList.remove("open");
    } else {
        document.querySelector(".mobile-menu").classList.add("open");
        document.querySelector("#nav-btn").classList.add("open");
    }
}

document.querySelector('.next').addEventListener('click', function () {
    document.querySelector(".image-carossel").scrollBy({
        left: .5 * window.screen.width,
        top: 0,
        behavior: 'smooth'
    })
});

document.querySelector('.previous').addEventListener('click', function () {
    document.querySelector(".image-carossel").scrollBy({
        left: -.5 * window.screen.width,
        top: 0,
        behavior: 'smooth'
    })
});