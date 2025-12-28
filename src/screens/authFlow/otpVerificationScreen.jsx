import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const loginScreen = () => {
  const [phone, setphone] = useState("");
  const [otp, setotp] = useState(["", "", "", "", ""]);
  const inputs = useRef([]);
  const handleChange = (text, index) => {
    if (text.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setotp(newOtp);

    if (text && index < 4) {
      inputs.current[index + 1].focus();
    }
  };
  const handleBackspace = (key, index) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  const handleVerify = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 5) {
      Alert.alert("Please Enter The OTP");
      return;
    }
    console.log("OTP:", finalOtp);
  }
  return (
    <LinearGradient
      colors={['#FDFDFD', '#E6F4FC']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView>
        <View style={{ flexDirection: "row", alignContent: "center", justifyContent: "center", top: 40 }}>
          <Image
            source={require('../../assets/images/icon.png')}
          />
          <Text style={{ top: 5, fontSize: 25, fontWeight: "500", color: "#616161", fontFamily: "PassionOne-Bold" }}>{"  "}PHOTOGRAM</Text>
        </View>
        <View style={{ top: 80, marginLeft: 15 }}>
          <Text style={{ color: "#616161", fontSize: 30, fontWeight: "500", fontFamily: "Quicksand-Bold" }}>Input OTP</Text>
          <Text style={{ color: "#787878", fontSize: 20, fontWeight: "400", fontFamily: "Quicksand-Bold" }}>Input The Code That Has Been Sent To Telegram</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", top: "110", marginHorizontal: 50 }}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={{
                borderWidth: 1,
                width: "14%",
                borderRadius: 5,
                borderColor: "#BEBEBE",
                color: "#787878",
                fontSize: 18,
                fontFamily: "Quicksand-Bold",
                textAlign: "center"
              }}
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
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", top: 150 }}>
          <Text style={{ color: "#787878", fontFamily: "Quicksand-Bold" }}>Didn’t receive OTP ? </Text>
          <Text style={{ color: "#3092BC", fontFamily: "Quicksand-Bold" }}>Resend OTP</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", top: "160", backgroundColor: "#6996DE", padding: 13, marginHorizontal: 100, borderRadius: 10 }}>
          <TouchableOpacity>
            <Text style={{ color: "#ffffff", fontSize: 22, fontWeight: 500, fontFamily: "PassionOne-Regular" }}>
              Sign in With Telegram
            </Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require('../../assets/images/Optimizex.webp')}
          style={{ width: 410, height: 420, top: 280 }}
        />
      </SafeAreaView>
    </LinearGradient>
  )
}

export default loginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})