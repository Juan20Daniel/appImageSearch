import { Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/StackNavigation';

interface Props extends StackScreenProps<RootStackParamList, 'SearchResults'>{}

export const SearchResults = ({route}:Props) => {
    const { valueToSearch } = route.params;
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{valueToSearch}</Text>
        </View>
    );
}
