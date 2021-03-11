import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { BasicNavigationContainer } from "@whir-react-native/components"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Tabbar() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 12,
          width: 60,
        },
        activeTintColor: 'green',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          // tabBarIcon: ({ focused, color, size }) => (
          //
          // ),
        }}
        component={require('@/routers/home').default}
      />
      <Tab.Screen
        name="Home2"
        options={{ key: 'Home2' }}
        component={require('@/routers/home2').default}
      />
    </Tab.Navigator>
  )
}

export default () => {
  return (
    <BasicNavigationContainer>
      <Stack.Navigator initialRouteName="Launch" headerMode="none">
        <Stack.Screen
          name="Launch"
          component={require('@/routers/launch').default}
        />
        <Stack.Screen
          name="Signin"
          component={require('@/routers/auth/signin').default}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="Blank"
          component={require('@/routers/blank').default}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen name="Tabbar" component={Tabbar} />
      </Stack.Navigator>
    </BasicNavigationContainer>
  )
}
