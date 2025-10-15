import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { Search } from "../screens/Search";

export type RootStackParamList = {
    Home: undefined;
    Search: undefined;
}

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
    )
}