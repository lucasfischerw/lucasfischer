import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithRedirect, updateEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
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

function incorrectLogin() {
    document.querySelector("#email").style.border = "1px solid red";
    document.querySelector("#senha").style.border = "1px solid red";
    document.querySelector("#email").style.backgroundColor = "rgb(255, 238, 238)";
    document.querySelector("#senha").style.backgroundColor = "rgb(255, 238, 238)";
    document.querySelector("#email").addEventListener('input', function() {
        if(this.value != "") {
            this.style.border = "1px solid #ccc";
            this.style.backgroundColor = "white";
        } else {
            this.style.border = "1px solid red";
            this.style.backgroundColor = "rgb(255, 238, 238)";
        }
    });
    document.querySelector("#senha").addEventListener('input', function() {
        if(this.value != "") {
            this.style.border = "1px solid #ccc";
            this.style.backgroundColor = "white";
        } else {
            this.style.border = "1px solid red";
            this.style.backgroundColor = "rgb(255, 238, 238)";
        }
    });
}

window.signInEmail = () => {
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

window.appendBlade = (file, projectId=undefined) => {
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
        document.querySelector(".content").innerHTML = ""
        $(function () {
            $.get(fileName, function (data) {
                $(".content").append(data);
            });
        });
        document.querySelector(".content").style.opacity = "1";
        if(projectId != undefined) {
            window.history.replaceState(null, null, "?p=" + file+ "&id=" + projectId);
        } else {
            window.history.replaceState(null, null, "?p=" + file);
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
            window.createProject = async() => {
                var lastProjectNumber = 0;
                await getDocs(collection(db, "users", user.uid, "usage")).then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        lastProjectNumber = doc.data().lastProjectNumber;
                    });
                });
                await addDoc(collection(db, "users", user.uid, "projetos"), {
                    name: document.getElementById('project-name').value,
                    numero: lastProjectNumber + 1,
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
                    document.getElementById('project-number').innerHTML = "Número: " + currentProject.numero;
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
                    if(currentProject.notes != undefined) {
                        document.getElementById('notes-inner').innerHTML = "";
                        for(var i = 0; i < currentProject.notes.length; i++) {
                            var note = document.createElement('p');
                            note.classList.add('note');
                            note.innerHTML = currentProject.notes[i].note;
                            document.getElementById('notes-inner').appendChild(note);
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
                                console.log(document.getElementById("photo-" + j + "-" + i))
                                await getDownloadURL(ref(storage, user.uid + "/" + docsId[projeto] + "/" + (j + 1) + "/" + i))
                                .then((url) => {
                                    document.getElementById("photo-" + j + "-" + i).src = url;
                                });
                            }
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

                    var valorCompra = currentProject.valorAnuncio.replace(".", "").replace(",", ".");
                    console.log(valorCompra);
                    document.getElementById('financiado-input').value = valorCompra * (document.getElementById('financiado-porc').value.replace("%", "") / 100);
                    document.getElementById('entrada-porc').value = 100 - document.getElementById('financiado-porc').value.replace("%", "");
                    document.getElementById('entrada-input').value = valorCompra * (document.getElementById('entrada-porc').value.replace("%", "") / 100);




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
                }, 500);
            }
            window.showProjects = async() => {
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
            var params = parseURLParams(window.location.href);
            if(params.id) {
                var index = docsId.indexOf(params.id[0]);
                loadProject(index);
            } else if(params.p) {
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

window.changeImagePopUp = () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Alterar Imagem";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'changeImage()');
    document.getElementById('save-new-image-form').style.display = "block";
}

var valorCompra = 500000;

window.updateInputs = (id) => {
    console.log(id)
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
    var inputs = document.querySelector("#values-table-" + fieldSelected + "").getElementsByTagName("input");
    var values = [];
    for(var i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
    }
    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", docsId[0]), {
        [fieldSelected]: values
    });
    document.getElementById("editAtt-button-" + fieldSelected).innerHTML = "Editar";
    document.getElementById("editAtt-button-" + fieldSelected).setAttribute('onclick', 'editprojectFields("' + fieldSelected + '")');
    for(var i = 0; i < inputs.length; i++) {
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