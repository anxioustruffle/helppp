/*
 * Expires screen
 */
// SECTION Imports
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import ApplicationContext from '../contexts/ApplicationContext'

// SECTION Main functions
export default function Expires() {
  // ANCHOR Constants
  const applicationContext = React.useContext(ApplicationContext)

  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: '#0ff' }}>
      
    </View>
  )
}