import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const loginScreen = () => {
  const navigation = useNavigation();
  const [phone, setphone] = useState("");
  const [loading, setloading] = useState(false);

  const handlelogin = async () => {
    if (!phone) {
      Alert.alert("Error", "Please Enter Your Telegram Number");
      return;
    }
    try {
      setloading(true);
      const response = await axios.post('https://nondomestically-supersubtle-taisha.ngrok-free.dev/auth/send-otp', {
        phone: `+91${phone}`
      });
      console.log("Response", response.data);
      navigation.navigate('otpVerificationScreen', {
        phone: `+91${phone}`,
      });


    } catch (error) {
      Alert.alert("Error", "Something went wrong");

    } finally {
      setloading(false);
    }
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
        <View style={{ alignItems: "center", top: 80 }}>
          <Text style={{ color: "#3092BC", fontSize: 30, fontWeight: "500", fontFamily: "Quicksand-Bold" }}>Welcome To Photogram</Text>
        </View>
        <View style={{ alignItems: "center", top: 85, marginHorizontal: 60 }}>
          <Text style={{ color: "#787878", fontSize: 20, fontWeight: "500", textAlign: "center", fontFamily: "Quicksand-Bold" }}>Because every picture deserves a safe place to stay forever.</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", top: 149, marginHorizontal: 70 }}>
          <Text style={{ borderWidth: 0.5, borderRadius: 4, fontSize: 16, padding: 8, color: "#787878", marginRight: 15, fontFamily: "Quicksand-Bold" }}>+91</Text>
          <TextInput
            placeholder="Enter Your Telegram Number"
            placeholderTextColor="#787878"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setphone}
            style={{ borderWidth: 0.5, borderRadius: 4, fontSize: 16, padding: 8, color: "#787878", fontFamily: "Quicksand-Bold", width: "83%" }}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", top: "190", backgroundColor: "#6996DE", padding: 13, marginHorizontal: 100, borderRadius: 10 }}>
          <TouchableOpacity onPress={handlelogin}>
            <Text style={{ color: "#ffffff", fontSize: 16, fontWeight: 500 }}>
              Sign In With Telegram
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