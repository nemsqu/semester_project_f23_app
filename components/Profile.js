import { Pressable, Text, TextInput, View } from "react-native"
import { styles } from "../styles/Styles"
import { Button } from "@rneui/themed"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { DeleteOverlay } from "./DeleteOverlay";
import { useUpdateUser } from "../Contexts";

export const Profile = () => {
    const [editable, setEditable] = useState(false);
    const [error, setError] = useState(null);
    const [deleteOverlayVisible, setDeleteOverlayVisible] = useState(false);
    const [name, setName] = useState("Default name");
    const [username, setUserName] = useState("Defaultemail@email.com");
    const [password, setPassword] = useState("default password");
    const [confirmPassword, setConfirmPassword] = useState("default password");
    const updateUser = useUpdateUser();

    const saveChanges = ( )=> {
        setError("");
        if(password === confirmPassword){
            setEditable(false);
        } else {
            setError("Passwords do not match")
        }
    }

    const deleteAccount = () => {
        setEditable(false);
    }

    return(
        <View>
            <Pressable disabled={!editable}>
                <FontAwesomeIcon icon={faCircleUser} size={80} style={{marginVertical: 10}} />
            </Pressable>
            <Text style={styles.sectionTitle}>Name</Text>
            <Text style={{marginBottom: 10}}>The name shown to other users</Text>
            <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                <TextInput style={{height: 25}} editable={editable}>first name last name</TextInput>
            </View>
            <Text style={styles.sectionTitle}>Username</Text>
            <Text style={{marginBottom: 10}}>Same as your email address</Text>
            <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                <TextInput style={{ height: 25}} editable={editable}>email@email.com</TextInput>
            </View>
            {editable ? 
            <View>
                <Text style={styles.sectionTitle}>Password</Text>
                <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                    <TextInput style={{ height: 25}} secureTextEntry={true} onChangeText={setPassword} value={password}/>
                </View>
                <Text style={styles.sectionTitle}>Confirm password</Text>
                <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                    <TextInput style={{ height: 25}} onChangeText={setConfirmPassword} value={confirmPassword}/>
                </View>
                <Text style={styles.error}>{error}</Text>
                <Button title={"Save"} style={{margin: 5, marginLeft: 0}} onPress={saveChanges}/>
                <Button title={"Delete my account"} style={{marginVertical: 5}} buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }} onPress={() => setDeleteOverlayVisible(true)} />
                <DeleteOverlay visible={deleteOverlayVisible} setVisible={setDeleteOverlayVisible} />
            </View>
             : 
            <View style={{flexDirection: 'row'}}>
                <Button title={"Edit"} style={{margin: 5, marginLeft: 0}} onPress={() => setEditable(true)}/>
                <Button title={"Logout"} style={{margin: 5}} onPress={logout}/>
            </View>}
        </View>
    )
}