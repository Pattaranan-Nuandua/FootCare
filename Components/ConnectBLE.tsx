import React, { useState, useEffect, SetStateAction, useContext, createContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BleManager, Characteristic, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';
import Heatmap from './Heatmap';
import { Navigation } from 'react-native-navigation';
//import MyContext from './MyContext';
import { MyContext } from './TestProvider';

const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use


function DeviceData({ navigation }) {
    const { data, setData } = useContext(MyContext)
    console.log("DeviceData", data);

    const handleAddIndex = async () => {
        const response = await fetch('http://10.64.59.12:3001/add/index', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            //({...data})
            body: JSON.stringify({ ...data }),
        })
        //.then ((response) =>  response.json())
        const index = await response.json();
        console.log(index);
        // .then((response) => {
        //     updateData();
        // })
    }
    //const AddIndex = setInterval(handleAddIndex,1000);

    const [connectedDevice, setConnectedDevice] = useState<Device>();
    const [isConnected, setIsConnected] = useState(false);
    //เชื่อมบลูทูธแล้วไปหน้าโชว์ข้อมูลที่อ่านได้จากอุปกรณ์ + เก็บลงDB
    async function scanDevices() {
        console.log('scanning');
        bleManager.startDeviceScan([], null, (error, scannedDevice) => {
            if (error) {
                console.warn(error);
            }
            if (scannedDevice && scannedDevice.name === 'M5StickC-Plus') {
                bleManager.stopDeviceScan();
                handleConnect(scannedDevice);
                navigation.navigate('Insole');
                //setInterval(handleAddIndex, 1200);
                //{handleAddIndex};
            }
        });
        setTimeout(() => {
            bleManager.stopDeviceScan();
        }, 5000);
    }


    async function handleConnect(device: Device) {
        console.log('connecting to Device:', device.name);
        device.connect().then((device) => {
            setConnectedDevice(device);
            setIsConnected(true);
            return device.discoverAllServicesAndCharacteristics();
            //navigation.navigate('heatmap')
        })
            .then((device) => {
                bleManager.onDeviceDisconnected(device.id, (error, device) => {
                    console.log('Disconnect');
                    setIsConnected(false);
                });
                // READ MESSAGE
                device.readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE).then((valenc: any) => {
                    //console.log('Received:', base64.decode(valenc?.value));
                    setData(JSON.parse(base64.decode(valenc?.value)));
                });

                ////////Monitor///////
                device.monitorCharacteristicForService(
                    SERVICE_UUID,
                    CHARACTERISTIC_BLE,
                    (error, characteristic: any) => {
                        if (characteristic?.value != null) {
                            setData(base64.decode(characteristic?.value));
                            //console.log(base64.decode(characteristic.value))
                            //console.log(characteristic.value)
                            //console.log('Update Received: ', base64.decode(characteristic?.value));
                            const valueString = characteristic?.value.toString();
                            setData(JSON.parse(base64.decode(valueString)));
                            //navigation.navigate('Insole');
                            setInterval(handleAddIndex, 1000);
                        }
                    },
                    'messagetransaction'
                );
                //console.log('Connection established');
            });
    }

    async function disconnectDevice() {
        console.log('Disconnect!');
        if (connectedDevice) {
            try {
                const isDeviceConnected = await connectedDevice.isConnected();
                if (isDeviceConnected) {
                    await bleManager.cancelTransaction('messagetransaction');
                    await bleManager.cancelTransaction('nightmodetransaction');
                    await bleManager.cancelDeviceConnection(connectedDevice.id);
                    console.log('Device disconnected successfully.');
                }
                setIsConnected(false);
            } catch (error) {
                console.error('Failed to disconnect device:', error);
            }
        } else {
            console.warn('No connected device found.');
        }
    }

    function getColor(value) {
        const intValue = parseInt(value);
        if (intValue < 500) {
            return 'green';
        } else if (intValue >= 500 && intValue < 800) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>ค้นหาอุปกรณ์</Text>
            <TouchableOpacity style={styles.button} onPress={() => scanDevices()}>
                <Text style={{color:'#fff'}}>ค้นหาอุปกรณ์</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btndcn} onPress={() => disconnectDevice()}>
                <Text style={{color:'#fff'}}>ยกเลิกการจับคู่</Text>
            </TouchableOpacity>
        </View>
    );
}

export default DeviceData;
//export { MyContext,DeviceData };

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        width:'100%',
        height:'100%'
    },
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: '#00979C',
        borderRadius: 5,    
        justifyContent:'center',
        alignSelf:'center',
        marginTop:280
    },
    btndcn:{
        padding: 10,
        margin: 10,
        backgroundColor: '#8B0000',
        borderRadius: 5,
        justifyContent:'center',
        alignSelf:'center',
    },
    text: {
        fontSize: 20,
        marginTop:50,
        textAlign:'center',
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
    },
    dataGroup: {
        flex: 1,
        alignItems: 'center',
    },
    dataText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});