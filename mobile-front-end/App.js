import React from 'react';
import Header from './src/shared/Header';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Navigatiors
import Main from './src/navigators/Main';

LogBox.ignoreAllLogs(true);

const App = () => {
  return (
    <NavigationContainer>
      <Header />
      <Main />
      <Toast ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
