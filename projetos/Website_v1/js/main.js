function StartAnimation() {
    document.getElementsByClassName("title-page")[0].style.transition = "all 1s ease";
    document.getElementsByClassName("title-page")[0].style.top = "15px";
    document.getElementsByClassName("title-page")[0].style.left = "15px";
    document.getElementsByClassName("title-page")[0].style.transform = "translate(0, 0)";
    document.getElementsByClassName("h1-title")[0].style.transition = "font-size 1s ease";
    document.getElementsByClassName("h1-title")[0].style.fontSize = "52.5px";
    document.getElementsByClassName("animate-title")[0].style.animation = "Alias-Animation 1s ease forwards";
    document.getElementsByClassName("image-container")[0].style.animation = "Img-Container-Animation 1s ease forwards";
    for (let index = 0; index < document.getElementsByClassName("animate-img").length; index++) {
        document.getElementsByClassName("animate-img")[index].style.animation = "Img-Animation 1s ease forwards";        
    }
    document.getElementsByClassName("arrow")[0].style.opacity = "0";
}

function Redirect(RedirectLink) {
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = RedirectLink;
    }, 600);
}

var PopUpOpened = false;

function PopUp(Input) {
    if (Input == 1 && PopUpOpened) {
        document.getElementById("blur").style.filter = "none";
        document.getElementById("download-popup").style.transform = "translate(-50%, -50%) scale(0)";
        setTimeout(() => {
            PopUpOpened = false;
        }, 300);
    } else if(Input == 2) {
        document.getElementById("blur").style.filter = "blur(10px)";
        document.getElementById("download-popup").style.transform = "translate(-50%, -50%) scale(1)";
        setTimeout(() => {
            PopUpOpened = true;
        }, 300);
    }
}