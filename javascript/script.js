var Sidebar_Open = false;

function OpenMenu() {
    if(!Sidebar_Open) {
        document.getElementById("sidebar").style.right = "0";
        document.getElementById("menu").style.top = "-100px";
        document.getElementById("content").style.filter = "blur(5px)";
        document.getElementById("content").style.opacity = "0.5";
        setTimeout(() => {
            document.getElementById("sidebar-options").style.marginRight = "0";
            document.getElementById("sidebar-options").style.opacity = "1";
        }, 200);
        Sidebar_Open = true;
    }
}

function CloseMenu() {
    if(Sidebar_Open) {
        document.getElementById("sidebar").style.right = "-250px";
        document.getElementById("menu").style.top = "10px";
        document.getElementById("content").style.filter = "none";
        document.getElementById("content").style.opacity = "1";
        setTimeout(() => {
            document.getElementById("sidebar-options").style.marginRight = "-150px";
            document.getElementById("sidebar-options").style.opacity = ".4";
        }, 200);
        Sidebar_Open = false;
    }
}

var Arrow_Down = false;

window.addEventListener("scroll", () => {
    if(window.scrollY < 20) {
        document.getElementById("menu").style.height = "100px";
        document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, 0)";
        document.getElementById("menu").style.backdropFilter = "none";  
    } else {
        document.getElementById("menu").style.height = "50px";
        document.getElementById("menu").style.backgroundColor = "rgba(0, 0, 0, .2)";
        document.getElementById("menu").style.backdropFilter = "blur(5px)";
    }
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        document.getElementById("arrow").style.bottom = "-60px";
        Arrow_Down = true;
    } else if(Arrow_Down) {
        document.getElementById("arrow").style.bottom = "30px";
        Arrow_Down = false;
    }
    if(Sidebar_Open) {
        CloseMenu();
    }
    if(Project_Is_Open) {
        Fechar_Projeto(false);
    }
});

location.href = "#home";
setTimeout(() => {
    document.getElementById("menu").style.top = "10px";
    document.getElementById("arrow").style.bottom = "30px";
    setTimeout(() => {
        document.getElementById("menu").style.transition = ".3s height, .3s background-color, .5s top";
    }, 1000);
}, 4500);

const Locations = ["about", "knowledge", "projects-title", "projects", "contact"];

function Scroll(Link_Number) {
    CloseMenu();
    setTimeout(() => {
        location.href = "#"+Locations[Link_Number]+"";
    }, 500);
}

function Scroll_Arrow() {
    for(var i = 0; i < Locations.length; i++) {
        if(document.getElementById(Locations[i]).getBoundingClientRect().top > 200) {
            document.getElementById(Locations[i]).scrollIntoView({ block: 'start',  behavior: 'smooth' });
            break;
        }
    }
}

var Possible_To_Change_Project = true;
var Project_Open = 0;
var Project_Is_Open = false;
var Images_Link = ["gewinner.jpg", "memoria.jpg", "genius.jpg", "calculadora.jpg", "todo-list.jpg", "apostador.jpg", "tarefas.jpg", "traveller.jpg", "marketing.jpg"];
var Redirect_Links = ["https://lucasfischer.com.br/gewinner", "https://lucasfischer.com.br/projetos/memoria", "https://lucasfischer.com.br/projetos/genius", "https://lucasfischer.com.br/projetos/calculadora", "https://lucasfischer.com.br/projetos/todo-list/public", "https://lucasfischer.com.br/projetos/apostador", "https://lucasfischer.com.br/projetos/tarefas", "https://lucasfischer.com.br/projetos/gulliver-traveller", "https://lucasfischer.com.br/projetos/Ethos_Marketing"];
var Titles = ["Equipe Gewinner", "Memória", "Genius", "Calculadora", "To-Do List", "Apostador", "Organização Escolar", "Gulliver Traveller", "Ethos Marketing"];
var Descriptions = ["Site desenvolvido por mim para mostrar um pouco da minha trajetória pela Robótica.", "Teste suas habilidades nesse Desafio da Memória de Frutas! Muito fácil? Aumente a dificuldade no menu!", "Coloque sua mente a prova nessa réplica de Genius! Preste atenção na sequência de cores e tente replicar sua ordem.", "Calculadora moderna e minimalista desenvolvida para realizar operações matemáticas", "Projeto pessoal desenvolvido para aprendizado de Banco de Dados na Nuvem. Entre na sua conta e começe a se organizar de uma forma muito fácil!" ,"Par ou Ímpar? Faça sua aposta e selecione a quantia que deseja apostar. Aí é só torcer para você acertar!",  "Projeto desenvolvido durante o EAD para ajudar os alunos na organização escolar. Veja suas tarefas, avaliações e horários.", "Projeto desenvolvido para um cliente, que solicitou a criação de um formulário para seu trabalho", "Projeto desenvolvido para um cliente, para divulgação de sua empresa. Uma ótima demonstração de como minimalismo e animações fluídas fazem magia!"]

function Open_Project(Project_Number) {
    if(!Project_Is_Open) {
        Project_Is_Open = true;
        document.getElementById("full-screen-img").src = "imagens/" + Images_Link[Project_Number] + "";
        document.getElementById("full-screen-pj-title").innerHTML = Titles[Project_Number];
        document.getElementById("text-project-full-screen").innerHTML = Descriptions[Project_Number];
        document.getElementById("visit-project").href = Redirect_Links[Project_Number];
        document.getElementById("project-full-screen").style.transition = ".5s opacity ease";
        document.getElementById("project-full-screen").style.top = "" + document.getElementById("project-"+ Project_Number +"").getBoundingClientRect().top + "px";
        document.getElementById("project-full-screen").style.left = "" + document.getElementById("project-"+ Project_Number +"").getBoundingClientRect().left + "px";
        document.getElementById("content").style.opacity = "0.5";
        document.getElementById("project-full-screen").style.display = "inline";
        document.getElementById("menu").style.top = "-100px";
        Project_Open = Project_Number;
        setTimeout(() => {
            document.getElementById("content").style.filter = "blur(5px)";
            document.getElementById("project-full-screen").style.transition = ".3s left ease, .3s top ease, .3s width ease, .3s height ease, .3s opacity ease, .3s transform ease";
            document.getElementById("project-full-screen").style.opacity = "1";
            document.getElementById("full-screen-img").style.width = "min(350px, calc(100% - 120px))";
            document.getElementById("full-screen-img").style.marginTop = "10px";
            document.getElementById("project-full-screen").style.left = "50%";
            document.getElementById("project-full-screen").style.top = "50%";
            document.getElementById("project-full-screen").style.transform = "translate(-50%, -50%)";
            document.getElementById("project-full-screen").style.width = "min(600px, 90%)";
            document.getElementById("project-full-screen").style.height = "390px";
            setTimeout(() => {
                document.getElementById("a-project-full-screen").style.opacity = "1";
                document.getElementById("text-project-full-screen").style.opacity = "1";
                document.getElementById("full-screen-pj-title").style.opacity = "1";
                document.getElementById("first-arrow").style.opacity = "1";
                document.getElementById("second-arrow").style.opacity = "1";
                document.getElementById("visit-project").style.opacity = "1";
                document.getElementById("content").addEventListener("click", Fechar_Projeto);
            }, 350);
        }, 100);
    }
}

function Fechar_Projeto(Voltar_A_Posicao) {
    if(Project_Is_Open) {
        document.getElementById("content").removeEventListener("click", Fechar_Projeto);
        document.getElementById("a-project-full-screen").style.opacity = "0";
        document.getElementById("text-project-full-screen").style.opacity = "0";
        document.getElementById("visit-project").style.opacity = "0";
        document.getElementById("first-arrow").style.opacity = "0";
        document.getElementById("second-arrow").style.opacity = "0";
        document.getElementById("full-screen-pj-title").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("full-screen-img").style.marginTop = "-54px";
            if(Voltar_A_Posicao) {
                document.getElementById("project-full-screen").style.top = "" + document.getElementById("project-"+ Project_Open +"").getBoundingClientRect().top + "px";
                document.getElementById("project-full-screen").style.left = "" + document.getElementById("project-"+ Project_Open +"").getBoundingClientRect().left + "px";
                document.getElementById("project-full-screen").style.transform = "translate(0, 0)";
            }
            document.getElementById("project-full-screen").style.width = "280px";
            document.getElementById("project-full-screen").style.height = "185px";
            document.getElementById("full-screen-img").style.maxWidth = "calc(100% - 20px)";
            document.getElementById("full-screen-img").style.width = "260px";
            document.getElementById("content").style.filter = "none";
            document.getElementById("content").style.opacity = "1";
            document.getElementById("menu").style.top = "10px";
            setTimeout(() => {
                document.getElementById("project-full-screen").style.opacity = "0";
            }, 150);
            setTimeout(() => {
                document.getElementById("project-full-screen").style.display = "none";
                Project_Is_Open = false;
                document.getElementById("project-full-screen").style.transform = "translate(0, 0)";
            }, 400);    
        }, 50);
    }
}

function Next() {
    if(Possible_To_Change_Project) {
        Possible_To_Change_Project = false;
        if(Project_Open == 8) {
            Project_Open = 0;
        } else {
            Project_Open += 1;
        }
        document.getElementById("second-arrow").style.transform = "scale(0.8)";
        document.getElementById("project-container").style.transition = "margin .2s ease, opacity .2s ease";
        document.getElementById("project-container").style.marginLeft = "-50px";
        document.getElementById("project-container").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("project-container").style.transition = "none";
            document.getElementById("full-screen-img").src = "imagens/" + Images_Link[Project_Open] + "";
            document.getElementById("full-screen-pj-title").innerHTML = Titles[Project_Open];
            document.getElementById("text-project-full-screen").innerHTML = Descriptions[Project_Open];
            document.getElementById("visit-project").href = Redirect_Links[Project_Open];
            document.getElementById("project-container").style.marginLeft = "50px";
            document.getElementById("second-arrow").style.transform = "scale(1)";
            setTimeout(() => {
                document.getElementById("project-container").style.marginLeft = "0";
                document.getElementById("project-container").style.transition = "margin .2s ease, opacity .2s ease";
                document.getElementById("project-container").style.opacity = "1";
                setTimeout(() => {
                    Possible_To_Change_Project = true;
                }, 250);
            }, 25);
        }, 200);
    }
}

function Previous() {
    if(Possible_To_Change_Project) {
        Possible_To_Change_Project = false;
        if(Project_Open == 0) {
            Project_Open = 8;
        } else {
            Project_Open -= 1;
        }
        document.getElementById("first-arrow").style.transform = "scale(0.8)";
        document.getElementById("project-container").style.transition = "margin .2s ease, opacity .2s ease";
        document.getElementById("project-container").style.marginLeft = "50px";
        document.getElementById("project-container").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("project-container").style.transition = "none";
            document.getElementById("full-screen-img").src = "imagens/" + Images_Link[Project_Open] + "";
            document.getElementById("full-screen-pj-title").innerHTML = Titles[Project_Open];
            document.getElementById("text-project-full-screen").innerHTML = Descriptions[Project_Open];
            document.getElementById("visit-project").href = Redirect_Links[Project_Open];
            document.getElementById("project-container").style.marginLeft = "-50px";
            setTimeout(() => {
                document.getElementById("project-container").style.marginLeft = "0";
                document.getElementById("project-container").style.transition = "margin .2s ease, opacity .2s ease";
                document.getElementById("project-container").style.opacity = "1";
                document.getElementById("first-arrow").style.transform = "scale(1)";
                setTimeout(() => {
                    Possible_To_Change_Project = true;
                }, 250);
            }, 25);
        }, 200);
    }
}