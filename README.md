# Html Gantt Chart

Currently only support **monthly gantt chart** for now

![html dgantt chart](https://github.com/deganandapriyambada/dganttchart/blob/master/samples/dganttchart-view.jpg)

## Installation

### Embed on web page
you can follow below instruction or just skip into sample file which you can find under /sample/ folder.

#### Import dgantt chart js
Import dgantt chart javascript into your web page (html). (suggest to use the minified versio a.k.a with .min.js suffix).

     <script  src="./../dist/dganttchart.min.js"></script>

dont forget to change the file path into the dganttchart.js

#### import css

import css on your web header ( head )

    <link  rel="stylesheet"  type="text/css"  href="./../styles/style.css">

#### Instantiate the dgantt chart object
put this on your html page. (usually on the end of body.

    <script>
    let data = [
      {
        startDate: "2024-03",
        endDate: "2024-05",
        itemName: "Interview with User",
      },
      {
        startDate: "2024-03",
        endDate: "2024-04",
        itemName: "Backend Development",
      },
      {
        startDate: "2024-01",
        endDate: "2025-04",
        itemName: "Backend Unit Testing",
      },
      {
        startDate: "2025-01",
        endDate: "2025-06",
        itemName: "Frontend Development",
      },
    ];
    
    let separator = [
      {
        index: 0,
        separatorName: "Phase 1: Requirement gathering",
      },
      {
        index: 1,
        separatorName: "Phase 2: Development",
      },
    ];
    var myChart = new DGanttChart("myganttchart", data, separator);
    </script>

done. you can now refresh your browser and should be able to see the gantt chart.
