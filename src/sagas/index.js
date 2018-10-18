import { call, put, all, takeEvery, select } from "redux-saga/effects";
import { delay } from "redux-saga";

import {
  setThemesDataAction,
  setThemesLoadingStatusAction,
  setSelectedThemeDetailsAction,
  setThemeIDAction
} from "../actions/themes";

import { apiKey } from "../config/keys";

/* List API Utility */
const getPagedipThemesFromApi = authKey => {
  const url = "https://pagedip.com/api/theme";
  return fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${authKey}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      throw error;
    });
};

const storeThemesDataLocally = data => {
  localStorage.setItem("themes", JSON.stringify(data));
};

const retrieveThemesDataLocally = () => {
  const data = localStorage.getItem("themes");
  return data ? JSON.parse(data) : [];
};

/*
 *  Fetch theme details
 *  Complicated by server CORS settings
 */
const getPagedipThemePreviewURL = theme =>
  `https://pagedip.com/theme/${theme.owner}/${theme.handle}`;

/* Filtering utilty */
const getThemeById = (themes, id) => {
  return themes.find(theme => {
    return theme.guid === id;
  });
};

export function* loadThemesData() {
  yield put(setThemesLoadingStatusAction(true));

  // Adding faux delay to emulate longer load time and let spinner display
  yield delay(1000);

  // Check for locally cached data
  const cachedData = retrieveThemesDataLocally();
  console.log(cachedData);
  let validCache = cachedData && cachedData !== "undefined";

  // If cached data exists, updated UI immediately
  if (validCache) {
    yield put(setThemesDataAction(cachedData));
  }

  // Retrieve data from API
  const data = yield call(getPagedipThemesFromApi, apiKey);

  if (data.ok) {
    // Compare  any cached data against newly retrieved
    if (
      validCache &&
      JSON.stringify(data.rows) === JSON.stringify(cachedData)
    ) {
      console.log("using cached data");
      yield put(setThemesLoadingStatusAction(false));
      return;
    }

    storeThemesDataLocally(data.rows);

    yield put(setThemesDataAction(data.rows));
    yield put(setThemesLoadingStatusAction(false));
  }
}

export function* loadThemeDetailsData({ payload }) {
  // Grab all themes currently in state
  const { themes } = yield select(state => state);

  // Get details for selected theme
  const theme = getThemeById(themes, payload.id);

  // Should handle error here
  if (theme === undefined) {
    return;
  }

  // Generate URL for iframe preview
  theme.url = getPagedipThemePreviewURL(theme);

  // Update selection, used for row highlighting
  yield put(setThemeIDAction(theme.guid));

  yield put(setSelectedThemeDetailsAction(theme));
}

function* loadAllThemes() {
  yield takeEvery("LOAD_THEMES", loadThemesData);
}

function* loadThemeDetails() {
  yield takeEvery("SELECT_THEME", loadThemeDetailsData);
}

export const themeSagas = [loadAllThemes(), loadThemeDetails()];

// Using root saga pattern
export default function* rootSaga() {
  yield all([...themeSagas]);
}
