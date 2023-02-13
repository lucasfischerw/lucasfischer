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
    window.location.href = RedirectLink;
}

function LoadPage() {
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 500);
}

setTimeout(() => {
    document.body.style.opacity = 1;
}, 1000);

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

var SignUpOpened = false;

function SignUp() {
    document.getElementById("blur").style.filter = "blur(10px)";
    document.getElementById("sign-popup").style.transform = "translate(-50%, -50%) scale(1)";
    setTimeout(() => {
        SignUpOpened = true;
    }, 100);
}

function VerifyInput() {
    setTimeout(() => {
        if (document.getElementById("input-sign-up").value.includes("@")) {
            document.getElementById("confirm-sign-button").style.backgroundColor = "#275269"
            document.getElementById("confirm-sign-button").setAttribute("onclick", "SignUpComplete()");
        } else {
            document.getElementById("confirm-sign-button").style.backgroundColor = "#4f5254"
        }
    }, 50);
}

function SignUpComplete() {
    document.getElementById("thank-you-message").innerHTML = "Thank you for signing up!"
    document.getElementById("input-sign-up").style.display = "none";
    document.getElementById("confirm-sign-button").innerHTML = "CLOSE"
    document.getElementById("confirm-sign-button").setAttribute("onclick", "CloseSignUp()")
}

function CloseSignUp() {
    if (SignUpOpened) {
        document.getElementById("blur").style.filter = "none";
        document.getElementById("sign-popup").style.transform = "translate(-50%, -50%) scale(0)";
        SignUpOpened = false;
    }
}

function MessageContact() {
    var Error = false;
    for (let index = 0; index < document.getElementsByClassName("input-value").length; index++) {
        console.log(document.getElementsByClassName("input-value")[index].value);
        if(document.getElementsByClassName("input-value")[index].value.length < 1) {
            Error = true;
            break;
        }
    }
    if(!Error) {
        document.getElementById("blur").style.filter = "blur(10px)";
        document.getElementById("contact-popup").style.transform = "translate(-50%, -50%) scale(1)";
    } else {
        document.getElementById("error-contact").style.display = "block"
    }
}

function CloseContact() {
    document.getElementById("blur").style.filter = "none";
    document.getElementById("contact-popup").style.transform = "translate(-50%, -50%) scale(0)";
}

function RemoveAlert() {
    document.getElementById("error-contact").style.display = "none"
}