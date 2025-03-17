import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useGame } from '../contexts/GameContext';

const MarketplaceScreen = () => {
    const { state, dispatch } = useGame();

    const handleBuyItem = (item) => {
        // Logic to buy item
        console.log(`Buying item: ${item}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Marketplace</Text>
            <ScrollView style={styles.itemList}>
                {state.marketItems.map((item) => (
                    <View key={item.id} style={styles.itemCard}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemPrice}>Price: ${item.price}</Text>
                        <Button title={`Buy ${item.name}`} onPress={() => handleBuyItem(item.name)} />
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
    itemList: {
        flex: 1,
    },
    itemCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    itemName: {
        fontSize: 18,
        color: '#c41e3a',
        fontWeight: 'bold',
    },
    itemPrice: {
        color: '#fff',
    },
});

export default MarketplaceScreen; 