import React, { Component, useState, useEffect, useContext } from 'react';
import { StyleSheet, TextInput, View, Text, Image, Alert, TouchableOpacity, Dimensions, KeyboardAvoidingView, } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationHelpers, StackActions } from '@react-navigation/native';
import logofoot from '../Image/logo.png';
import { MyContext } from './TestProvider';

const logo = Image.resolveAssetSource(logofoot).uri;
interface LoginResponse {
    accessToken: string;
}

const Login = ({ route, navigation }) => {
    const [error, setError] = useState<Error | null>(null);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const handleLogin = async () => {
        try {
            const response = await fetch(`http://10.64.57.59:3001/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            console.log('Response:', response);
            if (response.ok) {
                const { accessToken }: LoginResponse = await response.json();
                console.log('Access token:', accessToken);
                await AsyncStorage.setItem('accessToken', accessToken);
                setUser({ username });
                setUsername('');
                setPassword('');
                navigation.navigate('BottomTabNavScreenGroup', { accessToken });
            } else {
                throw new Error('Error logging in');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error);
        }
    };
    return (
        <View>
            <LinearGradient
                colors={['#00979C', 'white']}
                style={styles.container}
            >
                <Text style={styles.textwelcome}>ยินดีต้อนรับเข้าสู่ระบบ</Text>
                <Image source={{ uri: logo }}
                    style={styles.image} />
                <Text style={styles.textuse}>Username</Text>
                <TextInput
                    style={styles.input}
                    //onChangeText={(e) => setUsername(e)}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="Username"
                />
                <Text style={styles.textpass}>Password</Text>
                <TextInput
                    style={styles.input}
                    //onChangeText={(e) => setPassword(e)}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
                    <Text style={styles.textregistor}>ลงทะเบียน</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Resetpassword')}>
                    <Text style={styles.textforget}>ลืมรหัสผ่าน ?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 150,
                        padding: 10,
                        backgroundColor: '#037A7E',
                        alignSelf: 'center',
                        borderRadius: 10,
                        marginTop: 30,
                    }}
                    onPress={handleLogin}>
                    <Text style={{ color: 'white', alignSelf: 'center', }}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                    <Text style={{ color: '#00979C', alignSelf: 'center', marginTop: 30, textDecorationLine: 'underline' }}>Privacy</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    image: {
        marginTop: 120,
        marginBottom: 90,
        width: 100,
        height: 120,
        alignSelf: 'center'
    },
    textwelcome: {
        marginLeft: 30,
        fontSize: 20,
        marginBottom: 50,
        marginTop: 80,
        color: '#037A7E',
        fontWeight: 'bold',
    },
    textuse: {
        marginLeft: 60,
        color: '#037A7E',
        marginTop: -50,
    },
    textpass: {
        marginLeft: 60,
        color: '#037A7E',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#fff',
        //marginLeft: 50,
        alignSelf: 'center'
    },
    button1: {
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 160,
        width: 105,
    },
    textregistor: {
        marginLeft: 60,
        color: '#037A7E'
    },
    textforget: {
        marginTop: -16,
        marginLeft: 265,
        color: '#037A7E',
    },
    Btnconnect: {
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 140,
        width: 105,
    }
})
export default Login;

