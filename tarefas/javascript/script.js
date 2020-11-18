function tarefas() {
	document.getElementById('tarefas').style.display = "inherit"
	document.getElementById('primeiro').style.backgroundColor = "white"
	document.getElementById('segundo').style.backgroundColor = "inherit"
	document.getElementById('terceiro').style.backgroundColor = "inherit"
	document.getElementById('aulas').style.display = "none"
	document.getElementById('provas').style.display = "none"
}

function aulas() {
	document.getElementById('aulas').style.display = "inherit"
	document.getElementById('primeiro').style.backgroundColor = "inherit"
	document.getElementById('segundo').style.backgroundColor = "white"
	document.getElementById('terceiro').style.backgroundColor = "inherit"
	document.getElementById('tarefas').style.display = "none"
	document.getElementById('provas').style.display = "none"
}

function provas() {
	document.getElementById('provas').style.display = "inherit"
	document.getElementById('primeiro').style.backgroundColor = "inherit"
	document.getElementById('segundo').style.backgroundColor = "inherit"
	document.getElementById('terceiro').style.backgroundColor = "white"
	document.getElementById('tarefas').style.display = "none"
	document.getElementById('aulas').style.display = "none"
}

function carregou() {
	setTimeout(function() {
		document.body.style.display = "initial"
		tarefas()
	}, 500)
}