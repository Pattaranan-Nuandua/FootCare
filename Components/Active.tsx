import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import * as d3 from 'd3';
import { Canvas, Path, Skia, useComputedValue, useFont, Text } from '@shopify/react-native-skia';
import { SelectList } from 'react-native-dropdown-select-list';
import axios from 'axios';
interface DataPoint {
    label: string;
    value: number;
    //picker: Array<{ label: string; value: number }>;
    //onSelect: (item: { label: string; value: string }) => void;
    //posts:any;
}

const GRAPH_MAGIN = 20;
const GRAPH_BAR_WIDTH = 9;
const CanvasHeight = 350;
const Canvaswidth = 400;
const graphHeight = CanvasHeight - 2 * GRAPH_MAGIN;
const graphWidth = Canvaswidth - 2;

const Active = () => {
    return (
        <View style={styles.container}>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    Text: {
        //fontWeight:"700",
        color: '#000',
        //textAlign:'center',
        //marginTop:200,
        //marginBottom:30,
    },
    canvas: {
        height: CanvasHeight,
        width: Canvaswidth,
    },
});

export default Active;
