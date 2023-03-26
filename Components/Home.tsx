import React, { useState, useEffect ,useContext} from 'react';
import { Text, StyleSheet, View, SafeAreaView, Dimensions, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { MyContext } from './TestProvider';

interface User {
    id: number;
    username: string;
    fullname: string;
    email: string;
    surname: string;
    age: number;
    gender: string;
    weight: number;
    high: number;
}
const Home = ({ route, navigation }) => {
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
        high: 0,
    });
    const fetchUser = async (userId: number, token: string) => {
        try {
            const  userId = 59;
            const response = await fetch(`http://10.64.57.59:3001/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('Error fetching user data');
            }
            const { data } = await response.json(); // extract user data from the "data" property
            setUser({
                id: data.id,
                username: data.username,
                fullname: data.fullname,
                email: data.email,
                surname: data.surname,
                age: data.age,
                gender: data.gender,
                weight: data.weight,
                high: data.high,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error);
        }
    };
    useEffect(() => {
        console.log(user);
        AsyncStorage.getItem('accessToken')
            .then((token) => {
                if (token && user) { // only fetch user data if user is logged in
                    setAccessToken(token);
                    fetchUser(user.id, token);
                }
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [user.id]);

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

    const { data } = useContext(MyContext);
    const checkFoot = () => {
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
                        <Text style={{ marginBottom: 10, }}>{'ส่วนสูง'} {user.high} {'เซนติเมตร'}</Text>
                        <Text style={{ marginBottom: 10, }}>{'อุปกรณ์:'} </Text>
                        <Text style={{ marginBottom: 10, }}>{'สถานะอุปกรณ์:'} </Text>
                        <Text style={{ marginBottom: 10, }}>{'Foot Type:'} {checkFoot()}</Text>
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
