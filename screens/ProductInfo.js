import { Reviews } from "../components/Reviews";
import { styles } from "../styles/Styles";
import { View, Text, Button, Pressable } from "react-native";
import { Rating } from "../components/Rating";
import { Views } from "../components/Views";
import { InfoButton } from "../components/InfoButton";


export function ProductInfo() {
    return(
        <View style={{ flex: 1, marginHorizontal: 10, alignItems: 'center'}}>
            <Text style={styles.mainTitle}>Product name</Text>
            <Text style={styles.sectionTitle}>Brand</Text>
            <Rating />
            <Views />
            <View style={{ flex: 1.5, flexDirection: 'row'}}>
                <InfoButton />
                <InfoButton />
            </View>
            <View style={{ flex: 1.5, flexDirection: 'row', marginBottom: '10%'}}>
                <InfoButton />
                <InfoButton />
            </View>
            <Reviews />
        </View>
    )
}
