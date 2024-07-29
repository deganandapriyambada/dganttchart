"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
let data = [
    {
        "startDate": "2024-02-29",
        "endDate": "2024-03-01",
        "itemName": "project1"
    }
];
const testChart = new index_1.DGanttChart("myganttchart", data);
console.log(testChart);
console.log('ehee');
