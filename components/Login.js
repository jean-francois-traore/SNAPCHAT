import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { setItemAsync } from 'expo-secure-store';
import HomeForm from './HomeForm';
import Context from './Context';
import { login } from '../API';

function Login({navigation}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [inputEmpty, setInputEmpty] = useState({});
    const { setToken } = useContext(Context);

    let onSubmit = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid){
            (async () => {
                let { code, status, message, data } = await login({email, password});
                if(code == "S_LOGGED" && status == 200) {
                    await setItemAsync('token', data.token);
                    setToken(data.token);
                } else {
                    setError(message);
                }
            })()
        }
    }
    const formValidation = () => {
        let emailErr = {};
        let inputEmpty = {};
        let passwordErr = {};
        setEmailErr("");
        setPasswordErr("");
        setInputEmpty("");
        const regexEmail = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;

        if(!email && !password){
            inputEmpty.inputIsEmpty = 'Tous les champs doivent être complètés !'
            setInputEmpty(inputEmpty);
            return false;
        }
        if(regexEmail.test(email) == false){
            emailErr.emailErrNotValid = 'Adresse email invalide !';
            setEmailErr(emailErr);
            return false;
        }
        if(password && password.trim().length <= 4){
            passwordErr.passwordErrShort = 'votre mot de passe de doit contenir au minimum 4 caractères';
            setPasswordErr(passwordErr)
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>
            {error ? 
            <View>
                <Text style={{color: 'red'}}>{error}</Text>
            </View> : null }
            <HomeForm 
                onSubmit={onSubmit}
                state={{
                    email,
                    setEmail,
                    password,
                    setPassword,
                    emailErr,
                    passwordErr,
                    inputEmpty
                }}
                title='CONNEXION' 
                message={{
                    first: "Mot de passe oublié !",
                }} 
                button="Connexion" 
                styles={styles}
                navigation={navigation}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: "white"
    },
    link: {
        textAlign:'center',
        color:'lightskyblue'
    }
});

export default Login;