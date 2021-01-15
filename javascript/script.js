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

function scrolling() {
  if (ativo == 1) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (window.scrollY == 0) {
      document.getElementById("menu").style.top = "0px";
      document.getElementById("menu").style.backgroundColor = "rgba(30, 30, 30, 0)";
      ultimaCor = "rgba(30, 30, 30, 0)"
    } else {
      if (st > lastScrollTop){
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
}

var lastScrollTop = window.pageYOffset;
window.addEventListener("scroll", scrolling);
var isScrolling;
window.addEventListener('scroll', function(event) {
  window.clearTimeout( isScrolling );
  isScrolling = setTimeout(function() {
    ativo = 1;
   window.addEventListener("scroll", scrolling);
  },90);
}, false);

//Botões Menu

function scroll(id) {
  document.getElementById(id).scrollIntoView({ block: 'start',  behavior: 'smooth' });
}

function Sobre() {
  window.removeEventListener("scroll", scrolling);
  document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
  ultimaCor = "rgba(0, 0, 0, 0)"
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
  window.removeEventListener("scroll", scrolling);
  document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
  ultimaCor = "rgba(0, 0, 0, 0)"
  if (aberto == true) {
    closeNav()
    setTimeout(function() {
      scroll("programacao")
    }, 300)
  } else {
    scroll("programacao")
  }
}

function Projetos() {
  window.removeEventListener("scroll", scrolling);
  document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
  ultimaCor = "rgba(0, 0, 0, 0)"
  if (aberto == true) {
    closeNav()
    setTimeout(function() {
      scroll("projetos")
    }, 300)
  } else {
    scroll("projetos")
  }
}

function Contato() {
  window.removeEventListener("scroll", scrolling);
  document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
  ultimaCor = "rgba(0, 0, 0, 0)"
  if (aberto == true) {
    closeNav()
    setTimeout(function() {
      scroll("contato")
    }, 300)
  } else {
    scroll("contato")
  }
}

function Nome() {
  if (window.scrollY == 0) {
    window.open("https://lucasfischer.com.br/index.html", "_self");
  } else {
    document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
    ultimaCor = "rgba(0, 0, 0, 0)"
    scroll("primeiraPag")
  }
}

function projeto(id) {
  if (id == 1) {
    window.open("https://teamgewinner.github.io/gewinner/index.html");
  } else if (id == 2) {
    window.open("https://lucasfischer.com.br/desafios/apostador/index.html")
  } else if (id == 3) {
    window.open("https://lucasfischer.com.br/desafios/memoria/index.html")
  } else if (id == 4) {
    window.open("https://lucasfischer.com.br/desafios/genius/index.html")
  } else if (id == 5) {
    window.open("https://lucasfischer.com.br/tarefas/index.html")
  }
}