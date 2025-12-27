import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const loginScreen = () => {
  const [phone, setphone] = useState("");
  return (
    <View>
      <TextInput
      placeholder="Enter Your Mobile Number"
      />
      <TouchableOpacity>
        <Text>
          Send OTP
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default loginScreen

const styles = StyleSheet.create({})