import { Text, TextInput, View } from "react-native"
import { styles } from "../styles/Styles"
import { Button } from "@rneui/themed"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Profile } from "../components/Profile";

export const Account = () => {
    const [error, setError] = useState(null);
    const [inputs, setInputs] = useState({name: "", password: ""});
    const [loggedIn, setLoggedIn] = useState(false);

    const login = () => {
        setLoggedIn(true);
    }
    const logout = () => {
        setLoggedIn(false);
    }

    /* const login = ( )=> {
        setError(null);
        fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(inputs),
          mode: 'cors'
      })
      .then((response) => response.json())
      .then((data) => {
          if(data.token) {
              localStorage.setItem("token", data.token);
              updateUser();
              window.location.href = '/';
          } else {
              if(data.error) {
                setError("Invalid credentials");
              } else {
                setError("Something went wrong.");
              }
          }
        })
    } */
    return(
        <View style={styles.container}>
            {loggedIn ? <Profile logout={logout} /> : <LoginForm login={login} error={error} />}
        </View>
    )
}

const LoginForm = ({login, error}) => {
    return(
        <View style={{width: "80%", alignItems: 'center'}}>
            <Text style={styles.sectionTitle}>Login</Text>
            <View style={{alignItems: 'flex-start', justifyContent: 'space-between', width: "80%"}}>
                <Text style={styles.maintext}>Username</Text>
                <TextInput style={styles.loginInput}></TextInput>
                <Text style={styles.maintext}>Password</Text>
                <TextInput style={styles.loginInput}></TextInput>
                <Text style={{color: 'red'}}>{error}</Text>
            </View>
            <Button title={"Login"} style={{margin: 10}} onPress={login}/>
            <Button title={"Forgot password?"} style={{marginTop: 10}} type="clear" />
            <Button title={"Create account"} type="clear" />
        </View>
    )
}

