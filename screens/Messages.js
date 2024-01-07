import { Pressable, ScrollView, Text, View } from "react-native"
import { styles } from "../styles/Styles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPerson, faCircleUser, faRefresh } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../Contexts"


export function Messages({navigation}){
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [messageChains, setMessageChains] = useState([]);
    const [finalMessages, setFinalMessages] = useState([]);

    const fetchMessages = () => {
        fetch("http://192.168.1.36:3000/api/user/messages/" + user._id)
            .then(response => response.json())
            .then(data => {
                if(!data.error){
                    setMessageChains(data.chains);
                    setMessages(data.messages);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(()=> {
        fetchMessages();
    },[])

    useEffect(() => {
        if(messageChains){
            let msgChains = [];
            messageChains.forEach((messageChain) => {
                msgChains.push({"id": messageChain._id, "sender": messageChain.sender, "receiverName": messageChain.receiverName, "senderName": messageChain.senderName, "receiver": messageChain.receiver, "messages": []});
            })
            messages.map((message) => {
                const index = msgChains.findIndex((x) => x.id === message.chainId);
                msgChains[index].messages.push(message);
            })
            setFinalMessages(msgChains.reverse());
        }
    }, [messages])

    return(
        <View style={styles.container}>
            <View style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'row', alignItems: 'flex-end', width: "100%"}}>
                <Pressable style={{marginHorizontal: 10, marginTop: 10}} onPress={fetchMessages}>
                    <FontAwesomeIcon icon={faRefresh} size={25}/>
                </Pressable>
            </View>
            <ScrollView style={{width: "90%", paddingBottom: 50}}>
                {finalMessages ? finalMessages.map((chain) => {
                    return(<Message key={chain.id} chain={chain} navigation={navigation} user={user} />)
                }) : <Text>No messages yet.</Text>}
            </ScrollView>
        </View>
    )
}

function Message({chain, navigation, user}){
    const lastMessageSent = chain.messages[chain.messages.length-1].sender === user._id;
    const lastMessageRead = chain.messages[chain.messages.length-1].read;
    const read = lastMessageSent || lastMessageRead;
    const recipient = chain.sender === user._id ? chain.receiverName : chain.senderName;
    const recipientId = chain.sender === user._id ? chain.receiver : chain.sender;

    const openMessage = () => {
        navigation.navigate('MessageChain', {messages: chain.messages, sender: recipient, senderId: recipientId, chainId: chain.id});
    }


    
    return(
        <View>
            <Pressable style={{borderColor: 'black', borderBottomWidth: 1, justifyContent: 'space-between', marginVertical: 5, padding: 5, height: 50}} onPress={openMessage}>
                <View style={{flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', marginBottom: 5, width: "90%", alignItems: 'center'}}>
                    <Text style={read ? styles.read : styles.unread} numberOfLines={1}>{recipient}</Text>
                    <Text style={read ? styles.read : styles.unread} numberOfLines={1} ellipsizeMode="tail">{chain.messages[chain.messages.length-1].message}</Text>
                </View>
            </Pressable>
        </View>
    )
}