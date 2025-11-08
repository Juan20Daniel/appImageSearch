import React from 'react';
import Ionicons from '@react-native-vector-icons/ionicons'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface Props {
    downloadProgress?: number;
    download: () => void;
}

export const BtnDownload = ({downloadProgress=0, download}:Props) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => download()}
                style={({pressed}) => [
                    styles.btnDownload,
                    {backgroundColor:pressed ? '#cfcfcfff' : '#fff',}
                ]}
            >
                <View style={{...styles.content, width: downloadProgress}} />
                <Text>{downloadProgress !== 0 ? 'Descargando...' : 'Descargar' }</Text>
                {downloadProgress !== 0
                    ?   <Ionicons name="download-outline" size={20} />
                    :   <Ionicons name="download-outline" size={20} />
                }
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: '5%',
    },
    btnDownload: {
        position: 'relative',
        borderRadius: 20,
        shadowColor:"#757575",
        paddingHorizontal: 20,
        backgroundColor:'#d2d2d2d2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        height: 40,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 6
    },
    content: {
        height: '100%',
        position:'absolute',
        borderRadius: 20,
        backgroundColor: '#ebebebd2',
        zIndex: 1
    },
});