import { View, Text, Button, Pressable, Linking } from "react-native";
import {useCallback} from 'react';
import { styles } from "../styles/Styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEarthEurope } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { InfoOverlay } from "./InfoOverlay";

export function InfoButton({title, content}){

    const [visible, setVisible] = useState(false);
    return(
        <Pressable style={styles.infoButton} onPress={() => setVisible(!visible)}>
            <FontAwesomeIcon icon={faEarthEurope} size={30} style={{paddingTop: '30%'}} />
            <Text style={{paddingBottom: '30%'}}>{title}</Text>
            <InfoOverlay visible={visible} setVisible={setVisible} content={content} title={title}/>
        </Pressable>
    )
}

export function GOYButton({link}){

    const openURL = useCallback(async () => {
        await Linking.openURL(link);
    });

    return(
        <Pressable style={styles.infoButton} onPress={() => openURL()}>
            <FontAwesomeIcon icon={faEarthEurope} size={30} style={{paddingTop: '30%'}} />
            <Text style={{paddingBottom: '30%', textAlign: 'center'}}>View brand on Good on You</Text>
        </Pressable>
    )
}