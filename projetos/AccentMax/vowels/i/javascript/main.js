var words = JSON.parse(data);
var sortingLetter = "i";
var vowels = ["A", "E", "I", "O", "U", "Y"];
var graphsInformation = JSON.parse(information);

function WriteWords(i, underlineLetter, underlineBRE, appendLocation) {
    underlineLetter = "";
    var wordContainer = document.createElement("div");
    wordContainer.setAttribute("class", "word-line");
    wordContainer.setAttribute("id", "word-line-"+ i +"");

    var wordWrapper = document.createElement("div");
    wordWrapper.setAttribute("class", "word-wrapper");
    wordWrapper.setAttribute("id", "word-wrapper-"+ i +"");
    
    var wordCreation = document.createElement("span");
    wordCreation.setAttribute("class", "center");
    var splitWord = words[i].Word.split(underlineLetter);
    if(underlineLetter == "") {
        wordCreation.innerHTML = words[i].Word;
    } else if(splitWord[0] == "") {
        wordCreation.innerHTML = "<p class='underline-part'>" + underlineLetter + "</p>" + words[i].Word.slice(1);
    } else {
        var string = "";
        var underlined = false;
        for (let i = 0; i < splitWord.length; i++) {
            if(splitWord[i] == "") {
                if(!underlined) {
                    underlined = true;
                    string += "<p class='underline-part'>"+ underlineLetter +"</p>";
                }
            } else {
                string += splitWord[i];
            }
            if(!underlined) {
                underlined = true;
                string += "<p class='underline-part'>"+ underlineLetter +"</p>";
            } else if(i < splitWord.length-1) {
                string += underlineLetter;
            }
        }
        wordCreation.innerHTML = string;
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
    var splitBRE = words[i].BrE.split(underlineBRE, 2);
    if(underlineBRE == "") {
        breElement.innerHTML = words[i].BrE;
    } else if(splitBRE[0] == "") {
        breElement.innerHTML = "<p class='underline-part'>" + underlineBRE + "</p>" + words[i].BrE.slice(1);
    } else {
        var string = "";
        var underlined = false;
        for (let i = 0; i < splitBRE.length; i++) {
            if(splitBRE[i] == "") {
                if(!underlined) {
                    underlined = true;
                    string += "<p class='underline-part'>"+ underlineBRE +"</p>";
                }
            } else {
                string += splitBRE[i];
            }
            if(!underlined) {
                underlined = true;
                string += "<p class='underline-part'>"+ underlineBRE +"</p>";
            } else if(i < splitBRE.length-1) {
                string += underlineBRE;
            }
        }
        breElement.innerHTML = string;
    }

    var speakerIconBRE = document.createElement("img");
    speakerIconBRE.setAttribute("onclick", "SpeakWord("+ i +")");
    speakerIconBRE.setAttribute("src", "images/Speaker_Icon.png");

    var translation = document.createElement("p");
    translation.setAttribute("class", "center");
    translation.innerHTML = words[i].ROMANIAN;
    
    document.getElementById(appendLocation).appendChild(wordContainer);
    document.getElementById("word-line-"+ i +"").appendChild(wordWrapper);
    document.getElementById("word-wrapper-"+ i +"").appendChild(favoriteIcon);
    document.getElementById("word-wrapper-"+ i +"").appendChild(wordCreation);
    document.getElementById("word-line-"+ i +"").appendChild(breWrapper);
    document.getElementById("bre-wrapper-"+ i +"").appendChild(speakerIconBRE);
    document.getElementById("bre-wrapper-"+ i +"").appendChild(breElement);
    document.getElementById("word-line-"+ i +"").appendChild(translation);
}

function RemoveWords(removeLocation) {
    const parent = document.getElementById(removeLocation);
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

var lastAudioPlayed = -1;

function LoadWords() {
    for (let i = 0; i < words.length; i++) {
        if(words[i].Word.includes(sortingLetter)) {
            WriteWords(i, "", "", "words-list");
        }
    }
}

function UpdateWords(buttonNumber) {
    favoriteWordsVisible = false;
    if(lastAudioPlayed != -1) {
        document.getElementById("letter-" + lastAudioPlayed + "").style.backgroundColor = "transparent";
    }
    document.getElementById("letter-" + buttonNumber + "").style.backgroundColor = "#811394";
    lastAudioPlayed = buttonNumber;
    const parent = document.getElementById("graph");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
    const parent2 = document.getElementById("digraph");
    while (parent2.firstChild) {
        parent2.firstChild.remove();
    }

    var video = document.getElementById('video');
    var source = document.getElementById('source');
    source.setAttribute('src', "../videos/"+ (parseInt(buttonNumber)+1) +".mp4");
    video.load();
    video.play();
    document.getElementById("graph-title").style.display = "none";
    document.getElementById("digraph-title").style.display = "none";
    for (let i = 0; i < graphsInformation.length; i++) {
        if(graphsInformation[i].sounds == document.getElementById("letter-value-"+buttonNumber+"").innerHTML) {
            var array = graphsInformation[i].graphs.split(",");
            for (let index = 0; index < array.length; index++) {
                var word = document.createElement("p");
                word.setAttribute("class", "underline");
                word.innerHTML = array[index];
                if(array[index].length < 2) {
                    document.getElementById("graph-title").style.display = "block";
                    document.getElementById("graph-title").setAttribute("data-content", "In linguistics, a grapheme is the smallest unit of a writing system of any given language.[1] An individual grapheme may or may not carry meaning by itself, and may or may not correspond to a single phoneme of the spoken language.")
                    document.getElementById("graph").appendChild(word);
                } else {
                    document.getElementById("digraph-title").style.display = "block";
                    document.getElementById("digraph-title").setAttribute("data-content", 'A digraph or digram (from the Greek: δίς dís, "double" and γράφω gráphō, "to write") is a pair of characters used in the orthography of a language to write either a single phoneme (distinct sound), or a sequence of phonemes that does not correspond to the normal values of the two characters combined.')
                    document.getElementById("digraph").appendChild(word);
                }
            }
        }
    }
    RemoveWords("words-list");
    for (let mainIndex = 0; mainIndex < words.length; mainIndex++) {
        var reBrackets = /\((.*?)\)/g;
        var listOfText = [];
        var found;
        while(found = reBrackets.exec(words[mainIndex].Sound)) {
            listOfText.push(found[1]);
        };
        var finalArray = [];
        var lettersArray = [];
        for (let i = 0; i < listOfText.length; i++) {
            finalArray.push(listOfText[i].split(','))
        }
        if(words[mainIndex].Sound != undefined) {
            for (let i = 0; i < words[mainIndex].Sound.length; i++) {
                for (let index = 0; index < vowels.length; index++) {
                    if(words[mainIndex].Sound.charAt(i) == vowels[index]) {
                        lettersArray.push(words[mainIndex].Sound.charAt(i));
                    }
                }
            }
            var sortedArray;
            for (let i = 0; i < lettersArray.length; i++) {
                if(lettersArray.includes(sortingLetter.toUpperCase())) {
                    sortedArray = finalArray[lettersArray.indexOf(sortingLetter.toUpperCase())];
                } else {
                    sortedArray = [];
                }
            }
            for (let i = 0; i < sortedArray.length; i++) {
                if(document.getElementById("letter-value-"+buttonNumber+"").innerHTML == sortedArray[i] || (document.getElementById("letter-value-"+buttonNumber+"").innerHTML == "∅" && sortedArray[i] == "mute")) {
                    WriteWords(mainIndex, sortingLetter, sortedArray[i], "words-list");
                    break;
                }
            }
        }
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
    return parms;
}

function LoadPage() {
    if(parseURLParams() != undefined) {
        var soundLoaded = parseURLParams().sound[0];
        UpdateWords(soundLoaded);
    } else {
        LoadWords();
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
    if(favoriteWordsVisible) {
        document.querySelector('#words-list').querySelector('#favorite-icon-'+imgNumber+'').classList.remove("active");
        document.querySelector('#words-list').querySelector('#favorite-icon-'+imgNumber+'').src = "images/favorite-icon.png";
        document.querySelector('#append-words-favorite').querySelector('#word-line-'+imgNumber+'').remove();
    }
}

var savedWords = [];
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

function PlaySound(soundNumber) {
    var audio = new Audio("../sounds/"+ (soundNumber+1) +".mp3");
    audio.play();
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


function OpenMenu() {
    document.getElementById("sidebar-menu").style.left = "0"
    document.getElementById("main-content").style.filter = "blur(10px)";
}

function CloseMenu() {
    document.getElementById("sidebar-menu").style.left = "-250px"
    document.getElementById("main-content").style.filter = "none";
}