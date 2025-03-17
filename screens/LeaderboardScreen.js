import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const LeaderboardScreen = () => {
    const players = [
        { id: 1, name: 'Player1', score: 10000 },
        { id: 2, name: 'Player2', score: 9000 },
        { id: 3, name: 'Player3', score: 8000 },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>
            <ScrollView style={styles.leaderboardList}>
                {players.map((player) => (
                    <View key={player.id} style={styles.playerCard}>
                        <Text style={styles.playerName}>{player.name}</Text>
                        <Text style={styles.playerScore}>Score: {player.score}</Text>
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
    leaderboardList: {
        flex: 1,
    },
    playerCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    playerName: {
        fontSize: 18,
        color: '#c41e3a',
        fontWeight: 'bold',
    },
    playerScore: {
        color: '#fff',
    },
});

export default LeaderboardScreen; 