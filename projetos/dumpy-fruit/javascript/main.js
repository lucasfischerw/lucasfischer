window.addEventListener("scroll", () => {
    if(window.scrollY < 20) {
        document.getElementById("logo-main-menu").style.width = "80px";
        document.getElementById("upper-menu").style.backgroundColor = "transparent";
        document.getElementById("upper-menu").style.backdropFilter = "none";
    } else {
        document.getElementById("logo-main-menu").style.width = "50px";
        document.getElementById("upper-menu").style.backgroundColor = "rgba(0, 0, 0, .5)";
        document.getElementById("upper-menu").style.backdropFilter = "blur(10px)";
    }
});

var pictureIndex = 1;
var totalImages = 2;
var image_url;
var timer = setInterval(next, 2500);

var tester = new Image();

function next() {
    pictureIndex++;
    document.getElementById("viewer").style.opacity = "0";
    setTimeout(() => {
        if(pictureIndex > totalImages) {
            pictureIndex = 1;
        }
        image_url = "./images/carousel-"+ pictureIndex + ".png";
        document.getElementById("viewer").src = image_url;
        setTimeout(() => {
            document.getElementById("viewer").style.opacity = "1";
        }, 50);
    }, 280);
}

function NextArrow() {
    clearInterval(timer);
    timer = setInterval(next, 2500);
    next();
}

function PreviousArrow() {
    document.getElementById("viewer").style.opacity = "0";
    clearInterval(timer);
    setTimeout(() => {
        pictureIndex--;
        if(pictureIndex < 1) {
            pictureIndex = totalImages;
        } else if(pictureIndex > totalImages) {
            pictureIndex = 1;
        }
        image_url = "./images/carousel-"+ pictureIndex + ".png";
        document.getElementById("viewer").src = image_url;
        setTimeout(() => {
            document.getElementById("viewer").style.opacity = "1";
            timer = setInterval(next, 2500);
        }, 50);
    }, 280);
}