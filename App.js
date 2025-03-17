import React from 'react';
import AppNavigator from './AppNavigator';
import { LogBox } from 'react-native';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import { ToastProvider } from 'expo-toast';

// Ignore warnings for now
LogBox.ignoreAllLogs();

const App = () => {
    return (
        <AuthProvider>
            <GameProvider>
                <ToastProvider>
                    <AppNavigator />
                </ToastProvider>
            </GameProvider>
        </AuthProvider>
    );
};

export default App;
