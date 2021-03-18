var ultimaCor;
var aberto;
var bloquear = false;
var paraCima = true;
var emBaixo = 1;

function openNav() {
	if (!aberto) {
		document.getElementById("menu").style.top = "-70px"
		document.getElementById("sidebar").style.width = "250px";
		document.getElementById("secoes").style.marginLeft = "250px";
		document.getElementById("secoes").style.opacity = "0.5";
		document.getElementById("arrow").style.cursor = "initial";
		document.getElementById("arrow-container").style.bottom = "-40px";
		setTimeout(function() {
			document.getElementById("itens").style.opacity = "1"
			document.getElementById("itens").style.marginLeft = "0"
		}, 250)
		aberto = true;
	}
}

function closeNav() {
	if (aberto) {
		document.getElementById("menu").style.top = "0px"
		document.getElementById("sidebar").style.width = "0px";
		document.getElementById("secoes").style.marginLeft = "0px";
		document.getElementById("secoes").style.opacity = "1";
		document.getElementById("arrow").style.cursor = "pointer";
		document.getElementById("arrow-container").style.bottom = "30px";
		document.getElementById("itens").style.opacity = "0"
		document.getElementById("itens").style.marginLeft = "-100px"
		aberto = false;
	}
}

var lastScrollTop = window.pageYOffset;

function isScrolling() {
	if (!bloquear) {
		var st = window.pageYOffset || document.documentElement.scrollTop;
		if (aberto) {
			closeNav()
		}
		if (window.scrollY < 10) { 
			document.getElementById("menu").style.top = "0px";
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
			document.getElementById("menu").style.backdropFilter = "none";
			document.getElementById("arrow").style.cursor = "pointer";
			document.getElementById("arrow-container").style.bottom = "30px";
			emBaixo = 1;
			ultimaCor = "rgba(0, 0, 0, 0)"
		} else if (st > lastScrollTop) {
			document.getElementById("menu").style.top = "-70px";
			document.getElementById("menu").style.backgroundColor = ultimaCor;
			document.getElementById("arrow").style.cursor = "initial";
			document.getElementById("arrow-container").style.bottom = "-40px";
			emBaixo = 0;
		} else {
			document.getElementById("menu").style.top = "0px";
			if (window.scrollY < 100) {
				document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
				document.getElementById("menu").style.backdropFilter = "none";
			} else {
				document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
				document.getElementById("menu").style.backdropFilter = "blur(5px)";	
			}
			document.getElementById("arrow").style.cursor = "pointer";
			document.getElementById("arrow-container").style.bottom = "30px";
			emBaixo = 1;
			ultimaCor = "rgba(0, 0, 0, 0.5)"
		}
		lastScrollTop = st <= 0 ? 0 : st;
	}
}

var timer = null;
function scrollStop() {
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(function() {
		if (bloquear) {
			bloquear = false;
		}
		if (window.scrollY < 10 && paraCima == false) {
			document.getElementById("arrow").style.transform = "rotate(360deg)"
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
			document.getElementById("menu").style.backdropFilter = "none";
			document.getElementById("menu").style.top = "0px";
			paraCima = true;
		} else if (document.getElementById("contato").getBoundingClientRect().top < 200) {
			document.getElementById("arrow").style.transform = "rotate(180deg)"
			document.getElementById("arrow").style.cursor = "pointer";
			document.getElementById("arrow-container").style.bottom = "30px";
			paraCima = false;
		} else if (window.scrollY < 10) {
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
			document.getElementById("menu").style.backdropFilter = "none";
			document.getElementById("menu").style.top = "0px";
		}
	}, 150);
}

function scroll(id) {
	bloquear = true
	document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
	document.getElementById("menu").style.backdropFilter = "blur(5px)";
	document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function Integrantes() {
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("integrantes")
		}, 500)
	} else {
		scroll("integrantes")
	}
}

function Robos() {
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("robos")
		}, 500)
	} else {
		scroll("robos")
	}
}

function Competicoes() {
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("competicoes")
		}, 500)
	} else {
		scroll("competicoes")
	}
}

function Contato() {
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("contato")
		}, 500)
	} else {
		scroll("contato")
	}
}

function seta() {
	if (!bloquear) {
		var ids = ["inicial", "integrantes", "robos", "robos2", "competicoes", "competicoes2", "contato"]
		for (var i = 0; i < ids.length; i++) {
			if (paraCima && document.getElementById(ids[i]).getBoundingClientRect().top > 200) {
				scroll(ids[i])
				break;
			} else if (!paraCima && document.getElementById(ids[i]).getBoundingClientRect().top > -200) {
				scroll(ids[i-1])
				break;
			}
		}
	}
}

function carregar() {
	setTimeout(function() {
		document.body.style.transition = "opacity 0.3s"
		document.body.style.opacity = "0"
		setTimeout(function() {
			document.getElementById("carregando").style.display = "none"
			document.getElementById("conteudo").style.display = "initial"
			document.body.style.transition = "opacity 1s"
			document.body.style.opacity = "1"
			window.addEventListener('scroll', scrollStop, false);
			if (localStorage.getItem("autoScroll") == 1) {
				window.scrollTo(0, localStorage.getItem("scrollPosition"))
				if (localStorage.getItem("scrollPosition") < 10) {
					document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
					document.getElementById("menu").style.backdropFilter = "none";
				} else {
					document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
					document.getElementById("menu").style.backdropFilter = "blur(5px)";	
				}
			}
			setTimeout(function() {
				document.getElementById("menu").style.top = "0"
				document.getElementById("arrow-container").style.bottom = "30px"
				window.addEventListener("scroll", isScrolling, false);
			}, 200)
		}, 300)
	}, 50)
}

window.addEventListener('beforeunload', function() {
	localStorage.setItem("autoScroll", 0);
	localStorage.setItem("scrollPosition", window.pageYOffset);
});

function logo() {
	if (window.scrollY < 10) {
		window.open("file:///C:/Users/lucas/Desktop/gewinner/index.html", "_self");
	} else {
		scroll("inicial")
	}
}

window.addEventListener("scroll", isElementInViewport)

var estado = [false, false, false, false, false, false, false, false]

function isElementInViewport () {
	if (!estado[0] && document.getElementById("jorge").getBoundingClientRect().top < (window.innerHeight/1.5)) {
		document.getElementById("jorge").style.marginLeft = "0"
		document.getElementById("jorge").style.opacity = "1"
		estado[0] = true;
	}
	if (!estado[1] && document.getElementById("fischer").getBoundingClientRect().top < (window.innerHeight/1.5)) {
		document.getElementById("fischer").style.opacity = "1"
		estado[1] = true;
	}
	if ( !estado[2] &&document.getElementById("theodoro").getBoundingClientRect().top < (window.innerHeight/1.5)) {
		document.getElementById("theodoro").style.marginLeft = "0"
		document.getElementById("theodoro").style.opacity = "1"
		estado[2] = true;
	}
	if (!estado[3] && document.getElementById("robos2").getBoundingClientRect().top < (window.innerHeight/1.5)) {
		document.getElementById("robos2").style.opacity = "1"
		estado[3] = true;
	}
	if (!estado[4] && document.getElementById("competicoes2").getBoundingClientRect().top < (window.innerHeight/1.5)) {
		document.getElementById("competicoes2").style.opacity = "1"
		estado[4] = true;
	}
	if (!estado[5] && document.getElementById("subtituloRobos").getBoundingClientRect().top < (window.innerHeight/1.2)) {
		document.getElementById("subtituloRobos").style.opacity = "1"
		document.getElementById("subtituloRobos").style.marginLeft = "0"
		estado[5] = true;
	}
	if (!estado[6] && document.getElementById("subtituloCompeticoes").getBoundingClientRect().top < (window.innerHeight/1.2)) {
		document.getElementById("subtituloCompeticoes").style.opacity = "1"
		document.getElementById("subtituloCompeticoes").style.marginLeft = "0"
		estado[6] = true;
	}
	if (!estado[7] && document.getElementById("subtituloContato").getBoundingClientRect().top < (window.innerHeight/1.2)) {
		document.getElementById("contato").style.opacity = "1"
		document.getElementById("contato").style.transform = "scale(1)"
		estado[7] = true;
	}
	if (estado[0] && estado.every( (val, i, arr) => val === arr[0] )) {
		window.removeEventListener("scroll", isElementInViewport)
	}
}