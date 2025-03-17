import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = () => {
    const { state, logout } = useGame();
    const { user } = useAuth();

    const handleLogout = () => {
        logout(state.userId);
    };

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.container}>
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={styles.overlay}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome to Mafia Empire!</Text>
                    <Text style={styles.subtitle}>Current Money: ${state.resources.money}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to Resource Management */}}>
                        <Text style={styles.buttonText}>Manage Resources</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to Building Management */}}>
                        <Text style={styles.buttonText}>Manage Buildings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {/* Navigate to Gang Management */}}>
                        <Text style={styles.buttonText}>Manage Gang</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: '#c41e3a',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HomeScreen; 