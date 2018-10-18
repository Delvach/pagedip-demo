import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { selectThemeAction } from "../actions/themes";

const getFilteredThemes = (themes, searchTerm) => {
  return themes.filter(({ title }) => {
    return title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  });
};

const styles = {
  root: {
    width: "100%"
  },
  hover: {
    cursor: "pointer"
  }
};

let ThemeList = ({ themes, selectTheme, classes, selectedThemeID }) => (
  <React.Fragment>
    {themes.length ? (
      <Table>
        <TableHead>
          <TableRow hover>
            <TableCell>Title</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {themes.map(theme => (
            <TableRow
              onClick={e => {
                selectTheme(theme.guid);
              }}
              key={theme.guid}
              className={classes.hover}
              hover
              selected={theme.guid === selectedThemeID}
            >
              <TableCell>{theme.title}</TableCell>
              <TableCell>
                {theme.owner === "_default" ? "Default" : theme.owner}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <div style={{ padding: 15 }}>
        Oops! No themes match your search terms.
      </div>
    )}
  </React.Fragment>
);

ThemeList.propTypes = {
  themes: PropTypes.array,
  searchTerm: PropTypes.string,
  selectedThemeID: PropTypes.string
};

ThemeList.defaultProps = {
  themes: [],
  searchTerm: "",
  selectedThemeID: ""
};

const mapStateToProps = ({ themes, navigation }) => ({
  themes: getFilteredThemes(themes, navigation.searchTerm),
  searchTerm: navigation.searchTerm,
  selectedThemeID: navigation.selectedTheme
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectTheme: selectThemeAction
    },
    dispatch
  );

ThemeList = withStyles(styles)(ThemeList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemeList);
