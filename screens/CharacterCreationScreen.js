import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';

const CharacterCreationScreen = () => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('default_avatar.png'); // Placeholder for avatar selection

    const handleCreateCharacter = () => {
        // Logic to save character data
        console.log(`Character Created: ${name}, Avatar: ${avatar}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Your Mafia Boss</Text>
            <Image source={require(`../assets/${avatar}`)} style={styles.avatar} />
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <Button title="Create Character" onPress={handleCreateCharacter} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#444',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        color: '#fff',
        width: '80%',
    },
});

export default CharacterCreationScreen; 