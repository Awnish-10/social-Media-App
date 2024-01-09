// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';

import { store } from './store';
import { AuthNavigator, BottomNavigator } from './Navigation';


// types.ts



const RootNavigation: React.FC = () => {
  const user = useSelector((state:any) => state.currentUser);
  return (
   
      <NavigationContainer>
        {user ?<BottomNavigator />:<AuthNavigator /> }
      
      </NavigationContainer>
   
  );
};

export default RootNavigation;
