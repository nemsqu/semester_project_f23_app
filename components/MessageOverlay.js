import React, { useContext, useState } from 'react';
import { Button, CheckBox, Overlay } from '@rneui/themed';
import { Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/Styles';
import { Rating } from '@rneui/base';
import StarRating from 'react-native-star-rating-widget';
import { AuthContext } from '../Contexts';

export function MessageOverlay({visible, setVisible, recipient, recipientId}){
    const {user} = useContext(AuthContext);
    const [text, setText] = useState("");
    const toggleOverlay = () => {
        setText("");
        setVisible(!visible);
    };

    const sendMessage = () => {
      const inputs = {"sender": user._id, "receiver": recipientId, "senderName": user.name, "receiverName": recipient, "message": text};
      try{
        fetch("http://192.168.1.36:3000/api/messageChain/new", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(inputs),
      })
        .then(response => {
          return response.json()
        })
        .then(data => {toggleOverlay()});
      } catch (error){
        console.log(error)
      }
    }


    return (
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '90%'}} >
            <Text style={styles.sectionTitle}>Send message</Text>
            <Text>Message to {recipient}</Text>
            <TextInput style={styles.inputField} multiline={true} onChangeText={setText} value={text} />
            <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button title="Cancel" onPress={toggleOverlay} color='grey' titleStyle={{color: 'rgba(127, 220, 103, 1) '}} type='outline'/>
                <Button
                title="Send"
                onPress={sendMessage}
                buttonStyle={{marginRight: 5, backgroundColor: 'rgba(127, 220, 103, 1)' }}
                />
            </View>
          </Overlay>
      );
}

export function ReviewOverlay({visible, setVisible, productId}){
    const {user} = useContext(AuthContext);
    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState("");
    const toggleOverlay = () => {
        setText("");
        setChecked(false);
        setRating(0);
        setVisible(!visible);
    };

    const addReview = () => {
      const inputs = {
        "writerId": user._id,
        "writer": user.name,
        "allowContact": checked,
        "content": text,
        "rating": rating  
      }
      fetch("http://192.168.1.36:3000/api/product/" + productId + "/review", {
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify(inputs),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.error) {
                  setError(data.error);
                }else{
                    toggleOverlay();
                }
              })
    }

    return (
          <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{width: '90%'}}>
            <Pressable onPress={() => Keyboard.dismiss()}>
              <Text style={styles.sectionTitle}>Add review</Text>  
            </Pressable>
            <TextInput style={styles.inputField} multiline={true} onChangeText={setText} value={text} />
            <Pressable onPress={() => Keyboard.dismiss()}>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <Text>Rating: </Text>
                <StarRating
                  rating={rating}
                  onChange={setRating}
                />
              </View>
              <CheckBox checked={checked} title={"Allow others to contact me"} onPress={() => setChecked(!checked)} titleProps={{textAlign: 'left'}}/>
              <Text style={styles.error}>{error}</Text>
              <View style={{display: 'flex', flexDirection: 'row-reverse'}}>
                  <Button title="Cancel" onPress={toggleOverlay} color='grey' type='outline' titleStyle={{color: 'rgba(127, 220, 103, 1) '}}/>
                  <Button
                  title="Send"
                  onPress={addReview}
                  buttonStyle={{marginRight: 5, backgroundColor: 'rgba(127, 220, 103, 1) '}}
                  />
              </View>
            </Pressable>
          </Overlay>
      );
}