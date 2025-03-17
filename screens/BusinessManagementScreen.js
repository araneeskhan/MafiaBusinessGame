import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useGame } from '../contexts/GameContext';
import { businessConfig } from '../contexts/BusinessConfig';

const BusinessManagementScreen = () => {
    const { state, dispatch } = useGame();

    const handleStartBusiness = (businessType) => {
        dispatch({ type: 'START_BUSINESS', payload: businessType });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Management</Text>
            <ScrollView style={styles.businessList}>
                {Object.keys(businessConfig).map((business) => (
                    <View key={business} style={styles.businessCard}>
                        <Text style={styles.businessName}>{business.charAt(0).toUpperCase() + business.slice(1)}</Text>
                        <Text>Starting Cost: ${businessConfig[business].startingCost}</Text>
                        <Text>Hourly Income: ${businessConfig[business].baseIncome}</Text>
                        <Button title={`Start ${business}`} onPress={() => handleStartBusiness(business)} />
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
    businessList: {
        flex: 1,
    },
    businessCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    businessName: {
        fontSize: 18,
        color: '#c41e3a',
        fontWeight: 'bold',
    },
});

export default BusinessManagementScreen; 