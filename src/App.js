import React from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {LastLocationProvider} from 'react-router-last-location';
import {ConfigureStore} from './redux/ConfigureStore';
import Main from './components/Main'
import {BrowserRouter} from 'react-router-dom';


const store = ConfigureStore();

function App() {
  return (
    <BrowserRouter>
    <LastLocationProvider>
    <Provider store={store}>
        <Main />
      </Provider>
    </LastLocationProvider>
    </BrowserRouter>
    );
}

export default App;
