var aberto = false;
var controle = 0;
var escolhido1 = 0;
var escolhido2 = 0;
var numeroCartas = 0;
var imagem = 0;
var ranNumsFacil = shuffle([1, 2, 3, 1, 2, 3]);
var ranNumsMedio = shuffle([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]);
var ranNumsDificil = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
var totalJogadas = 0;
var estaJogando = false;
var vezesGanhou = 0;
var tentativas = 0;
var possivelAbrirProxima = true;
var dificuldade = 2;
var intervaloFecha = 800;
var quantidadeCartas = 12;
var imagemEscolhida;
var numeroImagem = 0;

function Carregou() {
	preloadImage()
}

function Jogar() {
	if (estaJogando == false) {
		estaJogando = true;
		document.getElementById('menuConfiguracoes').style.display = "none"
		document.getElementById('linha1').style.opacity = "1"
		document.body.style.backgroundColor = "rgb(40, 137, 217)"
		document.getElementById("pontos").innerHTML = "Pontos: "+vezesGanhou+""
		document.getElementById("tentativas").innerHTML = "Tentativas: "+tentativas+""
		document.getElementById('botao').style.cursor = "not-allowed"
		document.getElementById('linha1').innerHTML = ""
		document.getElementById('linha1').style.color = "black"
		document.getElementById('botao').innerHTML = "Jogar"
		if (dificuldade == 3) {
			quantidadeCartas = 24
			document.getElementById('linha3').style.display = "flex"
			document.getElementById('linha4').style.display = "flex"
			document.getElementById('conteudo').style.height = "140vh"
			document.getElementById('conteudo').style.marginBottom = "10vh"
			document.getElementById('menuPowerUp').style.marginTop = "-125vh"
			imagemEscolhida = ranNumsDificil[Math.floor(Math.random() * (13 - 1)) + 1]
		} else if (dificuldade == 2) {
			quantidadeCartas = 12
			document.getElementById('linha3').style.display = "none"
			document.getElementById('linha4').style.display = "none"
			document.getElementById('conteudo').style.height = "80vh"
			document.getElementById('conteudo').style.marginBottom = "0"
			document.getElementById('menuPowerUp').style.marginTop = "-65vh"
			imagemEscolhida = ranNumsMedio[Math.floor(Math.random() * (7 - 1)) + 1]
		} else if (dificuldade == 1) {
			quantidadeCartas = 6
			document.getElementById('linha3').style.display = "none"
			document.getElementById('linha4').style.display = "none"
			document.getElementById('conteudo').style.height = "80vh"
			document.getElementById('conteudo').style.marginBottom = "0"
			document.getElementById('menuPowerUp').style.marginTop = "-65vh"
			imagemEscolhida = ranNumsFacil[Math.floor(Math.random() * (4 - 1)) + 1]
		}
		if(document.getElementById('ativarPowerUp').checked == true) {
			powerUp()
		} else {
			Desenha()
		}
	}
}

function Desenha() {
	while (numeroCartas < quantidadeCartas) {
			var carta = document.createElement("div");
			carta.setAttribute("class", "carta")
			carta.setAttribute("id", "carta-"+parseInt(numeroCartas + 1)+"")
			carta.style.backgroundColor = "whitesmoke";
			carta.innerHTML = numeroCartas + 1;
			carta.setAttribute("onclick", "clicou("+parseInt(numeroCartas+1)+")")
			carta.style.width = "22vh";
			carta.style.height = "22vh";
			if (numeroCartas > 17) {
				document.getElementById('linha4').appendChild(carta);
			} else if (numeroCartas > 11) {
				document.getElementById('linha3').appendChild(carta);
			} else if (numeroCartas > 5) {
				document.getElementById('linha2').appendChild(carta);
			} else {
				document.getElementById('linha1').appendChild(carta);
			}
			numeroCartas = numeroCartas + 1;
		}
}

function clicou(numeroBotao) {
	if (possivelAbrirProxima == true) {
		document.getElementById("carta-"+numeroBotao+"").classList.add("comImagem")
		document.getElementById("carta-"+numeroBotao+"").style.opacity = "0"
		if (dificuldade == 1) {
			document.getElementById("carta-"+numeroBotao+"").style.backgroundImage = "url(imagens/"+ranNumsFacil[numeroBotao - 1]+".png)"
			numeroImagem = ranNumsFacil[numeroBotao - 1]
		} else if (dificuldade == 2) {
			document.getElementById("carta-"+numeroBotao+"").style.backgroundImage = "url(imagens/"+ranNumsMedio[numeroBotao - 1]+".png)"
			numeroImagem = ranNumsMedio[numeroBotao - 1]
		} else {
			document.getElementById("carta-"+numeroBotao+"").style.backgroundImage = "url(imagens/"+ranNumsDificil[numeroBotao - 1]+".png)"
			numeroImagem = ranNumsDificil[numeroBotao - 1]
		}
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
	console.log("Pontuação")
	controle = 0
	escolhido1 = 0;
	totalJogadas = 0
	escolhido2 = 0;
	possivelAbrirProxima = false;
	while(controle < numeroCartas) {
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
				document.getElementById("carta-"+escolhido1+"").classList.remove("comImagem")
				document.getElementById("carta-"+escolhido2+"").classList.remove("comImagem")
				vezesGanhou = vezesGanhou + 1;
				tentativas = tentativas + 1;
				document.getElementById("tentativas").innerHTML = "Tentativas: "+tentativas+""
				document.getElementById("pontos").innerHTML = "Pontos: "+vezesGanhou+""
				setTimeout(function() {
					document.getElementById("carta-"+escolhido1+"").style.backgroundImage = 'none'
					document.getElementById("carta-"+escolhido2+"").style.backgroundImage = 'none'
					if (vezesGanhou < numeroCartas/2) {
						if (numeroImagem == imagemEscolhida) {
							if (tentativas <= 100) {
								if (document.getElementById('ativarPowerUp').checked == true) {
									console.log("PowerUp")
									document.getElementById('titulo').innerHTML = "PowerUp!"
									powerUpAtivo()		
								}
							} else {
								console.log("Muito tarde")
								possivelAbrirProxima = true;
							}
						} else {
							possivelAbrirProxima = true;
						}
					}
					if (vezesGanhou == numeroCartas/2) {
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
			}, 900)
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
	while(controle <= 8) {
		var img = new Image();
		img.src = "imagens/"+controle+".png";
		controle = controle + 1
	}
	document.getElementById('carregando-container').style.display = "none";
	document.getElementById('conteudo').style.display = "inherit";
	document.body.style.backgroundColor = "rgb(40, 137, 217)";
}

function AbrirConfiguracoes() {
	if (estaJogando == false) {
		if (aberto == false) {
			document.getElementById('menuConfiguracoes').classList.remove("fecharMenu")
			document.getElementById('menuConfiguracoes').classList.add("abrirMenu")
			document.getElementById('menuConfiguracoes').style.display = "inherit"
			document.getElementById('linha1').style.opacity = "0"
			setTimeout(function() {
				document.getElementById('menuConfiguracoes').classList.remove("abrirMenu")
				aberto = true
			}, 500)
		} else {
			document.getElementById('menuConfiguracoes').classList.remove("abrirMenu")
			document.getElementById('menuConfiguracoes').classList.add("fecharMenu")
			document.getElementById('linha1').style.opacity = "1"
			setTimeout(function() {
				document.getElementById('menuConfiguracoes').classList.remove("fecharMenu")
				document.getElementById('menuConfiguracoes').style.display = "none"
				aberto = false
			}, 500)
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
	console.log(dificuldade)	
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
	console.log(dificuldade)
}

function powerUp() {
	document.getElementById('menuPowerUp').style.display = "inherit"
	document.getElementById('imagem').style.backgroundImage = "url(imagens/"+imagemEscolhida+".png)"
	document.getElementById('imagem').style.backgroundSize = "20vh 20vh"
}

function FecharPowerUp() {
	document.getElementById('menuPowerUp').classList.add("menuPowerUpFechado")
	setTimeout(function() {
		document.getElementById('menuPowerUp').style.display = "none"
		document.getElementById('menuPowerUp').classList.remove("menuPowerUpFechado")
		Desenha()
	}, 500)
}

function powerUpAtivo() {
	var controle = 1;
	possivelAbrirProxima = false;
	if (dificuldade == 1) {
		while(controle < (numeroCartas + 1)) {
			if(document.getElementById("carta-"+controle+"").classList.contains("desaparecer")) {
				console.log('Nao vai')
			} else {
				document.getElementById("carta-"+controle+"").classList.add("comImagem")
				document.getElementById("carta-"+controle+"").style.backgroundImage = "url(imagens/"+ranNumsFacil[controle-1]+".png)"
				document.getElementById("carta-"+controle+"").style.backgroundSize = "22vh 22vh"
				document.getElementById("carta-"+controle+"").innerHTML = ""		
			}
			controle++
		}
	} else if (dificuldade == 2) {
		while(controle < (numeroCartas + 1)) {
			if(document.getElementById("carta-"+controle+"").classList.contains("desaparecer")) {
				console.log('Nao vai')
			} else {
				document.getElementById("carta-"+controle+"").classList.add("comImagem")
				document.getElementById("carta-"+controle+"").style.backgroundImage = "url(imagens/"+ranNumsMedio[controle-1]+".png)"
				document.getElementById("carta-"+controle+"").style.backgroundSize = "22vh 22vh"
				document.getElementById("carta-"+controle+"").innerHTML = ""		
			}
			controle++
		}
	} else {
		while(controle < (numeroCartas + 1)) {
			document.getElementById("carta-"+controle+"").classList.add("comImagem")
			document.getElementById("carta-"+controle+"").style.backgroundImage = "url(imagens/"+ranNumsDificil[controle-1]+".png)"
			document.getElementById("carta-"+controle+"").style.backgroundSize = "22vh 22vh"
			document.getElementById("carta-"+controle+"").innerHTML = ""
			controle++
		}
	}
	controle = 1
	setTimeout(function() {
		while(controle < (numeroCartas + 1)) {
			document.getElementById("carta-"+controle+"").classList.remove("comImagem")
			document.getElementById("carta-"+controle+"").style.backgroundImage = "none"
			document.getElementById("carta-"+controle+"").innerHTML = ""+controle+""
			controle++
		}
		possivelAbrirProxima = true;
	}, 1500)
}