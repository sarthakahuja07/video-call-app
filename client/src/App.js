import React from 'react';
import Main from './components/MainComponent'
import { configureStore } from './redux/configureStore';
import { Provider } from 'react-redux';

const App = () => {
  const store = configureStore();

  return (
      <Provider store={store}>
        <div>
          <Main />
        </div>
      </Provider>

  )
}

export default App

