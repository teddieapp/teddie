import React from "react";
import {
  Label,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from "recharts";
import Measure from "react-measure";
import { makeStyles, useTheme } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const useStyles = makeStyles(theme => ({
  chart: {
    width: "100%",
  }
}));

const Trend = props => {
  const [width, setWidth] = React.useState(0);
  const classes = useStyles();

  return (
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
              data={data}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </div>
        )}
      </Measure>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Typography>
    </div>
  );
};

export default Trend;
