import { StyleSheet, View } from "react-native";
import { getWidthPercentage } from "../helpers/calcPercentage";
import { Skeleton } from "./Skeletor";
import { isTablet } from "../helpers/isTablet";

export const ListImageSkeletor = () => {
    return (
        <View style={styles.container}>
            <View style={{width:getWidthPercentage(isTablet ? 50 : 100), padding: 10}}>
                <Skeleton 
                    width='100%'
                    height={400} 
                    borderRadius={30}
                />
            </View>
           <View style={{width:getWidthPercentage(isTablet ? 50 : 100), padding: 10}}>
                <Skeleton 
                    width='100%'
                    height={400} 
                    borderRadius={30}
                />
            </View>
             <View style={{width:getWidthPercentage(isTablet ? 50 : 100), padding: 10}}>
                <Skeleton 
                    width='100%'
                    height={400} 
                    borderRadius={30}
                />
            </View>
            <View style={{width:getWidthPercentage(isTablet ? 50 : 100), padding: 10}}>
                <Skeleton 
                    width='100%'
                    height={400} 
                    borderRadius={30}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: getWidthPercentage(7),
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: getWidthPercentage(15),
    }
});