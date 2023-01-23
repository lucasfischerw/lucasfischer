var stringInUse = "";
var showingResult = false;

function UpdateDisplay() {
    if(stringInUse != "") {
        document.getElementById("actual-number").innerHTML = stringInUse;
    } else {
        document.getElementById("actual-number").innerHTML = "0";
    }
}

function UpdateUpperDisplay() {
    document.getElementById("previous-result").innerHTML = stringInUse;
    stringInUse = "";
    UpdateDisplay();
}

function Delete() {
    if(showingResult) {
        document.getElementById("previous-result").innerHTML = "";
        stringInUse = document.getElementById("actual-number").innerHTML.toString();
        showingResult = false;
    }
    stringInUse = stringInUse.slice(0, -1);
    UpdateDisplay();
}

function ClickedNumber(number) {
    if(showingResult) {
        showingResult = false;
        stringInUse = "";
        UpdateUpperDisplay();
    }
    if(stringInUse.length < 25) {
        if(number != '.' || (number == '.' && !stringInUse.includes("."))) {
            stringInUse += number.toString();
        }
        UpdateDisplay();
    }
}

function Operation(operationSignal) {
    if(stringInUse != "") {
        if(document.getElementById("previous-result").innerHTML.toString() != '') {
            Result();
        }
        showingResult = false;
        stringInUse += " "+operationSignal+"";
        UpdateUpperDisplay();
    }
}

function Result() {
    if(stringInUse != '' && !showingResult) {
        stringInUse = document.getElementById("previous-result").innerHTML + " " + stringInUse;
        document.getElementById("actual-number").innerHTML = eval(stringInUse);
        document.getElementById("previous-result").innerHTML = stringInUse;
        stringInUse = eval(stringInUse);
        showingResult = true;
    }
}

function ChangeSign() {
    if(!showingResult) {
        if(stringInUse.substring(0, 1) == "-") {
            stringInUse = stringInUse.slice(1);
        } else {
            stringInUse = "-" + stringInUse;
        }
        UpdateDisplay();
    }
}

function Clear(InputType) {
    if(InputType == 1) {
        document.getElementById("previous-result").innerHTML = "";
    }
    stringInUse = "";
    UpdateDisplay();
}