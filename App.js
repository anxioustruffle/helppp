import React, { useState } from 'react';
import { db } from './Config';
import { StyleSheet, Button, Alert, ScrollView, FlatList, TouchableOpacity, SafeAreaView, TextInput, Picker, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';

function AddScreen () {
  const [name, onChangeText] = useState('');
  const [category, setSelectedCategory] = useState('');
  const [location, setSelectedLocation] = useState('');
  const [confection, setSelectedConfection] = useState('');
  const [date, setDate] = useState('');

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
          onChangeText={onChangeText}
          placeholder='Insert the name'
          value={name}
        />
      </SafeAreaView>

      <View style={styles.picker}>
        <Picker
          style={styles.options}
          selectedValue={category}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
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
          onValueChange={(itemValue) => setSelectedLocation(itemValue)}
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
          onValueChange={(itemValue) => setSelectedConfection(itemValue)}
        >
          <Picker.Item label='Confection' value='' />
          <Picker.Item label='Fresh' value='Fresh' />
          <Picker.Item label='Canned' value='Canned' />
          <Picker.Item label='Frozen' value='Frozen' />
          <Picker.Item label='Cured' value='Cured' />
        </Picker>
      </View>

      <DatePicker
          date={date}
          mode='date'
          format='DD-MM-YYYY'
          minDate= {getToday()}
          maxDate='31-12-2041'
          confirmBtnText='Confirm'
          cancelBtnText='Cancel'
          onDateChange={(date) => {
            setDate(date);
          }}
      />

      <View style={styles.button}>
        <Button
          title='Insert product'
          onPress={() => addIngredient(name, category, location, confection, date)}
        />
      </View> 
    </View>
  );
}

const getToday = (today) => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return today = date + '-' + month + '-' +  year;
}

const addIngredient = (name, cat, loc, conf, date) => {
  if (name) {
    db.ref('/Ingredients').push({
      name: name,
      category: cat,
      location: loc,
      confection: conf,
      date: date
    });
  } else
  Alert.alert('The name of the product is mandatory');
}

function ExpiringScreen () {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.logo}>KITCHEN BUDDY</Text>
      <View style={styles.titleContainer}>
        <Text>EXPIRING INGREDIENTS:</Text>
        {console.log()}
      </View>
    </View>
  );
}

function getData (setList) { 
  var dbRef = db.ref('Ingredients/');
  let newList = [];
    dbRef.once('value').then((snapshot) => {
    snapshot.forEach((child) => {
      newList.push(child);
    });
    setList(newList);
  });
}

function ListScreen () {
  
  const[ingredients, setIngredients] = useState([]);
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.logo}>KITCHEN BUDDY</Text>
      <View style={styles.titleContainer}>
        <Text>AVAILABLE INGREDIENTS:</Text>
        <Button title="Get data" onPress={getData(setIngredients)}/>
        {console.log(ingredients)}
        <View style={styles.container}>
          <FlatList
            data={ingredients}
            renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
          />
        </View>
      </View>
    </View>
  );
}

export default function App() {

  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator>
          <Tab.Screen 
              name="Add Ingredients"
              component ={AddScreen}
              options={{title: 'Add ingredint'}} 
              initialParams={{}}/>
           <Tab.Screen 
              name="Expiring Ingredients"
              component ={ExpiringScreen}
              options={{title: 'Expiring soon'}} 
              initialParams={{}}/>
           <Tab.Screen 
              name="List Ingredients"
              component ={ListScreen}
              options={{title: 'List ingredient'}} 
              initialParams={{}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
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

  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});