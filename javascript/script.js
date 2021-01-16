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
  document.getElementById("menu").classList.add("fadedown");
  setTimeout(function(){
    document.getElementById("menu").classList.remove("fadedown");
  }, 700)
}

//Menus

var ativo = 1;
var aberto = false;
var ultimaCor = "none"
var possivelSubir = true;

function openNav() {
  aberto = true;
  document.getElementById('conteudo').classList.add("blur")
  if (document.body.clientWidth > 626) {
    document.getElementById("conteudo").style.marginLeft = "40vw";
  } else {
    document.getElementById("conteudo").style.marginLeft = "250px";
  }
  document.getElementById("sidebar").style.width = "40vw";
  document.getElementById("sidebar").style.minWidth = "250px";
  document.getElementById("menu").style.display = "none";
  document.getElementById("conteudo").style.opacity = "0.5 !important";
  document.body.style.overflowY = "hidden";
}

function closeNav() {
  document.getElementById('conteudo').classList.remove("blur")
  document.getElementById("sidebar").style.width = "0px";
  document.getElementById("sidebar").style.minWidth = "0px";
  document.getElementById("conteudo").style.marginLeft = "0px";
  document.getElementById("conteudo").style.opacity = "1 !important";
  if (aberto == true) {
    document.getElementById("menu").classList.add("fadedown");
    document.getElementById("menu").style.display = "inherit";
    setTimeout(function() {
      document.getElementById("menu").classList.remove("fadedown");
    }, 400)
  }
  document.body.style.overflowY = "inherit";
  aberto = false;
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


function todosOsProjetos(funcao) {
  if (funcao == "abrir") {
    document.getElementById('content').classList.remove("fadein");
    document.getElementById('todosOsProjetos').classList.remove("fadein");
    document.getElementById('content').classList.add("fadeout");
    setTimeout(function() {
      document.getElementById('content').style.display = "none";
      document.getElementById('todosOsProjetos').classList.add("fadein");
      document.getElementById('todosOsProjetos').style.display = "inherit";
    }, 300)
  } else {
    document.getElementById('todosOsProjetos').classList.remove("fadein");
    document.getElementById('content').classList.remove("fadein");
    document.getElementById('todosOsProjetos').classList.add("fadeout");
    setTimeout(function() {
      document.getElementById('todosOsProjetos').style.display = "none";
      document.getElementById('content').classList.add("fadein");
      document.getElementById('content').style.display = "inherit";
      document.getElementById("projetos").scrollIntoView({ block: 'start'});
    }, 300)
  }
}