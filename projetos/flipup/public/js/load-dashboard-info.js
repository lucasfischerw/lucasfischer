import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, collection, doc, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

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

function sortByDate(a,b) {  
    var dateA = a.created_at.toDate().getTime();
    var dateB = b.created_at.toDate().getTime();
    return dateA < dateB ? 1 : -1;  
};

window.updateDashboardInfo = async () => {
    var projects = [];
    var prospectProjects = [];
    await getDocs(collection(db, "users", auth.currentUser.uid, "projetos")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var project = doc.data();
            project.id = doc.id;
            if(doc.data().status != 0) {
                projects.push(project);
            } else {
                prospectProjects.push(project);
            }
        });
        projects.sort(sortByDate);
        prospectProjects.sort(sortByDate);
        var investimentoTotal = 0;
        var lucroTotal = 0;
        var rentabilidadeMedia = 0;
        var houseFlipCount = 0;
        for(let i = 0; i < projects.length; i++) {
            if(projects[i].status === 3) {
                investimentoTotal += parseFloat(projects[i].gastoTotal);
                lucroTotal += parseFloat(projects[i].lucroLiquidoFinal);
                rentabilidadeMedia += parseFloat(projects[i].rentabilidadeFinal);
                houseFlipCount++;
            }
        }
        if(houseFlipCount > 0) {
            rentabilidadeMedia = rentabilidadeMedia/houseFlipCount;
        }
        document.getElementById("investimento-total").innerHTML = getFormatedValue(investimentoTotal, "R$");
        document.getElementById("lucro-total").innerHTML = getFormatedValue(lucroTotal, "R$");
        document.getElementById("rentabilidade-media").innerHTML = getFormatedValue(rentabilidadeMedia, "%");
        document.getElementById("house-flip-count").innerHTML = houseFlipCount;
    });
    if(projects.length == 0) {
        document.getElementById("last-viewed-project").innerHTML = "<p class='no-visible-cards-warning'>Nenhum projeto em obra, anunciado ou vendido no momento. Quando o status do projeto for alterado, ele aparecerá aqui.</p>";
    } else {
        var project = projects[0];
        showProject(project, "last-viewed-project");
    }
    if(prospectProjects.length == 0) {
        document.getElementById("last-prospect-project").innerHTML = "<p class='no-visible-cards-warning'>Nenhum projeto em prospecção no momento. Quando o status de um projeto for definido como prospecção, ele aparecerá aqui.</p>";
    } else {
        var project = prospectProjects[0];
        showProject(project, "last-prospect-project");
    }
    var chartValues = await updateGraphValues();
    createHalfDoughnutChart("lucro-liq", "#3959f7", "color(display-p3 0.9529 0.9686 1)", chartValues.halfChart1.values[1], chartValues.halfChart1.values[0], chartValues.halfChart1.values[2]);
    createHalfDoughnutChart("rent", "#49d991", "#e1faed", chartValues.halfChart2.values[1], chartValues.halfChart2.values[0], chartValues.halfChart2.values[2]);
    createHalfDoughnutChart("vendas", "#fec53d", "#f5f0e4", chartValues.halfChart3.values[1], chartValues.halfChart3.values[0], chartValues.halfChart3.values[2]);
    createHalfDoughnutChart("reforma", "#d61f69", "#feedf4", chartValues.halfChart4.values[1], chartValues.halfChart4.values[0], chartValues.halfChart4.values[2]);
}