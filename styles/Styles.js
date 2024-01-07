import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      marginTop: 20,
      marginBottom: 5
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      marginVertical: 5,
      borderColor: 'rgba(78, 116, 289, 1)',
    },
    mainTitle: {
      fontWeight: 'bold', 
      marginBottom: 5, 
      fontSize: 30
    },
    sectionTitle: {
      fontWeight: 'bold', 
      marginBottom: 5, 
      fontSize: 20
    },
    infoButton: {
        margin: 10, 
        width: '40%',
        alignItems: 'center',
        flex: 1,
        borderRadius: 4,
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 5,
        height: 150
    },
    read: {
        margin: 5, 
        maxWidth: "70%"
    },
    unread: {
        margin: 5, 
        maxWidth: "70%",
        fontWeight: 'bold' 
    },
    sent: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        marginBottom: 5, 
        width: "90%", 
    }, 
    received: {
        flex: 1, 
        flexDirection: 'row', 
        marginBottom: 5, 
        width: "90%"
    },
    sentMessage: {
        textAlign: 'right',
        padding: 10, 
        borderRadius: 15, 
        minWidth: "20%", 
        maxWidth: "50%",
        backgroundColor: "rgba(18, 89, 255, 0.7)",
    },
    receivedMessage: {
        textAlign: 'left',
        padding: 10, 
        borderRadius: 15, 
        minWidth: "20%", 
        maxWidth: "50%",
        backgroundColor: "rgba(196, 199, 207, 0.8)"
    },
    loginInput: {
        borderWidth: 1, 
        width: "100%",
        height: 30,
        marginBottom: 5
    },
    error: {
        color: 'red'
    },
    profile: {
      marginTop: 100
    },
    editableProfile: {
      marginTop: 50
    }
  });