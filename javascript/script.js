var ativo = 1;
var aberto = false;

function openNav() {
  aberto = true;
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("menu").style.display = "none";
  document.getElementById("content").style.marginLeft = "250px";
  document.getElementById("content").style.opacity = "0.5 !important";
  document.body.style.overflowY = "hidden";
}

function closeNav() {
  aberto = false;
  document.getElementById("sidebar").style.width = "0px";
  document.getElementById("content").style.marginLeft = "0px";
  document.getElementById("content").style.opacity = "1 !important";
  document.getElementById("menu").style.display = "inline";
  document.body.style.overflowY = "inherit";
}

async function preLoad(url) {
  var img = new Image();
  img.src = url;
  return;
}

async function Carregou() {
  await preLoad("/imagens/fundo.jpg")
  document.getElementById("carregando").classList.add("fadeout")
  setTimeout(function() {
    document.getElementById('carregando').style.display = "none";
    document.getElementById('content').style.display = "inherit";
  }, 300)
  document.getElementById("content").classList.add("fadein")
}

function Sobre() {
  if (aberto == true) {
    closeNav()
    setTimeout(function() {
      document.getElementById('sobre').scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }, 300)
  } else {
    document.getElementById('sobre').scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
}

function Projetos() {
  if (aberto == true) {
    closeNav()
    setTimeout(function() {
      document.getElementById('projetos').scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }, 300)
  } else {
    document.getElementById('projetos').scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
}

var lastScrollTop = window.pageYOffset;
window.addEventListener("scroll", function(){
  if (ativo == 1) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (window.scrollY == 0) {
      document.getElementById("menu").style.top = "0px";
      document.getElementById("menu").style.backgroundColor = "#1e1e1e";
  } else {
    if (st > lastScrollTop){
      document.getElementById("menu").style.backgroundColor = "#1e1e1e";
      document.getElementById("menu").style.top = "-70px";
    } else {
        document.getElementById("menu").style.backgroundColor = "black";
        document.getElementById("menu").style.top = "0px";
    }
  }
  lastScrollTop = st <= 0 ? 0 : st;
  }
},false);
var isScrolling;
window.addEventListener('scroll', function(event) {
  window.clearTimeout( isScrolling );
  isScrolling = setTimeout(function() {
    ativo = 1;
  },66);
}, false);