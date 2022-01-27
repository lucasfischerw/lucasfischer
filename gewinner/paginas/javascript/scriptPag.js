var lastScrollTop = window.pageYOffset;

window.addEventListener("scroll", function(){
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastScrollTop + 0.5 && window.scrollY > 10) {
		document.getElementById("botaoVoltar").style.opacity = "0";
	} else {
		document.getElementById("botaoVoltar").style.opacity = "1";
	}
	lastScrollTop = st <= 0 ? 0 : st;
}, false);

window.addEventListener("beforeunload", () => {
	document.body.style.transition = ".25s opacity"
	document.body.style.opacity = "0"
});

function Carregando() {
	document.body.style.transition = "opacity 0.3s"
	document.body.style.opacity = "0"
	setTimeout(function() {
		document.getElementById("conteudo").style.display = "initial"
		document.body.style.transition = "opacity 1s"
		document.body.style.opacity = "1"
		window.scrollTo(0, 0);
		setTimeout(function() {
			document.getElementById("botaoVoltar").style.opacity = "1"
			document.getElementById("botaoVoltar").style.left = "30px"
		}, 400)
	}, 300)
}
