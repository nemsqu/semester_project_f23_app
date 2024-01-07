import { Text, TextInput, View } from "react-native";
import { styles } from "../styles/Styles";
import { Button } from "@rneui/themed";
import { useState } from "react";

export const CreateAccount = ({ navigation}) => {
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const create = () => {
        if(name.length < 1 || email.length < 1 || password.length < 1 || confirmPassword.length < 1){
            setError("All fields are mandatory.");
        }
        else if(password !== confirmPassword){
            setError("Passwords do not match.");
        } else {
            setError('');
            const inputs = {"name": name, "email": email, "password": password};
            fetch("http://192.168.1.36:3000/api/user/register", {
                method: "POST",
                headers: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify(inputs),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.emailError) {
                  setError(data.emailError);
                }else if(data.passwordError){
                  setError(data.passwordError);
                }else if(data.uniqueError){
                  setError(data.uniqueError);
                }else {
                    navigation.navigate('AccountStart');
                }
              })
        }
    }
    return(
        <View style={styles.container}>
            <View style={{width: "80%", alignItems: 'center'}}>
                <Text style={styles.sectionTitle}>Create account</Text>
                <View style={{alignItems: 'flex-start', justifyContent: 'space-between', width: "80%"}}>
                    <Text style={styles.maintext}>Name</Text>
                    <TextInput style={styles.loginInput} onChangeText={setName} value={name}></TextInput>
                    <Text style={styles.maintext}>Email</Text>
                    <TextInput style={styles.loginInput} onChangeText={setEmail} value={email}></TextInput>
                    <Text style={styles.maintext}>Password</Text>
                    <TextInput style={styles.loginInput } secureTextEntry={true} onChangeText={setPassword} value={password}></TextInput>
                    <Text style={styles.maintext}>Confirm password</Text>
                    <TextInput style={styles.loginInput } secureTextEntry={true} onChangeText={setConfirmPassword} value={confirmPassword}></TextInput>
                    <Text style={{color: 'red'}}>{error}</Text>
                </View>
                <Button title={"Create account"} style={{margin: 10}} onPress={create}/>
            </View>
        </View>
    )
}
