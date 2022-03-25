var lastImageCarousel = 1;

function Carousel(imageNumber) {
    if(imageNumber == -1) {
        imageNumber = lastImageCarousel-1;
    } else if(imageNumber == 0) {
        imageNumber = lastImageCarousel+1;
    }
    if(imageNumber > 0 && imageNumber < 8) {
        document.getElementById("carousel-img-"+lastImageCarousel+"").classList.remove("active");
        document.getElementById("carousel-img-"+imageNumber+"").classList.add("active");
        document.getElementById("main-image").src = document.getElementById("carousel-img-"+imageNumber+"").src;
        lastImageCarousel = imageNumber;
    }
}

var lastQuatitySelected = 1;

function Quantity(number) {
    document.getElementById("option-quatity-"+lastQuatitySelected+"").classList.remove("active-option");
    document.getElementById("option-quatity-"+number+"").classList.add("active-option");
    lastQuatitySelected = number;
}