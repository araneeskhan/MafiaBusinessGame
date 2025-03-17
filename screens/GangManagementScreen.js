import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGame } from '../contexts/GameContext';
import { gangMemberTypes } from '../contexts/GangConfig';

const GangMemberCard = ({ type, stats, onHire }) => {
    return (
        <LinearGradient
            colors={['#2a2a2a', '#3a3a3a']}
            style={styles.memberCard}
        >
            <View style={styles.memberHeader}>
                <MaterialCommunityIcons 
                    name={type === 'thug' ? 'account-outline' : 
                          type === 'enforcer' ? 'shield-account' : 
                          type === 'hitman' ? 'account-cowboy-hat' : 'security'}
                    size={40} 
                    color="#c41e3a" 
                />
                <Text style={styles.memberName}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            </View>
            <View style={styles.statsContainer}>
                <StatItem icon="sword" value={stats.attack} label="Attack" />
                <StatItem icon="shield" value={stats.defense} label="Defense" />
                <StatItem icon="heart" value={stats.health} label="Health" />
            </View>
            <Text style={styles.description}>{stats.description}</Text>
            <TouchableOpacity 
                style={styles.hireButton}
                onPress={onHire}
            >
                <Text style={styles.hireButtonText}>Hire for ${stats.cost}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const StatItem = ({ icon, value, label }) => (
    <View style={styles.statItem}>
        <MaterialCommunityIcons name={icon} size={20} color="#888" />
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
    </View>
);

const GangManagementScreen = () => {
    const { state, dispatch } = useGame();

    const handleHireGangMember = (memberType) => {
        dispatch({ type: 'HIRE_GANG_MEMBER', payload: memberType });
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1a1a1a', '#2d2d2d']}
                style={styles.header}
            >
                <Text style={styles.title}>Gang Management</Text>
                <View style={styles.statsOverview}>
                    <Text style={styles.statsText}>
                        Total Power: {state.stats.totalAttack + state.stats.totalDefense}
                    </Text>
                    <Text style={styles.statsText}>
                        Members: {state.gangMembers.length}
                    </Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.memberList}>
                {Object.entries(gangMemberTypes).map(([type, stats]) => (
                    <GangMemberCard
                        key={type}
                        type={type}
                        stats={stats}
                        onHire={() => handleHireGangMember(type)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    statsOverview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    statsText: {
        color: '#888',
        fontSize: 16,
    },
    memberList: {
        padding: 20,
    },
    memberCard: {
        backgroundColor: '#333',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        elevation: 5,
    },
    memberHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    memberName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#888',
        fontSize: 12,
    },
    description: {
        color: '#888',
        marginBottom: 15,
    },
    hireButton: {
        backgroundColor: '#c41e3a',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    hireButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default GangManagementScreen; 