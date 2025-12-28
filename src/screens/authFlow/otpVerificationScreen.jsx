import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const OtpVerificationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const phone = route.params?.phone; // ✅ safe access

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputs = useRef([]);

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
    const finalOtp = otp.join("");

    if (finalOtp.length !== 5) {
      Alert.alert("Error", "Please enter complete OTP");
      return;
    }

    try {
      const response = await axios.post(
        "https://nondomestically-supersubtle-taisha.ngrok-free.dev/auth/verify-otp",
        {
          phone,
          otp: finalOtp,
        }
      );

      console.log("OTP Verified:", response.data);
      navigation.navigate("homeScreen")

    } catch (error) {
      console.log(error?.response?.data || error.message);
      Alert.alert("Error", "Invalid OTP or Server Error");
    }
  };

  return (
    <LinearGradient
      colors={['#FDFDFD', '#E6F4FC']}
      style={styles.container}
    >
      <SafeAreaView>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "center", top: 40 }}>
          <Image source={require('../../assets/images/icon.png')} />
          <Text style={{ top: 5, fontSize: 25, fontWeight: "500", color: "#616161", fontFamily: "PassionOne-Bold" }}>
            {"  "}PHOTOGRAM
          </Text>
        </View>

        {/* Title */}
        <View style={{ top: 80, marginLeft: 15 }}>
          <Text style={{ fontSize: 30, fontFamily: "Quicksand-Bold", color: "#616161" }}>
            Input OTP
          </Text>
          <Text style={{ fontSize: 20, color: "#787878", fontFamily: "Quicksand-Bold" }}>
            OTP sent to {phone}
          </Text>
        </View>

        {/* OTP BOXES */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 50, marginTop: 110 }}>
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

        {/* Resend */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 40 }}>
          <Text style={{ color: "#787878", fontFamily: "Quicksand-Bold" }}>
            Didn’t receive OTP?{" "}
          </Text>
          <Text style={{ color: "#3092BC", fontFamily: "Quicksand-Bold" }}>
            Resend OTP
          </Text>
        </View>

        {/* Verify Button */}
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleVerify}
          >
            <Text style={styles.btnText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/Optimizex.webp')}
          style={{ width: 410, height: 420, marginTop: 60 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  otpBox: {
    borderWidth: 1,
    width: "14%",
    borderRadius: 5,
    borderColor: "#BEBEBE",
    color: "#787878",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
  },
  btn: {
    backgroundColor: "#6996DE",
    padding: 14,
    borderRadius: 10,
    width: 220,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "PassionOne-Regular",
  },
});
