import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../contexts/AuthContext';
import Toast from 'react-native-toast-message';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Toast.show({
                text1: 'Error',
                text2: 'Passwords do not match',
                type: 'error',
            });
            return;
        }

        setLoading(true);
        try {
            await register(email, password);
            Toast.show({
                text1: 'Registration Successful',
                type: 'success',
            });
        } catch (error) {
            Toast.show({
                text1: 'Error',
                text2: error.message,
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#1a1a1a', '#333']} style={styles.container}>
            <Text style={styles.title}>Join Mafia Empire</Text>
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
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>Already have an account? Login</Text>
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

export default RegisterScreen; 