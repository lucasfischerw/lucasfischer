
function Tarefas() {
	document.getElementById("aulas").style.display = "none";
	document.getElementById("provas").style.display = "none";
	document.getElementById("tarefas").style.display = "flex";
}

function Aulas() {
	document.getElementById("provas").style.display = "none";
	document.getElementById("tarefas").style.display = "none";
	document.getElementById("aulas").style.display = "block";
}

function Provas() {
	document.getElementById("aulas").style.display = "none";
	document.getElementById("tarefas").style.display = "none";
	document.getElementById("provas").style.display = "block";
}