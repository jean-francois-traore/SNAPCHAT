import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Picker, FlatList, RefreshControl } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { Avatar } from 'react-native-elements';
import { getUsers, postSnap } from "../API";

export default function ({ visible, setVisible, photo, setPhoto, token, colors }) {
    const [users, setUsers] = useState(null);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [duration, setDuration] = useState(5);

    const refreshHandler = async () => {
        setPage(1);
        setUsers(null);
        setRefreshing(true);
    };

    useEffect(() => {
        (async () => {
            if(!users) {
                try {
                    let { code, status, message, data } = await getUsers(token);
                    if(code == 'S_LIST_USERS' && status == 200) {
                        setUsers(data);
                        setRefreshing(false);
                    } else {
                        console.log('Fail : ' + message)
                    }
    
                } catch (e) {
                    console.error(e)
                }
            }
        })()
    }, []);

    let sendPicture = async (email) => {
        try {
            let localUri = photo.uri;
            let filename = localUri.split('/').pop();
            
            // Infer the type of the image
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let objImage = { uri: localUri, name: filename, type }

            let {code, status, message, data } = await postSnap(token, {
                duration,
                to: email,
                image: objImage
            });
            if(code == "S_SNAP" && status == 200) {
                setVisible(false);
                setPhoto(null);
            } else {
                console.error('Fail : ' + message)
            }
        } catch (e) {
            console.error(e);
        }
    }

    let UserItem = ({ email }) => {
        return(
            <View>
                <TouchableOpacity onPress={() => sendPicture(email)}>
                    <View style={{ ...styles.message}}>
                        <Avatar
                            size="medium"
                            rounded
                            title={email.slice(0, 1).toUpperCase()}
                            backgroundColor={colors[Math.floor(Math.random() * 50)]}
                        />
                        <Text style={styles.mail}>
                            {email}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    let Header = () => {
        return (
            <>
                <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={styles.back}
                >
                <AntDesign
                    name="close"
                    size={24}
                    color="black" />
                </TouchableOpacity>
                <Picker
                    selectedValue={duration}
                    onValueChange={(itemValue, itemIndex) => setDuration(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="1" value={1} />
                    <Picker.Item label="5" value={5} />
                    <Picker.Item label="7" value={7} />
                    <Picker.Item label="10" value={10} />
                </Picker>
            </>
        )
    }

    if(!users) return <></>
    else {
        return(
            <Modal 
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                        <FlatList
                            data={users.slice(0, 10 * page)}
                            renderItem={({item, index}) => <UserItem sendPicture={sendPicture} email={item.email} colors={colors} styles={styles} />}
                            ListHeaderComponent={Header}
                            contentContainerStyle={styles.modalView}
                            keyExtractor={(item,index) => index.toString()}
                            onEndReached={() => {
                                console.log('end');
                                setPage(page + 1)
                            }}
                            onEndReachedThreshold={0.0001}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshHandler} />}
                        />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      maxHeight: 600
    },
    modalView: {
        margin: 5,
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 45,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
        elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    message: {
        padding: 13,
        borderColor: '#B4B4B4',
        borderBottomWidth: 0.2,
        flexDirection: "row",
        width: '100%',
        padding: 10,
    },
    mail: {
        marginTop: '6%',
        marginLeft:15,
        fontSize: 15,
        fontWeight: "bold",
        marginRight: 'auto'
    },
    back: {
        position: 'absolute',
        marginTop:-30,
        marginLeft: -50,
    },
    picker: {
        marginTop:-75,
        margin: 20,
        height: 200,
        width: 200,
        zIndex: 15
    }

  });
  