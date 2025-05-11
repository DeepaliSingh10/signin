import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';

export default function AuthScreen() {
    const [role, setRole] = useState('guardian'); // 'guardian' or 'doctor'
    const [formData, setFormData] = useState({});

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setFormData({});
    };

    const handleSubmit = () => {
        const requiredFields = role === 'guardian'
            ? ['guardianName', 'guardianGender', 'guardianAge', 'guardianPhone', 'guardianEmail', 'childName', 'childGender', 'childAge', 'relation', 'address', 'password', 'confirmPassword']
            : ['name', 'phone', 'email', 'clinic', 'specialization', 'password', 'confirmPassword'];

        for (const field of requiredFields) {
            if (!formData[field]) {
                Alert.alert('Missing Field', `Please fill in the ${field.replace(/([A-Z])/g, ' $1')}`);
                return;
            }
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert('Password Error', 'Passwords do not match!');
            return;
        }

        console.log("Form submitted:", formData);
        Alert.alert('Success', `${role.charAt(0).toUpperCase() + role.slice(1)} signed up successfully!`);
    };

    const renderGuardianForm = () => (
        <>
            <TextInput style={styles.input} placeholder="Guardian Name" onChangeText={(text) => handleChange('guardianName', text)} />
            <TextInput style={styles.input} placeholder="Gender" onChangeText={(text) => handleChange('guardianGender', text)} />
            <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" onChangeText={(text) => handleChange('guardianAge', text)} />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" onChangeText={(text) => handleChange('guardianPhone', text)} />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={(text) => handleChange('guardianEmail', text)} />
            <TextInput style={styles.input} placeholder="Child's Name" onChangeText={(text) => handleChange('childName', text)} />
            <TextInput style={styles.input} placeholder="Child's Gender" onChangeText={(text) => handleChange('childGender', text)} />
            <TextInput style={styles.input} placeholder="Child's Age" keyboardType="numeric" onChangeText={(text) => handleChange('childAge', text)} />
            <TextInput style={styles.input} placeholder="Relation with Child" onChangeText={(text) => handleChange('relation', text)} />
            <TextInput style={styles.input} placeholder="Address" onChangeText={(text) => handleChange('address', text)} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => handleChange('password', text)} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(text) => handleChange('confirmPassword', text)} />
        </>
    );

    const renderDoctorForm = () => (
        <>
            <TextInput style={styles.input} placeholder="Name" onChangeText={(text) => handleChange('name', text)} />
            <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" onChangeText={(text) => handleChange('phone', text)} />
            <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" onChangeText={(text) => handleChange('email', text)} />
            <TextInput style={styles.input} placeholder="Clinic Name" onChangeText={(text) => handleChange('clinic', text)} />
            <TextInput style={styles.input} placeholder="Specialization" onChangeText={(text) => handleChange('specialization', text)} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={(text) => handleChange('password', text)} />
            <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry onChangeText={(text) => handleChange('confirmPassword', text)} />
        </>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.logo}>🧠 Psychiatrist Sign Up</Text>

                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleButton, role === 'guardian' && styles.activeButton]}
                        onPress={() => handleRoleChange('guardian')}
                    >
                        <Text style={styles.toggleText}>Guardian</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, role === 'doctor' && styles.activeButton]}
                        onPress={() => handleRoleChange('doctor')}
                    >
                        <Text style={styles.toggleText}>Doctor</Text>
                    </TouchableOpacity>
                </View>

                {role === 'guardian' ? renderGuardianForm() : renderDoctorForm()}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 50 : 70,
        paddingHorizontal: 20,
        backgroundColor: '#f2f2f2',
        flexGrow: 1,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 20,
        color: '#3f51b5',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
        borderRadius: 8,
    },
    activeButton: {
        backgroundColor: '#3f51b5',
    },
    toggleText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#fff',
        marginBottom: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#3f51b5',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
