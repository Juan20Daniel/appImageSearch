import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, Pressable } from 'react-native';
import { RootStackParamList } from '../navigation/StackNavigation';
import { calcResolution } from '../helpers/calcResolutionDevice';

interface Props {
    action: () => void;
}

export const BtnGoBack = ({action}:Props) => {
    return (
        <Pressable 
            onPress={() => action()} 
            style={({pressed}) => [{
                justifyContent: 'center',
                opacity: pressed ? 0.5 : 1
            }]}
        >
            <Image 
                source={require('../../../assets/iconBack.png')}
                style={{
                    width: calcResolution({low: 25, medium:30}), 
                    height: calcResolution({low: 15, medium:20})
                }}
            />
        </Pressable>      
    );
}