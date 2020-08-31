function Carregou() {
	preLoad("imagens/fundo.jpg")
	setTimeout(function() {
		document.getElementById('carregando').style.display = "none";
		document.getElementById('content').style.display = "inherit";
	}, 200)
}

function preLoad(url) {
	var img = new Image();
	img.src = url;
}
