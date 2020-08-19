var marcado = false;
var valorAtual = 0;
var valorApaga = 0;
var vezes = 0;

function apagarAnteriores() {
	if (marcado == false) {
		marcado = true
	} else if (marcado == true) {
		marcado = false
	}
}

function Principal() {
	var valor = document.getElementById('valor').value
	if (valor > 0) {
		if (valor != " ") {
			if (valor <= 1000) {
				if (marcado == false) {
					while (valorApaga < vezes) {
						removeE()
						valorApaga = valorApaga + 1		
					}
					vezes = vezes - valorApaga;
					Desenha()
				} else {
					Desenha()
				}
			} else {
				window.alert('Digite um valor mais baixo!')
			}
		}
	}
}

function Desenha() {
	var valor = document.getElementById('valor').value
	valorApaga = 0;
	valorAtual = 0;
	while (valorAtual < valor) {
		var btn = document.createElement("BUTTON");
		btn.innerHTML = "Botão";
		btn.setAttribute("class", "botao")
		btn.setAttribute("id", "botao")
		document.body.appendChild(btn);
		btn.setAttribute("onclick", "clicou()")
		valorAtual = valorAtual + 1;
		vezes = vezes + 1
	}
}

function clicou() {
	var r = randomColor(0, 255)
	var g = randomColor(0, 255)
	var b = randomColor(0, 255)
	document.getElementById('clique').style.backgroundColor = "rgb("+r+", "+g+", "+b+")"
	document.getElementById('titulo').style.color = "white"
	document.getElementById('titulo').style.textShadow = "1px 1px black"
}

function randomColor(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function removeE() {
	var elem = document.getElementById('botao');
	elem.parentNode.removeChild(elem);
}