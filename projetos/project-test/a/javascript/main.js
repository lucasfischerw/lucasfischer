var words = JSON.parse(data);

var doesNotContain = [
    ["ea", "ee", "ei", "ie"],
    ["e", "ee", "ey"],
    [],
    ["ea"],
    ["er", "ia", "ie", "ure"],
    ["oa", "or", "ou"],
    ["ea", "ei", "ey"],
    ["ear"],
    [],
    [],
    []
];

var graphAndDigraphs = [
    ["ae"],
    ["a", "ai"],
    ["æ"],
    ["a"],
    ["a", "ar"],
    ["a", "al", "ao", "ar", "au", "aw"],
    ["a", "ai", "aigh", "ay"],
    ["a", "ai", "air", "are", "ayo"],
    ["eɪə"],
    ["ao"],
    ["ia"]
];

var verifyBRE = ["æ", "eɪə"]

function WriteWords(i, underlineLetter, underlineBRE) {
    var wordContainer = document.createElement("div");
    wordContainer.setAttribute("class", "word-line");
    wordContainer.setAttribute("id", "word-line-"+ i +"");

    var wordWrapper = document.createElement("div");
    wordWrapper.setAttribute("class", "word-wrapper");
    wordWrapper.setAttribute("id", "word-wrapper-"+ i +"");
    
    var wordCreation = document.createElement("span");
    wordCreation.setAttribute("class", "center");
    var splitWord = words[i].Word.split(underlineLetter, 2);
    if(underlineLetter == "" || underlineBRE) {
        wordCreation.innerHTML = words[i].Word;
    } else if(splitWord[0] == "") {
        wordCreation.innerHTML = "<p class='underline-part'>"+ underlineLetter +"</p>" + splitWord[1];
    } else {
        wordCreation.innerHTML = splitWord[0] + "<p class='underline-part'>"+ underlineLetter +"</p>" + splitWord[1];
    }

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
    var splitBRE = words[i].BrE.split(underlineLetter, 2);
    if(underlineLetter == "" || !underlineBRE) {
        breElement.innerHTML = words[i].BrE;
    } else if(splitBRE[0] == "") {
        breElement.innerHTML = "<p class='underline-part'>"+ underlineLetter +"</p>" + splitBRE[1];
    } else {
        breElement.innerHTML = splitBRE[0] + "<p class='underline-part'>"+ underlineLetter +"</p>" + splitBRE[1];
    }

    var speakerIconBRE = document.createElement("img");
    speakerIconBRE.setAttribute("onclick", "SpeakWord("+ i +")");
    speakerIconBRE.setAttribute("src", "images/Speaker_Icon.png");

    var translation = document.createElement("p");
    translation.setAttribute("class", "center");
    translation.innerHTML = words[i].ROMANIAN;
    
    document.getElementById("words-list").appendChild(wordContainer);
    document.getElementById("word-line-"+ i +"").appendChild(wordWrapper);
    document.getElementById("word-wrapper-"+ i +"").appendChild(favoriteIcon);
    document.getElementById("word-wrapper-"+ i +"").appendChild(wordCreation);
    document.getElementById("word-line-"+ i +"").appendChild(breWrapper);
    document.getElementById("bre-wrapper-"+ i +"").appendChild(speakerIconBRE);
    document.getElementById("bre-wrapper-"+ i +"").appendChild(breElement);
    document.getElementById("word-line-"+ i +"").appendChild(translation);
}

function LoadWords() {
    for (let i = 0; i < words.length; i++) {
        if(words[i].Word.includes("a")) {
            WriteWords(i, "", false);
        }
    }
}

function RemoveWords() {
    const parent = document.getElementById("words-list");
    while (parent.firstChild) {
        parent.firstChild.remove()
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

var lastAudioPlayed = 0;

function PlaySound(soundNumber) {
    var audio = new Audio("content/a/sounds/"+ (soundNumber+1) +".mp3");
    audio.play();
    UpdateWords(soundNumber);
}

var favoriteWordsVisible = false;

function UpdateWords(soundNumber) {
    favoriteWordsVisible = false;
    document.getElementById("letter-"+ lastAudioPlayed +"").style.backgroundColor = "transparent";
    document.getElementById("letter-"+ soundNumber +"").style.backgroundColor = "#811394";
    lastAudioPlayed = soundNumber;
    const parent = document.getElementById("graph");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
    const parent2 = document.getElementById("digraph");
    while (parent2.firstChild) {
        parent2.firstChild.remove();
    }
    document.getElementById("graph-title").style.display = "none";
    document.getElementById("digraph-title").style.display = "none";
    if(graphAndDigraphs[soundNumber].length > 0) {
        for (let i = 0; i < graphAndDigraphs[soundNumber].length; i++) {
            var word = document.createElement("p");
            word.setAttribute("class", "underline");
            word.innerHTML = graphAndDigraphs[soundNumber][i];
            if(graphAndDigraphs[soundNumber][i].length < 2) {
                document.getElementById("graph-title").style.display = "block";
                document.getElementById("graph").appendChild(word);
            } else {
                document.getElementById("digraph-title").style.display = "block";
                document.getElementById("digraph").appendChild(word);
            }
        }
    }
    document.getElementById("favorite-text").innerHTML = "Show Favorite Words";
    document.getElementById("favorite-icon-button").src = "images/favorite-icon-active.png";
    RemoveWords();
    var printWord = true;
    var savedLetterToUnderline = "";
    var specialWord = false;
    for (let index = 0; index < words.length; index++) {
        if(words[index].Word.includes("a")) {
            if(doesNotContain[soundNumber].length > 0) {
                for (let i = 0; i < doesNotContain[soundNumber].length; i++) {
                    if(words[index].Word.includes(doesNotContain[soundNumber][i])) {
                        printWord = false;
                        break;
                    } else {
                        printWord = true;
                    }
                }
            } else {
                printWord = true;
            }
            if(printWord) {
                for (let i = 0; i < graphAndDigraphs[soundNumber].length; i++) {
                    if(words[index].Word.includes(graphAndDigraphs[soundNumber][i]) || ((graphAndDigraphs[soundNumber][i] == verifyBRE[0] || graphAndDigraphs[soundNumber][i] == verifyBRE[2]) && words[index].BrE.includes(graphAndDigraphs[soundNumber][i]))) {
                        printWord = true;
                        savedLetterToUnderline = graphAndDigraphs[soundNumber][i];
                        if((graphAndDigraphs[soundNumber][i] == verifyBRE[0] || graphAndDigraphs[soundNumber][i] == verifyBRE[2]) && words[index].BrE.includes(graphAndDigraphs[soundNumber][i])) {
                            specialWord = true;
                        } else {
                            specialWord = false;
                        }
                        break;
                    } else {
                        printWord = false;
                    }
                }
            }
        } else {
            printWord = false;
        }
        if(printWord) {
            WriteWords(index, savedLetterToUnderline, specialWord);
        }
    }
}

function SpeakWord(wordNumber) {
    let msg = words[wordNumber].Word;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-GB";       
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;    
    window.speechSynthesis.speak(speech);
}

var savedWords = [];

function ShowFavorites() {
    if(!favoriteWordsVisible) {
        favoriteWordsVisible = true;
        savedWords = [];
        for (let i = 0; i < document.getElementsByClassName("active").length; i++) {
            savedWords.push(document.getElementsByClassName("active")[i].parentNode.parentNode.id.replace(/[^0-9]/g,''));
        }
        RemoveWords();
        for (let i = 0; i < savedWords.length; i++) {
            WriteWords(savedWords[i], "", false);
        }
        document.getElementById("favorite-text").innerHTML = "Show All Words";
        document.getElementById("favorite-icon-button").src = "images/favorite-icon.png";
    } else {
        favoriteWordsVisible = false;
        RemoveWords();
        LoadWords();
        document.getElementById("favorite-text").innerHTML = "Show Favorite Words";
        document.getElementById("favorite-icon-button").src = "images/favorite-icon-active.png";
    }
}

function parseURLParams() {
    var url = window.location.href;
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    console.log(parms)
    return parms;
}

function LoadPage() {
    try {
        var soundLoaded = parseURLParams().sound[0];
        UpdateWords(soundLoaded);
    } catch {
        LoadWords();
    }
}