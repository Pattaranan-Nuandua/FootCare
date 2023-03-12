import React, { useState, useEffect } from 'react';
import { View, StyleSheet,Text,Dimensions } from 'react-native';

const Active = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 30, textAlign: 'center', color: '#000'}}>
                จำนวนก้าวการเดิน
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 30,
    },
});

export default Active;
