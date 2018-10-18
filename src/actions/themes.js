export const loadThemesAction = () => ({
  type: "LOAD_THEMES",
  payload: {}
});

export const selectThemeAction = id => ({
  type: "SELECT_THEME",
  payload: { id }
});

export const setThemesDataAction = themes => ({
  type: "SET_THEMES_DATA",
  payload: { themes }
});

export const setSelectedThemeDetailsAction = theme => ({
  type: "SET_THEME_DETAILS",
  payload: { theme }
});

// Navigation
export const setThemesLoadingStatusAction = isLoading => ({
  type: "SET_THEMES_LOADING_STATUS",
  payload: { isLoading }
});

export const setThemeIDAction = id => ({
  type: "SET_SELECTED_THEME",
  payload: { id }
});
