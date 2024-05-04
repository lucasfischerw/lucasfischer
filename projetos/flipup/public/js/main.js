import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, updateEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getStorage, ref,uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

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

var projects = [];
var docsId = [];

function parseURLParams(url) {
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
            if(file == "prospeccao") {
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

//Verify is signed in
auth.onAuthStateChanged(async function(user) {
    setTimeout(async () => {
        document.getElementById("loader-container").style.display = "none";
        if (user) {
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
                var lastProjectNumber = 0;
                await getDocs(collection(db, "users", user.uid, "usage")).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        lastProjectNumber = doc.data().lastProjectNumber;
                    });
                });
                await addDoc(collection(db, "users", user.uid, "projetos"), {
                    name: document.getElementById('project-name').value,
                    endereco: document.getElementById('project-adress').value,
                    area: document.getElementById('project-area').value,
                    quartos: document.getElementById('project-quartos').value,
                    banheiros: document.getElementById('project-banheiros').value,
                    elevador: document.getElementById('elevator-yes').checked,
                    vagas: document.getElementById('project-vagas').value,
                    condominio: document.getElementById('project-condominio').value,
                    valorAnuncio: document.getElementById('project-anuncio').value,
                    valorMetro: document.getElementById('project-metro').value,
                    linkAnuncio: document.getElementById('project-link').value,
                    notes: new Array({note: document.getElementById('project-notes').value}),
                    created_at: new Date(),
                    updated_at: new Date(),
                    user: user.uid
                }).then(function(docRef) {
                    var file = document.getElementById('image-file').files[0];
                    var storageRef = ref(storage, user.uid + "/" + docRef.id + "header");
                    uploadBytes(storageRef, file).then((snapshot) => {
                        console.log('Uploaded a blob or file!');
                    });
                });
                await updateDoc(doc(db, "users", user.uid, "usage", "projects"), {
                    lastProjectNumber: lastProjectNumber + 1
                });
            }
            await getDocs(collection(db, "users", user.uid, "projetos")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    docsId.push(doc.id);
                    projects.push(doc.data());
                });
            });
            window.loadProject = async(projeto) => {
                appendBlade("projeto-view", docsId[projeto]);
                setTimeout(async () => {
                    var currentProject = projects[projeto];
                    document.getElementById('metragem').innerHTML = currentProject.area + "m²";
                    document.getElementById('num-quartos').innerHTML = currentProject.quartos + " quartos";
                    document.getElementById('num-banheiros').innerHTML = currentProject.banheiros + " banheiros";
                    document.getElementById('num-vagas').innerHTML = currentProject.vagas + " vagas";
                    if(currentProject.elevador) {
                        document.getElementById('tem-elevador').innerHTML = "Com Elevador";
                    } else {
                        document.getElementById('tem-elevador').innerHTML = "Sem Elevador";
                    }
                    document.getElementById('project-title').innerHTML = currentProject.name;
                    document.getElementById('project-name').innerHTML = "Nome: " + currentProject.name;
                    document.getElementById('project-condominio').innerHTML = "Condomínio: R$" + currentProject.condominio;
                    document.getElementById('project-adress').innerHTML = "Endereço: " + currentProject.endereco;
                    document.getElementById('project-anuncio').innerHTML = "Valor do Anúncio: R$" + currentProject.valorAnuncio;
                    document.getElementById('project-valor').innerHTML = "Valor por metro: R$" + currentProject.valorMetro;
                    document.getElementById('project-link').href = currentProject.linkAnuncio;
                    document.getElementById('project-link').innerHTML = currentProject.linkAnuncio;
                    getDownloadURL(ref(storage, user.uid + "/" + docsId[projeto] + "header"))
                    .then((url) => {
                        document.getElementById('project-image').src = url;
                    });
                    window.updateReformValue = () => {
                        if(currentProject.reformExpenses != undefined) {
                            var reformExpenses = currentProject.reformExpenses;
                            var totalExpenses = 0;
                            for(var i = 0; i < reformExpenses.length; i++) {
                                totalExpenses += parseInt(reformExpenses[i].value);
                            }
                        }
                        if(parseInt(document.getElementById("limite-reforma").value) - totalExpenses < 0 || document.getElementById("limite-reforma").value == "") {
                            document.getElementById("remaining-value").value = 0;
                            document.getElementById("progress-text").innerHTML = ">100%";
                            document.getElementById("progress-indicator").style.width = "100%";
                        } else {
                            document.getElementById("remaining-value").value = parseInt(document.getElementById("limite-reforma").value) - totalExpenses;
                            document.getElementById("progress-text").innerHTML = parseInt((totalExpenses / parseInt(document.getElementById("limite-reforma").value) * 100)) + "%";
                            document.getElementById("progress-indicator").style.width = parseInt((totalExpenses / parseInt(document.getElementById("limite-reforma").value) * 100)) + "%";
                        }
                    }
                    var statusMenuOpen = false;
                    var projectStatus = ["Prospecção", "Em Obra", "Anunciado", "Vendido"];
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
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            status: status
                        });
                        for(var i = 0; i < document.querySelector("#status-dropdown").getElementsByTagName("p").length; i++) {
                            document.querySelector("#status-dropdown").getElementsByTagName("p")[i].innerHTML = projectStatus[i];
                        }
                        document.querySelector("#status-dropdown").getElementsByTagName("p")[status].innerHTML = "&bull; " + projectStatus[status];
                        document.getElementById("status-dropdown").style.display = "none";
                        document.getElementById("projectStatus").innerHTML = projectStatus[status];
                        statusMenuOpen = false;
                    }
                    if(currentProject.status != undefined) {
                        document.getElementById("projectStatus").innerHTML = projectStatus[currentProject.status];
                        document.querySelector("#status-dropdown").getElementsByTagName("p")[currentProject.status].innerHTML = "&bull; " + projectStatus[currentProject.status];
                    } else {
                        document.getElementById("projectStatus").innerHTML = projectStatus[0];
                        document.querySelector("#status-dropdown").getElementsByTagName("p")[0].innerHTML = "&bull; " + projectStatus[currentProject.status];
                    }
                    if(currentProject.change0 != undefined) {
                        var inputs = document.querySelector("#values-table-0").getElementsByTagName("input");
                        for(var i = 0; i < inputs.length; i++) {
                            inputs[i].value = currentProject.change0[i];
                            if(inputs[i].classList.contains('porc')) {
                                inputs[i].value += "%";
                            } else {
                                inputs[i].value = "R$" + inputs[i].value;
                            }
                        }
                    }
                    if(currentProject.change1 != undefined) {
                        var inputs = document.querySelector("#values-table-1").getElementsByTagName("input");
                        for(var i = 0; i < inputs.length; i++) {
                            inputs[i].value = currentProject.change1[i];
                            if(inputs[i].classList.contains('porc')) {
                                inputs[i].value += "%";
                            } else {
                                inputs[i].value = "R$" + inputs[i].value;
                            }
                        }
                    }
                    if(currentProject.change2 != undefined) {
                        var inputs = document.querySelector("#values-table-2").getElementsByTagName("input");
                        for(var i = 0; i < inputs.length; i++) {
                            inputs[i].value = currentProject.change2[i];
                            if(inputs[i].classList.contains('porc')) {
                                inputs[i].value += "%";
                            } else {
                                inputs[i].value = "R$" + inputs[i].value;
                            }
                        }
                        document.getElementById("lucro-bruto2").value = "R$" + currentProject.change2[3];
                    }
                    if(currentProject.change3 != undefined) {
                        var inputs = document.querySelector("#values-table-3").getElementsByTagName("input");
                        for(var i = 0; i < inputs.length; i++) {
                            inputs[i].value = currentProject.change3[i];
                            if(inputs[i].classList.contains('porc')) {
                                inputs[i].value += "%";
                            } else {
                                inputs[i].value = "R$" + inputs[i].value;
                            }
                        }
                        document.getElementById("roi-2").value = currentProject.change3[2] + "%";
                    }
                    if(currentProject.change4 != undefined) {
                        document.getElementById('limite-reforma').value = currentProject.change4[0];
                        updateReformValue();
                        document.getElementById('limite-reforma').value = "R$" + document.getElementById('limite-reforma').value;
                        document.getElementById('remaining-value').value = "R$" + document.getElementById('remaining-value').value;
                    }
                    if(currentProject.notes != undefined) {
                        document.getElementById('notes-inner').innerHTML = "";
                        for(var i = 0; i < currentProject.notes.length; i++) {
                            var note = document.createElement('p');
                            note.classList.add('note');
                            note.innerHTML = currentProject.notes[i].note;
                            document.getElementById('notes-inner').appendChild(note);
                        }
                    }
                    if(currentProject.events != undefined && currentProject.events.length > 0) {
                        document.getElementById('cronograma-values').innerHTML = "";
                        for(var i = 0; i < currentProject.events.length; i++) {
                            var event = document.createElement('div');
                            event.classList.add('dia');
                            var diaCard = document.createElement('div');
                            diaCard.classList.add('dia-card');
                            var date = document.createElement('h4');
                            date.innerHTML = new Date(currentProject.events[i].date).toLocaleDateString().split('/')[0] + '/' + new Date(currentProject.events[i].date).toLocaleDateString().split('/')[1];
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
                    }
                    if(currentProject.contacts != undefined && currentProject.contacts.length > 0) {
                        document.getElementById('contatos-values').innerHTML = "";
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
                            contactInfo.appendChild(name);
                            contactInfo.appendChild(job);
                            contactInfo.appendChild(number);
                            contact.appendChild(contactInitials);
                            contact.appendChild(contactInfo);
                            document.getElementById('contatos-values').appendChild(contact);
                        }
                    }

                    if(currentProject.reformCategories != undefined && currentProject.reformCategories.length > 0) {
                        document.getElementById('reform-categories').innerHTML = "";
                        for(var i = 0; i < currentProject.reformCategories.length; i++) {
                            var category = document.createElement('div');
                            category.classList.add('custo-reforma');
                            var categoryName = document.createElement('h3');
                            categoryName.innerHTML = currentProject.reformCategories[i].name;
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
                            category.appendChild(categoryName);
                            category.appendChild(outerDiv);
                            document.getElementById('reform-categories').appendChild(category);
                        }
                    }

                    if(currentProject.reformExpenses != undefined && currentProject.reformExpenses.length > 0) {
                        for(var i = 0; i < currentProject.reformExpenses.length; i++) {
                            var reform = document.createElement('div');
                            reform.classList.add('flex-align-between');
                            var name = document.createElement('p');
                            name.innerHTML = currentProject.reformExpenses[i].name + ":";
                            var value = document.createElement('p');
                            value.innerHTML = "R$" + currentProject.reformExpenses[i].value;
                            reform.appendChild(name);
                            reform.appendChild(value);
                            document.getElementById('custos-' + currentProject.reformExpenses[i].category).appendChild(reform);
                        }
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
                                await getDownloadURL(ref(storage, user.uid + "/" + docsId[projeto] + "/" + (j + 1) + "/" + i))
                                .then((url) => {
                                    document.getElementById("photo-" + j + "-" + i).src = url;
                                });
                            }
                        }
                    }



                    window.deleteProjectEvent = async(index) => {
                        var eventsUpdated = currentProject.events;
                        eventsUpdated.splice(index, 1);
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            events: eventsUpdated
                        }, { merge: true });
                        loadProject(projeto);
                    }
                    window.saveProjectEvent = async() => {
                        var eventsUpdated = [];
                        if(currentProject.events != undefined) {
                            eventsUpdated = currentProject.events;
                        }
                        eventsUpdated.push({
                            name: document.getElementById('nome-evento').value,
                            date: document.getElementById('data-evento').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            events: eventsUpdated
                        }, { merge: true });
                        closePopUp();
                        loadProject(projeto);
                    }
                    window.saveProjectContact = async() => {
                        var contactsUpdated = [];
                        if(currentProject.contacts != undefined) {
                            contactsUpdated = currentProject.contacts;
                        }
                        contactsUpdated.push({
                            name: document.getElementById('contact-name').value,
                            job: document.getElementById('contact-job').value,
                            number: document.getElementById('contact-number').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            contacts: contactsUpdated
                        }, { merge: true });
                        closePopUp();
                        loadProject(projeto);
                    }
                    window.saveAlbum = async() => {
                        var savedAlbums = [];
                        if(currentProject.albums != undefined) {
                            savedAlbums = currentProject.albums;
                        }
                        savedAlbums.push({
                            name: document.getElementById('album-name').value,
                            images: document.getElementById('photo-album-input').files.length
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            albums: savedAlbums
                        }, { merge: true });
                        var counter = 0;
                        for(var i = 0; i < document.getElementById('photo-album-input').files.length; i++) {
                            var storageRef = ref(storage, user.uid + "/" + docsId[projeto] + "/" + savedAlbums.length + "/" + i);
                            uploadBytes(storageRef, document.getElementById('photo-album-input').files[i]).then(async (snapshot) => {
                                counter++;
                                if(counter == document.getElementById('photo-album-input').files.length) {
                                    closePopUp();
                                    loadProject(projeto);
                                }
                            });
                        }
                    }
                    window.changeImage = async() => {
                        var file = document.getElementById('image-file').files[0];
                        var storageRef = ref(storage, user.uid + "/" + docsId[projeto] + "header");
                        uploadBytes(storageRef, file).then((snapshot) => {
                            closePopUp();
                            loadProject(projeto);
                        });
                    }
                    window.saveNote = async() => {
                        var notesUpdated = [];
                        if(currentProject.notes != undefined) {
                            notesUpdated = currentProject.notes;
                        }
                        notesUpdated.push({
                            note: document.getElementById('note').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            notes: notesUpdated
                        }, { merge: true });
                        closePopUp();
                        loadProject(projeto);
                    }
                    window.saveReformCategory = async() => {
                        var reformCategories = [];
                        if(currentProject.reformCategories != undefined) {
                            reformCategories = currentProject.reformCategories;
                        }
                        reformCategories.push({
                            name: document.getElementById('category-name').value,
                        });
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            reformCategories: reformCategories
                        }, { merge: true });
                        closePopUp();
                        loadProject(projeto);
                    }
                    window.saveReform = async(category) => {
                        var reformExpenses = [];
                        if(currentProject.reformExpenses != undefined) {
                            reformExpenses = currentProject.reformExpenses;
                        }
                        var reform = {
                            name: document.getElementById('gasto-name').value,
                            value: document.getElementById('gasto-value').value,
                            category: category
                        }
                        reformExpenses.push(reform);
                        await updateDoc(doc(db, "users", user.uid, "projetos", docsId[projeto]), {
                            reformExpenses: reformExpenses
                        }, { merge: true });
                        closePopUp();
                        loadProject(projeto);
                    }
                }, 500);
            }
            window.showProjects = async() => {
                if(projects.length > 0) {
                    document.getElementById('projects-container').innerHTML = "";
                }
                for(var i = 0; i < projects.length; i++) {
                    var bigCard = document.createElement('div');
                    bigCard.classList.add('big-card');
                    var image = document.createElement('img');
                    image.src = "./images/placeholder-img.png";
                    getDownloadURL(ref(storage, user.uid + "/" + docsId[i] + "header"))
                    .then((url) => {
                        image.src = url;
                    });
                    var title = document.createElement('h2');
                    title.innerHTML = projects[i].name;
                    var info = document.createElement('div');
                    info.classList.add('project-highlight-atribbutes-dashboard');
                    var metragem = document.createElement('p');
                    metragem.innerHTML = projects[i].area + "m²";
                    var quartos = document.createElement('p');
                    quartos.innerHTML = projects[i].quartos + " quartos";
                    var banheiros = document.createElement('p');
                    banheiros.innerHTML = projects[i].banheiros + " banheiros";
                    var vagas = document.createElement('p');
                    vagas.innerHTML = projects[i].vagas + " vagas";
                    var elevator = document.createElement('p');
                    if(projects[i].elevador) {
                        elevator.innerHTML = "Com Elevador";
                    } else {
                        elevator.innerHTML = "Sem Elevador";
                    }
                    var endereco = document.createElement('p');
                    endereco.innerHTML = projects[i].endereco;
                    var button = document.createElement('button');
                    button.innerHTML = "Ver detalhes";
                    button.classList.add('highlight-button');
                    button.setAttribute('onclick', 'loadProject(' + i + ')');
                    info.appendChild(metragem);
                    info.appendChild(quartos);
                    info.appendChild(banheiros);
                    info.appendChild(vagas);
                    info.appendChild(elevator);
                    bigCard.appendChild(image);
                    bigCard.appendChild(title);
                    bigCard.appendChild(info);
                    bigCard.appendChild(endereco);
                    bigCard.appendChild(button);
                    document.getElementById('projects-container').appendChild(bigCard);
                }
            }
            var prospectProjects = [];
            await getDocs(collection(db, "users", user.uid, "prospect")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var project = {
                        id: doc.id,
                        name: doc.data().name,
                        selectedProjects: doc.data().selectedProjects
                    }
                    prospectProjects.push(project);
                });
            });
            window.loadProspect = function() {
                if(prospectProjects.length > 0) {
                    for(var i = 0; i < prospectProjects.length; i++) {
                        var container = document.createElement('div');
                        container.classList.add('projects-group');
                        var title = document.createElement('h2');
                        title.innerHTML = prospectProjects[i].name;
                        var value = document.createElement('p');
                        value.innerHTML = "Valor Médio: R$" + prospectProjects[i].value + "/m²";
                        var imageContainer = document.createElement('div');
                        imageContainer.classList.add('prospeccao-flex');
                        for(var j = 0; j < prospectProjects[i].selectedProjects.length; j++) {
                            const image = document.createElement('img');
                            image.src = "./images/placeholder-img.png";
                            getDownloadURL(ref(storage, user.uid + "/" + docsId[prospectProjects[i].selectedProjects[j]] + "header"))
                            .then((url) => {
                                image.src = url;
                            });
                            imageContainer.appendChild(image);
                        }
                        container.appendChild(title);
                        container.appendChild(value);
                        container.appendChild(imageContainer);
                        document.getElementById('prospect-projects-container').appendChild(container);
                    }
                }
            }
            window.initMap = async() => {
                const { Map } = await google.maps.importLibrary("maps");
                const map = new google.maps.Map(document.getElementById("map"), {
                    zoom: 14,
                    center: new google.maps.LatLng(37.4419, -122.1419),
                });
                for(var i = 0; i < prospectProjects.length; i++) {
                    for(var j = 0; j < prospectProjects[i].selectedProjects.length; j++) {
                        console.log(projects[prospectProjects[i].selectedProjects[j]].endereco);
                        var address = projects[prospectProjects[i].selectedProjects[j]].endereco;
                        var geocoder = new google.maps.Geocoder();
                        var marker;
                        const urlString = "./images/"+ i +"-pin.png";
                        geocoder.geocode( { 'address': address}, function(results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                for(var k = 0; k < results.length; k++) {
                                    console.log(results[k]);
                                }
                                marker = new google.maps.Marker({
                                    position: { lat: parseFloat(results[0].geometry.location.lat()), lng: parseFloat(results[0].geometry.location.lng()) },
                                    map: map,
                                    icon: {
                                        url: urlString,
                                        scaledSize: new google.maps.Size(35, 35)
                                    }
                                });
                                map.setCenter(new google.maps.LatLng(parseFloat(results[0].geometry.location.lat()), parseFloat(results[0].geometry.location.lng())));
                            }
                        });
                    }
                }
            }
            window.saveNewProspect = async() => {
                var selectedProjects = [];
                for(var i = 0; i < document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project').length; i++) {
                    if(document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[i].classList.contains('selected')) {
                        selectedProjects.push(i);
                    }
                }
                await addDoc(collection(db, "users", user.uid, "prospect"), {
                    name: document.getElementById('prospect-name').value,
                    value: document.getElementById('prospect-value').value,
                    selectedProjects: selectedProjects,
                }).then(function() {
                    location.reload();
                });
            }
            window.selectProspectProject = (index) => {
                if(document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[index].classList.contains('selected')) {
                    document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[index].classList.remove('selected');
                } else {
                    document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[index].classList.add('selected');
                }
            }
            window.addNewProspect = () => {
                showPopUp();
                document.getElementById('popup-title').innerHTML = "Adicionar Prospecção";
                document.getElementById('popup-save-changes').setAttribute('onclick', 'saveNewProspect()');
                document.getElementById('add-new-prospect-form').style.display = "block";
                if(projects.length > 0) {
                    for(var i = 0; i < projects.length; i++) {
                        var container = document.createElement('div');
                        container.classList.add('prospect-project');
                        var name = document.createElement('p');
                        name.innerHTML = projects[i].name;
                        var selected = document.createElement("h3");
                        selected.innerHTML = "Selecionado";
                        var image = document.createElement('img');
                        image.src = "./images/placeholder-img.png";
                        getDownloadURL(ref(storage, user.uid + "/" + docsId[i] + "header"))
                        .then((url) => {
                            image.src = url;
                        });
                        container.setAttribute('onclick', 'selectProspectProject(' + i + ')');
                        container.appendChild(image);
                        container.appendChild(selected);
                        container.appendChild(name);
                        document.getElementById('prospect-available-projects').appendChild(container);
                    }
                }
            }
            var params = parseURLParams(window.location.href);
            if(params && params.id) {
                var index = docsId.indexOf(params.id[0]);
                loadProject(index);
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
        }
    }, 500);
});















window.openProjectDetail = (detail) => {
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

window.changeProjectSellMode = (mode) => {
    if(mode == 1) {
        document.getElementById("values-table-0").style.display = "none";
    } else {
        document.getElementById("values-table-0").style.display = "block";
    }
    var height = document.getElementsByClassName('collapsible')[0].getElementsByClassName('collapsible-content')[0].offsetHeight;
    document.getElementsByClassName('collapsible')[0].style.height = height + 90 + 'px';
    for(var i = 0; i < document.querySelector("#select-horizontal-menu").getElementsByTagName("p").length; i++) {
        document.querySelector("#select-horizontal-menu").getElementsByTagName("p")[i].classList.remove('menu-option-selected');
    }
    document.querySelector("#select-horizontal-menu").getElementsByTagName("p")[mode].classList.add('menu-option-selected');
}

//Validate correct information for new project
window.validateProject = () => {
    var inputs = document.querySelector("#new-project-form").getElementsByTagName("input");
    var allowed = true;
    for(var i = 0; i < inputs.length; i++) {
        if(inputs[i].value == "") {
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
        document.getElementById('error-message').innerHTML = "Preencha corretamente os campos";
    }
}

window.closePopUp = () => {
    document.getElementById('website-overlay').style.display = "none";
    document.getElementById('main-content-container').style.filter = "none";
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

var valorCompra = 500000;

window.updateInputs = (id) => {
    setTimeout(() => {
        document.getElementById(id.split('-')[0] + "-input").value = parseInt(valorCompra * parseFloat(document.getElementById(id).value / 100));
    }, 20);
    if(id.split('-')[0] == "financiado") {
        document.getElementById('entrada-porc').value = 100 - document.getElementById(id).value;
        document.getElementById('entrada-input').value = valorCompra * (document.getElementById('entrada-porc').value / 100);
    } else if(id.split('-')[0] == "entrada") {
        document.getElementById('financiado-porc').value = 100 - document.getElementById(id).value;
        document.getElementById('financiado-input').value = valorCompra * (document.getElementById('financiado-porc').value / 100);
    }
}

window.updatePorcentage = (id) => {
    setTimeout(() => {
        document.getElementById(id.split('-')[0] + "-porc").value = parseFloat(document.getElementById(id).value / valorCompra * 100, 2).toFixed(2);
    }, 20);
}

window.saveProjectChanges = async(fieldSelected) => {
    for(var j = 0; j < 4; j++) {
        var inputs = document.querySelector("#values-table-" + j + "").getElementsByTagName("input");
        var values = [];
        for(var i = 0; i < inputs.length; i++) {
            values.push(inputs[i].value.replace("%", "").replace("R$", ""));
        }
        await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", docsId[0]), {
            ['change'+j]: values
        });
    }
    document.getElementById("editAtt-button-" + fieldSelected).innerHTML = "Editar";
    document.getElementById("editAtt-button-" + fieldSelected).setAttribute('onclick', 'editprojectFields("' + fieldSelected + '")');
    var inputs = document.querySelector("#values-table-" + fieldSelected + "").getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++) {
        inputs[i].value = inputs[i].value.replace("%", "").replace("R$", "");
        if(inputs[i].classList.contains('porc')) {
            inputs[i].value += "%";
        } else {
            inputs[i].value = "R$" + inputs[i].value;
        }
        inputs[i].setAttribute('readonly', 'true');
        inputs[i].classList.remove('active-input');
    }
}

window.editprojectFields = (fieldSelected) => {
    var inputs = document.querySelector("#values-table-" + fieldSelected + "").getElementsByTagName("input");
    document.getElementById("editAtt-button-" + fieldSelected).innerHTML = "Salvar";
    document.getElementById("editAtt-button-" + fieldSelected).setAttribute('onclick', 'saveProjectChanges("' + fieldSelected + '")');
    for(var i = 0; i < inputs.length; i++) {
        if(!inputs[i].classList.contains('auto')) {
            inputs[i].value = inputs[i].value.replace("%", "");
            inputs[i].value = inputs[i].value.replace("R$", "");
            if(inputs[i].classList.contains('porc')) {
                inputs[i].setAttribute('onkeyup', 'updateInputs("'+inputs[i].id+'")');
            } else if(inputs[i].classList.contains('value-change')) {
                inputs[i].setAttribute('onkeyup', 'updatePorcentage("'+inputs[i].id+'")');
            }
            inputs[i].removeAttribute('readonly');
            inputs[i].classList.add('active-input');
        }
    }
}

window.updateROI = () => {
    setTimeout(() => {
        console.log(parseInt(document.getElementById("lucro-liquido").value.replace("R$", "")));
        document.getElementById("roi").value = parseFloat((parseInt(document.getElementById("lucro-liquido").value.replace("R$", "")) / parseInt(document.getElementById("investimento-total").value.replace("R$", ""))) * 100).toFixed(2) + "%";
        document.getElementById("roi-2").value = parseFloat((parseInt(document.getElementById("lucro-liquido").value.replace("R$", "")) / parseInt(document.getElementById("investimento-total").value.replace("R$", ""))) * 100).toFixed(2) + "%";
    }, 100);
}

window.calculateLucroLiquid = () => {
    setTimeout(() => {
        document.getElementById("lucro-liquido").value = "R$" + (parseInt(document.getElementById("lucro-bruto").value.replace("R$", "")) - parseInt(document.getElementById("irpf").value.replace("R$", "")));
        updateROI();
    }, 50);
}

window.updateLucroBruto = () => {
    setTimeout(() => {
        var meses = 5;
        var calculo = [document.getElementById("valor-venda").value, document.getElementById("entrada-input").value, document.getElementById("juros-taxas").value, document.getElementById("valor-quitado").value, document.getElementById("reforma-input").value, document.getElementById("condominio").value, document.getElementById("despesas").value, document.getElementById("iptu").value, document.getElementById("itbi-input").value, document.getElementById("escritura-input").value, document.getElementById("corretagem").value]
        for(var i = 0; i < calculo.length; i++) {
            if(calculo[i] == "") {
                calculo[i] = 0;
            } else {
                calculo[i] = calculo[i].replace("R$", "");
                calculo[i] = parseInt(calculo[i]);
            }
        }
        document.getElementById("lucro-bruto").value = "R$" + parseInt(calculo[0] - calculo[1] - calculo[2] - calculo[3] - calculo[4] - (calculo[5] * meses) - (calculo[6] * meses) - (calculo[7] * meses) - calculo[8] - calculo[9] - calculo[10]);
        document.getElementById("lucro-bruto2").value = "R$" + parseInt(calculo[0] - calculo[1] - calculo[2] - calculo[3] - calculo[4] - (calculo[5] * meses) - (calculo[6] * meses) - (calculo[7] * meses) - calculo[8] - calculo[9] - calculo[10]);
        calculateLucroLiquid();
    }, 50);
}

window.changeData = () => {
    setTimeout(() => {
        document.getElementById("valor-venda").value = "R$" + document.getElementById("values-table-5").getElementsByTagName("input")[0].value;
        document.getElementById("reforma-input").value = "R$" + document.getElementById("values-table-5").getElementsByTagName("input")[1].value;
        document.getElementById("despesas").value = "R$" + document.getElementById("values-table-5").getElementsByTagName("input")[3].value;
        document.getElementById("corretagem").value = "R$" + document.getElementById("values-table-5").getElementsByTagName("input")[4].value;
        document.getElementById("irpf").value = "R$" + document.getElementById("values-table-5").getElementsByTagName("input")[6].value;
    }, 20);
}

window.calculateInvestment = () => {
    updateLucroBruto();
    setTimeout(() => {
        var calculo = [document.getElementById("entrada-input").value, document.getElementById("juros-taxas").value, document.getElementById("itbi-input").value, document.getElementById("escritura-input").value, document.getElementById("reforma-input").value, document.getElementById("despesas").value, document.getElementById("iptu").value, document.getElementById("condominio").value]
        for(var i = 0; i < calculo.length; i++) {
            if(calculo[i] == "") {
                calculo[i] = 0;
            } else {
                calculo[i] = calculo[i].replace("R$", "");
                calculo[i] = parseInt(calculo[i]);
            }
        }
        document.getElementById("investimento-total").value = "R$" + parseInt(calculo[0] + calculo[1] + calculo[2] + calculo[3] + calculo[4] + (calculo[5] * 5) + (calculo[6] * 5) + (calculo[7] * 5));
        updateROI();
    }, 50);
}

window.calculateTotal = () => {
    var tempoAteVenda = 5;
    var calculo = [document.getElementById("financiado-input").value, document.getElementById("amortizacao-parcela").value, document.getElementById("valor-parcela").value, document.getElementById("taxas-bancarias").value];
    for(var i = 0; i < calculo.length; i++) {
        if(calculo[i] == "") {
            calculo[i] = 0;
        } else {
            calculo[i] = calculo[i].replace("R$", "");
            calculo[i] = parseInt(calculo[i]);
        }
    }
    document.getElementById("valor-quitado").value = calculo[0] - (calculo[1] * tempoAteVenda);
    document.getElementById("juros-taxas").value = "R$" + parseInt((tempoAteVenda * (calculo[2] - calculo[1])) + calculo[3]);
}


window.showPopUp = (fieldSelected) => {
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