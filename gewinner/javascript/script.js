var Aberto = false;

function OpenNav() {
	if(!Aberto) {
		document.getElementById("menu").style.top = "-70px"
		document.getElementById("sidebar").style.width = "250px";
		document.getElementById("secoes").style.marginLeft = "250px";
		document.getElementById("secoes").style.opacity = "0.5";
		document.getElementById("secoes").style.filter = "blur(5px)";
		setTimeout(function() {
			document.getElementById("itens").style.opacity = "1"
			document.getElementById("itens").style.marginLeft = "0"
		}, 250)
		Aberto = true;
	}
}

function CloseNav() {
	if(Aberto) {
		document.getElementById("menu").style.top = "0px"
		document.getElementById("sidebar").style.width = "0px";
		document.getElementById("secoes").style.marginLeft = "0px";
		document.getElementById("secoes").style.opacity = "1";
		document.getElementById("secoes").style.filter = "none";
		document.getElementById("itens").style.opacity = "0"
		document.getElementById("itens").style.marginLeft = "-100px"
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
			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.3)";
		}
	}
	lastScrollTop = st <= 0 ? 0 : st;
}

function Scroll(id) {
	if(Aberto) {
		CloseNav();
		setTimeout(function() {
			document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
		}, 500)
	} else {
		document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
	}
}

var Secoes = ["equipe", "fotos", "competicoes", "contato"];

for (let i = 0; i < (Secoes.length + 12); i++) {
	if(i < 4) {
		document.getElementById(""+ Secoes[i] +"-btn").setAttribute("onclick", "Scroll(Secoes["+i+"])");
	} else if(i < 8) {
		document.getElementById(""+ Secoes[i-4] +"-btn-mobile").setAttribute("onclick", "Scroll(Secoes["+(i-4)+"])");
	} else {
		document.getElementById("competicao-"+ (i-8) +"").setAttribute("onclick", "Redirect("+(i-8)+")");
	}
}

if(localStorage.getItem("scrollPosition") == 0) {
	document.getElementById("carregando").style.opacity = "1";
}

function Carregando() {
	
	// if(localStorage.getItem("scrollPosition") != 0) {
	// 	document.getElementById("carregando").style.display = "none"
	// 	document.getElementById("conteudo").style.display = "initial"
	// 	document.body.style.opacity = "0"
	// 	window.scrollTo(0, localStorage.getItem("scrollPosition"))
	// 	setTimeout(() => {
	// 		document.body.style.transition = "opacity 1s"
	// 		document.body.style.opacity = "1"
	// 		if (localStorage.getItem("scrollPosition") < 10) {
	// 			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
	// 			document.getElementById("menu").style.backdropFilter = "none";
	// 		} else {
	// 			document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.3)";
	// 			document.getElementById("menu").style.backdropFilter = "blur(5px)";
	// 		}
	// 		localStorage.setItem("scrollPosition", 0);
	// 	}, 50);
	// } else {
	// 	document.body.style.transition = "opacity 0.3s"
	// 	document.body.style.opacity = "0"
	// 	setTimeout(function() {
	// 		document.getElementById("carregando").style.display = "none"
	// 		document.getElementById("conteudo").style.display = "initial"
	// 		window.scrollTo(0, localStorage.getItem("scrollPosition"))
	// 		document.body.style.transition = "opacity 1s"
	// 		document.body.style.opacity = "1"
	// 	}, 300)
	// }
	// setTimeout(function() {
	// 	document.getElementById("menu").style.top = "0"
	// 	window.addEventListener("scroll", function Menu() {requestAnimationFrame(isScrolling);}, false);
	// 	//window.addEventListener("scroll", function Animar() {requestAnimationFrame(Visivel);}, false);
	// }, 500)
}

function Logo() {
	if (window.scrollY < 10) {
		window.open("https://lucasfischer.com.br/gewinner/index.html", "_self");
	} else {
		Scroll("inicial")
	}
}

function isElementVisible(el) {
	var rect = document.getElementById(el).getBoundingClientRect();
	return rect.bottom > 0 &&
	rect.right > 0 &&
	rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
	rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

// function Visivel() {
// 	if(document.getElementById("jorge").getBoundingClientRect().top < (window.innerHeight/1.5)) {
// 		document.getElementById("jorge").style.marginLeft = "0";
// 		document.getElementById("jorge").style.opacity = "1";
// 	}
// 	if(document.getElementById("fischer").getBoundingClientRect().top < (window.innerHeight/1.5)) {
// 		document.getElementById("fischer").style.opacity = "1";
// 	}
// 	if(document.getElementById("theodoro").getBoundingClientRect().top < (window.innerHeight/1.5)) {
// 		document.getElementById("theodoro").style.marginLeft = "0";
// 		document.getElementById("theodoro").style.opacity = "1";
// 	}
// }

var Redirect_Links = ["regional2018", "nacional2018", "regional2019", "nacional2019", "regional2020", "nacional2020", "regional2021", "nacional2021"];

function Redirect(Pagina) {
	localStorage.setItem("scrollPosition", window.pageYOffset);
	console.log(Pagina);
	window.open("https://lucasfischer.com.br/gewinner/paginas/"+Redirect_Links[Pagina]+"", "_self");
}