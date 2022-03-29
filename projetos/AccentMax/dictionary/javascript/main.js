function WriteWords(i, underlineLetter, underlineBRE, appendLocation) {
    underlineLetter = "";
    var wordContainer = document.createElement("div");
    wordContainer.setAttribute("class", "word-line");
    wordContainer.setAttribute("id", "word-line-"+ i +"");

    var wordWrapper = document.createElement("div");
    wordWrapper.setAttribute("class", "word-wrapper");
    wordWrapper.setAttribute("id", "word-wrapper-"+ i +"");
    
    var wordCreation = document.createElement("span");
    wordCreation.setAttribute("class", "center pointer-cursor");
    if(appendLocation != "append-words-favorite") {
        wordCreation.setAttribute("onclick", "OpenWordPopUp("+i+")");
    }
    wordCreation.innerHTML = words[i].WORDS;

    var favoriteIcon = document.createElement("img");
    favoriteIcon.setAttribute("id", "favorite-icon-"+ i +"");
    favoriteIcon.setAttribute("onclick", "ChangeImg("+ i +")");
    if(localStorage.getItem("favorite-icon-"+ i +"") == 1) {
        favoriteIcon.setAttribute("src", "images/favorite-icon-active.png");
        favoriteIcon.setAttribute("class", "active");
    } else {
        favoriteIcon.setAttribute("src", "images/favorite-icon.png");
    }

    var breWrapper = document.createElement("div");
    breWrapper.setAttribute("class", "bre-wrapper");
    breWrapper.setAttribute("id", "bre-wrapper-"+ i +"");

    var breElement = document.createElement("span");
    breElement.setAttribute("class", "center");
    breElement.innerHTML = words[i].BrE;
    breElement.innerHTML = words[i].BrE;

    var speakerIconBRE = document.createElement("img");
    speakerIconBRE.setAttribute("onclick", "SpeakWord("+ i +")");
    speakerIconBRE.setAttribute("src", "images/Speaker_Icon.png");

    var translation = document.createElement("p");
    translation.setAttribute("class", "center");
    translation.innerHTML = words[i].Translation;
    
    document.getElementById(appendLocation).appendChild(wordContainer);
    document.getElementById("word-line-"+ i +"").appendChild(wordWrapper);
    document.getElementById("word-wrapper-"+ i +"").appendChild(favoriteIcon);
    document.getElementById("word-wrapper-"+ i +"").appendChild(wordCreation);
    document.getElementById("word-line-"+ i +"").appendChild(breWrapper);
    document.getElementById("bre-wrapper-"+ i +"").appendChild(speakerIconBRE);
    document.getElementById("bre-wrapper-"+ i +"").appendChild(breElement);
    document.getElementById("word-line-"+ i +"").appendChild(translation);
}

var words = JSON.parse(JSON.stringify(data));

function LoadWords() {
    var actualPage = 0;
    for (let i = 0; i < (Math.ceil((words.length/12))-1); i++) {
        var page = document.createElement("div");
        page.setAttribute("id", "page-"+actualPage+"");
        page.setAttribute("class", "page-words");
        if(actualPage == 0) {
            page.setAttribute("class", "page-active");
        }
        document.getElementById("words-list").appendChild(page);
        for (let index = (0 + (12*actualPage)); index < (12 + (12*actualPage)); index++) {
            WriteWords(index, "", "", "page-"+actualPage+"");
        }
        actualPage++;
    }
}

var lastPage = 0;

function Next() {
    if(lastPage < (Math.ceil((words.length/12)))) {
        document.getElementById("page-"+lastPage+"").style.display = "none";
        document.getElementById("page-"+(lastPage + 1)+"").style.display = "block";
        document.getElementById("previous").style.opacity = "1";
        document.getElementById("previous").style.cursor = "pointer";
        lastPage++;
    }
    if(lastPage == (Math.ceil((words.length/12))-1)) {
        document.getElementById("next").style.opacity = "0.5";
        document.getElementById("next").style.cursor = "auto";
    }
}

function Previous() {
    if(lastPage > 0) {
        document.getElementById("page-"+lastPage+"").style.display = "none";
        document.getElementById("page-"+(lastPage - 1)+"").style.display = "block";
        document.getElementById("next").style.opacity = "1";
        document.getElementById("next").style.cursor = "pointer";
        lastPage--;
    }
    if(lastPage == 0) {
        document.getElementById("previous").style.opacity = "0.5";
        document.getElementById("previous").style.cursor = "auto";
    }
}

var MenuOpened = false;

function OpenMenu() {
    document.getElementById("sidebar-menu").style.left = "0"
    document.getElementById("main-content").style.filter = "blur(10px)";
    MenuOpened = true;
}

function CloseMenu() {
    if(MenuOpened) {
        document.getElementById("sidebar-menu").style.left = "-250px"
        document.getElementById("main-content").style.filter = "none";
        MenuOpened = false;
    }
}

var savedWords = [];

function ChangeImg(imgNumber) {
    if(document.getElementById("favorite-icon-"+ imgNumber +"").classList.contains("active")) {
        document.getElementById("favorite-icon-"+ imgNumber +"").src = "images/favorite-icon.png"
        document.getElementById("favorite-icon-"+ imgNumber +"").classList.remove("active");
        localStorage.removeItem("favorite-icon-"+ imgNumber +"");
    } else {
        document.getElementById("favorite-icon-"+ imgNumber +"").src = "images/favorite-icon-active.png"
        document.getElementById("favorite-icon-"+ imgNumber +"").classList.add("active");
        localStorage.setItem("favorite-icon-"+ imgNumber +"", 1);
    }
    if(favoriteWordsVisible) {
        document.querySelector('#words-list').querySelector('#favorite-icon-'+imgNumber+'').classList.remove("active");
        document.querySelector('#words-list').querySelector('#favorite-icon-'+imgNumber+'').src = "images/favorite-icon.png";
        document.querySelector('#append-words-favorite').querySelector('#word-line-'+imgNumber+'').remove();
    }
}

function RemoveWords(removeLocation) {
    const parent = document.getElementById(removeLocation);
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

var favoriteWordsVisible = false;

function ShowFavorites() {
    if(!favoriteWordsVisible) {
        document.getElementById("favorite-words").style.display = "initial";
        document.getElementById("main-content").style.filter = "blur(10px)";
        favoriteWordsVisible = true;
        savedWords = [];
        for (let i = 0; i < document.getElementsByClassName("active").length; i++) {
            savedWords.push(document.getElementsByClassName("active")[i].parentNode.parentNode.id.replace(/[^0-9]/g,''));
        }
        RemoveWords("append-words-favorite");
        for (let i = 0; i < savedWords.length; i++) {
            WriteWords(savedWords[i], "", false, "append-words-favorite");
        }
    } else {
        favoriteWordsVisible = false;
        RemoveWords("append-words-favorite");
        document.getElementById("favorite-words").style.display = "none";
        document.getElementById("main-content").style.filter = "none";
    }
}

function SpeakWord(wordNumber) {
    let msg = words[wordNumber].WORDS;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-GB";       
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;    
    window.speechSynthesis.speak(speech);
}

document.addEventListener("scroll", function CloseFavorites() {
    if(favoriteWordsVisible) {
        ShowFavorites();
    }
});

function OpenWordPopUp(wordNumber) {
    document.getElementById("word-popup-menu").style.display = "block";
    document.getElementById("main-content").style.filter = "blur(10px)";

    RemoveWords("append-words-popup");
    RemoveWords("append-words-popup-2");
    RemoveWords("append-words-popup-3");
    RemoveWords("append-words-popup-4");
    
    var wordContainer = document.createElement("div");
    wordContainer.setAttribute("class", "word-line");
    wordContainer.setAttribute("id", "word-line-"+ wordNumber +"");

    var wordWrapper = document.createElement("div");
    wordWrapper.setAttribute("class", "word-wrapper");
    wordWrapper.setAttribute("id", "word-wrapper-"+ wordNumber +"");
    
    var wordCreation = document.createElement("span");
    wordCreation.setAttribute("class", "center pointer-cursor");
    wordCreation.innerHTML = words[wordNumber].WORDS;

    var breWrapper = document.createElement("div");
    breWrapper.setAttribute("class", "bre-wrapper");
    breWrapper.setAttribute("id", "bre-wrapper-"+ wordNumber +"");

    var breElement = document.createElement("span");
    breElement.setAttribute("class", "center");
    breElement.innerHTML = words[wordNumber].BrE;
    breElement.innerHTML = words[wordNumber].BrE;

    var speakerIconBRE = document.createElement("img");
    speakerIconBRE.setAttribute("onclick", "SpeakWord("+ wordNumber +")");
    speakerIconBRE.setAttribute("src", "images/Speaker_Icon.png");

    var translation = document.createElement("p");
    translation.setAttribute("class", "center");
    translation.innerHTML = words[wordNumber].Translation;

    var secondContainer = document.createElement("div");
    secondContainer.setAttribute("class", "word-line");
    secondContainer.setAttribute("id", "secondContainer-line-"+ wordNumber +"");

    var PartsOfSpeech = document.createElement("div");
    PartsOfSpeech.innerHTML = words[wordNumber].PartsOfSpeech;

    var thirdContainer = document.createElement("div");
    thirdContainer.setAttribute("class", "word-line");
    thirdContainer.setAttribute("id", "thirdContainer-line-"+ wordNumber +"");

    var Synonyms = document.createElement("div");
    Synonyms.innerHTML = words[wordNumber].Synonyms;

    var fourthContainer = document.createElement("div");
    fourthContainer.setAttribute("class", "word-line");
    fourthContainer.setAttribute("id", "fourthContainer-line-"+ wordNumber +"");

    var Antonyms = document.createElement("div");
    Antonyms.innerHTML = words[wordNumber].Antonyms;
    
    document.getElementById("append-words-popup").appendChild(wordContainer);
    document.getElementById("word-line-"+ wordNumber +"").appendChild(wordWrapper);
    document.getElementById("word-wrapper-"+ wordNumber +"").appendChild(wordCreation);
    document.getElementById("word-line-"+ wordNumber +"").appendChild(breWrapper);
    document.getElementById("bre-wrapper-"+ wordNumber +"").appendChild(speakerIconBRE);
    document.getElementById("bre-wrapper-"+ wordNumber +"").appendChild(breElement);
    document.getElementById("word-line-"+ wordNumber +"").appendChild(translation);
    
    document.getElementById("append-words-popup-2").appendChild(secondContainer);
    document.getElementById("secondContainer-line-"+ wordNumber +"").appendChild(PartsOfSpeech);
    document.getElementById("append-words-popup-3").appendChild(thirdContainer);
    document.getElementById("thirdContainer-line-"+ wordNumber +"").appendChild(Synonyms);
    document.getElementById("append-words-popup-4").appendChild(fourthContainer);
    document.getElementById("fourthContainer-line-"+ wordNumber +"").appendChild(Antonyms);
}

function CloseWordPopUp() {
    document.getElementById("word-popup-menu").style.display = "none";
    document.getElementById("main-content").style.filter = "none";
}