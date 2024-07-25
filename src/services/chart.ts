import { IDGanttChart, IGanttItem } from "./../interface/dganttchart.interface";

class Chart {

    Chart(chartDivName : string, ganttItem : IGanttItem){
        let chartDiv : HTMLElement = document.getElementById(chartDivName)!;
        chartDiv.innerHTML = "<B>asddda</B>";
    }

    generateGanttChartHeader(){

    }

}

const chart = new Chart();
export { chart };
