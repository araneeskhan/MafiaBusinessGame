import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AchievementsScreen = () => {
    const achievements = [
        { id: 1, name: 'First Blood', description: 'Win your first battle' },
        { id: 2, name: 'Business Tycoon', description: 'Earn $10,000' },
        { id: 3, name: 'Territory King', description: 'Control 5 territories' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Achievements</Text>
            <ScrollView style={styles.achievementList}>
                {achievements.map((achievement) => (
                    <View key={achievement.id} style={styles.achievementCard}>
                        <Text style={styles.achievementName}>{achievement.name}</Text>
                        <Text style={styles.achievementDescription}>{achievement.description}</Text>
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
    achievementList: {
        flex: 1,
    },
    achievementCard: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    achievementName: {
        fontSize: 18,
        color: '#c41e3a',
        fontWeight: 'bold',
    },
    achievementDescription: {
        color: '#fff',
    },
});

export default AchievementsScreen; 