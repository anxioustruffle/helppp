/*
 * Home screen
 */
// SECTION Imports
import React from 'react'
import {View, Text, TextInput, Picker, DatePicker, Button, StyleSheet} from 'react-native'
// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'
import ApplicationContext from '../contexts/ApplicationContext'

// SECTION Main functions
export default function Home() {
  // ANCHOR Constants
  // Context
  const applicationContext = React.useContext(ApplicationContext)
  const [screenItems, setScreenItems] = React.useState([])
  const [name, setName] = React.useState([])
  const [category, setCategory] = React.useState([])
  const [location, setLocation] = React.useState([])
  const [confection, setConfection] = React.useState([])
  const [expiry, setExpiry] = React.useState([])

  // ANCHOR Use effect
  React.useEffect(() => {
    setScreenItems(applicationContext.items)
  }, [applicationContext.items])

  // ANCHOR Functions
  const addItem = async () => {
    const newObj = {
      name: name,
      category: category,
      location: location,
      confection: confection,
      expiry: expiry
    }
    setScreenItems([...screenItems, newObj])
    await applicationContext.saveItems([...screenItems, newObj], (e) => {
      console.log(e)
    })
  }

  const clear = async () => {
    setScreenItems([])
    await applicationContext.saveItems([], (e) => {
      console.log(e)
    })
  }

  const getToday = (today) => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return today = date + '-' + month + '-' +  year;
}

  // ANCHOR Return statement
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.logo}>KITCHEN BUDDY</Text>
      <View style={styles.titleContainer}>
        <Text>Add an ingredient:</Text>
      </View>
      <SafeAreaView>
        <TextInput
          clearTextOnFocus={true}
          style={styles.input}
          onChangeText={setName}
          placeholder='Insert the name'
          value={name}
        />
      </SafeAreaView>

      <View style={styles.picker}>
        <Picker
          style={styles.options}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label='Category' value='' />
          <Picker.Item label='Fruit' value='Fruit' />
          <Picker.Item label='Vegetable' value='Vegetable' />
          <Picker.Item label='Dairy' value='Dairy' />
          <Picker.Item label='Fish' value='Fish' />
          <Picker.Item label='Meat' value='Meat' />
          <Picker.Item label='Liquid' value='Liquid' />
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          style={styles.options}
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label='Location' value='' />
          <Picker.Item label='Fridge' value='Fridge' />
          <Picker.Item label='Freezer' value='Freezer' />
          <Picker.Item label='Pantry' value='Pantry' />
        </Picker>
      </View>

      <View style={styles.picker}>
        <Picker
          style={styles.options}
          selectedValue={confection}
          onValueChange={(itemValue) => setConfection(itemValue)}
        >
          <Picker.Item label='Confection' value='' />
          <Picker.Item label='Fresh' value='Fresh' />
          <Picker.Item label='Canned' value='Canned' />
          <Picker.Item label='Frozen' value='Frozen' />
          <Picker.Item label='Cured' value='Cured' />
        </Picker>
      </View>

      <TextInput
          clearTextOnFocus={true}
          style={styles.input}
          onChangeText={setExpiry}
          placeholder='Insert the expiry'
          value={expiry}
        />

      <View style={styles.button}>
        <Button
          title='Insert product'
          onPress={addItem}
        />
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({

  screenContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightblue'
  },

  logo: {
    paddingTop: 50,
    paddingBottom: 25,
    fontSize: 25,
    fontFamily: 'sans-serif-medium',
    color: 'blue',
    fontWeight: 'bold'
  },

  titleContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 25
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    textAlign: 'center'
  },

  picker: {
    alignItems: 'center',
    paddingBottom: 25
  },

  options: {
    height: 40,
    width: 160
  },

  button: {
    paddingTop: 35
  },
});
