var images = document.querySelector("#image-carousel").getElementsByTagName("img");
var titles = ["Unlimited AI", "Blockchain", "XR Solutions", "Possibilities"];

var texts = {
    0: {
        title: "1- It was a quick development that fit perfectly within the project budget.",
        date: "Galerie Gardette - Paris, France (2023 - until today)",
        category: "Website development and content maintenance.",
        duration: "Project duration: 1 month. React, Javascript, Remix.",
        link: "https://galeriegardette.com",
    },
    1: {
        title: "2- It was a quick development that fit perfectly within the project budget.",
        date: "Galerie Gardette - Paris, France (2023 - until today)",
        category: "Website development and content maintenance.",
        duration: "Project duration: 1 month. React, Javascript, Remix.",
        link: "https://galeriegardette.com",
    },
    2: {
        title: "3- It was a quick development that fit perfectly within the project budget.",
        date: "Galerie Gardette - Paris, France (2023 - until today)",
        category: "Website development and content maintenance.",
        duration: "Project duration: 1 month. React, Javascript, Remix.",
        link: "https://galeriegardette.com",
    },
    3: {
        title: "4- It was a quick development that fit perfectly within the project budget.",
        date: "Galerie Gardette - Paris, France (2023 - until today)",
        category: "Website development and content maintenance.",
        duration: "Project duration: 1 month. React, Javascript, Remix.",
        link: "https://galeriegardette.com",
    },
    4: {
        title: "5- It was a quick development that fit perfectly within the project budget.",
        date: "Galerie Gardette - Paris, France (2023 - until today)",
        category: "Website development and content maintenance.",
        duration: "Project duration: 1 month. React, Javascript, Remix.",
        link: "https://galeriegardette.com",
    },
    5: {
        title: "6- It was a quick development that fit perfectly within the project budget.",
        date: "Galerie Gardette - Paris, France (2023 - until today)",
        category: "Website development and content maintenance.",
        duration: "Project duration: 1 month. React, Javascript, Remix.",
        link: "https://galeriegardette.com",
    },
    6: {
        title: "7- It was a quick development that fit perfectly within the project budget.",
        date: "Galerie Gardette - Paris, France (2023 - until today)",
        category: "Website development and content maintenance.",
        duration: "Project duration: 1 month. React, Javascript, Remix.",
        link: "https://galeriegardette.com",
    },
};

function showText(img) {
    document.getElementById("img-title").innerHTML = texts[img].title;
    document.getElementById("date").innerHTML = texts[img].date;
    document.getElementById("category").innerHTML = texts[img].category;
    document.getElementById("duration").innerHTML = texts[img].duration;
    document.getElementById("link").href = texts[img].link;
    document.getElementById("link").innerHTML = texts[img].link;
}

function changeImg(img) {
    var originalSrc = document.getElementById("image-5").src;
    document.getElementById("image-5").src = images[img].src;
    document.getElementById("image-" + img).src = originalSrc;
    showText(document.getElementById("image-5").src.split("/")[document.getElementById("image-5").src.split("/").length - 1].split(".")[0]);
}

for (var i = 0; i < images.length; i++) {
    images[i].setAttribute("onclick", "changeImg("+i+")");
}

var counter = 0;

setInterval(function() {
    document.getElementById("title").style.opacity = "0";
    setTimeout(function() {
        document.getElementById("title").innerHTML = titles[counter];
        setTimeout(function() {
            document.getElementById("title").style.opacity = "1";
        }, 300);
    }, 300);
    counter++;
    if(counter == 4) {
        counter = 0;
    }
}, 2500);

function closeMenu() {
    document.getElementById("mobile-nav").style.display = "none";
}

function openMenu() {
    document.getElementById("mobile-nav").style.display = "block";
}

window.onscroll = function() {
    var elements = document.getElementsByClassName("scroll-point");
    var closestToTop = 0;
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].getBoundingClientRect().top < 100) {
            closestToTop = i;
        }
    }
    var nav = document.querySelector("#upper-menu").getElementsByTagName("a");
    for (var i = 0; i < nav.length; i++) {
        if(nav[i].classList.contains(elements[closestToTop].id + "-nav")) {
            nav[i].style.fontWeight = "bold";
        } else {
            nav[i].style.fontWeight = "normal";
        }
    }
}