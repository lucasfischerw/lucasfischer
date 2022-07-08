var sidebarOpn = false;
const icnMenu = document.querySelector('.menu-icon');
icnMenu.addEventListener('click', () => {
    if(!sidebarOpn) {
        document.querySelector(".sidebar").style.right = "0";
        sidebarOpn = true;
    } else {
        document.querySelector(".sidebar").style.right = "-250px";
        sidebarOpn = false;
    }
});

window.onresize = function CloseMenu() {
    document.querySelector(".sidebar").style.right = "-250px";
    sidebarOpn = false;
}

var teste = setInterval(() => {
    document.getElementsByClassName("text-welcome")[0].style.opacity = "0"
    setTimeout(() => {
        document.getElementsByClassName("text-welcome")[0].style.display = "none"
        document.getElementsByClassName("text-welcome")[1].style.display = "block"
        setTimeout(() => {
            document.getElementsByClassName("text-welcome")[1].style.opacity = "1"
            setTimeout(() => {
                document.getElementsByClassName("text-welcome")[1].style.opacity = "0"
                setTimeout(() => {
                    document.getElementsByClassName("text-welcome")[1].style.display = "none"
                    document.getElementsByClassName("text-welcome")[2].style.display = "block"
                    setTimeout(() => {
                        document.getElementsByClassName("text-welcome")[2].style.opacity = "1"
                        setTimeout(() => {
                            document.getElementsByClassName("text-welcome")[2].style.opacity = "0"
                            setTimeout(() => {
                                document.getElementsByClassName("text-welcome")[2].style.display = "none"
                                document.getElementsByClassName("text-welcome")[0].style.display = "block"
                                setTimeout(() => {
                                    document.getElementsByClassName("text-welcome")[0].style.opacity = "1"
                                }, 20);
                            }, 850);
                        }, 850);
                    }, 20);
                }, 850);
            }, 850);
        }, 20);
    }, 850);
}, 6360);

setTimeout(() => {
    document.getElementsByClassName("text-welcome")[0].style.opacity = "0"
    setTimeout(() => {
        document.getElementsByClassName("text-welcome")[0].style.display = "none"
        document.getElementsByClassName("text-welcome")[1].style.display = "block"
        setTimeout(() => {
            document.getElementsByClassName("text-welcome")[1].style.opacity = "1"
            setTimeout(() => {
                document.getElementsByClassName("text-welcome")[1].style.opacity = "0"
                setTimeout(() => {
                    document.getElementsByClassName("text-welcome")[1].style.display = "none"
                    document.getElementsByClassName("text-welcome")[2].style.display = "block"
                    setTimeout(() => {
                        document.getElementsByClassName("text-welcome")[2].style.opacity = "1"
                        setTimeout(() => {
                            document.getElementsByClassName("text-welcome")[2].style.opacity = "0"
                            setTimeout(() => {
                                document.getElementsByClassName("text-welcome")[2].style.display = "none"
                                document.getElementsByClassName("text-welcome")[0].style.display = "block"
                                setTimeout(() => {
                                    document.getElementsByClassName("text-welcome")[0].style.opacity = "1"
                                }, 20);
                            }, 850);
                        }, 850);
                    }, 20);
                }, 850);
            }, 850);
        }, 20);
    }, 850);
}, 1260);


window.addEventListener("scroll", () => {
    if (window.scrollY < 20) {
        document.getElementById("upper-menu").style.height = "100px";
    } else {
        document.getElementById("upper-menu").style.height = "80px";
    }
});

var ImagesSlides = [["./images/slide-1.jpg", "./images/slide-2.jpg"], ["./images/slide-2.jpg", "./images/slide-1.jpg"], ["./images/slide-1.jpg", "./images/slide-2.jpg"]]
var TextSlides = [['Image', 'Selvstændige, erfarne, pålidelige repræsentanter. Vi er en ekstra del. Tænk på os, som en internt afdeling, minus udgifterne og bagagen.'], ['Løsning orienteret, Behændig, Nærvær', 'Der er ingen “account managers” her. Vi arbejder en-til-en med virksomheder, efter hvem der passer bedst til den enkelte case - tænk på os som en forlængelse af dit team.'], ['Den bedste, ikke den letteste eller ledigste', 'Vi er en “alt-erfaring-vigtigt” virksomhed, der har mange års erfaring i marketingkredse. Vores netværk af medarbejdere har arbejdet med brands, du elsker, og virksomheder, du stoler på, fra brancher som telefoni, internet, tv, forsikring, oplevelser, mærkevarer og mange flere.']]
var CurrentSlide = 1;

function Next() {
    CurrentSlide++;
    if(CurrentSlide > ImagesSlides.length) {
        CurrentSlide = 1;
    }
    document.getElementById("image-1-slides").src = ImagesSlides[CurrentSlide-1][0];
    document.getElementById("image-2-slides").src = ImagesSlides[CurrentSlide-1][1];
    document.getElementById("current-slide").innerHTML = "0"+CurrentSlide;
    document.getElementById("title-slides").innerHTML = TextSlides[CurrentSlide-1][0];
    document.getElementById("text-slides").innerHTML = TextSlides[CurrentSlide-1][1];
}

function Previous() {
    CurrentSlide--;
    if (CurrentSlide < 1) {
        CurrentSlide = ImagesSlides.length;
    }
    document.getElementById("image-1-slides").src = ImagesSlides[CurrentSlide - 1][0];
    document.getElementById("image-2-slides").src = ImagesSlides[CurrentSlide - 1][1];
    document.getElementById("current-slide").innerHTML = "0" + CurrentSlide;
    document.getElementById("title-slides").innerHTML = TextSlides[CurrentSlide - 1][0];
    document.getElementById("text-slides").innerHTML = TextSlides[CurrentSlide - 1][1];
}