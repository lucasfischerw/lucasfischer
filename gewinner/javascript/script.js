var Aberto = false;
var Secoes = ["equipe", "galeria", "competicoes", "contato"];

function OpenNav() {
	if(!Aberto) {
		document.getElementById("secoes").style.transition = ".5s margin cubic-bezier(0.18, 0.89, 0.32, 1.28), .5s opacity";
		document.getElementById("sidebar").style.transition = ".5s width cubic-bezier(0.18, 0.89, 0.32, 1.28)";
		document.getElementById("menu").style.top = "-70px"
		document.getElementById("sidebar").style.width = "250px";
		document.getElementById("secoes").style.marginLeft = "250px";
		document.getElementById("secoes").style.opacity = "0.5";
		document.getElementById("secoes").style.filter = "blur(5px)";
		setTimeout(function() {
			document.getElementById("itens").style.opacity = "1"
			document.getElementById("itens").style.marginLeft = "0"
		}, 150)
		Aberto = true;
	}
}

function CloseNav() {
	if(Aberto) {
		document.getElementById("itens").style.opacity = "0"
		document.getElementById("itens").style.marginLeft = "-100px"
		document.getElementById("menu").style.top = "0px"
		document.getElementById("sidebar").style.width = "0px";
		document.getElementById("secoes").style.marginLeft = "0px";
		document.getElementById("secoes").style.opacity = "1";
		document.getElementById("secoes").style.filter = "none";
		Aberto = false;
	}
}

var lastScrollTop = window.pageYOffset;

function isScrolling() {
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastScrollTop+0.5) {
		document.getElementById("menu").style.top = "-70px";
	} else {
		document.getElementById("menu").style.top = "0px";
		if(window.scrollY < 10) {
			document.getElementById("menu").style.backdropFilter = "none";
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
		} else {
			document.getElementById("menu").style.backdropFilter = "blur(5px)";
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.7)";
		}
	}
	lastScrollTop = st <= 0 ? 0 : st;
}

function Scroll(id) {
	if(Aberto) {
		document.getElementById("secoes").style.transition = ".5s margin ease, .5s opacity, .5s filter linear, .5s -webkit-filter linear";
		document.getElementById("sidebar").style.transition = ".5s width ease";
		CloseNav();
		setTimeout(function() {
			document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
		}, 500)
	} else {
		document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
	}
}

function Carregando() {
	if(localStorage.getItem("scrollPosition") != 0) {
		document.getElementById("carregando").style.display = "none"
		document.getElementById("conteudo").style.display = "initial"
		document.body.style.opacity = "0"
		window.scrollTo({
			left: 0,
			top: localStorage.getItem("scrollPosition"),
			behavior: 'instant'
		});
		setTimeout(() => {
			document.body.style.transition = "opacity 1s"
			document.body.style.opacity = "1"
			if (localStorage.getItem("scrollPosition") < 10) {
				document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
				document.getElementById("menu").style.backdropFilter = "none";
			} else {
				document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.3)";
				document.getElementById("menu").style.backdropFilter = "blur(5px)";
			}
			localStorage.setItem("scrollPosition", 0);
		}, 50);
	} else {
		document.body.style.transition = "opacity 0.3s"
		document.body.style.opacity = "0"
		setTimeout(function() {
			document.getElementById("carregando").style.display = "none"
			document.getElementById("conteudo").style.display = "initial"
			window.scrollTo(0, localStorage.getItem("scrollPosition"))
			document.body.style.transition = "opacity 1s"
			document.body.style.opacity = "1"
		}, 300)
	}
	setTimeout(function() {
		document.getElementById("menu").style.top = "0"
		window.addEventListener("scroll", isScrolling, false);
	}, 500)
}

function Logo() {
	if(window.scrollY < 10) {
		window.open("https://lucasfischer.com.br/gewinner/index.html", "_self");
	} else {
		Scroll("inicial")
	}
}

var Redirect_Links = ["marista2017", "estadual2018", "mostratec2018","nacional2018", "estadual2019", "marista2019", "nacional2019", "estadual2020", "nacional2020", "estadual2021", "nacional2021"];

function Redirect(Pagina) {
	document.body.style.transition = ".25s opacity";
	document.body.style.opacity = "0";
	localStorage.setItem("scrollPosition", window.pageYOffset);
	setTimeout(() => {
		window.open("https://lucasfischer.com.br/gewinner/paginas/"+Redirect_Links[Pagina]+"", "_self");
	}, 250);
}