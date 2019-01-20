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
import moment from "moment";
import { mean } from "mathjs";

import Bear from "./CornerBear"

const useStyles = makeStyles(theme => ({
  overviewContainer: {
    display: "flex"
  },
  overviewCard: {
    margin: "0 10px"
  }
}));

const REFERENCE = moment(); // fixed just for testing, use moment();
const A_WEEK_OLD = REFERENCE.clone()
  .subtract(7, "days")
  .startOf("day");

const averageSentiment = (values, query) => {
  let weekValues = values.filter(query).map(v => v.sentiment);
  if (weekValues.length === 0) return 0;
  return mean(weekValues);
};

const isAveraglyNegative = average => {
  return average < 0;
};
const Overview = props => {
  const classes = useStyles();

  return (
    <FirebaseAdapter>
      {({ values }) => {
        console.log(values);
        return (
          <div className={classes.overviewContainer}>
            <Card
              classes={{
                root: classes.overviewCard
              }}
            >
              {" "}
              <CardHeader
                title="Good morning, Alice."
                subheader={"Today is " + moment().format("dddd, MMMM Do YYYY")}
              />
              <CardContent> 
                <div>
                  <Typography paragraph>
                    Overall, you felt{" "}
                    {isAveraglyNegative(
                      averageSentiment(values, v =>
                        moment.unix(v.date)
                        .isBetween(A_WEEK_OLD, REFERENCE)
                        
                      )
                    ) ? (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        bad
                      </span>
                    ) : (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        good
                      </span>
                    )}{" "}
                    this past week.
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Card
              classes={{
                root: classes.overviewCard
              }}
            >
              <CardHeader
                title="Is there something you want to talk about?"
              />
              <CardContent>
                <div>
                  <Typography paragraph>
                    <em>Alexa, can I talk to Teddie?</em>
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <Bear/>
          </div>
        );
      }}
    </FirebaseAdapter>
  );
};

export default Overview;
