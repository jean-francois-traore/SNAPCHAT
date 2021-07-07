import React, { useState } from 'react';
import { Entypo } from '@expo/vector-icons'; 
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import ReturnNavigationIos from './ReturnNavigationIos';

    
    function HomeForm(props) {
        const isIos = Platform.OS == 'ios' ? <ReturnNavigationIos navigation={props.navigation}/> : false;
        const [showPassword, setShowPassword] = useState(true);
        function ChowPassword(){
            if(showPassword)
            {
                setShowPassword(false)
            }
            else{
                setShowPassword(true)
            }
            
        }

    return (
        <View style={styles.container}>
            <Text style={styles.returnNavigationIos}>{isIos}</Text>
            <View style={styles.textImput}>
                <Text style={styles.title}>{props.title}</Text>
                {Object.keys(props.state.inputEmpty).map((key)=>{
                    return <Text style={{color : "red", marginLeft: 10, paddingBottom: 5}}>{props.state.inputEmpty[key]}</Text>
                })}
                <Text style={styles.text}>EMAIL</Text>
                <TextInput
                    style={styles.input}
                    value={props.state.email}
                    onChange={(e)=>{props.state.setEmail(e.nativeEvent.text)}}
                />
                {Object.keys(props.state.emailErr).map((key)=>{
                    return <Text style={{color : "red", marginLeft: 10, paddingBottom: 5}}>{props.state.emailErr[key]}</Text>
                })}
                <Text style={styles.text}>MOT DE PASSE</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={showPassword}
                    value={props.state.password}
                    onChange={(e)=>{props.state.setPassword(e.nativeEvent.text)}}
                />
                <TouchableOpacity onPress={ChowPassword} style={{...styles.showPassword, ...props.styles.showPasswordRegister}}>
                    <Entypo name={showPassword == true ? "eye" : "eye-with-line"} size={24} color="lightgrey" style={styles.password} />
                    </TouchableOpacity>
                    <Text style={{...styles.textB, ...props.styles.link}}>
                    <Text>{props.message.first}</Text>
                    <Text style={styles.link}>{props.message.second}</Text>
                    <Text>{props.message.third}</Text>
                    <Text style={styles.link}>{props.message.fourth}</Text>
                    <Text>{props.message.fifth}</Text>
                    </Text>
                    {Object.keys(props.state.passwordErr).map((key)=>{
                        return <Text style={{color : "red", marginLeft: 10, paddingTop: "90%", position: "absolute"}}>{props.state.passwordErr[key]}</Text>
                    })}
                    </View>
            <View>
                <TouchableOpacity onPress={props.onSubmit} style={styles.Button}>
                    <Text style={styles.textButton}>{props.button}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white"
    },
    input: {
        borderWidth: 1,
        borderBottomColor: 'lightgrey',
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
        borderTopColor: "transparent",
        borderColor:'black',
        width:340,
        padding:10,
        margin:10
    },
    text: {
        marginLeft: 10,
        color:'lightgrey'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        padding:10,
        marginBottom:20,
        // fontFamily:'sans-serif'
    },
    textB: {
        width:340,
        marginLeft: 10,
    },
    textImput: {
        justifyContent:'center',
        bottom: 100,
        backgroundColor:'white'
        
    },
    Button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        backgroundColor: 'lightgrey',
        padding:15,
        top:250,
        width:250,
        borderRadius: 30
    },
    textButton: {
        color:'white',
        fontSize: 18,
    },
    link: {
        color:'lightskyblue'
    },
    returnNavigationIos: {
        color:'lightskyblue',
        position:'absolute',
        top:40,
        left:0,
    },
    showPassword: {
        width:25,
        position:'absolute',
        right:10,
        bottom:28,
    }
});
export default HomeForm;