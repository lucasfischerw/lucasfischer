function InputChange() {
    setTimeout(() => {
        var iframe = document.getElementById('input_ifr');
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var lengthString = "";
        for (let index = 0; index < innerDoc.getElementsByTagName("p").length; index++) {
            lengthString += innerDoc.getElementsByTagName("p")[index].textContent + "\n";
        }
        document.getElementById("character-counter").innerHTML = lengthString.length + " / 2200"
        if(lengthString.match(/#\w+/g) != null) {
            document.getElementById("hashtag-counter").innerHTML = "# Count: " + lengthString.match(/#\w+/g).length;
        } else {
            document.getElementById("hashtag-counter").innerHTML = "# Count: 0";
        }
    }, 50);
}

function Clear() {
    var iframe = document.getElementById('input_ifr');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    innerDoc.getElementById("tinymce").innerHTML = "";
    InputChange();
}

var SelectionArray;

function GetSelectedText() {
    var iframe = document.getElementById('input_ifr');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    const selection = innerDoc.getSelection().toString();
    SelectionArray = selection.split("\n");
    let parent = selection.anchorNode;
    while(parent != null && parent.nodeName != "p") {
        parent = parent.parentNode;
    };
    return selection.split("\n");
}

function Bold() {
    var iframe = document.getElementById('input_ifr');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    for (let index = 0; index < GetSelectedText().length; index++) {
        console.log(conv.bold(GetSelectedText()[index])); 
    }
    console.log(SelectionArray);
    var Teste = [];
    for (let index = 0; index < innerDoc.getElementsByTagName("p").length; index++) {
        Teste.push(innerDoc.getElementsByTagName("p")[index].textContent);
    }
    console.log(Teste);
    getSelectionParentElement();
}

function Italic() {
    var iframe = document.getElementById('input_ifr');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    for (let index = 0; index < GetSelectedText().length; index++) {
        console.log(conv.italic(GetSelectedText()[index])); 
    }
    console.log(SelectionArray);
    var Teste = [];
    for (let index = 0; index < innerDoc.getElementsByTagName("p").length; index++) {
        Teste.push(innerDoc.getElementsByTagName("p")[index].textContent);
    }
    console.log(Teste);
    console.log(Teste.slice(Teste[0].indexOf(SelectionArray[0]), SelectionArray[0].length))
    if (innerDoc.getSelection) {
        sel = innerDoc.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    if(parentEl.tagName != "P") {
        return "";
    } else {
        parentEl.innerHTML = conv.italic(GetSelectedText()[0]);
        return parentEl;
    }
}

function extractword(str, start, end){
    var startindex = str.indexOf(start);
    var endindex = str.indexOf(end, startindex);
    if (startindex !=-1 && endindex !=-1 &&  endindex  > startindex )
      return str.substring(startindex , endindex )
}

function getSelectionParentElement() {
    var iframe = document.getElementById('input_ifr');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var parentEl = null, sel;
    if (innerDoc.getSelection) {
        sel = innerDoc.getSelection();
        if (sel.rangeCount) {
            parentEl = sel.getRangeAt(0).commonAncestorContainer;
            if (parentEl.nodeType != 1) {
                parentEl = parentEl.parentNode;
            }
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement();
    }
    if(parentEl.tagName != "P") {
        return "";
    } else {
        parentEl.innerHTML = conv.bold(GetSelectedText()[0]);
        return parentEl;
    }
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

const conv = {
    c: function (text, obj) {
      return text.replace(
        new RegExp(`[${obj.reduce((s, { r }) => (s += r), "")}]`, "g"),
        (e) => {
          const t = e.codePointAt(0);
          if (
            (t >= 48 && t <= 57) ||
            (t >= 65 && t <= 90) ||
            (t >= 97 && t <= 122)
          ) {
            return obj.reduce((s, { r, d }) => {
              if (new RegExp(`[${r}]`).test(e))
                s = String.fromCodePoint(e.codePointAt(0) + d);
              return s;
            }, "");
          }
          return e;
        }
      );
    },
    bold: function (text) {
      return this.c(text, [
        { r: "0-9", d: 120734 },
        { r: "A-Z", d: 120211 },
        { r: "a-z", d: 120205 },
      ]);
    },
    italic: function (text) {
      return this.c(text, [
        { r: "A-Z", d: 120263 },
        { r: "a-z", d: 120257 },
      ]);
    },
};


setTimeout(() => {
    var iframe = document.getElementById('input_ifr');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    innerDoc.addEventListener("keydown", InputChange);
}, 200);