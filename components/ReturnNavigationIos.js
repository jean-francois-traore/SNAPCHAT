import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function ReturnNavigationIos({navigation}) {
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="lightskyblue" />
            </TouchableOpacity>
        </View>
    )
}
export default ReturnNavigationIos;
