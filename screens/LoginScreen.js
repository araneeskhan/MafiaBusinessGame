import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { Toast } from 'expo-toast';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const { dispatch, fetchPlayerData } = useGame();

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
            dispatch({ type: 'ADD_MONEY', payload: 100 });
            fetchPlayerData(user.uid);
            Toast.show('Login Successful', { duration: 2000 });
        } catch (error) {
            Toast.show(`Error: ${error.message}`, { duration: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#1a1a1a', '#333']} style={styles.container}>
            <Text style={styles.title}>Mafia Empire</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        color: '#fff',
    },
    button: {
        backgroundColor: '#c41e3a',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default LoginScreen; 