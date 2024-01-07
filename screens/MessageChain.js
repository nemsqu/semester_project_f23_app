import React, { useContext, useEffect, useState } from 'react';
import { Button, CheckBox, Overlay } from '@rneui/themed';
import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View, Platform } from 'react-native';
import { styles } from '../styles/Styles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPerson, faCircleUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from '../Contexts';

export function MessageChain({navigation, route}){
    const {user} = useContext(AuthContext);
    const [text, setText] = useState("");
    const {messages, sender, senderId, chainId} = route.params;
    const [messagesState, setMessagesState] = useState(messages);

    const sendMessage = () => {
        const inputs = {"message": text, "sender": user._id, "senderName": user.name, "receiver": senderId, "receiverName": sender, "chainId": chainId}
        try{
            fetch("http://192.168.1.36:3000/api/message/new", {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify(inputs),
          })
            .then(response => {
              return response.json()
            })
            .then((data) => {
                setMessagesState([...messagesState, data.message])
            });
          } catch (error){
            console.log(error)
          }
        setText("");
    };

    useEffect(() => {
        navigation.setOptions({title: sender}) //change to sender
    },[])

    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
            <ScrollView contentContainerStyle={{justifyContent: 'space-between', width: "100%"}}>
                {messagesState.map((message) => {
                        return(<Message key={message._id} sender={message.sender} message={message.message} user={user}/>)
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

function Message({sender, message, user}){

    return(
        <View style={sender === user._id ? styles.sent : styles.received}>
            <View style={sender === user._id ? styles.sentMessage : styles.receivedMessage}>
                <Text >{message}</Text>
            </View>
        </View>
    )
}