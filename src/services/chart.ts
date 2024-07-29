import { IGanttItem, ISeparator } from "./../interface/dganttchart.interface";
import { monthLov } from "./../lov/month.lov";

class Chart {

    chartDivHTML : any = "";
    highestDate : Date = new Date();
    lowestDate : Date = new Date();
    highestDateTime : number = 0;
    lowestDateTime : number = 0;
    monthDifferences : number = 0;
    
    // styling
    monthSize = 50; // in pixel (px)
    
    Chart(chartDivName : string, ganttItem : Array<IGanttItem>, window : Window & typeof globalThis, separator? : Array<ISeparator>){
        let chartDiv : HTMLElement = document.getElementById(chartDivName)!;
        this.computeGanttLength(ganttItem);
        this.monthDifferences = this.monthDiff(this.lowestDate, this.highestDate)+1;
        // render
        this.renderGantt(ganttItem, separator);
        // apply to div
        chartDiv.innerHTML = this.chartDivHTML;
    }

    renderGantt(ganttItem : Array<IGanttItem>, separator? : Array<ISeparator>){
        let ganttHeaderMonth = "";
        let startMonth = this.lowestDate.getMonth()+1;
        let monthNowRendered = startMonth;
        for(var i = 1; i<=(this.monthDifferences+6); i++){
            ganttHeaderMonth += `
                <div class="monthHeading">
                    <div class="vert">
                        <b> ${monthLov[monthNowRendered]} </b>
                    </div>
                </div>
            `;
            monthNowRendered++;
            if(monthNowRendered == 13){
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

    renderProgressBar(ganttItem : Array<IGanttItem>,  separator? : Array<ISeparator>){
        let progressBar : string = ``;
        let iterate = 0;
        ganttItem.forEach((val,index) => {
            if(typeof val !== undefined){
                if(typeof separator !== "undefined"){
                    const findNextseparator: any = (elem: any) => elem.index == iterate;
                    let anySeparator = separator?.findIndex(findNextseparator);
                    if(anySeparator !== -1){
                        progressBar += ` <div class="progress-bar"> &nbsp; </div>`;
                    }
                }
                let multiplier = <number>new Date(<string>val.startDate).getFullYear() - <number>this.lowestDate.getFullYear()|| 0;
                let length : number = this.monthDiff(new Date(<string>val.startDate), new Date(<string>val.endDate))+2;
                progressBar += `
                    <ul class="progress-bar">    
                             <li style="width: ${this.monthSize*length}px; margin-left: ${(multiplier*this.monthSize*12)+(new Date(<string>val.startDate).getMonth())*this.monthSize}px;">
                             <div class="period"><b> ${length} </b> Months</div>
                             </li>
                             <li>
                                <div class="period-info">
                                ${val.startDate} - ${val.endDate}
                                </div>
                             </li>
                    </ul>
                
                `;
                iterate++;
            }
        });
        return progressBar;
    }

    renderActivityList(ganttItem : Array<IGanttItem>, separator? : Array<ISeparator>){
        let activityList : string = ``;
        activityList += `
        <div class="activity-name">
            <div class="vert">
                <b>Activity Name</b>
            </div>
        </div>
        `;


        let iterate = 0;
        ganttItem.forEach((val,index) => {
            if(typeof separator !== "undefined"){
                const findNextseparator: any = (elem: any) => elem.index == iterate;
                let anySeparator = separator?.findIndex(findNextseparator);
                if(anySeparator !== -1){
    
                    activityList += `
                    <div class="activity-name">
                        <div class="separator" style="width: ${((this.monthDifferences+6)*this.monthSize)+180};">
                            <div class="vert vert-left">
                                ${separator![anySeparator!].separatorName}
                            </div>
                        </div>
                    </div>`;
    
                }
            }
  
            if(typeof val.itemName !== undefined){
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

    computeGanttLength(ganttItem : Array<IGanttItem>){
        ganttItem.forEach((val, index) => {
            if(typeof val.endDate !== undefined){
                let currentExaminedDateEnd: Date = new Date(<string>val.endDate);
                this.getHighestDate(currentExaminedDateEnd);
            }
            if(typeof val.startDate !== undefined){
                let currentExaminedDateStart: Date = new Date(<string>val.startDate);
                this.getLowestDate(currentExaminedDateStart);
            }
        });
    }

    getHighestDate(input: Date){
        let currentDateTimestamp = input.getTime();
        if(currentDateTimestamp > this.highestDateTime){
            this.highestDateTime = currentDateTimestamp;
            this.highestDate = input;
        }
    }


    getLowestDate(input: Date){
        let currentDateTimestamp = input.getTime();
        if(this.lowestDateTime == 0){
            // set highest date
            this.lowestDateTime = currentDateTimestamp;
            this.lowestDate = input;
        } else if(currentDateTimestamp < this.lowestDateTime){
            // set lowest date
            this.lowestDateTime = currentDateTimestamp;
            this.lowestDate = input;
        }
    }
    
    monthDiff(d1 : Date, d2: Date) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth() + 1;
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

}

const chart = new Chart();
export { chart };
