var diaEscolhido = 0
var prefixo = "null"
var quantidade = [2, 0, 1, 1, 0]

function tarefas() {
	document.getElementById('tarefas').style.display = "inherit"
	document.getElementById('primeiro').style.backgroundColor = "white"
	document.getElementById('segundo').style.backgroundColor = "inherit"
	document.getElementById('terceiro').style.backgroundColor = "inherit"
	document.getElementById('aulas').style.display = "none"
	document.getElementById('provas').style.display = "none"
	document.getElementById('telaAdicionar').style.display = "none"
	document.getElementById('descricaoProva-1').style.display = "none";
}

function aulas() {
	document.getElementById('aulas').style.display = "inherit"
	document.getElementById('primeiro').style.backgroundColor = "inherit"
	document.getElementById('segundo').style.backgroundColor = "white"
	document.getElementById('terceiro').style.backgroundColor = "inherit"
	document.getElementById('tarefas').style.display = "none"
	document.getElementById('provas').style.display = "none"
	document.getElementById('telaAdicionar').style.display = "none"
	document.getElementById('descricaoProva-1').style.display = "none";
}

function provas() {
	document.getElementById('provas').style.display = "inherit"
	document.getElementById('primeiro').style.backgroundColor = "inherit"
	document.getElementById('segundo').style.backgroundColor = "inherit"
	document.getElementById('terceiro').style.backgroundColor = "white"
	document.getElementById('tarefas').style.display = "none"
	document.getElementById('aulas').style.display = "none"
	document.getElementById('telaAdicionar').style.display = "none"
	document.getElementById('descricaoProva-1').style.display = "none";
}

function carregou() {
	setTimeout(function() {
		document.body.style.display = "initial"
		tarefas()
	}, 500)
}

function prova() {
	document.getElementById('descricaoProva-1').style.display = "initial"
	document.getElementById('provas').style.display = "none"
}

function adicionar() {
	document.getElementById('tarefas').style.display = "none"
	document.getElementById('telaAdicionar').style.display = "initial"
}

function adicionarDia(dia) {
	document.getElementById("diaAdicionar-1").style.color = "black"
	document.getElementById("diaAdicionar-2").style.color = "black"
	document.getElementById("diaAdicionar-3").style.color = "black"
	document.getElementById("diaAdicionar-4").style.color = "black"
	document.getElementById("diaAdicionar-5").style.color = "black"
	document.getElementById("diaAdicionar-1").style.backgroundColor = "#EEEEEE"
	document.getElementById("diaAdicionar-2").style.backgroundColor = "#EEEEEE"
	document.getElementById("diaAdicionar-3").style.backgroundColor = "#EEEEEE"
	document.getElementById("diaAdicionar-4").style.backgroundColor = "#EEEEEE"
	document.getElementById("diaAdicionar-5").style.backgroundColor = "#EEEEEE"
	document.getElementById("diaAdicionar-"+dia+"").style.backgroundColor = "#47B447"
	document.getElementById("diaAdicionar-"+dia+"").style.color = "white"
	diaEscolhido = dia
}

function adicionaTarefa() {
	document.getElementById('tarefas').style.display = "inherit"
	document.getElementById('telaAdicionar').style.display = "none"
	if (quantidade[diaEscolhido-1] != 0) {
		var barra = document.createElement("div")
		barra.setAttribute("class", "barrinha")
		document.getElementById("dia-"+diaEscolhido+"").appendChild(barra)
	}
	var tarefa = document.createElement("div")
	tarefa.setAttribute("class", "tarefa")
	tarefa.setAttribute("id", "tarefaCriada")
	document.getElementById("dia-"+diaEscolhido+"").appendChild(tarefa)
	var titulo = document.createElement("div")
	titulo.setAttribute("class", "nometarefa")
	titulo.innerHTML = document.getElementById("nomedatarefa").value;
	document.getElementById("tarefaCriada").appendChild(titulo)
	var data = document.createElement("div")
	if (diaEscolhido == 1) {
		prefixo = "seg"
	} else if (diaEscolhido == 2) {
		prefixo = "ter"
	} else if (diaEscolhido == 3) {
		prefixo = "qua"
	} else if (diaEscolhido == 4) {
		prefixo = "qui"
	} else if (diaEscolhido == 5) {
		prefixo = "sex"
	}
	data.innerHTML = "&#128197; "+prefixo+", "+document.getElementById("horario").value+""
	document.getElementById("tarefaCriada").appendChild(data)
}

function voltarProva() {
	document.getElementById('descricaoProva-1').style.display = "none";
	document.getElementById('provas').style.display = "initial"
}