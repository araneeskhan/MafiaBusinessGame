import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const BuildingUpgradesScreen = () => {
    const handleUpgradeHQ = () => {
        // Logic to upgrade HQ
        console.log('Upgrading HQ...');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Building Upgrades</Text>
            <Button title="Upgrade HQ" onPress={handleUpgradeHQ} />
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

export default BuildingUpgradesScreen; 