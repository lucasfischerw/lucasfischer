var Sidebar_Open = false;

function OpenMenu() {
    if(!Sidebar_Open) {
        document.getElementById("sidebar").style.right = "0";
        document.getElementById("menu").style.top = "-100px";
        document.getElementById("content").style.filter = "blur(5px)";
        document.getElementById("content").style.opacity = "0.5";
        setTimeout(() => {
            document.getElementById("sidebar-options").style.marginRight = "0";
            document.getElementById("sidebar-options").style.opacity = "1";
        }, 200);
        Sidebar_Open = true;
    }
}

function CloseMenu() {
    if(Sidebar_Open) {
        document.getElementById("sidebar").style.right = "-250px";
        document.getElementById("menu").style.top = "0";
        document.getElementById("content").style.filter = "none";
        document.getElementById("content").style.opacity = "1";
        setTimeout(() => {
            document.getElementById("sidebar-options").style.marginRight = "-150px";
            document.getElementById("sidebar-options").style.opacity = ".4";
        }, 200);
        Sidebar_Open = false;
    }
}

var Arrow_Down = false;

window.addEventListener("scroll", () => {
    if(window.scrollY < 20) {
        document.getElementById("menu").style.height = "100px";
        document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
        document.getElementById("menu").style.backdropFilter = "none";  
    } else {
        document.getElementById("menu").style.height = "50px";
        document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, .2)";
        document.getElementById("menu").style.backdropFilter = "blur(5px)";
    }
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.getElementById("arrow").style.bottom = "-60px";
        Arrow_Down = true;
    } else if(Arrow_Down) {
        document.getElementById("arrow").style.bottom = "30px";
        Arrow_Down = false;
    }
    if(Sidebar_Open) {
        CloseMenu();
    }
});

location.href = "#home";
setTimeout(() => {
    document.getElementById("menu").style.top = "0";
    document.getElementById("arrow").style.bottom = "30px";
}, 4500);

const Locations = ["about", "knowledge", "projects-title", "projects", "contact"];

function Scroll(Link_Number) {
    CloseMenu();
    setTimeout(() => {
        location.href = "#"+Locations[Link_Number]+"";
    }, 500);
}
function Scroll_Arrow() {
    for(var i = 0; i < Locations.length; i++) {
        if(document.getElementById(Locations[i]).getBoundingClientRect().top > 200) {
            document.getElementById(Locations[i]).scrollIntoView({ block: 'start',  behavior: 'smooth' });
            break;
        }
    }
}