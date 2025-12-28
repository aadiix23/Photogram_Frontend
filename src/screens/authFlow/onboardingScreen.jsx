import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

const onboardingScreen = () => {
    const navigation = useNavigation();
    return (
        <LinearGradient
            colors={['#FDFDFD', '#E6F4FC']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", top: 95 }}>
                    <Image
                        source={require('../../assets/images/Onboarding.webp')}
                        style={{ width: 389, height: 272, top: 145 }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center',top:500 }}>
                    <Text style={{ color: "#3092BC", fontSize: 36,fontFamily:"PassionOne-Bold"}}>Memories</Text>
                    <Text style={{ color:"#3A3A3A", fontSize: 36, fontFamily:"PassionOne-Bold"}}>{" "}That Last</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'center' }}>
                    <Text style={{ top: 450, fontSize: 20, fontWeight: '500', padding: 50, textAlign: "center", color: "#787878",fontFamily:"Quicksand-Bold" }}>Because every picture deserves a safe place to stay forever.</Text>
                </View>
                <View style={{
                    alignItems: "center",
                    top: 500,
                    backgroundColor: "#6996DE",
                    padding: 14,
                    marginHorizontal: 60,
                    borderRadius: 15, elevation: 4
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
                        <Text style={{ color: "#ffffff", fontSize: 30, fontWeight: "500",fontFamily:"PassionOne-Regular" }}>Get Started</Text>
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
    }
})