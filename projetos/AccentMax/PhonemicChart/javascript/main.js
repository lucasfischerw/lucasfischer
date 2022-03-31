function PlaySound(buttonNumber) {
    var audioName = document.getElementById("button-"+buttonNumber+"").querySelector("p").innerHTML;
    var audio = new Audio("sounds/"+ audioName +".mp3");
    audio.play();
}