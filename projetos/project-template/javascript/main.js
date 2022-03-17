var words = JSON.parse(data);

function LoadWords() {
    for (let i = 0; i < words.length; i++) {
        if(words[i].Word.includes("a")) {
            var wordContainer = document.createElement("div");
            wordContainer.setAttribute("class", "word-line");
            wordContainer.setAttribute("id", "word-line-"+ i +"");

            var wordWrapper = document.createElement("div");
            wordWrapper.setAttribute("class", "word-wrapper");
            wordWrapper.setAttribute("id", "word-wrapper-"+ i +"");
            
            var wordCreation = document.createElement("p");
            wordCreation.setAttribute("class", "center");
            wordCreation.innerHTML = words[i].Word;

            var favoriteIcon = document.createElement("img");
            favoriteIcon.setAttribute("id", "favorite-icon-"+ i +"");
            favoriteIcon.setAttribute("onclick", "ChangeImg("+ i +")");
            if(localStorage.getItem("favorite-icon-"+ i +"") == 1) {
                favoriteIcon.setAttribute("src", "images/favorite-icon-active.png");
                favoriteIcon.setAttribute("class", "active");
            } else {
                favoriteIcon.setAttribute("src", "images/favorite-icon.png");
            }

            var breElement = document.createElement("p");
            breElement.setAttribute("class", "center");
            breElement.innerHTML = words[i].BrE;

            var translation = document.createElement("p");
            translation.setAttribute("class", "center");
            translation.innerHTML = words[i].ROMANIAN;
            
            document.getElementById("words-list").appendChild(wordContainer);
            document.getElementById("word-line-"+ i +"").appendChild(wordWrapper);
            document.getElementById("word-wrapper-"+ i +"").appendChild(favoriteIcon);
            document.getElementById("word-wrapper-"+ i +"").appendChild(wordCreation);
            document.getElementById("word-line-"+ i +"").appendChild(breElement);
            document.getElementById("word-line-"+ i +"").appendChild(translation);
        }
    }
}

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
}

// Store data
var someData = 'The data that I want to store for later.';
localStorage.setItem('myDataKey', someData);

// Get data
var data = localStorage.getItem('myDataKey');

// Remove data
localStorage.removeItem('myDatakey');

function PlaySound(soundNumber) {
    var audio = new Audio("../content/a/sounds/"+ (soundNumber+1) +".mp3");
    audio.play();
    UpdateWords(soundNumber);
}

function UpdateWords() {
    for (let i = 0; i < words.length; i++) {
        if(words[i].Word.startsWith("a")) {
            console.log(words[i].Word);
        }
    }
}