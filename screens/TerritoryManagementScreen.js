import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useGame } from '../contexts/GameContext';

const TerritoryManagementScreen = () => {
    const { state, dispatch } = useGame();

    const handleUpgradeTerritory = (territory) => {
        // Logic to upgrade territory
        console.log(`Upgrading territory: ${territory}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Territory Management</Text>
            <ScrollView style={styles.territoryList}>
                {Object.keys(state.territories).map((territory) => (
                    <View key={territory} style={styles.territoryCard}>
                        <Text style={styles.territoryName}>{territory}</Text>
                        <Button title={`Upgrade ${territory}`} onPress={() => handleUpgradeTerritory(territory)} />
                    </View>
                ))}
            </ScrollView>
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
    territoryList: {
        flex: 1,
    },
    territoryCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    territoryName: {
        fontSize: 18,
        color: '#c41e3a',
        fontWeight: 'bold',
    },
});

export default TerritoryManagementScreen; 