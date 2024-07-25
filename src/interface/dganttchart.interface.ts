interface IDGanttChart {
    chartName?: string;
    ganttChartItem? : IGanttItem[];
}

interface IGanttItem {
    startDate?: string;
    endDate?: string;
}

export { IDGanttChart, IGanttItem }