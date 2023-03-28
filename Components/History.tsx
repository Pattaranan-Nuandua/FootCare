import React, { useState } from 'react';
import { Alert,Button, View, Text, StyleSheet ,Image,Table,ScrollView} from 'react-native'
import DatePicker from 'react-native-date-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { HeatMapGrid } from 'react-grid-heatmap'
import { scaleLinear } from 'd3-scale';
import { interpolate, interpolateRgb, interpolateRgbBasis } from 'd3-interpolate';
import a from '../Image/a.jpg';
const logo = Image.resolveAssetSource(a).uri;

const History = () => {
    //const Date = moment(new Date()).utc().format("MM/DD HH:mm");
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const CheckFoot = () => {
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
            return 'เท้าแบน';
        } else if (
            parseInt(data.ADC11) >= 10000 &&
            parseInt(data.ADC12) >= 10000 &&
            parseInt(data.ADC13) >= 10000 &&
            parseInt(data.ADC14) >= 10000 &&
            parseInt(data.ADC22) >= 10000 &&
            parseInt(data.ADC23) >= 10000 &&
            parseInt(data.ADC24) >= 10000 &&
            parseInt(data.ADC31) >= 10000 &&
            parseInt(data.ADC33) >= 10000 &&
            parseInt(data.ADC34) >= 10000
        ) {
            return 'เท้าปกติ';
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
            return 'อุ้งเท้าสูง';
        } else if (
            parseInt(data.ADC11) <= 0 &&
            parseInt(data.ADC12) <= 0 &&
            parseInt(data.ADC13) <= 0 &&
            parseInt(data.ADC14) <= 0 &&
            parseInt(data.ADC21) <= 0 &&
            parseInt(data.ADC22) <= 0 &&
            parseInt(data.ADC23) <= 0 &&
            parseInt(data.ADC24) <= 0 &&
            parseInt(data.ADC31) <= 0 &&
            parseInt(data.ADC32) <= 0 &&
            parseInt(data.ADC33) <= 0 &&
            parseInt(data.ADC34) <= 0
            ){
            return 'ไม่มีการลงน้ำหนักเท้า';
        } else {
            return 'ไม่มีการลงน้ำหนักเท้า';
        }
    };

    const Detected=()=>{
        setTimeout(() => {
            CheckFoot();
        },1000);
    }

    const TestNow=()=>{
        setTimeout(() => {
            Alert.alert("Check");
        },1000);
        clearTimeout()
    }

    

    ///testheatmap
    //const xLabels=['ADC11','ADC12','ADC13','ADC14','ADC21','ADC22','ADC23','ADC24','ADC31','ADC32','ADC33','ADC34']
    //const yLabels=['date1','date2','date3']
    //const indextest = [[15,12,45,12,0,795,5264,1234,456,1572,14520,120],[155,852,1152,12,0,795,0,1234,4156,1572,14150,120],[1510,20422,450,152,15983,795,5264,1052,4156,1072,14520,1520]]
    // const xLabels = new Array(24).fill(0).map((_, i) => `${i}`)
    // const yLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    // const indextest = new Array(yLabels.length)
    //     .fill(0)
    //     .map(() =>
    //         new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 50 + 50))
    //     )
    //const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleshow = async (dateindex, dateindex2) => {
        console.log("handleshow");

        // const datestr = moment(date).format("YYYY-MM-DD hh:mm:ss ").slice(0, 10);
        // const timestr = date.toLocaleString('it-IT').slice(10);

        const response = await fetch('http://10.64.57.59:3001/show/index', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date: dateindex, date2: dateindex2 })
        })
            .then(response => response.json())
            .then((data) => {
                console.log("Success: ", data.data);
                setData(data.data)
                //setInterval(data,3000);
            })
            .catch((error) => {
                console.log("Error: ", error)
            })

    }

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

    // const showindex = async () => {
    //     const response = await fetch('http://10.64.58.169:8080/api/sensor/:date',{
    //         method: 'GET',

    //     })
    //     .then(response)
    // }
    //moment(date).utcOffset(7).format('YYYY-MM-DD hh:mm:ss a');

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 60 ,textAlign: 'center', color: '#000'}}>ประวัติ</Text>
            <Button title="Select Date" color={'#037A7E'} onPress={() => setOpen(true)}/>
            <DateTimePickerModal
                mode="datetime"
                isVisible={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    //moment(date).utcOffset(7).format('YYYY-MM-DD hh:mm:ss a')
                    setDate(date)
                    const datestr = moment(date).format("YYYY-MM-DD hh:mm:ss ").slice(0, 10);
                    const timestr = date.toLocaleString('it-IT').slice(10);
                    //console.log(timestr);
                    console.log("date:", date)
                    const date2 = new Date(date.setMinutes(date.getMinutes() + 1));
                    const datestr2 = moment(date2).format("YYYY-MM-DD hh:mm:ss ").slice(0, 10);
                    const timestr2 = date2.toLocaleString('it-IT').slice(10);


                    //const timestr = date.toLocaleString('it-IT').slice(10);
                    //console.log(moment(date).format("YYYY-MM-DD hh:mm:ss ").slice(0, 10))
                    //console.log(date.toLocaleString('it-IT').slice(9))
                    const dateindex = (datestr + " " + timestr);
                    console.log("datesuccess: ", dateindex);

                    const dateindex2 = (datestr2 + " " + timestr2);
                    console.log("datesuccess2: ", dateindex2);
                    //console.log(datastr2);

                    //console.log(moment(date).toLocaleString())
                    //console.log(date.toLocaleDateString('km-KH'))
                    //console.log(date.toLocaleString('km-KH'))

                    handleshow(dateindex, dateindex2);
                }}
                onCancel={() => { setOpen(false) }}
            />
            
            {TestNow()}

            {data.map((data, index) => {
                
                return (
                    //setInterval(handleshow, 1200);

                    <View key={index}>
                        <Text>ADC11: {data.ADC11}</Text>
                        <Text>ADC12: {data.ADC12}</Text>
                    </View>
                    




                )
            })}

            {/* <Image source={{ uri: logo }}
                style={styles.image} />
            <View style={styles.dataContainer}>
                <View style={styles.dataGroup}>
                    <View style={styles.dataGroup1}>
                        <Text style={[styles.dataText1, { backgroundColor: getColors(data.ADC11) }]}>1</Text>
                        <Text style={[styles.dataText2, { backgroundColor: getColors(data.ADC13) }]}>2</Text>
                        <Text style={[styles.dataText3, { backgroundColor: getColors(data.ADC21) }]}>3</Text>
                        <Text style={[styles.dataText4, { backgroundColor: getColors(data.ADC12) }]}>4</Text>
                    </View>
                    <View>
                        <Text style={[styles.dataText5, { backgroundColor: getColors(data.ADC23) }]}>5</Text>
                        <Text style={[styles.dataText6, { backgroundColor: getColors(data.ADC22) }]}>6</Text>
                        <Text style={[styles.dataText7, { backgroundColor: getColors(data.ADC14) }]}>7</Text>
                        <Text style={[styles.dataText8, { backgroundColor: getColors(data.ADC32) }]}>8</Text>
                    </View>
                    <View>
                        <Text style={[styles.dataText9, { backgroundColor: getColors(data.ADC24) }]}>9</Text>
                        <Text style={[styles.dataText10, { backgroundColor: getColors(data.ADC34) }]}>10</Text>
                        <Text style={[styles.dataText11, { backgroundColor: getColors(data.ADC31) }]}>11</Text>
                        <Text style={[styles.dataText12, { backgroundColor: getColors(data.ADC33) }]}>12</Text>
                    </View>
                </View>
                
            </View> */}


            
            

        </View>
    )
}
export default History;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataWrapper: 
    { marginTop: -1 },
    row: 
    { height: 40, backgroundColor: '#E7E6E1' },
    image: {
        width: '60%',
        height: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    dataContainer: {
        flex: 1,
        //flexDirection: 'row',
        marginTop: 0,
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
        marginTop: -630,
        marginLeft: -50,
        padding: 2,
        borderWidth: 0.1,
        height: 35,
        width: 45,
    },
    dataText2: {
        borderWidth: 0.1,
        marginTop: 25,
        padding: 2,
        marginLeft: -120,
        height: 35,
        width: 45,
    },
    dataText4: {
        borderWidth: 0.1,
        marginTop: 40,
        padding: 2,
        marginLeft: -125,
        height: 35,
        width: 45,
    },
    dataText3: {
        borderWidth: 0.1,
        marginTop: -42,
        padding: 2,
        marginLeft: 50,
        height: 35,
        width: 45,
    },
    dataText5: {
        borderWidth: 0.1,
        marginTop: -510,
        padding: 2,
        marginLeft: 128,
        height: 35,
        width: 45,
    },
    dataText6: {
        borderWidth: 0.1,
        marginTop: -55,
        padding: 2,
        marginLeft: 200,
        height: 35,
        width: 45,
    },
    dataText7: {
        borderWidth: 0.1,
        marginTop: 60,
        padding: 2,
        marginLeft: 70,
        height: 35,
        width: 45,
    },
    dataText8: {
        borderWidth: 0.1,
        marginTop: -50,
        padding: 2,
        marginLeft: 170,
        height: 35,
        width: 45,
    },
    dataText9: {
        borderWidth: 0.1,
        marginTop: -250,
        padding: 2,
        marginLeft: 250,
        height: 35,
        width: 45,
    },
    dataText10: {
        borderWidth: 0.1,
        marginTop: 8,
        padding: 2,
        marginLeft: 200,
        height: 35,
        width: 45,
    },
    dataText11: {
        borderWidth: 0.1,
        marginTop: 5,
        padding: 2,
        marginLeft: 250,
        height: 35,
        width: 45,
    },
    dataText12: {
        borderWidth: 0.1,
        marginTop: 0,
        padding: 2,
        marginLeft: 150,
        height: 35,
        width: 45,
    },

})

// import React, { useState } from 'react'
// import { Button } from 'react-native'
// import DatePicker from 'react-native-date-picker'

// export default () => {
//   const [date, setDate] = useState(new Date())
//   const [open, setOpen] = useState(false)

//   return (
//     <>
//       <Button title="Open" onPress={() => setOpen(true)} />
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         onConfirm={(date) => {
//           setOpen(false)
//           setDate(date)
//         }}
//         onCancel={() => {
//           setOpen(false)
//         }}
//       />
//     </>
//   )
// }