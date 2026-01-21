import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useVerifyOtpMutation } from '../../services/authApi';
import CustomAlert from '../../components/CustomAlert';

const { width, height } = Dimensions.get('window');

const OtpVerificationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const phone = route.params?.phone;
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputs = useRef([]);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
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

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (key, index) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join('');

    if (finalOtp.length !== 5) {
      showAlert('Error', 'Please enter complete OTP');
      return;
    }

    try {
      const response = await verifyOtp({
        phone,
        otp: finalOtp,
      }).unwrap();


      if (response?.token) {
        await AsyncStorage.setItem('token', response.token);
      }


      navigation.navigate('homeScreen');

    } catch (err) {

      showAlert('Error', 'Invalid OTP or Server Error');
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


            <View style={styles.textContainer}>
              <Text style={styles.titleText}>
                Input OTP
              </Text>
              <Text style={styles.subText}>
                OTP sent to {phone}
              </Text>
            </View>


            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleBackspace(nativeEvent.key, index)
                  }
                />
              ))}
            </View>


            <View style={styles.resendContainer}>
              <Text style={styles.resendTextGray}>
                Didn’t receive OTP?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('loginScreen')}>
                <Text style={styles.resendTextBlue}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            </View>


            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleVerify}
              >
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={hideAlert}
      />
    </LinearGradient>
  );
};

export default OtpVerificationScreen;

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
  textContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
    paddingHorizontal: 40,
    width: '100%',
  },
  titleText: {
    fontSize: Math.max(26, Math.min(30, width * 0.08)),
    fontFamily: "Quicksand-Bold",
    color: "#616161",
    marginBottom: 10,
  },
  subText: {
    fontSize: Math.max(16, Math.min(20, width * 0.05)),
    color: "#787878",
    fontFamily: "Quicksand-Bold",
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.05,
    width: '85%',
  },
  otpBox: {
    borderWidth: 1,
    width: width * 0.12,
    aspectRatio: 1,
    borderRadius: 5,
    borderColor: "#BEBEBE",
    color: "#3A3A3A",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
    backgroundColor: '#FDFDFD',
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: height * 0.05,
  },
  resendTextGray: {
    color: "#787878",
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
  },
  resendTextBlue: {
    color: "#3092BC",
    fontFamily: "Quicksand-Bold",
    fontSize: 14,
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
});
