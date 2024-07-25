"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chart = void 0;
class Chart {
    Chart(chartDivName) {
        let chartDiv = document.getElementById(chartDivName);
        chartDiv.append("<b>Hello World</b>");
    }
}
const chart = new Chart();
exports.chart = chart;
