import { Text } from '@react-native-material/core';
import * as React from 'react';
import { SafeAreaView,StyleSheet,Dimensions } from 'react-native';

const Privacy =()=>{
    return(
        <SafeAreaView style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 10, textAlign: 'center', color: '#000'}}>
                Privacy
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
})

export default Privacy;