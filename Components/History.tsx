import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native'
import DatePicker from 'react-native-date-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { HeatMapGrid } from 'react-grid-heatmap'

const History = () => {
    //const Date = moment(new Date()).utc().format("MM/DD HH:mm");
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

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

        const response = await fetch('http://10.64.59.12:3001/show/index', {
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
            })
            .catch((error) => {
                console.log("Error: ", error)
            })

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
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 30, textAlign: 'center', color: '#000'}}>ประวัติ</Text>
            <Button title="ประวัติ" color={'#037A7E'} onPress={() => setOpen(true)}/>
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


            {/* <Text>ADC11: {data.ADC11}</Text>
            <Text>ADC12: {data.ADC12}</Text> */}
            {data.map((data, index) => {

                // const xLabels = [ "ADC11" , "ADC12","ADC13","ADC14","ADC15","ADC21","ADC22","ADC23","ADC24","ADC31","ADC32","ADC33","ADC34"];
                // const yLabels = data.date
                //const datenew = moment(data.date).format("YYYY-MM-DD hh:mm:ss ").slice(0, 10);
                // const timenew = (data.date).toLocaleString('it-IT').slice(10);
                // const datetimenew = (datenew+ " " +timenew);
                // He<atMap
                //     xLabels={ADC11,ADC12}
                //     yLabels={data.date}
                //     data={data}
                // >

                // </HeatMap>
                return (


                    <View key={index}>
                        <Text>ADC11: {data.ADC11}</Text>
                        <Text>ADC12: {data.ADC12}</Text>
                    </View>




                )
            })}


        </View>
    )
}
export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
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