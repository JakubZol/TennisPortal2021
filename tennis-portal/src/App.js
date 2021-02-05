import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import UserReducer from './reducers/UserReducer'
import FormsReducer from './reducers/FormsReducer';
import MessagesReducer from './reducers/MessagesReducer';
import AppRouting from './routing';
import Navigation from './shared/components/Navigation'

const rootReducer = combineReducers({
    user: UserReducer,
    messages: MessagesReducer,
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
        <BrowserRouter>
            <Navigation/>
            <AppRouting/>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
