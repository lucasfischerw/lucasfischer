var lastScrollTop = window.pageYOffset;

window.addEventListener("scroll", function(){
	var st = window.pageYOffset || document.documentElement.scrollTop;
	if (st > lastScrollTop+0.5) {
		document.getElementById("botaoVoltar").style.opacity = "0"
	} else {
		document.getElementById("botaoVoltar").style.opacity = "1"
	}
	lastScrollTop = st <= 0 ? 0 : st;
}, false);

function Carregou() {
	document.body.style.transition = "opacity 0.3s"
	document.body.style.opacity = "0"
	setTimeout(function() {
		document.getElementById("conteudo").style.display = "initial"
		document.body.style.transition = "opacity 1s"
		document.body.style.opacity = "1"
		setTimeout(function() {
			document.getElementById("botaoVoltar").style.transition = "opacity 0.5s"
			document.getElementById("botaoVoltar").style.opacity = "1"
		}, 200)
	}, 300)
}