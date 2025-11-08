import { useRef } from "react";
import { Animated } from "react-native";

export const useAnimation = () => {
    const fadeOpatity = useRef(new Animated.Value(0)).current;

    const fadeIn = ({duration=300, toValue=1, callback= () => {}}) => {
        Animated.timing(fadeOpatity, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: true,
        }).start(callback);
    };

    const fadeOut = ({duration=300, toValue=0, callback= () => {}}) => {
        Animated.timing(fadeOpatity, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: true,
        }).start(callback);
    }

    return {
        fadeOpatity,
        fadeIn,
        fadeOut
    }
}