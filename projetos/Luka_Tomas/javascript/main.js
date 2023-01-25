function FullScreen(ImgNumber) {
    document.getElementById("fullscreen-img").src = "./imgs/" + document.getElementById("gallery-" + ImgNumber + "").src.split('imgs/')[1];
    document.getElementById("gallery-section").style.opacity = ".5"
    document.getElementById("fullscreen-img-container").style.display = "flex"
}

function CloseFullScreen() {
    document.getElementById("fullscreen-img-container").style.display = "none"
    document.getElementById("gallery-section").style.opacity = "1"
}

var ActualPage = 1;
var CarouselImages = ["./imgs/test.png", "./imgs/festiva_plakat_naziv.png", "./imgs/tomasposter.png"]

function PreviousCarousel() {
    if(ActualPage > 0) {
        document.getElementById("carousel-"+ActualPage+"").setAttribute("class", "main-carousel-image");
        document.getElementById("carousel-"+parseInt(ActualPage + 1)+"").setAttribute("class", "");
        ActualPage--;
    }
}

function NextCarousel() {
    if(ActualPage < CarouselImages.length-1) {
        document.getElementById("carousel-" + parseInt(ActualPage + 2) +"").setAttribute("class", "main-carousel-image");
        document.getElementById("carousel-" + parseInt(ActualPage + 1) +"").setAttribute("class", "");
        ActualPage++;
    }
}