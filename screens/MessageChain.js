import React, { useEffect, useState } from 'react';
import { Button, CheckBox, Overlay } from '@rneui/themed';
import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View, Platform } from 'react-native';
import { styles } from '../styles/Styles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPerson, faCircleUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const messages = [{"id": 1, "chainId": 1, "sender": "Jane Doe", "senderId": 1, "message": "ok", "photo": "null", "read": true},
{"id": 2, "chainId": 1,"sender": "Jane Doe", "senderId": 1, "message": "I don't know I mean it could work but it might not.", "photo": "asd", "read": false},
{"id": 3, "chainId": 1,"sender": "Jane Doe", "senderId": 2, "message": "ok", "photo": null, "read": false}]

export function MessageChain({navigation}){
    const [text, setText] = useState("");
    const loggedInUser = 1;
    const sendMessage = () => {
        messages.push({"id": 4, "chainId": 1,"sender": "Jane Doe", "senderId": 1, "message": text, "photo": null, "read": false})
        setText("");
    };

    useEffect(() => {
        navigation.setOptions({title: 'Jane Doe'}) //change to sender
    },[])

    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
            <ScrollView contentContainerStyle={{justifyContent: 'space-between', width: "100%"}}>
                {messages.map((message) => {
                    if(message.chainId === 1){
                        return(<Message key={message.id} sender={message.sender} message={message.message} photo={message.photo} loggedInUser={loggedInUser} senderId={message.senderId}/>)
                    }
                })}
            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignContent: 'baseline', height: 50, marginBottom: 10}}>
                <TextInput style={{borderWidth: 1, minHeight: 50, width: "80%", borderColor: 'black'}} multiline={true} onChangeText={setText} value={text} />
                <Pressable style={{justifyContent: 'center', marginLeft: 5}} onPress={sendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} size={25} />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

function Message({sender, message, photo, loggedInUser, senderId}){
    return(
        <View style={senderId === loggedInUser ? styles.sent : styles.received}>
            <View style={senderId === loggedInUser ? styles.sentMessage : styles.receivedMessage}>
                <Text >{message}</Text>
            </View>
        </View>
    )
}