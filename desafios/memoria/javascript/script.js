var controle = 0;
var escolhido1 = 0;
var escolhido2 = 0;
var numeroCartas = 0;
var ranNums = shuffle([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
var imagem;
var totalJogadas = 0;
var estaJogando = false;
var vezesGanhou = 0;
var tentativas = 0;
var possivelAbrirProxima = true;

function Jogar() {
	if (estaJogando == false) {
		estaJogando = true;
		preloadImage()
		document.body.style.backgroundColor = "rgb(40, 137, 217)"
		document.getElementById("pontos").innerHTML = "Pontos: "+vezesGanhou+""
		document.getElementById("tentativas").innerHTML = "Tentativas: "+tentativas+""
		document.getElementById('botao').style.cursor = "not-allowed"
		document.getElementById('linha1').innerHTML = ""
		document.getElementById('linha1').style.color = "black"
		document.getElementById('botao').innerHTML = "Jogar"
		imagem = shuffle(ranNums)
		while(numeroCartas < 12) {
			var carta = document.createElement("div");
			carta.setAttribute("class", "carta")
			carta.setAttribute("id", "carta-"+parseInt(numeroCartas + 1)+"")
			carta.style.backgroundColor = "whitesmoke";
			carta.innerHTML = numeroCartas + 1;
			carta.setAttribute("onclick", "clicou("+parseInt(numeroCartas+1)+")")
			carta.style.width = "22vh";
			carta.style.height = "22vh";
			if (numeroCartas > 5) {
				document.getElementById('linha2').appendChild(carta);
			} else {
				document.getElementById('linha1').appendChild(carta);
			}
			numeroCartas = numeroCartas + 1;
		}
	}
}

function clicou(numeroBotao) {
	if (possivelAbrirProxima == true) {
		document.getElementById("carta-"+numeroBotao+"").classList.add("comImagem")
		document.getElementById("carta-"+numeroBotao+"").style.opacity = "0"
		document.getElementById("carta-"+numeroBotao+"").style.backgroundImage = "url(imagens/"+imagem[numeroBotao - 1]+".png)"
		document.getElementById("carta-"+numeroBotao+"").innerHTML = ""
		document.getElementById("carta-"+numeroBotao+"").style.backgroundSize = "22vh 22vh"
		totalJogadas = totalJogadas + 1;
		if (totalJogadas == 2) {
			pontuacao()
		}
	}
}

function shuffle(array) {
	var i = array.length;
	var	j = 0;
	var	temp;
	while (i--) {
		j = Math.floor(Math.random() * (i+1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
    }
    return array;
}

function pontuacao() {
	controle = 0
	escolhido1 = 0;
	totalJogadas = 0
	escolhido2 = 0;
	possivelAbrirProxima = false;
	while(controle < 12) {
		if (document.getElementById("carta-"+parseInt(controle+1)+"").style.backgroundImage.length > 10) {
			if (document.getElementById("carta-"+parseInt(controle+1)+"").style.backgroundImage !== 'none') {
				if (escolhido1 == 0) {
					escolhido1 = controle+1
				} else {
					escolhido2 = controle+1	
				}
			}
		}
		controle = controle + 1	
	}
	if (escolhido2 != 0) {
		if (document.getElementById("carta-"+escolhido1+"").style.backgroundImage == document.getElementById("carta-"+escolhido2+"").style.backgroundImage) {
			setTimeout(function() {
				document.getElementById("carta-"+escolhido1+"").classList.add("desaparecer")
				document.getElementById("carta-"+escolhido2+"").classList.add("desaparecer")
				document.getElementById("carta-"+escolhido1+"").removeAttribute("onclick", "clicou("+parseInt(escolhido1)+")")
				document.getElementById("carta-"+escolhido2+"").removeAttribute("onclick", "clicou("+parseInt(escolhido2)+")")
				vezesGanhou = vezesGanhou + 1;
				tentativas = tentativas + 1;
				document.getElementById("tentativas").innerHTML = "Tentativas: "+tentativas+""
				document.getElementById("pontos").innerHTML = "Pontos: "+vezesGanhou+""
				setTimeout(function() {
					document.getElementById("carta-"+escolhido1+"").style.backgroundImage = 'none'
					document.getElementById("carta-"+escolhido2+"").style.backgroundImage = 'none'
					document.getElementById("carta-"+escolhido1+"").classList.remove("comImagem")
					document.getElementById("carta-"+escolhido2+"").classList.remove("comImagem")
					possivelAbrirProxima = true;
					if (vezesGanhou == 6) {
						setTimeout(function() {
							document.getElementById('linha1').innerHTML = "Ganhou em "+tentativas+" Tentativas"
							document.getElementById('linha2').innerHTML = ""
							if (tentativas < 12) {
								document.getElementById('linha1').style.color = "rgb(70, 180, 70)"
								document.body.style.backgroundColor = "rgb(70, 180, 70)"
							} else if (tentativas < 20) {
								document.getElementById('linha1').style.color = "rgb(240, 180, 0)"
								document.body.style.backgroundColor = "rgb(240, 180, 0)"
							} else {
								document.getElementById('linha1').style.color = "rgb(255, 70, 70)"
								document.body.style.backgroundColor = "rgb(255, 70, 70)"
							}
							document.getElementById('botao').innerHTML = "Reiniciar"
							document.getElementById('botao').style.cursor = "pointer"
							estaJogando = false;
							possivelAbrirProxima = true;
							resetar()
						}, 200)
					}
				}, 500)
			}, 500)
		} else {
			setTimeout(function() {
				document.getElementById("carta-"+escolhido1+"").style.backgroundImage = 'none'
				document.getElementById("carta-"+escolhido2+"").style.backgroundImage = 'none'
				document.getElementById("carta-"+escolhido1+"").innerHTML = ""+escolhido1+""
				document.getElementById("carta-"+escolhido2+"").innerHTML = ""+escolhido2+""
				document.getElementById("carta-"+escolhido1+"").classList.remove("comImagem")
				document.getElementById("carta-"+escolhido2+"").classList.remove("comImagem")
				document.getElementById("carta-"+escolhido1+"").style.opacity = "1"
				document.getElementById("carta-"+escolhido2+"").style.opacity = "1"
				tentativas = tentativas + 1
				document.getElementById("tentativas").innerHTML = "Tentativas: "+tentativas+""
				possivelAbrirProxima = true;
			}, 800)
		}
	} else {
		possivelAbrirProxima = true;
		totalJogadas = 1;
	}
}

function resetar() {
	controle = 0;
	escolhido1 = 0;
	escolhido2 = 0;
	numeroCartas = 0;
	imagem;
	totalJogadas = 0;
	estaJogando = false;
	vezesGanhou = 0;
	tentativas = 0;
}

function preloadImage() {
	var controle = 1;
	while(controle <= 6) {
		var img = new Image();
		img.src = "imagens/"+controle+".png";
		controle = controle + 1
	}
}