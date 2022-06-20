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
        document.getElementsByClassName("text-welcome")[1].style.opacity = "1"
        setTimeout(() => {
            document.getElementsByClassName("text-welcome")[1].style.opacity = "0"
            setTimeout(() => {
                document.getElementsByClassName("text-welcome")[1].style.display = "none"
                document.getElementsByClassName("text-welcome")[2].style.display = "block"
                document.getElementsByClassName("text-welcome")[2].style.opacity = "1"
                setTimeout(() => {
                    document.getElementsByClassName("text-welcome")[2].style.opacity = "0"
                    setTimeout(() => {
                        document.getElementsByClassName("text-welcome")[2].style.display = "none"
                        document.getElementsByClassName("text-welcome")[0].style.display = "block"
                        document.getElementsByClassName("text-welcome")[0].style.opacity = "1"
                    }, 850);
                }, 850);
            }, 850);
        }, 850);
    }, 850);
}, 6300);

setTimeout(() => {
    document.getElementsByClassName("text-welcome")[0].style.opacity = "0"
    setTimeout(() => {
        document.getElementsByClassName("text-welcome")[0].style.display = "none"
        document.getElementsByClassName("text-welcome")[1].style.display = "block"
        document.getElementsByClassName("text-welcome")[1].style.opacity = "1"
        setTimeout(() => {
            document.getElementsByClassName("text-welcome")[1].style.opacity = "0"
            setTimeout(() => {
                document.getElementsByClassName("text-welcome")[1].style.display = "none"
                document.getElementsByClassName("text-welcome")[2].style.display = "block"
                document.getElementsByClassName("text-welcome")[2].style.opacity = "1"
                setTimeout(() => {
                    document.getElementsByClassName("text-welcome")[2].style.opacity = "0"
                    setTimeout(() => {
                        document.getElementsByClassName("text-welcome")[2].style.display = "none"
                        document.getElementsByClassName("text-welcome")[0].style.display = "block"
                        document.getElementsByClassName("text-welcome")[0].style.opacity = "1"
                    }, 850);
                }, 850);
            }, 850);
        }, 850);
    }, 850);
}, 1200);