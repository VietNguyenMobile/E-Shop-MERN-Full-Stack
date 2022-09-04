import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import ProductScreen from '../screens/product/product-screen';
// import SingleProduct from '../Screens/Products/SingleProduct';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
    // screenOptions={({ route, navigation }) => ({
    //   headerShown: false,
    //   gestureEnabled: true,
    //   ...TransitionPresets.ModalPresentationIOS,
    // })}
    >
      <Stack.Screen
        name="Home"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="ProductDetail"
        component={SingleProduct}
        options={{
          headerShown: true,
        }}
      /> */}
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
