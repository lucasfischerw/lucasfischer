import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, updateEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'
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

window.showUserInfo = async() => {
    setTimeout(async () => {
        document.getElementById("user-name-complete").innerHTML = auth.currentUser.displayName;
        document.getElementById("user-email-page").innerHTML = auth.currentUser.email;
        document.getElementById("user-name-initials-big").innerHTML = auth.currentUser.displayName.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }, 200);
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
        if(file == "conta") {
            showUserInfo();
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
            labels: labels,
            datasets: [{
                barThickness: 25,
                label: 'Valor',
                data: data,
                borderRadius: 10,
                backgroundColor: bgColor,
            }]
        },options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    grace: '1%'
                },
            }
        }
    });
}

window.createRoundChart = (labels, data, containerId) => {
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
                ],
                hoverOffset: 4
            }]
        }, options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    bottom: 20
                }
            },
            cutout: 60,
        }
    });
}


window.generateProjectGraphs = (labels, totalExpensesPerCategory) => {
    document.getElementById("round-chart-project-container").innerHTML = "";
    document.getElementById("round-chart-project-container").innerHTML = "<canvas id='round-chart'></canvas>";
    if(labels.length == 0) {
        labels = ['Nenhum Gasto'];
        totalExpensesPerCategory = [1];
    }
    createRoundChart(labels, totalExpensesPerCategory, 'round-chart');
    document.getElementById("horizontal-chart-project-container").innerHTML = "";
    document.getElementById("horizontal-chart-project-container").innerHTML = "<canvas id='horizontal-chart'></canvas>";
    var labels = ['Valor de Venda', 'Lucro Líquido', 'Corretagem'];
    var data = [getRawValue(document.getElementById("valor-venda").value), getRawValue(document.getElementById("lucro-liquido").value), getRawValue(document.getElementById("corretagem-input").value)];
    createSimpleHorizontalChart(labels, data, 'horizontal-chart', ['color(srgb 0.7614 0.8417 0.9981)', 'color(srgb 0.2555 0.3638 1)', 'color(srgb 0.101 0.1263 0.4737)']);
    document.getElementById("horizontal-chart2-project-container").innerHTML = "";
    document.getElementById("horizontal-chart2-project-container").innerHTML = "<canvas id='horizontal-chart-2'></canvas>";
    var labels = ['Valor de Compra', 'ITBI', 'Registros', 'Reforma'];
    var data = [getRawValue(document.getElementById("valor-compra").value), getRawValue(document.getElementById("itbi-input").value), getRawValue(document.getElementById("escritura-input").value), getRawValue(document.getElementById("reforma-input").value)];
    createSimpleHorizontalChart(labels, data, 'horizontal-chart-2', '#3959f7');
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
            var deleteBtn = document.createElement('img');
            deleteBtn.src = "./images/trash-icon.png";
            deleteBtn.classList.add('delete-trash-button');
            deleteBtn.setAttribute('onclick', 'deleteProjectEvent(' + i + ')');
            diaCard.appendChild(date);
            diaCard.appendChild(dia);
            event.appendChild(diaCard);
            event.appendChild(name);
            event.appendChild(deleteBtn);
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
                var externalContainer = document.createElement('div');
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
                inputContainer2.appendChild(input2);
                inputContainer2.appendChild(description2);
                externalContainer.appendChild(inputContainer);
                externalContainer.appendChild(inputContainer2);
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
        console.log(currentProject.reformExpenses);
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

function loadProjectNotes() {
    document.getElementById('notes-inner').innerHTML = "";
    if(currentProject.notes != undefined) {
        var addedNotes = 0;
        for(var i = 0; i < currentProject.notes.length; i++) {
            if(currentProject.notes[i].note != "") {
                var note = document.createElement('p');
                note.classList.add('note');
                note.innerHTML = currentProject.notes[i].note;
                if(addedNotes == 0) {
                    document.getElementById('notes-inner').innerHTML = "";
                }
                document.getElementById('notes-inner').appendChild(note);
                addedNotes++;
            }
        }
    }
}

//Verify is signed in
auth.onAuthStateChanged(async function(user) {
    setTimeout(async () => {
        document.getElementById("loader-container").style.display = "none";
        if (user) {
            var projects = await updateDownloadedProjects();
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
                            console.log(document.getElementById("first-table"))
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
                        }, { merge: true });
                        closePopUp();
                        projects = await updateDownloadedProjects();
                        findCurrentProject(projects, projetoID);
                        loadProjectEvents();
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
                        await updateDoc(doc(db, "users", user.uid, "projetos", currentProject.id), {
                            reformExpenses: reformExpenses,
                            totalReformExpenses: totalExpenses
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
                    } else {

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
                    document.getElementById('project-name').innerHTML = "Nome: " + currentProject.name;
                    document.getElementById('project-condominio').innerHTML = "Condomínio: " + getFormatedValue(currentProject.condominio, "R$");
                    document.getElementById('project-adress').innerHTML = "Endereço: " + currentProject.endereco;
                    document.getElementById('project-anuncio').innerHTML = "Valor do Anúncio: " + getFormatedValue(currentProject.valorAnuncio, "R$");
                    document.getElementById('project-valor').innerHTML = "Valor por metro: " + getFormatedValue(currentProject.valorMetro, "R$");
                    document.getElementById('project-link').href = currentProject.linkAnuncio;
                    document.getElementById('project-link').innerHTML = currentProject.linkAnuncio;
                    try {
                        await getDownloadURL(ref(storage, user.uid + "/" + currentProject.id  + "/" + "header"))
                        .then((url) => {
                            document.getElementById('project-image').src = url;
                        });
                    } catch(e) {
                        document.getElementById('project-image').src = "./images/placeholder-img.png";
                    }
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
                                var image = document.createElement('img');
                                image.id = "photo-" + j + "-" + i;
                                albumFlex.appendChild(image);
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

window.googleSignIn = () => {signInWithPopup(auth, provider).then((result) => {}).catch((error) => {console.log(error)})};

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