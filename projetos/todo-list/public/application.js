document.getElementById("details-overlay").onclick = () => {
    document.getElementById("signed-in").style.filter = "none"
    document.getElementById("task-edit-overlay").style.display = "none"
    document.getElementById("task-details-overlay").style.display = "none";
    document.getElementById("task-details-overlay-title").innerHTML = ""
    document.getElementById("task-details-overlay-date").innerHTML = ""
    document.getElementById("task-details-overlay-text").innerHTML = ""
    setTimeout(() => {
        document.getElementById("details-overlay").style.display = "none"
    }, 500);
}

document.getElementById("close-task-edit-btn").onclick = () => {
    document.getElementById("task-edit-overlay").style.display = "none"
    document.getElementById("signed-in").style.filter = "none"
    document.getElementById("details-overlay").style.display = "none"
}

document.getElementById("close-task-details-btn").onclick = () => {
    document.getElementById("details-overlay").style.display = "none"
    document.getElementById("signed-in").style.filter = "none"
    document.getElementById("task-details-overlay").style.display = "none";
    document.getElementById("task-details-overlay-title").innerHTML = ""
    document.getElementById("task-details-overlay-date").innerHTML = ""
    document.getElementById("task-details-overlay-text").innerHTML = ""
    setTimeout(() => {
        document.getElementById("details-overlay").style.display = "none"
    }, 500);
}

document.getElementById("new-task-name").onkeydown = () => {
    if (document.getElementById("new-task-name").value != "") {
        document.getElementById("new-task-name").style.border = "2px #212121 solid"
        document.getElementById("new-task-name").style.backgroundColor = "#212121"
    }
}

document.getElementById("add-task").onclick = () => {
    if (!document.getElementById("add-task").classList.value.includes("show")) {
        document.getElementById("new-task-date").valueAsDate = new Date();
        document.getElementById("add-task").classList.add("show");
    }
}

document.getElementById("close-task-menu-btn").onclick = () => {
    setTimeout(() => {
        document.getElementById("add-task").classList.remove("show");
    }, 50);
}