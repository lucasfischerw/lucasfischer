import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js"
import { getFirestore, doc, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

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

var valorCompra = 0;
var tempoAteVenda = 0;
var projectSellMode = 0;

window.saveProjectChanges = async (fieldSelected) => {
    var inputs = document.querySelectorAll(".values-table input");
    var values = [];
    for(var i = 0; i < inputs.length; i++) {
        values.push(getRawValue(inputs[i].value));
        if(inputs[i].classList.contains('special-days-input')) {
            inputs[i].value = getFormatedValue(values[i], "dias");
        } else if(inputs[i].classList.contains('meses')) {
            values[i] = parseInt(values[i]) + " meses";
        } else if(inputs[i].id == "irpf-porc") {
            inputs[i].value = getFormatedValue(values[i], "%");
        } else {
            inputs[i].value = getFormatedValue(values[i], inputs[i].classList.contains('porc') ? "%" : "R$");
        }
        inputs[i].setAttribute('readonly', 'true');
        inputs[i].classList.remove('active-input');
        inputs[i].blur();
    }
    document.getElementById("editAtt-button-" + fieldSelected).innerHTML = "<div class='btn-loader'></div>Salvando";
    document.getElementById("editAtt-button-" + fieldSelected).setAttribute("disabled", "true");
    await getDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString())).then(async(docRetrieved) => {
        currentProject = docRetrieved.data();
        var gastoTotal = getTotalProjectExpenses(projectSellMode);
        await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString()), {
            projectCustomValues: values,
            tempoAteVenda: getRawValue(document.getElementById("tempo-ate-venda").value),
            valorCompra: getRawValue(document.getElementById("valor-compra").value),
            lucroLiquidoFinal: getRawValue(document.getElementById("lucro-liquido-final").value),
            rentabilidadeFinal: getRawValue(document.getElementById("roi-final").value),
            valorAnuncio: getRawValue(document.getElementById("valor-venda").value),
            gastoTotal: gastoTotal,
            lucroBrutoFinal: getRawValue(document.getElementById("lucro-final").value),
            gastoReformaFinal: getRawValue(document.getElementById("reforma-final").value),
            tempoAteVendaFinal: getRawValue(document.getElementById("tempo-ate-venda-final").value)
        }).then(async () => {
            const inputValues = document.querySelectorAll(".special-editable-input");
            document.getElementById("edit-special-fields-project").innerHTML = "<div class='btn-loader'></div>Salvando";
            var values = [];
            for(var i = 0; i < inputValues.length; i++) {
                values.push(inputValues[i].value)
            }
            document.getElementById("project-title").innerHTML = values[0];
            await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString()), {
                name: values[0],
                endereco: values[1],
                condominio: getRawValue(values[2]),
                valorAnuncio: getRawValue(values[3]),
                valorMetro: getRawValue(values[4]),
                linkAnuncio: values[5],
            }).then(() => {
                for(var i = 0; i < inputValues.length; i++) {
                    inputValues[i].setAttribute("readonly", "true");
                    inputValues[i].classList.remove("active-input");
                    if(i >= 2 && i <= 4) {
                        inputValues[i].value = getFormatedValue(getRawValue(values[i]), "R$");
                    }
                }
                document.getElementById("edit-special-fields-project").innerHTML = "Editar";
                document.getElementById("edit-special-fields-project").setAttribute("onclick", "editCustomProjectParameters()");
            });
            setTimeout(() => {
                const buttons = document.querySelectorAll(".editAtt-button");
                for(var i = 0; i < buttons.length; i++) {
                    buttons[i].setAttribute("onclick", "editProjectFields("+buttons[i].id.split("-")[2]+")");
                    buttons[i].innerHTML = "Editar";
                    buttons[i].removeAttribute("disabled");
                }
                updateValuesChartStats(projectSellMode);
            }, 200);
        });
    });
}

window.editProjectFields = (fieldSelected) => {
    var inputs = document.querySelector("#values-table-" + fieldSelected + "").getElementsByTagName("input");
    document.getElementById("editAtt-button-" + fieldSelected).innerHTML = "Salvar";
    for(var i = 0; i < inputs.length; i++) {
        if(!inputs[i].classList.contains('auto')) {
            if(!inputs[i].classList.contains('dropdown-input')) {
                inputs[i].removeAttribute('readonly');
            }
            inputs[i].classList.add('active-input');
        }
    }
    setTimeout(() => {
        document.getElementById("editAtt-button-" + fieldSelected).setAttribute("onclick", "saveProjectChanges("+fieldSelected+")");
    }, 500);
}

function handleBuyingValue(id, inputValue, floatValue) {
    if(id == "financiado") {
        document.getElementById("entrada-input").value = getFormatedValue(parseFloat(valorCompra - inputValue).toFixed(2), "R$");
        document.getElementById("entrada-porc").value = getFormatedValue(parseFloat(100 - floatValue).toFixed(2), "%");
    } else if(id == "entrada") {
        document.getElementById("financiado-input").value = getFormatedValue(parseFloat(valorCompra - inputValue).toFixed(2), "R$");
        document.getElementById("financiado-porc").value = getFormatedValue(parseFloat(100 - floatValue).toFixed(2), "%");
    }
}

function updateTotalFeesAndTax() {
    setTimeout(() => {
        var calculationInputsId = ["financiado-input", "amortizacao-parcela", "valor-parcela","taxas-bancarias"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        document.getElementById("valor-quitado").value = getFormatedValue(parseFloat(calculation[0] - (calculation[1] * tempoAteVenda)).toFixed(2), "R$");
        document.getElementById("juros-taxas").value = getFormatedValue(parseFloat((tempoAteVenda * (calculation[2] - calculation[1])) + calculation[3]).toFixed(2), "R$");
        updateGrossProfit();
        calculateInvestment();
    }, 50);
}

var projectFirstLoad = false;

function updateGrossProfit() {
    setTimeout(() => {
        var calculationInputsId = ["valor-venda", "valor-compra", "itbi-input", "escritura-input", "reforma-input", "corretagem-input", "juros-taxas"];
        var calculation = [0,0,0,0,0,0,0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        if(projectSellMode != 0) {
            calculationInputsId = ["valor-venda", "investimento-total", "corretagem-input"];
            calculation = [0,0,0,0,0,0,0];
            for(var i = 0; i < calculationInputsId.length; i++) {
                calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
            }
            console.log(calculation);
        }
        document.getElementById("lucro-bruto").value = getFormatedValue(parseFloat(calculation[0] - calculation[1] - calculation[2] - calculation[3] - calculation[4] - calculation[5] - calculation[6]).toFixed(2), "R$");
        document.getElementById("lucro-bruto2").value = getFormatedValue(parseFloat(calculation[0] - calculation[1] - calculation[2] - calculation[3] - calculation[4] - calculation[5] - calculation[6]).toFixed(2), "R$");
        if(projectFirstLoad == true) {
            document.getElementById("irpf-input").value = getFormatedValue(parseFloat((calculation[0] - calculation[1] - calculation[2] - calculation[3] - calculation[4] - calculation[5]) * 0.15).toFixed(2), "R$");
            document.getElementById("irpf-input2").value = getFormatedValue(parseFloat((calculation[0] - calculation[1] - calculation[2] - calculation[3] - calculation[4] - calculation[5]) * 0.15).toFixed(2), "R$");
        }
        calculateLiquidProfit();
        updateROI();
    }, 50);
}


function updateROI() {
    setTimeout(() => {
        var calculationInputsId = ["lucro-liquido", "investimento-total"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        if(calculation[1] > 0) {
            document.getElementById("roi").value = getFormatedValue(parseFloat((calculation[0] / calculation[1]) * 100).toFixed(2), "%");
            document.getElementById("roi-2").value = getFormatedValue(parseFloat((calculation[0] / calculation[1]) * 100).toFixed(2), "%");
        }
    }, 100);
}

function calculateInvestment() {
    setTimeout(() => {
        var calculationInputsId = ["entrada-input", "valor-parcela", "taxas-bancarias", "despesas", "condominio", "iptu", "itbi-input", "escritura-input", "reforma-input"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        if(projectSellMode != 0) {
            calculation[0] = parseFloat(getRawValue(document.getElementById("valor-compra").value));
            calculation[1] = 0;
            calculation[2] = 0;
        }
        document.getElementById("investimento-total").value = getFormatedValue(parseFloat(calculation[0] + (calculation[1] * tempoAteVenda) + calculation[2] + (calculation[3] * tempoAteVenda) + (calculation[4] * tempoAteVenda) + (calculation[5] * tempoAteVenda) + calculation[6] + calculation[7] + calculation[8]).toFixed(2), "R$");
        updateROI();
    }, 50);
}

function calculateLiquidProfit() {
    setTimeout(() => {
        var calculationInputsId = ["lucro-bruto", "irpf-input"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        document.getElementById("lucro-liquido").value = getFormatedValue(parseFloat(calculation[0] - calculation[1]).toFixed(2), "R$");
    }, 50);
}

window.updateInputs = (id) => {
    setTimeout(() => {
        var inputValue = getRawValue(document.getElementById(id).value);
        var floatValue = parseFloat(valorCompra * parseFloat(inputValue / 100)).toFixed(2);
        if(id.split('-')[0] == "corretagem") {
            floatValue = parseFloat(getRawValue(document.getElementById("valor-venda").value) * parseFloat(inputValue / 100)).toFixed(2);
        } else if(id.split('-')[0] == "irpf") {
            floatValue = parseFloat(getRawValue(document.getElementById("lucro-bruto").value) * parseFloat(inputValue / 100)).toFixed(2);
        }
        document.getElementById(id.split('-')[0] + "-input").value = getFormatedValue(floatValue, "R$");
        if(id.split('-')[0] == "entrada" || id.split('-')[0] == "financiado") {
            handleBuyingValue(id.split('-')[0], floatValue, inputValue);
        }
        updateGrossProfit();
        calculateInvestment();
        calculateLiquidProfit();
        updateROI();
        document.getElementById("irpf-input2").value = getFormatedValue(getRawValue(document.getElementById("irpf-input").value), "R$");
    }, 20);
}

window.updatePorcentage = (id) => {
    setTimeout(() => {
        var inputValue = getRawValue(document.getElementById(id).value);
        var floatValue = parseFloat(inputValue / valorCompra * 100).toFixed(2);
        if(id.split('-')[0] == "corretagem") {
            floatValue = parseFloat(inputValue / getRawValue(document.getElementById("valor-venda").value) * 100).toFixed(2);
        } else if(id.split('-')[0] == "irpf") {
            floatValue = parseFloat(inputValue / getRawValue(document.getElementById("lucro-bruto").value) * 100).toFixed(2);
        }
        document.getElementById(id.split('-')[0] + "-porc").value = getFormatedValue(floatValue, "%");
        if(id.split('-')[0] == "entrada" || id.split('-')[0] == "financiado") {
            handleBuyingValue(id.split('-')[0], inputValue, floatValue);
        }
        calculateInvestment();
        calculateLiquidProfit();
        updateROI();
    }, 20);
}

window.syncronizeReformValue = () => {
    document.getElementById("reforma-input2").value = getFormatedValue(getRawValue(document.getElementById("reforma-input").value), "R$");
    setTimeout(() => {
        updateReformValue();
    }, 20);
}

window.calculateIRPF = () => {
    if(projectSellMode == 0) {
        var calculationInputsId = ["valor-venda", "valor-quitado", "entrada-input", "taxas-bancarias", "valor-parcela", "itbi-input", "escritura-input", "reforma-input", "corretagem-input"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        var inputValue = getRawValue(document.getElementById("irpf-porc").value);
        var floatValue = getFormatedValue((calculation[0] - calculation[1] - calculation[2] - calculation[3] - (calculation[4] * tempoAteVenda) - calculation[5] - calculation[6] - calculation[7] - calculation[8]) * (inputValue / 100), "R$");
        document.getElementById("irpf-input").value = getFormatedValue(getRawValue(floatValue), "R$");
        document.getElementById("irpf-input2").value = getFormatedValue(getRawValue(floatValue), "R$");
    } else {
        var calculationInputsId = ["valor-venda", "valor-compra", "itbi-input", "escritura-input", "reforma-input", "corretagem-input"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        var inputValue = getRawValue(document.getElementById("irpf-porc").value);
        var floatValue = getFormatedValue((calculation[0] - calculation[1] - calculation[2] - calculation[3] - calculation[4] - calculation[5]) * (inputValue / 100), "R$");
        document.getElementById("irpf-input").value = getFormatedValue(getRawValue(floatValue), "R$");
        document.getElementById("irpf-input2").value = getFormatedValue(getRawValue(floatValue), "R$");
    }
    calculateLiquidProfit();
    updateROI();
}

window.handleMonthSellEstimateChange = async(month) => {
    tempoAteVenda = month;
    var ending = " meses";
    if(month == 1) {
        ending = " mês";
    }
    document.getElementById("timeToSellMonths").innerHTML = tempoAteVenda + ending;
    document.getElementById("tempo-ate-venda").value = tempoAteVenda + ending;
    document.getElementById("month-dropdown").style.display = "none";
    document.getElementById("month-dropdown-upper").style.display = "none";
    updateTotalFeesAndTax();
    updateGrossProfit();
    calculateInvestment();
    calculateIRPF();
    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString()), {
        tempoAteVenda: tempoAteVenda
    });
    saveProjectChanges(0);
}

var currentProject = {};
window.handleProjectFirstLoad = () => {
    setTimeout(async() => {
        await getDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString())).then(async(docRetrieved) => {
            currentProject = docRetrieved.data();
            if(currentProject.justCreated == true) {
                document.querySelector(".content").style.opacity = "0";
                projectFirstLoad = true;
                updateTotalFeesAndTax();
                updateGrossProfit();
                calculateInvestment();
                calculateIRPF();
                calculateLiquidProfit();
                updateROI();
                setTimeout(async() => {
                    var inputs = document.querySelectorAll(".values-table input");
                    var values = [];
                    for(var i = 0; i < inputs.length; i++) {
                        values.push(getRawValue(inputs[i].value));
                        if(inputs[i].classList.contains('meses')) {
                            values[i] = parseInt(values[i]) + " meses";
                        }else if(inputs[i].id == "irpf-porc") {
                            inputs[i].value = getFormatedValue(values[i], "%");
                        } else {
                            inputs[i].value = getFormatedValue(values[i], inputs[i].classList.contains('porc') ? "%" : "R$");
                        }
                        inputs[i].setAttribute('readonly', 'true');
                        inputs[i].classList.remove('active-input');
                    }
                    var gastoTotal = parseFloat(currentProject.totalReformExpenses) + parseFloat(getRawValue(document.getElementById("itbi-input").value)) + parseFloat(getRawValue(document.getElementById("escritura-input").value)) + parseFloat(getRawValue(document.getElementById("escritura-input").value)) + (parseFloat(getRawValue(document.getElementById("despesas").value)) * tempoAteVenda) + (parseFloat(getRawValue(document.getElementById("iptu").value)) * tempoAteVenda) + (parseFloat(getRawValue(document.getElementById("condominio").value)) * tempoAteVenda) + parseFloat(getRawValue(document.getElementById("corretagem-input").value)) + parseFloat(getRawValue(document.getElementById("irpf-input").value)) + parseFloat(getRawValue(document.getElementById("juros-taxas").value));
                    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString()), {
                        projectCustomValues: values,
                        tempoAteVenda: getRawValue(document.getElementById("tempo-ate-venda").value),
                        valorCompra: getRawValue(document.getElementById("valor-compra").value),
                        lucroLiquido: getRawValue(document.getElementById("lucro-liquido").value),
                        rentabilidade: getRawValue(document.getElementById("roi").value),
                        valorAnuncio: getRawValue(document.getElementById("valor-venda").value),
                        gastoTotal: gastoTotal
                    });
                    await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", docRetrieved.id), {
                        justCreated: false
                    });
                    projectFirstLoad = false;
                    setTimeout(() => {
                        loadProject(parseURLParams(window.location.href).id.toString());
                    },150);
                }, 500);
            }
        });
    }, 250);
}

window.updateFinalValuesCalculation = () => {
    setTimeout(() => {
        var calculationInputsId = ["valor-final", "valor-compra", "itbi-input", "escritura-input", "reforma-final", "corretagem-final", "juros-taxas"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        if(projectSellMode != 0) {
            calculation[6] = 0;
        }
        var lucroFinal = parseFloat(calculation[0] - calculation[1] - calculation[2] - calculation[3] - calculation[4] - calculation[5] - calculation[6]);
        document.getElementById("lucro-final").value = getFormatedValue(lucroFinal.toFixed(2), "R$");
        document.getElementById("lucro-liquido-final").value = getFormatedValue(lucroFinal - parseFloat(getRawValue(document.getElementById("irpf-final").value)), "R$");
        var calculationInputsId = ["entrada-input", "valor-parcela", "taxas-bancarias", "despesas", "condominio", "iptu", "itbi-input", "escritura-input", "reforma-final"];
        var calculation = [0];
        for(var i = 0; i < calculationInputsId.length; i++) {
            calculation[i] = parseFloat(getRawValue(document.getElementById(calculationInputsId[i]).value));
        }
        if(projectSellMode != 0) {
            calculation[0] = parseFloat(getRawValue(document.getElementById("valor-compra").value));
            calculation[1] = 0;
            calculation[2] = 0;
        }
        var investimentoTotal = parseFloat(calculation[0] + (calculation[1] * tempoAteVenda) + calculation[2] + (calculation[3] * tempoAteVenda) + (calculation[4] * tempoAteVenda) + (calculation[5] * tempoAteVenda) + calculation[6] + calculation[7] + calculation[8]);
        if(investimentoTotal > 0) {
            document.getElementById("roi-final").value = getFormatedValue(parseFloat((lucroFinal / investimentoTotal) * 100).toFixed(2), "%");
        }
        document.getElementById("corretagem-final-porc-isolado").value = getFormatedValue((parseFloat(getRawValue(document.getElementById("corretagem-final").value)) / parseFloat(getRawValue(document.getElementById("valor-final").value))) * 100, "%");
        document.getElementById("irpf-final-porc-isolado").value = getFormatedValue((parseFloat(getRawValue(document.getElementById("irpf-final").value)) / parseFloat(getRawValue(document.getElementById("lucro-final").value))) * 100, "%");
    }, 25);
}

window.addProjectButtonsListeners = () => {
    setTimeout(async() => {
        var buttons = document.querySelectorAll(".editAtt-button");
        for(var i = 0; i < buttons.length; i++) {
            const id = buttons[i].id.split("-")[2];
            buttons[i].setAttribute("onclick", "editProjectFields("+id+")");
        }
        var inputs = document.querySelectorAll(".values-table input");
        for(var i = 0; i < inputs.length; i++) {
            if(!inputs[i].classList.contains('auto') && !inputs[i].classList.contains('isolated-inputs')) {
                if(inputs[i].classList.contains('porc')) {
                    inputs[i].setAttribute('oninput', 'updateInputs("'+inputs[i].id+'")');
                } else if(inputs[i].classList.contains('value-change')) {
                    inputs[i].setAttribute('oninput', 'updatePorcentage("'+inputs[i].id+'")');
                } else {
                    inputs[i].setAttribute('oninput', 'calculateIRPF()');
                }
            }
            if(!inputs[i].classList.contains('auto')) {
                inputs[i].addEventListener("keydown", (event) => {
                    if(event.key == "Enter") {
                        if(event.target.parentNode.parentNode.classList.contains('values-table')) {
                            saveProjectChanges(event.target.parentNode.parentNode.id.split("-")[2]);
                        } else {
                            saveProjectChanges(event.target.parentNode.parentNode.parentNode.id.split("-")[2]);
                        }
                    }
                });
            }
        }
        await getDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString())).then((doc) => {
            tempoAteVenda = parseFloat(doc.data().tempoAteVenda);
            valorCompra = parseFloat(doc.data().valorCompra);
        });
        
        document.getElementById("valor-compra").addEventListener("keyup", () => {
            valorCompra = getRawValue(document.getElementById("valor-compra").value);
            updateTotalFeesAndTax();
            updateGrossProfit();
            calculateInvestment();
            updateInputs("entrada-porc");
            updateInputs("financiado-porc");
        });

        document.getElementById("valor-venda").addEventListener("keyup", () => {
            updatePorcentage("corretagem-input");
            updateGrossProfit();
            calculateInvestment();
            updateROI();
        });
    
        var updateTotalFeesAndTaxInputs = document.querySelectorAll(".update-total-fees-and-tax");
        for(var i = 0; i < updateTotalFeesAndTaxInputs.length; i++) {
            updateTotalFeesAndTaxInputs[i].addEventListener("keyup", updateTotalFeesAndTax);
        }
        var updateGrossProfitInputs = document.querySelectorAll(".update-gross-profit");
        for(var i = 0; i < updateGrossProfitInputs.length; i++) {
            updateGrossProfitInputs[i].addEventListener("keyup", updateGrossProfit);
            updateGrossProfitInputs[i].addEventListener("keyup", calculateInvestment);
        }
        document.getElementById("irpf-porc").addEventListener("keyup", () => {
            calculateIRPF();
        });
    
        document.getElementById("tempo-ate-venda").addEventListener("click", () => {
            if(document.getElementById("month-dropdown").style.display == "flex") {
                document.getElementById("month-dropdown").style.display = "none";
            } else if(document.getElementById("tempo-ate-venda").classList.contains('active-input')) {
                document.getElementById("month-dropdown").innerHTML = "";
                for(var i = 1; i <= 24; i++) {
                    const option = document.createElement("p");
                    if(i == 1) {
                        option.innerHTML = i + " mês";
                    } else {
                        option.innerHTML = i + " meses";
                    }
                    option.setAttribute("onclick", "handleMonthSellEstimateChange("+i+")");
                    document.getElementById("month-dropdown").appendChild(option);
                }
                document.getElementById("month-dropdown").style.display = "flex";
            }
        });

        document.getElementById("timeToSellMonths").addEventListener("click", () => {
            if(document.getElementById("month-dropdown-upper").style.display == "flex") {
                document.getElementById("month-dropdown-upper").style.display = "none";
            } else {
                document.getElementById("month-dropdown-upper").innerHTML = "";
                for(var i = 1; i <= 24; i++) {
                    const option = document.createElement("p");
                    if(i == 1) {
                        option.innerHTML = i + " mês";
                    } else {
                        option.innerHTML = i + " meses";
                    }
                    option.setAttribute("onclick", "handleMonthSellEstimateChange("+i+")");
                    document.getElementById("month-dropdown-upper").appendChild(option);
                }
                document.getElementById("month-dropdown-upper").style.display = "flex";
            }
        });
    
        var lowerInputsId = document.querySelectorAll(".update-upper-inputs");
        for(var i = 0; i < lowerInputsId.length; i++) {
            const currentId = lowerInputsId[i].id.split('2')[0];
            lowerInputsId[i].addEventListener("keyup", () => {
                document.getElementById(currentId).value = getFormatedValue(getRawValue(document.getElementById(currentId + "2").value), "R$"); 
                updateTotalFeesAndTax();
                updateGrossProfit();
                calculateInvestment();
                if(document.getElementById(currentId).classList.contains('value-change')) {
                    updatePorcentage(currentId);
                }
                if(currentId.toString() == "reforma-input") {
                    setTimeout(() => {
                        updateReformValue();
                    }, 20);
                }
            })
        }
    
        var upperInputIds = document.querySelectorAll(".update-lower-inputs");
        for(var i = 0; i < upperInputIds.length; i++) {
            const currentId = upperInputIds[i].id + "2";
            upperInputIds[i].addEventListener("keyup", () => {
                document.getElementById(currentId).value = getFormatedValue(getRawValue(document.getElementById(currentId.split("2")[0]).value), "R$"); 
            });
        }

        document.getElementById("edit-special-fields-project").setAttribute("onclick", "editCustomProjectParameters()");
        window.editCustomProjectParameters = () => {
            const inputs = document.querySelectorAll(".special-editable-input");
            for(var i = 0; i < inputs.length; i++) {
                inputs[i].removeAttribute("readonly");
                inputs[i].classList.add("active-input");
            }
            document.getElementById("edit-special-fields-project").innerHTML = "Salvar";
            document.getElementById("edit-special-fields-project").setAttribute("onclick", "saveCustomProjectParameters()");
        }

        window.saveCustomProjectParameters = async() => {
            const inputValues = document.querySelectorAll(".special-editable-input");
            document.getElementById("edit-special-fields-project").innerHTML = "<div class='btn-loader'></div>Salvando";
            var values = [];
            for(var i = 0; i < inputValues.length; i++) {
                values.push(inputValues[i].value)
            }
            document.getElementById("project-title").innerHTML = values[0];
            await updateDoc(doc(db, "users", auth.currentUser.uid, "projetos", parseURLParams(window.location.href).id.toString()), {
                name: values[0],
                endereco: values[1],
                condominio: getRawValue(values[2]),
                valorAnuncio: getRawValue(values[3]),
                valorMetro: getRawValue(values[4]),
                linkAnuncio: values[5],
            }).then(() => {
                for(var i = 0; i < inputValues.length; i++) {
                    inputValues[i].setAttribute("readonly", "true");
                    inputValues[i].classList.remove("active-input");
                    if(i >= 2 && i <= 4) {
                        inputValues[i].value = getFormatedValue(getRawValue(values[i]), "R$");
                    }
                }
                document.getElementById("edit-special-fields-project").innerHTML = "Editar";
                document.getElementById("edit-special-fields-project").setAttribute("onclick", "editCustomProjectParameters()");
            });
            document.getElementById("condominio").value = getFormatedValue(getRawValue(values[2]), "R$");
            document.getElementById("valor-venda").value = getFormatedValue(getRawValue(values[3]), "R$");
            document.getElementById("valor-venda2").value = getFormatedValue(getRawValue(values[3]), "R$");
            updateTotalFeesAndTax();
            updateGrossProfit();
            calculateInvestment();
            calculateIRPF();
            calculateLiquidProfit();
            updateROI();
            setTimeout(() => {
                saveProjectChanges(0);
            });
        }

        document.getElementById("corretagem-final-porc-isolado").addEventListener("keyup", () => {
            document.getElementById("corretagem-final").value = getFormatedValue(parseFloat(getRawValue(document.getElementById("valor-final").value)) * (parseFloat(getRawValue(document.getElementById("corretagem-final-porc-isolado").value))/100), "R$");
        });
        document.getElementById("corretagem-final").addEventListener("keyup", () => {
            document.getElementById("corretagem-final-porc-isolado").value = getFormatedValue((parseFloat(getRawValue(document.getElementById("corretagem-final").value)) / parseFloat(getRawValue(document.getElementById("valor-final").value))) * 100, "%");
        });
        document.getElementById("irpf-final-porc-isolado").addEventListener("keyup", () => {
            document.getElementById("irpf-final").value = getFormatedValue(parseFloat(getRawValue(document.getElementById("lucro-final").value)) * (parseFloat(getRawValue(document.getElementById("irpf-final-porc-isolado").value))/100), "R$");
        });
        document.getElementById("irpf-final").addEventListener("keyup", () => {
            document.getElementById("irpf-final-porc-isolado").value = getFormatedValue((parseFloat(getRawValue(document.getElementById("irpf-final").value)) / parseFloat(getRawValue(document.getElementById("lucro-final").value))) * 100, "%");
        });
        document.getElementById("condominio").addEventListener("keyup", () => {
            document.getElementById("project-condominio").value = getFormatedValue(getRawValue(document.getElementById("condominio").value), "R$");
        });
        document.getElementById("valor-venda").addEventListener("keyup", () => {
            document.getElementById("project-anuncio").value = getFormatedValue(getRawValue(document.getElementById("valor-venda").value), "R$");
        });

        var calculationInputsId = ["valor-final", "valor-compra", "itbi-input", "escritura-input", "reforma-final", "corretagem-final", "juros-taxas"];
        for(var i = 0; i < calculationInputsId.length; i++) {
            document.getElementById(calculationInputsId[i]).addEventListener("keyup", updateFinalValuesCalculation);
        }

    }, 250);
}

window.handleChangeInSellMode = (mode) => {
    projectSellMode = mode;
    calculateIRPF();
    updateGrossProfit();
    calculateInvestment();
    updateValuesChartStats(projectSellMode);
}

window.showFinalResults = (mode) => {
    if(mode == 0) {
        document.getElementById("values-table-4").style.display = "block";
        document.getElementById("values-table-5").style.display = "none";
        document.getElementById("toggle-final-results-btn").classList.remove("menu-option-selected");
    } else {
        document.getElementById("values-table-4").style.display = "none";
        document.getElementById("values-table-5").style.display = "block";
        document.getElementById("toggle-final-results-btn").classList.add("menu-option-selected");
    }
    document.getElementsByClassName('collapsible')[2].classList.remove('collapsible-open');
    openProjectDetail(2);
}