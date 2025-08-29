import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './utils/store/store';
import { ReduxThemeProvider } from './utils/theme/ReduxThemeProvider';
import AppLoader from './utils/components/Loaders/AppLoader';
import AppRouter from './AppRouter';
import "./assets/css/custom.css";


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<AppLoader />} persistor={persistor}>
        <ReduxThemeProvider>
          <AppRouter />
        </ReduxThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

