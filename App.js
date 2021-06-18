/*
 * Main entry point of app
 */
// SECTION Imports
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ApplicationContext from './src/contexts/ApplicationContext'
import HomeNavigator from './src/navigators/HomeNavigator'
import LoadingScreen from './src/screens/LoadingScreen'

// SECTION Main functions
export default function App() {
  // ANCHOR State
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  // ANCHOR Functions
  // Async storage get items function
  const getItems = async () => {
    setIsLoading(true)
    try {
      const savedItems = await AsyncStorage.getItem('items')
      if (savedItems === null || savedItems === undefined) {
        setItems([])
        setIsLoading(false)
      }
      setIsLoading(false)
      setItems(JSON.parse(savedItems))
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setItems([])
    }
  }
  // Returns nothing, if there is an error it will call error callback so we can handle the error in UI
  const saveItems = async (value, errorCallback) => {
    // If value is not defined or is not an object, exit
    if (value === null || value === undefined || typeof value !== 'object') return
    try {
      const jsonItems = JSON.stringify(value)
      await AsyncStorage.setItem('items', jsonItems).then(() => {
        console.log(jsonItems)
      })
    } catch (e) {
      errorCallback(e)
    }
  }

  // ANCHOR Use effect override
  // Calls get items at first run of the app and sets them into context and state
  React.useEffect(() => {
    getItems()
  }, [])

  // ANCHOR Contest
  // Application context used in the entire app
  const applicationContext = React.useMemo(() => {
    return {
      items,
      saveItems,
    }
  }, [items])

  // ANCHOR Return statement
  return (
    <ApplicationContext.Provider value={applicationContext}>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <NavigationContainer>
          <HomeNavigator />
        </NavigationContainer>
      )}
    </ApplicationContext.Provider>
  )
}
