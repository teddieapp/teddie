import React from "react";
import {
  Label,
  Legend,
  LineChart,
  ScatterChart,
  Scatter,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ComposedChart,
  ReferenceLine
} from "recharts";
import Measure from "react-measure";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { CardContent, CardHeader } from "@material-ui/core";
import FirebaseAdapter from "./FirebaseAdapter";
import moment from 'moment';
import { mean } from 'mathjs';

const useStyles = makeStyles(theme => ({
  chart: {
    width: "100%"
  }
}));

const REFERENCE = moment(); // fixed just for testing, use moment();
const A_WEEK_OLD = REFERENCE.clone().subtract(7, 'days').startOf('day');


const averageSentiment = (values, query) => {
    let weekValues = values.filter(query).map(v => v.sentiment);
    return mean(weekValues)
}

const isAveraglyNegative = average => {
    return average < 0;
}
const Trend = props => {
  const [width, setWidth] = React.useState(0);
  const classes = useStyles();

  return (
    <FirebaseAdapter>
      {({ values }) => {
        console.log(values);
        return (
          <Card>
            <CardHeader
              title="How you felt this week"
              subheader={moment().format("dddd, MMMM Do YYYY")}
            />
            <CardContent>
              <div>
                <Measure
                  bounds
                  onResize={contentRect => {
                    setWidth(contentRect.bounds.width);
                  }}
                >
                  {({ measureRef }) => (
                    <div ref={measureRef} className={classes.chart}>
                      <ScatterChart
                        width={width}
                        height={300}
                        data={values.filter(v => moment(v.date).isAfter(A_WEEK_OLD))} 
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="10%"
                              stopColor="#8884d8"
                              stopOpacity={1}
                            />
                            <stop
                              offset="90%"
                              stopColor="#f48042"
                              stopOpacity={1}
                            />
                          </linearGradient>
                          <linearGradient
                            id="colorPv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#f48042"
                              stopOpacity={1}
                            />
                            <stop
                              offset="95%"
                              stopColor="#82ca9d"
                              stopOpacity={1}
                            />
                          </linearGradient>
                        </defs>

                        <XAxis interval={moment.duration(1, 'day').asMilliseconds()} dataKey = 'date' domain = {['auto', 'auto']}  type = 'number' tickFormatter = {(unixTime) => moment(unixTime).format('ddd')}/>
                    	<YAxis hide={true} type="number" domain = {[-1, 1]}  dataKey={'sentiment'} name='Happiness'/>

                        <ReferenceLine y={0} stroke="grey" strokeDasharray="3 3" />

                        {/* <Tooltip /> */}
                        {/* <Legend /> */}
                        <Scatter name='sentiment'
                            data={values.filter(v => moment(v.date).isAfter(A_WEEK_OLD))} 
                            fill="#82ca9d"
                            line={{stroke: 'url(#colorUv)', strokeWidth: 2}}
                            shape="circle"/>

                      </ScatterChart>
                    </div>
                  )}
                </Measure>
                <Typography paragraph>
                  Overall, you felt { isAveraglyNegative(averageSentiment(values, v => moment(v.date).isAfter(A_WEEK_OLD))) ? <span style={{color: 'red', fontWeight: "bold"}}>bad</span> 
                  : <span style={{color: 'green',  fontWeight: "bold"}}>good</span> } this past week.
                </Typography>
              </div>
            </CardContent>
          </Card>
        );
      }}
    </FirebaseAdapter>
  );
};

export default Trend;
