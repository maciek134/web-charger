import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Charger from './containers/Charger';
import './index.css';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Charger/>
  </Provider>,
  document.getElementById('root')!
);
registerServiceWorker();
