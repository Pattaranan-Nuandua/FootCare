import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Dimensions, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import { DEFAULT_SERVICES, device, restoreServices } from 'react-native-bluetooth-serial-next';
import { Device } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MyContext } from './TestProvider';

const Home = ({ navigation, userId }) => {
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [user, setUser] = useState({
        username: '',
        email: '',
        id: null,
        name: '',
        surname: '',
        age: null,
        gender: '',
        weight: null,
        high: null,
        step: null,
        device: '',
        status: ''
    });
    const [isLoading, setLoading] = useState(true);
    interface User {
        id: number;
        name: string;
        email: string;
        surname: string;
        age: number;
        gender: string;
        weight: number;
        height: number;
        step: number;
        device: string;
        status: string;
    }
    const fetchUser = async (id) => {
        const indexToken = await AsyncStorage.getItem('@accessToken');
        if (!userId) {
            console.error('User ID is undefined');
            return;
        }
        const response = await fetch(`http://10.64.59.12:3001/api/user/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${indexToken}`
            },
            body: JSON.stringify({ user: id })
        })
            .then(response => response.json())
            .then((id) => {
                console.log("Success: ", id.data);
                setUser(id.data)
            })
        }
    useEffect(() => {
    const getUserData = async () => {
        try {
            const token = await AsyncStorage.getItem('@accessToken');
            setAccessToken(token);
            fetchUser(userId);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    getUserData();
}, [userId]);

    const { data } = useContext(MyContext);
    const checkFoot = () => {
        if (
            parseInt(data.ADC11) >= 12000 &&
            parseInt(data.ADC12) >= 12000 &&
            parseInt(data.ADC13) >= 12000 &&
            parseInt(data.ADC14) >= 12000 &&
            parseInt(data.ADC21) >= 12000 &&
            parseInt(data.ADC22) >= 12000 &&
            parseInt(data.ADC23) >= 12000 &&
            parseInt(data.ADC24) >= 12000 &&
            parseInt(data.ADC31) >= 12000 &&
            parseInt(data.ADC32) >= 12000 &&
            parseInt(data.ADC33) >= 12000 &&
            parseInt(data.ADC34) >= 12000
        ) {
            return 'Normal foot';
        } else if (
            parseInt(data.ADC11) < 12000 ||
            parseInt(data.ADC12) < 12000 ||
            parseInt(data.ADC13) < 12000 ||
            parseInt(data.ADC14) < 12000 ||
            parseInt(data.ADC22) < 12000 ||
            parseInt(data.ADC23) < 12000 ||
            parseInt(data.ADC24) < 12000 ||
            parseInt(data.ADC31) < 12000 ||
            parseInt(data.ADC33) < 12000 ||
            parseInt(data.ADC34) < 12000
        ) {
            return 'FlatFoot';
        } else if (
            parseInt(data.ADC11) >= 12000 &&
            parseInt(data.ADC12) >= 12000 &&
            parseInt(data.ADC13) >= 12000 &&
            parseInt(data.ADC14) >= 12000 &&
            parseInt(data.ADC22) >= 12000 &&
            parseInt(data.ADC31) >= 12000 &&
            parseInt(data.ADC32) >= 12000 &&
            parseInt(data.ADC33) >= 12000 &&
            parseInt(data.ADC34) >= 12000
        ) {
            return 'High arch';
        } else {
            return 'Sleep';
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>{"ยินดีต้อนรับ"}</Text>
            <View>
                <Icon
                    name="add"
                    size={25} color="#00979C"
                    style={styles.icon} />
                <Text style={styles.textaddDevice} onPress={() => navigation.navigate('ConnectBLE')}>
                    เพิ่มอุปกรณ์
                </Text>
            </View>
            <View style={styles.box}>
                {user ? (
                    <View style={styles.box}>
                        <View style={{ marginLeft: 30 }}>
                            <Text style={{ marginBottom: 10,  }}>{"คุณ"} {user.username} {user.surname}</Text>
                            <Text style={{ marginBottom: 10,  }}>{'อายุ'} {user.age} {'ปี'}</Text>
                            <Text style={{ marginBottom: 10,  }}>{'น้ำหนัก '}{user.weight} {'กิโลกรัม'}</Text>
                            <Text style={{ marginBottom: 10,  }}>{'ส่วนสูง'} {user.high} {'เซนติเมตร'}</Text>
                            <Text style={{ marginBottom: 10,  }}>{'อุปกรณ์:'} </Text>
                            <Text style={{ marginBottom: 10,  }}>{'สถานะอุปกรณ์:'} </Text>
                            <Text style={{ marginBottom: 10,  }}>{'Foot Type:'} {checkFoot()}</Text>
                        </View>
                    </View>
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        flex: 1,
        backgroundColor: "#ffff",
        //height: "100%",
        alignItems: 'center',
        marginTop:-30,
    },
    text: {
        fontSize: 20,
        color: '#00979C',
        fontWeight: 'bold',
        marginRight: 100,
        marginLeft: -130,
        marginTop: 40,
    },
    box: {
        backgroundColor: '#f0f0f0',
        width: 340,
        height: 220,
        borderRadius: 18,
        //marginLeft:45,
        marginTop: 30,
    },
    icon: {
        //marginBottom: 20,
        marginTop: -25,
        marginLeft: 240
    },
    textaddDevice: {
        fontSize: 15,
        marginTop: -22,
        marginLeft: 265,
        color: '#00979C',
        //fontWeight: 'bold',
    },
    name: {
        fontSize: 18,
        marginTop: 30,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    age: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    gender: {
        fontSize: 17,
        marginTop: -23,
        marginLeft: 150,
        //fontWeight: 'bold',
    },
    weight: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    high: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    box3: {
        backgroundColor: '#f0f0f0',
        width: 320,
        height: 130,
        borderRadius: 18,
        //marginLeft:45,
        marginTop: 30,
    },
    step: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //textAlign:'center',
        //fontWeight: 'bold',
    },
    device: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //textAlign:'center',
        //fontWeight: 'bold',
    },
    status: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //textAlign:'center',
        //fontWeight: 'bold',
    },
});
export default Home;

function setUser(data: any) {
    throw new Error('Function not implemented.');
}
