import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Routes
import Login from './routes/Login';
import Passport from './routes/Passport';
import Services from './routes/Services';
import News from './routes/News';
import CertainNews from './routes/CertainNews';
import Reporter from './routes/Reporter';
import GiveCitizenship from './routes/GiveCitizenship';
import Voting from './routes/Voting';
import StartVoting from './routes/StartVoting';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
    </View>
  );
}



function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function showResident({ route, navigation }){

  console.log(route);
  const resident = JSON.parse(route.params.resident);
  return(
    <Text>{resident.Name}</Text>
  )
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen  name="Details" component={DetailsScreen} />
        <Stack.Screen options={{headerShown: false}} name="Passport" component={Passport} />
        <Stack.Screen name = "Services" component = {Services}/>
        <Stack.Screen name = "News" component = {News}/>
        <Stack.Screen name = "CertainNews" component = {CertainNews} />
        <Stack.Screen name = "Reporter" component = {Reporter} />
        <Stack.Screen name = "Give citizenship" component = {GiveCitizenship} />
        <Stack.Screen name = "Voting" component = {Voting} />
        <Stack.Screen name = "Start voting" component = {StartVoting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
