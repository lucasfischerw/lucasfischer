var estaJogando = false;
var sequencia = [];
var botoesEscolhidos = [];
var intervalo = 800;
var quantidadeARevelar = 1;
var possivelClicar = false;
var jaJogou = false;
var pontos = 0;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function resposta() {
	for (var i = 0; i < botoesEscolhidos.length; i++) {
		if (botoesEscolhidos[i] != sequencia[i]) {
			return false;
		}
	} return true;
}

function reset() {
	estaJogando, possivelClicar = false;
	sequencia, botoesEscolhidos = [];
	intervalo = 800;
	quantidadeARevelar = 1;
	pontos = 0;
	jaJogou = true;
}

function errado() {
	document.getElementById('conteudo').innerHTML = "Errado";
	document.getElementById('textoBotao').style.backgroundColor = "#9e9e9e";
	document.body.style.backgroundColor = "#9e9e9e"
	reset()
}

async function botao(numeroBotao) {
	if (estaJogando && possivelClicar) {
		botoesEscolhidos.push(numeroBotao);
		if (botoesEscolhidos.length == quantidadeARevelar) {
			if (resposta()) {
				quantidadeARevelar++;
				pontos++;
				botoesEscolhidos = [];
				possivelClicar = false
				document.getElementById('valor').innerHTML = pontos;
				sequencia.push(Math.floor(Math.random() * (5 - 1)) + 1);
				for (var i = 0; i < quantidadeARevelar; i++) {
					desenhaCor(sequencia[i])
					await sleep(intervalo+200)
				}
				if (quantidadeARevelar > 4 && quantidadeARevelar < 12) {
					intervalo = intervalo - 100;
				}
				possivelClicar = true
			} else {
				errado()
			}
		} else if (!resposta()) {
			errado()
		}
	}
}

function desenhaCor(codigoCor) {
	if (codigoCor == 1) {
		document.getElementById('conteudo').innerHTML = "Vermelho"
		document.getElementById('textoBotao').style.backgroundColor = "rgb(255, 70, 70)"
		document.body.style.backgroundColor = "rgb(255, 70, 70)"
	} else if (codigoCor == 2) {
		document.getElementById('conteudo').innerHTML = "Verde"
		document.getElementById('textoBotao').style.backgroundColor = "rgb(70, 180, 70)"
		document.body.style.backgroundColor = "rgb(70, 180, 70)"
	} else if (codigoCor == 3) {
		document.getElementById('conteudo').innerHTML = "Azul"
		document.getElementById('textoBotao').style.backgroundColor = "rgb(40, 137, 217)"
		document.body.style.backgroundColor = "rgb(40, 137, 217)"
	} else {
		document.getElementById('conteudo').innerHTML = "Amarelo"
		document.getElementById('textoBotao').style.backgroundColor = "rgb(240, 180, 0)"
		document.body.style.backgroundColor = "rgb(240, 180, 0)"
	}
	setTimeout(function(){
		document.getElementById('conteudo').innerHTML = ""
		document.getElementById('textoBotao').style.backgroundColor = "white"
		document.body.style.backgroundColor = "#9e9e9e"
	}, intervalo);
}

async function iniciarJogo() {
	var delay = 0;
	if (estaJogando) {
		delay = 150;
		document.getElementById('textoBotao').style.backgroundColor = "white";
		document.getElementById('conteudo').innerHTML = ""
		document.body.style.backgroundColor = "#9e9e9e"
		reset()
	}
	setTimeout(function() {
		estaJogando = true;
		if (jaJogou) {
			document.getElementById('conteudo').innerHTML = "";
			document.getElementById('textoBotao').style.backgroundColor = "white";
			document.body.style.backgroundColor = "#9e9e9e"
			document.getElementById('valor').innerHTML = "0"
		} else {
			document.getElementById('titulo').classList.add("removeTitulo")
			setTimeout(function() {
				document.getElementById('titulo').style.display = "none"
			}, 350)
		}
		setTimeout(async function() {
			document.getElementById('Jogar').innerHTML = "Reiniciar";
			sequencia.push(Math.floor(Math.random() * (5 - 1)) + 1);
			desenhaCor(sequencia[0])
			await sleep(intervalo)
			possivelClicar = true;
		}, 450)
	}, delay)
}