import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const CombatSystemScreen = () => {
    const handleAttack = () => {
        // Logic to attack a rival
        console.log('Attacking rival...');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Combat System</Text>
            <Button title="Attack Rival" onPress={handleAttack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a1a',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default CombatSystemScreen; 