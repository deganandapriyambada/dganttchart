import { chart } from "./services/chart";
import { IDGanttChart, IGanttItem, ISeparator } from "./interface/dganttchart.interface";

export class DGanttChart implements IDGanttChart  {
    public constructor(chartName : string, ganttItem  : Array<IGanttItem>, separator? : Array<ISeparator> ){
        // build chart
        chart.Chart(chartName, ganttItem, window, separator);
    }
}

export {};

declare global {
    interface Window { DGanttChart: any; }
}

window.DGanttChart = DGanttChart;
