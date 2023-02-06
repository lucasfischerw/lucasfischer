var MenuIsOpen = false;

function MenuOpen() {
    if(!MenuIsOpen) {
        document.getElementsByClassName("nav-pages")[0].style.display = "flex";
        document.getElementsByClassName("social-media")[0].style.display = "none";
        setTimeout(() => {
            document.getElementsByClassName("nav-pages")[0].style.transform = "translate(0)";
            document.getElementsByClassName("nav-pages")[0].style.opacity = "1";
        }, 50);
        MenuIsOpen = true;
    } else {
        document.getElementsByClassName("nav-pages")[0].style.transform = "translate(100%)";
        document.getElementsByClassName("nav-pages")[0].style.opacity = "0";
        setTimeout(() => {
            document.getElementsByClassName("nav-pages")[0].style.display = "none";
            document.getElementsByClassName("social-media")[0].style.display = "flex";
        }, 500);
        MenuIsOpen = false;
    }
}