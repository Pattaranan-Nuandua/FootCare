import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { scaleLinear } from 'd3-scale';

const BarChart = () => {
    const colorScale = scaleLinear()
        .domain([0, 6000, 12000, 18000, 24000, 30000])
        .range(['#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF5722']);

    const data = [
        { label: '0', value: 0 },
        { label: '6000', value: 6000 },
        { label: '12000', value: 12000 },
        { label: '18000', value: 18000 },
        { label: '24000', value: 24000 },
        { label: '30000', value: 30000 },
    ];

    return (
        <View style={styles.container}>
            {data.map((d, i) => (
                <View key={i} style={[styles.bar, { backgroundColor: colorScale(d.value) }]}>
                    <View style={[styles.colorBar, { backgroundColor: colorScale(d.value) }]} />
                    <Text style={styles.label}>{d.label}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    bar: {
        flex: 1,
        height: 20,
        marginHorizontal: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.2,
    },
    label: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
        zIndex: 1,
    },
});

export default BarChart;
