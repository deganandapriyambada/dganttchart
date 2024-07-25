import { chart } from "./services/chart";
import { IDGanttChart, IGanttItem } from "./interface/dganttchart.interface";

export class DGanttChart implements IDGanttChart  {
    public constructor(chartName : string, ganttItem : IGanttItem){
        // build chart
        chart.Chart(chartName, ganttItem);
    }
}

export {};

declare global {
    interface Window { DGanttChart: any; }
}

window.DGanttChart = DGanttChart;