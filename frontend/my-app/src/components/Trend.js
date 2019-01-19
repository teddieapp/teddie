import React from "react";
import { ScatterPlot } from "react-d3-components";
const Trend = props => {
    const tooltipScatter = function(x, y) {
        return "x: " + x + " y: " + y;
    };
    var data = [{
        label: 'somethingA',
        values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    }];
    return (<ScatterPlot
        data={data}
        width={400}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}
        tooltipHtml={tooltipScatter}
        xAxis={{label: "x-label"}}
        yAxis={{label: "y-label"}}/>)
}

export default Trend;
