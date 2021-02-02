import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducers/reducer'


const store = createStore(
    Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const TemporaryComponent = ({ data }) => <div> Tennis portal - {data} </div>;

const mapStateToProps = state => ({
    data: state.data,
});

const TemporaryContainer = connect(mapStateToProps)(TemporaryComponent);


function App() {
  return (
      <Provider store={store}>
        <TemporaryContainer />
      </Provider>
  );
}

export default App;
