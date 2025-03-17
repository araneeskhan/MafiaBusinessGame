import React from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

const toastConfig = {
    success: ({ text1, text2 }) => (
        <View style={{
            height: 60,
            backgroundColor: 'rgba(0, 128, 0, 0.9)', // Semi-transparent green
            padding: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5,
        }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{text1}</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>{text2}</Text>
        </View>
    ),
    error: ({ text1, text2 }) => (
        <View style={{
            height: 60,
            backgroundColor: 'rgba(255, 0, 0, 0.9)', // Semi-transparent red
            padding: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 5,
        }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{text1}</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>{text2}</Text>
        </View>
    ),
};

export default toastConfig; 