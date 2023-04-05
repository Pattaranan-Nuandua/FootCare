import { Text } from '@react-native-material/core';
import * as React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Privacy = () => {
    return (
        <View style={styles.container}>
                <LinearGradient
                    colors={['#00979C', 'white']}
                    style={styles.container}>
                    <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 50, textAlign: 'center', color: '#000' }}>
                        Privacy
                    </Text>
                    <View>
                        <Text style={{ fontSize: 14, marginTop: 15, justifyContent: 'space-between', padding: 10 }}>
                            ข้อมูลส่วนตัวที่ระบุไว้ข้างต้นเป็นข้อมูลที่เป็นสิ่งสำคัญและเป็นความลับสำหรับผู้ใช้งานแอปพลิเคชัน
                            ดังนั้น เรามีนโยบายความเป็นส่วนตัวเพื่อให้ผู้ใช้งานมีความมั่นใจในการใช้บริการของเรา ดังนี้
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: -10, fontWeight: '500', justifyContent: 'space-between', padding: 10 }}>
                            การเก็บข้อมูลส่วนตัว
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: -15, justifyContent: 'space-between', padding: 10 }}>
                            เราจะเก็บข้อมูลส่วนตัวของผู้ใช้งานเพียงในกรณีที่มีการลงทะเบียนเข้าใช้งานแอปพลิเคชันของเรา ข้อมูลที่เราจะเก็บ
                            ได้แก่ email, username, ชื่อ-นามสกุล, น้ำหนัก, ส่วนสูง, รหัสผ่าน, เพศ, อาการป่วยเบื้องต้น ซึ่งเป็นข้อมูลที่ผู้ใช้งานได้ให้มาเอง
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: -10, fontWeight: '500', justifyContent: 'space-between', padding: 10 }}>
                            วัตถุประสงค์ในการใช้ข้อมูลส่วนตัว
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: -15, justifyContent: 'space-between', padding: 10 }}>
                            เราจะใช้ข้อมูลส่วนตัวของผู้ใช้งานเพื่อเป้าหมายเพื่อการพัฒนาและปรับปรุงแอปพลิเคชันของเรา เช่น
                            การวิเคราะห์และปรับปรุงประสิทธิภาพของแอปพลิเคชัน และพัฒนาคุณภาพบริการ
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: -10, fontWeight: '500', justifyContent: 'space-between', padding: 10 }}>
                            การเปิดเผยข้อมูลส่วนตัว
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: -15, justifyContent: 'space-between', padding: 10 }}>
                            เราจะไม่เปิดเผยข้อมูลส่วนตัวของผู้ใช้งานให้แก่บุคคลภายนอก เว้นแต่จะมีคำขอจากผู้ใช้งาน หรือเราจะเปิดเผยข้อมูลในกรณีที่ผู้ใช้งานให้ความยินยอม
                            หรือเมื่อเราต้องการเปิดเผยข้อมูลเพื่อปฏิบัติตามกฎหมายหรือข้อบังคับของหน่วยงานหรือบริษัทที่ดูแลและเก็บรักษาข้อมูลส่วนตัวของผู้ใช้งานต้องปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
                            และข้อบังคับที่เกี่ยวข้องกับการเก็บรักษาและใช้งานข้อมูลส่วนตัว ดังนั้นหากไม่มีคำขอจากผู้ใช้งานหรือไม่ได้รับความยินยอมจากผู้ใช้งาน
                            หน่วยงานหรือบริษัทจะไม่สามารถเปิดเผยข้อมูลส่วนตัวของผู้ใช้งานให้แก่บุคคลภายนอกได้โดยอัตโนมัติ โดยจะต้องมีเหตุจำเป็นตามกฎหมายหรือข้อบังคับที่กำหนดไว้เท่านั้น
                            และการเปิดเผยข้อมูลในกรณีที่จำเป็นต้องทำเพื่อปฏิบัติตามกฎหมายหรือข้อบังคับจะต้องเป็นไปตามข้อกำหนดและวิธีการที่กำหนดไว้ในกฎหมายหรือข้อบังคับนั้น
                            ดังนั้นหากมีเหตุจำเป็นที่จะต้องเปิดเผยข้อมูลส่วนตัวของผู้ใช้งาน หน่วยงานหรือบริษัทจะต้องปฏิบัติตามข้อกำหนดและวิธีการที่กำหนดไว้ในกฎหมายหรือข้อบังคับนั้นๆ
                            โดยมีการแจ้งให้ผู้ใช้งานทราบถึงเหตุผลและขอบเขตการเปิดเผยข้อมูลในขณะที่สิทธิ์ความเป็นส่วนตัวของผู้ใช้งานถูกคุ้มครองอย่างเหมาะสม
                        </Text>
                    </View>
                </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        flex: 1,
    },
})

export default Privacy;