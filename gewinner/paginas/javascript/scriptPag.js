var paraCima = true;
var bloquear = false;

function scroll(id) {
	document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function seta() {
	var ids = ["parte1", "parte2"]
	bloquear = true;
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

var lastScrollTop = window.pageYOffset;

window.addEventListener("scroll", function(){
	if (!bloquear) {
		var st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > lastScrollTop) {
			document.getElementById("botaoVoltar").style.opacity = "0"
			document.getElementById("arrow").style.cursor = "initial";
			document.getElementById("arrow-container").style.bottom = "-40px";
		} else {
			document.getElementById("botaoVoltar").style.opacity = "1"
			document.getElementById("arrow").style.cursor = "pointer";
			document.getElementById("arrow-container").style.bottom = "30px";
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
	}, 70);
}, false);

window.addEventListener('beforeunload', function() {
	localStorage.setItem("autoScroll", 1);
})

function carregou() {
	setTimeout(function() {
		document.getElementById("arrow-container").style.bottom = "30px"
		document.getElementById("botaoVoltar").style.transition = "opacity 0.5s"
		document.getElementById("botaoVoltar").style.opacity = "1"
	}, 200)
}