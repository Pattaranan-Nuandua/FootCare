import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Dimensions, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { MyContext } from './TestProvider';

interface User {
    id: number;
    username: string;
    email: string;
    fullname: string;
    surname: string;
    age: number;
    gender: string;
    weight: number;
    height: number;
    details: string;
}

const Home = ({ navigation, route }) => {
    const [error, setError] = useState<Error | null>(null);
    const [accessToken, setAccessToken] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>({
        id: 0,
        username: '',
        email: '',
        fullname: '',
        surname: '',
        age: 0,
        gender: '',
        weight: 0,
        height: 0,
        details:''
    });
    useEffect(() => {
        const loadData = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                console.log('Token:', token);
                if (token) {
                    setAccessToken(token);
                    const response = await fetch(`http://10.64.57.59:3001/users/me`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Response:', response);
                    if (response.ok) {
                        const { userData } = await response.json();
                        console.log('User data:', userData);
                        setUser({
                            id: userData.id,
                            username: userData.username,
                            email: userData.email,
                            fullname: userData.fullname,
                            surname: userData.surname,
                            age: Number(userData.age),
                            gender: userData.gender,
                            weight: Number(userData.weight),
                            height: Number(userData.high),
                            details: userData.details
                        });
                    } else {
                        throw new Error('Error fetching user data');
                    }
                }
            } catch (error) {
                console.error('Error loading data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    /*const fetchUser = async (userId: number, token: string) => {
        try {
            const response = await fetch(`http://10.64.57.59:3001/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const { data } = await response.json();
                setUser({
                    id: data.userData.id,
                    username: data.userData.username,
                    fullname: data.userData.fullname,
                    email: data.userData.email,
                    surname: data.userData.surname,
                    age: data.userData.age,
                    gender: data.userData.gender,
                    weight: data.userData.weight,
                    high: data.userData.high,
                });
            } else {
                throw new Error('Error fetching user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error);
        }
    };
    useEffect(() => {
        const loadData = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (token) {
                    setAccessToken(token);
                    const userData = await AsyncStorage.getItem('user');
                    if (userData) {
                        const parsedUserData = JSON.parse(userData);
                        setUser(parsedUserData);
                        if (parsedUserData.id) {
                            await fetchUser(parsedUserData.id, token);
                        }
                    }
                }
            } catch (error) {
                console.error('Error loading data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [setAccessToken, setUser, setError]);*/
    if (isLoading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>{error.message}</Text>
            </View>
        );
    }
    /////////////====================================
    const { data, data3 } = useContext(MyContext);
    const checkFoot = () => {
        console.log("data3 : ", data3);
        if (data3.length === 3) {
            // if(data3[0].ADC11 )
        }
        if (
            parseInt(data.ADC11) >= 10000 &&
            parseInt(data.ADC12) >= 10000 &&
            parseInt(data.ADC13) >= 10000 &&
            parseInt(data.ADC14) >= 10000 &&
            parseInt(data.ADC21) >= 10000 &&
            parseInt(data.ADC22) >= 10000 &&
            parseInt(data.ADC23) >= 10000 &&
            parseInt(data.ADC24) >= 10000 &&
            parseInt(data.ADC31) >= 10000 &&
            parseInt(data.ADC32) >= 10000 &&
            parseInt(data.ADC33) >= 10000 &&
            parseInt(data.ADC34) >= 10000
        ) {
            return 'Normal foot';
        } else if (
            parseInt(data.ADC11) < 10000 ||
            parseInt(data.ADC12) < 10000 ||
            parseInt(data.ADC13) < 10000 ||
            parseInt(data.ADC14) < 10000 ||
            parseInt(data.ADC22) < 10000 ||
            parseInt(data.ADC23) < 10000 ||
            parseInt(data.ADC24) < 10000 ||
            parseInt(data.ADC31) < 10000 ||
            parseInt(data.ADC33) < 10000 ||
            parseInt(data.ADC34) < 10000
        ) {
            return 'FlatFoot';
        } else if (
            parseInt(data.ADC11) >= 10000 &&
            parseInt(data.ADC12) >= 10000 &&
            parseInt(data.ADC13) >= 10000 &&
            parseInt(data.ADC14) >= 10000 &&
            parseInt(data.ADC22) >= 10000 &&
            parseInt(data.ADC31) >= 10000 &&
            parseInt(data.ADC32) >= 10000 &&
            parseInt(data.ADC33) >= 10000 &&
            parseInt(data.ADC34) >= 10000
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
                <View style={styles.box}>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={{ marginBottom: 10, }}>{"คุณ"} {user.fullname} {user.surname}</Text>
                        <Text style={{ marginBottom: 10, }}>{'อายุ'} {user.age} {'ปี'}</Text>
                        <Text style={{ marginBottom: 10, }}>{'น้ำหนัก '}{user.weight} {'กิโลกรัม'}</Text>
                        <Text style={{ marginBottom: 10, }}>{'ส่วนสูง'} {user.height} {'เซนติเมตร'}</Text>
                        <Text style={{ marginBottom: 10, }}>{'รายละเอียด:'} {user.details}</Text>
                        <Text style={{ marginBottom: 10, }}>{'Foot Type:'} {checkFoot()}</Text>
                        {/* <Text>{"data3.length :" + data3.length}</Text>
                        {data3.length === 3 ?
                            <View>
                                <Text>{"data3[0].ADC11 :" + data3[0].ADC11}</Text>
                                <Text>{"data3[1].ADC11 :" + data3[1].ADC11}</Text>
                                <Text>{"data3[2].ADC11: " + data3[2].ADC11}</Text>
                            </View> :
                            <Text>Loading..</Text>
                        } */}
                    </View>
                </View>
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
        marginTop: -30,
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
        height: 200,
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
