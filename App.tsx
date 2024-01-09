// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';

import { store } from './store';
import { AuthNavigator, BottomNavigator } from './Navigation';
import RootNavigation from './RootNavigation';


// types.ts



const App: React.FC = () => {
  return (
    <Provider store={store}>
     <RootNavigation />
    </Provider>
  );
};

export default App;
