import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import { styles } from "../styles/Styles"
import { Button } from "@rneui/themed"
import { useContext, useState } from "react";
import { DeleteOverlay } from "./DeleteOverlay";
import { AuthContext } from "../Contexts";

export const Profile = () => {
    const { user, setAuth } = useContext(AuthContext);
    const [editable, setEditable] = useState(false);
    const [error, setError] = useState(null);
    const [deleteOverlayVisible, setDeleteOverlayVisible] = useState(false);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const saveChanges = ( )=> {
        setError("");
        if(password !== confirmPassword){
            setError("Passwords do not match")
        } else {
            const inputs = {"name": name, "email": email, "currentPassword": currentPassword, "password": password};
            fetch("http://192.168.1.36:3000/api/user/" + user._id + "/edit", {
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
                }else {
                    setAuth(data.token);
                    setCurrentPassword("");
                    setPassword("");
                    setConfirmPassword("");
                    setEditable(false); 
                }
              })
        }
    }

    const cancelEdit = () => {
        setName(user.name);
        setEmail(user.email);
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
        setEditable(false);
    }

    const logout = () => {
        setAuth(null);
    }

    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
            <ScrollView style={editable ? styles.editableProfile : styles.profile}>
                <Text style={styles.sectionTitle}>Name</Text>
                <Text style={{marginBottom: 10}}>The name shown to other users</Text>
                <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                    <TextInput style={{height: 25}} editable={editable} onChangeText={setName} value={name}/>
                </View>
                <Text style={styles.sectionTitle}>Email</Text>
                <Text style={{marginBottom: 10}}>Your email will not be shown to other users</Text>
                <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                    <TextInput style={{ height: 25}} editable={editable} onChangeText={setEmail} value={email}/>
                </View>
                {editable ? 
                <View>
                    <Text style={styles.sectionTitle}>Current password</Text>
                    <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                        <TextInput style={{ height: 25}} secureTextEntry={true} onChangeText={setCurrentPassword} value={currentPassword}/>
                    </View>
                    <Text style={styles.sectionTitle}>New password</Text>
                    <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                        <TextInput style={{ height: 25}} secureTextEntry={true} onChangeText={setPassword} value={password}/>
                    </View>
                    <Text style={styles.sectionTitle}>Confirm new password</Text>
                    <View style={{marginVertical: 10, borderColor: 'black', borderBottomWidth: 1}}>
                        <TextInput style={{ height: 25}} secureTextEntry={true} onChangeText={setConfirmPassword} value={confirmPassword}/>
                    </View>
                    <Text style={styles.error}>{error}</Text>
                    <Button title={"Save"} style={{margin: 5, marginLeft: 0}} onPress={saveChanges} buttonStyle={{backgroundColor: 'rgba(127, 220, 103, 1) '}}/>
                    <Button title={"Cancel"} titleStyle={{color: 'rgba(127, 220, 103, 1) '}} style={{margin: 5, marginLeft: 0 }} onPress={cancelEdit} type="outline"  buttonStyle={{borderColor: 'rgba(127, 220, 103, 1) '}}/>
                    <Button title={"Delete my account"} style={{marginVertical: 5}} buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }} onPress={() => setDeleteOverlayVisible(true)} />
                    <DeleteOverlay visible={deleteOverlayVisible} setVisible={setDeleteOverlayVisible} />
                </View>
                : 
                <View style={{flexDirection: 'row'}}>
                    <Button title={"Edit"} style={{margin: 5, marginLeft: 0}} onPress={() => setEditable(true)} buttonStyle={{backgroundColor: 'rgba(127, 220, 103, 1) '}}/>
                    <Button title={"Logout"} style={{margin: 5}} onPress={logout} type="outline" buttonStyle={{borderColor: 'rgba(127, 220, 103, 1) '}} titleStyle={{color: 'rgba(127, 220, 103, 1) '}} />
                </View>}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}