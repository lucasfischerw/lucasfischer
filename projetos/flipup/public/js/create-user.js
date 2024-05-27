//Importing firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, doc, addDoc, onSnapshot, updateDoc, deleteDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAUtT057uGDE0W7uK2RV5mGaJsR6ySAsA",
    authDomain: "flipup-b861e.firebaseapp.com",
    projectId: "flipup-b861e",
    storageBucket: "flipup-b861e.appspot.com",
    messagingSenderId: "816504951931",
    appId: "1:816504951931:web:b37b800555b2b45b9dfede"
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

//Function to handle login errors, pointing out the invalid inputs
function handleLoginError(optinalInputs = []) {
    const inputs = document.getElementsByTagName("input");
    if(optinalInputs.length > 0) {
        for(let i = 0; i < optinalInputs.length; i++) {
            inputs[optinalInputs[i]].classList.add("invalid-input");
        }
    }
    for(let i = 0; i < inputs.length; i++) {
        if(inputs[i].value == "") {
            inputs[i].classList.add("invalid-input");
        }
        inputs[i].onfocus = () => {
            inputs[i].classList.remove("invalid-input");
        }
    }
}

//Pass to next input when pressing Enter
window.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if(document.querySelector("#email").value == "") {
            document.querySelector("#email").focus();
        } else if(document.querySelector("#senha").value == "") {
            document.querySelector("#senha").focus();
        } else if(document.querySelector("#senha-confirmacao").value == "") {
            document.querySelector("#senha-confirmacao").focus();
        } else {
            document.getElementById("submit-new-user").click();
        }
    }
});

//Create new user
document.querySelector("#submit-new-user").onclick = () => {
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const senhaConfirmacao = document.querySelector("#senha-confirmacao").value;
    //Validate inputs
    if (email == "" || senha == "") {
        document.querySelector("#login-error-message").innerHTML = "Preencha todos os campos";
        handleLoginError();
    } else if(email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        document.querySelector("#login-error-message").innerHTML = "Email inválido";
        handleLoginError([0]);
    } else if(senha.length < 6) {
        document.querySelector("#login-error-message").innerHTML = "A senha deve ter no mínimo 6 caracteres";
        handleLoginError([1]);
    } else if(senha != senhaConfirmacao) {
        document.querySelector("#login-error-message").innerHTML = "As senhas não coincidem";
        handleLoginError([1, 2]);
    } else {
        //Create user
        document.querySelector("#submit-new-user").innerHTML = "<div class='btn-loader'></div>Criar Conta";
        document.querySelector("#submit-new-user").classList.add('loading');
        createUserWithEmailAndPassword(auth, email, senha)
        .then(async (userCredential) => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            document.querySelector("#login-error-message").innerHTML = error.message;
            document.querySelector("#submit-new-user").innerHTML = "Criar Conta";
            document.querySelector("#submit-new-user").classList.remove('loading');
        });
    }
}