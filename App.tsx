import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { StatusBar } from 'expo-status-bar';
import ManageExpenses from './screens/ManageExpenses';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './util/styles';

import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

const ExpensesOrverview = () => {
  return <BottomTabs.Navigator screenOptions={({navigation} ) => ({
    headerStyle: { backgroundColor: 'white' },
    headerTintColor: GlobalStyles.colors.primary400,
    tabBarStyle: { backgroundColor: 'white' },
    tabBarActiveTintColor: GlobalStyles.colors.primary700,
    headerRight: () => {
      return <IconButton
        icon={{ name: 'add', color: GlobalStyles.colors.primary800, size: 28 }}
        onPress={() => navigation.navigate("ManageExpenses")} />
    }
  })}>
    <BottomTabs.Screen name="RecentExpenses" component={RecentExpenses} options={{
      title: 'Recent Expenses',
      tabBarLabel: 'Recent',
      tabBarIcon: ({color, size}) => {
        return <Ionicons name='hourglass' size={size} color={color}/>
      }
    }}/>    
    <BottomTabs.Screen name="AllExpenses" component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All',
        tabBarIcon: ({color, size}) => {
          return <Ionicons name='calendar' size={size} color={color}/>
        }
    }}/>    
  </BottomTabs.Navigator>
}


export default function App() {
  return (
   
    <>
      
      <StatusBar style="auto" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
           headerStyle: { backgroundColor: 'white' },
            headerTintColor: GlobalStyles.colors.primary400,
        }}>
          <Stack.Screen name="ExpensesOrverview" component={ExpensesOrverview} options={{
            headerShown: false
          }}/>
          <Stack.Screen name="ManageExpenses" component={ManageExpenses} options={{
              presentation: 'modal'
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
     </>
      
   
  );
}

