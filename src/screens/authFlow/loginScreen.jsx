import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Alert, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
      <View style={styles.footerImageContainer}>
        <Image
          source={require('../../assets/images/Optimizex.webp')}
          style={styles.footerImage}
          resizeMode="cover"
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            <View style={styles.headerContainer}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={styles.logoIcon}
              />
              <Text style={styles.headerText}>PHOTOGRAM</Text>
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome To Photogram</Text>
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
    zIndex: 1, // Ensure content is above the image
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 100, // Space for the footer image
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  logoIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 25,
    fontWeight: "500",
    color: "#616161",
    fontFamily: "PassionOne-Bold",
    marginLeft: 10,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 60,
    paddingHorizontal: 40,
  },
  welcomeText: {
    color: "#3092BC",
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "Quicksand-Bold",
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    color: "#787878",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "Quicksand-Bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    marginHorizontal: 40,
    width: '80%',
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
    width: '80%', // Fixed width for better pressability
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
    bottom: -50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  footerImage: {
    width: width,
    height: 450, // Increased height
  },
})