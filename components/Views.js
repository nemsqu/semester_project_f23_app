import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Text, View } from "react-native"

export const Views = ({views}) => {
    return(
        <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
            <Text style={{marginRight: 5, fontSize: 18}}>{views}</Text>
            <FontAwesomeIcon icon={faEye} size={20} />
        </View>
    )
}