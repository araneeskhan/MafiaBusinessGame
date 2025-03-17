import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGame } from '../contexts/GameContext';
import { buildingConfig } from '../contexts/BuildingConfig';
import AnimatedNumbers from 'react-native-animated-numbers';

const { width } = Dimensions.get('window');

const BuildingCard = ({ building, level, onUpgrade, cost }) => {
    const getBuildingIcon = (type) => {
        switch (type) {
            case 'blackMarket':
                return 'store';
            case 'bank':
                return 'bank';
            case 'headquarters':
                return 'office-building';
            case 'weaponFactory':
                return 'factory';
            case 'casino':
                return 'poker-chip';
            case 'safeHouse':
                return 'safe';
            default:
                return 'building';
        }
    };

    return (
        <LinearGradient
            colors={['#2a2a2a', '#3a3a3a']}
            style={styles.buildingCard}
        >
            <MaterialCommunityIcons 
                name={getBuildingIcon(building)} 
                size={40} 
                color="#c41e3a" 
            />
            <Text style={styles.buildingName}>
                {building.charAt(0).toUpperCase() + building.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
            <View style={styles.levelContainer}>
                <Text style={styles.levelLabel}>Level</Text>
                <AnimatedNumbers
                    animateToNumber={level}
                    fontStyle={styles.levelNumber}
                />
            </View>
            <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={onUpgrade}
            >
                <MaterialCommunityIcons name="arrow-up-circle" size={24} color="#fff" />
                <Text style={styles.upgradeCost}>{cost} $</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const BuildingManagementScreen = () => {
    const { state, dispatch } = useGame();

    const handleUpgradeBusiness = (businessType) => {
        dispatch({ type: 'UPGRADE_BUSINESS', payload: businessType });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Management</Text>
            <ScrollView style={styles.businessList}>
                {Object.keys(state.businesses).map((business) => (
                    <View key={business} style={styles.businessCard}>
                        <Text style={styles.businessName}>{business.charAt(0).toUpperCase() + business.slice(1)}</Text>
                        <Text>Level: {state.businesses[business].level}</Text>
                        <Text>Hourly Income: ${state.businesses[business].income}</Text>
                        <Button title={`Upgrade ${business}`} onPress={() => handleUpgradeBusiness(business)} />
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
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    levelLabel: {
        color: '#888',
        marginRight: 5,
    },
    levelNumber: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    upgradeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#c41e3a',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        marginTop: 15,
    },
    upgradeCost: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
});

export default BuildingManagementScreen; 