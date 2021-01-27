var corSorteada = 0;
var botao1 = false;
var botao2 = false;
var botao3 = false;
var botao4 = false;
var sorteio1 = 0;
var sorteio2 = 0;
var sorteio3 = 0;
var sorteio4 = 0;
var sorteio5 = 0;
var sorteio6 = 0;
var sorteio7 = 0;
var sorteio8 = 0;
var sorteio9 = 0;
var sorteio10 = 0;
var sorteio11 = 0;
var sorteio12 = 0;
var sorteio13 = 0;
var sorteio14 = 0;
var sorteio15 = 0;
var sorteio16 = 0;
var sorteio17 = 0;
var sorteio18 = 0;
var sorteio19 = 0;
var sorteio20 = 0;
var intervalo = 800;
var intervalo2 = 0;
var intervalo3 = 0;
var intervalo4 = 0;
var intervalo5 = 0;
var intervalo6 = 0;
var intervalo7 = 0;
var intervalo8 = 0;
var intervalo9 = 0;
var intervalo10 = 0;
var intervalo11 = 0;
var intervalo12 = 0;
var intervalo13 = 0;
var intervalo14 = 0;
var intervalo15 = 0;
var intervalo16 = 0;
var intervalo17 = 0;
var intervalo18 = 0;
var intervalo19 = 0;
var intervalo20 = 0;
var numeroJogadas = 0;
var pontos = 0;
var estaJogando = false;
var terminou = false;

function Sortear(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function iniciarJogo() {
	if(estaJogando == false) {
		resetVar()
		estaJogando = true;
		document.body.backgroundColor = "white"
		document.getElementById('respostaCorreta').style.display = "none"
		document.getElementById('noticias').style.display = "inherit"
		document.getElementById('botaoJogar').style.color = "#FFF"
		document.getElementById('botaoJogar').style.backgroundColor = "whitesmoke"
		document.getElementById('botaoJogar').style.color = "whitesmoke"
		document.getElementById('textoBotao').style.backgroundColor = "grey"
		document.getElementById('conteudo').style.color = "white"
		document.getElementById('conteudo').innerHTML = "3"
		document.getElementById('botao1').style.backgroundColor = "rgb(255, 70, 70)"
		setTimeout(function(){
			document.getElementById('conteudo').innerHTML = "2"
			document.getElementById('botao2').style.backgroundColor = "rgb(70, 180, 70)"
		}, 1000)
		setTimeout(function(){
			document.getElementById('conteudo').innerHTML = "1"
			document.getElementById('botao3').style.backgroundColor = "rgb(40, 137, 217)"
		}, 2000)
		setTimeout(function(){
			document.getElementById('conteudo').innerHTML = "Já!"
			document.getElementById('botao4').style.backgroundColor = "rgb(240, 180, 0)"
		}, 3000)
		setTimeout(function(){
			Jogar()
		},4000)
	}
}

function Configurar() {
	console.clear()
	console.log(sorteio1)
	console.log(sorteio2)
	console.log(sorteio3)
	console.log(sorteio4)
	console.log(sorteio5)
	console.log(sorteio6)
	console.log(sorteio7)
	console.log(sorteio8)
	console.log(sorteio9)
	console.log(sorteio10)
	setTimeout(function(){document.getElementById('value').innerHTML = ""}, 800)
	document.getElementById('valor').innerHTML = pontos;
	document.getElementById('conteudo').style.color = "white"
	document.getElementById('botao1').style.backgroundColor = "rgb(255, 70, 70)"
	document.getElementById('botao2').style.backgroundColor = "rgb(70, 180, 70)"
	document.getElementById('botao3').style.backgroundColor = "rgb(40, 137, 217)"
	document.getElementById('botao4').style.backgroundColor = "rgb(240, 180, 0)"
	document.getElementById('botao1').style.color = "#FFF"
	document.getElementById('botao2').style.color = "#FFF"
	document.getElementById('botao3').style.color = "#FFF"
	document.getElementById('botao4').style.color = "#FFF"
	if (numeroJogadas > 4) {
		if (numeroJogadas < 10) {
			intervalo = intervalo - 100;
		}
	}
	botao1 = false
	botao2 = false
	botao3 = false
	botao4 = false
}

function Memoria() {
	intervalo2 = intervalo + 200;
	intervalo3 = intervalo2 + intervalo + 200;
	intervalo4 = intervalo3 + intervalo + 200;
	intervalo5 = intervalo4 + intervalo + 200;
	intervalo6 = intervalo5 + intervalo + 200;
	intervalo7 = intervalo6 + intervalo + 200;
	intervalo8 = intervalo7 + intervalo + 200;
	intervalo9 = intervalo8 + intervalo + 200;
	intervalo10 = intervalo9 + intervalo + 200;
	intervalo11 = intervalo10 + intervalo + 200;
	intervalo12 = intervalo11 + intervalo + 200;
	intervalo13 = intervalo12 + intervalo + 200;
	intervalo14 = intervalo13 + intervalo + 200;
	intervalo15 = intervalo14 + intervalo + 200;
	intervalo16 = intervalo15 + intervalo + 200;
	intervalo17 = intervalo16 + intervalo + 200;
	intervalo18 = intervalo17 + intervalo + 200;
	intervalo19 = intervalo18 + intervalo + 200;
	intervalo20 = intervalo19 + intervalo + 200;
	if (sorteio1 != 0) {
		if (sorteio1 == 1) {
			Vermelho()
		} else if (sorteio1 == 2) {
			Verde()
		} else if (sorteio1 == 3) {
			Azul()
		} else if (sorteio1 == 4) {
			Amarelo()
		}
	}
	if (sorteio2 != 0) {
		if (sorteio2 == 1) {
			setTimeout(function(){Vermelho()}, intervalo2)
		} else if (sorteio2 == 2) {
			setTimeout(function(){Verde()}, intervalo2)
		} else if (sorteio2 == 3) {
			setTimeout(function(){Azul()}, intervalo2)
		} else if (sorteio2 == 4) {
			setTimeout(function(){Amarelo()}, intervalo2)
		}	
	}
	if (sorteio3 != 0) {
		if (sorteio3 == 1) {
			setTimeout(function(){Vermelho()}, intervalo3)
		} else if (sorteio3 == 2) {
			setTimeout(function(){Verde()}, intervalo3)
		} else if (sorteio3 == 3) {
			setTimeout(function(){Azul()}, intervalo3)
		} else if (sorteio3 == 4) {
			setTimeout(function(){Amarelo()}, intervalo3)
		}	
	}
	if (sorteio4 != 0) {
		if (sorteio4 == 1) {
			setTimeout(function(){Vermelho()}, intervalo4)
		} else if (sorteio4 == 2) {
			setTimeout(function(){Verde()}, intervalo4)
		} else if (sorteio4 == 3) {
			setTimeout(function(){Azul()}, intervalo4)
		} else if (sorteio4 == 4) {
			setTimeout(function(){Amarelo()}, intervalo4)
		}	
	}
	if (sorteio5 != 0) {
		if (sorteio5 == 1) {
			setTimeout(function(){Vermelho()}, intervalo5)
		} else if (sorteio5 == 2) {
			setTimeout(function(){Verde()}, intervalo5)
		} else if (sorteio5 == 3) {
			setTimeout(function(){Azul()}, intervalo5)
		} else if (sorteio5 == 4) {
			setTimeout(function(){Amarelo()}, intervalo5)
		}	
	}
	if (sorteio6 != 0) {
		if (sorteio6 == 1) {
			setTimeout(function(){Vermelho()}, intervalo6)
		} else if (sorteio6 == 2) {
			setTimeout(function(){Verde()}, intervalo6)
		} else if (sorteio6 == 3) {
			setTimeout(function(){Azul()}, intervalo6)
		} else if (sorteio6 == 4) {
			setTimeout(function(){Amarelo()}, intervalo6)
		}	
	}
	if (sorteio7 != 0) {
		if (sorteio7 == 1) {
			setTimeout(function(){Vermelho()}, intervalo7)
		} else if (sorteio7 == 2) {
			setTimeout(function(){Verde()}, intervalo7)
		} else if (sorteio7 == 3) {
			setTimeout(function(){Azul()}, intervalo7)
		} else if (sorteio7 == 4) {
			setTimeout(function(){Amarelo()}, intervalo7)
		}	
	}
	if (sorteio8 != 0) {
		if (sorteio8 == 1) {
			setTimeout(function(){Vermelho()}, intervalo8)
		} else if (sorteio8 == 2) {
			setTimeout(function(){Verde()}, intervalo8)
		} else if (sorteio8 == 3) {
			setTimeout(function(){Azul()}, intervalo8)
		} else if (sorteio8 == 4) {
			setTimeout(function(){Amarelo()}, intervalo8)
		}	
	}
	if (sorteio9 != 0) {
		if (sorteio9 == 1) {
			setTimeout(function(){Vermelho()}, intervalo9)
		} else if (sorteio9 == 2) {
			setTimeout(function(){Verde()}, intervalo9)
		} else if (sorteio9 == 3) {
			setTimeout(function(){Azul()}, intervalo9)
		} else if (sorteio9 == 4) {
			setTimeout(function(){Amarelo()}, intervalo9)
		}	
	}
	if (sorteio10 != 0) {
		if (sorteio10 == 1) {
			setTimeout(function(){Vermelho()}, intervalo10)
		} else if (sorteio10 == 2) {
			setTimeout(function(){Verde()}, intervalo10)
		} else if (sorteio10 == 3) {
			setTimeout(function(){Azul()}, intervalo10)
		} else if (sorteio10 == 4) {
			setTimeout(function(){Amarelo()}, intervalo10)
		}	
	}
	if (sorteio11 != 0) {
		if (sorteio11 == 1) {
			setTimeout(function(){Vermelho()}, intervalo11)
		} else if (sorteio11 == 2) {
			setTimeout(function(){Verde()}, intervalo11)
		} else if (sorteio11 == 3) {
			setTimeout(function(){Azul()}, intervalo11)
		} else if (sorteio11 == 4) {
			setTimeout(function(){Amarelo()}, intervalo11)
		}	
	}
	if (sorteio12 != 0) {
		if (sorteio12 == 1) {
			setTimeout(function(){Vermelho()}, intervalo12)
		} else if (sorteio12 == 2) {
			setTimeout(function(){Verde()}, intervalo12)
		} else if (sorteio12 == 3) {
			setTimeout(function(){Azul()}, intervalo12)
		} else if (sorteio12 == 4) {
			setTimeout(function(){Amarelo()}, intervalo12)
		}	
	}
	if (sorteio13 != 0) {
		if (sorteio13 == 1) {
			setTimeout(function(){Vermelho()}, intervalo13)
		} else if (sorteio13 == 2) {
			setTimeout(function(){Verde()}, intervalo13)
		} else if (sorteio13 == 3) {
			setTimeout(function(){Azul()}, intervalo13)
		} else if (sorteio13 == 4) {
			setTimeout(function(){Amarelo()}, intervalo13)
		}	
	}
	if (sorteio14 != 0) {
		if (sorteio14 == 1) {
			setTimeout(function(){Vermelho()}, intervalo14)
		} else if (sorteio14 == 2) {
			setTimeout(function(){Verde()}, intervalo14)
		} else if (sorteio14 == 3) {
			setTimeout(function(){Azul()}, intervalo14)
		} else if (sorteio14 == 4) {
			setTimeout(function(){Amarelo()}, intervalo14)
		}	
	}
	if (sorteio15 != 0) {
		if (sorteio15 == 1) {
			setTimeout(function(){Vermelho()}, intervalo15)
		} else if (sorteio15 == 2) {
			setTimeout(function(){Verde()}, intervalo15)
		} else if (sorteio15 == 3) {
			setTimeout(function(){Azul()}, intervalo15)
		} else if (sorteio15 == 4) {
			setTimeout(function(){Amarelo()}, intervalo15)
		}	
	}
	if (sorteio16 != 0) {
		if (sorteio16 == 1) {
			setTimeout(function(){Vermelho()}, intervalo16)
		} else if (sorteio16 == 2) {
			setTimeout(function(){Verde()}, intervalo16)
		} else if (sorteio16 == 3) {
			setTimeout(function(){Azul()}, intervalo16)
		} else if (sorteio16 == 4) {
			setTimeout(function(){Amarelo()}, intervalo16)
		}	
	}
	if (sorteio17 != 0) {
		if (sorteio17 == 1) {
			setTimeout(function(){Vermelho()}, intervalo17)
		} else if (sorteio17 == 2) {
			setTimeout(function(){Verde()}, intervalo17)
		} else if (sorteio17 == 3) {
			setTimeout(function(){Azul()}, intervalo17)
		} else if (sorteio17 == 4) {
			setTimeout(function(){Amarelo()}, intervalo17)
		}	
	}
	if (sorteio18 != 0) {
		if (sorteio18 == 1) {
			setTimeout(function(){Vermelho()}, intervalo18)
		} else if (sorteio18 == 2) {
			setTimeout(function(){Verde()}, intervalo18)
		} else if (sorteio18 == 3) {
			setTimeout(function(){Azul()}, intervalo18)
		} else if (sorteio18 == 4) {
			setTimeout(function(){Amarelo()}, intervalo18)
		}	
	}
	if (sorteio19 != 0) {
		if (sorteio19 == 1) {
			setTimeout(function(){Vermelho()}, intervalo19)
		} else if (sorteio19 == 2) {
			setTimeout(function(){Verde()}, intervalo19)
		} else if (sorteio19 == 3) {
			setTimeout(function(){Azul()}, intervalo19)
		} else if (sorteio19 == 4) {
			setTimeout(function(){Amarelo()}, intervalo19)
		}	
	}
	if (sorteio20 != 0) {
		if (sorteio20 == 1) {
			setTimeout(function(){Vermelho()}, intervalo20)
		} else if (sorteio20 == 2) {
			setTimeout(function(){Verde()}, intervalo20)
		} else if (sorteio20 == 3) {
			setTimeout(function(){Azul()}, intervalo20)
		} else if (sorteio20 == 4) {
			setTimeout(function(){Amarelo()}, intervalo20)
		}	
	}
}

function Jogar() {
	terminou = false;
	Configurar()
	corSorteada = Sortear(1, 5);
	variaveis();
	Memoria()
	reset()
	Listener();
}

function Vermelho() {
	terminou = false;
	document.getElementById('conteudo').innerHTML = "Vermelho"
	document.getElementById('textoBotao').style.backgroundColor = "rgb(255, 70, 70)"
	document.body.style.backgroundColor = "rgb(255, 70, 70)"
	setTimeout(function(){
	document.getElementById('textoBotao').style.backgroundColor = "whitesmoke"
	document.getElementById('conteudo').innerHTML = ""
	document.body.style.backgroundColor = "white"
	terminou = true;
	}, intervalo);
}

function Verde() {
	terminou = false;
	document.getElementById('conteudo').innerHTML = "Verde"
	document.getElementById('textoBotao').style.backgroundColor = "rgb(70, 180, 70)"
	document.body.style.backgroundColor = "rgb(70, 180, 70)"
	setTimeout(function(){
	document.getElementById('textoBotao').style.backgroundColor = "whitesmoke"
	document.getElementById('conteudo').innerHTML = ""
	document.body.style.backgroundColor = "white"
	terminou = true;
	}, intervalo);
}

function Azul() {
	terminou = false;
	document.getElementById('conteudo').innerHTML = "Azul"
	document.getElementById('textoBotao').style.backgroundColor = "rgb(40, 137, 217)"
	document.body.style.backgroundColor = "rgb(40, 137, 217)"
	setTimeout(function(){
	document.getElementById('textoBotao').style.backgroundColor = "whitesmoke"
	document.getElementById('conteudo').innerHTML = ""
	document.body.style.backgroundColor = "white"
	terminou = true;
	}, intervalo);
}

function Amarelo() {
	terminou = false;
	document.getElementById('conteudo').innerHTML = "Amarelo"
	document.getElementById('textoBotao').style.backgroundColor = "rgb(240, 180, 0)"
	document.body.style.backgroundColor = "rgb(240, 180, 0)"
	setTimeout(function(){
	document.getElementById('textoBotao').style.backgroundColor = "whitesmoke"
	document.getElementById('conteudo').innerHTML = ""
	document.body.style.backgroundColor = "white"
	terminou = true;
	}, intervalo);
}

function variaveis() {
	if (sorteio1 == 0) {
		sorteio1 = corSorteada;
	} else if (sorteio2 == 0) {
		sorteio2 = corSorteada;
	} else if (sorteio3 == 0) {
		sorteio3 = corSorteada;
	} else if (sorteio4 == 0) {
		sorteio4 = corSorteada;
	} else if (sorteio5 == 0) {
		sorteio5 = corSorteada;
	} else if (sorteio6 == 0) {
		sorteio6 = corSorteada
	} else if (sorteio7 == 0) {
		sorteio7 = corSorteada
	} else if (sorteio8 == 0) {
		sorteio8 = corSorteada
	} else if (sorteio9 == 0) {
		sorteio9 = corSorteada
	} else if (sorteio10 == 0) {
		sorteio10 = corSorteada
	} else if (sorteio11 == 0) {
		sorteio11 = corSorteada
	} else if (sorteio12 == 0) {
		sorteio12 = corSorteada
	} else if (sorteio13 == 0) {
		sorteio13 = corSorteada
	} else if (sorteio14 == 0) {
		sorteio14 = corSorteada
	} else if (sorteio15 == 0) {
		sorteio15 = corSorteada
	} else if (sorteio16 == 0) {
		sorteio16 = corSorteada
	} else if (sorteio17 == 0) {
		sorteio17 = corSorteada
	} else if (sorteio18 == 0) {
		sorteio18 = corSorteada
	} else if (sorteio19 == 0) {
		sorteio19 = corSorteada
	} else if (sorteio20 == 0) {
		sorteio20 = corSorteada
	}
	numeroJogadas = numeroJogadas + 1;
}

function Listener() {
	reset()
	clicou = true;
	document.getElementById('botao1').addEventListener("click", botao1Clicado);
	document.getElementById('botao2').addEventListener("click", botao2Clicado);
	document.getElementById('botao3').addEventListener("click", botao3Clicado);
	document.getElementById('botao4').addEventListener("click", botao4Clicado);
}

function botao1Clicado() {
	if (terminou == true) {
		botao1 = true;
		Pontos()
	}
}

function botao2Clicado() {
	if (terminou == true) {
		botao2 = true;
		Pontos()
	}
}

function botao3Clicado() {
	if (terminou == true) {
		botao3 = true;
		Pontos()
	}
}

function botao4Clicado() {
	if (terminou == true) {
		botao4 = true;
		Pontos()
	}
}

function Pontos() {
	if(sorteio1 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 1) {
				Certo()
			} else {
				paraPontos2()
			}
		} else {
			Errado();
		}
	} else if (sorteio1 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 1) {
				Certo()	
			} else {
				paraPontos2()
			}
		} else {
			Errado()
		}
	} else if (sorteio1 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 1) {
				Certo()
			} else {
				paraPontos2()
			}
		} else {
			Errado()
		}
	} else if (sorteio1 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 1) {
				Certo()	
			} else {
				paraPontos2()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos2() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_2);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_2);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_2);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_2);
}

function botao1Clicado_2() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos2()
}

function botao2Clicado_2() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos2()
}

function botao3Clicado_2() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos2()
}

function botao4Clicado_2() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos2()
}

function Pontos2() {
	if(sorteio2 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 2) {
				Certo()
			} else {
				paraPontos3()
			}
		} else {
			Errado();
		}
	} else if (sorteio2 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 2) {
				Certo()	
			} else {
				paraPontos3()
			}
		} else {
			Errado()
		}
	} else if (sorteio2 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 2) {
				Certo()
			} else {
				paraPontos3()
			}
		} else {
			Errado()
		}
	} else if (sorteio2 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 2) {
				Certo()	
			} else {
				paraPontos3()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos3() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_3);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_3);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_3);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_3);
}

function botao1Clicado_3() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos3()
}

function botao2Clicado_3() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos3()
}

function botao3Clicado_3() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos3()
}

function botao4Clicado_3() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos3()
}

function Pontos3() {
	if(sorteio3 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 3) {
				Certo()
			} else {
				paraPontos4()
			}
		} else {
			Errado();
		}
	} else if (sorteio3 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 3) {
				Certo()	
			} else {
				paraPontos4()
			}
		} else {
			Errado()
		}
	} else if (sorteio3 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 3) {
				Certo()
			} else {
				paraPontos4()
			}
		} else {
			Errado()
		}
	} else if (sorteio3 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 3) {
				Certo()	
			} else {
				paraPontos4()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos4() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_4);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_4);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_4);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_4);
}

function botao1Clicado_4() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos4()
}

function botao2Clicado_4() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos4()
}

function botao3Clicado_4() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos4()
}

function botao4Clicado_4() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos4()
}

function Pontos4() {
	if(sorteio4 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 4) {
				Certo()
			} else {
				paraPontos5()
			}
		} else {
			Errado();
		}
	} else if (sorteio4 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 4) {
				Certo()	
			} else {
				paraPontos5()
			}
		} else {
			Errado()
		}
	} else if (sorteio4 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 4) {
				Certo()
			} else {
				paraPontos5()
			}
		} else {
			Errado()
		}
	} else if (sorteio4 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 4) {
				Certo()	
			} else {
				paraPontos5()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos5() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_5);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_5);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_5);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_5);
}

function botao1Clicado_5() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos5()
}

function botao2Clicado_5() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos5()
}

function botao3Clicado_5() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos5()
}

function botao4Clicado_5() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos5()
}

function Pontos5() {
	if(sorteio5 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 5) {
				Certo()
			} else {
				paraPontos6()
			}
		} else {
			Errado();
		}
	} else if (sorteio5 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 5) {
				Certo()	
			} else {
				paraPontos6()
			}
		} else {
			Errado()
		}
	} else if (sorteio5 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 5) {
				Certo()
			} else {
				paraPontos6()
			}
		} else {
			Errado()
		}
	} else if (sorteio5 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 5) {
				Certo()	
			} else {
				paraPontos6()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos6() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_6);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_6);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_6);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_6);
}

function botao1Clicado_6() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos6()
}

function botao2Clicado_6() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos6()
}

function botao3Clicado_6() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos6()
}

function botao4Clicado_6() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos6()
}

function Pontos6() {
	if(sorteio6 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 6) {
				Certo()
			} else {
				paraPontos7()
			}
		} else {
			Errado();
		}
	} else if (sorteio6 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 6) {
				Certo()	
			} else {
				paraPontos7()
			}
		} else {
			Errado()
		}
	} else if (sorteio6 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 6) {
				Certo()
			} else {
				paraPontos7()
			}
		} else {
			Errado()
		}
	} else if (sorteio6 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 6) {
				Certo()	
			} else {
				paraPontos7()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos7() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_7);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_7);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_7);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_7);
}

function botao1Clicado_7() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos7()
}

function botao2Clicado_7() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos7()
}

function botao3Clicado_7() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos7()
}

function botao4Clicado_7() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos7()
}

function Pontos7() {
	if(sorteio7 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 7) {
				Certo()
			} else {
				paraPontos8()
			}
		} else {
			Errado();
		}
	} else if (sorteio7 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 7) {
				Certo()	
			} else {
				paraPontos8()
			}
		} else {
			Errado()
		}
	} else if (sorteio7 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 7) {
				Certo()
			} else {
				paraPontos8()
			}
		} else {
			Errado()
		}
	} else if (sorteio7 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 7) {
				Certo()	
			} else {
				paraPontos8()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos8() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_8);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_8);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_8);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_8);
}

function botao1Clicado_8() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos8()
}

function botao2Clicado_8() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos8()
}

function botao3Clicado_8() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos8()
}

function botao4Clicado_8() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos8()
}

function Pontos8() {
	if(sorteio8 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 8) {
				Certo()
			} else {
				paraPontos9()
			}
		} else {
			Errado();
		}
	} else if (sorteio8 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 8) {
				Certo()	
			} else {
				paraPontos9()
			}
		} else {
			Errado()
		}
	} else if (sorteio8 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 8) {
				Certo()
			} else {
				paraPontos9()
			}
		} else {
			Errado()
		}
	} else if (sorteio8 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 8) {
				Certo()	
			} else {
				paraPontos9()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos9() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_9);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_9);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_9);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_9);
}

function botao1Clicado_9() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos9()
}

function botao2Clicado_9() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos9()
}

function botao3Clicado_9() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos9()
}

function botao4Clicado_9() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos9()
}

function Pontos9() {
	if(sorteio9 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 9) {
				Certo()
			} else {
				paraPontos10()
			}
		} else {
			Errado();
		}
	} else if (sorteio9 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 9) {
				Certo()	
			} else {
				paraPontos10()
			}
		} else {
			Errado()
		}
	} else if (sorteio9 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 9) {
				Certo()
			} else {
				paraPontos10()
			}
		} else {
			Errado()
		}
	} else if (sorteio9 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 9) {
				Certo()	
			} else {
				paraPontos10()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos10() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_10);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_10);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_10);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_10);
}

function botao1Clicado_10() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos10()
}

function botao2Clicado_10() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos10()
}

function botao3Clicado_10() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos10()
}

function botao4Clicado_10() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos10()
}

function Pontos10() {
	if(sorteio10 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 10) {
				Certo()
			} else {
				paraPontos11()
			}
		} else {
			Errado();
		}
	} else if (sorteio10 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 10) {
				Certo()	
			} else {
				paraPontos11()
			}
		} else {
			Errado()
		}
	} else if (sorteio10 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 10) {
				Certo()
			} else {
				paraPontos11()
			}
		} else {
			Errado()
		}
	} else if (sorteio10 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 10) {
				Certo()	
			} else {
				paraPontos11()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos11() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_11);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_11);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_11);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_11);
}

function botao1Clicado_11() {
	botao1 = true;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	Pontos11()
}

function botao2Clicado_11() {
	botao1 = false;
	botao2 = true;
	botao3 = false;
	botao4 = false;
	Pontos11()
}

function botao3Clicado_11() {
	botao1 = false;
	botao2 = false;
	botao3 = true;
	botao4 = false;
	Pontos11()
}

function botao4Clicado_11() {
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = true;
	Pontos11()
}

function Pontos11() {
	if(sorteio11 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 11) {
				Certo()
			} else {
				paraPontos12()
			}
		} else {
			Errado();
		}
	} else if (sorteio11 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 11) {
				Certo()	
			} else {
				paraPontos12()
			}
		} else {
			Errado()
		}
	} else if (sorteio11 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 11) {
				Certo()
			} else {
				paraPontos12()
			}
		} else {
			Errado()
		}
	} else if (sorteio11 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 11) {
				Certo()	
			} else {
				paraPontos12()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos12() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_12);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_12);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_12);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_12);
}

function botao1Clicado_12() {
	botao1 = true;
	Pontos12()
}

function botao2Clicado_12() {
	botao2 = true;	
	Pontos12()
}

function botao3Clicado_12() {
	botao3 = true;
	Pontos12()
}

function botao4Clicado_12() {
	botao4 = true;
	Pontos12()
}

function Pontos12() {
	if(sorteio12 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 12) {
				Certo()
			} else {
				paraPontos13()
			}
		} else {
			Errado();
		}
	} else if (sorteio12 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 12) {
				Certo()	
			} else {
				paraPontos13()
			}
		} else {
			Errado()
		}
	} else if (sorteio12 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 12) {
				Certo()
			} else {
				paraPontos13()
			}
		} else {
			Errado()
		}
	} else if (sorteio12 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 12) {
				Certo()	
			} else {
				paraPontos13()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos13() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_13);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_13);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_13);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_13);
}

function botao1Clicado_13() {
	botao1 = true;
	Pontos13()
}

function botao2Clicado_13() {
	botao2 = true;	
	Pontos13()
}

function botao3Clicado_13() {
	botao3 = true;
	Pontos13()
}

function botao4Clicado_13() {
	botao4 = true;
	Pontos13()
}

function Pontos13() {
	if(sorteio13 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 13) {
				Certo()
			} else {
				paraPontos14()
			}
		} else {
			Errado();
		}
	} else if (sorteio13 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 13) {
				Certo()	
			} else {
				paraPontos14()
			}
		} else {
			Errado()
		}
	} else if (sorteio13 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 13) {
				Certo()
			} else {
				paraPontos14()
			}
		} else {
			Errado()
		}
	} else if (sorteio13 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 13) {
				Certo()	
			} else {
				paraPontos14()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos14() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_14);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_14);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_14);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_14);
}

function botao1Clicado_14() {
	botao1 = true;
	Pontos14()
}

function botao2Clicado_14() {
	botao2 = true;	
	Pontos14()
}

function botao3Clicado_14() {
	botao3 = true;
	Pontos14()
}

function botao4Clicado_14() {
	botao4 = true;
	Pontos14()
}

function Pontos14() {
	if(sorteio14 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 14) {
				Certo()
			} else {
				paraPontos15()
			}
		} else {
			Errado();
		}
	} else if (sorteio14 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 14) {
				Certo()	
			} else {
				paraPontos15()
			}
		} else {
			Errado()
		}
	} else if (sorteio14 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 14) {
				Certo()
			} else {
				paraPontos15()
			}
		} else {
			Errado()
		}
	} else if (sorteio14 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 14) {
				Certo()	
			} else {
				paraPontos15()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos15() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_15);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_15);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_15);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_15);
}

function botao1Clicado_15() {
	botao1 = true;
	Pontos15()
}

function botao2Clicado_15() {
	botao2 = true;	
	Pontos15()
}

function botao3Clicado_15() {
	botao3 = true;
	Pontos15()
}

function botao4Clicado_15() {
	botao4 = true;
	Pontos15()
}

function Pontos15() {
	if(sorteio15 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 15) {
				Certo()
			} else {
				paraPontos16()
			}
		} else {
			Errado();
		}
	} else if (sorteio15 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 15) {
				Certo()	
			} else {
				paraPontos16()
			}
		} else {
			Errado()
		}
	} else if (sorteio15 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 15) {
				Certo()
			} else {
				paraPontos16()
			}
		} else {
			Errado()
		}
	} else if (sorteio15 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 15) {
				Certo()	
			} else {
				paraPontos16()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos16() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_16);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_16);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_16);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_16);
}

function botao1Clicado_16() {
	botao1 = true;
	Pontos16()
}

function botao2Clicado_16() {
	botao2 = true;	
	Pontos16()
}

function botao3Clicado_16() {
	botao3 = true;
	Pontos16()
}

function botao4Clicado_16() {
	botao4 = true;
	Pontos16()
}

function Pontos16() {
	if(sorteio16 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 16) {
				Certo()
			} else {
				paraPontos17()
			}
		} else {
			Errado();
		}
	} else if (sorteio16 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 16) {
				Certo()	
			} else {
				paraPontos17()
			}
		} else {
			Errado()
		}
	} else if (sorteio16 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 16) {
				Certo()
			} else {
				paraPontos17()
			}
		} else {
			Errado()
		}
	} else if (sorteio16 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 16) {
				Certo()	
			} else {
				paraPontos17()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos17() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_17);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_17);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_17);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_17);
}

function botao1Clicado_17() {
	botao1 = true;
	Pontos17()
}

function botao2Clicado_17() {
	botao2 = true;	
	Pontos17()
}

function botao3Clicado_17() {
	botao3 = true;
	Pontos17()
}

function botao4Clicado_17() {
	botao4 = true;
	Pontos17()
}

function Pontos17() {
	if(sorteio17 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 17) {
				Certo()
			} else {
				paraPontos18()
			}
		} else {
			Errado();
		}
	} else if (sorteio17 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 17) {
				Certo()	
			} else {
				paraPontos18()
			}
		} else {
			Errado()
		}
	} else if (sorteio17 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 17) {
				Certo()
			} else {
				paraPontos18()
			}
		} else {
			Errado()
		}
	} else if (sorteio17 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 17) {
				Certo()	
			} else {
				paraPontos18()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos18() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_18);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_18);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_18);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_18);
}

function botao1Clicado_18() {
	botao1 = true;
	Pontos18()
}

function botao2Clicado_18() {
	botao2 = true;	
	Pontos18()
}

function botao3Clicado_18() {
	botao3 = true;
	Pontos18()
}

function botao4Clicado_18() {
	botao4 = true;
	Pontos18()
}

function Pontos18() {
	if(sorteio18 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 18) {
				Certo()
			} else {
				paraPontos19()
			}
		} else {
			Errado();
		}
	} else if (sorteio18 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 18) {
				Certo()	
			} else {
				paraPontos19()
			}
		} else {
			Errado()
		}
	} else if (sorteio18 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 18) {
				Certo()
			} else {
				paraPontos19()
			}
		} else {
			Errado()
		}
	} else if (sorteio18 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 18) {
				Certo()	
			} else {
				paraPontos19()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos19() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_19);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_19);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_19);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_19);
}

function botao1Clicado_19() {
	botao1 = true;
	Pontos19()
}

function botao2Clicado_19() {
	botao2 = true;	
	Pontos19()
}

function botao3Clicado_19() {
	botao3 = true;
	Pontos19()
}

function botao4Clicado_19() {
	botao4 = true;
	Pontos19()
}

function Pontos19() {
	if(sorteio19 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 19) {
				Certo()
			} else {
				paraPontos20()
			}
		} else {
			Errado();
		}
	} else if (sorteio19 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 19) {
				Certo()	
			} else {
				paraPontos20()
			}
		} else {
			Errado()
		}
	} else if (sorteio19 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 19) {
				Certo()
			} else {
				paraPontos20()
			}
		} else {
			Errado()
		}
	} else if (sorteio19 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 19) {
				Certo()	
			} else {
				paraPontos20()
			}
		} else {
			Errado()
		}
	}
}

function paraPontos20() {
	reset();
	document.getElementById('botao1').addEventListener("click", botao1Clicado_20);
	document.getElementById('botao2').addEventListener("click", botao2Clicado_20);
	document.getElementById('botao3').addEventListener("click", botao3Clicado_20);
	document.getElementById('botao4').addEventListener("click", botao4Clicado_20);
}

function botao1Clicado_20() {
	botao1 = true;
	Pontos20()
}

function botao2Clicado_20() {
	botao2 = true;	
	Pontos20()
}

function botao3Clicado_20() {
	botao3 = true;
	Pontos20()
}

function botao4Clicado_20() {
	botao4 = true;
	Pontos20()
}

function Pontos20() {
	if(sorteio20 == 1) {
		//Vermelho
		if (botao1 == true) {
			if (numeroJogadas == 20) {
				Certo()
			} else {
				paraPontos20()
			}
		} else {
			Errado();
		}
	} else if (sorteio20 == 2) {
		//Verde
		if (botao2 == true) {
			if (numeroJogadas == 20) {
				Certo()	
			} else {
				paraPontos20()
			}
		} else {
			Errado()
		}
	} else if (sorteio20 == 3) {
		//Azul
		if (botao3 == true) {
			if (numeroJogadas == 20) {
				Certo()
			} else {
				paraPontos20()
			}
		} else {
			Errado()
		}
	} else if (sorteio20 == 4) {
		//Amarelo
		if (botao4 == true) {
			if (numeroJogadas == 20) {
				Certo()	
			} else {
				paraPontos20()
			}
		} else {
			Errado()
		}
	}
}

function Certo() {
	pontos = pontos + 1;
	document.getElementById('value').style.color = "green"
	document.getElementById('value').innerHTML = "Acertou!"
	Jogar()
}

function Errado() {
	document.getElementById('noticias').style.display = "none";
	document.getElementById('value').style.color = "red";
	document.getElementById('conteudo').innerHTML = "Perdeu";
	document.getElementById('textoBotao').style.backgroundColor = "whitesmoke";
	document.getElementById('conteudo').style.color = "rgb(255, 70, 70)";
	document.getElementById('Jogar').innerHTML = "Reiniciar";
	document.getElementById('botaoJogar').style.backgroundColor = "grey";
	document.getElementById('botao1').style.backgroundColor = "grey";
	document.getElementById('botao2').style.backgroundColor = "grey";
	document.getElementById('botao3').style.backgroundColor = "grey";
	document.getElementById('botao4').style.backgroundColor = "grey";
	document.getElementById('respostaCorreta').style.display = "inherit";
	reset();
	estaJogando = false;
}

function reset() {
	document.getElementById('botao1').removeEventListener("click", botao1Clicado);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_2);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_2);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_2);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_2);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_3);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_3);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_3);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_3);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_4);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_4);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_4);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_4);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_5);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_5);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_5);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_5);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_6);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_6);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_6);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_6);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_7);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_7);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_7);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_7);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_8);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_8);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_8);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_8);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_9);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_9);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_9);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_9);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_10);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_10);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_10);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_10);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_11);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_11);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_11);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_11);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_12);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_12);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_12);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_12);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_13);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_13);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_13);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_13);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_14);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_14);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_14);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_14);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_15);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_15);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_15);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_15);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_16);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_16);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_16);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_16);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_17);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_17);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_17);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_17);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_18);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_18);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_18);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_18);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_19);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_19);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_19);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_19);
	document.getElementById('botao1').removeEventListener("click", botao1Clicado_20);
	document.getElementById('botao2').removeEventListener("click", botao2Clicado_20);
	document.getElementById('botao3').removeEventListener("click", botao3Clicado_20);
	document.getElementById('botao4').removeEventListener("click", botao4Clicado_20);

	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = false;
}

function resetVar() {
	corSorteada = 0;
	botao1 = false;
	botao2 = false;
	botao3 = false;
	botao4 = false;
	sorteio1 = 0;
	sorteio2 = 0;
	sorteio3 = 0;
	sorteio4 = 0;
	sorteio5 = 0;
	sorteio6 = 0;
	sorteio7 = 0;
	sorteio8 = 0;
	sorteio9 = 0;
	sorteio10 = 0;
	sorteio11 = 0;
	sorteio12 = 0;
	sorteio13 = 0;
	sorteio14 = 0;
	sorteio15 = 0;
	sorteio16 = 0;
	sorteio17 = 0;
	sorteio18 = 0;
	sorteio19 = 0;
	sorteio20 = 0;
	numeroJogadas = 0;
	pontos = 0;
	estaJogando = false;
	intervalo = 800;
	intervalo2 = 0;
	intervalo3 = 0;
	intervalo4 = 0;
	intervalo5 = 0;
	intervalo6 = 0;
	intervalo7 = 0;
	intervalo8 = 0;
	intervalo9 = 0;
	intervalo10 = 0;
	intervalo11 = 0;
	intervalo12 = 0;
	intervalo13 = 0;
	intervalo14 = 0;
	intervalo15 = 0;
	intervalo16 = 0;
	intervalo17 = 0;
	intervalo18 = 0;
	intervalo19 = 0;
	intervalo20 = 0;
}

function respostaCorreta() {
	intervalo = 800;
	document.getElementById('conteudo').style.color = "white";
	Memoria();
	resetVar();
}
