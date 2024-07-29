"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chart = void 0;
const month_lov_1 = require("./../lov/month.lov");
class Chart {
    constructor() {
        this.chartDivHTML = "";
        this.highestDate = new Date();
        this.lowestDate = new Date();
        this.highestDateTime = 0;
        this.lowestDateTime = 0;
        this.monthDifferences = 0;
        // styling
        this.monthSize = 50; // in pixel (px)
    }
    Chart(chartDivName, ganttItem, window, separator) {
        let chartDiv = document.getElementById(chartDivName);
        this.computeGanttLength(ganttItem);
        this.monthDifferences = this.monthDiff(this.lowestDate, this.highestDate) + 1;
        // render
        this.renderGantt(ganttItem, separator);
        // apply to div
        chartDiv.innerHTML = this.chartDivHTML;
    }
    renderGantt(ganttItem, separator) {
        let ganttHeaderMonth = "";
        let startMonth = this.lowestDate.getMonth() + 1;
        let monthNowRendered = startMonth;
        for (var i = 1; i <= (this.monthDifferences + 1); i++) {
            ganttHeaderMonth += `
                <div class="monthHeading">
                    <div class="vert">
                        <b> ${month_lov_1.monthLov[monthNowRendered]} </b>
                    </div>
                </div>
            `;
            monthNowRendered++;
            if (monthNowRendered == 13) {
                monthNowRendered = 1; // set back to jan
            }
        }
        let ganttHeader = `
        <div class="gantt-chart">
            <div class="gantt-chart-container">
               <div>
                    <div class="gantt-chart-leftpane">
                        ${this.renderActivityList(ganttItem, separator)}
                    </div>
               </div>
               <div>
                    <div class="gantt-chart-header">
                        ${ganttHeaderMonth}
                    </div>
                    <div class="gantt-progress-bar">
                        ${this.renderProgressBar(ganttItem, separator)}
                    </div>
                </div>
            </div>
        </div>
        `;
        this.chartDivHTML += ganttHeader;
    }
    renderProgressBar(ganttItem, separator) {
        let progressBar = ``;
        let iterate = 0;
        ganttItem.forEach((val, index) => {
            if (typeof val !== undefined) {
                if (typeof separator !== "undefined") {
                    const findNextseparator = (elem) => elem.index == iterate;
                    let anySeparator = separator === null || separator === void 0 ? void 0 : separator.findIndex(findNextseparator);
                    if (anySeparator !== -1) {
                        progressBar += ` <div class="progress-bar"> &nbsp; </div>`;
                    }
                }
                let multiplier = new Date(val.startDate).getFullYear() - this.lowestDate.getFullYear() || 0;
                let length = this.monthDiff(new Date(val.startDate), new Date(val.endDate)) + 2;
                progressBar += `
                    <div class="progress-bar" style="width: ${this.monthSize * length}px; margin-left: ${(multiplier * this.monthSize * 12) + (new Date(val.startDate).getMonth()) * this.monthSize}px;">    
                        <div class="period"><b> ${length} </b> Months ( ${val.startDate} - ${val.endDate} ) </div>
                    </div>
                
                `;
                iterate++;
            }
        });
        return progressBar;
    }
    renderActivityList(ganttItem, separator) {
        let activityList = ``;
        activityList += `
        <div class="activity-name">
            <div class="vert">
                <b>Activity Name</b>
            </div>
        </div>
        `;
        let iterate = 0;
        ganttItem.forEach((val, index) => {
            if (typeof separator !== "undefined") {
                const findNextseparator = (elem) => elem.index == iterate;
                let anySeparator = separator === null || separator === void 0 ? void 0 : separator.findIndex(findNextseparator);
                if (anySeparator !== -1) {
                    activityList += `
                    <div class="activity-name">
                        <div class="separator" style="width: ${((this.monthDifferences + 1) * this.monthSize) + 180};">
                            <div class="vert">
                                ${separator[anySeparator].separatorName}
                            </div>
                        </div>
                    </div>`;
                }
            }
            if (typeof val.itemName !== undefined) {
                activityList += `
                    <div class="activity-name">
                        <div class="vert">
                            ${val.itemName}
                        </div>
                    </div>
                `;
            }
            iterate++;
        });
        return activityList;
    }
    computeGanttLength(ganttItem) {
        ganttItem.forEach((val, index) => {
            if (typeof val.endDate !== undefined) {
                let currentExaminedDateEnd = new Date(val.endDate);
                this.getHighestDate(currentExaminedDateEnd);
            }
            if (typeof val.startDate !== undefined) {
                let currentExaminedDateStart = new Date(val.startDate);
                this.getLowestDate(currentExaminedDateStart);
            }
        });
    }
    getHighestDate(input) {
        let currentDateTimestamp = input.getTime();
        if (currentDateTimestamp > this.highestDateTime) {
            this.highestDateTime = currentDateTimestamp;
            this.highestDate = input;
        }
    }
    getLowestDate(input) {
        let currentDateTimestamp = input.getTime();
        if (this.lowestDateTime == 0) {
            // set highest date
            this.lowestDateTime = currentDateTimestamp;
            this.lowestDate = input;
        }
        else if (currentDateTimestamp < this.lowestDateTime) {
            // set lowest date
            this.lowestDateTime = currentDateTimestamp;
            this.lowestDate = input;
        }
    }
    monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }
}
const chart = new Chart();
exports.chart = chart;
