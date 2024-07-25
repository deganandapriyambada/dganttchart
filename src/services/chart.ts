class Chart {

    Chart(chartDivName : string){
        let chartDiv : HTMLElement = document.getElementById(chartDivName)!;
        chartDiv.append("<b>Hello World</b>");
    }

}

const chart = new Chart();
export { chart };
