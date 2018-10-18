import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Typography from "@material-ui/core/Typography";

import ThemeList from "./components/ThemeList";
import ThemeDetails from "./components/ThemeDetails";
import LoadingIndicator from "./components/LoadingIndicator";

import "./App.css";

import { loadThemesAction } from "./actions/themes";

class App extends Component {
  componentDidMount = () => {
    this.props.initialize();
  };
  render() {
    return (
      <div className="App">
        <Typography variant="h4" component="h1" gutterBottom>
          Pagedip Themes Preview
        </Typography>
        <Typography component="p" gutterBottom>
          by Ben Del Vacchio
        </Typography>
        {this.props.loading && <LoadingIndicator />}
        <ThemeList />
        <ThemeDetails />
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
      initialize: loadThemesAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
