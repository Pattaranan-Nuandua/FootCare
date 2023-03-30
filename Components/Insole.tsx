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
    const { data3 } = useContext(MyContext);

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
        const response = await fetch('http://10.64.59.12:3001/add/index', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ ...data }),
        })
        const index = await response.json()
        console.log(index);
    }
    //detected การเดิน ยืน นั่ง
    let walk=0;
    const Detected=()=>{
  if(data3.length === 3){
    if(parseInt(data3[0].ADC33) >= 12000 && parseInt(data3[0].ADC31) >= 12000 && parseInt(data3[0].ADC34) >= 10000 ){

        if(
          parseInt(data3[1].ADC11) >= 10000 &&
          parseInt(data3[1].ADC12) >= 10000 &&
          parseInt(data3[1].ADC13) >= 10000 &&
          parseInt(data3[1].ADC14) >= 10000 &&
          parseInt(data3[1].ADC21) >= 10000 &&
          parseInt(data3[1].ADC22) >= 10000 &&
          parseInt(data3[1].ADC23) >= 10000 &&
          parseInt(data3[1].ADC24) >= 10000 &&
          parseInt(data3[1].ADC31) >= 10000 &&
          parseInt(data3[1].ADC32) >= 10000 &&
          parseInt(data3[1].ADC33) >= 10000 &&
          parseInt(data3[1].ADC34) >= 10000)
          {
            return walk+=1;
          }
        else if(
          parseInt(data3[1].ADC11) >= 10000 &&
          parseInt(data3[1].ADC12) >= 10000 &&
          parseInt(data3[1].ADC13) >= 10000 &&
          parseInt(data3[1].ADC14) >= 10000 &&
          parseInt(data3[1].ADC22) >= 10000 &&
          parseInt(data3[1].ADC23) >= 10000 &&
          parseInt(data3[1].ADC24) >= 10000 &&
          parseInt(data3[1].ADC31) >= 10000 &&
          parseInt(data3[1].ADC33) >= 10000 &&
          parseInt(data3[1].ADC34) >= 10000
        ){
          return walk+=1;
        }
        else if(
          parseInt(data3[1].ADC11) >= 10000 &&
          parseInt(data3[1].ADC12) >= 10000 &&
          parseInt(data3[1].ADC13) >= 10000 &&
          parseInt(data3[1].ADC14) >= 10000 &&
          parseInt(data3[1].ADC22) >= 10000 &&
          parseInt(data3[1].ADC31) >= 10000 &&
          parseInt(data3[1].ADC32) >= 10000 &&
          parseInt(data3[1].ADC33) >= 10000 &&
          parseInt(data3[1].ADC34) >= 10000
        ){
          return walk+=1;
        }
        else if(
          parseInt(data3[2].ADC11) >= 10000 &&
          parseInt(data3[2].ADC12) >= 10000 &&
          parseInt(data3[2].ADC13) >= 12000 &&
          parseInt(data3[2].ADC14) >= 10000 &&
          parseInt(data3[2].ADC21) >= 12000 &&
          parseInt(data3[2].ADC23) >= 10000 
          
        ){
          return walk+=1;
        }

        if(walk >= 2){
            return 'กำลังเดิน';
        }
    }
    else if(
        parseInt(data3[0].ADC11) >= 10000 &&  parseInt(data3[0].ADC11) <= 20000||
        parseInt(data3[0].ADC12) >= 10000 &&  parseInt(data3[0].ADC12) <= 20000||
        parseInt(data3[0].ADC13) >= 10000 &&  parseInt(data3[0].ADC13) <= 20000 ||
        parseInt(data3[0].ADC14) >= 10000 &&  parseInt(data3[0].ADC14) <= 20000||
        parseInt(data3[0].ADC21) >= 10000 &&  parseInt(data3[0].ADC21) <= 20000 ||
        parseInt(data3[0].ADC22) >= 10000 &&  parseInt(data3[0].ADC22) <= 20000||
        parseInt(data3[0].ADC23) >= 10000 &&  parseInt(data3[0].ADC23) <= 20000||
        parseInt(data3[0].ADC24) >= 10000 &&  parseInt(data3[0].ADC24) <= 20000||
        parseInt(data3[0].ADC31) >= 10000 &&  parseInt(data3[0].ADC31) <= 20000||
        parseInt(data3[0].ADC32) >= 10000 &&  parseInt(data3[0].ADC32) <= 20000||
        parseInt(data3[0].ADC33) >= 10000 &&  parseInt(data3[0].ADC33) <= 20000||
        parseInt(data3[0].ADC33) >= 10000 &&  parseInt(data3[0].ADC33) <= 20000||
        parseInt(data3[0].ADC34) >= 10000 &&  parseInt(data3[0].ADC34) <= 20000||
        parseInt(data3[1].ADC11) >= 10000 &&  parseInt(data3[1].ADC11) <= 20000||
        parseInt(data3[1].ADC12) >= 10000 &&  parseInt(data3[1].ADC12) <= 20000||
        parseInt(data3[1].ADC13) >= 10000 &&  parseInt(data3[1].ADC13) <= 20000||
        parseInt(data3[1].ADC14) >= 10000 &&  parseInt(data3[1].ADC14) <= 20000||
        parseInt(data3[1].ADC21) >= 10000 &&  parseInt(data3[1].ADC21) <= 20000 ||
        parseInt(data3[1].ADC22) >= 10000 &&  parseInt(data3[1].ADC22) <= 20000||
        parseInt(data3[1].ADC23) >= 10000 &&  parseInt(data3[1].ADC23) <= 20000||
        parseInt(data3[1].ADC24) >= 10000 &&  parseInt(data3[1].ADC24) <= 20000||
        parseInt(data3[1].ADC31) >= 10000 &&  parseInt(data3[1].ADC31) <= 20000||
        parseInt(data3[1].ADC32) >= 10000 &&  parseInt(data3[1].ADC32) <= 20000||
        parseInt(data3[1].ADC33) >= 10000 &&  parseInt(data3[1].ADC33) <= 20000||
        parseInt(data3[1].ADC34) >= 10000 &&  parseInt(data3[1].ADC34) <= 20000||
        parseInt(data3[1].ADC11) >= 10000 &&  parseInt(data3[1].ADC11) <= 20000||
        parseInt(data3[2].ADC12) >= 10000 &&  parseInt(data3[2].ADC12) <= 20000||
        parseInt(data3[2].ADC13) >= 10000 &&  parseInt(data3[2].ADC13) <= 20000||
        parseInt(data3[2].ADC14) >= 10000 &&  parseInt(data3[2].ADC14) <= 20000||
        parseInt(data3[2].ADC21) >= 10000 &&  parseInt(data3[2].ADC21) <= 20000 ||
        parseInt(data3[2].ADC22) >= 10000 && parseInt(data3[2].ADC22) <= 20000||
        parseInt(data3[2].ADC23) >= 10000 &&  parseInt(data3[2].ADC23) <= 20000||
        parseInt(data3[2].ADC24) >= 10000 &&  parseInt(data3[2].ADC24) <= 20000||
        parseInt(data3[2].ADC31) >= 10000 && parseInt(data3[2].ADC31) <= 20000||
        parseInt(data3[2].ADC32) >= 10000 && parseInt(data3[2].ADC32) <= 20000||
        parseInt(data3[2].ADC33) >= 10000 && parseInt(data3[2].ADC33) <= 20000||
        parseInt(data3[2].ADC34) >= 10000 && parseInt(data3[2].ADC34) <= 20000)
      {
        return 'กำลังยืน';
      }

      else if(
        parseInt(data3[0].ADC11) >= 10000 &&  parseInt(data3[0].ADC11) <= 12000||
        parseInt(data3[0].ADC12) >= 6000 &&  parseInt(data3[0].ADC12) <= 12000||
        parseInt(data3[0].ADC13) >= 6000 &&  parseInt(data3[0].ADC13) <= 12000 ||
        parseInt(data3[0].ADC14) >= 6000 &&  parseInt(data3[0].ADC14) <= 12000||
        parseInt(data3[0].ADC21) >= 6000 &&  parseInt(data3[0].ADC21) <= 12000 ||
        parseInt(data3[0].ADC22) >= 6000 &&  parseInt(data3[0].ADC22) <= 12000||
        parseInt(data3[0].ADC23) >= 6000 &&  parseInt(data3[0].ADC23) <= 12000||
        parseInt(data3[0].ADC24) >= 6000 &&  parseInt(data3[0].ADC24) <= 12000||
        parseInt(data3[0].ADC31) >= 6000 &&  parseInt(data3[0].ADC31) <= 12000||
        parseInt(data3[0].ADC32) >= 6000 &&  parseInt(data3[0].ADC32) <= 12000||
        parseInt(data3[0].ADC33) >= 6000 &&  parseInt(data3[0].ADC33) <= 12000||
        parseInt(data3[0].ADC33) >= 6000 &&  parseInt(data3[0].ADC33) <= 12000||
        parseInt(data3[0].ADC34) >= 6000 &&  parseInt(data3[0].ADC34) <= 12000||
        parseInt(data3[1].ADC11) >= 6000 &&  parseInt(data3[1].ADC11) <= 12000||
        parseInt(data3[1].ADC12) >= 6000 &&  parseInt(data3[1].ADC12) <= 12000||
        parseInt(data3[1].ADC13) >= 6000 &&  parseInt(data3[1].ADC13) <= 12000||
        parseInt(data3[1].ADC14) >= 6000 &&  parseInt(data3[1].ADC14) <= 12000||
        parseInt(data3[1].ADC21) >= 6000 &&  parseInt(data3[1].ADC21) <= 12000 ||
        parseInt(data3[1].ADC22) >= 6000 &&  parseInt(data3[1].ADC22) <= 12000||
        parseInt(data3[1].ADC23) >= 6000 &&  parseInt(data3[1].ADC23) <= 12000||
        parseInt(data3[1].ADC24) >= 6000 &&  parseInt(data3[1].ADC24) <= 12000||
        parseInt(data3[1].ADC31) >= 6000 &&  parseInt(data3[1].ADC31) <= 12000||
        parseInt(data3[1].ADC32) >= 6000 &&  parseInt(data3[1].ADC32) <= 12000||
        parseInt(data3[1].ADC33) >= 6000 &&  parseInt(data3[1].ADC33) <= 12000||
        parseInt(data3[1].ADC34) >= 6000 &&  parseInt(data3[1].ADC34) <= 12000||
        parseInt(data3[1].ADC11) >= 6000 &&  parseInt(data3[1].ADC11) <= 12000||
        parseInt(data3[2].ADC12) >= 6000 &&  parseInt(data3[2].ADC12) <= 12000||
        parseInt(data3[2].ADC13) >= 6000 &&  parseInt(data3[2].ADC13) <= 12000||
        parseInt(data3[2].ADC14) >= 6000 &&  parseInt(data3[2].ADC14) <= 12000||
        parseInt(data3[2].ADC21) >= 6000 &&  parseInt(data3[2].ADC21) <= 12000 ||
        parseInt(data3[2].ADC22) >= 6000 && parseInt(data3[2].ADC22) <= 12000||
        parseInt(data3[2].ADC23) >= 6000 &&  parseInt(data3[2].ADC23) <= 12000||
        parseInt(data3[2].ADC24) >= 6000 &&  parseInt(data3[2].ADC24) <= 12000||
        parseInt(data3[2].ADC31) >= 6000 && parseInt(data3[2].ADC31) <= 12000||
        parseInt(data3[2].ADC32) >= 6000 && parseInt(data3[2].ADC32) <= 12000||
        parseInt(data3[2].ADC33) >= 6000 && parseInt(data3[2].ADC33) <= 12000||
        parseInt(data3[2].ADC34) >= 6000 && parseInt(data3[2].ADC34) <= 12000
      )
  {
    return 'กำลังนั่ง';
  }
//   else if(
//     parseInt(data3[0].ADC11) >= 10000 &&
//     parseInt(data3[0].ADC12) >= 10000 &&
//     parseInt(data3[0].ADC13) >= 10000 &&
//     parseInt(data3[0].ADC14) >= 10000 &&
//     parseInt(data3[0].ADC22) >= 10000 &&
//     parseInt(data3[0].ADC23) >= 10000 &&
//     parseInt(data3[0].ADC24) >= 10000 &&
//     parseInt(data3[0].ADC31) >= 10000 &&
//     parseInt(data3[0].ADC33) >= 10000 &&
//     parseInt(data3[0].ADC34) >= 10000 &&
//     parseInt(data3[1].ADC11) >= 10000 &&
//     parseInt(data3[1].ADC12) >= 10000 &&
//     parseInt(data3[1].ADC13) >= 10000 &&
//     parseInt(data3[1].ADC14) >= 10000 &&
//     parseInt(data3[1].ADC22) >= 10000 &&
//     parseInt(data3[1].ADC23) >= 10000 &&
//     parseInt(data3[1].ADC24) >= 10000 &&
//     parseInt(data3[1].ADC31) >= 10000 &&
//     parseInt(data3[1].ADC33) >= 10000 &&
//     parseInt(data3[1].ADC34) >= 10000 &&
//     parseInt(data3[2].ADC11) >= 10000 &&
//     parseInt(data3[2].ADC12) >= 10000 &&
//     parseInt(data3[2].ADC13) >= 10000 &&
//     parseInt(data3[2].ADC14) >= 10000 &&
//     parseInt(data3[2].ADC22) >= 10000 &&
//     parseInt(data3[2].ADC23) >= 10000 &&
//     parseInt(data3[2].ADC24) >= 10000 &&
//     parseInt(data3[2].ADC31) >= 10000 &&
//     parseInt(data3[2].ADC33) >= 10000 &&
//     parseInt(data3[2].ADC34) >= 10000 
//   ){
//      return 'กำลังยืน';
//    }else if(
//     parseInt(data3[0].ADC11) >= 10000 &&
//     parseInt(data3[0].ADC12) >= 10000 &&
//     parseInt(data3[0].ADC13) >= 10000 &&
//     parseInt(data3[0].ADC14) >= 10000 &&
//     parseInt(data3[0].ADC22) >= 10000 &&
//     parseInt(data3[0].ADC31) >= 10000 &&
//     parseInt(data3[0].ADC32) >= 10000 &&
//     parseInt(data3[0].ADC33) >= 10000 &&
//     parseInt(data3[0].ADC34) >= 10000 &&
//     parseInt(data3[1].ADC11) >= 10000 &&
//     parseInt(data3[1].ADC12) >= 10000 &&
//     parseInt(data3[1].ADC13) >= 10000 &&
//     parseInt(data3[1].ADC14) >= 10000 &&
//     parseInt(data3[1].ADC22) >= 10000 &&
//     parseInt(data3[1].ADC31) >= 10000 &&
//     parseInt(data3[1].ADC32) >= 10000 &&
//     parseInt(data3[1].ADC33) >= 10000 &&
//     parseInt(data3[1].ADC34) >= 10000 &&
//     parseInt(data3[1].ADC11) >= 10000 &&
//     parseInt(data3[2].ADC12) >= 10000 &&
//     parseInt(data3[2].ADC13) >= 10000 &&
//     parseInt(data3[2].ADC14) >= 10000 &&
//     parseInt(data3[2].ADC22) >= 10000 &&
//     parseInt(data3[2].ADC31) >= 10000 &&
//     parseInt(data3[2].ADC32) >= 10000 &&
//     parseInt(data3[2].ADC33) >= 10000 &&
//     parseInt(data3[2].ADC34) >= 10000
//     ){
// return 'กำลังยืน';
//} 
// else if(
//     parseInt(data3[0].ADC11) >= 10000 &&  parseInt(data3[0].ADC11) <= 20000||
//     parseInt(data3[0].ADC12) >= 10000 &&  parseInt(data3[0].ADC12) <= 20000||
//     parseInt(data3[0].ADC13) >= 10000 &&  parseInt(data3[0].ADC13) <= 20000 ||
//     parseInt(data3[0].ADC14) >= 10000 &&  parseInt(data3[0].ADC14) <= 20000||
//     parseInt(data3[0].ADC21) >= 10000 &&  parseInt(data3[0].ADC21) <= 20000 ||
//     parseInt(data3[0].ADC22) >= 10000 &&  parseInt(data3[0].ADC22) <= 20000||
//     parseInt(data3[0].ADC23) >= 10000 &&  parseInt(data3[0].ADC23) <= 20000||
//     parseInt(data3[0].ADC24) >= 10000 &&  parseInt(data3[0].ADC24) <= 20000||
//     parseInt(data3[0].ADC31) >= 10000 &&  parseInt(data3[0].ADC31) <= 20000||
//     parseInt(data3[0].ADC32) >= 10000 &&  parseInt(data3[0].ADC32) <= 20000||
//     parseInt(data3[0].ADC33) >= 10000 &&  parseInt(data3[0].ADC33) <= 20000||
//     parseInt(data3[0].ADC33) >= 10000 &&  parseInt(data3[0].ADC33) <= 20000||
//     parseInt(data3[0].ADC34) >= 10000 &&  parseInt(data3[0].ADC34) <= 20000||
//     parseInt(data3[1].ADC11) >= 10000 &&  parseInt(data3[1].ADC11) <= 20000||
//     parseInt(data3[1].ADC12) >= 10000 &&  parseInt(data3[1].ADC12) <= 20000||
//     parseInt(data3[1].ADC13) >= 10000 &&  parseInt(data3[1].ADC13) <= 20000||
//     parseInt(data3[1].ADC14) >= 10000 &&  parseInt(data3[1].ADC14) <= 20000||
//     parseInt(data3[1].ADC21) >= 10000 &&  parseInt(data3[1].ADC21) <= 20000 ||
//     parseInt(data3[1].ADC22) >= 10000 &&  parseInt(data3[1].ADC22) <= 20000||
//     parseInt(data3[1].ADC23) >= 10000 &&  parseInt(data3[1].ADC23) <= 20000||
//     parseInt(data3[1].ADC24) >= 10000 &&  parseInt(data3[1].ADC24) <= 20000||
//     parseInt(data3[1].ADC31) >= 10000 &&  parseInt(data3[1].ADC31) <= 20000||
//     parseInt(data3[1].ADC32) >= 10000 &&  parseInt(data3[1].ADC32) <= 20000||
//     parseInt(data3[1].ADC33) >= 10000 &&  parseInt(data3[1].ADC33) <= 20000||
//     parseInt(data3[1].ADC34) >= 10000 &&  parseInt(data3[1].ADC34) <= 20000||
//     parseInt(data3[1].ADC11) >= 10000 &&  parseInt(data3[1].ADC11) <= 20000||
//     parseInt(data3[2].ADC12) >= 10000 &&  parseInt(data3[2].ADC12) <= 20000||
//     parseInt(data3[2].ADC13) >= 10000 &&  parseInt(data3[2].ADC13) <= 20000||
//     parseInt(data3[2].ADC14) >= 10000 &&  parseInt(data3[2].ADC14) <= 20000||
//     parseInt(data3[2].ADC21) >= 10000 &&  parseInt(data3[2].ADC21) <= 20000 ||
//     parseInt(data3[2].ADC22) >= 10000 && parseInt(data3[2].ADC22) <= 20000||
//     parseInt(data3[2].ADC23) >= 10000 &&  parseInt(data3[2].ADC23) <= 20000||
//     parseInt(data3[2].ADC24) >= 10000 &&  parseInt(data3[2].ADC24) <= 20000||
//     parseInt(data3[2].ADC31) >= 10000 && parseInt(data3[2].ADC31) <= 20000||
//     parseInt(data3[2].ADC32) >= 10000 && parseInt(data3[2].ADC32) <= 20000||
//     parseInt(data3[2].ADC33) >= 10000 && parseInt(data3[2].ADC33) <= 20000||
//     parseInt(data3[2].ADC34) >= 10000 && parseInt(data3[2].ADC34) <= 20000)
//   {
//     return 'กำลังยืน';
//   }
//   }else if(
//     parseInt(data3[0].ADC11) <= 10000 ||
//     parseInt(data3[0].ADC12) <= 10000 ||
//     parseInt(data3[0].ADC13) <= 10000 ||
//     parseInt(data3[0].ADC14) <= 10000 ||
//     parseInt(data3[0].ADC22) <= 10000 ||
//     parseInt(data3[0].ADC23) <= 10000 ||
//     parseInt(data3[0].ADC24) <= 10000 ||
//      parseInt(data3[0].ADC31) <= 10000 ||
//      parseInt(data3[0].ADC33) <= 10000 ||
//      parseInt(data3[0].ADC34) <= 10000 ||
//      parseInt(data3[1].ADC11) <= 10000 ||
//      parseInt(data3[1].ADC12) <= 10000 ||
//      parseInt(data3[1].ADC13) <= 10000 ||
//      parseInt(data3[1].ADC14) <= 10000 ||
//      parseInt(data3[1].ADC22) <= 10000 ||
//      parseInt(data3[1].ADC23) <= 10000 ||
//      parseInt(data3[1].ADC24) <= 10000 ||
//      parseInt(data3[1].ADC31) <= 10000 ||
//      parseInt(data3[1].ADC33) <= 10000 ||
//      parseInt(data3[1].ADC34) <= 10000 ||
//      parseInt(data3[2].ADC11) <= 10000 ||
//      parseInt(data3[2].ADC12) <= 10000 ||
//      parseInt(data3[2].ADC13) <= 10000 ||
//      parseInt(data3[2].ADC14) <= 10000 ||
//      parseInt(data3[2].ADC22) <= 10000 ||
//      parseInt(data3[2].ADC23) <= 10000 ||
//      parseInt(data3[2].ADC24) <= 10000 ||
//      parseInt(data3[2].ADC31) <= 10000 ||
//      parseInt(data3[2].ADC33) <= 10000 ||
//      parseInt(data3[2].ADC34) <= 10000 
//    ){
//       return 'กำลังนั่ง';
//     }else if(
//       parseInt(data3[0].ADC11) >= 6000 &&  parseInt(data3[0].ADC11) <= 12000||
//       parseInt(data3[0].ADC12) >= 6000 &&  parseInt(data3[0].ADC12) <= 12000||
//       parseInt(data3[0].ADC13) >= 6000 &&  parseInt(data3[0].ADC13) <= 12000 ||
//       parseInt(data3[0].ADC14) >= 6000 &&  parseInt(data3[0].ADC14) <= 12000||
//       parseInt(data3[0].ADC22) >= 6000 &&  parseInt(data3[0].ADC22) <= 12000||
//       parseInt(data3[0].ADC31) >= 6000 &&  parseInt(data3[0].ADC31) <= 12000||
//       parseInt(data3[0].ADC32) >= 6000 &&  parseInt(data3[0].ADC32) <= 12000||
//       parseInt(data3[0].ADC33) >= 6000 &&  parseInt(data3[0].ADC33) <= 12000||
//       parseInt(data3[0].ADC33) >= 6000 &&  parseInt(data3[0].ADC33) <= 12000||
//       parseInt(data3[0].ADC34) >= 6000 &&  parseInt(data3[0].ADC34) <= 12000||
//       parseInt(data3[1].ADC11) >= 6000 &&  parseInt(data3[1].ADC11) <= 12000||
//       parseInt(data3[1].ADC12) >= 6000 &&  parseInt(data3[1].ADC12) <= 12000||
//       parseInt(data3[1].ADC13) >= 6000 &&  parseInt(data3[1].ADC13) <= 12000||
//       parseInt(data3[1].ADC14) >= 6000 &&  parseInt(data3[1].ADC14) <= 12000||
//       parseInt(data3[1].ADC22) >= 6000 &&  parseInt(data3[1].ADC22) <= 12000||
//       parseInt(data3[1].ADC31) >= 6000 &&  parseInt(data3[1].ADC31) <= 12000||
//       parseInt(data3[1].ADC32) >= 6000 &&  parseInt(data3[1].ADC32) <= 12000||
//       parseInt(data3[1].ADC33) >= 6000 &&  parseInt(data3[1].ADC33) <= 12000||
//       parseInt(data3[1].ADC34) >= 6000 &&  parseInt(data3[1].ADC34) <= 12000||
//       parseInt(data3[1].ADC11) >= 6000 &&  parseInt(data3[1].ADC11) <= 12000||
//       parseInt(data3[2].ADC12) >= 6000 &&  parseInt(data3[2].ADC12) <= 12000||
//       parseInt(data3[2].ADC13) >= 6000 &&  parseInt(data3[2].ADC13) <= 12000||
//       parseInt(data3[2].ADC14) >= 6000 &&  parseInt(data3[2].ADC14) <= 12000||
//       parseInt(data3[2].ADC22) >= 6000 && parseInt(data3[2].ADC22) <= 12000||
//       parseInt(data3[2].ADC31) >= 6000 && parseInt(data3[2].ADC31) <= 12000||
//       parseInt(data3[2].ADC32) >= 6000 && parseInt(data3[2].ADC32) <= 12000||
//       parseInt(data3[2].ADC33) >= 6000 && parseInt(data3[2].ADC33) <= 12000||
//       parseInt(data3[2].ADC34) >= 6000 && parseInt(data3[2].ADC34) <= 12000
//       )
//         return 'กำลังนั่ง';
    //   } else if (
    //     parseInt(data.ADC11) <= 0 &&
    //     parseInt(data.ADC12) <= 0 &&
    //     parseInt(data.ADC13) <= 0 &&
    //     parseInt(data.ADC14) <= 0 &&
    //     parseInt(data.ADC21) <= 0 &&
    //     parseInt(data.ADC22) <= 0 &&
    //     parseInt(data.ADC23) <= 0 &&
    //     parseInt(data.ADC24) <= 0 &&
    //     parseInt(data.ADC31) <= 0 &&
    //     parseInt(data.ADC32) <= 0 &&
    //     parseInt(data.ADC33) <= 0 &&
    //     parseInt(data.ADC34) <= 0
    //     ){
    //     return 'ไม่มีการลงน้ำหนักเท้า';
    // } 
        else if(
        parseInt(data3[0].ADC11) <= 10 &&
        parseInt(data3[0].ADC12) <= 10 &&
        parseInt(data3[0].ADC13) <= 10 &&
        parseInt(data3[0].ADC14) <= 10 &&
        parseInt(data3[0].ADC21) <= 10 &&
        parseInt(data3[0].ADC22) <= 10 &&
        parseInt(data3[0].ADC23) <= 10 &&
        parseInt(data3[0].ADC24) <= 10 &&
        parseInt(data3[0].ADC31) <= 10 &&
        parseInt(data3[0].ADC32) <= 10 &&
        parseInt(data3[0].ADC33) <= 10 &&
        parseInt(data3[0].ADC34) <= 10 &&
        parseInt(data3[1].ADC11) <= 10 &&
        parseInt(data3[1].ADC12) <= 10 &&
        parseInt(data3[1].ADC13) <= 10 &&
        parseInt(data3[1].ADC14) <= 10 &&
        parseInt(data3[1].ADC21) <= 10 &&
        parseInt(data3[1].ADC22) <= 10 &&
        parseInt(data3[1].ADC23) <= 10 &&
        parseInt(data3[1].ADC24) <= 10 &&
        parseInt(data3[1].ADC31) <= 10 &&
        parseInt(data3[1].ADC32) <= 10 &&
        parseInt(data3[1].ADC33) <= 10 &&
        parseInt(data3[1].ADC34) <= 10 &&
        parseInt(data3[2].ADC11) <= 10 &&
        parseInt(data3[2].ADC12) <= 10 &&
        parseInt(data3[2].ADC13) <= 10 &&
        parseInt(data3[2].ADC14) <= 10 &&
        parseInt(data3[2].ADC21) <= 10 &&
        parseInt(data3[2].ADC22) <= 10 &&
        parseInt(data3[2].ADC23) <= 10 &&
        parseInt(data3[2].ADC24) <= 10 &&
        parseInt(data3[2].ADC31) <= 10 &&
        parseInt(data3[2].ADC32) <= 10 &&
        parseInt(data3[2].ADC33) <= 10 &&
        parseInt(data3[2].ADC34) <= 10
    ){
        return 'ไม่มีการเคลื่อนไหว';
    }
      else{
        return 'ไม่มีข้อมูล';
      }
}
}


// }
    
    //const { data } = useContext(MyContext);
    
    const checkFoot = () => {
        if (
            parseInt(data.ADC11) >= 6000 &&
            parseInt(data.ADC12) >= 6000 &&
            parseInt(data.ADC13) >= 6000 &&
            parseInt(data.ADC14) >= 6000 &&
            parseInt(data.ADC21) >= 6000 &&
            parseInt(data.ADC22) >= 6000 &&
            parseInt(data.ADC23) >= 6000 &&
            parseInt(data.ADC24) >= 6000 &&
            parseInt(data.ADC31) >= 6000 &&
            parseInt(data.ADC32) >= 6000 &&
            parseInt(data.ADC33) >= 6000 &&
            parseInt(data.ADC34) >= 6000
        ) {
            return 'เท้าแบน';
        } else if (
            //parseInt(data.ADC21) <= 1000 &&
            parseInt(data.ADC11) <= 10000 && parseInt(data.ADC11) >= 3000 ||
            parseInt(data.ADC12) <= 10000 && parseInt(data.ADC12) >= 3000 ||
            parseInt(data.ADC13) <= 10000 && parseInt(data.ADC13) >= 3000 ||
            parseInt(data.ADC14) <= 10000 && parseInt(data.ADC14) >= 3000 ||
            parseInt(data.ADC22) <= 10000 && parseInt(data.ADC22) >= 3000 ||
            parseInt(data.ADC23) <= 10000 && parseInt(data.ADC23) >= 3000 ||
            parseInt(data.ADC24) <= 10000 && parseInt(data.ADC24) >= 3000 ||
            parseInt(data.ADC31) <= 10000 && parseInt(data.ADC31) >= 3000 ||
            parseInt(data.ADC33) <= 10000 && parseInt(data.ADC33) >= 3000 ||
            parseInt(data.ADC34) <= 10000 && parseInt(data.ADC34) >= 3000
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
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 60, textAlign: 'center', color: '#000' }}>Heatmap</Text>
            <TouchableOpacity
                style={styles.history}
                onPress={() => navigation.navigate('History')}
            >
                <Text style={{ color: '#037A7E',fontSize:16 }}>ประวัติ</Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 40, marginLeft: 30, fontWeight: '300' }} >ลักษณะการลงน้ำหนัก: {checkFoot()}</Text>
            <Text style={{ marginTop: 40, marginLeft: 30, fontWeight: '300' }} >Now: {Detected()}</Text>
            <Image source={{ uri: logo }}
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
                <BarChart />
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    history: {
        marginTop: -22,
        marginLeft: 340,
    },
    image: {
        width: '85%',
        height: '61%',
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
        backgroundColor: '#FFF',
        //marginTop: 30,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
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
        marginTop: -500,
        marginLeft: 120,
        padding: 2,
        borderWidth: 0.1,
        height: 35,
        width: 45,
    },
    dataText2: {
        borderWidth: 0.1,
        marginTop: 0,
        padding: 2,
        marginLeft: 220,
        height: 35,
        width: 45,
    },
    dataText3: {
        borderWidth: 0.1,
        marginTop: 10,
        padding: 2,
        marginLeft: 260,
        height: 35,
        width: 45,
    },
    dataText4: {
        borderWidth: 0.1,
        marginTop: -50,
        padding: 2,
        marginLeft: 110,
        height: 35,
        width: 45,
    },
    dataText5: {
        borderWidth: 0.1,
        marginTop: -375,
        padding: 2,
        marginLeft: 220,
        height: 35,
        width: 45,
    },
    dataText6: {
        borderWidth: 0.1,
        marginTop: 20,
        padding: 2,
        marginLeft: 260,
        height: 35,
        width: 45,
    },
    dataText7: {
        borderWidth: 0.1,
        marginTop: -45,
        padding: 2,
        marginLeft: 200,
        height: 35,
        width: 45,
    },
    dataText8: {
        borderWidth: 0.1,
        marginTop: 15,
        padding: 2,
        marginLeft: 220,
        height: 35,
        width: 45,
    },
    dataText9: {
        borderWidth: 0.1,
        marginTop: -235,
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
        marginTop: 10,
        padding: 2,
        marginLeft: 250,
        height: 35,
        width: 45,
    },
    dataText12: {
        borderWidth: 0.1,
        marginTop: 10,
        padding: 2,
        marginLeft: 230,
        height: 35,
        width: 45,
    },

});

export default Insole;
