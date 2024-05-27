//Importing firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

//Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCAUtT057uGDE0W7uK2RV5mGaJsR6ySAsA",
    authDomain: "flipup-b861e.firebaseapp.com",
    projectId: "flipup-b861e",
    storageBucket: "flipup-b861e.appspot.com",
    messagingSenderId: "816504951931",
    appId: "1:816504951931:web:b37b800555b2b45b9dfede"
};

//Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

//Selecionar elementos do HTML
const email = document.querySelector("#email");
const button = document.querySelector("#submit-password-reset");
const errorMsg = document.querySelector("#login-error-message");

//Remover mensagem de erro ao digitar no campo de e-mail
email.onkeydown = () => {
    errorMsg.innerHTML = "";
    email.classList.remove("invalid-input");
}

//Enviar formulário ao pressionar Enter
window.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if(document.querySelector("#email").value == "") {
            document.querySelector("#email").focus();
        } else {
            document.getElementById("submit-password-reset").click();
        }
    }
});

//Enviar e-mail de recuperação de senha
button.onclick = () => {
    //Validar e-mail
    if(email.value === "") {
        errorMsg.innerHTML = "Preencha o campo de e-mail";
        email.classList.add("invalid-input");
    } else if(email.value.indexOf("@") == -1 || email.value.indexOf(".") == -1) {
        errorMsg.innerHTML = "E-mail inválido";
        email.classList.add("invalid-input");
    } else {
        button.innerHTML = "<div class='btn-loader'></div>Enviar E-Mail de recuperação";
        button.setAttribute("disabled", true);
        errorMsg.innerHTML = "";
        sendPasswordResetEmail(auth, email.value)
        .then(() => {
            document.getElementById("password-reset-request").style.display = "none";
            document.getElementById("password-reset-sucess").style.display = "flex";
        })
        .catch((error) => {
            errorMsg.innerHTML = "E-mail não cadastrado";
            email.classList.add("invalid-input");
            button.innerHTML = "Enviar E-Mail de recuperação";
            button.setAttribute("disabled", false);
        });
    }
}