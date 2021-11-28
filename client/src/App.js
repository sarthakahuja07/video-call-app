import React from 'react';
import Main from './components/MainComponent'
import { configureStore } from './redux/configureStore';
import { Provider } from 'react-redux';
import { ContextProvider } from './context';

const App = () => {
  const store = configureStore();

  return (
    <ContextProvider>
      <Provider store={store}>
        <div>
          <Main />
        </div>
      </Provider>
    </ContextProvider>

  )
}

export default App

