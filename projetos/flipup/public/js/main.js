import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, updatePassword, signOut, createUserWithEmailAndPassword, updateProfile,EmailAuthProvider,reauthenticateWithCredential, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, updateEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, getDocs, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getStorage, ref,uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAUtT057uGDE0W7uK2RV5mGaJsR6ySAsA",
    authDomain: "flipup-b861e.firebaseapp.com",
    projectId: "flipup-b861e",
    storageBucket: "flipup-b861e.appspot.com",
    messagingSenderId: "816504951931",
    appId: "1:816504951931:web:b37b800555b2b45b9dfede"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
auth.useDeviceLanguage();

function incorrectLogin() {
    document.querySelector("#email").style.border = "1px solid red";
    document.querySelector("#senha").style.border = "1px solid red";
    document.querySelector("#email").style.backgroundColor = "rgb(255, 238, 238)";
    document.querySelector("#senha").style.backgroundColor = "rgb(255, 238, 238)";
    document.querySelector("#login-error-message").innerHTML = "Email ou senha incorretos";
    document.querySelector("#submit-login").innerHTML = "Entrar";
    document.querySelector("#submit-login").classList.remove('loading');
    document.querySelector("#submit-login").style.pointerEvents = "all";
    document.querySelector("#email").addEventListener('input', function() {
        if(this.value != "") {
            this.style.border = "1px solid #ccc";
            this.style.backgroundColor = "white";
            document.querySelector("#login-error-message").innerHTML = "";
        } else {
            this.style.border = "1px solid red";
            this.style.backgroundColor = "rgb(255, 238, 238)";
        }
    });
    document.querySelector("#senha").addEventListener('input', function() {
        if(this.value != "") {
            this.style.border = "1px solid #ccc";
            this.style.backgroundColor = "white";
            document.querySelector("#login-error-message").innerHTML = "";
        } else {
            this.style.border = "1px solid red";
            this.style.backgroundColor = "rgb(255, 238, 238)";
        }
    });
}

window.signInEmail = () => {
    document.querySelector("#submit-login").innerHTML = "<div class='btn-loader'></div>Entrar";
    document.querySelector("#submit-login").classList.add('loading');
    document.querySelector("#submit-login").style.pointerEvents = "none";
    if(document.querySelector("#email").value != "" && document.querySelector("#senha").value != "") {
        signInWithEmailAndPassword(auth, document.querySelector("#email").value, document.querySelector("#senha").value)
        .then((userCredential) => {
        })
        .catch((error) => {
            incorrectLogin();
        });
    } else {
       incorrectLogin();
    }
}

document.getElementById("login").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if(document.querySelector("#senha").value == "") {
            document.querySelector("#senha").focus();
        } else {
            document.getElementById("submit-login").click();
        }
    }
});

window.parseURLParams = (url) => {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

window.appendBlade = (file, projectId=undefined) => {
    if(window.innerWidth < 1100) {
        closeMobileMenu();
    }
    var fileName = './blades/' + file + '.html'
    document.querySelector(".content").style.opacity = "0";
    for(var i = 0; i < document.getElementById('menu').getElementsByTagName("a").length; i++) {
        document.getElementById('menu').getElementsByTagName("a")[i].classList.remove('active');
    }
    try {
        document.getElementById('menu').querySelector("#" + file + "-btn").classList.add('active');
    } catch (error) {
        document.getElementById('menu').querySelector("#projetos-btn").classList.add('active');
    }
    setTimeout(function() {
        document.querySelector("#blade-append").innerHTML = ""
        $(function () {
            $.get(fileName, function (data) {
                $("#blade-append").append(data);
            });
        });
        document.querySelector(".content").style.opacity = "1";
        if(projectId != undefined) {
            window.history.replaceState(null, null, "?p=" + file+ "&id=" + projectId);
        } else {
            window.history.replaceState(null, null, "?p=" + file);
            if(file == "new-project") {
                document.getElementById("current-nav").innerHTML = "Novo Projeto";
            } else if(file == "prospeccao") {
                document.getElementById("current-nav").innerHTML = "Prospecção";
            } else {
                document.getElementById("current-nav").innerHTML = file.charAt(0).toUpperCase() + file.slice(1);
            }
        }
    }, 350);
}
window.leave = async() => signOut(auth).then(() => {
    location.reload();
  }).catch((error) => {
    // An error happened.
  });

var projectStatus = ["Prospecção", "Em Obra", "Anunciado", "Vendido"];

window.showProject = async (project, containerId) => {
    const bigCard = document.createElement('div');
    bigCard.classList.add('big-card');
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-edit-container');
    const status = document.createElement('p');
    status.innerHTML = projectStatus[project.status];
    status.classList.add('project-status-simple-show');
    const image = document.createElement('img');
    image.src = "./images/placeholder-img.png";
    image.setAttribute("onclick", "loadProject('" + project.id + "')");
    image.style.cursor = "pointer";
    try {
        await getDownloadURL(ref(storage, auth.currentUser.uid + "/" + project.id  + "/" + "header"))
        .then((url) => {
            image.src = url;
        });
    } catch (error) {
        image.src = "./images/placeholder-img.png";
    }
    const title = document.createElement('h2');
    title.innerHTML = project.name;
    const info = document.createElement('div');
    info.classList.add('project-highlight-atribbutes-dashboard');
    const metragem = document.createElement('p');
    metragem.innerHTML = getFormatedValue(project.area, "int") + "m²";
    if(parseInt(getFormatedValue(project.quartos, "int")) > 0) {
        const quartos = document.createElement('p');
        quartos.innerHTML = parseInt(getFormatedValue(project.quartos, "int")) == 1 ? getFormatedValue(project.quartos, "int") + " quarto" : getFormatedValue(project.quartos, "int") + " quartos";
        info.appendChild(quartos);
    }
    if(parseInt(getFormatedValue(project.banheiros, "int")) > 0) {
        const banheiros = document.createElement('p');
        banheiros.innerHTML = parseInt(getFormatedValue(project.banheiros, "int")) == 1 ? getFormatedValue(project.banheiros, "int") + " banheiro" : getFormatedValue(project.banheiros, "int") + " banheiros";
        info.appendChild(banheiros);
    }
    if(parseInt(getFormatedValue(project.vagas, "int")) > 0) {
        const vagas = document.createElement('p');
        vagas.innerHTML = parseInt(getFormatedValue(project.vagas, "int")) == 1 ?  + getFormatedValue(project.vagas, "int") + " vaga" : getFormatedValue(project.vagas, "int") + " vagas";
        info.appendChild(vagas);
    }
    if(project.elevador != "not-informed") {
        const elevator = document.createElement('p');
        if(project.elevador == "true") {
            elevator.innerHTML = "Com Elevador";
        } else {
            elevator.innerHTML = "Sem Elevador";
        }
        info.appendChild(elevator);
    }
    const endereco = document.createElement('p');
    endereco.innerHTML = project.endereco;
    var button = document.createElement('button');
    button.innerHTML = "Ver detalhes";
    button.classList.add('highlight-button');
    button.setAttribute("onclick", "loadProject('" + project.id + "')");
    info.appendChild(metragem);
    imageContainer.appendChild(image);
    imageContainer.appendChild(status);
    bigCard.appendChild(imageContainer);
    bigCard.appendChild(title);
    bigCard.appendChild(info);
    bigCard.appendChild(endereco);
    bigCard.appendChild(button);
    document.getElementById(containerId).appendChild(bigCard);
}

function sortByDate(a,b) {  
    var dateA = a.created_at.toDate().getTime();
    var dateB = b.created_at.toDate().getTime();
    return dateA < dateB ? 1 : -1;  
};

var currentProject;

window.updateDownloadedProjects = async() => {
    var projects = [];
    await getDocs(collection(db, "users", auth.currentUser.uid, "projetos")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
                var project = doc.data();
                project.id = doc.id;
                projects.push(project);
            
        });
    });
    projects.sort(sortByDate);
    return projects;
}

function findCurrentProject(projects, projetoID) {
    for(var i = 0; i < projects.length; i++) {
        if(projects[i].id == projetoID) {
            currentProject = projects[i];
        }
    }
}

function sortArray(a,b) {  
    var dateA = a.created_at.toDate().getTime();
    var dateB = b.created_at.toDate().getTime();
    return dateA > dateB ? 1 : -1;  
};

window.createSimpleHorizontalChart = (labels, data, containerId, bgColor) => {
    new Chart(document.getElementById(containerId), {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Valor de Compra',
                data: data[0],
                backgroundColor: 'color(srgb 0.7614 0.8417 0.9981)',
                stack: 'Stack 0',
                borderRadius: 10,
            }, {
                label: 'Reforma',
                data: data[1],
                backgroundColor: 'color(display-p3 0.2706 0.6078 0.9725)',
                stack: 'Stack 0',
                borderRadius: 10,
            }, {
                label: 'Despesas Gerais',
                data: data[2],
                backgroundColor: 'color(srgb 0.2555 0.3638 1)',
                stack: 'Stack 0',
                borderRadius: 10,
            }, {
                label: 'Valor de Venda',
                data: data[3],
                backgroundColor: 'color(srgb 0.7614 0.8417 0.9981)',
                stack: 'Stack 0',
                borderRadius: 10,
            },{
                label: 'Lucro Líquido',
                data: data[4],
                backgroundColor: 'color(srgb 0.7614 0.8417 0.9981)',
                stack: 'Stack 0',
                borderRadius: 10,
            },{
                label: 'IRPF',
                data: data[5],
                backgroundColor: 'color(display-p3 0.2706 0.6078 0.9725)',
                stack: 'Stack 0',
                borderRadius: 10,
            }],
            labels: labels,
        },options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    grace: '1%'
                },
            },
            barPercentage: 0.5,
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

window.createRoundChart = (labels, data, containerId) => {
    data.forEach((element, index) => {
        data[index] = parseFloat(getRawValue(element));
    });
    new Chart(document.getElementById(containerId), {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gasto Total',
                data: data,
                backgroundColor: [
                    '#3959f7',
                    '#d61f69',
                    '#fec53d',
                    '#49d991',
                    '#7b7a7a',
                ],
                hoverOffset: 4
            }]
        }, options: {
            maintainAspectRatio: true,
            animation: {
                duration: 0
            },
            cutout: 30,
        }
    });
}

window.getTotalProjectExpenses = (mode) => {
    if(mode == 0) {
        return parseFloat(getRawValue(currentProject.projectCustomValues[3])) +
        parseFloat(getRawValue(currentProject.projectCustomValues[6])) + 
        (parseFloat(getRawValue(getRawValue(currentProject.projectCustomValues[4]))) * Math.ceil(parseFloat(getRawValue(currentProject.projectCustomValues[38]))/30)) +
        parseFloat(getRawValue(currentProject.projectCustomValues[14])) + 
        parseFloat(getRawValue(currentProject.projectCustomValues[16])) +
        parseFloat(getRawValue(currentProject.projectCustomValues[18])) +
        (parseFloat(getRawValue(currentProject.projectCustomValues[10])) + parseFloat(getRawValue(currentProject.projectCustomValues[11]))) * Math.ceil(parseFloat(getRawValue(currentProject.projectCustomValues[38]))/30);
    } else {
        return parseFloat(getRawValue(currentProject.projectCustomValues[9])) +
        parseFloat(getRawValue(currentProject.projectCustomValues[14])) +
        parseFloat(getRawValue(currentProject.projectCustomValues[16])) +
        parseFloat(getRawValue(currentProject.projectCustomValues[18])) +
        (parseFloat(getRawValue(currentProject.projectCustomValues[10])) + parseFloat(getRawValue(currentProject.projectCustomValues[11])))* Math.ceil(parseFloat(getRawValue(currentProject.projectCustomValues[38]))/30);
    }
}


window.updateValuesChartStats = async (mode = currentProject.sellMode) => {
    var projetos = await updateDownloadedProjects();
    findCurrentProject(projetos, currentProject.id);
    var labels = [];
    var data = [];
    document.getElementById("round-chart-project-container2").innerHTML = "";
    document.getElementById("round-chart-project-container2").innerHTML = "<canvas id='round-chart2'></canvas>";
    if(mode == 0) {
        labels = ['Entrada', 'Parcelas e Taxas', 'ITBI e Registro', 'Reforma', 'Despesas mensais'];
        data = [getRawValue(currentProject.projectCustomValues[3]), 
        parseFloat(getRawValue(currentProject.projectCustomValues[6])) + 
        (parseFloat(getRawValue(getRawValue(currentProject.projectCustomValues[4]))) * Math.ceil(parseFloat(getRawValue(currentProject.projectCustomValues[38]))/30)),
        parseFloat(getRawValue(currentProject.projectCustomValues[14])) + 
        parseFloat(getRawValue(currentProject.projectCustomValues[16])),   
        getRawValue(currentProject.projectCustomValues[18]),
        (parseFloat(getRawValue(currentProject.projectCustomValues[10])) + parseFloat(getRawValue(currentProject.projectCustomValues[11]))) * Math.ceil(parseFloat(getRawValue(currentProject.projectCustomValues[38]))/30)];
    } else {
        labels = ['Valor de Compra', 'ITBI e Registro', 'Reforma', 'Despesas mensais'];
        data = [getRawValue(currentProject.projectCustomValues[9]),
        parseFloat(getRawValue(currentProject.projectCustomValues[14])) +
        parseFloat(getRawValue(currentProject.projectCustomValues[16])),
        getRawValue(currentProject.projectCustomValues[18]),
        (parseFloat(getRawValue(currentProject.projectCustomValues[10])) + parseFloat(getRawValue(currentProject.projectCustomValues[11]))) * Math.ceil(parseFloat(getRawValue(currentProject.projectCustomValues[38]))/30)];
    }
    createRoundChart(labels, data, 'round-chart2');
    document.getElementById("horizontal-chart-project-container").innerHTML = "";
    document.getElementById("horizontal-chart-project-container").innerHTML = "<canvas id='horizontal-chart'></canvas>";
    labels = ['Compra + Gastos', 'Valor de Venda', 'Lucro Bruto'];
    var reforma = getRawValue(currentProject.projectCustomValues[18]);
    var valorVenda = getRawValue(document.getElementById("valor-venda").value);
    var lucroLiquido = getRawValue(currentProject.projectCustomValues[26]);
    var irpf = getRawValue(currentProject.projectCustomValues[24]);
    if(currentProject.status == 3) {
        reforma = getRawValue(currentProject.projectCustomValues[37]);
        valorVenda = getRawValue(currentProject.projectCustomValues[36]);
        lucroLiquido = getRawValue(currentProject.projectCustomValues[44]);
        irpf = getRawValue(currentProject.projectCustomValues[43]);
    }
    data = [
        [getRawValue(currentProject.projectCustomValues[9]),0,0,0,0,0], 
        [reforma,0,0,0,0,0],
        [parseFloat(getRawValue(currentProject.projectCustomValues[6])) + parseFloat(getRawValue(currentProject.projectCustomValues[14])) + 
        parseFloat(getRawValue(currentProject.projectCustomValues[16])) + ((parseFloat(getRawValue(currentProject.projectCustomValues[11])) + parseFloat(getRawValue(currentProject.projectCustomValues[12]))) * Math.ceil(parseFloat(getRawValue(currentProject.projectCustomValues[38]))/30)) +
        parseFloat(getRawValue(currentProject.projectCustomValues[40])), 0, 0, 0,0,0],
        [0,valorVenda,0,0,0,0],
        [0,0,lucroLiquido,0,0,0], 
        [0,0,irpf,0,0,0]
    ];
    createSimpleHorizontalChart(labels, data, 'horizontal-chart');
}

window.generateProjectGraphs = (labels, totalExpensesPerCategory) => {
    document.getElementById("round-chart-project-container").innerHTML = "";
    document.getElementById("round-chart-project-container").innerHTML = "<canvas id='round-chart'></canvas>";
    if(labels.length == 0) {
        labels = ['Nenhum Gasto'];
        totalExpensesPerCategory = [1];
    }
    createRoundChart(labels, totalExpensesPerCategory, 'round-chart');
    updateValuesChartStats();
}

window.validateInputsForm = (formId) => {
    var inputs = document.getElementById(formId).getElementsByTagName("input");
    var textareas = document.getElementById(formId).getElementsByTagName("textarea");
    inputs = Array.from(inputs);
    textareas = Array.from(textareas);
    inputs = inputs.concat(textareas);
    var invalidInputs = false;
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value == "") {
            inputs[i].classList.add("invalid-input");
            invalidInputs = true;
        }
        inputs[i].onfocus = () => {
            inputs[i].classList.remove("invalid-input");
        }
    }
    if(invalidInputs) {
        return false;
    } else {
        return true;
    }
}

window.saveProjectEventEdit = async(index) => {
    document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
    document.querySelector("#popup-save-changes").classList.add('loading');
    var name = document.getElementById('nome-evento').value;
    var date = document.getElementById('data-evento').value;
    currentProject.events[index].name = name;
    currentProject.events[index].date = date;
    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
        events: currentProject.events
    });
    await updateDownloadedProjects();
    loadProjectEvents();
    closePopUp();
}

window.editProjectEvent = (index) => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Editar Evento";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveProjectEventEdit(' + index + ')');
    document.getElementById('save-event-form').style.display = "block";
    document.getElementById('nome-evento').value = currentProject.events[index].name;
    document.getElementById('data-evento').value = currentProject.events[index].date;
}

function loadProjectEvents() {
    document.getElementById('cronograma-values').innerHTML = "";
    if(currentProject.events != undefined && currentProject.events.length > 0) {
        for(var i = 0; i < currentProject.events.length; i++) {
            var event = document.createElement('div');
            event.classList.add('dia');
            var diaCard = document.createElement('div');
            diaCard.classList.add('dia-card');
            var date = document.createElement('h4');
            date.innerHTML = new Date(currentProject.events[i].date + "T12:00:00").toLocaleDateString().split('/')[0] + '/' + new Date(currentProject.events[i].date + "T12:00:00").toLocaleDateString().split('/')[1];
            var dia = document.createElement('p');
            var diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
            dia.innerHTML = diasSemana[new Date(currentProject.events[i].date).getDay()];
            var name = document.createElement('h4');
            name.innerHTML = currentProject.events[i].name;
            var buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('contact-buttons');
            var deleteBtn = document.createElement('img');
            deleteBtn.src = "./images/trash-icon.png";
            deleteBtn.classList.add('delete-trash-button');
            deleteBtn.setAttribute('onclick', 'deleteProjectEvent(' + i + ')');
            var editBtn = document.createElement('img');
            editBtn.src = "./images/edit-icon.png";
            editBtn.classList.add('edit-trash-button');
            editBtn.setAttribute('onclick', 'editProjectEvent(' + i + ')');
            buttonsContainer.appendChild(editBtn);
            buttonsContainer.appendChild(deleteBtn);
            diaCard.appendChild(date);
            diaCard.appendChild(dia);
            event.appendChild(diaCard);
            event.appendChild(name);
            event.appendChild(buttonsContainer);
            document.getElementById('cronograma-values').appendChild(event);
        }
    } else {
        document.getElementById('cronograma-values').innerHTML = "<p class='gray'>Nenhum evento cadastrado</p>";
    }
}

async function deleteProjectContact(index, project) {
    project.contacts.splice(index, 1);
    updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", project.id), {
        contacts: project.contacts
    });
    await updateDownloadedProjects();
    loadProjectContacts();
}

window.saveProjectContactEdit = async (index) => {
    document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
    document.querySelector("#popup-save-changes").classList.add('loading');
    var name = document.getElementById('contact-name').value;
    var job = document.getElementById('contact-job').value;
    var number = document.getElementById('contact-number').value;
    currentProject.contacts[index].name = name;
    currentProject.contacts[index].job = job;
    currentProject.contacts[index].number = number;
    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
        contacts: currentProject.contacts
    });
    await updateDownloadedProjects();
    loadProjectContacts();
    closePopUp();
    document.getElementsByClassName('collapsible')[6].classList.remove('collapsible-open');
    openProjectDetail(6);
}


function loadProjectContactEdit(index) {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Editar Contato";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveProjectContactEdit(' + index + ')');
    document.getElementById('save-new-contact-form').style.display = "block";
    document.getElementById('contact-name').value = currentProject.contacts[index].name;
    document.getElementById('contact-job').value = currentProject.contacts[index].job;
    document.getElementById('contact-number').value = currentProject.contacts[index].number;
}

function loadProjectContacts() {
    document.getElementById('contatos-values').innerHTML = "";
    if(currentProject.contacts != undefined && currentProject.contacts.length > 0) {
        for(var i = 0; i < currentProject.contacts.length; i++) {
            var contact = document.createElement('div');
            contact.classList.add('contact');
            var contactInitials = document.createElement('p');
            contactInitials.classList.add('contact-profile-img');
            contactInitials.innerHTML = currentProject.contacts[i].name.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
            var contactInfo = document.createElement('div');
            contactInfo.classList.add('contact-info');
            var name = document.createElement('h3');
            name.innerHTML = currentProject.contacts[i].name;
            var job = document.createElement('p');
            job.innerHTML = currentProject.contacts[i].job;
            var number = document.createElement('p');
            number.innerHTML = currentProject.contacts[i].number;
            var buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('contact-buttons');
            const currentProjectInfo = currentProject;
            const currentContactIndex = i;
            var deleteBtn = document.createElement('img');
            deleteBtn.src = "./images/trash-icon.png";
            deleteBtn.classList.add('delete-trash-button');
            deleteBtn.onclick = async function() {
                await deleteProjectContact(currentContactIndex, currentProjectInfo);
                document.getElementsByClassName('collapsible')[6].classList.remove('collapsible-open');
                openProjectDetail(6);
            }
            var editBtn = document.createElement('img');
            editBtn.src = "./images/edit-icon.png";
            editBtn.classList.add('edit-trash-button');
            editBtn.onclick = function() {
                loadProjectContactEdit(currentContactIndex);
            }
            contactInfo.appendChild(name);
            contactInfo.appendChild(job);
            contactInfo.appendChild(number);
            contact.appendChild(contactInitials);
            contact.appendChild(contactInfo);
            buttonsContainer.appendChild(editBtn);
            buttonsContainer.appendChild(deleteBtn);
            contact.appendChild(buttonsContainer);
            document.getElementById('contatos-values').appendChild(contact);
        }
    } else {
        document.getElementById('contatos-values').innerHTML = "<p class='gray'>Nenhum contato cadastrado</p>";
    }
}

window.saveReformCategoryEdit = async (index) => {
    document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
    document.querySelector("#popup-save-changes").classList.add('loading');
    var name = document.getElementById('category-name-edit').value;
    currentProject.reformCategories[index].name = name;
    var expenses = document.getElementById('edit-project-reform-form-elements').getElementsByClassName('close-simple-flex');
    //FInd and remove all expenses from the category
    if(currentProject.reformExpenses == undefined) {
        currentProject.reformExpenses = [];
    }
    for(var i = 0; i < currentProject.reformExpenses.length; i++) {
        if(currentProject.reformExpenses[i].category == index) {
            currentProject.reformExpenses.splice(i, 1);
            i--;
        }
    }
    for(var i = 0; i < expenses.length; i++) {
        var expense = {
            name: expenses[i].getElementsByTagName('input')[0].value,
            value: getRawValue(expenses[i].getElementsByTagName('input')[1].value),
            category: index
        }
        currentProject.reformExpenses.push(expense);
    }
    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
        reformCategories: currentProject.reformCategories,
        reformExpenses: currentProject.reformExpenses
    });
    await updateDownloadedProjects();
    loadProjectReformCategories();
    loadProjectReforms();
    updateReformValue();
    closePopUp();
    document.getElementsByClassName('collapsible')[1].classList.remove('collapsible-open');
    openProjectDetail(1);
}

window.editReform = (index) => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Editar Categoria";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveReformCategoryEdit(' + index + ')');
    document.getElementById('edit-project-reform-form').style.display = "block";
    document.getElementById('category-name-edit').value = currentProject.reformCategories[index].name;
    document.getElementById('edit-project-reform-form-elements').innerHTML = "";
    if(currentProject.reformExpenses != undefined && currentProject.reformExpenses.length > 0) {
        for(var i = 0; i < currentProject.reformExpenses.length; i++) {
            if(currentProject.reformExpenses[i].category == index) {
                const externalContainer = document.createElement('div');
                externalContainer.classList.add('close-simple-flex');
                var inputContainer = document.createElement('div');
                inputContainer.classList.add('input-option');
                var input = document.createElement('input');
                input.type = "text";
                input.placeholder = " ";
                input.value = currentProject.reformExpenses[i].name;
                input.classList.add('input-option');
                var description = document.createElement('p');
                description.innerHTML = "Nome";
                inputContainer.appendChild(input);
                inputContainer.appendChild(description);
                var inputContainer2 = document.createElement('div');
                inputContainer2.classList.add('input-option');
                var input2 = document.createElement('input');
                input2.type = "text";
                input2.placeholder = " ";
                input2.value = getFormatedValue(currentProject.reformExpenses[i].value, "R$");
                input2.classList.add('input-option');
                var description2 = document.createElement('p');
                description2.innerHTML = "Valor";
                var deleteBtn = document.createElement('img');
                deleteBtn.src = "./images/trash-icon.png";
                deleteBtn.classList.add('delete-trash-button-small');
                deleteBtn.onclick = function() {
                    externalContainer.remove();
                }
                inputContainer2.appendChild(input2);
                inputContainer2.appendChild(description2);
                externalContainer.appendChild(inputContainer);
                externalContainer.appendChild(inputContainer2);
                externalContainer.appendChild(deleteBtn);
                document.getElementById('edit-project-reform-form-elements').appendChild(externalContainer);
            }
        }
    }
}

window.deleteReformCategory = (index) => {
    currentProject.reformCategories.splice(index, 1);
    for(var i = 0; i < currentProject.reformExpenses.length; i++) {
        if(currentProject.reformExpenses[i].category == index) {
            currentProject.reformExpenses.splice(i, 1);
            i--;
        } else {
            if(currentProject.reformExpenses[i].category > index) {
                currentProject.reformExpenses[i].category--;
            }
        }
    }
    updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
        reformCategories: currentProject.reformCategories,
        reformExpenses: currentProject.reformExpenses
    });
    loadProjectReformCategories();
    loadProjectReforms();
    updateReformValue();
    document.getElementsByClassName('collapsible')[1].classList.remove('collapsible-open');
    openProjectDetail(1);
}

function loadProjectReformCategories() {
    document.getElementById('reform-categories').innerHTML = "";
    if(currentProject.reformCategories != undefined && currentProject.reformCategories.length > 0) {
        for(var i = 0; i < currentProject.reformCategories.length; i++) {
            var category = document.createElement('div');
            category.classList.add('custo-reforma');
            var titleContainer = document.createElement('div');
            titleContainer.classList.add('close-simple-flex');
            var categoryName = document.createElement('h3');
            categoryName.innerHTML = currentProject.reformCategories[i].name;
            var deleteBtn = document.createElement('img');
            deleteBtn.src = "./images/trash-icon.png";
            deleteBtn.classList.add('delete-trash-button-small');
            deleteBtn.setAttribute('onclick', 'deleteReformCategory(' + i + ')');
            var editBtn = document.createElement('img');
            editBtn.src = "./images/edit-icon.png";
            editBtn.classList.add('edit-trash-button-small');
            editBtn.setAttribute('onclick', 'editReform(' + i + ')');
            titleContainer.appendChild(categoryName);
            titleContainer.appendChild(deleteBtn);
            titleContainer.appendChild(editBtn);
            var outerDiv = document.createElement('div');
            outerDiv.classList.add('close-simple-flex');
            var img = document.createElement('img');
            img.src = "./images/plus-icon.png";
            img.classList.add('add-reforma');
            img.setAttribute('onclick', 'addReform(' + i + ')');
            var innerDiv = document.createElement('div');
            innerDiv.classList.add('custos');
            innerDiv.id = "custos-" + i;
            outerDiv.appendChild(innerDiv);
            outerDiv.appendChild(img);
            category.appendChild(titleContainer);
            category.appendChild(outerDiv);
            document.getElementById('reform-categories').appendChild(category);
        }
    }
    updateReformValue();
}

function loadProjectReforms() {
    if(currentProject.reformCategories != undefined) {
        for(var i = 0; i < currentProject.reformCategories.length; i++) {
            document.getElementById('custos-' + i).innerHTML = "";
        }
    }
    if(currentProject.reformExpenses != undefined && currentProject.reformExpenses.length > 0) {
        for(var i = 0; i < currentProject.reformExpenses.length; i++) {
            var reform = document.createElement('div');
            reform.classList.add('flex-align-between');
            var name = document.createElement('p');
            name.innerHTML = currentProject.reformExpenses[i].name + ":";
            var value = document.createElement('p');
            value.innerHTML = getFormatedValue(currentProject.reformExpenses[i].value, "R$");
            reform.appendChild(name);
            reform.appendChild(value);
            document.getElementById('custos-' + currentProject.reformExpenses[i].category).appendChild(reform);
        }
    }
    updateReformValue();
}

window.deleteProjectNote = async (index) => {
    currentProject.notes.splice(index, 1);
    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
        notes: currentProject.notes
    });
    await updateDownloadedProjects();
    loadProjectNotes();
    document.getElementsByClassName('collapsible')[5].classList.remove('collapsible-open');
    openProjectDetail(5);
}

window.saveProjectNoteEdit = async (index) => {
    document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
    document.querySelector("#popup-save-changes").classList.add('loading');
    var note = document.getElementById('note').value;
    currentProject.notes[index].note = note;
    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
        notes: currentProject.notes
    });
    await updateDownloadedProjects();
    loadProjectNotes();
    document.getElementsByClassName('collapsible')[5].classList.remove('collapsible-open');
    openProjectDetail(5);
    closePopUp();
}

window.editProjectNote = async (index) => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Editar Anotação";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveProjectNoteEdit(' + index + ')');
    document.getElementById('add-new-note-form').style.display = "block";
    document.getElementById('note').value = currentProject.notes[index].note;
}

function loadProjectNotes() {
    document.getElementById('notes-inner').innerHTML = "";
    if(currentProject.notes != undefined) {
        var addedNotes = 0;
        for(var i = 0; i < currentProject.notes.length; i++) {
            if(currentProject.notes[i].note != "") {
                var note = document.createElement('div');
                note.classList.add('note');
                note.innerHTML = currentProject.notes[i].note;
                var title = document.createElement('h3');
                title.innerHTML = "Anotação " + (addedNotes + 1);
                var header = document.createElement('div');
                header.classList.add('flex-align-between', 'margin-b');
                var buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('close-simple-flex');
                var editBtn = document.createElement('img');
                editBtn.src = "./images/edit-icon.png";
                editBtn.classList.add('edit-trash-button-small');
                editBtn.setAttribute('onclick', 'editProjectNote(' + i + ')');
                var deleteBtn = document.createElement('img');
                deleteBtn.src = "./images/trash-icon.png";
                deleteBtn.classList.add('delete-trash-button-small');
                deleteBtn.setAttribute('onclick', 'deleteProjectNote(' + i + ')');
                header.appendChild(title);
                buttonsContainer.appendChild(editBtn);
                buttonsContainer.appendChild(deleteBtn);
                header.appendChild(buttonsContainer);
                note.prepend(header);
                document.getElementById('notes-inner').appendChild(note);
                addedNotes++;
            }
        }
        if (addedNotes == 0) {
            document.getElementById('notes-inner').innerHTML = "<p class='gray'>Nenhuma anotação cadastrada</p>";
        }
    } else {
        document.getElementById('notes-inner').innerHTML = "<p class='gray'>Nenhuma anotação cadastrada</p>";
    }
}

//Verify is signed in
auth.onAuthStateChanged(async function(user) {
    setTimeout(async () => {
        if (user) {
            //Trial time
            await getDoc(doc(db, "users", user.uid, "trial", "info")).then(async(retrievedDoc) => {
                if(retrievedDoc.exists()) {
                    var trial = retrievedDoc.data();
                    if(await checkSubscription(auth.currentUser.email) == false) {
                        if(trial.endDate.toDate() < new Date()) {
                            //Redirect to plans.html directly on folder structure
                            window.location.href = "https://flipup.app.br/plans.html";
                        } else {
                            //Remaining days
                            var remainingDays = Math.ceil((trial.endDate.toDate() - new Date()) / (1000 * 60 * 60 * 24));
                            var message = document.createElement('p');
                            message.innerHTML = "Você está usando a versão de teste do FlipUp. Restam " + remainingDays + " dias antes do período de teste ser encerrado. Por favor, acesse a página de conta para continuar usando o FlipUp.";
                            document.getElementById("trial-warning").appendChild(message);
                            setTimeout(() => {
                                document.getElementById("trial-warning").style.display = "block";
                            },3000);
                            document.getElementById("warning-close").addEventListener('click', () => {
                                document.getElementById("trial-warning").style.display = "none";
                            });
                        }
                    }
                } else {
                    await setDoc(doc(db, "users", user.uid, "trial", "info"), {
                        startDate: new Date(),
                        endDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                    });
                }
            });


            //Stripe handle
            var currentPlan;
            var stripe = Stripe('pk_test_51PL7unI3KN8Sdb14bDtuu9RoLxaeVHvR8Pnt2R10UPfYQaNEb3D1VYnT0LugSSYnIvvum28Tr3q3PzVoKskP2pyX00KWy0C3m6');
            //Function to delete subscription
            window.deleteSubscription = async () =>{
                if(document.getElementById("confirm-subscription-delete-checkbox").checked) {
                    var subscriptionId = currentPlan.id;
                    try {
                        const response = await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
                            method: 'DELETE',
                            headers: {
                            'Authorization': 'Bearer sk_test_51PL7unI3KN8Sdb143kTGNotsZRj66t7ZKXxQTTRoiIYLQqSaYW7lT70E5Z4o9B1AQtcjseE99SeVoFaxxQKN75PL00ElO6GZeE',
                            'Content-Type': 'application/json'
                            }
                        });
                        const deletedSubscription = await response.json();
                        window.location.reload();
                    } catch (error) {}
                }
            }
            async function checkSubscription(email) {
                try {
                    const response = await fetch('https://api.stripe.com/v1/customers', {
                        method: 'GET',
                        headers: {
                        'Authorization': 'Bearer sk_test_51PL7unI3KN8Sdb143kTGNotsZRj66t7ZKXxQTTRoiIYLQqSaYW7lT70E5Z4o9B1AQtcjseE99SeVoFaxxQKN75PL00ElO6GZeE',
                        'Content-Type': 'application/json'
                        }
                    });
                
                    const customers = await response.json();
                    const customer = customers.data.find(customer => customer.email === email);
                
                    if (!customer) {
                        return false;
                    }
                
                    const subscriptionsResponse = await fetch(`https://api.stripe.com/v1/subscriptions?customer=${customer.id}`, {
                        method: 'GET',
                        headers: {
                        'Authorization': 'Bearer sk_test_51PL7unI3KN8Sdb143kTGNotsZRj66t7ZKXxQTTRoiIYLQqSaYW7lT70E5Z4o9B1AQtcjseE99SeVoFaxxQKN75PL00ElO6GZeE',
                        'Content-Type': 'application/json'
                        }
                    });
                
                    const subscriptions = await subscriptionsResponse.json();
                    const activeSubscription = subscriptions.data.find(subscription => subscription.status === 'active');
                
                    if (activeSubscription) {
                        currentPlan = activeSubscription;
                        return activeSubscription.items.data[0].price.id;
                    } else {
                        return false;
                    }
                } catch (error) {
                    return false;
                }
            }

            window.confirmSubscriptionDelete = async () => {
                showPopUp();
                document.getElementById("popup-title").innerHTML = "Cancelar Assinatura";
                document.getElementById("popup-save-changes").innerHTML = "Cancelar Assinatura";
                document.getElementById("popup-save-changes").setAttribute("onclick", "deleteSubscription()");
                document.getElementById("confirm-subscription-delete-form").style.display = "block";
            }

            window.handleAccountPage = async () => {
                document.getElementById("welcome-account-message").innerHTML = "Olá, " + auth.currentUser.displayName;
                document.getElementById("member-since").innerHTML = "Usuário desde " + new Date(auth.currentUser.metadata.creationTime).toLocaleDateString();
                var result = await checkSubscription(auth.currentUser.email);
                if(result == false) {
                    document.getElementById("no-active-plans").style.display = "block";
                    document.getElementById("current-plan-loader").style.display = "none";
                } else {
                    if(result == 'price_1PNP8YI3KN8Sdb14q84PswxX') {
                        document.getElementById("mensal-plan").style.display = "flex";
                    } else {
                        document.getElementById("anual-plan").style.display = "flex";
                    }
                    document.getElementById("current-plan-loader").style.display = "none";
                    window.showActivePlan = async (plan) => {
                        showPopUp();
                        document.getElementById("popup-title").innerHTML = "Plano Ativo";
                        document.getElementById("popup-save-changes").innerHTML = "Fechar";
                        document.getElementById("popup-save-changes").setAttribute("onclick", "closePopUp()");
                        document.getElementById("active-plan-popup").style.display = "block";
                        document.getElementById("plan-begin-date").innerHTML = new Date(currentPlan.created * 1000).toLocaleDateString();
                        document.getElementById("plan-renew-date").innerHTML = new Date(currentPlan.current_period_end * 1000).toLocaleDateString();
                        document.getElementById("plan-price").innerHTML = "R$ " + (currentPlan.items.data[0].price.unit_amount / 100).toFixed(2);
                    }
                }
            }
            
            window.buySubscriptionFlipUp = (mode) => {
                var selectedPrice;
                if(mode == 0) {
                    selectedPrice = 'price_1PNP8YI3KN8Sdb14q84PswxX';
                } else {
                    selectedPrice = 'price_1PNP8YI3KN8Sdb14iI1Yu0VI';
                }
                stripe.redirectToCheckout({
                    lineItems: [
                        {
                            price: selectedPrice,
                            quantity: 1
                        }
                    ],
                    mode: "subscription",
                    customerEmail: user.email,
                    successUrl: "https://flipup.app.br/?p=conta",
                    cancelUrl: "https://flipup.app.br/?p=conta"
                })
            };

            var projects = await updateDownloadedProjects();
            document.getElementById("loader-container").style.display = "none";

            document.getElementById("login").style.display = "none";
            document.getElementById("main-content-container").style.display = "block";
            if(user.displayName == null) {
                await updateProfile(auth.currentUser, {
                    displayName: user.email.split('@')[0]
                });
            }
            document.getElementById("user-name-menu").innerHTML = user.displayName;
            document.getElementById("user-name-initials-menu").innerHTML = user.displayName.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();;
            window.createProject = async() => {
                document.getElementById("save-new-project-btn").innerHTML = "<div class='btn-loader'></div>Salvando";
                document.getElementById("save-new-project-btn").setAttribute("disabled", "true");
                var elevatorVariable = "not-informed";
                if(document.getElementById('elevator-yes').checked) {
                    var elevatorVariable = "true";
                } else if(document.getElementById('elevator-no').checked) {
                    elevatorVariable = "false";
                }
                await addDoc(collection(db, "users", user.uid, "projetos"), {
                    name: document.getElementById('project-name').value,
                    endereco: document.getElementById('project-adress').value,
                    area: parseInt(getRawValue(document.getElementById('project-area').value)),
                    quartos: getRawValue(document.getElementById('project-quartos').value),
                    banheiros: getRawValue(document.getElementById('project-banheiros').value),
                    elevador: elevatorVariable,
                    vagas: getRawValue(document.getElementById('project-vagas').value),
                    condominio: getRawValue(document.getElementById('project-condominio').value),
                    valorAnuncio: getRawValue(document.getElementById('project-anuncio').value),
                    valorMetro: (parseFloat(getRawValue(document.getElementById("project-anuncio").value)) / parseFloat(getRawValue(document.getElementById('project-area').value))).toFixed(2),
                    linkAnuncio: document.getElementById('project-link').value,
                    notes: new Array({note: document.getElementById('project-notes').value}),
                    created_at: new Date(),
                    updated_at: new Date(),
                    valorCompra: 0,
                    gastoTotal: 0,
                    lucroLiquido: 0,
                    rentabilidade: 0,
                    status: 0,
                    tempoAteVenda: 2,
                    totalReformExpenses: 0,
                    justCreated: true,
                    projectCustomValues: [0, 0, 0, 0, 0, 0, 0,0, 0,0,0,getRawValue(document.getElementById('project-condominio').value),0,0,0,0,0,0,0,getRawValue(document.getElementById('project-anuncio').value),6,getRawValue(parseFloat(getRawValue(document.getElementById('project-anuncio').value)) * 0.06),0,15,0,0,0,0,0,getRawValue(document.getElementById('project-anuncio').value),0,2,0,0,0,0,0,0],
                    user: user.uid
                }).then(async function(docRef) {
                    if(document.getElementById('image-file').files.length > 0) {
                        var file = document.getElementById('image-file').files[0];
                        var storageRef = ref(storage, user.uid + "/" + docRef.id + "/" + "header");
                        uploadBytes(storageRef, file).then(async(snapshot) => {
                            projects = await updateDownloadedProjects();
                            loadProject(docRef.id);
                        });
                    } else {
                        projects = await updateDownloadedProjects();
                        loadProject(docRef.id);
                    }
                });
            }
            window.loadProject = async(projetoID) => {
                projects = await updateDownloadedProjects();
                findCurrentProject(projects, projetoID);
                appendBlade("projeto-view", projetoID);
                var sellMode = 0;
                window.changeProjectSellMode = async (mode) => {
                    if(sellMode != mode) {
                        var height = document.getElementById("values-table-0").offsetHeight;
                        if(mode == 1) {
                            document.getElementById("first-table").classList.add("table-hidden-to-top");
                            document.getElementsByClassName('collapsible')[0].style.height = (document.getElementsByClassName('collapsible')[0].offsetHeight - height) + 'px';
                        } else {
                            document.getElementById("first-table").classList.remove("table-hidden-to-top");
                            document.getElementById("values-table-0").style.marginTop = "15px";
                            document.getElementsByClassName('collapsible')[0].style.height = (document.getElementsByClassName('collapsible')[0].offsetHeight + height) + 'px';
                        }
                        for(var i = 0; i < document.querySelector("#select-horizontal-menu").getElementsByTagName("p").length; i++) {
                            document.querySelector("#select-horizontal-menu").getElementsByTagName("p")[i].classList.remove('menu-option-selected');
                        }
                        document.querySelector("#select-horizontal-menu").getElementsByTagName("p")[mode].classList.add('menu-option-selected');
                        sellMode = mode;
                        setTimeout(() => {
                            handleChangeInSellMode(mode);
                        }, 300);
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            sellMode: mode
                        }, { merge: true });
                    }
                }
                window.deleteProject = async() => {
                    document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Exluindo";
                    document.querySelector("#popup-save-changes").classList.add('loading');
                    await deleteDoc(doc(db, "users", user.uid, "projetos", currentProject.id));
                    try {
                        await deleteObject(ref(storage, user.uid + "/" + currentProject.id  + "/" + "header"));
                    }
                    catch (error) {}
                    projects = await updateDownloadedProjects();
                    closePopUp();
                    appendBlade("projetos");
                }
                window.deleteProjectEvent = async(index) => {
                    var eventsUpdated = currentProject.events;
                    eventsUpdated.splice(index, 1);
                    await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                        events: eventsUpdated
                    }, { merge: true });
                    projects = await updateDownloadedProjects();
                    findCurrentProject(projects, projetoID);
                    loadProjectEvents();
                }
                window.saveProjectEvent = async() => {
                    var eventsUpdated = [];
                    if(currentProject.events != undefined) {
                        eventsUpdated = currentProject.events;
                    }
                    if(validateInputsForm('save-event-form')) {
                        document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
                        document.querySelector("#popup-save-changes").classList.add('loading');
                        eventsUpdated.push({
                            name: document.getElementById('nome-evento').value,
                            date: document.getElementById('data-evento').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            events: eventsUpdated
                        }, { merge: true }).then(async function() {
                            closePopUp();
                            projects = await updateDownloadedProjects();
                            findCurrentProject(projects, projetoID);
                            loadProjectEvents();
                        });
                    }
                }
                window.saveProjectContact = async() => {
                    if(validateInputsForm('save-new-contact-form')) {
                        document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
                        document.querySelector("#popup-save-changes").classList.add('loading');
                        var contactsUpdated = [];
                        if(currentProject.contacts != undefined) {
                            contactsUpdated = currentProject.contacts;
                        }
                        contactsUpdated.push({
                            name: document.getElementById('contact-name').value,
                            job: document.getElementById('contact-job').value,
                            number: document.getElementById('contact-number').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            contacts: contactsUpdated
                        }, { merge: true });
                        closePopUp();
                        projects = await updateDownloadedProjects();
                        findCurrentProject(projects, projetoID);
                        loadProjectContacts();
                        document.getElementsByClassName('collapsible')[6].classList.remove('collapsible-open');
                        openProjectDetail(6);
                    }
                }
                window.saveAlbum = async() => {
                    if(validateInputsForm('add-new-album-form')) {
                        document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
                        document.querySelector("#popup-save-changes").classList.add('loading');
                        var savedAlbums = [];
                        if(currentProject.albums != undefined) {
                            savedAlbums = currentProject.albums;
                        }
                        savedAlbums.push({
                            name: document.getElementById('album-name').value,
                            images: document.getElementById('photo-album-input').files.length
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            albums: savedAlbums
                        }, { merge: true });
                        var counter = 0;
                        for(var i = 0; i < document.getElementById('photo-album-input').files.length; i++) {
                            var storageRef = ref(storage, user.uid + "/" + currentProject.id + "/" + savedAlbums.length + "/" + i);
                            uploadBytes(storageRef, document.getElementById('photo-album-input').files[i]).then(async (snapshot) => {
                                counter++;
                                if(counter == document.getElementById('photo-album-input').files.length) {
                                    closePopUp();
                                    projects = await updateDownloadedProjects();
                                    loadProject(currentProject.id);
                                }
                            });
                        }
                    }
                }
                window.changeImage = async() => {
                    if(validateInputsForm('save-new-image-form')) {
                        document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
                        document.querySelector("#popup-save-changes").classList.add('loading');
                        var file = document.getElementById('image-file').files[0];
                        var storageRef = ref(storage, user.uid + "/" + currentProject.id  + "/" + "header");
                        uploadBytes(storageRef, file).then(async(snapshot) => {
                            closePopUp();
                            projects = await updateDownloadedProjects();
                            loadProject(currentProject.id);
                        });
                    }
                }
                window.saveNote = async() => {
                    if(validateInputsForm('add-new-note-form')) {
                        document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
                        document.querySelector("#popup-save-changes").classList.add('loading');
                        var notesUpdated = [];
                        if(currentProject.notes != undefined) {
                            notesUpdated = currentProject.notes;
                        }
                        notesUpdated.push({
                            note: document.getElementById('note').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            notes: notesUpdated
                        }, { merge: true });
                        closePopUp();
                        projects = await updateDownloadedProjects();
                        findCurrentProject(projects, projetoID);
                        loadProjectNotes();
                        document.getElementsByClassName('collapsible')[5].classList.remove('collapsible-open');
                        openProjectDetail(5);
                    }
                }
                window.saveReformCategory = async() => {
                    if(validateInputsForm('add-new-caterogy-form')) {
                        document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
                        document.querySelector("#popup-save-changes").classList.add('loading');
                        var reformCategories = [];
                        if(currentProject.reformCategories != undefined) {
                            reformCategories = currentProject.reformCategories;
                        }
                        reformCategories.push({
                            name: document.getElementById('category-name').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            reformCategories: reformCategories
                        }, { merge: true });
                        closePopUp();
                        projects = await updateDownloadedProjects();
                        findCurrentProject(projects, projetoID);
                        loadProjectReformCategories();
                        loadProjectReforms();
                        document.getElementsByClassName('collapsible')[1].classList.remove('collapsible-open');
                        openProjectDetail(1);
                    }
                }
                window.saveReform = async(category) => {
                    if(validateInputsForm('add-new-reform-form')) {
                        document.querySelector("#popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
                        document.querySelector("#popup-save-changes").classList.add('loading');
                        var reformExpenses = [];
                        if(currentProject.reformExpenses != undefined) {
                            reformExpenses = currentProject.reformExpenses;
                        }
                        var reform = {
                            name: document.getElementById('gasto-name').value,
                            value: getRawValue(document.getElementById('gasto-value').value),
                            category: category
                        }
                        reformExpenses.push(reform);
                        var totalExpenses = 0;
                        for(var i = 0; i < reformExpenses.length; i++) {
                            totalExpenses += parseFloat(getRawValue(reformExpenses[i].value));
                        }
                        document.getElementById("reforma-final").value = getFormatedValue(totalExpenses, "R$");
                        currentProject.projectCustomValues[37] = totalExpenses;
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            reformExpenses: reformExpenses,
                            totalReformExpenses: totalExpenses,
                            projectCustomValues: currentProject.projectCustomValues
                        }, { merge: true });
                        closePopUp();
                        projects = await updateDownloadedProjects();
                        findCurrentProject(projects, projetoID);
                        loadProjectReformCategories();
                        loadProjectReforms();
                        document.getElementsByClassName('collapsible')[1].classList.remove('collapsible-open');
                        openProjectDetail(1);
                    }
                }
                window.updateReformValue = () => {
                    var reformCategories = [];
                    var totalExpensesPerCategory = [];
                    var totalExpenses = 0;
                    if(currentProject.reformExpenses != undefined) {
                        var reformExpenses = currentProject.reformExpenses;
                        totalExpensesPerCategory = new Array(currentProject.reformCategories.length).fill(0);
                        for(var i = 0; i < reformExpenses.length; i++) {
                            totalExpenses += parseFloat(getRawValue(reformExpenses[i].value));
                            totalExpensesPerCategory[parseInt(reformExpenses[i].category)] += parseFloat(getRawValue(reformExpenses[i].value));
                        }
                        for(var i = 0; i < currentProject.reformCategories.length; i++) {
                            reformCategories.push(currentProject.reformCategories[i].name);
                        }
                    }
                    generateProjectGraphs(reformCategories, totalExpensesPerCategory);
                    var limReforma = parseFloat(getRawValue(document.getElementById("reforma-input").value));
                    document.getElementById("default-bg-indicator").style.backgroundColor = "color(srgb 0.0059 0.2044 0.585)";
                    if(limReforma == "" || parseInt(limReforma) == 0) {
                        document.getElementById("remaining-value").value = "Não definido";
                        document.getElementById("progress-text").innerHTML = "0%";
                        document.getElementById("progress-indicator").style.width = "0%";
                    } else if(limReforma - totalExpenses < 0) {
                        document.getElementById("remaining-value").value = "R$ 0,00";
                        document.getElementById("progress-text").innerHTML = getFormatedValue(((totalExpenses / limReforma) * 100).toFixed(2), "%");
                        document.getElementById("progress-indicator").style.width = (100 - (parseFloat(((totalExpenses / limReforma) * 100)) - 100)).toString() + "%";
                        document.getElementById("default-bg-indicator").style.backgroundColor = "#d81818";
                    } else {
                        document.getElementById("remaining-value").value = getFormatedValue(limReforma - totalExpenses, "R$");
                        document.getElementById("progress-text").innerHTML = getFormatedValue(((totalExpenses / limReforma) * 100).toFixed(2), "%");
                        document.getElementById("progress-indicator").style.width = parseInt(totalExpenses / limReforma * 100) + "%";
                    }
                }
                var statusMenuOpen = false;
                window.openStatusMenu = () => {
                    if(statusMenuOpen) {
                        document.getElementById("status-dropdown").style.display = "none";
                        statusMenuOpen = false;
                    } else {
                        statusMenuOpen = true;
                        document.getElementById("status-dropdown").style.display = "flex";
                    }
                }
                window.changeProjectStatus = async(status) => {
                    if(status != 0) {
                        //Remove project from prospect groups
                        await getDocs(collection(db, "users", auth.currentUser.uid, "prospect")).then((querySnapshot) => {
                            querySnapshot.forEach(async (retrievedDoc) => {
                                var group = retrievedDoc.data();
                                group.id = retrievedDoc.id;
                                var projects = group.selectedProjects;
                                for(var j = 0; j < projects.length; j++) {
                                    if(projects[j] == currentProject.id) {
                                        projects.splice(j, 1);
                                        //Recalculate medium value per meter for group
                                        var totalValue = 0;
                                        var totalArea = 0;
                                        for(var k = 0; k < projects.length; k++) {
                                            var project = projects[k];
                                            //Retrieve project data
                                            var projectData = await getDoc(doc(db, "users", auth.currentUser.uid, "projetos", project));
                                            project = projectData.data();
                                            totalValue += parseFloat(getRawValue(project.valorAnuncio));
                                            totalArea += parseFloat(getRawValue(project.area));
                                        }
                                        var mediumValue = 0;
                                        if(totalArea != 0) {
                                            mediumValue = totalValue / totalArea;
                                        }
                                        //Delete doc if no projects are left
                                        if(projects.length == 0) {
                                            await deleteDoc(doc(db, "users", auth.currentUser.uid, "prospect", group.id));
                                        } else {
                                            await updateDoc(doc(db, "users", auth.currentUser.uid, "prospect", group.id), {
                                                selectedProjects: projects,
                                                groupValue: mediumValue
                                            });
                                        }
                                    }
                                }
                            });
                        });
                    }
                    if(status == 3) {
                        const inputs = document.getElementById("values-table-5").querySelectorAll("input");
                        const atLeastOneFilled = Array.from(inputs).some(input => input.value != "" && input.value != "-" && parseInt(getRawValue(input.value)) != 0);
                        if(!atLeastOneFilled) {
                            showPopUp();
                            document.getElementById("popup-title").innerHTML = "Erro ao encerrar projeto";
                            document.getElementById("popup-text").innerHTML = "Para encerrar um projeto, é necessário preencher a tabela localizada em Resultados -> Realizado. Esses valores são mostrados na dashboard e são essenciais para o cálculo de rentabilidade.";
                            document.getElementById("popup-save-changes").innerHTML = "Entendi";
                            document.getElementById("popup-save-changes").setAttribute("onclick", "closePopUp()");
                            document.getElementById("popup-save-changes").classList.remove("loading");
                            return;
                        }
                    }
                    saveProjectChanges(5);
                    await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                        status: status
                    });
                    projects = await updateDownloadedProjects();
                    for(var i = 0; i < document.querySelector("#status-dropdown").getElementsByTagName("p").length; i++) {
                        document.querySelector("#status-dropdown").getElementsByTagName("p")[i].innerHTML = projectStatus[i];
                    }
                    updateValuesChartStats();
                    document.querySelector("#status-dropdown").getElementsByTagName("p")[status].innerHTML = "&bull; " + projectStatus[status];
                    document.getElementById("status-dropdown").style.display = "none";
                    document.getElementById("projectStatus").innerHTML = projectStatus[status];
                    statusMenuOpen = false;
                }
                setTimeout(async () => {
                    addProjectButtonsListeners();
                    handleProjectFirstLoad();
                    document.getElementById('metragem').innerHTML =  getFormatedValue(currentProject.area, "int") + "m²";
                    if(parseInt(getFormatedValue(currentProject.quartos, "int")) > 0) {
                        document.getElementById('num-quartos').innerHTML = parseInt(getFormatedValue(currentProject.quartos, "int")) == 1 ? getFormatedValue(currentProject.quartos, "int") + " quarto" : getFormatedValue(currentProject.quartos, "int") + " quartos";
                    } else {
                        document.getElementById('num-quartos').remove();
                    }
                    if(parseInt(getFormatedValue(currentProject.banheiros, "int")) > 0) {
                        document.getElementById('num-banheiros').innerHTML = parseInt(getFormatedValue(currentProject.banheiros, "int")) == 1 ? getFormatedValue(currentProject.banheiros, "int") + " banheiro" : getFormatedValue(currentProject.banheiros, "int") + " banheiros";
                    } else {
                        document.getElementById('num-banheiros').remove();
                    }
                    if(parseInt(getFormatedValue(currentProject.vagas, "int")) > 0) {
                        document.getElementById('num-vagas').innerHTML = parseInt(getFormatedValue(currentProject.vagas, "int")) == 1 ? getFormatedValue(currentProject.vagas, "int") + " vaga" : getFormatedValue(currentProject.vagas, "int") + " vagas";
                    } else {
                        document.getElementById('num-vagas').remove();
                    }
                    if(currentProject.elevador == "not-informed") {
                        document.getElementById('tem-elevador').remove();
                    } else if(currentProject.elevador == "true") {
                        document.getElementById('tem-elevador').innerHTML = "Com Elevador";
                    } else {
                        document.getElementById('tem-elevador').innerHTML = "Sem Elevador";
                    }
                    document.getElementById('project-title').innerHTML = currentProject.name;
                    document.getElementById('project-name').value = currentProject.name;
                    document.getElementById('project-condominio').value = getFormatedValue(currentProject.condominio, "R$");
                    document.getElementById('project-adress').value = currentProject.endereco;
                    document.getElementById('project-anuncio').value = getFormatedValue(currentProject.valorAnuncio, "R$");
                    document.getElementById('project-valor').value = getFormatedValue(currentProject.valorMetro, "R$");
                    document.getElementById('project-link').value = currentProject.linkAnuncio;
                    if(currentProject.linkAnuncio != "") {
                        document.getElementById('project-link').onclick = () => {
                            if(document.getElementById('project-link').hasAttribute('readonly')) {
                                window.open(currentProject.linkAnuncio, '_blank');
                            }
                        }
                    }
                    await getDownloadURL(ref(storage, user.uid + "/" + currentProject.id  + "/" + "header"))
                    .then((url) => {
                        document.getElementById('project-image').src = url;
                    }).catch((error) => {
                        document.getElementById('project-image').src = "./images/placeholder-img.png";
                    });
                    if(currentProject.status != undefined) {
                        document.getElementById("projectStatus").innerHTML = projectStatus[currentProject.status];
                        document.querySelector("#status-dropdown").getElementsByTagName("p")[currentProject.status].innerHTML = "&bull; " + projectStatus[currentProject.status];
                    } else {
                        document.getElementById("projectStatus").innerHTML = projectStatus[0];
                        document.querySelector("#status-dropdown").getElementsByTagName("p")[0].innerHTML = "&bull; " + projectStatus[currentProject.status];
                    }
                    if(currentProject.projectCustomValues != undefined) {
                        var inputs = document.querySelectorAll(".values-table input");
                        for(var i = 0; i < inputs.length; i++) {
                            if(inputs[i].classList.contains('special-days-input')) {
                                var ending = " dias";
                                if(parseInt(currentProject.projectCustomValues[i]) == 1) {
                                    ending = " dia";
                                }
                                inputs[i].value = parseInt(currentProject.projectCustomValues[i]) + ending;
                            } else if(inputs[i].classList.contains('meses')) {
                                var ending = " meses"
                                if(parseInt(currentProject.projectCustomValues[i]) == 1) {
                                    ending = " mês";
                                }
                                inputs[i].value = parseInt(currentProject.projectCustomValues[i]) + ending;
                                document.querySelector("#timeToSellMonths").innerHTML = parseInt(currentProject.projectCustomValues[i]) + ending;
                            } else {
                                var type = inputs[i].classList.contains('porc') ? "%" : "R$";
                                if(inputs[i].id == "irpf-porc") {
                                    type = "%";
                                }
                                inputs[i].value = getFormatedValue(currentProject.projectCustomValues[i], type);
                            }
                        }
                    }
                    loadProjectEvents(currentProject);
                    loadProjectContacts();
                    loadProjectNotes();
                    loadProjectReformCategories();
                    loadProjectReforms();
                    updateReformValue();
                    if(currentProject.sellMode != undefined) {
                        changeProjectSellMode(currentProject.sellMode);
                    } else {
                        await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
                            sellMode: 0
                        }, { merge: true });
                    }
                    // window.deletePhoto = async(album, photo) => {
                    //     var albumPhotos = currentProject.albums[album].images;
                    //     var newAlbumPhotos = albumPhotos - 1;
                    //     var albumPhotosArray = [];
                    //     for(var i = 0; i < albumPhotos; i++) {
                    //         if(i != photo) {
                    //             albumPhotosArray.push(i);
                    //         }
                    //     }
                    //     await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", currentProject.id), {
                    //         albums: [{
                    //             name: currentProject.albums[album].name,
                    //             images: newAlbumPhotos
                    //         }]
                    //     }, { merge: true });
                    //     var storageRef = ref(storage, user.uid + "/" + currentProject.id + "/" + (album + 1) + "/" + photo);
                    //     deleteObject(storageRef).then(() => {
                    //         projects = updateDownloadedProjects();
                    //         loadProject(currentProject.id);
                    //     });
                    // }
                    if(currentProject.albums != undefined && currentProject.albums.length > 0) {
                        document.getElementById('photos-container').innerHTML = "";
                        for(var j = 0; j < currentProject.albums.length; j++) {
                            var album = document.createElement('div');
                            album.classList.add('photo-album');
                            var albumTitle = document.createElement('h3');
                            albumTitle.innerHTML = currentProject.albums[j].name;
                            album.appendChild(albumTitle);
                            var albumFlex = document.createElement('div');
                            albumFlex.classList.add('photos-flex');
                            for(var i = 0; i < parseInt(currentProject.albums[j].images); i++) {
                                var imageContainer = document.createElement('div');
                                imageContainer.classList.add('photo-container-project-simple');
                                const image = document.createElement('img');
                                image.id = "photo-" + j + "-" + i;
                                image.src = "./images/placeholder-img.png";
                                imageContainer.appendChild(image);
                                image.onclick = () => {
                                    document.getElementById('photo-view').src = image.src;
                                    document.getElementById('photo-view').style.top = document.getElementById(image.id).getBoundingClientRect().top + "px";
                                    document.getElementById('photo-view').style.left = document.getElementById(image.id).getBoundingClientRect().left + "px";
                                    document.getElementById('photo-view').style.width = document.getElementById(image.id).getBoundingClientRect().width + "px";
                                    document.getElementById('main-content-container').style.filter = "blur(5px) opacity(0.5)";
                                    setTimeout(() => {
                                        document.getElementById('photo-view-container').style.display = "flex";
                                    }, 100);
                                    document.getElementById("close-image-view-btn").onclick = () => {
                                        document.getElementById('photo-view-container').style.display = "none";
                                        document.getElementById('main-content-container').style.filter = "none";
                                    }
                                }
                                // var deleteBtn = document.createElement('img');
                                // deleteBtn.classList.add('delete-photo-btn');
                                // deleteBtn.src = './images/trash-icon.png';
                                // deleteBtn.setAttribute('onclick', 'deletePhoto(' + j + ', ' + i + ')');
                                // imageContainer.appendChild(deleteBtn);
                                albumFlex.appendChild(imageContainer);
                            }
                            album.appendChild(albumFlex);
                            document.getElementById('photos-container').appendChild(album);
                        }
                        for(var j = 0; j < currentProject.albums.length; j++) {
                            for(var i = 0; i < parseInt(currentProject.albums[j].images); i++) {
                                await getDownloadURL(ref(storage, user.uid + "/" + currentProject.id + "/" + (j + 1) + "/" + i))
                                .then((url) => {
                                    document.getElementById("photo-" + j + "-" + i).src = url;
                                });
                            }
                        }
                    }
                }, 500);
            }
            window.showProjects = async() => {
                var correctProjects = [];
                for(var i = 0; i < projects.length; i++) {
                    if(projects[i].status != 0) {
                        correctProjects.push(projects[i]);
                    }
                }
                projects = correctProjects;
                if(projects.length > 0) {
                    document.getElementById('projects-container').innerHTML = "";
                }
                for(var i = 0; i < projects.length; i++) {
                    showProject(projects[i], "projects-container");
                }
            }
            var params = parseURLParams(window.location.href);
            if(params && params.id) {
                loadProject(params.id[0]);
            } else if(params && params.p) {
                appendBlade(params.p[0]);
            } else {
                appendBlade('dashboard');
            }
        } else {
            document.getElementById("email").value = "";
            document.getElementById("senha").value = "";
            document.getElementById("login").style.display = "flex";
            document.getElementById("loader-container").style.display = "none";
            document.getElementById("main-content-container").style.display = "none";
            window.history.replaceState(null, null, "?p=dashboard");
        }
    }, 500);
});















window.openProjectDetail = async(detail) => {
    if (document.getElementsByClassName('collapsible')[detail].classList.contains('collapsible-open')) {
        document.getElementsByClassName('collapsible')[detail].style.height = '60px';
        document.getElementsByClassName('collapsible')[detail].classList.remove('collapsible-open');
        document.getElementsByClassName('collapsible')[detail].getElementsByClassName('collapsible-content')[0].style.display = 'none';
        document.getElementsByClassName('collapsible')[detail].getElementsByClassName('collapsible-arrow')[0].style.transform = 'rotate(0deg)';
    } else {
        document.getElementsByClassName('collapsible')[detail].classList.add('collapsible-open');
        document.getElementsByClassName('collapsible')[detail].getElementsByClassName('collapsible-content')[0].style.display = 'block';
        var height = document.getElementsByClassName('collapsible')[detail].getElementsByClassName('collapsible-content')[0].offsetHeight;
        document.getElementsByClassName('collapsible')[detail].style.height = height + 90 + 'px';
        document.getElementsByClassName('collapsible')[detail].getElementsByClassName('collapsible-arrow')[0].style.transform = 'rotate(-180deg)';
        if(detail == 3) {
            setTimeout(() => {
                var height = document.getElementsByClassName('collapsible')[detail].getElementsByClassName('collapsible-content')[0].offsetHeight;
                document.getElementsByClassName('collapsible')[detail].style.height = height + 90 + 'px';
            }, 200);
        }
    }
}

//Validate correct information for new project
window.validateProject = () => {
    var inputs = document.querySelector("#new-project-form").getElementsByTagName("input");
    var allowed = true;
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].value == "" && !inputs[i].classList.contains('optional')) {
            allowed = false;
            inputs[i].style.border = "1px solid red";
            inputs[i].style.backgroundColor = "rgb(255, 238, 238)";
            inputs[i].addEventListener('input', function() {
                if(this.value != "") {
                    this.style.border = "1px solid #ccc";
                    this.style.backgroundColor = "white";
                    document.getElementById('error-message').innerHTML = "";
                } else {
                    this.style.border = "1px solid red";
                    this.style.backgroundColor = "rgb(255, 238, 238)";
                }
            });
        }
    }
    if(allowed) {
        createProject();
    } else {
        document.getElementById('error-message').innerHTML = "Preencha todos os campos indicados";
    }
}

window.closePopUp = () => {
    document.getElementById('website-overlay').style.display = "none";
    document.getElementById('main-content-container').style.filter = "none";
    document.getElementById("popup-text").innerHTML = "";
}

window.addProjectEvent = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Adicionar Evento";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveProjectEvent()');
    document.getElementById('save-event-form').style.display = "block";
}

window.addProjectContact = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Adicionar Contato";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveProjectContact()');
    document.getElementById('save-new-contact-form').style.display = "block";
}

window.addProjectNote = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Adicionar Anotação";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveNote()');
    document.getElementById('add-new-note-form').style.display = "block";
}

window.addPhotoAlbum = () => {
    showPopUp();
    document.getElementById('photo-album-input').innerHTML = "";
    document.getElementById('popup-title').innerHTML = "Adicionar Álbum de Fotos";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveAlbum()');
    document.getElementById('add-new-album-form').style.display = "block";
}

window.addReformCategory = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Adicionar Categoria de Reforma";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveReformCategory()');
    document.getElementById('add-new-caterogy-form').style.display = "block";
}

window.addReform = (category) => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Adicionar Gasto";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveReform('+category+')');
    document.getElementById('add-new-reform-form').style.display = "block";
}

window.changeImagePopUp = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Alterar Imagem";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'changeImage()');
    document.getElementById('save-new-image-form').style.display = "block";
}

window.confirmDeleteProject = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Deletar Projeto?";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'deleteProject()');
    document.getElementById('popup-save-changes').innerHTML = "Confirmar Deleção";
    document.getElementById('popup-save-changes').classList.add('highlight-button-danger');
    document.getElementById('delete-project-form').style.display = "block";
}

window.showPopUp = () => {
    document.getElementById('popup-save-changes').innerHTML = "Salvar";
    document.getElementById('popup-save-changes').classList.remove('highlight-button-danger');
    document.getElementById('popup-save-changes').classList.remove('loading');
    for(var i = 0; i < document.querySelector('#website-overlay').getElementsByTagName("input").length; i++) {
        document.querySelector('#website-overlay').getElementsByTagName("input")[i].value = "";
    }
    for(var i = 0; i < document.querySelector('#website-overlay').getElementsByTagName("form").length; i++) {
        document.querySelector('#website-overlay').getElementsByTagName("form")[i].style.display = "none";
    }
    document.getElementById('website-overlay').style.display = "flex";
    document.getElementById('main-content-container').style.filter = "blur(5px)";
}

window.openMobileMenu = () => {
    document.getElementById('sidebar').style.display = "block";
    document.getElementById('content').style.filter = "blur(5px)";
    setTimeout(() => {
        document.getElementById('content').setAttribute('onclick', 'closeMobileMenu()');
    }, 200);
}

window.closeMobileMenu = () => {
    document.getElementById('sidebar').style.display = "none";
    document.getElementById('content').style.filter = "none";
    document.getElementById('content').removeAttribute('onclick');
}

window.onresize = () => {
    if(window.innerWidth >= 1100) {
        document.getElementById('sidebar').style.display = "block";
    } else {
        document.getElementById('sidebar').style.display = "none";
    }
}

window.googleSignIn = () => {signInWithPopup(auth, provider).then((result) => {})};

function formatStringWithDots(str) {
    let reversedStr = str.split('').reverse().join('');
    let formattedReversedStr = reversedStr.replace(/.{3}(?=.)/g, '$&.');
    let formattedStr = formattedReversedStr.split('').reverse().join('');
    return formattedStr;
}

window.getFormatedValue = (value, formatType) => {
    value = value.toString();
    if(formatType == "R$") {
        value = value.replace(".", ",");
        var finalValue = value.split(',')[1];
        if(finalValue == undefined) {
            finalValue = "00";
        }
        var isNegative = false;
        if(value.includes("-")) {
            isNegative = true;
            value = value.replace("-", "");
        }
        value = formatStringWithDots(value.split(',')[0]) + "," + finalValue.toString().slice(0, 2);
        if(isNegative) {
            value = formatType + "-" + value;
        } else {
            value = formatType + value;
        }
    } else if(formatType == "dias") {
        value = parseInt(value);
        if(value == 1) {
            value = value + " dia";
        } else {
            value = value + " dias";
        }
    } else if(formatType == "int") {
        value = parseInt(value);
        value = value.toString();
    } else {
        value = parseFloat(value);
        value = value.toFixed(2).replace(".", ",") + formatType;
    }
    return value;
}

window.getRawValue = (value) => {
    value = value.toString();
    value = value.replace(/[^0-9.,-]/g, '');
    value = value.replace(',', '.');
    var charArray = value.split('');
    if(charArray.slice(-3)[0] == '.') {
        charArray[charArray.length - 3] = ',';
    } else if(charArray.slice(-3)[1] == '.') {
        charArray[charArray.length - 2] = ',';
    }
    for(var i = 0; i < charArray.length; i++) {
        if(charArray[i] == '.') {
            charArray[i] = '';
        }
    }
    value = charArray.join('');
    value = value.replace(".", "");
    value = value.replace(",", ".");
    value = parseFloat(value).toFixed(2);
    if(value == "NaN") {
        value = 0;
    }

    return value;
}

document.getElementById("photo-album-input").addEventListener("input", function() {
    var files = document.getElementById("photo-album-input").files;
    document.getElementById('photo-album-preview').innerHTML = "";
    for(var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = document.createElement("img");
            img.src = e.target.result;
            document.getElementById('photo-album-preview').appendChild(img);
        }
        reader.readAsDataURL(files[i]);
    }
})

window.aboutFlipUp = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Sobre o FlipUp";
    document.getElementById("aboutFlipUp-form").style.display = "block";
    document.getElementById("popup-save-changes").setAttribute("onclick", "closePopUp()");
    document.getElementById("popup-save-changes").innerHTML = "Fechar";
}

window.saveProfileInfo = async() => {
    if(validateInputsForm('account-info-popUp')) {
        document.getElementById("popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
        document.getElementById("popup-save-changes").classList.add('loading');
        var name = document.getElementById("account-name").value;
        var email = document.getElementById("account-email").value;
        updateProfile(auth.currentUser, {
            displayName: name
        }).then(() => {
            updateEmail(auth.currentUser, email).then(() => {
                closePopUp();
                location.reload();
            })
        })
    }
}

window.showProfilePopUp = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Editar Perfil";
    document.getElementById("account-info-popUp").style.display = "block";
    document.getElementById("popup-save-changes").setAttribute("onclick", "saveProfileInfo()");
    document.getElementById("popup-save-changes").innerHTML = "Salvar";
    document.getElementById("account-email").value = auth.currentUser.email;
    document.getElementById("account-name").value = auth.currentUser.displayName;
    if(auth.currentUser.providerData[0].providerId == "google.com") {
        //Remove message if already exists
        if(document.getElementById("account-info-popUp").getElementsByTagName("p").length > 2) {
            document.getElementById("account-info-popUp").getElementsByTagName("p")[2].remove();
        }
        document.getElementById("account-email").setAttribute("readonly", "true");
        document.getElementById("account-email").style.backgroundColor = "#f5f5f5";
        var message = document.createElement("p");
        message.innerHTML = "Você está logado com uma conta Google, portanto, não é possível alterar o email por aqui. Para alterar o email da sua conta, crie outra conta ou acesse as configurações da sua conta Google.";
        message.style.color = "#666";
        message.style.fontSize = "14px";
        message.style.marginTop = "10px";
        document.getElementById("account-info-popUp").appendChild(message);
    }
}

window.changePassword = async() => {
    if(validateInputsForm('edit-password-popUp')) {
        if(document.getElementById("edit-password-popUp").getElementsByTagName("p").length > 3) {
            document.getElementById("edit-password-popUp").getElementsByTagName("p")[3].remove();
        }
        if(document.getElementById("new-password").value != document.getElementById("confirm-password").value) {
            var error = document.createElement("p");
            error.innerHTML = "As senhas não coincidem";
            error.style.color = "red";
            error.style.fontSize = "14px";
            error.style.marginTop = "10px";
            document.getElementById("edit-password-popUp").appendChild(error);
        } else if(document.getElementById("new-password").value.length < 6) {
            var error = document.createElement("p");
            error.innerHTML = "A senha deve ter no mínimo 6 caracteres";
            error.style.color = "red";
            error.style.fontSize = "14px";
            error.style.marginTop = "10px";
            document.getElementById("edit-password-popUp").appendChild(error);
        } else {
            document.getElementById("popup-save-changes").innerHTML = "<div class='btn-loader'></div>Salvando";
            document.getElementById("popup-save-changes").classList.add('loading');
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email,
                document.getElementById("old-password").value
            )
            await reauthenticateWithCredential(
                auth.currentUser, 
                credential
            ).then(() => {
                var password = document.getElementById("new-password").value;
                updatePassword(auth.currentUser, password).then(() => {
                    closePopUp();
                })
            }).catch((e) => {
                var error = document.createElement("p");
                error.innerHTML = "Senha antiga incorreta";
                error.style.color = "red";
                error.style.fontSize = "14px";
                error.style.marginTop = "10px";
                document.getElementById("edit-password-popUp").appendChild(error);
                document.getElementById("popup-save-changes").innerHTML = "Salvar";
                document.getElementById("popup-save-changes").classList.remove('loading');
            });
        }
    }
}

window.showPasswordPopUp = () => {
    //Verify if user is logged in with Google
    if(auth.currentUser.providerData[0].providerId == "google.com") {
        showPopUp();
        document.getElementById('popup-title').innerHTML = "Alterar Senha";
        document.getElementById("popup-save-changes").innerHTML = "Fechar";
        document.getElementById("popup-save-changes").setAttribute("onclick", "closePopUp()");
        document.getElementById("popup-text").innerHTML = "Você está logado com uma conta Google, portanto, não é possível alterar a senha por aqui. Para alterar a senha da sua conta, acesse as configurações da sua conta Google.";
    } else {
        showPopUp();
        document.getElementById('popup-title').innerHTML = "Alterar Senha";
        document.getElementById("edit-password-popUp").style.display = "block";
        document.getElementById("popup-save-changes").setAttribute("onclick", "changePassword()");
        document.getElementById("popup-save-changes").innerHTML = "Salvar";
    }
}

document.getElementById("category-name").addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
    }
});