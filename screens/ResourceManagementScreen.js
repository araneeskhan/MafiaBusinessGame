import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';

const ResourceManagementScreen = () => {
    const { state, dispatch, updatePlayerData } = useGame();
    const { user } = useAuth();

    const handleAddMoney = () => {
        const newMoney = state.resources.money + 50; // Example increment
        dispatch({ type: 'ADD_MONEY', payload: 50 });
        updatePlayerData(user.uid, { resources: { ...state.resources, money: newMoney } });
    };

    const handleUpgradeBuilding = (buildingType) => {
        dispatch({ type: 'UPGRADE_BUILDING', payload: buildingType });
        updatePlayerData(user.uid, { buildings: { ...state.buildings, [buildingType]: state.buildings[buildingType] + 1 } }); // Update Firebase
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resource Management</Text>
            <Text style={styles.subtitle}>Current Money: ${state.resources.money}</Text>
            <ScrollView style={styles.resourceList}>
                <Text style={styles.resourceItem}>Ammo: {state.resources.ammo}</Text>
                <Text style={styles.resourceItem}>Weapons: {state.resources.weapons.join(', ')}</Text>
                <Button title="Add Money" onPress={handleAddMoney} />
                <Button title="Upgrade Bank" onPress={() => handleUpgradeBuilding('bank')} />
                <Button title="Upgrade Black Market" onPress={() => handleUpgradeBuilding('blackMarket')} />
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
    subtitle: {
        fontSize: 18,
        color: '#c41e3a',
        marginBottom: 10,
    },
    resourceList: {
        marginTop: 20,
    },
    resourceItem: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 10,
    },
});

export default ResourceManagementScreen; 