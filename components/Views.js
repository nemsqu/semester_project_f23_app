import { faEye } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { Text, View } from "react-native"

export const Views = () => {
    return(
        <View style={{flexDirection: 'row'}}>
            <Text>36</Text>
            <FontAwesomeIcon icon={faEye} />
        </View>
    )
}