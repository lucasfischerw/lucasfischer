function WriteWords(i, underlineLetter, underlineBRE, appendLocation, word, page, index) {
    underlineLetter = "";
    var wordContainer = document.createElement("div");
    wordContainer.setAttribute("class", "word-line");
    wordContainer.setAttribute("id", "word-line-"+ index +"");

    var wordWrapper = document.createElement("div");
    wordWrapper.setAttribute("class", "word-wrapper");
    wordWrapper.setAttribute("id", "word-wrapper-"+ index +"");
    
    var wordCreation = document.createElement("span");
    wordCreation.setAttribute("class", "center");
    wordCreation.innerHTML = word;

    var favoriteIcon = document.createElement("img");
    favoriteIcon.setAttribute("id", "favorite-icon-"+ index +"");
    favoriteIcon.setAttribute("onclick", "ChangeImg("+ i +", "+page+", "+index+")");
    if(localStorage.getItem("favorite-icon-"+ i +"") == 1) {
        favoriteIcon.setAttribute("src", "images/favorite-icon-active.png");
        favoriteIcon.setAttribute("class", "active");
    } else {
        favoriteIcon.setAttribute("src", "images/favorite-icon.png");
    }

    var breWrapper = document.createElement("div");
    breWrapper.setAttribute("class", "bre-wrapper");
    breWrapper.setAttribute("id", "bre-wrapper-"+ index +"");

    var breElement = document.createElement("span");
    breElement.setAttribute("class", "center");
    breElement.innerHTML = document.getElementById("specific-content-"+page+"").querySelector("#bre-wrapper-"+i+"").querySelector(".center").innerHTML;

    var speakerIconBRE = document.createElement("img");
    speakerIconBRE.setAttribute("onclick", "SpeakWord("+ index +")");
    speakerIconBRE.setAttribute("src", "images/Speaker_Icon.png");

    var translation = document.createElement("p");
    translation.setAttribute("class", "center");
    translation.innerHTML = document.getElementById("specific-content-"+page+"").querySelector("#word-line-"+i+"").querySelectorAll(".center")[2].innerHTML;
    
    document.getElementById(appendLocation).appendChild(wordContainer);
    document.getElementById("word-line-"+ index +"").appendChild(wordWrapper);
    document.getElementById("word-wrapper-"+ index +"").appendChild(favoriteIcon);
    document.getElementById("word-wrapper-"+ index +"").appendChild(wordCreation);
    document.getElementById("word-line-"+ index +"").appendChild(breWrapper);
    document.getElementById("bre-wrapper-"+ index +"").appendChild(speakerIconBRE);
    document.getElementById("bre-wrapper-"+ index +"").appendChild(breElement);
    document.getElementById("word-line-"+ index +"").appendChild(translation);
}

function OpenMenu() {
    document.getElementById("sidebar-menu").style.left = "0"
    document.getElementById("main-content").style.filter = "blur(10px)";
}

function CloseMenu() {
    document.getElementById("sidebar-menu").style.left = "-250px"
    document.getElementById("main-content").style.filter = "none";
}

var lastActiveButton = 0;

function RemoveWords(removeLocation) {
    const parent = document.getElementById(removeLocation);
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

function SelectConsonant(consonantNumber) {
    document.getElementById("button-"+lastActiveButton+"").classList.remove("letter-active");
    document.getElementById("button-"+consonantNumber+"").classList.add("letter-active");
    document.getElementById("specific-content-"+lastActiveButton+"").style.display = "none";
    document.getElementById("specific-content-"+consonantNumber+"").style.display = "flex";
    lastActiveButton = consonantNumber;
}

function SpeakWord(wordNumber) {
    let msg;
    if(!favoriteWordsVisible) {
        msg = document.getElementById("specific-content-"+lastActiveButton+"").querySelector("#word-wrapper-"+wordNumber+"").querySelector(".center").innerHTML;
    } else {
        msg = document.getElementById("favorite-words").querySelector("#word-wrapper-"+wordNumber+"").querySelector(".center").innerHTML;
    }
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-GB";       
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;    
    window.speechSynthesis.speak(speech);
}

var savedWords = [];
var savedPage = [];
var savedId = [];
var favoriteWordsVisible = false;

function ChangeImg(imgNumber, pageNumber, index) {
    if(favoriteWordsVisible) {
        document.getElementById("specific-content-"+pageNumber+"").querySelector('#words-list').querySelector('#favorite-icon-'+imgNumber+'').classList.remove("active");
        document.getElementById("specific-content-"+pageNumber+"").querySelector('#words-list').querySelector('#favorite-icon-'+imgNumber+'').src = "images/favorite-icon.png";
        document.querySelector('#append-words-favorite').querySelector('#word-line-'+index+'').remove();
    } else {
        if(document.getElementById("specific-content-"+lastActiveButton+"").querySelector("#favorite-icon-"+ imgNumber +"").classList.contains("active")) {
            document.getElementById("specific-content-"+lastActiveButton+"").querySelector("#favorite-icon-"+ imgNumber +"").src = "images/favorite-icon.png"
            document.getElementById("specific-content-"+lastActiveButton+"").querySelector("#favorite-icon-"+ imgNumber +"").classList.remove("active");
            localStorage.removeItem("favorite-icon-"+ imgNumber +"-"+pageNumber+"");
        } else {
            document.getElementById("specific-content-"+lastActiveButton+"").querySelector("#favorite-icon-"+ imgNumber +"").src = "images/favorite-icon-active.png"
            document.getElementById("specific-content-"+lastActiveButton+"").querySelector("#favorite-icon-"+ imgNumber +"").classList.add("active");
            localStorage.setItem("favorite-icon-"+ imgNumber +"-"+pageNumber+"", 1);
        }
    }
}

function ShowFavorites() {
    if(!favoriteWordsVisible) {
        document.getElementById("favorite-words").style.display = "initial";
        document.getElementById("main-content").style.filter = "blur(10px)";
        favoriteWordsVisible = true;
        savedWords = [];
        savedPage = [];
        savedId = [];
        for (let i = 0; i < document.getElementsByClassName("active").length; i++) {
            savedId.push(document.getElementsByClassName("active")[i].parentNode.parentNode.id.replace(/[^0-9]/g,''));
            savedWords.push(document.getElementsByClassName("active")[i].parentNode.querySelector(".center").innerHTML);
            savedPage.push(document.getElementsByClassName("active")[i].parentNode.parentNode.parentNode.parentNode.parentNode.id.replace(/[^0-9]/g,''));
        }
        RemoveWords("append-words-favorite");
        for (let i = 0; i < savedWords.length; i++) {
            WriteWords(savedId[i], "", false, "append-words-favorite", savedWords[i], savedPage[i], i);
        }
    } else {
        favoriteWordsVisible = false;
        RemoveWords("append-words-favorite");
        document.getElementById("favorite-words").style.display = "none";
        document.getElementById("main-content").style.filter = "none";
    }
}

function PlaySound(soundNumber) {
    var audioName = document.getElementById("specific-content-"+lastActiveButton+"").getElementsByClassName("sound-container")[soundNumber].querySelector("#letter-sound-"+soundNumber+"").innerHTML;
    var audio = new Audio("consonants_BrE/"+ audioName +".mp3");
    audio.play();
    var video = document.getElementById("specific-content-"+lastActiveButton+"").querySelector('#video');
    var source = document.getElementById("specific-content-"+lastActiveButton+"").querySelector('#source');
    if(!source.src.includes(""+ audioName +".mp4")) {
        source.setAttribute('src', "video_consonants/"+ audioName +".mp4");
        video.load();
    }
}

setTimeout(() => {
    var childs;
    var pages = document.getElementsByClassName("specific-content");
    for (let index = 0; index < pages.length; index++) {
        childs = document.getElementById("specific-content-"+index+"").querySelector("#words-list").getElementsByClassName("word-line");
        for (let i = 0; i < childs.length; i++) {
            if(localStorage.getItem("favorite-icon-"+ i +"-"+index+"") == 1) {
                document.getElementById("specific-content-"+index+"").querySelector("#favorite-icon-"+ i +"").src = "images/favorite-icon-active.png"
                document.getElementById("specific-content-"+index+"").querySelector("#favorite-icon-"+ i +"").classList.add("active");
            }
        }
    }
}, 200);