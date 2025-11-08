import { useEffect, useRef, useState } from "react";
import { Image, Modal, Platform, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { ensureStoragePermission } from "../helpers/checkPremissions";
import ReactNativeBlobUtil from "react-native-blob-util";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { BtnDownload } from "./BtnDownload";
import { AlertTop } from "./AlertTop";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useAnimation } from "../hooks/useAnimation";
import { calcResolution } from "../helpers/calcResolutionDevice";

interface Props {
    url_small: string;
    url_full: string;
    visible:boolean;
    close: () => void;
}
export const ShowFullImage = ({url_small, url_full, visible, close}:Props) => {
    const [downloadProgress, setDownloadProgress] = useState(0);
    const { fadeOpatity, fadeIn, fadeOut } = useAnimation();
    const width = useWindowDimensions().width;
    const timeoutRef = useRef<number>(null);
    useEffect(() => {
        return () => {
            if(timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    },[]); 
    const activeAlertTop = () => {
        fadeIn({duration:300, toValue: 1, callback: () => {
            timeoutRef.current = setTimeout(() => {
                fadeOut({});
            }, 5000);
        }})
    };
    const download = async () => {
        const checkPermissions = await ensureStoragePermission();
        if(!checkPermissions) return;

        let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
        const fileName = `download_image_${Date.now()}.jpg`;
        const filePath = 
            Platform.OS === 'android' 
                ?   `${PictureDir}/${fileName}`
                :   `${ReactNativeBlobUtil.fs.dirs.DocumentDir}/${fileName}`; 
        console.log("filePath", filePath);
        ReactNativeBlobUtil.config({
            appendExt: "jpg",
            fileCache: true,
            path: filePath,
        })
        .fetch('GET', url_full)
        .progress({interval:300}, (received, total) => {
            const progress = Math.floor((received / total)*100);
            const progressPx = (progress / 100) * 200;
            setDownloadProgress(progressPx);
        })
        .then((res) => {
            copyMediaToStorage(res.path());
        })
        .catch(error => {
            console.log("error", error)
        });
    }

    const copyMediaToStorage = async (localPath:string) => {
        try {
            await CameraRoll.saveAsset(localPath);
            setDownloadProgress(0);
            activeAlertTop();
            if (Platform.OS === 'ios') await ReactNativeBlobUtil.fs.unlink(localPath);
        } catch (error) {
            console.log('Error al guardar en la galería:', error);
        }
    }
    return (
        <Modal visible={visible} transparent animationType='fade'>  
                <View style={styles.container}>
                <Pressable 
                    style={({pressed}) => [
                        styles.btnClose,
                        {opacity: pressed ? 0.6 : 1}
                    ]} 
                    onPress={close}
                >
                    <Ionicons name="close" size={Number(calcResolution({low:20, medium:30}))} color="#fff"/>
                </Pressable>
                {url_small !== '' &&
                    <Image 
                        source={{uri:url_small}}
                        style={{...styles.image, width:width, height:width}}
                    />
                }
                <BtnDownload download={download} downloadProgress={downloadProgress} />
                <AlertTop 
                    message="Imagen descargada"
                    opacity={fadeOpatity}
                    onClose={() => {
                        timeoutRef.current && clearTimeout(timeoutRef.current);
                        fadeOut({});
                    }}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    image: {
        objectFit: 'contain',
    },
    btnClose: {
        position: 'absolute',
        top: 72,
        right: 10,
        padding:7,
        borderRadius: '50%',
        zIndex: 5,
    }
})