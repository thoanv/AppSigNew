import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './components/context';
import SignIn from './screens/Auth/SignIn';
import Tabs from './navigation/tabs';
import Splash from './screens/Splash';
import Detail from './screens/Detail';
import BookDetail from './screens/BookDetail';
import Notification from './screens/Notification';
import Profile from './screens/Profile';
import { GET_LOGIN, POST_LOGIN } from './screens/ultils/api'
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent'
  }
}
const Stack = createStackNavigator();
export default function App({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );
      React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
          try {
            userToken = await AsyncStorage.getItem('userToken');
          } catch (e) {
            // Restoring token failed
          }
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
      }, []);

      const authContext = React.useMemo(
          () => ({
             signIn: (data) => {
                let username = data.username;
                let password = data.password;
                let payload = `https://id.haiphatland.com.vn/api/password/gfyvhxnueb?username=${username}&pw=${password}`
                GET_LOGIN(`${payload}`).then(res => {
                  if(res.errors.errorCode === 0){
                     let email = res.userInfo.mail;
                     const filed = {
                        email : email,
                        username : username
                     };

                     let url = '/login.php';
                      POST_LOGIN(`${url}`, filed).then(response => {
                            if(response['success'] == 1){
                                AsyncStorage.setItem("userToken", response['token']);
                                dispatch({ type: 'SIGN_IN', token: response['token'] });
                            }
                         }).catch((error)=>{
                            console.log("Api call error");
                            alert(error.message);
                         });
                  }
                }).catch((error)=>{
                   console.log("Api call error");
                   alert(error.message);
                });

            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
            signUp: async (data) => {
              // In a production app, we need to send user data to server and get a token
              // We will also need to handle errors if sign up failed
              // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
              // In the example, we'll use a dummy token

              dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
          }),
          []
        );
    if (state.isLoading) {
      // We haven't finished checking for the token yet
      return <Splash />;
    }
  return (
  <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
          <Stack.Navigator>
             {state.userToken == null ? (
  //                <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false}}/>
                  <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false}}/>
             ) : (
                <>
                <Stack.Screen name="Tab" component={Tabs} options={{ headerShown: false}}/>
                <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false}}/>
                <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false}}/>
                <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false}}/>
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false}}/>
                </>
             )}
            </Stack.Navigator>
        </NavigationContainer>
    </AuthContext.Provider>
  );
}

