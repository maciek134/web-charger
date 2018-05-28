import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from './ducks';
import { IChargerAction, IChargerState } from './ducks/charger';

export interface IStoreState {
  charger: IChargerState,
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore<IStoreState, IChargerAction, any, any>(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);
