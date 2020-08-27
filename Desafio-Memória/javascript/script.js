var controle = 0;
var escolhido1 = 0;
var escolhido2 = 0;
var numeroCartas = 0;
var ranNums = shuffle([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
var imagem;
var totalJogadas = 0;
var estaJogando = false;
var vezesGanhou = 0;

function Jogar() {
	if (estaJogando == false) {
		estaJogando = true;
		document.getElementById("pontos").innerHTML = "Pontos: "+vezesGanhou+""
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
	document.getElementById("carta-"+numeroBotao+"").style.backgroundImage = "url(imagens/"+imagem[numeroBotao - 1]+".png)"
	document.getElementById("carta-"+numeroBotao+"").innerHTML = ""
	document.getElementById("carta-"+numeroBotao+"").style.backgroundSize = "22vh 22vh"
	document.getElementById("carta-"+numeroBotao+"").classList.add("animacaoGiro")
	totalJogadas = totalJogadas + 1;
	if (totalJogadas == 2) {
		pontuacao()
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
	while(controle < 12) {
		if (document.getElementById("carta-"+parseInt(controle+1)+"").style.backgroundImage.length > 10) {
			if (document.getElementById("carta-"+parseInt(controle+1)+"").style.backgroundImage !== 'none') {
				if (escolhido1 == 0) {
					escolhido1 = controle+1
					console.log(escolhido1)
				} else {
					escolhido2 = controle+1	
					console.log(escolhido2)
				}
			}
		}
		controle = controle + 1	
	}
	if (document.getElementById("carta-"+escolhido1+"").style.backgroundImage == document.getElementById("carta-"+escolhido2+"").style.backgroundImage) {
		setTimeout(function() {
			document.getElementById("carta-"+escolhido1+"").classList.add("desaparecer")
			document.getElementById("carta-"+escolhido2+"").classList.add("desaparecer")
			document.getElementById("carta-"+escolhido1+"").style.backgroundImage = 'none'
			document.getElementById("carta-"+escolhido2+"").style.backgroundImage = 'none'
			vezesGanhou = vezesGanhou + 1;
			document.getElementById("pontos").innerHTML = "Pontos: "+vezesGanhou+""
			if (vezesGanhou == 6) {
				resetar()
				setTimeout(function() {
					console.log('GANHOU')
					document.getElementById('linha1').innerHTML = "Ganhou! Parabéns!"
					document.getElementById('linha2').innerHTML = ""
					document.getElementById('linha1').style.color = "rgb(70, 180, 70)"
					document.getElementById('botao').innerHTML = "Reiniciar"
					document.getElementById('botao').style.cursor = "pointer"
					estaJogando = false;
				}, 200)
			}
		}, 500)
	} else {
		setTimeout(function() {
			document.getElementById("carta-"+escolhido1+"").style.backgroundImage = 'none'
			document.getElementById("carta-"+escolhido2+"").style.backgroundImage = 'none'
			document.getElementById("carta-"+escolhido1+"").innerHTML = ""+escolhido1+""
			document.getElementById("carta-"+escolhido2+"").innerHTML = ""+escolhido2+""
		}, 800)
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
}