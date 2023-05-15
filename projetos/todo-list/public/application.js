document.getElementById("close-task-details-btn").onclick = () => {
    document.getElementById("signed-in").style.filter = "none"
    document.getElementById("task-details-overlay").style.display = "none";
    document.getElementById("task-details-overlay-title").innerHTML = ""
    document.getElementById("task-details-overlay-date").innerHTML = ""
    document.getElementById("task-details-overlay-text").innerHTML = ""
}

document.getElementById("new-task-name").onkeydown = () => {
    if (document.getElementById("new-task-name").value != "") {
        document.getElementById("new-task-name").style.border = "2px #212121 solid"
        document.getElementById("new-task-name").style.backgroundColor = "#212121"
    }
}