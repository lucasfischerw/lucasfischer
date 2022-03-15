function Reset() {
	document.getElementById("tarefas-button").style.backgroundColor = "transparent";
	document.getElementById("aulas-button").style.backgroundColor = "transparent";
	document.getElementById("provas-button").style.backgroundColor = "transparent";
	document.body.style.overflow = "hidden"
	setTimeout(() => {
		document.body.style.overflow = "auto"	
	}, 350);
}

function Tarefas() {
	Reset();
	document.getElementById("aulas").style.display = "none";
	document.getElementById("provas").style.display = "none";
	document.getElementById("tarefas").style.display = "flex";
	document.getElementById("tarefas-button").style.backgroundColor = "white";
}

function Aulas() {
	Reset();
	document.getElementById("provas").style.display = "none";
	document.getElementById("tarefas").style.display = "none";
	document.getElementById("aulas").style.display = "flex";
	document.getElementById("aulas-button").style.backgroundColor = "white";
}

function Provas() {
	Reset();
	document.getElementById("aulas").style.display = "none";
	document.getElementById("tarefas").style.display = "none";
	document.getElementById("provas").style.display = "flex";
	document.getElementById("provas-button").style.backgroundColor = "white";
}