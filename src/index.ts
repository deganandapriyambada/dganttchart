import { chart } from "./services/chart";

export class DGanttChart {
    public constructor(chartName : string){
        // build chart
        chart.Chart(chartName);
    }
}

export {};

declare global {
    interface Window { DChart: any; }
}

window.DChart = DGanttChart;