var ultimaCor;
var aberto;
var bloquear = false;
var paraCima = true;

function openNav() {
	document.getElementById("menu").style.top = "-70px"
	document.getElementById("sidebar").style.width = "250px";
	document.getElementById("secoes").style.marginLeft = "250px";
	document.getElementById("secoes").style.opacity = "0.5";
	document.getElementById("arrow").style.cursor = "initial";
	document.getElementById("arrow-container").style.bottom = "-40px";
	setTimeout(function() {
		document.getElementById("itens").style.opacity = "1"
	}, 200)
	aberto = true;
}

function closeNav() {
	document.getElementById("menu").style.top = "0px"
	document.getElementById("sidebar").style.width = "0px";
	document.getElementById("secoes").style.marginLeft = "0px";
	document.getElementById("secoes").style.opacity = "1";
	document.getElementById("arrow").style.cursor = "pointer";
	document.getElementById("arrow-container").style.bottom = "30px";
	document.getElementById("itens").style.opacity = "0"
	aberto = false;
}

var lastScrollTop = window.pageYOffset;

window.addEventListener("scroll", function(){
	if (!bloquear) {
		var st = window.pageYOffset || document.documentElement.scrollTop;
		closeNav()
		if (window.scrollY == 0) { 
			document.getElementById("menu").style.top = "0px";
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
			document.getElementById("menu").style.backdropFilter = "none";
			document.getElementById("arrow").style.cursor = "pointer";
			document.getElementById("arrow-container").style.bottom = "30px";
			ultimaCor = "rgba(0, 0, 0, 0)"
		} else if (st > lastScrollTop) {
			document.getElementById("menu").style.top = "-70px";
			document.getElementById("menu").style.backgroundColor = ultimaCor;
			document.getElementById("arrow").style.cursor = "initial";
			document.getElementById("arrow-container").style.bottom = "-40px";
		} else {
			document.getElementById("menu").style.top = "0px";
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
			document.getElementById("menu").style.backdropFilter = "blur(5px)";
			document.getElementById("arrow").style.cursor = "pointer";
			document.getElementById("arrow-container").style.bottom = "30px";
			ultimaCor = "rgba(0, 0, 0, 0.5)"
		}
		lastScrollTop = st <= 0 ? 0 : st;	
	}
}, false);

var timer = null;
window.addEventListener('scroll', function() {
	if (timer !== null) {
		clearTimeout(timer);
	}
	timer = setTimeout(function() {
		if (bloquear) {
			bloquear = false;
		}
		if (document.getElementById("contato").getBoundingClientRect().top < 200) {
			document.getElementById("arrow").style.transform = "rotate(180deg)"
			document.getElementById("arrow").style.cursor = "pointer";
			document.getElementById("arrow-container").style.bottom = "30px";
			paraCima = false;
		} else if (window.scrollY == 0) {
			document.getElementById("arrow").style.transform = "rotate(360deg)"
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
			document.getElementById("menu").style.backdropFilter = "none";
			document.getElementById("menu").style.top = "0px";
			paraCima = true;
		}
	}, 70);
}, false);

function scroll(id) {
	document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function Sobre() {
	if (aberto == true) {
		closeNav()
		setTimeout(function() {
			scroll("sobre")
		}, 500)
	} else {
		scroll("sobre")
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
		var ids = ["inicial", "sobre", "integrantes", "robos", "robos2", "competicoes", "competicoes2", "contato"]
		bloquear = true
		for (var i = 0; i < ids.length; i++) {
			if (paraCima && document.getElementById(ids[i]).getBoundingClientRect().top > 200) {
				scroll(ids[i])
				break;
			} else if (!paraCima && document.getElementById(ids[i]).getBoundingClientRect().top > -200) {
				scroll(ids[i-1])
				break;
			}
		}
		document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		document.getElementById("menu").style.backdropFilter = "blur(5px)";
	}
}