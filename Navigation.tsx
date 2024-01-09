import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Login from './screens/auth/Login';
import SignUp from './screens/auth/SignUp';
import Posts from './screens/posts/Posts';
import NewPost from './screens/posts/NewPost';
import Icon from "react-native-vector-icons/FontAwesome"

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? "blue" : ''
    },
    // headerTitle: {
    //     fontFamily: 'open-sans-bold'
    // },
    // headerBackTitleStyle: {
    //     fontFamily: 'open-sans'
    // },
    headerTintColor: Platform.OS === 'android' ? 'white' : "blue"
};
const BottomTabNavigator = createBottomTabNavigator();

export const BottomNavigator = () => {
    return (
        <BottomTabNavigator.Navigator
        screenOptions={{
            tabBarActiveTintColor: "blue"
            }}
        >
            <BottomTabNavigator.Screen
                name="Posts"
                component={Posts}
                options={{
                    headerShown: false ,
                    tabBarLabel: 'Posts',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" size={size} color={color} /> 
                    ),
                  }}
               
            />
            <BottomTabNavigator.Screen
                name="Add Post"
                component={NewPost}
                options={{
                    headerShown: false ,
                    tabBarLabel: 'Add Post',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="plus" size={size} color={color} /> 
                    ),
                  }}
            />

        </BottomTabNavigator.Navigator>
    );
};


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator
            screenOptions={defaultNavOptions}
        >
            <AuthStackNavigator.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />
        </AuthStackNavigator.Navigator>
    );
};