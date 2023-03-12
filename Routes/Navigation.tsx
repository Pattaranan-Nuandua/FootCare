import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

//Components
import Login from '../Components/Login';
import SplashScreen from '../Components/SplashScreen';
import Home from '../Components/Home';
import Signup from '../Components/Signup';
import Resetpassword from '../Components/ResetPass';
import Insole from '../Components/Insole';
import Active from '../Components/Active';
import ConnectBLE from '../Components/ConnectBLE';
import Heatmap from '../Components/Heatmap';
import History from '../Components/History';
import EditProfile from '../Components/EditProfile';
import Settings from '../Components/Settings';
import Privacy from '../Components/Privacy';

//Context
import TestProvider from '../Components/TestProvider';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const isLoggedIn = true;

export type RootStackParamList = {
    SplashScreen: undefined;
    BottomTabNavScreenGroup: undefined;
    Signup: undefined;
    Resetpassword: undefined;
    ConnectBLE: undefined;
    Heatmap: undefined;
    History: undefined;
    EditProfile: undefined;
    Privacy: undefined;
    testHM: undefined;
};

const BottomTabNavScreenGroup = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = '';
                    switch (route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Active':
                            iconName = 'man';
                            break;
                        case 'Insole':
                            iconName = 'analytics-outline';
                            break;
                        case 'Settings':
                            iconName = 'settings';
                            break;
                        case 'Logout':
                            iconName = 'ios-log-out-outline';
                            break;
                    }
                    return <Icon name={iconName} size={size} color='#00979C' />;
                },
            })}>
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Home"
                component={Home}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Active"
                component={Active}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Insole"
                component={Insole}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Settings"
                component={Settings}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Logout"
                component={Login}
            />
        </Tab.Navigator>
    )
}
const MainStackScreen = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 3000); // Delay for 3 seconds
    }, []);
    if (!isLoaded) {
        return (
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="SplashScreen"
                    component={SplashScreen}
                />
            </Stack.Navigator>
        );
    }
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Home"
                component={BottomTabNavScreenGroup}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Signup"
                component={Signup}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Resetpassword"
                component={Resetpassword}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="ConnectBLE"
                component={ConnectBLE}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Heatmap"
                component={Heatmap}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="History"
                component={History}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="EditProfile"
                component={EditProfile}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="Privacy"
                component={Privacy}
            />
        </Stack.Navigator>
    );
};

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <TestProvider>
            <NavigationContainer>
                {isLoggedIn ? (
                    <Stack.Navigator initialRouteName="BottomTabNavScreenGroup">
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="Signup"
                            component={Signup}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="Resetpassword"
                            component={Resetpassword}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="ConnectBLE"
                            component={ConnectBLE}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="Heatmap"
                            component={Heatmap}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="History"
                            component={History}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="EditProfile"
                            component={EditProfile}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="Privacy"
                            component={Privacy}
                        />
                    </Stack.Navigator>
                ) : (
                    <Stack.Navigator initialRouteName="SplashScreen">
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="SplashScreen"
                            component={SplashScreen}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="Login"
                            component={Login}
                        />
                        <Stack.Screen
                            options={{
                                headerShown: false,
                            }}
                            name="BottomTabNavScreenGroup"
                            component={BottomTabNavScreenGroup}
                        />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </TestProvider>
    );
};


export default Navigation;