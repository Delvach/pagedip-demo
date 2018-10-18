import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";

import Search from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

import ThemeList from "./components/ThemeList";
import ThemeDetails from "./components/ThemeDetails";
import LoadingIndicator from "./components/LoadingIndicator";

import "./App.css";

import { loadThemesAction, handleSearchChangeAction } from "./actions/themes";

class App extends Component {
  componentDidMount = () => {
    this.props.initialize();
  };

  render() {
    return (
      <div className="App">
        <div className="content_box top">
          <div>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              style={{ marginTop: 15 }}
            >
              Pagedip Themes Preview
            </Typography>
            <Typography component="p" gutterBottom>
              by Ben Del Vacchio
            </Typography>
            <Grid
              style={{
                position: "absolute",
                right: 15,
                top: 15,
                width: 300
              }}
              container
              spacing={8}
              alignItems="flex-end"
            >
              <Grid item>
                <Search />
              </Grid>
              <Grid item>
                <TextField
                  onChange={e => {
                    this.props.handleSearchChange(e.target.value);
                  }}
                  label="Search themes"
                />
              </Grid>
            </Grid>
          </div>
          <ThemeList />
        </div>
        <div className="content_box bottom">
          <ThemeDetails />
        </div>
        {this.props.loading && <LoadingIndicator />}
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool
};

App.defaultProps = {
  loading: false
};

const mapStateToProps = ({ navigation }) => ({
  loading: navigation.themesLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initialize: loadThemesAction,
      handleSearchChange: handleSearchChangeAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
