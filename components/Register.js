import React, { useContext } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeForm from './HomeForm';
import { login, register } from '../API';
import Context from './Context';
import { setItemAsync } from 'expo-secure-store';

function Register({navigation}) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [emailErr, setEmailErr] = useState({});
    const [passwordErr, setPasswordErr] = useState({});
    const [inputEmpty, setInputEmpty] = useState({});
    const { setToken } = useContext(Context);
    const onSubmit = (e)=>{
        e.preventDefault();
        const isValid = formValidation();
        if (isValid) {
            (async () => {
                let {code, status, message, data } = await register({email, password});
                if(code == "S_REGISTERED" && status == 200) {
                    ({code, status, message, data } = await login({email, password}));
                    if(code == "S_LOGGED" && status == 200) {
                        await setItemAsync('token', data.token);
                        setToken(data.token);
                    } 
                } 
            })() 
        }
    }
    const formValidation = () => {
        let emailErr = {};
        setEmailErr("");
        setPasswordErr("");
        setInputEmpty("");
        let passwordErr = {};
        let inputEmpty = {};
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
            passwordErr.passwordErrShort = 'Votre mot de passe de doit contenir au minimum 4 caractères !';
            setPasswordErr(passwordErr)
            return false;
        }
        return true
    }
    return (
        <View style={styles.container}>
            <HomeForm 
                onSubmit={onSubmit}
                state={{email,
                    setEmail,
                    password,
                    setPassword,
                    emailErr,
                    passwordErr,
                    inputEmpty
                    }} 
                title='INSCRIPTION' 
                message={{
                    first: "En appuyant sur je m'inscris et j'accepte, vous reconnaissez avoir lu notre ",
                    second: " Politique de confidentialité",
                    third: " et vous acceptez notres",
                    fourth: " Conditions d'utilisateur du service",
                    fifth: " ."
                }} 
                navigation={navigation}
                button="Je m'inscris et j'accepte" styles={styles}/>
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
    showPasswordRegister: {
        bottom:80
    }
});

export default Register;