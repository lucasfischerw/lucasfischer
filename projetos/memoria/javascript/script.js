var aberto = false;
var controle = 0;
var escolhido1 = 0;
var escolhido2 = 0;
var numeroCartas = 0;
var imagem = 0;
var ranNumsFacil;
var ranNumsMedio;
var ranNumsDificil;
var totalJogadas = 0;
var estaJogando = false;
var vezesGanhou = 0;
var tentativas = 0;
var possivelAbrirProxima = true;
var jogou = false;
var dificuldade = 2;
var intervaloFecha = 800;
var intervalo = 0;
var quantidadeCartas = 12;
var imagemEscolhida;
var numeroImagem = 0;
var totalVezesErrou = 0;
var totalVezesAcertou = 0;
var vezesHoje = 0;
var vezesUltimaRodada = 0;

function Carregou() {
	preloadImage()
}

function ResetarClasses() {
	document.getElementById("containerCartas").classList.remove("cartasDificil")
	document.getElementById("containerCartas").classList.remove("cartasNormal")
	document.getElementById("containerCartas").classList.remove("cartasFacil")
}

var controleMenuPowerUp = false;

function Jogar() {
	if (estaJogando == false) {
		estaJogando = true;
		vezesUltimaRodada = 0;
		jogou = true;
		ranNumsFacil = shuffle([1, 2, 3, 1, 2, 3]);
		ranNumsMedio = shuffle([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
		ranNumsDificil = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		if (aberto == true) {
			document.getElementById('menuConfiguracoes').classList.remove("abrirMenu")
			document.getElementById('menuConfiguracoes').classList.add("fecharMenu")
			document.getElementById('configurar').style.backgroundColor = "rgba(0, 0, 0, 0)"
			intervalo = 300
			setTimeout(function () {
				document.getElementById('menuConfiguracoes').classList.remove("fecharMenu")
				document.getElementById('menuConfiguracoes').style.display = "none"
				aberto = false
			}, 150)
		} else {
			intervalo = 0
		}
		setTimeout(function () {
			document.getElementById("textoTentativas").style.display = "none"
			document.getElementById('containerCartas').style.display = "grid"
			document.body.style.backgroundColor = "rgb(40, 137, 217)"
			ResetarClasses()
			ResetarClassesMenu()
			if (dificuldade == 3) {
				quantidadeCartas = 24
				document.getElementById("containerCartas").classList.add("cartasDificil")
				document.getElementById("conteudo").classList.add("conteudoDificil")
				imagemEscolhida = ranNumsDificil[Math.floor(Math.random() * (13 - 1)) + 1]
			} else if (dificuldade == 2) {
				quantidadeCartas = 12
				document.getElementById("containerCartas").classList.add("cartasNormal")
				document.getElementById("conteudo").classList.add("conteudoNormal")
				imagemEscolhida = ranNumsMedio[Math.floor(Math.random() * (7 - 1)) + 1]
			} else if (dificuldade == 1) {
				quantidadeCartas = 6
				document.getElementById("containerCartas").classList.add("cartasFacil")
				document.getElementById("conteudo").classList.add("conteudoFacil")
				imagemEscolhida = ranNumsFacil[Math.floor(Math.random() * (4 - 1)) + 1]
			}
			if (document.getElementById('ativarPowerUp').checked == true) {
				powerUp()
			} else {
				Desenha()
			}
		}, intervalo)
	} else if (!menuPowerUpVisivel) {
		Apaga()
	} else if (!controleMenuPowerUp) {
		FecharPowerUp()
	}
}

function Apaga() {
	if (estaJogando == true) {
		menuPowerUpVisivel = true;
		controleMenuPowerUp = true;
		var numeroCartasInicial = numeroCartas;
		while (numeroCartas != 0) {
			document.getElementById("carta-" + numeroCartas + "").classList.add("desaparecer")
			numeroCartas = numeroCartas - 1;
		}
		setTimeout(function () {
			while (numeroCartasInicial != 0) {
				var carta = document.getElementById("carta-" + numeroCartasInicial);
				carta.remove();
				numeroCartasInicial = numeroCartasInicial - 1;
			}
			estaJogando = false;
			possivelAbrirProxima = true;
			resetar()
			document.getElementById('menuPowerUp').classList.add("menuPowerUpFechado")
			document.getElementById('menuPowerUp').style.display = "none"
			document.getElementById('menuPowerUp').classList.remove("menuPowerUpFechado")
			Jogar()
		}, 200)
	} else {
		estaJogando = false;
		possivelAbrirProxima = true;
		resetar()
		document.getElementById('menuPowerUp').classList.add("menuPowerUpFechado")
		document.getElementById('menuPowerUp').style.display = "none"
		document.getElementById('menuPowerUp').classList.remove("menuPowerUpFechado")
		Jogar()
	}
}

function Desenha() {
	menuPowerUpVisivel = true;
	document.getElementById('botao-jogar').innerHTML = "Reiniciar"
	while (numeroCartas < quantidadeCartas) {
		var carta = document.createElement("div");
		carta.setAttribute("class", "carta")
		carta.setAttribute("id", "carta-" + parseInt(numeroCartas + 1) + "")
		carta.style.backgroundColor = "whitesmoke";
		carta.innerHTML = numeroCartas + 1;
		carta.setAttribute("onclick", "clicou(" + parseInt(numeroCartas + 1) + ")")
		document.getElementById("containerCartas").appendChild(carta)
		numeroCartas = numeroCartas + 1;
	}
	setTimeout(() => {
		menuPowerUpVisivel = false;
		controleMenuPowerUp = false;
	}, 350);
}

function clicou(numeroBotao) {
	if (possivelAbrirProxima == true) {
		document.getElementById("carta-" + numeroBotao + "").classList.add("comImagem")
		document.getElementById("carta-" + numeroBotao + "").style.opacity = "0"
		if (dificuldade == 1) {
			document.getElementById("carta-" + numeroBotao + "").style.backgroundImage = "url(imagens/" + ranNumsFacil[numeroBotao - 1] + ".png)"
			numeroImagem = ranNumsFacil[numeroBotao - 1]
		} else if (dificuldade == 2) {
			document.getElementById("carta-" + numeroBotao + "").style.backgroundImage = "url(imagens/" + ranNumsMedio[numeroBotao - 1] + ".png)"
			numeroImagem = ranNumsMedio[numeroBotao - 1]
		} else {
			document.getElementById("carta-" + numeroBotao + "").style.backgroundImage = "url(imagens/" + ranNumsDificil[numeroBotao - 1] + ".png)"
			numeroImagem = ranNumsDificil[numeroBotao - 1]
		}
		document.getElementById("carta-" + numeroBotao + "").innerHTML = ""
		totalJogadas = totalJogadas + 1;
		if (totalJogadas == 2) {
			pontuacao()
		}
	}
}

function shuffle(array) {
	var i = array.length;
	var j = 0;
	var temp;
	while (i--) {
		j = Math.floor(Math.random() * (i + 1));
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
	while (controle < numeroCartas) {
		if (document.getElementById("carta-" + parseInt(controle + 1) + "").style.backgroundImage.length > 10) {
			if (document.getElementById("carta-" + parseInt(controle + 1) + "").style.backgroundImage !== 'none') {
				if (escolhido1 == 0) {
					escolhido1 = controle + 1
				} else {
					escolhido2 = controle + 1
				}
			}
		}
		controle = controle + 1
	}
	if (escolhido2 != 0) {
		if (document.getElementById("carta-" + escolhido1 + "").style.backgroundImage == document.getElementById("carta-" + escolhido2 + "").style.backgroundImage) {
			totalVezesAcertou++;
			setTimeout(function () {
				document.getElementById("carta-" + escolhido1 + "").classList.add("desaparecer")
				document.getElementById("carta-" + escolhido2 + "").classList.add("desaparecer")
				document.getElementById("carta-" + escolhido1 + "").removeAttribute("onclick", "clicou(" + parseInt(escolhido1) + ")")
				document.getElementById("carta-" + escolhido2 + "").removeAttribute("onclick", "clicou(" + parseInt(escolhido2) + ")")
				document.getElementById("carta-" + escolhido1 + "").classList.remove("comImagem")
				document.getElementById("carta-" + escolhido2 + "").classList.remove("comImagem")
				vezesGanhou = vezesGanhou + 1;
				tentativas = tentativas + 1;
				vezesUltimaRodada = tentativas;
				vezesHoje++;
				setTimeout(function () {
					document.getElementById("carta-" + escolhido1 + "").style.backgroundImage = 'none'
					document.getElementById("carta-" + escolhido2 + "").style.backgroundImage = 'none'
					if (vezesGanhou < numeroCartas / 2) {
						if (numeroImagem == imagemEscolhida) {
							if (tentativas <= 3) {
								if (document.getElementById('ativarPowerUp').checked == true) {
									document.getElementById('titulo').innerHTML = "PowerUp!"
									powerUpAtivo()
								} else {
									possivelAbrirProxima = true;
								}
							} else {
								possivelAbrirProxima = true;
							}
						} else {
							possivelAbrirProxima = true;
						}
					}
					if (vezesGanhou == numeroCartas / 2) {
						document.getElementById("body").style.transition = "background-color 0.6s"
						var numeroCartasInicial = numeroCartas;
						while (numeroCartas != 0) {
							document.getElementById("carta-" + numeroCartas + "").classList.add("desaparecer")
							numeroCartas = numeroCartas - 1;
						}
						setTimeout(function () {
							while (numeroCartasInicial != 0) {
								var carta = document.getElementById("carta-" + numeroCartasInicial);
								carta.remove();
								numeroCartasInicial = numeroCartasInicial - 1;
							}
						}, 200)
						window.scrollTo({ top: 0, behavior: 'smooth' });
						setTimeout(function () {
							document.getElementById('containerCartas').style.display = "inherit"
							document.getElementById('textoTentativas').style.display = "inherit"
							if (tentativas < 12) {
								document.getElementById('textoTentativas').style.color = "rgb(70, 180, 70)"
								document.getElementById('textoTentativas').innerHTML = "Ganhou em " + tentativas + " tentativas"
								document.body.style.backgroundColor = "rgb(70, 180, 70)"
							} else if (tentativas < 20) {
								document.getElementById('textoTentativas').style.color = "rgb(240, 180, 0)"
								document.getElementById('textoTentativas').innerHTML = "Ganhou em " + tentativas + " tentativas"
								document.body.style.backgroundColor = "rgb(240, 180, 0)"
							} else {
								document.getElementById('textoTentativas').style.color = "rgb(255, 70, 70)"
								document.getElementById('textoTentativas').innerHTML = "Ganhou em " + tentativas + " tentativas"
								document.body.style.backgroundColor = "rgb(255, 70, 70)"
							}
							document.getElementById('botao-jogar').innerHTML = "Reiniciar"
							document.getElementById('botao-jogar').style.cursor = "pointer"
							estaJogando = false;
							possivelAbrirProxima = true;
							resetar()
						}, 200)
					}
				}, 300)
			}, 900)
		} else {
			totalVezesErrou++;
			tentativas = tentativas + 1
			vezesUltimaRodada = tentativas;
			vezesHoje++;
			setTimeout(function () {
				document.getElementById("carta-" + escolhido1 + "").style.backgroundImage = 'none'
				document.getElementById("carta-" + escolhido2 + "").style.backgroundImage = 'none'
				document.getElementById("carta-" + escolhido1 + "").innerHTML = "" + escolhido1 + ""
				document.getElementById("carta-" + escolhido2 + "").innerHTML = "" + escolhido2 + ""
				document.getElementById("carta-" + escolhido1 + "").classList.remove("comImagem")
				document.getElementById("carta-" + escolhido2 + "").classList.remove("comImagem")
				document.getElementById("carta-" + escolhido1 + "").style.opacity = "1"
				document.getElementById("carta-" + escolhido2 + "").style.opacity = "1"
				possivelAbrirProxima = true;
			}, 900)
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
	while (controle <= 13) {
		var img = new Image();
		img.src = "imagens/" + controle + ".png";
		controle = controle + 1
	}
	document.getElementById('carregando-container').style.display = "none";
	document.getElementById('conteudo').style.display = "inherit";
	document.body.style.backgroundColor = "rgb(40, 137, 217)";
}

function ResetarClassesMenu() {
	document.getElementById("conteudo").classList.remove("conteudoDificil")
	document.getElementById("conteudo").classList.remove("conteudoNormal")
	document.getElementById("conteudo").classList.remove("conteudoFacil")
}

function AbrirConfiguracoes(iniciarJogo) {
	if (menuPowerUpVisivel == false) {
		if (aberto == false) {
			document.getElementById('menuConfiguracoes').classList.remove("fecharMenu")
			document.getElementById('menuConfiguracoes').classList.add("abrirMenu")
			document.getElementById('menuConfiguracoes').style.display = "inherit"
			document.getElementById('configurar').style.backgroundColor = "rgb(0, 0, 0)"
			aberto = true
		} else {
			document.getElementById('menuConfiguracoes').classList.remove("abrirMenu")
			document.getElementById('menuConfiguracoes').classList.add("fecharMenu")
			document.getElementById('configurar').style.backgroundColor = "rgba(0, 0, 0, 0)"
			setTimeout(function () {
				document.getElementById('menuConfiguracoes').style.display = "none"
				aberto = false
				if (iniciarJogo == true) {
					setTimeout(function () {
						Jogar()
					}, 200)
				}
			}, 150)
		}
	}
}

function anterior() {
	document.getElementById('proximo').style.color = "black"
	document.getElementById('proximo').style.cursor = "pointer"
	dificuldade = dificuldade - 1;
	if (dificuldade <= 1) {
		dificuldade = 1
		document.getElementById('anterior').style.color = "grey"
		document.getElementById('anterior').style.cursor = "not-allowed"
	}
	if (dificuldade == 1) {
		document.getElementById('dificuldadeEscolhida').innerHTML = "Fácil"
	} else {
		if (dificuldade == 2) {
			document.getElementById('dificuldadeEscolhida').innerHTML = "Médio"
		}
	}

}

function proximo() {
	document.getElementById('anterior').style.color = "black"
	document.getElementById('anterior').style.cursor = "pointer"
	dificuldade = dificuldade + 1;
	if (dificuldade >= 3) {
		dificuldade = 3
		document.getElementById('proximo').style.color = "grey"
		document.getElementById('proximo').style.cursor = "not-allowed"
	}
	if (dificuldade == 2) {
		document.getElementById('dificuldadeEscolhida').innerHTML = "Médio"
	} else {
		if (dificuldade == 3) {
			document.getElementById('dificuldadeEscolhida').innerHTML = "Difícil"
		}
	}
}

var menuPowerUpVisivel = false;

function powerUp() {
	menuPowerUpVisivel = true;
	controleMenuPowerUp = true;
	document.getElementById('botao-jogar').innerHTML = "Ok"
	document.getElementById('menuPowerUp').style.display = "inherit"
	document.getElementById('imagem').style.backgroundImage = "url(imagens/" + imagemEscolhida + ".png)"
	document.getElementById('imagem').style.backgroundSize = "20vh 20vh"
	window.scrollTo({ top: 0, behavior: 'smooth' });
	setTimeout(() => {
		controleMenuPowerUp = false;
	}, 550);
}

function FecharPowerUp() {
	controleMenuPowerUp = true;
	document.getElementById('menuPowerUp').classList.add("menuPowerUpFechado")
	setTimeout(function () {
		document.getElementById('menuPowerUp').style.display = "none"
		document.getElementById('menuPowerUp').classList.remove("menuPowerUpFechado")
		Desenha()
	}, 500)
}

function powerUpAtivo() {
	var controle = 1;
	possivelAbrirProxima = false;
	if (dificuldade == 1) {
		while (controle < (numeroCartas + 1)) {
			if (document.getElementById("carta-" + controle + "").classList.contains("desaparecer")) {
			} else {
				document.getElementById("carta-" + controle + "").classList.add("comImagem")
				document.getElementById("carta-" + controle + "").style.backgroundImage = "url(imagens/" + ranNumsFacil[controle - 1] + ".png)"
				document.getElementById("carta-" + controle + "").innerHTML = ""
			}
			controle++
		}
	} else if (dificuldade == 2) {
		while (controle < (numeroCartas + 1)) {
			if (document.getElementById("carta-" + controle + "").classList.contains("desaparecer")) {
			} else {
				document.getElementById("carta-" + controle + "").classList.add("comImagem")
				document.getElementById("carta-" + controle + "").style.backgroundImage = "url(imagens/" + ranNumsMedio[controle - 1] + ".png)"
				document.getElementById("carta-" + controle + "").innerHTML = ""
			}
			controle++
		}
	} else {
		while (controle < (numeroCartas + 1)) {
			document.getElementById("carta-" + controle + "").classList.add("comImagem")
			document.getElementById("carta-" + controle + "").style.backgroundImage = "url(imagens/" + ranNumsDificil[controle - 1] + ".png)"
			document.getElementById("carta-" + controle + "").innerHTML = ""
			controle++
		}
	}
	controle = 1
	setTimeout(function () {
		while (controle < (numeroCartas + 1)) {
			document.getElementById("carta-" + controle + "").classList.remove("comImagem")
			document.getElementById("carta-" + controle + "").style.backgroundImage = "none"
			document.getElementById("carta-" + controle + "").innerHTML = "" + controle + ""
			controle++
		}
		document.getElementById('titulo').innerHTML = "Memória"
		possivelAbrirProxima = true;
	}, 1500)
}

function Estatisticas() {
	if (aberto == true) {
		document.getElementById('menuConfiguracoes').classList.remove("abrirMenu")
		document.getElementById('menuConfiguracoes').classList.add("fecharMenu")
		document.getElementById('configurar').style.backgroundColor = "rgba(0, 0, 0, 0)"
		setTimeout(function () {
			document.getElementById('menuConfiguracoes').classList.remove("fecharMenu")
			document.getElementById('menuConfiguracoes').style.display = "none"
			aberto = false
			setTimeout(function () {
				document.getElementById('conteudo').style.display = "none";
				document.getElementById('estatisticas').style.display = "inherit";
			}, 300)
		}, 150)
	} else {
		document.getElementById('conteudo').style.display = "none";
		document.getElementById('estatisticas').style.display = "inherit";
	}
	if (totalVezesAcertou + totalVezesErrou != 0) {
		var a = totalVezesAcertou + totalVezesErrou;
		var b = 100;
		var x = parseInt((b * totalVezesAcertou) / a);
		document.getElementById('porcentagemAcerto').innerHTML = "" + parseInt(x) + "%"
		document.getElementById('porcentagemErro').innerHTML = "" + parseInt(b - x) + "%"
		document.getElementById('vezesErrou').innerHTML = "" + totalVezesErrou + ""
		document.getElementById('vezesAcertou').innerHTML = "" + totalVezesAcertou + ""
		document.getElementById('totalJogadasHoje').innerHTML = "" + vezesHoje + ""
		document.getElementById('jogadasUltimaRodada').innerHTML = "" + vezesUltimaRodada + ""
	}
}

function Inicial() {
	document.getElementById('estatisticas').style.display = "none";
	document.getElementById('conteudo').style.display = "inherit";
}