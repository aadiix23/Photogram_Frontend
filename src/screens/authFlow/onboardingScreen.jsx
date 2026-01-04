import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window');

const onboardingScreen = () => {
    const navigation = useNavigation();

    const imageWidth = Math.min(width * 0.9, 420);
    const imageHeight = imageWidth * (272 / 389);

    const titleFontSize = Math.max(28, Math.min(36, width * 0.085));
    const subtitleFontSize = titleFontSize;
    const descriptionFontSize = Math.max(14, Math.min(20, width * 0.045));
    const buttonFontSize = Math.max(20, Math.min(30, width * 0.07));
    const buttonPaddingVertical = Math.max(12, Math.min(16, height * 0.02));

    return (
        <LinearGradient
            colors={['#FDFDFD', '#E6F4FC']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.imageWrap}>
                        <Image
                            source={require('../../assets/images/Onboarding.webp')}
                            style={[styles.image, { width: imageWidth, height: imageHeight }]}
                        />
                    </View>

                    <View style={styles.textWrap}>
                        <View style={styles.titleRow}>
                            <Text style={[styles.titleBlue, { fontSize: titleFontSize }]}>Memories</Text>
                            <Text style={[styles.titleDark, { fontSize: subtitleFontSize }]}>{" "}That Last</Text>
                        </View>
                        <Text style={[styles.description, { fontSize: descriptionFontSize }]}>Because every picture deserves a safe place to stay forever.</Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { paddingVertical: buttonPaddingVertical }]}
                        onPress={() => navigation.navigate('loginScreen')}
                    >
                        <Text style={[styles.buttonText, { fontSize: buttonFontSize }]}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default onboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.03,
    },
    imageWrap: {
        marginBottom: height * 0.05,
    },
    image: {
        resizeMode: 'contain',
    },
    textWrap: {
        marginBottom: height * 0.05,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: height * 0.01,
    },
    titleBlue: {
        color: '#3092BC',
        fontFamily: 'PassionOne-Bold',
    },
    titleDark: {
        color: '#3A3A3A',
        fontFamily: 'PassionOne-Bold',
    },
    description: {
        textAlign: 'center',
        color: '#787878',
        fontFamily: 'Quicksand-Bold',
        paddingHorizontal: width * 0.05,
    },
    button: {
        width: '82%',
        alignItems: 'center',
        backgroundColor: '#6996DE',
        marginTop: height * 0.13,
        borderRadius: 15,
        elevation: 4,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '500',
        fontFamily: 'PassionOne-Regular',
    },
})