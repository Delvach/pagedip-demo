import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  detailsContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },

  iframe: {
    border: "0px none",
    height: "100%",
    width: "100%"
  },
  paper: {
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  card: {
    minWidth: 275,
    height: 200,
    textAlign: "left"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 15
  },
  description: {
    fontSize: 14,
    marginBottom: 15
  },
  pos: {
    marginBottom: 12
  },

  iframeContainer: {
    position: "absolute",
    left: 0,
    top: 201,
    bottom: 0,
    right: 0
  }
});

const getFormattedDate = date =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

let ThemeDetails = ({ details, url, classes, selectedThemeID }) => (
  <div className={classes.detailsContainer}>
    {selectedThemeID && (
      <React.Fragment>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="h5" component="h2">
              {details.title}
            </Typography>
            <Typography className={classes.description} gutterBottom>
              {details.description}
            </Typography>

            <Typography component="p" gutterBottom>
              Owned by{" "}
              {details.owner === "_default" ? "Default" : details.owner}
            </Typography>

            <Typography component="p">
              Created on {getFormattedDate(details.created)}
            </Typography>

            <Typography component="p" gutterBottom>
              Last updated on {getFormattedDate(details.last_updated)}
            </Typography>

            <Typography
              className={classes.pos}
              color="textSecondary"
              gutterBottom
            >
              ID: {details.guid}
            </Typography>
          </CardContent>
        </Card>

        <div className={classes.iframeContainer}>
          {url && (
            <iframe
              title="Preview Pagedip"
              className={classes.iframe}
              src={url}
            />
          )}
        </div>
      </React.Fragment>
    )}
  </div>
);

ThemeDetails.propTypes = {
  details: PropTypes.object,
  url: PropTypes.string,
  classes: PropTypes.object,
  selectedThemeID: PropTypes.string
};

ThemeDetails.defaultProps = {
  details: {},
  url: "",
  classes: {},
  selectedThemeID: ""
};

const mapStateToProps = ({ details, navigation }) => ({
  url: details.url,
  details,
  selectedThemeID: navigation.selectedTheme
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

ThemeDetails = withStyles(styles)(ThemeDetails);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeDetails);
