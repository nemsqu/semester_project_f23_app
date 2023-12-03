import { Pressable, ScrollView, Text, View } from "react-native"
import { styles } from "../styles/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPerson, faCircleUser } from "@fortawesome/free-solid-svg-icons"

const messages = [{"id": 1, "sender": "Jane Doe", "message": "ok", "photo": "null", "read": true},
{"id": 2, "sender": "Jane Doe", "message": "I don't know I mean it could work but it might not.", "photo": "asd", "read": false},
{"id": 3, "sender": "Jane Doe", "message": "ok", "photo": null, "read": false}]

export function Messages({navigation}){
    return(
        <View style={styles.container}>
            <ScrollView style={{width: "90%"}}>
                {messages.map((message) => {
                    return(<Message key={message.id} sender={message.sender} message={message.message} photo={message.photo} read={message.read} navigation={navigation} />)
                })}
            </ScrollView>
        </View>
    )
}

function Message({photo, sender, message, read, navigation}){
    const openMessage = () => {
        navigation.setOptions({title: 'Messages'})
        navigation.navigate('MessageChain');
    }
    
    return(
        <View>
            <Pressable style={{borderColor: 'black', borderBottomWidth: 1, justifyContent: 'space-between', marginVertical: 5, padding: 5, minHeight: "40%"}} onPress={openMessage}>
                <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', marginBottom: 5, width: "90%", alignItems: 'center'}}>
                    {photo ? <FontAwesomeIcon icon={faPerson} size={30} style={{marginRight: 10}} /> : <FontAwesomeIcon icon={faCircleUser} size={30} style={{ marginRight: 10}} />}
                    <Text style={read ? styles.read : styles.unread} numberOfLines={1}>{sender}</Text>
                    <Text style={read ? styles.read : styles.unread} numberOfLines={1} ellipsizeMode="tail">{message}</Text>
                </View>
            </Pressable>
        </View>
    )
}