// import 'expo-dev-client'
import  'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';




export default function App() {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
        <Stack.Navigator 
          initialRouteName = "FolderListScreen"
          headerMode="none"
          mode ="card"
          screenOptions={{
            // _setGestureState: "horizontal",
            // gestureDirection: "horizontal",
            gestureEnabled: true,
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
                overlayStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                  }),
                },
              };
            },
          }}
        >
           <Stack.Screen
            name='homeScreen' 
            component={HomeScreen}
            options={{headerShown: false
            }}
            
            />

           <Stack.Screen
            name='mapScreen' 
            component={MapScreen}
            options={{headerShown: false,
            }} 
            />
          </Stack.Navigator> 
          </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}


