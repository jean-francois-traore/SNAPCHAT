import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { requestMediaLibraryPermissionsAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'; 
import { Camera } from 'expo-camera';
import Context from './Context';
import SendModal from './SendModal';
 
function HomeCamera({navigation}) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [perm, setPerm] = useState({camera: null, library: null});
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [visible, setVisible] = useState(false);
    const { token, colorsArray } = useContext(Context);

    useEffect(() => {
        (async() => {
            if(perm.camera == null && perm.library == null) {
                const camera = await Camera.requestPermissionsAsync();
                const library = await requestMediaLibraryPermissionsAsync();
    
                setPerm({camera: camera.status === "granted", library: library?.status === "granted"});
            }
        })()
    }, [perm, photo, ]);

    if(perm.camera == null) return <View></View>
    else if (perm.camera == false) return <View style={styles.container}><Text>Pas d'accès a la caméra</Text></View>
    else {
        let takePicture = async () => {
            try {
                let photo = await camera.takePictureAsync({quality: 0});
                console.log(photo);
                setPhoto(photo);
            } catch (e) {
                console.error(e);
            }
        }

        let openMediaLibrary = async () => {
            try {
                let photo = await launchImageLibraryAsync();
                setPhoto(photo);
            } catch (e) {
                console.log(e)
            }
        }

        if(photo) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity style={styles.arrowBack} onPress={() => setPhoto(null)}>
                        <Ionicons name="arrow-back" size={34} color="white" />
                    </TouchableOpacity>
                    <Image style={styles.imageContainer} source={{uri: photo.uri}} />
                    <SendModal 
                        visible={visible} 
                        setVisible={setVisible} 
                        photo={photo}
                        setPhoto={setPhoto}
                        token={token}
                        colors={colorsArray}
                    />
                    <TouchableOpacity style={styles.sendIcon} onPress={() => setVisible(true)}>
                        <Ionicons name="ios-send" size={34} color="white" />
                    </TouchableOpacity>
                </View>
            )
        }
    
        return (
            <View style={styles.container}>
                <Camera style={styles.imageContainer} type={type} ref={ref => setCamera(ref)} ratio="16:9" pictureSize="1280x720">
                    <View style={styles.buttonContainer}>
                        <View style={styles.pressContainer}>
                            {/* <View style={styles.pressView}> */}
                                <TouchableOpacity
                                onPress={takePicture}
                                style={styles.press}
                                />
                            {/* </View> */}
                        </View>
                        <TouchableOpacity
                            style={{...styles.button, marginLeft:0}}
                            onPress={() => setType(type == Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}
                        >
                            <MaterialIcons name="flip-camera-ios" size={40} color="white" />
                        </TouchableOpacity>
                       
                        <TouchableOpacity
                            style={{...styles.button, marginLeft: 'auto'}}
                            onPress={openMediaLibrary}
                        >
                            <FontAwesome5 name="images" size={35} color="white" />
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: "white",
    },
    imageContainer: {
        flex: 1,
        width: "100%",
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height
      },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.2,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    pressContainer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
    },
    press: {
        width: 60,
        height: 60,
        borderColor: "#e5e4e2",
        borderWidth: 7,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: 'transparent',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    arrowBack: {
        position: 'absolute',
        zIndex: 15,
        top: 30,
        left: 15
    },
    sendIcon: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        zIndex: 15,
    }
});

export default HomeCamera;