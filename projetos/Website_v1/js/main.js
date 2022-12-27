function StartAnimation() {
    document.getElementsByClassName("title-page")[0].style.animation = "AnimationTitle 1s ease forwards";
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