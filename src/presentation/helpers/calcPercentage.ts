import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const getWidthPercentage = (percentage:number) => (width * percentage) / 100;
export const getHeightPercentage = (percentage:number) => (height * percentage) / 100;