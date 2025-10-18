import { Dimensions, DimensionValue, PixelRatio } from "react-native";

interface Params {
    low: DimensionValue;
    medium?: DimensionValue;
    high?: DimensionValue;
}

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

const widthPx = Math.round(width * pixelRatio);
const heightPx = Math.round(height * pixelRatio);

export const calcResolution = ({low, medium, high}:Params):DimensionValue => {
    // console.log({width:width})
    // console.log({widthPx, heightPx})
    if(!medium && !high) return low;
    const totalResolution = widthPx + heightPx;
    if(totalResolution <= 2420) return low;
    if(totalResolution <= 3580) return medium??low;
    return high??medium??low;
}