var vitorias = 0;
var derrotas = 0;
var carteira = 50;
var numeroPar = 0;
var numeroImpar = 0;
var numeroParDerrotas = 0;
var numeroImparDerrotas = 0;
var numeroParAcertos = 0;
var numeroImparAcertos = 0;
var dinheiroTotalApostado = 0;
var valorPerdido = 0;
var valorGanho = 0;
			
function Apostar() {
	var sorteio = Math.floor(Math.random() * 10);
	var aposta = document.getElementById("apostas").value;
	var valorA = parseInt(document.getElementById('valorAposta').value);
	if (valorA >= 1) {
		if(document.getElementById('valorAposta').value != '') {
			if(valorA <= carteira) {
				if(carteira > 0) {
					document.getElementById('numeroSorteado').innerHTML = sorteio;
					dinheiroTotalApostado= dinheiroTotalApostado + valorA;
					if (sorteio % 2 == 0 && aposta == "par") {
						//par
						vitorias = vitorias +1;
						document.getElementById("pts-vitoria").innerHTML = vitorias;
						document.getElementById("status").style.opacity = '1';
						document.getElementById("status").innerHTML = 'Ganhou!';
						if (document.getElementById('status').style.color == 'green') {
							document.getElementById('status').style.color = 'darkgreen'
						} else {
							document.getElementById('status').style.color = 'green';
						}
						carteira = carteira + valorA;
						document.getElementById('valor').innerHTML = "R$" + carteira + ",00";
						numeroPar = numeroPar + 1;
						numeroParAcertos = numeroParAcertos + 1;
						valorGanho = valorGanho +  valorA;
					} else if (sorteio % 2 != 0 && aposta == "impar") {
						//impar
						vitorias = vitorias + 1;
						document.getElementById("pts-vitoria").innerHTML = vitorias;
						document.getElementById("status").style.opacity = '1';
						document.getElementById("status").innerHTML = 'Ganhou!';
						if (document.getElementById('status').style.color == 'green') {
							document.getElementById('status').style.color = 'darkgreen'
						} else {
							document.getElementById('status').style.color = 'green';
						}
						carteira = parseInt(carteira + valorA);
						document.getElementById('valor').innerHTML = "R$" + carteira + ",00";
						numeroImpar = numeroImpar + 1;
						numeroImparAcertos = numeroImparAcertos + 1;
						valorGanho = valorGanho +  valorA;
					} else {
						if(sorteio % 2 == 0) {
							//perdeu e é par
							numeroPar = numeroPar + 1;
							numeroImparDerrotas = numeroImparDerrotas + 1;
						} else {
							//perdeu e é ímpar
							numeroImpar = numeroImpar + 1;
							numeroParDerrotas = numeroParDerrotas + 1;
						}
						derrotas = derrotas +1;
						document.getElementById("pts-derrota").innerHTML = derrotas;
						document.getElementById("status").style.opacity = '1';
						document.getElementById("status").innerHTML = 'Perdeu!';
						if (document.getElementById('status').style.color == 'red') {
							document.getElementById('status').style.color = 'orange'
						} else {
							document.getElementById('status').style.color = 'red';
						}
						carteira = parseInt(carteira - valorA);
						valorPerdido = valorPerdido + valorA;
						document.getElementById('valor').innerHTML = "R$" + carteira + ",00";	
					}
				} else {
					window.alert('Adicione mais dinheiro')
				}
			} else {
				window.alert('Você não pode apostar mais do que tem!')
			}
		} else {
			window.alert('Aposte algum valor!')
		}
	} else {
		window.alert('O valor mínimo da aposta é R$1,00')
	}
}
function Estatisticas() {
	document.getElementById('vezesPar').innerHTML = numeroPar;
	document.getElementById('vezesImpar').innerHTML = numeroImpar;
	document.getElementById('parDerrota').innerHTML = numeroParDerrotas;
	document.getElementById('parAcerto').innerHTML = numeroParAcertos;
	document.getElementById('imparDerrota').innerHTML = numeroImparDerrotas;
	document.getElementById('imparAcerto').innerHTML = numeroImparAcertos;
	document.getElementById('totalDinheiro').innerHTML = "R$" + dinheiroTotalApostado + ",00";
	document.getElementById('dinheiroPerdido').innerHTML = "R$" + valorPerdido + ",00";
	document.getElementById('dinheiroGanho').innerHTML = "R$" + valorGanho + ",00";
	document.getElementById('conteudo').style.display = "none";
	document.getElementById('estatisticas').style.display = "inherit";
}

function Inicial() {
	document.getElementById('conteudo').style.display = "inherit";
	document.getElementById('estatisticas').style.display = "none";
}

function sumir() {
	document.getElementById("status").style.opacity = '1';
}

function primeira() {
	document.getElementById('estatisticas').style.display = "none";
	document.getElementById('estatisticasAvancadas').style.display = "inherit";
}