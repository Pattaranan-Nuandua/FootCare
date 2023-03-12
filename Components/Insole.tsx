import React, { useState, useContext } from 'react';
import { Image, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, Button, TouchableOpacity } from 'react-native';
import { MyContext } from './TestProvider';
import { scaleLinear } from 'd3-scale';
import { interpolate, interpolateRgb, interpolateRgbBasis } from 'd3-interpolate';
import Subject from '../Image/Subject.png';
import BarChart from './Bar';
const logo = Image.resolveAssetSource(Subject).uri;

const Insole = ({ navigation }) => {
    /////================can use=========================
    const { data, setData } = useContext(MyContext);

    //===use
    const getColors = (value) => {
        const colorRange = ['#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF5722'];
        const startValue = 0;
        const endValue = 30000;
        const colorScale = scaleLinear()
            .domain([startValue, endValue])
            .range([0, colorRange.length - 1])
            .clamp(true);
        const colorIndex = Math.round(colorScale(value));
        const startColor = colorRange[colorIndex];
        const endColor = colorRange[colorIndex + 1] || startColor;
        return colorRange[colorIndex];
    }
    const handleAddIndex = async () => {
        const response = await fetch('http://10.64.71.101:3001/add/index', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        })
        const index = await response.json()
        console.log(index);
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 30, textAlign: 'center', color: '#000' }}>Heatmap</Text>
            <TouchableOpacity
                style={styles.history}
                onPress={() => navigation.navigate('History')}
            >
                <Text style={{ color: '#037A7E' }}>ประวัติ</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, marginLeft: 30, fontWeight: '500' }} >ลักษณะการลงน้ำหนัก: </Text>
            <Image source={{ uri: logo }}
                style={styles.image} />
            <View style={styles.dataContainer}>
                <View style={styles.dataGroup}>
                    <View style={styles.dataGroup1}>
                        <Text style={[styles.dataText1, { backgroundColor: getColors(data.ADC11) }]}>{data.ADC11}</Text>
                        <Text style={[styles.dataText2, { backgroundColor: getColors(data.ADC12) }]}>{data.ADC12}</Text>
                        <Text style={[styles.dataText3, { backgroundColor: getColors(data.ADC13) }]}>{data.ADC13}</Text>
                        <Text style={[styles.dataText4, { backgroundColor: getColors(data.ADC14) }]}>{data.ADC14}</Text>
                    </View>
                    <View>
                        <Text style={[styles.dataText5, { backgroundColor: getColors(data.ADC21) }]}>{data.ADC21}</Text>
                        <Text style={[styles.dataText6, { backgroundColor: getColors(data.ADC22) }]}>{data.ADC22}</Text>
                        <Text style={[styles.dataText7, { backgroundColor: getColors(data.ADC23) }]}>{data.ADC23}</Text>
                        <Text style={[styles.dataText8, { backgroundColor: getColors(data.ADC24) }]}>{data.ADC24}</Text>
                    </View>
                    <View>
                        <Text style={[styles.dataText9, { backgroundColor: getColors(data.ADC31) }]}>{data.ADC31}</Text>
                        <Text style={[styles.dataText10, { backgroundColor: getColors(data.ADC32) }]}>{data.ADC32}</Text>
                        <Text style={[styles.dataText11, { backgroundColor: getColors(data.ADC33) }]}>{data.ADC33}</Text>
                        <Text style={[styles.dataText12, { backgroundColor: getColors(data.ADC34) }]}>{data.ADC34}</Text>
                    </View>
                </View>
                <BarChart />
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    history: {
        marginTop: -20,
        marginLeft: 330,
    },
    image: {
        width: '80%',
        height: '60%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    cell: {
        width: '33.33%',
        height: '33.33%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        marginTop: 30,
    },
    boxtest: {
        width: 200,
        height: 100,
        borderWidth: 2,
    },
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    dataContainer: {
        flex: 1,
        //flexDirection: 'row',
        marginTop: 50,
    },
    dataGroup: {
        //flex: 1,
        alignItems: 'center',
        marginTop: 0,
        borderColor: "#F5FCFF",
    },
    boxdata: {
        height: 30,
        width: 30,
        borderRadius: 20,
        borderColor: 'back',
    },
    dataGroup1: {
        alignItems: 'center',
        //marginTop: 50
    },
    dataGroup2: {
        alignItems: 'center',
        //marginTop: 50,
    },
    dataText1: {
        marginTop: -465,
        marginLeft: 110,
        padding: 2,
        borderWidth: 0.1,
        height: 25,
        width: 45,

    },
    dataText2: {
        borderWidth: 0.1,
        marginTop: 10,
        padding: 2,
        marginLeft: 200,
        height: 25,
        width: 45,
    },
    dataText3: {
        borderWidth: 0.1,
        marginTop: 20,
        padding: 2,
        marginLeft: 220,
        height: 25,
        width: 45,
    },
    dataText4: {
        borderWidth: 0.1,
        marginTop: -50,
        padding: 2,
        marginLeft: 100,
        height: 25,
        width: 45,
    },
    dataText5: {
        borderWidth: 0.1,
        marginTop: -355,
        padding: 2,
        marginLeft: 175,
        height: 25,
        width: 45,
    },
    dataText6: {
        borderWidth: 0.1,
        marginTop: -10,
        padding: 2,
        marginLeft: 240,
        height: 25,
        width: 45,
    },
    dataText7: {
        borderWidth: 0.1,
        marginTop: 5,
        padding: 2,
        marginLeft: 180,
        height: 25,
        width: 45,
    },
    dataText8: {
        borderWidth: 0.1,
        marginTop: 10,
        padding: 2,
        marginLeft: 230,
        height: 25,
        width: 45,
    },
    dataText9: {
        borderWidth: 0.1,
        marginTop: -235,
        padding: 2,
        marginLeft: 195,
        height: 25,
        width: 45,
    },
    dataText10: {
        borderWidth: 0.1,
        marginTop: 15,
        padding: 2,
        marginLeft: 185,
        height: 25,
        width: 45,
    },
    dataText11: {
        borderWidth: 0.1,
        marginTop: 15,
        padding: 2,
        marginLeft: 210,
        height: 25,
        width: 45,
    },
    dataText12: {
        borderWidth: 0.1,
        marginTop: 20,
        padding: 2,
        marginLeft: 195,
        height: 25,
        width: 45,
    },

});


export default Insole;
