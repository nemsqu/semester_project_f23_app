import React, { useState } from 'react';
import { Button, CheckBox, Overlay } from '@rneui/themed';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles/Styles';

export function DeleteOverlay({visible, setVisible}){
    const toggleOverlay = () => {
        setVisible(!visible);
    };


    return (
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '90%'}} >
            <Text style={styles.sectionTitle}>Are you sure?</Text>
            <Text>This action will permanently remove your account and all related data.</Text>
            <View style={{display: 'flex', flexDirection: 'row-reverse', marginTop: 20}}>
                <Button title="Cancel" onPress={toggleOverlay} color='grey' type='outline'/>
                <Button
                title="Delete"
                onPress={toggleOverlay}
                buttonStyle={{marginRight: 5, backgroundColor: 'rgba(214, 61, 57, 1)'}}
                />
            </View>
          </Overlay>
      );
}