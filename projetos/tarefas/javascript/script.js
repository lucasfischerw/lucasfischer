var diaEscolhido = 0
var prefixo = "null"
var dia1 = 2
var dia2 = 1
var dia3 = 2
var dia4 = 1
var dia5 = 0
var quantidade = [dia1, dia2, dia3, dia4, dia5]
var controle = 0

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
	document.getElementById("provas").classList.add("transicaoProvas")
	document.getElementById('provas').style.display = "inherit"
	document.getElementById('primeiro').style.backgroundColor = "inherit"
	document.getElementById('segundo').style.backgroundColor = "inherit"
	document.getElementById('terceiro').style.backgroundColor = "white"
	document.getElementById('tarefas').style.display = "none"
	document.getElementById('aulas').style.display = "none"
	document.getElementById('telaAdicionar').style.display = "none"
	document.getElementById('descricaoProva-1').style.display = "none";
	setTimeout(function() {
		document.getElementById("provas").classList.remove("transicaoProvas")
	}, 500)
}

function carregou() {
	setTimeout(function() {
		document.body.style.display = "initial"
		document.getElementById("conteudo").classList.add("opacidade")
		tarefas()
	}, 50)
}

function prova() {
	document.getElementById('descricaoProva-1').style.display = "initial"
	document.getElementById('provas').style.display = "none"
}

function adicionar() {
	document.getElementById('tarefas').style.display = "none"
	document.getElementById('telaAdicionar').style.display = "initial"
	if (menuAberto == true) {
		document.getElementById('telaAdicionar').style.width = "80vw";
	} else {
		document.getElementById('telaAdicionar').style.width = "95vw";
		document.getElementById('telaAdicionar').style.marginLeft = "5vw";
	}
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
	controle++;
	document.getElementById('tarefas').style.display = "inherit"
	document.getElementById('telaAdicionar').style.display = "none"
	if (quantidade[diaEscolhido-1] != 0) {
		var barra = document.createElement("div")
		barra.setAttribute("class", "barrinha")
		document.getElementById("dia-"+diaEscolhido+"").appendChild(barra)
	}
	var tarefa = document.createElement("div")
	tarefa.setAttribute("class", "tarefa")
	tarefa.setAttribute("id", "tarefaCriada-"+controle+"")
	document.getElementById("dia-"+diaEscolhido+"").appendChild(tarefa)
	var titulo = document.createElement("div")
	titulo.setAttribute("class", "nometarefa")
	titulo.innerHTML = document.getElementById("nomedatarefa").value;
	document.getElementById("tarefaCriada-"+controle+"").appendChild(titulo)
	var data = document.createElement("div")
	if (diaEscolhido == 1) {
		prefixo = "seg";
		dia1 = dia1 + 1
	} else if (diaEscolhido == 2) {
		prefixo = "ter";
		dia2 = dia2 + 1
	} else if (diaEscolhido == 3) {
		prefixo = "qua";
		dia3 = dia3 + 1
	} else if (diaEscolhido == 4) {
		prefixo = "qui";
		dia4 = dia4 + 1
	} else if (diaEscolhido == 5) {
		prefixo = "sex";
		dia5 = dia5 + 1
	}
	data.innerHTML = "&#128197; "+prefixo+", "+document.getElementById("horario").value+""
	document.getElementById("tarefaCriada-"+controle+"").appendChild(data)
	quantidade = [dia1, dia2, dia3, dia4, dia5]
}

function voltarProva() {
	document.getElementById('descricaoProva-1').style.display = "none";
	document.getElementById('provas').style.display = "initial"
}

var menuAberto = false

function expandirMenu() {
	menuAberto = true
	document.getElementById("expandir").style.display = "none"
	document.getElementById("aulas").style.marginLeft = "20vw"
	document.getElementById("provas").style.marginLeft = "20vw"
	document.getElementById("tarefas").style.marginLeft = "20vw"
	document.getElementById("tarefas").style.width = "80vw"
	document.getElementById("menu").style.width = "20vw"
	document.getElementById("logo").style.width = "15vw"
	document.getElementById("logo").style.height = "15vw"
	document.getElementById("logo").style.marginLeft = "2.5vw"
	document.getElementById("logo").style.marginTop = "2.5vw"
	document.getElementById("expandir").classList.add('transicaoAbrirMenu')
	document.getElementById("aulas").classList.add('transicaoAbrirMenu')
	document.getElementById("provas").classList.add('transicaoAbrirMenu')
	document.getElementById("tarefas").classList.add('transicaoAbrirMenu')
	document.getElementById("menu").classList.add('transicaoAbrirMenu')
	document.getElementById("logo").classList.add('transicaoAbrirMenu')
	setTimeout(function() {
		document.getElementById("primeiro").style.display = "inherit"
		document.getElementById("segundo").style.display = "inherit"
		document.getElementById("terceiro").style.display = "inherit"
		document.getElementById("botaoFechar").style.display = "inherit"
		document.getElementById("primeiro").classList.add("opacidade")
		document.getElementById("segundo").classList.add("opacidade")
		document.getElementById("terceiro").classList.add("opacidade")
		document.getElementById("botaoFechar").classList.add("opacidade")
	}, 300)
	var i = 1;
	while (i < 6) {
		document.getElementById("dia-"+i+"").style.width = "15vw"
		document.getElementById("dia-"+i+"").classList.add('transicaoAbrirMenu')
		document.getElementById("diaAula-"+i+"").style.width = "15vw"
		document.getElementById("diaAula-"+i+"").classList.add('transicaoAbrirMenu')
		i++;
	}
	setTimeout(function() {
		document.getElementById("expandir").classList.remove('transicaoAbrirMenu')
		document.getElementById("aulas").classList.remove('transicaoAbrirMenu')
		document.getElementById("provas").classList.remove('transicaoAbrirMenu')
		document.getElementById("tarefas").classList.remove('transicaoAbrirMenu')
		document.getElementById("menu").classList.remove('transicaoAbrirMenu')
		document.getElementById("logo").classList.remove('transicaoAbrirMenu')
		document.getElementById("primeiro").classList.remove("opacidade")
		document.getElementById("segundo").classList.remove("opacidade")
		document.getElementById("terceiro").classList.remove("opacidade")
		document.getElementById("botaoFechar").classList.remove("opacidade")
		i = 1;
		while (i < 6) {
			document.getElementById("dia-"+i+"").classList.remove("transicaoAbrirMenu")
			document.getElementById("diaAula-"+i+"").classList.remove("transicaoAbrirMenu")
			i++;
		}
	}, 500)
}

function fecharMenu() {
	menuAberto = false
	document.getElementById("primeiro").style.display = "none"
	document.getElementById("segundo").style.display = "none"
	document.getElementById("terceiro").style.display = "none"
	document.getElementById("botaoFechar").style.display = "none"	
	document.getElementById("expandir").style.display = "inherit"
	document.getElementById("aulas").style.marginLeft = "5vw"
	document.getElementById("provas").style.marginLeft = "12.5vw"
	document.getElementById("tarefas").style.marginLeft = "5vw"
	document.getElementById("tarefas").style.width = "95vw"
	document.getElementById("menu").style.width = "5vw"
	document.getElementById("logo").style.width = "4vw"
	document.getElementById("logo").style.height = "4vw"
	document.getElementById("logo").style.marginLeft = "0.5vw"
	document.getElementById("logo").style.marginTop = "2vh"
	document.getElementById("expandir").classList.add('transicaoAbrirMenu')
	document.getElementById("aulas").classList.add('transicaoAbrirMenu')
	document.getElementById("provas").classList.add('transicaoAbrirMenu')
	document.getElementById("tarefas").classList.add('transicaoAbrirMenu')
	document.getElementById("menu").classList.add('transicaoAbrirMenu')
	document.getElementById("logo").classList.add('transicaoAbrirMenu')
	setTimeout(function() {
	}, 300)
	var i = 1;
	while (i < 6) {
		document.getElementById("dia-"+i+"").style.width = "18vw"
		document.getElementById("dia-"+i+"").classList.add('transicaoAbrirMenu')
		document.getElementById("diaAula-"+i+"").style.width = "18vw"
		document.getElementById("diaAula-"+i+"").classList.add('transicaoAbrirMenu')
		i++;
	}
	setTimeout(function() {
		document.getElementById("expandir").classList.remove('transicaoAbrirMenu')
		document.getElementById("aulas").classList.remove('transicaoAbrirMenu')
		document.getElementById("provas").classList.remove('transicaoAbrirMenu')
		document.getElementById("tarefas").classList.remove('transicaoAbrirMenu')
		document.getElementById("menu").classList.remove('transicaoAbrirMenu')
		document.getElementById("logo").classList.remove('transicaoAbrirMenu')
		document.getElementById("primeiro").classList.remove("opacidade")
		document.getElementById("segundo").classList.remove("opacidade")
		document.getElementById("terceiro").classList.remove("opacidade")
		document.getElementById("botaoFechar").classList.remove("opacidade")
		i = 1;
		while (i < 6) {
			document.getElementById("dia-"+i+"").classList.remove("transicaoAbrirMenu")
			document.getElementById("diaAula-"+i+"").classList.remove("transicaoAbrirMenu")
			i++;
		}
	}, 500)
}