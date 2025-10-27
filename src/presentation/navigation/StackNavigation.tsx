import { createStackNavigator, StackAnimationName } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { Search } from "../screens/Search";
import { SearchResults } from "../screens/SearchResults";

export type RootStackParamList = {
    Home: undefined;
    Search: {animationType?:StackAnimationName};
    SearchResults: {valueToSearch:string}
}

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="Home" component={Home} options={{animation:'fade'}} />
            <Stack.Screen 
                name="Search" 
                component={Search} 
                options={({route}) => ({
                    animation:route.params.animationType??'fade'
                })}
            />
            <Stack.Screen name="SearchResults" component={SearchResults} options={{animation:'slide_from_left'}} />
        </Stack.Navigator>
    )
}