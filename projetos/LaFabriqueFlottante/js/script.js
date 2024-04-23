var images = document.querySelector("#image-carousel").getElementsByTagName("img");
var titles = ["Unlimited AI", "Blockchain", "XR Solutions", "Possibilities"];

function changeImg(img) {
    var originalSrc = document.getElementById("image-5").src;
    document.getElementById("image-5").src = images[img].src;
    document.getElementById("image-" + img).src = originalSrc;
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