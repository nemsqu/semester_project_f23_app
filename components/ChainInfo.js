import { Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function ChainInfo({name, onClick}){

    if(!name){
        name = "some name";
    }
    return(
        <TouchableOpacity onPress={() => onClick()} style={{paddingHorizontal: 5}}>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}