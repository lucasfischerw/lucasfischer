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
    stringInUse = stringInUse.slice(0, -1);
    UpdateDisplay();
}

function ClickedNumber(number) {
    if(stringInUse.length < 25) {
        console.log(showingResult);
        if(showingResult) {
            stringInUse = "";
            UpdateUpperDisplay();
        }
        if(number != '.' || (number == '.' && !stringInUse.includes("."))) {
            stringInUse += number.toString();
        }
        UpdateDisplay();
    }
}

function Operation(operationSignal) {
    showingResult = false;
    stringInUse += " "+operationSignal+"";
    UpdateUpperDisplay();
}

function Result() {
    stringInUse = document.getElementById("previous-result").innerHTML + " " + stringInUse;
    document.getElementById("actual-number").innerHTML = eval(stringInUse);
    document.getElementById("previous-result").innerHTML = stringInUse;
    stringInUse = eval(stringInUse);
    showingResult = true;
}