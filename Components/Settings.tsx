import { Box } from '@react-native-material/core';
import * as React from 'react';
import { SafeAreaView,Text,StyleSheet,View,Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfile from './EditProfile';

const Settings =({navigation})=>{
    return(
        <SafeAreaView style={styles.contrainer}>
            <Text style={{ fontWeight: '700', fontSize: 22,marginTop: 10, textAlign: 'center', color: '#000' }}>
                ตั้งค่า
            </Text>
            <View>
                <View 
                    style={styles.box} />
                    <Icon 
                        name="square-edit-outline" 
                        size={30} color="#00979C" 
                        style={styles.icon} />
                    <Text 
                        style={styles.Text}
                        onPress={() => navigation.navigate('EditProfile')}>
                        แก้ไขข้อมูล
                    </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contrainer:{
        backgroundColor: "#ffff",
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    settingtext:{
        textAlign:'center',
        fontSize: 20,
    },
    box:{
        backgroundColor: '#f0f0f0', 
        width:324, 
        height:50, 
        borderRadius:10,
        //marginLeft:45,
        marginTop:50,
        alignSelf:'center'
    },
    Text:{
        fontSize: 16,
        marginLeft:110,
        marginTop:-25,
    },
    icon:{
        marginLeft:65,
        marginTop:-40,
    }
})

export default Settings;