// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"
import { getFirestore, collection, doc, setDoc, onSnapshot, updateDoc, deleteDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_a8y2TGjx587NmqynrmCOoc5U6Mx3a2E",
    authDomain: "todo-list-d99ba.firebaseapp.com",
    projectId: "todo-list-d99ba",
    storageBucket: "todo-list-d99ba.appspot.com",
    messagingSenderId: "709574396670",
    appId: "1:709574396670:web:805a970b519a49f6b233af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

//const analytics = getAnalytics(app);

document.getElementById("sign-in-btn").onclick = () => signInWithPopup(auth, provider);
document.getElementById("sign-out-btn").onclick = () => auth.signOut();

const db = getFirestore(app);
var tasksList = [];

function Update_Shown_List(userId) {
    //Atualizar listas de tarefas mostradas na tela
    document.getElementById("pending").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    //Read
    tasksList.forEach((docLoaded) => {
        var task = document.createElement("div");

        var title = document.createElement("h3");
        title.innerHTML = docLoaded.name;
        
        var date = document.createElement("p");
        date.innerHTML = new Date(docLoaded.date).toLocaleDateString();

        var input = document.createElement("p");
        input.setAttribute("class", "checkbox");
        input.setAttribute("id", docLoaded.tid);

        input.onclick = async () => {
            //Função para mudar estado da tarefa ao clicar no input de concluído
            if (document.getElementById(docLoaded.tid).parentElement.className.includes("completed")) {
                document.getElementById(docLoaded.tid).parentElement.setAttribute("class", "task");
                await updateDoc(doc(db, userId, docLoaded.tid), {
                    completed: false
                });
            } else {
                document.getElementById(docLoaded.tid).parentElement.setAttribute("class", "task completed");
                await updateDoc(doc(db, userId, docLoaded.tid), {
                    completed: true
                });
            }
        }

        var editBTN = document.createElement("img");
        editBTN.src = "./img/edit-icon.png"
        editBTN.setAttribute("class", "edit-btn")
        editBTN.onclick = () => {
            document.getElementById("task-edit-overlay").style.display = "flex";
            setTimeout(() => {
                document.getElementById("details-overlay").style.display = "block"
            }, 500);
            document.getElementById("signed-in").style.filter = "blur(5px) brightness(0.5)"
            document.getElementById("edit-task-name").value = docLoaded.name;
            document.getElementById("edit-task-date").value = new Date(docLoaded.date).toISOString().split('T')[0];
            document.getElementById("edit-task-details").value = docLoaded.details;
            document.getElementsByClassName("edit-task-save")[0].setAttribute("id", docLoaded.tid);
        }

        var deleteBTN = document.createElement("img");
        deleteBTN.src = "./img/trash-can-icon.png"
        deleteBTN.setAttribute("class", "delete-btn")
        deleteBTN.onclick = async () => {
            await deleteDoc(doc(db, userId, docLoaded.tid));
        }

        if (docLoaded.completed) {
            task.setAttribute("class", "task completed");
            input.setAttribute("checked", "")
        } else {
            task.setAttribute("class", "task");
        }

        var details = document.createElement("p");
        details.innerHTML = docLoaded.details;
        details.setAttribute("class", "task-details");
        
        task.appendChild(input);

        var textDiv = document.createElement("div");

        textDiv.appendChild(title);
        textDiv.appendChild(date);
        textDiv.appendChild(details);
        task.appendChild(textDiv);
        task.appendChild(editBTN);
        task.appendChild(deleteBTN);

        if (docLoaded.completed) {
            document.getElementById("completed").appendChild(task);
        } else {
            document.getElementById("pending").appendChild(task);
        }
    });
    if (document.getElementById("pending").childElementCount == 0) {
        document.getElementById("pending-container").style.display = "none"
    } else {
        document.getElementById("pending-container").style.display = "block"
    }
    if (document.getElementById("completed").childElementCount == 0) {
        document.getElementById("completed-container").style.display = "none"
    } else {
        document.getElementById("completed-container").style.display = "block"
    }

    for (let task of document.getElementsByClassName("task")) {
        task.children[1].onclick = async () => {
            setTimeout(() => {
                document.getElementById("details-overlay").style.display = "block"
            }, 500);
            document.getElementById("signed-in").style.filter = "blur(5px) brightness(0.5)"
            var docRef = await getDoc(doc(db, userId, task.firstChild.id));
            document.getElementById("task-details-overlay-title").innerHTML = docRef.data().name;
            document.getElementById("task-details-overlay-date").innerHTML = "Data limite: " + new Date(docRef.data().date).toLocaleDateString();
            if (docRef.data().details == "") {
                document.getElementById("task-details-overlay-text").innerHTML = "Nenhuma anotação inserida na tarefa";
            } else {
                document.getElementById("task-details-overlay-text").innerHTML = "Anotações: " + docRef.data().details;
            }
            document.getElementById("task-details-overlay").style.display = "flex";
        }
    }

    if (document.getElementsByClassName("task").length == 0) {
        document.getElementById("no-tasks-container").style.display = "block"
    } else {
        document.getElementById("no-tasks-container").style.display = "none"
    }

}

auth.onAuthStateChanged(user => {
    if(user) {
        //Carregar página signed in
        document.getElementById("text").innerHTML = user.displayName;
        document.getElementById("signed-out").style.display = "none";
        document.getElementById("signed-in").hidden = false;
        
        //Esperar updates de tarefas do usuário atual na database
        onSnapshot(collection(db, user.uid), (querySnapshot) => {
            tasksList = [];
            var index = 0;
            querySnapshot.forEach((doc) => {
                tasksList.push(doc.data());
                tasksList[index].tid = doc.id;
                index++;
            });
            tasksList.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });
            Update_Shown_List(user.uid);
        });

        document.getElementsByClassName("edit-task-save")[0].onclick = async () => {
            var dateVar = document.getElementById("edit-task-date").value.split('-');
            await updateDoc(doc(db, user.uid, document.getElementsByClassName("edit-task-save")[0].id), {
                name: document.getElementById("edit-task-name").value,
                date: new Date(dateVar[0], dateVar[1] - 1, dateVar[2]).toString(),
                details: document.getElementById("edit-task-details").value
            });
            document.getElementById("task-edit-overlay").style.display = "none"
            document.getElementById("signed-in").style.filter = "none"
            document.getElementById("details-overlay").style.display = "none"
        }

        //Salvar novas tarefas
        document.getElementById("new-task-save").onclick = async () => {
            if (document.getElementById("new-task-name").value != "") {
                document.getElementById("new-task-save").innerHTML = "<span class='loader'></span> Salvando"
                var dateVar = document.getElementById("new-task-date").value.split('-');
                await setDoc(doc(collection(db, user.uid)), {
                    name: document.getElementById("new-task-name").value,
                    date: new Date(dateVar[0], dateVar[1] - 1, dateVar[2]).toString(),
                    completed: false,
                    details: document.getElementById("new-task-details").value
                });
                document.getElementById("add-task").classList.remove("show");
                document.getElementById("new-task-name").value = "";
                document.getElementById("new-task-details").value = "";
                document.getElementById("new-task-save").innerHTML = "Salvar";
            } else {
                document.getElementById("new-task-name").style.border = "red 2px solid"
                document.getElementById("new-task-name").style.backgroundColor = "#4a2020"
            }
        }
    } else {
        //Carregar página Signed Out
        document.getElementById("text").innerHTML = '';
        document.getElementById("signed-out").style.display = "flex";
        document.getElementById("signed-in").hidden = true;
    }
});