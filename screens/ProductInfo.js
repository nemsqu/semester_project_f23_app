import { Reviews } from "../components/Reviews";
import { styles } from "../styles/Styles";
import { View, Text, Button, Pressable } from "react-native";
import { Views } from "../components/Views";
import { InfoButton, GOYButton } from "../components/InfoButton";
import { setScanned } from '../redux/actions';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { StarRatingDisplay } from 'react-native-star-rating-widget';


export function ProductInfo({ route}) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setScanned(false));
      }, []);

    const {data} = route.params;
    const product = data.product;

    return(
        <View style={styles.container}>
            <View style={{ flex: 1, marginHorizontal: 10, alignItems: 'center'}}>
                <Text style={styles.mainTitle}>{product.product}</Text>
                <Text style={styles.sectionTitle}>{product.brand ?? "Unknown"}</Text>
                <StarRatingDisplay rating={product.avgRating} starSize={30} />
                <Views views={product.views} />
                <View style={{ flex: 1.5, flexDirection: 'row'}}>
                    <InfoButton title={"Water usage"} content={product.info1} />
                    <InfoButton title={"Emissions"} content={product.info2} />
                </View>
                <View style={{ flex: 1.5, flexDirection: 'row', marginBottom: '10%'}}>
                    <InfoButton title={"Chemical usage"} content={product.info3}/>
                    <GOYButton link={product.link} />
                </View>
                <Reviews productId={product._id} reviews={data.reviews} />
            </View>
        </View>
    )
}
