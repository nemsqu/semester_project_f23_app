import { Text, TextInput, View } from "react-native"
import { styles } from "../styles/Styles"
import { Button } from "@rneui/themed"
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "../components/Profile";
import { useUpdateUser } from "../Contexts";
import bcrypt from 'bcryptjs';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../Contexts";

export const Account = ({navigation}) => {
    const { setAuth, auth, user } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);



    const login = () => {
        setError(null);
        const inputs = {"email": email, "password": password};
        fetch("http://192.168.1.36:3000/api/user/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(inputs),
          mode: 'cors'
      })
      .then((response) => response.json())
      .then(async (data) => {
          if(data.token) {
              setAuth({"email": email, "token": data.token});
              setEmail(null);
              setPassword(null);
          } else {
              if(data.error) {
                setError("Invalid credentials");
              } else {
                setError("Something went wrong.");
              }
          }
        })
    }


    return(
        <View style={styles.container}>
            {user ? <Profile /> : <LoginForm login={login} error={error} email={email} setEmail={setEmail} password={password} setPassword={setPassword} navigation={navigation}/>}
        </View>
    )
}

const LoginForm = ({login, error, email, setEmail, password, setPassword, navigation}) => {
    return(
        <View style={{width: "80%", alignItems: 'center'}}>
            <Text style={styles.sectionTitle}>Login</Text>
            <View style={{alignItems: 'flex-start', justifyContent: 'space-between', width: "80%"}}>
                <Text style={styles.maintext}>Email</Text>
                <TextInput style={styles.loginInput} onChangeText={setEmail} value={email}></TextInput>
                <Text style={styles.maintext}>Password</Text>
                <TextInput style={styles.loginInput } secureTextEntry={true} onChangeText={setPassword} value={password}></TextInput>
                <Text style={{color: 'red'}}>{error}</Text>
            </View>
            <Button title={"Login"} style={{margin: 10}} onPress={login}/>
            <Button title={"Create account"} type="clear" onPress={() => navigation.navigate('Create')} />
        </View>
    )
}

