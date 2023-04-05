import * as React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import { Button } from '@react-native-material/core';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign'
import Login from './Login';

const Resetpassword = ({ navigation }) => {
    const [username, onChangeText0] = React.useState("");
    const [new_password, onChangeText1] = React.useState("");
    const [confirm_password, onChangeText2] = React.useState("");
    const handleResetPassword = () => {
        if (new_password !== confirm_password) {
            Alert.alert('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }
        fetch('http://10.64.57.59:3001/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                new_password: new_password,
                confirm_password: confirm_password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((data) => {
                console.log(data);
                navigation.navigate('Login');
                Alert.alert('เปลี่ยนรหัสผ่านสำเร็จ');
            })
            .catch((error) => {
                console.log(error);
                navigation.navigate('Login');
                //Alert.alert('มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง');
            });
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 30, textAlign: 'center', color: '#000' }} >
                ลืมรหัสผ่าน
            </Text>
            <Text style={styles.textusername}>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText0}
                value={username}
            />
            <Text style={styles.text}>รหัสผ่านใหม่</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText1}
                value={new_password}
            />
            <Text style={styles.text}>ยืนยันรหัสผ่านใหม่</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={confirm_password}
            />
            <Button
                title="ยืนยัน"
                color="#00979C"
                tintColor="white"
                style={styles.button2}
                onPress={handleResetPassword}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFF",
        width: "100%",
        height: "100%",
    },
    textforgetpassword: {
        textAlign: 'center',
        fontSize: 20,
    },
    textusername: {
        marginTop: 30,
        marginLeft: 60,
        color: '#999999'
    },
    input: {
        height: 40,
        width: 290,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#f0f0f0',
        marginLeft: 60,
    },
    text: {
        marginLeft: 60,
        color: '#999999'
    },
    button2: {
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 160,
        width: 105,
    }
})
export default Resetpassword;