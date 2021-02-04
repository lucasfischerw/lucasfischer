//Carregamento

async function preLoad(url) {
	var img = new Image();
	img.src = url;
return;
}

async function Carregou() {
	document.getElementById("carregando").classList.add("fadeout")
	document.getElementById("primeiraPag").scrollIntoView({ block: 'start'});
	setTimeout(function() {
		document.getElementById('carregando').style.display = "none";
		document.getElementById('content').style.display = "inherit";
	}, 300)
	document.getElementById("content").classList.add("fadein")
	document.getElementById("menu").classList.add("fadedown");
	setTimeout(function(){
		document.getElementById('nomeCima').classList.add("fadeup");
		document.getElementById('nomeCima').style.opacity = "1.0";
		document.getElementById("imagemPessoal").classList.add("grow");
		document.getElementById('imagemPessoal').style.opacity = "1.0";
		setTimeout(function() {
			document.getElementById('nome').classList.add("fadein");
		}, 800)
	}, 500)
	setTimeout(function(){
		document.getElementById("menu").classList.remove("fadedown");
		document.getElementById("content").classList.remove("fadein");
	}, 900)
}

//Menus

var aberto = false;
var ultimaCor = "none"

function openNav() {
	document.getElementById("menu").classList.add("fadeupmenu")
	setTimeout(function(){
		if (document.body.clientWidth > 626) {
			document.getElementById("conteudo").style.marginLeft = "40vw";
		} else {
			document.getElementById("conteudo").style.marginLeft = "250px";
		}
		document.getElementById("sidebar").style.width = "40vw";
		document.getElementById("sidebar").style.minWidth = "250px";
		jQuery('.secao').css('opacity', '0.5');
		document.body.style.overflowY = "hidden";
		window.addEventListener("scroll", closeNav);
		window.addEventListener("touchmove", closeNav);
		aberto = true;
	}, 50)
}

function closeNav() {
	if (aberto == true) {
		document.getElementById("menu").classList.remove("fadeupmenu")
		document.getElementById("botaoExpandir").style.backgroundColor = "transparent !important"
		document.getElementById("botaoExpandir").style.color = "white !important"
		document.getElementById("sidebar").style.minWidth = "0px";
		document.getElementById("sidebar").style.width = "0px";
		document.getElementById("conteudo").style.marginLeft = "0px";
		jQuery('.secao').css('opacity', '1');
		document.getElementById("menu").classList.add("fadedown");
		window.removeEventListener("scroll", closeNav);
		window.removeEventListener("touchmove", closeNav);
		setTimeout(function() {
			document.getElementById("menu").classList.remove("fadedown");
		}, 400)
		document.body.style.overflowY = "inherit";
		aberto = false;
	}
}

var menuEmBaixo = true;
var lastScrollTop = window.pageYOffset;
window.addEventListener("scroll", scrolling);

function scrolling() {
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (window.scrollY == 0) {
		document.getElementById("menu").style.top = "0px";
		document.getElementById("menu").style.backgroundColor = "rgba(30, 30, 30, 0)";
		ultimaCor = "rgba(30, 30, 30, 0)"
		menuEmBaixo = true;
	} else if (st > lastScrollTop) {
		document.getElementById("menu").style.top = "-70px";
		menuEmBaixo = false;
		setTimeout(function() {
			document.getElementById("menu").style.backgroundColor = ultimaCor;
		}, 200)
	} else {
		document.getElementById("menu").style.top = "0px";
		document.getElementById("menu").style.backgroundColor = "rgba(30, 30, 30, 0.5)";
		ultimaCor = "rgba(30, 30, 30, 0.5)"
		menuEmBaixo = true;
	}
	lastScrollTop = st <= 0 ? 0 : st;
}


//Botões Menu

function scroll(id) {
	document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function Sobre() {
	document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
	ultimaCor = "rgba(0, 0, 0, 0)"
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("sobre")
		}, 300)
	} else {
		scroll("sobre")
	}
}

function Programacao() {
	document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
	ultimaCor = "rgba(0, 0, 0, 0)"
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("programacao")
		}, 300)
	} else {
		scroll("programacao")
	}
}

function Projetos() {
	document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
	ultimaCor = "rgba(0, 0, 0, 0)"
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("projetos")
		}, 300)
	} else {
		scroll("projetos")
	}
}

function Contato() {
	document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
	ultimaCor = "rgba(0, 0, 0, 0)"
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("contato")
		}, 300)
	} else {
		scroll("contato")
	}
}

function Nome() {
	if (window.scrollY == 0) {
		window.open("https://lucasfischer.com.br/index.html", "_self");
	} else {
		document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
		ultimaCor = "rgba(0, 0, 0, 0)"
		scroll("primeiraPag")
	}
}

function projeto(id) {
	if (id == 1) {
		window.open("https://teamgewinner.github.io/gewinner/index.html");
	} else if (id == 2) {
		window.open("https://lucasfischer.com.br/projetos/apostador/index.html")
	} else if (id == 3) {
		window.open("https://lucasfischer.com.br/projetos/memoria/index.html")
	} else if (id == 4) {
		window.open("https://lucasfischer.com.br/projetos/genius/index.html")
	} else if (id == 5) {
		window.open("https://lucasfischer.com.br/projetos/tarefas/index.html")
	}
}

var scrollPosition;
var posicaoMenu;

function todosOsProjetos(funcao) {
	if (funcao == "abrir") {
		scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
		if (menuEmBaixo == true) {
			posicaoMenu = "baixo"
		} else {
			posicaoMenu = "cima"
		}
		document.getElementById('content').classList.remove("fadeinfast");
		document.getElementById('todosOsProjetos').classList.remove("fadeout");
		document.getElementById('content').classList.add("fadeout");
		setTimeout(function() {
			document.getElementById('content').style.display = "none";
			document.getElementById('todosOsProjetos').classList.add("fadeinfast");
			document.getElementById('todosOsProjetos').style.display = "inherit";
			document.getElementById("todosOsProjetos").scrollIntoView({ block: 'start'});
		}, 300)
	} else {
		document.getElementById('todosOsProjetos').classList.remove("fadeinfast");
		document.getElementById('content').classList.remove("fadeout");
		document.getElementById('todosOsProjetos').classList.add("fadeout");
		setTimeout(function() {
			document.getElementById('todosOsProjetos').style.display = "none";
			document.getElementById('content').classList.add("fadeinfast");
			document.getElementById('content').style.display = "inherit";
			if (posicaoMenu == "baixo") {
				setTimeout(function() {
					document.getElementById("menu").style.top = "0px";
					document.getElementById("menu").style.backgroundColor = "rgba(30, 30, 30, 0.5)";
					ultimaCor = "rgba(30, 30, 30, 0.5)"
					menuEmBaixo = true;
				}, 20)	
			} else {
				document.getElementById("menu").style.top = "-70px";
				menuEmBaixo = false;
			}
			window.scrollTo(0, scrollPosition);
		}, 300)
	}
}

//window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
	//if (event.matches) {
		//Escuro
	//} else {
		//Claro
	//}
//})