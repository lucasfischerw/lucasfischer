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

window.createStackedChart = (ctx, dataCompra, dataVenda, dataLucroLiq, labels) => {
    console.log(dataCompra, dataVenda, dataLucroLiq, labels);
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
            barPercentage: 0.28,
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