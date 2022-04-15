//Add saving function when button is clicked
for(var i = 0; i < document.getElementsByTagName("input").length; i++) {
    document.getElementsByTagName("input")[i].setAttribute("onchange", "Change()");
}

//Function that saves the current value
var savedIDS = ["dd", "vegas", "blue", "dark"];
function Change() {
    setTimeout(() => {
        //Remove previous saved value
        for (let i = 0; i < savedIDS.length; i++) {
            localStorage.removeItem(savedIDS[i]);
        }
        //Save current value
        for (let i = 0; i < savedIDS.length; i++) {
            if(document.getElementById(savedIDS[i]).checked) {
                localStorage.setItem(savedIDS[i], 1);
                break;
            }
        }
    }, 100);
}

//Load default value saved in storage
for (let i = 0; i < localStorage.length; i++) {
    for (let index = 0; index < savedIDS.length; index++) {
        if(Object.keys(localStorage)[i] == savedIDS[index]) {
            document.getElementById(Object.keys(localStorage)[i]).checked = "true";
            break;
        }
    }
}