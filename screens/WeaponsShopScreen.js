import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGame } from '../contexts/GameContext';
import { weaponTypes } from '../contexts/GangConfig';

const WeaponCard = ({ type, stats, onBuy }) => {
    return (
        <LinearGradient
            colors={['#2a2a2a', '#3a3a3a']}
            style={styles.weaponCard}
        >
            <View style={styles.weaponHeader}>
                <MaterialCommunityIcons 
                    name={type === 'pistol' ? 'pistol' : 
                          type === 'shotgun' ? 'shotgun' : 
                          type === 'assaultRifle' ? 'rifle' : 'crosshairs'}
                    size={40} 
                    color="#c41e3a" 
                />
                <Text style={styles.weaponName}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            </View>
            <View style={styles.statsContainer}>
                <StatItem icon="target" value={stats.attack} label="Attack" />
                <StatItem icon="crosshairs-gps" value={stats.accuracy} label="Accuracy" />
            </View>
            <Text style={styles.description}>{stats.description}</Text>
            <TouchableOpacity 
                style={styles.buyButton}
                onPress={onBuy}
            >
                <Text style={styles.buyButtonText}>Buy for ${stats.cost}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const WeaponsShopScreen = () => {
    const { state, dispatch } = useGame();

    const handleBuyWeapon = (weaponType) => {
        dispatch({ type: 'BUY_WEAPON', payload: weaponType });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weapons Shop</Text>
            <ScrollView style={styles.weaponList}>
                {Object.keys(weaponTypes).map((weapon) => (
                    <View key={weapon} style={styles.weaponCard}>
                        <Text style={styles.weaponName}>{weapon.charAt(0).toUpperCase() + weapon.slice(1)}</Text>
                        <Text>Cost: ${weaponTypes[weapon].cost}</Text>
                        <Text>Attack: {weaponTypes[weapon].attack}</Text>
                        <TouchableOpacity onPress={() => handleBuyWeapon(weapon)}>
                            <Text style={styles.buyButton}>Buy</Text>
                        </TouchableOpacity>
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
    weaponList: {
        flex: 1,
    },
    weaponCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    weaponName: {
        fontSize: 18,
        color: '#c41e3a',
        fontWeight: 'bold',
    },
    buyButton: {
        color: '#fff',
        backgroundColor: '#c41e3a',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default WeaponsShopScreen; 