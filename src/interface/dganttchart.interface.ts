interface IDGanttChart {
    chartName?: string;
    ganttChartItem? : IGanttItem[];
    separator?: ISeparator;
}

interface IGanttItem {
    startDate?: string;
    endDate?: string;
    itemName? : string;
}

interface ISeparator {
    index?: number,
    separatorName?: string
}

export { IDGanttChart, IGanttItem, ISeparator  }