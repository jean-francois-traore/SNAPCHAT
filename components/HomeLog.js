import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text,Image} from 'react-native';

const Button= (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{...stylesBtn.btnBody, ...props.backgroundColor}}
        >
            <Text style={stylesBtn.btnText}>
                {props.children}
            </Text>
        </TouchableOpacity>
    )
}
const stylesBtn = StyleSheet.create({
    btnBody: {
        backgroundColor: '#E81044',
        width: '100%',
        padding: '7%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 25,
        textTransform: 'uppercase',
    }
    
});

const HomeLog = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
            style={styles.logo}
            source={require('../assets/snapchat.png')}
            />
            <View style={styles.btnBottom}>
                <Button onPress={() => navigation.navigate('Login')}>Connexion</Button>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    backgroundColor={{
                        backgroundColor: '#0CADEC',
                    }}
                >
                    S'inscrire
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnBottom: {
        position: "absolute",
        bottom: 0,
        width: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffC00',
        width: '100%',
    },
    logo: {
        width: 120,
        height: 120,
        bottom: 150,
    }
});

export default HomeLog;