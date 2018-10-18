import { combineReducers } from "redux";

import { themeFields } from "../constants/themeFields";

// Define default themes state
const DEFAULT_THEMES_STATE = [];

// Define default navigation state
const DEFAULT_NAVIGATION_STATE = {
  themesLoading: true,
  selectedTheme: null,
  searchTerm: ""
};

// Define default selected theme details state
const DEFAULT_THEME_DETAILS = {};

themeFields.forEach(field => {
  DEFAULT_THEME_DETAILS[field.id] = field.isDate ? null : "";
});

// This should be in a separate utility file
const normalizeThemeDetails = data => {
  return data;
};

// Themes data reducer logic
function themes(state = DEFAULT_THEMES_STATE, { type, payload }) {
  switch (type) {
    // Handle data fetched by API
    case "SET_THEMES_DATA":
      return payload.themes;
    default:
      return state;
  }
}

// Selected theme reducer logic
function details(state = DEFAULT_THEME_DETAILS, { type, payload }) {
  switch (type) {
    case "SET_THEME_DETAILS":
      return Object.assign({}, state, normalizeThemeDetails(payload.theme));

    default:
      return state;
  }
}

// Navigation data reducer logic
function navigation(state = DEFAULT_NAVIGATION_STATE, { type, payload }) {
  switch (type) {
    case "SET_THEMES_LOADING_STATUS":
      return Object.assign({}, state, { themesLoading: payload.isLoading });

    case "SET_SELECTED_THEME":
      return Object.assign({}, state, { selectedTheme: payload.id });

    case "SET_THEME_SEARCH_TERM":
      return Object.assign({}, state, { searchTerm: payload.term });

    default:
      return state;
  }
}

export default combineReducers({
  themes,
  details,
  navigation
});
