import React from 'react';
import { Button, Overlay } from '@rneui/themed';
import { Text } from 'react-native';
import { styles } from '../styles/Styles';

export function InfoOverlay({visible, setVisible}){
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const title = "Title here";
    const bodyText = "Whatever information is needed will go here"

    return (
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.maintext}>{bodyText}</Text>
          </Overlay>
      );
}