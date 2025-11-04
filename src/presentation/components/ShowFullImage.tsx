import Ionicons from "@react-native-vector-icons/ionicons";
import { Image, Modal, Pressable, StyleSheet, Text, ToastAndroid, useWindowDimensions, View } from "react-native";
import { ensureStoragePermission } from "../helpers/checkPremissions";
import ReactNativeBlobUtil from "react-native-blob-util";
import { useState } from "react";

interface Props {
    url: string;
    visible:boolean;
    close: () => void;
}
// https://www.youtube.com/watch?v=Ivtc7xPd_Uw
export const ShowFullImage = ({url, visible, close}:Props) => {
    const [ isDownloading, setIsDownloading ] = useState(false);
    const [ downloadProgress, setDownloadProgress ] = useState(0)
    const width = useWindowDimensions().width;

    const download = async () => {
        const checkPermissions = await ensureStoragePermission();
        if(!checkPermissions) return;

        let PictureDir = ReactNativeBlobUtil.fs.dirs.DownloadDir;
        console.log(PictureDir);
        const filePath = `${PictureDir}/download_image_${Date.now()}.jpg`; 
        console.log(filePath)
        ReactNativeBlobUtil.config({
            appendExt: "jpg",
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: filePath,
                description: 'Downloading image',
                mime:"image/jpg",
                mediaScannable: true
            }
        }).fetch('GET', url).progress({interval:100}, (received, total) => {
            let percentage = Math.floor((received / total)*100);
            setDownloadProgress(percentage);
        }).then((res) => {
            ToastAndroid.show("Imagen descargada success", ToastAndroid.SHORT);
        }).catch(error => {
            console.log("error", error)
        })
    }

    const copyMediaToStorage = async (filePath:string, fileName:string) => {
        try {
            await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
                {
                    name: fileName,
                    parentFolder: "searchimages",
                    mimeType: "image/jpg"
                },
                'Download',
                filePath
            )
            console.log()
        } catch (error) {
            
        }
    }
    return (
        <Modal visible={visible} transparent animationType='fade'>  
            <Pressable style={styles.container} onPress={() => close()}>
                <Pressable style={styles.boxImage}>
                    <Image 
                        source={{uri:url}}
                        style={{...styles.image, width:width, height:width}}
                    />
                    <View style={styles.boxBtnDownload}>
                        <Pressable
                            onPress={() => download()}
                            style={({pressed}) => [
                                styles.btnDownload,
                                {backgroundColor:pressed ? '#cfcfcfff' : '#fff',}
                            ]}
                        >
                            <Text>Descargar</Text>
                            <Ionicons name="download-outline" size={20} />
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    boxImage: {
        position: 'relative',
    },
    image: {
        objectFit: 'contain',
    },
    boxBtnDownload: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: 20,
    },
    btnDownload: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,

        shadowColor:"#757575",
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 7,
        elevation: 6
    }
})