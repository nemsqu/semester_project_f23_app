import { Text, View } from "react-native"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faStar  as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarReg, faStarHalfStroke } from "@fortawesome/free-regular-svg-icons"

export const Rating = () => {
    return(
        <View style={{flexDirection: 'row', marginBottom: 5}}>
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarSolid} />
            <FontAwesomeIcon icon={faStarHalfStroke} />
            <FontAwesomeIcon icon={faStarReg} />
        </View>
    )
}