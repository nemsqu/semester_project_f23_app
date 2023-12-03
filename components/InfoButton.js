import { View, Text, Button, Pressable } from "react-native";
import { styles } from "../styles/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { InfoOverlay } from "./InfoOverlay";

export function InfoButton(){

    const [visible, setVisible] = useState(false);
    return(
        <Pressable style={styles.infoButton} onPress={() => setVisible(!visible)}>
            <FontAwesomeIcon icon={faEarthEurope} size={30} style={{paddingTop: '30%'}} />
            <Text style={{paddingBottom: '30%'}}>Some info</Text>
            <InfoOverlay visible={visible} setVisible={setVisible} />
        </Pressable>
    )
}