import React, { useState } from 'react';
import { Button, CheckBox, Overlay } from '@rneui/themed';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles/Styles';

export function MessageOverlay({visible, setVisible, recipient}){
    const [text, setText] = useState("");
    const toggleOverlay = () => {
        setText("");
        setVisible(!visible);
    };


    return (
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '90%'}} >
            <Text style={styles.sectionTitle}>Send message</Text>
            <Text>Message to {recipient}</Text>
            <TextInput style={styles.inputField} multiline={true} onChangeText={setText} value={text} />
            <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button title="Cancel" onPress={toggleOverlay} color='grey' type='outline'/>
                <Button
                title="Send"
                onPress={toggleOverlay}
                buttonStyle={{marginRight: 5}}
                />
            </View>
          </Overlay>
      );
}

export function ReviewOverlay({visible, setVisible}){
    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false);
    const toggleOverlay = () => {
        setText("");
        setVisible(!visible);
    };


    return (
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '90%'}}>
            <Text style={styles.sectionTitle}>Add review</Text>
            <Text style={styles.maintext}>
              Welcome to React Native Elements
            </Text>
            <TextInput style={styles.inputField} multiline={true} onChangeText={setText} value={text} />
            <CheckBox checked={checked} title={"Allow others to contact me"} onPress={() => setChecked(!checked)} titleProps={{textAlign: 'left'}}/>
            <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button title="Cancel" onPress={toggleOverlay} color='grey' type='outline'/>
                <Button
                title="Send"
                onPress={toggleOverlay}
                buttonStyle={{marginRight: 5}}
                />
            </View>
          </Overlay>
      );
}