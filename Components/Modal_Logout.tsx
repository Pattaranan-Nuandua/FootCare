import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const LogoutModal = ({ visible, onClose, onLogout }) => {
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.logoutButton]} onPress={onLogout}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        borderRadius: 5,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: 'lightgray',
    },
    logoutButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LogoutModal;
