import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    marginHorizontal?: number;
    paddingHorizontal?: number; 
    children: React.ReactNode;
}

export const Container = ({marginHorizontal, paddingHorizontal, children}:Props) => {
    const { top } = useSafeAreaInsets();
    return (
        <View style={{flex:1, paddingTop:top, marginHorizontal, paddingHorizontal, backgroundColor:'white'}}>
            {children}
        </View>
    );
}
