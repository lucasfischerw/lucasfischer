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

window.addEventListener("scroll", () => {
    if (window.scrollY < 20) {
        document.getElementById("upper-menu").style.height = "100px";
    } else {
        document.getElementById("upper-menu").style.height = "80px";
    }
    document.getElementById("contact").style.backgroundColor = "rgba(219, 213, 201, "+ (1-(document.getElementById("contact").getBoundingClientRect().top/window.innerHeight))+")";
    document.getElementById("gallery").style.backgroundColor = "rgba(219, 213, 201, "+ (1-(document.getElementById("contact").getBoundingClientRect().top/window.innerHeight))+")";
    document.getElementById("upper-menu").style.backgroundColor = "rgba(219, 213, 201, "+ (1-(document.getElementById("contact").getBoundingClientRect().top/window.innerHeight))+")";
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

function Load() {
    console.log(document.referrer)
    if(document.referrer.includes("about") || document.referrer.includes("contact") || document.referrer.includes("job")) {
        document.getElementById("loading").style.opacity = 1;
        document.getElementById("loading").style.display = "none";
        document.getElementById("main-section-load").style.display = "block";
        document.getElementById("main-section-load").style.opacity = "1";
        setTimeout(() => {
            document.getElementsByClassName("text-welcome")[0].style.transform = "scale(0.75)"
            document.getElementsByClassName("text-welcome")[1].style.opacity = "1"
            document.getElementsByClassName("text-welcome")[1].style.marginTop = "0"
        }, 500);
    } else {
        document.getElementById("loading").style.opacity = 1;
        setTimeout(() => {
            document.getElementById("loading").style.opacity = 0;
            setTimeout(() => {
                document.getElementById("loading").style.display = "none";
                document.getElementById("main-section-load").style.display = "block";
                setTimeout(() => {
                    document.getElementById("main-section-load").style.opacity = "1";
                    setTimeout(() => {
                        document.getElementsByClassName("text-welcome")[0].style.transform = "scale(0.75)"
                        document.getElementsByClassName("text-welcome")[1].style.opacity = "1"
                        document.getElementsByClassName("text-welcome")[1].style.marginTop = "0"
                    }, 500);
                }, 150);
            }, 1000);
        }, 1700);
    }
}

function Redirect(URl) {
    document.getElementById("main-section-load").style.opacity = "0";
    setTimeout(() => {
        location.href = URl;
    }, 800);
}