import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, collection, updateDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

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

window.createSimpleBarChart = (data, labels) => {
    new Chart(document.getElementById("mixed-chart"), {
        data: {
            datasets: [{
                type: "bar",
                label: "Lucro Líquido",
                data: data,
                barThickness: 40,
                borderRadius: 10,
                backgroundColor: 'color(srgb 0.2555 0.3638 1)'
            }],
            labels: labels
        } ,options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grace: '5%'
                },
            }
        }
    });
}
window.createHalfDoughnutChart = (ctx, bgColor1, bgColor2, media, min, max) => {
    // new Chart(document.getElementById(ctx), {
    //     type: 'doughnut',
    //     data: {
    //         datasets: [{
    //             label: 'Média',
    //             data: [50, 50],
    //             backgroundColor: [
    //                 bgColor1,
    //                 bgColor2
    //             ],
    //             hoverOffset: 4
    //         }]
    //     },
    //     options: {
    //         rotation: -90,
    //         circumference: 180,
    //         cutout: 35,
    //         maintainAspectRatio: false,
    //         events: []
    //     }
    // });
    var type = "R$";
    if(ctx == "rent") {
        type = "%";
    } else if(ctx == "vendas") {
        type = "dias";
    }
    document.getElementById(ctx + "-media").innerHTML = getFormatedValue(media, type);
    document.getElementById(ctx + "-min").innerHTML = getFormatedValue(min, type);
    document.getElementById(ctx + "-max").innerHTML = getFormatedValue(max, type);
}
window.createStackedChart = (ctx, dataCompra, dataVenda, dataLucroLiq, labels) => {
    new Chart(document.getElementById(ctx), {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Compra',
                data: dataCompra,
                backgroundColor: 'color(srgb 0.2555 0.3638 1)',
                stack: 'Stack 0',
                borderRadius: 10,
            }, {
                label: 'Venda',
                data: dataVenda,
                backgroundColor: 'color(srgb 0.7614 0.8417 0.9981)',
                stack: 'Stack 1',
                borderRadius: 10,
            },{
                label: 'Lucro Líquido',
                data: dataLucroLiq,
                backgroundColor: 'color(display-p3 0.2706 0.6078 0.9725)',
                stack: 'Stack 2',
                borderRadius: 10,
            }],
            labels: labels
        }, options: {
            categoryPercentage: 0.8,
            barPercentage: 0.75,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grace: '5%'
                },
            }
        }
    });
}

window.createHorizontalChart = (ctx, dataCompra, dataGastos, dataLucro, labels) => {
    new Chart(document.getElementById(ctx), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                barThickness: 25,
                label: 'Valor de Compra',
                data: dataCompra,
                backgroundColor: 'color(srgb 0.7614 0.8417 0.9981)',
                stack: 'Stack 0',
            },{
                barThickness: 25,
                label: 'Gastos Totais',
                data: dataGastos,
                backgroundColor: 'color(srgb 0.2555 0.3638 1)',
                stack: 'Stack 0',
            }, {
                barThickness: 25,
                label: 'Lucro Líquido',
                data: dataLucro,
                backgroundColor: 'color(srgb 0.101 0.1263 0.4737)',
                stack: 'Stack 0',
                borderRadius: 10,
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

window.updateGraphValues = async function() {
    var projects = [];
    var chartValues = {
        mixedChart: {data: [], labels: []},
        stackedChart: {labels: [],data: [[],[],[]]},
        horizontalChart: {labels: [],data: [[],[],[]]},
        halfChart1: {values: [0, 0, 0]},
        halfChart2: {values: [0, 0, 0]},
        halfChart3: {values: [0, 0, 0]},
        halfChart4: {values: [0, 0, 0]}
    };
    var lucroLiq = [];
    var rentabilidade = [];
    var dias = [];
    var reforma = [];
    await getDocs(collection(db, "users", auth.currentUser.uid, "projetos")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            projects.push(doc.data());
        });

        for(let i = 0; i < projects.length; i++) {
            projects.sort();
            chartValues.mixedChart.data.push(projects[i].lucroLiquido);
            chartValues.mixedChart.labels.push(projects[i].name);
            chartValues.stackedChart.labels.push(projects[i].name);
            chartValues.stackedChart.data[0].push(projects[i].valorCompra);
            chartValues.stackedChart.data[1].push(projects[i].valorAnuncio);
            chartValues.stackedChart.data[2].push(projects[i].lucroLiquido);
            chartValues.horizontalChart.labels.push(projects[i].name);
            chartValues.horizontalChart.data[0].push(projects[i].valorCompra);
            chartValues.horizontalChart.data[1].push(projects[i].gastoTotal);
            chartValues.horizontalChart.data[2].push(projects[i].lucroLiquido);
            
            lucroLiq.push(parseFloat(projects[i].lucroLiquido));
            rentabilidade.push(parseFloat(projects[i].rentabilidade));
            dias.push(parseFloat(projects[i].tempoAteVenda) * 30);
            reforma.push(parseFloat(projects[i].totalReformExpenses));
        }
        
        if(projects.length != 0) {
            chartValues.halfChart1.values = [Math.min(...lucroLiq), lucroLiq.reduce((a, b) => a + b, 0) / lucroLiq.length, Math.max(...lucroLiq)];
            chartValues.halfChart2.values = [Math.min(...rentabilidade), rentabilidade.reduce((a, b) => a + b, 0) / rentabilidade.length, Math.max(...rentabilidade)];
            chartValues.halfChart3.values = [Math.min(...dias), dias.reduce((a, b) => a + b, 0) / dias.length, Math.max(...dias)];
            chartValues.halfChart4.values = [Math.min(...reforma), reforma.reduce((a, b) => a + b, 0) / reforma.length, Math.max(...reforma)];
        }
    })
    return chartValues;
}


window.generateGraphs = async function() {
    var chartValues = await updateGraphValues();
    if(chartValues.mixedChart.data.length > 0) {
        document.getElementById("no-graphs-visible").style.display = "none";
        document.getElementById("graphs-page-container").style.display = "flex";
        createSimpleBarChart(chartValues.mixedChart.data, chartValues.mixedChart.labels);
        createHalfDoughnutChart("lucro-liq", "#3959f7", "color(display-p3 0.9529 0.9686 1)", chartValues.halfChart1.values[1], chartValues.halfChart1.values[0], chartValues.halfChart1.values[2]);
        createHalfDoughnutChart("rent", "#49d991", "#e1faed", chartValues.halfChart2.values[1], chartValues.halfChart2.values[0], chartValues.halfChart2.values[2]);
        createHalfDoughnutChart("vendas", "#fec53d", "#f5f0e4", chartValues.halfChart3.values[1], chartValues.halfChart3.values[0], chartValues.halfChart3.values[2]);
        createHalfDoughnutChart("reforma", "#d61f69", "#feedf4", chartValues.halfChart4.values[1], chartValues.halfChart4.values[0], chartValues.halfChart4.values[2]);
        createStackedChart("stacked-chart", chartValues.stackedChart.data[0], chartValues.stackedChart.data[1], chartValues.stackedChart.data[2], chartValues.stackedChart.labels);
        createHorizontalChart("horizontal-chart", chartValues.horizontalChart.data[0], chartValues.horizontalChart.data[1], chartValues.horizontalChart.data[2], chartValues.horizontalChart.labels);
    }
}