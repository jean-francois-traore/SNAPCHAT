import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Context from './Context';
import { deleteItemAsync } from 'expo-secure-store';
import { getSnaps, getSnap, postSeen } from '../API';

const Logout = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
        >
            <AntDesign
                style={styles.logout}
                name="logout"
                size={24}
                color="black"
            />
        </TouchableOpacity>
    )
}

const Received = (props) => {
    const { colorsArray } = useContext(Context);
    return (
        <TouchableOpacity style={{ ...styles.message, ...props.backgroundColor }}
            onPress={props.onPress}
        >
            <Avatar
                size="medium"
                rounded
                title={props.mail.slice(0, 1).toUpperCase()}
                backgroundColor={colorsArray[Math.floor(Math.random() * 50)]}
            />
            <Text style={styles.mail}>
                {props.mail}
            </Text>
            <Text style={styles.date}>
                {props.date}
            </Text>
            <View style={styles.recuRedView}>
                <Text style={styles.recuRed}>
                    {props.text}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

const Message = () => {
    const { setToken, token } = useContext(Context);
    const [snaps, setSnaps] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [duration, setDuration] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
   
    let handleRefresh = () => {
        const wait = (timeout) => {
            return new Promise(resolve => setTimeout(resolve, timeout));
        }

        setRefreshing(true);
        setSnaps(null);
        setImage(null);
        setDuration(null);

        wait(100).then(() => {
            setRefreshing(false);
        });
    }

    useEffect(() => {
        (async () => {
            if (!snaps) {
                let { code, message, status, data } = await getSnaps(token);
                if (code == "S_SNAPS" && status == 200) {
                    setSnaps(data.length ? data : null);
                }
                setError(message);
            }
        })();

        if(duration) {
            let interval = setInterval(() => {
                setDuration(duration - 1);
            }, 1000);

            return () => {
                clearInterval(interval);
                if(duration - 1 <= 0) {
                    handleRefresh();
                }
            }
        }
    })
    
    return (
        <View style={{...styles.container,  backgroundColor: !image ? "white" : "black"}}>
            {!image ? (
                <>
                    <Logout
                        onPress={
                            (async () => {
                                await deleteItemAsync('token');
                                setToken(null);
                            })
                        }
                    />

                    <ScrollView 
                        style={styles.scrollView}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />
                        }
                    >
                        {snaps ? snaps.map((value) => {
                            return <Received
                                        onPress={() => {
                                            const id = value._id;
                                            (async () => {
                                                if (value) {
                                                    let { code, message, status, data } = await getSnap(token, id, duration);
                                                    if (code == "S_SNAP" && status == 200) {
                                                        setDuration(data.duration);
                                                        setImage(data.image);
                                                        if (data.image) {
                                                            ({ code, message, status, data } = await postSeen(token, id));
                                                            // if (code == "S_DELETE_SNAP" && status == 200) {
                                                            //     // setTimeout(() => { setImage(null); setSnaps(null) }, theDuration * 1000);
                                                            // }
                                                        }
                                                    }
                                                    setError(message);
                                                }
                                            })()
                                        }}
                                        key={value._id}
                                        mail={value.from}
                                        date={value.createdAt}
                                        text={value.duration}
                                    />
                        }) : <View style={styles.snapNull}><Text style={styles.snapNull}>Aucun snap reçu 😢...</Text></View>}
                    </ScrollView>
                </>
            ):(
                <View style={{ ...styles.container, paddingTop: 0}}>
                    <Image style={styles.image}
                        source={{
                            uri: 'http://149.91.89.133:6088' + image.link,
                        }}
                        />
                        <Text style={styles.seconde}>
                            {duration}
                        </Text>
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: "#fff",
    },
    message: {
        padding: 13,
        borderColor: '#B4B4B4',
        borderBottomWidth: 0.2,
        flexDirection: "row",
    },
    mail: {
        marginTop: 3,
        marginLeft: 15,
        fontSize: 15,
        fontWeight: "bold",
    },
    date: {
        marginTop: "13%",
        marginLeft: "22.5%",
        position: "absolute",
    },
    recuRed: {
        textAlign: "center",
        color: "#fff",
    },
    recuRedView: {
        backgroundColor: "#E81044",
        height: 18,
        borderRadius: 5,
        position: "absolute",
        marginLeft: "94%",
        marginTop: 30,
        textAlign: "center",
        color: "#fff",
    },
    logout: {
        marginLeft: '86%',
    },
    image: {
        flex: 1,
        width: '100%',
    },
    snapNull: {
        flex: 1,
        fontSize: 22,
        textAlign: "center",
        width: '100%',
        height: '100%',
        paddingTop:'45%',

    },
    seconde: {
        textAlign: 'center',
        width: '10%',
        position: 'absolute',
        fontSize: 25,
        borderWidth: 5,
        borderRadius: 20,
        marginLeft: 175,
        marginTop: 10,
        color: 'white',
        borderColor: 'white',
    },
});

export default Message;