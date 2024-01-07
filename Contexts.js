//following the example from: https://courses.bigbinaryacademy.com/learn-react-native/handling-authentication-state-in-react-native/

import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuthState] = useState(null);
  const [user, setUser] = useState(null);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      const authDataString = await AsyncStorage.getItem("token");
      //const authData = JSON.parse(authDataString || {});
      setAuthState(authDataString);
    } catch (err) {
      setAuthState(null);
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth) => {
    try {
        if(auth !== null){
            await AsyncStorage.setItem("token", JSON.stringify(auth));
            setAuthState(JSON.stringify(auth));
            updateData();
        } else {
            await AsyncStorage.removeItem("token");
            setAuthState(null);
            setUser(null);
        }
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  async function updateData(){
    if(auth){
        const token = JSON.parse(auth);
        if(token){
            const userName = token.email;
            try{
                fetch("http://192.168.1.36:3000/api/user/" + userName)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                })
            } catch{
                console.log("error")
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }
    else {
        setUser(null);
    }
}

  useEffect(() => {
    updateData();
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

/* export const AuthContext = createContext(); //context to keep values
export const AuthContextDispatch = createContext(); //context for functions that modify values


export function AuthContextProvider({ children }){

    const [user, setUser] = useState(null);

    const updateUser = async () => {
        const token = await AsyncStorage.getItem("token");
        if(token){
            const userName = jwt_decode(token).name;
            fetch("/users/api/" + userName)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                })
        } else {
            setUser(null);
        }
    }

    //provide a way for other components to access methods and values
    return (
        <AuthContextDispatch.Provider value={updateUser}>
            <AuthContext.Provider value={user}>
                {children}
            </AuthContext.Provider>
        </AuthContextDispatch.Provider>
    );
};


//provide user to all the components
export function useUser() {
    const user = useContext(AuthContext);
    return user;
};

//provide update user function to all the components
export function useUpdateUser() {
    const updateUser = useContext(AuthContextDispatch);
    return updateUser;
} */