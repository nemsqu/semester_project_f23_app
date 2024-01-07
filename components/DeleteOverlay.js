import React, { useContext, useState } from 'react';
import { Button, CheckBox, Overlay } from '@rneui/themed';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles/Styles';
import { AuthContext } from '../Contexts';

export function DeleteOverlay({visible, setVisible}){
    const {user, setAuth} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const deleteUser = () => {
        try{
            fetch("http://192.168.1.36:3000/api/user/" + user._id + "/delete")
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    setError(data.error);
                } else {
                    setAuth(null);
                }
            })
        } catch{
            console.log("error")
        }
        setVisible(!visible);
    };


    return (
          <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)} overlayStyle={{width: '90%'}} >
            <Text style={styles.sectionTitle}>Are you sure?</Text>
            <Text>This action will permanently remove your account and all related data.</Text>
            <Text style={styles.error}>{error}</Text>
            <View style={{display: 'flex', flexDirection: 'row-reverse', marginTop: 20}}>
                <Button title="Cancel" titleStyle={{color: 'rgba(127, 220, 103, 1) '}} onPress={() => setVisible(!visible)} color='grey' type='outline'/>
                <Button
                title="Delete"
                onPress={deleteUser}
                buttonStyle={{marginRight: 5, backgroundColor: 'rgba(214, 61, 57, 1)'}}
                />
            </View>
          </Overlay>
      );
}