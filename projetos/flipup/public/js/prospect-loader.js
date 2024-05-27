import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'
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
const storage = getStorage(app);

var prospectProjects = [];

window.updateLoadedProspectProjects = async () => {
    prospectProjects = [];
    await getDocs(collection(db, "users", auth.currentUser.uid, "prospect")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var project = {
                id: doc.id,
                name: doc.data().name,
                groupValue: doc.data().groupValue,
                selectedProjects: doc.data().selectedProjects
            }
            prospectProjects.push(project);
        });
    });
}

var groups;
var boundingRects = [];
var lastMouseX = 0;
var lastMouseY = 0;

function handleDrag(e) {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    boundingRects = [];
    for(var i = 0; i < groups.length; i++) {
        boundingRects.push(groups[i].getBoundingClientRect());
    }
    for(var i = 0; i < groups.length; i++) {
        if(e.clientX >= boundingRects[i].left && e.clientX <= boundingRects[i].right && e.clientY >= boundingRects[i].top && e.clientY <= boundingRects[i].bottom) {
            groups[i].style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        } else {
            groups[i].style.backgroundColor = "white";
        }
    }
}

async function handleDragEnd(e) {
    document.removeEventListener('drag', handleDrag);
    var selectedGroup = -1;
    for(var i = 0; i < groups.length; i++) {
        if(lastMouseX >= boundingRects[i].left && lastMouseX <= boundingRects[i].right && lastMouseY >= boundingRects[i].top && lastMouseY <= boundingRects[i].bottom) {
            selectedGroup = i;
        } 
    }
    var alreadySelected = false;
    for(var i = 0; i < prospectProjects[selectedGroup].selectedProjects.length; i++) {
        if(prospectProjects[selectedGroup].selectedProjects[i] === e.target.id) {
            alreadySelected = true;
        }
    }
    if(alreadySelected) {
        document.getElementById("prospect-" + selectedGroup).style.boxShadow = "0 0 5px 1px #ff0000ff";
        document.getElementById("prospect-" + selectedGroup).style.backgroundColor = "white";
        setTimeout(() => {
            document.getElementById("prospect-" + selectedGroup).style.boxShadow = "0px 0px 10px 0px #0000001a";
        }, 300);
    } else if(selectedGroup != -1) {
        prospectProjects[selectedGroup].selectedProjects.push(e.target.id);
        const image = document.createElement('img');
        image.src = document.getElementById(e.target.id).src;
        document.getElementById("prospect-" + selectedGroup).getElementsByClassName('prospeccao-flex')[0].appendChild(image);
        document.getElementById("prospect-" + selectedGroup).style.backgroundColor = "white";
        lastMouseX = 0;
        lastMouseY = 0;
    }
    var valorMedio = 0;
    var projects = await updateDownloadedProjects();
    for(var i = 0; i < prospectProjects[selectedGroup].selectedProjects.length; i++) {
        for(var j = 0; j < projects.length; j++) {
            if(projects[j].id === prospectProjects[selectedGroup].selectedProjects[i]) {
                valorMedio += parseFloat(projects[j].valorMetro);
            }
        }
    }
    valorMedio = valorMedio/prospectProjects[selectedGroup].selectedProjects.length;
    document.getElementById("prospect-" + selectedGroup).getElementsByTagName('p')[0].innerHTML = "Valor Médio: " + getFormatedValue(valorMedio, "R$").split("R$")[1] + " R$/m²";
    await updateDoc(doc(db, "users", auth.currentUser.uid, "prospect", prospectProjects[selectedGroup].id), {
        selectedProjects: prospectProjects[selectedGroup].selectedProjects,
        groupValue: valorMedio
    });
    initMap();
    document.removeEventListener('dragend', handleDragEnd);
}

window.dragProject = (projectId, currentProject) => {
    console.log(groups, boundingRects)
    console.log(projectId, currentProject);
    document.addEventListener('drag', handleDrag);
    document.addEventListener('dragend', handleDragEnd);
}

window.saveEditedProspect = async (id) => {
    if(validateInputsForm('add-new-prospect-form')) {
        var selectedProjects = [];
        for(var i = 0; i < document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project').length; i++) {
            if(document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[i].classList.contains('selected')) {
                selectedProjects.push(document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[i].id.split("prospect-project-" )[1]);
            }
        }
        if(selectedProjects.length == 0) {
            document.getElementById('no-selected-projects').style.color = "red";
        } else {
            var valorMedio = 0;
            var projects = await updateDownloadedProjects();
            for(var i = 0; i < selectedProjects.length; i++) {
                for(var j = 0; j < projects.length; j++) {
                    if(projects[j].id === selectedProjects[i]) {
                        valorMedio += parseFloat(projects[j].valorMetro);
                    }
                }
            }
            valorMedio = valorMedio/selectedProjects.length;
            await updateDoc(doc(db, "users", auth.currentUser.uid, "prospect", id), {
                name: document.getElementById('prospect-name').value,
                groupValue: valorMedio,
                selectedProjects: selectedProjects,
            }).then(function() {
                closePopUp();
                loadProspect();
            });
        }
    }
}

window.editProspect = async (id) => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Editar Prospecção";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveEditedProspect("' + id + '")');
    document.getElementById('add-new-prospect-form').style.display = "block";
    var projects = await updateDownloadedProjects();
    var correctProjects = [];
    for(var i = 0; i < projects.length; i++) {
        if(projects[i].status == 0) {
            correctProjects.push(projects[i]);
        }
    }
    projects = correctProjects;
    document.getElementById('prospect-available-projects').innerHTML = "";
    var currentGroupName;
    for(var i = 0; i < prospectProjects.length; i++) {
        if(prospectProjects[i].id === id) {
            currentGroupName = prospectProjects[i].name;
        }
    }
    document.getElementById('prospect-name').value = currentGroupName;
    if(projects.length > 0) {
        for(var i = 0; i < projects.length; i++) {
            const container = document.createElement('div');
            container.classList.add('prospect-project');
            container.id = "prospect-project-" + projects[i].id;
            const name = document.createElement('p');
            name.innerHTML = projects[i].name;
            const selected = document.createElement("h3");
            selected.innerHTML = "Selecionado";
            const image = document.createElement('img');
            image.src = "./images/placeholder-img.png";
            try {
                await getDownloadURL(ref(storage, auth.currentUser.uid + "/" + projects[i].id + "/" + "header"))
                .then((url) => {
                    image.src = url;
                });
            } catch(e) {
                image.src = "./images/placeholder-img.png";
            }
            if(prospectProjects.length > 0) {
                for(var j = 0; j < prospectProjects.length; j++) {
                    if(prospectProjects[j].id === id) {
                        for(var k = 0; k < prospectProjects[j].selectedProjects.length; k++) {
                            if(prospectProjects[j].selectedProjects[k] === projects[i].id) {
                                container.classList.add('selected');
                            }
                        }
                    }
                }
            }
            container.setAttribute("onclick", "selectProspectProject('" + projects[i].id + "')");
            container.appendChild(image);
            container.appendChild(selected);
            container.appendChild(name);
            document.getElementById('prospect-available-projects').appendChild(container);
        }
    }
}

window.loadProspect = async function() {
    document.getElementById('prospect-projects-container').innerHTML = "";
    document.getElementById('all-available-projects').innerHTML = "";
    var projects = await updateDownloadedProjects();
    var correctProjects = [];
    for(var i = 0; i < projects.length; i++) {
        if(projects[i].status == 0) {
            correctProjects.push(projects[i]);
        }
    }
    projects = correctProjects;
    for(var i = 0; i < projects.length; i++) {
        const image = document.createElement('img');
        image.id = projects[i].id;
        image.setAttribute('draggable', 'true');
        image.setAttribute('ondragstart', "dragProject('" + projects[i].id + "', " + i + ")");
        image.setAttribute('onclick', "loadProject('" + projects[i].id + "')");
        image.src = "./images/placeholder-img.png";
        try {
            await getDownloadURL(ref(storage, auth.currentUser.uid + "/" + projects[i].id + "/" + "header"))
            .then((url) => {
                image.src = url;
            });
        } catch(e) {
            image.src = "./images/placeholder-img.png";
        }
        document.getElementById('all-available-projects').appendChild(image);
    }
    if(projects.length == 0) {
        document.getElementById('all-available-projects').innerHTML = "<p class='no-visible-cards-warning'>Nenhum projeto definido como prospecção no momento. Começe criando um novo projeto ou altere o status de um projeto já existente.</p>";
    }
    await updateLoadedProspectProjects();
    groups = document.getElementById('prospect-projects-container').getElementsByClassName('projects-group');

    if(prospectProjects.length > 0) {
        for(var i = 0; i < prospectProjects.length; i++) {
            var container = document.createElement('div');
            container.classList.add('projects-group');
            container.id = "prospect-" + i;
            var header = document.createElement('div');
            header.classList.add('flex-align-between');
            var title = document.createElement('h2');
            title.innerHTML = prospectProjects[i].name;
            var buttonsContainer = document.createElement('div');
            buttonsContainer.classList.add('close-simple-flex');
            var deleteBtn = document.createElement('img');
            deleteBtn.src = "./images/trash-icon.png";
            deleteBtn.classList.add('delete-trash-button');
            var editBtn = document.createElement('img');
            editBtn.src = "./images/edit-icon.png";
            editBtn.classList.add('delete-trash-button');
            editBtn.setAttribute('onclick', "editProspect('" + prospectProjects[i].id + "')");
            const id = prospectProjects[i].id;
            deleteBtn.addEventListener('click', async function() {
                await deleteDoc(doc(db, "users", auth.currentUser.uid, "prospect", id)).then(() => {
                    loadProspect();
                    initMap();
                });
            });
            var value = document.createElement('p');
            value.innerHTML = "Valor Médio: " + getFormatedValue(prospectProjects[i].groupValue, "R$").split("R$")[1] + " R$/m²";
            var imageContainer = document.createElement('div');
            imageContainer.classList.add('prospeccao-flex');
            for(var j = 0; j < prospectProjects[i].selectedProjects.length; j++) {
                const image = document.createElement('img');
                image.setAttribute('onclick', "loadProject('" + prospectProjects[i].selectedProjects[j] + "')" );
                image.src = "./images/placeholder-img.png";
                try {
                    await getDownloadURL(ref(storage, auth.currentUser.uid + "/" + prospectProjects[i].selectedProjects[j] + "/" + "header"))
                    .then((url) => {
                        image.src = url;
                    });
                } catch(e) {
                    image.src = "./images/placeholder-img.png";
                }
                imageContainer.appendChild(image);
            }
            header.appendChild(title);
            buttonsContainer.appendChild(editBtn);
            buttonsContainer.appendChild(deleteBtn);
            header.appendChild(buttonsContainer);
            container.appendChild(header);
            container.appendChild(value);
            container.appendChild(imageContainer);
            document.getElementById('prospect-projects-container').appendChild(container);
        }
        initMap();
    }
}

window.initMap = async() => {
    const { Map } = await google.maps.importLibrary("maps");
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: new google.maps.LatLng(37.4419, -122.1419),
    });
    var projects = await updateDownloadedProjects();
    for(var i = 0; i < prospectProjects.length; i++) {
        const element = document.getElementById("prospect-" + i);
        for(var j = 0; j < prospectProjects[i].selectedProjects.length; j++) {
            for(var k = 0; k < projects.length; k++) {
                if(projects[k].id === prospectProjects[i].selectedProjects[j]) {
                    var address = projects[k].endereco;
                    var geocoder = new google.maps.Geocoder();
                    var marker;
                    const urlString = "./images/"+ (i%4) +"-pin.png";
                    geocoder.geocode( { 'address': address}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            marker = new google.maps.Marker({
                                position: { lat: parseFloat(results[0].geometry.location.lat()), lng: parseFloat(results[0].geometry.location.lng()) },
                                map: map,
                                icon: {
                                    url: urlString,
                                    scaledSize: new google.maps.Size(35, 35)
                                },
                                animation:google.maps.Animation.DROP
                            });
                            marker.addListener("click", () => {
                                element.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                                element.scrollIntoView({behavior: "smooth", block: "center"});
                                setTimeout(() => {
                                    element.style.backgroundColor = "white";
                                }, 300);
                            });
                            map.setCenter(new google.maps.LatLng(parseFloat(results[0].geometry.location.lat()), parseFloat(results[0].geometry.location.lng())));
                        }
                    });
                }
            }
        }
    }
}

window.saveNewProspect = async() => {
    if(validateInputsForm('add-new-prospect-form')) {
        var selectedProjects = [];
        for(var i = 0; i < document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project').length; i++) {
            if(document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[i].classList.contains('selected')) {
                selectedProjects.push(document.getElementById('prospect-available-projects').getElementsByClassName('prospect-project')[i].id.split("prospect-project-" )[1]);
            }
        }
        if(selectedProjects.length == 0) {
            document.getElementById('no-selected-projects').style.color = "red";
        } else {
            var valorMedio = 0;
            var projects = await updateDownloadedProjects();
            for(var i = 0; i < selectedProjects.length; i++) {
                for(var j = 0; j < projects.length; j++) {
                    if(projects[j].id === selectedProjects[i]) {
                        valorMedio += parseFloat(projects[j].valorMetro);
                    }
                }
            }
            valorMedio = valorMedio/selectedProjects.length;
            await addDoc(collection(db, "users", auth.currentUser.uid, "prospect"), {
                name: document.getElementById('prospect-name').value,
                groupValue: valorMedio,
                selectedProjects: selectedProjects,
            }).then(function() {
                closePopUp();
                loadProspect();
            });
        }
    }
}

window.selectProspectProject = (id) => {
    if(document.getElementById("prospect-project-" + id).classList.contains('selected')) {
        document.getElementById("prospect-project-" + id).classList.remove('selected');
    } else {
        document.getElementById('no-selected-projects').style.color = "black";
        document.getElementById("prospect-project-" + id).classList.add('selected');
    }
}

window.addNewProspect = async () => {
    showPopUp();
    document.getElementById('popup-title').innerHTML = "Adicionar Prospecção";
    document.getElementById('popup-save-changes').setAttribute('onclick', 'saveNewProspect()');
    document.getElementById('add-new-prospect-form').style.display = "block";
    var projects = await updateDownloadedProjects();
    var correctProjects = [];
    for(var i = 0; i < projects.length; i++) {
        if(projects[i].status == 0) {
            correctProjects.push(projects[i]);
        }
    }
    projects = correctProjects;
    document.getElementById('prospect-available-projects').innerHTML = "";
    if(projects.length > 0) {
        for(var i = 0; i < projects.length; i++) {
            const container = document.createElement('div');
            container.classList.add('prospect-project');
            container.id = "prospect-project-" + projects[i].id;
            const name = document.createElement('p');
            name.innerHTML = projects[i].name;
            const selected = document.createElement("h3");
            selected.innerHTML = "Selecionado";
            const image = document.createElement('img');
            image.src = "./images/placeholder-img.png";
            try {
                await getDownloadURL(ref(storage, auth.currentUser.uid + "/" + projects[i].id + "/" + "header"))
                .then((url) => {
                    image.src = url;
                });
            } catch(e) {
                image.src = "./images/placeholder-img.png";
            }
            container.setAttribute("onclick", "selectProspectProject('" + projects[i].id + "')");
            container.appendChild(image);
            container.appendChild(selected);
            container.appendChild(name);
            document.getElementById('prospect-available-projects').appendChild(container);
        }
    }
}