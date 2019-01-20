import React from 'react';
import { makeStyles, useTheme } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    bear: {
        position: 'fixed',
        width: "100%",
        height: 300,
        bottom: 0,
    },
    bearImage: {
        height: '100%',
        objectFit: 'cover',
        right: 0
    },
    bearContainer: {
        height: 300
    }
  }));


const Bear = ({message}) => {
    const classes = useStyles();
    return (
        <div className={classes.bear}>
         <div className={classes.bearContainer}>
           <img className={classes.bearImage} src="/bear.png"/>
           </div>
        </div>
    )
};

export default Bear;