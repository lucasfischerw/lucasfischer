// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js"
import { getFirestore, collection, addDoc, query, getDocs, doc, setDoc, where, onSnapshot, updateDoc, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js'

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

document.getElementById("sign-in-btn").onclick = () => signInWithPopup(auth, provider);

document.getElementById("sign-out-btn").onclick = () => auth.signOut();

const db = getFirestore(app);

var tasksList = [];

var newCityRef;

async function AddTask() {
    newCityRef = doc(collection(db, "tasks"));
    console.log(newCityRef._key.path.segments[1]);
    await setDoc(newCityRef, {
        name: "Ada2",
        date: new Date("JANUARY, 25, 2015"),
        completed: false,
        uid: "NlYHGPXgWhN7eDcV3nZS9U632KA3",
        tid: newCityRef._key.path.segments[1]
    });
}

function Update_Shown_List() {
    document.getElementById("pending").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    //Read
    console.log(tasksList)
    tasksList.forEach((docLoaded, index) => {
        console.log(index)
        var task = document.createElement("div");

        var title = document.createElement("h3");
        title.innerHTML = docLoaded.name;
        
        var date = document.createElement("p");
        date.innerHTML = docLoaded.date.toDate().toLocaleDateString();

        var input = document.createElement("div");
        input.setAttribute("class", "checkbox");
        input.setAttribute("id", docLoaded.tid);
        const washingtonRef = doc(db, "tasks", docLoaded.tid);
        input.onclick = async () => {
            // Set the "capital" field of the city 'DC'
            console.log(docLoaded.tid);
            if (document.getElementById(docLoaded.tid).parentElement.className.includes("completed")) {
                document.getElementById(docLoaded.tid).parentElement.setAttribute("class", "task");
                await updateDoc(washingtonRef, {
                    completed: false
                });
            } else {
                document.getElementById(docLoaded.tid).parentElement.setAttribute("class", "task completed");
                await updateDoc(washingtonRef, {
                    completed: true
                });
            }
        }

        var deleteBTN = document.createElement("button");
        deleteBTN.innerHTML = "Delete"
        deleteBTN.onclick = async () => {
            await deleteDoc(doc(db, "tasks", docLoaded.tid));
        }


        if (docLoaded.completed) {
            task.setAttribute("class", "task completed");
            input.setAttribute("checked", "")
        } else {
            task.setAttribute("class", "task");
        }
        
        task.appendChild(input);

        var textDiv = document.createElement("div");

        textDiv.appendChild(title);
        textDiv.appendChild(date);
        task.appendChild(textDiv);
        task.appendChild(deleteBTN);

        if (docLoaded.completed) {
            document.getElementById("completed").appendChild(task);
        } else {
            document.getElementById("pending").appendChild(task);
        }
    });
}

auth.onAuthStateChanged(user => {
    if(user) {
        //signed in
        document.getElementById("text").innerHTML = user.displayName;
        document.getElementById("signed-out").style.display = "none";
        document.getElementById("signed-in").hidden = false;
        
        onSnapshot(query(collection(db, "tasks"), where("uid", "==", user.uid.toString())), (querySnapshot) => {
            tasksList = [];
            console.log(tasksList);
            querySnapshot.forEach((doc) => {
                tasksList.push(doc.data());
            });
            console.log("Current User Tasks: ", tasksList);
            Update_Shown_List();
        });

        // AddTask()

        //All users tasks
        onSnapshot(collection(db, "tasks"), (querySnapshot) => {
            const tasksListTotal = [];
            querySnapshot.forEach((doc) => {
                tasksListTotal.push(doc.data());
            });
            console.log("All User Tasks: ", tasksListTotal);
        });

        document.getElementById("new-task-save").onclick = async () => {
            newCityRef = doc(collection(db, "tasks"));
            console.log(newCityRef._key.path.segments[1]);
            console.log(new Date(document.getElementById("new-task-date").value));
            await setDoc(newCityRef, {
                name: document.getElementById("new-task-name").value,
                date: new Date(document.getElementById("new-task-date").value),
                completed: false,
                uid: "NlYHGPXgWhN7eDcV3nZS9U632KA3",
                tid: newCityRef._key.path.segments[1]
            });
        }
        

    } else {
        //signed out
        document.getElementById("text").innerHTML = '';
        document.getElementById("signed-out").style.display = "flex";
        document.getElementById("signed-in").hidden = true;
    }
});