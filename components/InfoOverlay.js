import React from 'react';
import { Button, Overlay } from '@rneui/themed';
import { Text } from 'react-native';
import { styles } from '../styles/Styles';

export function InfoOverlay({visible, setVisible, content, title}){
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: "80%"}}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.maintext}>{content.length > 0 ? content : "No information has been provided for this product."}</Text>
          </Overlay>
      );
}