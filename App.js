// App.js
import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import AuthScreen from './AuthScreen';

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
            <AuthScreen />
        </SafeAreaView>
    );
}
