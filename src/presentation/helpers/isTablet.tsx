import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const isTablet = (Math.round(width) > 650 && Math.round(height) > 1000);