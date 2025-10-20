import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle, DimensionValue } from "react-native";

type Props = {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    style?: ViewStyle;
    duration?: number;
};

export const Skeleton = ({
    width = "100%",
    height = 16,
    borderRadius = 4,
    style,
    duration = 800,
}: Props) => {
  const anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(anim, { toValue: 1, duration: duration, useNativeDriver: true }),
                Animated.timing(anim, { toValue: 0.3, duration: duration, useNativeDriver: true }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [anim, duration]);

    const backgroundColor = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["#E6E6E6", "#cacacaff"],
    });

    return (
        <Animated.View
            style={[
                {width, height, borderRadius},
                styles.base,
                style,
                { backgroundColor },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    base: {
        overflow: "hidden",
    },
});
