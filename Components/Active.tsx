import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";



const Active = () => {
    const data = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                data: [3314, 3509, 4220, 3219, 4232, 4255, 4813]
            }
        ]
    };
    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
        //backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        //color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        color: (opacity = 1) => `rgba(0, 151, 156, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 60, textAlign: 'center', color: '#000' }}>
                จำนวนก้าวการเดิน
            </Text>
            <BarChart
                //style={graphStyle}
                data={data}
                width={screenWidth}
                height={240}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={15}
                style={{justifyContent:'center',marginTop:30}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default Active;
