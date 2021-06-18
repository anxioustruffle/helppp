/*
 * Home Navigator handler
 */
// SECTION Imports
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import Home from '../screens/Home'
import Query from '../screens/Query'
import Expires from '../screens/Expires'

// SECTION File variables
const Tabs = createBottomTabNavigator()

// SECTION Main class
export default function HomeNavigator() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#F8F8F8',
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'home') {
            return <Entypo name="home" size={24} color={focused === true ? '#7DBBC3' : '#FF928B'} />
          }
          if (route.name === 'query') {
            return <MaterialCommunityIcons name="fridge" size={26} color={focused === true ? '#7DBBC3' : '#FF928B'} />
          }
          if (route.name === 'expires') {
            return <Entypo name="stopwatch" size={24} color={focused === true ? '#7DBBC3' : '#FF928B'} />
          }
        },
      })}
    >
      <Tabs.Screen name="home" component={Home} />
      <Tabs.Screen name="query" component={Query} />
      <Tabs.Screen name="expires" component={Expires} />
    </Tabs.Navigator>
  )
}
