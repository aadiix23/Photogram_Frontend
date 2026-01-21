import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSendOtpMutation } from '../../services/authApi';

const { width, height } = Dimensions.get('window');

const loginScreen = () => {
  const navigation = useNavigation();
  const [phone, setphone] = useState("");
  const [sendOtp, { isLoading, error, data }] = useSendOtpMutation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  const handlelogin = async () => {
    try {
      const response = await sendOtp({
        phone: `+91${phone}`,
      }).unwrap();


      navigation.navigate('otpVerificationScreen', {
        phone: `+91${phone}`,
      });
    } catch (err) {

    }
  };


  return (
    <LinearGradient
      colors={['#FDFDFD', '#E6F4FC']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {!isKeyboardVisible && (
        <View style={styles.footerImageContainer}>
          <Image
            source={require('../../assets/images/Optimizex.webp')}
            style={styles.footerImage}
            resizeMode="cover"
          />
        </View>
      )}

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

            <View style={styles.headerContainer}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={styles.logoIcon}
              />
              <Text style={styles.headerText}>PHOTOGRAM</Text>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                Welcome To <Text style={styles.photogramText}>Photogram</Text>
              </Text>
              <Text style={styles.subText}>Because every picture deserves a safe place to stay forever.</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                placeholder="Input Telegram Number"
                placeholderTextColor="#787878"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setphone}
                style={styles.textInput}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handlelogin} style={styles.button}>
                <Text style={styles.buttonText}>
                  Sign In With Telegram
                </Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default loginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: height * 0.05,
    paddingBottom: height * 0.1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: height * 0.05,
  },
  logoIcon: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
    maxWidth: 40,
    maxHeight: 40,
  },
  headerText: {
    fontSize: Math.max(20, Math.min(24, width * 0.06)),
    fontWeight: "500",
    color: "#616161",
    fontFamily: "PassionOne-Bold",
    marginLeft: 10,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: height * 0.06,
    paddingHorizontal: 40,
  },
  welcomeText: {
    color: "#3092BC",
    fontSize: Math.max(24, Math.min(28, width * 0.07)),
    fontWeight: "500",
    fontFamily: "Quicksand-Bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  photogramText: {
    fontSize: Math.max(28, Math.min(34, width * 0.085)),
    color: "#3092BC",
    fontFamily: "Quicksand-Bold",
  },
  subText: {
    color: "#787878",
    fontSize: Math.max(14, Math.min(18, width * 0.045)),
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.05,
    marginHorizontal: 40,
    width: '85%',
    justifyContent: 'center',
  },
  countryCode: {
    borderWidth: 0.5,
    borderColor: '#787878',
    borderRadius: 4,
    fontSize: 16,
    padding: 10,
    color: "#787878",
    marginRight: 10,
    fontFamily: "Quicksand-Bold",
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#787878',
    borderRadius: 4,
    fontSize: 16,
    padding: 10,
    color: "#787878",
    fontFamily: "Quicksand-Bold",
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#6996DE",
    paddingVertical: 13,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "PassionOne-Regular",
  },
  footerImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  footerImage: {
    width: width,
    height: height * 0.45,
  },
})