import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";

const styles = theme => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: blue[500]
  },
  loadingText: {
    marginTop: 200
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const LoadingIndicator = ({ classes }) => (
  <div className={classes.container}>
    <Typography className={classes.loadingText} variant="h4">
      <CircularProgress
        className={classes.progress}
        style={{ color: orange[500] }}
        thickness={7}
      />
      Preparing your Pagedip themes!
    </Typography>
  </div>
);

LoadingIndicator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingIndicator);
