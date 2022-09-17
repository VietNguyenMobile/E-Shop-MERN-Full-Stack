import React from 'react';
import Header from './src/shared/Header';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Redux
import { Provider } from 'react-redux';
import store from './src/Redux/store';

// Context API
import Auth from './src/Context/store/Auth';

// Navigatiors
import Main from './src/navigators/Main';

// Screens
// import Header from './Shared/Header';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Header />
          <Main />
          <Toast ref={ref => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
};

export default App;
