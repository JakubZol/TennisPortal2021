import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './reducers/UserReducer'
import FormsReducer from './reducers/FormsReducer';
import Home from './screens/Home'

const rootReducer = combineReducers({
    user: UserReducer,
    forms: FormsReducer,
});

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

// TODO: correct anonymous imports
function App() {
  return (
      <Provider store={store}>
        <Home />
      </Provider>
  );
}

export default App;
