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
  ReferenceLine
} from "recharts";
import Measure from "react-measure";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { CardContent, CardHeader } from "@material-ui/core";
import FirebaseAdapter from "./FirebaseAdapter";
import moment from 'moment';

const data = [
  { name: "Sun", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Mon", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Tue", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Wed", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Thu", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Fri", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Sat", uv: 3490, pv: 4300, amt: 2100 }
];

const useStyles = makeStyles(theme => ({
  chart: {
    width: "100%"
  }
}));


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
              subheader="January 19, 2019"
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
                      <LineChart
                        width={width}
                        height={300}
                        data={values}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
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
                              offset="5%"
                              stopColor="#8884d8"
                              stopOpacity={1}
                            />
                            <stop
                              offset="95%"
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

                        <XAxis dataKey = 'date' domain = {['auto', 'auto']}  type = 'number' tickFormatter = {(unixTime) => moment(unixTime).format('ddd')}/>
                    	<YAxis type="number" domain = {[-1, 1]}  dataKey={'sentiment'} name='Happiness'/>
                        <Line type="monotone" dataKey="sentiment" stroke="url(#colorUv)" activeDot={{r: 8}}/>

                        <ReferenceLine y={0} stroke="grey" strokeDasharray="3 3" />

                        {/* <Tooltip /> */}
                        {/* <Legend /> */}
                        {/* <Scatter name='A school' data={values} fill='#8884d8' line shape="cross"/> */}
                      </LineChart>
                    </div>
                  )}
                </Measure>
                <Typography paragraph>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
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
