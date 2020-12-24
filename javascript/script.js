//Carregamento

async function preLoad(url) {
  var img = new Image();
  img.src = url;
  return;
}

async function Carregou() {
  await preLoad("/imagens/fundo6.jpg")
  await preLoad("/imagens/sobre.jpg")
  document.getElementById("carregando").classList.add("fadeout")
  setTimeout(function() {
    document.getElementById('carregando').style.display = "none";
    document.getElementById('content').style.display = "inherit";
  }, 300)
  document.getElementById("content").classList.add("fadein")
}

//Menus

var ativo = 1;
var aberto = false;
var ultimaCor = "none"
var possivelSubir = true;

function openNav() {
  aberto = true;
  document.getElementById('conteudo').classList.add("blur")
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("menu").style.display = "none";
  document.getElementById("conteudo").style.marginLeft = "250px";
  document.getElementById("conteudo").style.opacity = "0.5 !important";
  document.body.style.overflowY = "hidden";
}

function closeNav() {
  aberto = false;
  document.getElementById('conteudo').classList.remove("blur")
  document.getElementById("sidebar").style.width = "0px";
  document.getElementById("conteudo").style.marginLeft = "0px";
  document.getElementById("conteudo").style.opacity = "1 !important";
  document.getElementById("menu").style.display = "inline";
  document.body.style.overflowY = "inherit";
}

var lastScrollTop = window.pageYOffset;
window.addEventListener("scroll", function(){
    if (ativo == 1) {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (window.scrollY == 0) {
        console.log(1)
        document.getElementById("menu").style.top = "0px";
        document.getElementById("menu").style.backgroundColor = "rgba(30, 30, 30, 0)";
        ultimaCor = "rgba(30, 30, 30, 0)"
    } else {
      if (st > lastScrollTop){
        console.log(2)
        document.getElementById("menu").style.top = "-70px";
        setTimeout(function() {
          document.getElementById("menu").style.backgroundColor = ultimaCor;
        }, 200)
      } else {
          console.log(3)
          document.getElementById("menu").style.top = "0px";
          document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
          ultimaCor = "rgba(0, 0, 0, 0.5)"
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

//Botões Menu

function scroll(id) {
  document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function Sobre() {
  possivelSubir = false
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
  if (aberto == true) {
    closeNav()
    setTimeout(function() {
      document.getElementById('programacao').scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }, 300)
  } else {
    document.getElementById('programacao').scrollIntoView({ block: 'start',  behavior: 'smooth' });
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

function Contato() {
  if (aberto == true) {
    closeNav()
    setTimeout(function() {
      document.getElementById('contato').scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }, 300)
  } else {
    document.getElementById('contato').scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
}