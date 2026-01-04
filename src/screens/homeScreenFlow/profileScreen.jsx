import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetProfileQuery } from '../../services/authApi';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const navigation = useNavigation();
    const { data: profile, isLoading, isError, error } = useGetProfileQuery();

    if (isLoading) {
        return (
            <View style={styles.centerState}>
                <ActivityIndicator size="large" color="#6996DE" />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={styles.centerState}>
                <Text style={styles.errorText}>Failed to load profile</Text>
                <Text style={styles.errorSubText}>{error?.data?.message || 'Unknown error'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <LinearGradient
            colors={['#FDFDFD', '#E6F4FC']}
            style={styles.container}
        >
            <SafeAreaView style={{ flex: 1 }}>
                {/* Header */}
                <Header
                    title="PROFILE"
                    leftIcon="arrow-left"
                    onLeftPress={() => navigation.goBack()}
                />

                <View style={styles.content}>
                    <View style={styles.avatarContainer}>
                        <Icon name="user" size={60} color="#FFF" />
                    </View>

                    <Text style={styles.name}>
                        {profile?.firstName} {profile?.lastName}
                    </Text>
                    <Text style={styles.phone}>+{profile?.phone || 'No phone number'}</Text>

                    <View style={styles.detailsContainer}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>User ID</Text>
                            <Text style={styles.detailValue}>{profile?.id || '-'}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={async () => {
                        await AsyncStorage.removeItem('token');
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'onboardingScreen' }],
                            })
                        );
                    }} style={styles.logoutButton}>
                        <Icon name="log-out" size={20} color="#FFF" style={{ marginRight: 10 }} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </LinearGradient>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FDFDFD',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#7AABCF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        elevation: 5,
    },
    name: {
        fontSize: 28,
        color: '#616161',
        fontFamily: 'Quicksand-Bold',
        marginBottom: 5,
    },
    phone: {
        fontSize: 18,
        color: '#787878',
        fontFamily: 'Quicksand-Bold',
        marginBottom: 40,
    },
    detailsContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        elevation: 2,
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    detailLabel: {
        fontSize: 16,
        color: '#787878',
        fontFamily: 'Quicksand-Bold',
    },
    detailValue: {
        fontSize: 16,
        color: '#616161',
        fontFamily: 'Quicksand-Bold',
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'Quicksand-Bold',
    },
    errorSubText: {
        color: '#787878',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#6996DE',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
    },
    backButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Quicksand-Bold',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#FF6B6B',
        width: '100%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        elevation: 2,
    },
    logoutText: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        fontWeight: 'bold',
    },
});
