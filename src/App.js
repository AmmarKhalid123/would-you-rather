import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/ConfigureStore';
import Main from './components/Main'
import {BrowserRouter} from 'react-router-dom';


const store = ConfigureStore();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Main />
      </Provider>
    </BrowserRouter>
    );
}

export default App;
