function InputChange() {
    setTimeout(() => {
        document.getElementById("character-counter").innerHTML = document.getElementById("input").value.length + " / 2200"
        if(document.getElementById("input").value.match(/#\w+/g) != null) {
            document.getElementById("hashtag-counter").innerHTML = "# Count: " + document.getElementById("input").value.match(/#\w+/g).length;
        } else {
            document.getElementById("hashtag-counter").innerHTML = "# Count: 0";
        }
    }, 50);
}

function Clear() {
    document.getElementById("input").value = "";
    InputChange();
}

function GetSelectedText() {
    var sel = document.getElementById("input").value.substring(document.getElementById("input").selectionStart, document.getElementById("input").selectionEnd);
    console.log(sel);
}

function Copy() {
    var iframe = document.getElementById('input_ifr');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var FinalString = "";
    for (let index = 0; index < innerDoc.getElementsByTagName("p").length; index++) {
        FinalString += innerDoc.getElementsByTagName("p")[index].textContent + "\n";
    }
    navigator.clipboard.writeText(FinalString);
    document.getElementById("advice-copy").classList.add("advice-animate");
    setTimeout(() => {
        document.getElementById("advice-copy").classList.remove("advice-animate"); 
    }, 3500);
}