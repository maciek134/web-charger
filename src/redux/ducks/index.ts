import { combineReducers } from 'redux';

import { all } from 'redux-saga/effects';
import * as charger from './charger';

export default combineReducers({
  charger: charger.reducer,
});

export function* rootSaga() {
  yield all([
    charger.rootSaga(),
  ]);
}
