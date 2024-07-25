"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DGanttChart = void 0;
const chart_1 = require("./services/chart");
class DGanttChart {
    constructor(chartName) {
        // build chart
        chart_1.chart.Chart(chartName);
    }
}
exports.DGanttChart = DGanttChart;
window.DChart = DGanttChart;
