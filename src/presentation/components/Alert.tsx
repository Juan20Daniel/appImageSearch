import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { getWidthPercentage } from '../helpers/calcPercentage';
import { isTablet } from '../helpers/isTablet';

interface Props {
    visible: boolean;
    title: string;
    message: string;
    closeModal: () => void;
}

export const Alert = ({visible, title, message, closeModal}:Props) => {
    return (
        <Modal visible={visible} transparent>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.boxBtn}>
                        <Pressable 
                            onPress={() => closeModal()} 
                            style={({pressed}) => [
                                styles.btn,
                                {backgroundColor:pressed ? '#636363ff' : '#000000'}
                            ]}
                        >
                            <Text style={styles.btnText}>Ok</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.23)'
    },
    content: {
        width: getWidthPercentage(isTablet ? 70 : 90),
        maxWidth: 500,
        backgroundColor: '#ffffff',
        borderRadius: 30,
        padding: 30,
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: isTablet ? 25 : 20,
        marginBottom: 10
    }, 
    message: {
        fontFamily: 'Roboto-Light',
        fontSize: isTablet ? 20 : 17,
        marginBottom: 25
    },
    boxBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 20 
    },
    btnText: {
        color: '#ffffff',
        fontFamily: 'Roboto-Light',
        fontSize: 18
    }
});