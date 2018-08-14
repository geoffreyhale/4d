export default class MyChart {
    constructor(elementId, datasetData, xLabel, yLabel) {
        this.chart = new Chart(document.getElementById(elementId).getContext('2d'), {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: xLabel + yLabel,
                        data: datasetData[0],
                        pointBackgroundColor: "blue"
                    },
                    {
                        label: xLabel + yLabel,
                        data: datasetData[1],
                        pointBackgroundColor: "red"
                    }
                ]
            },
            options: {
                animation: false,
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom',
                        scaleLabel: {
                            display: true,
                            labelString: xLabel
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: yLabel
                        }
                    }]
                }
            }
        });
    }
}