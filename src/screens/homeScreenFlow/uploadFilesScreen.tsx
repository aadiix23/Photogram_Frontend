import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

const uploadFilesScreen = () => {
  return (
    <LinearGradient
      colors={['#FDFDFD', '#E6F4FC']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView>
        <Text style={{ fontSize: 20, textAlign: "center", top: 10, color: "#616161", fontWeight: 500 }}>Gallery</Text>
        <View style={{ alignItems: "center", top: 250 }}>
          <Image
            source={require('../../assets/images/emptyFolder.webp')}
          />
          <View>
            <Text style={{ fontSize: 32, color: "#787878", }}>
              Nothing To Show !
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", top: 390, elevation: 4 }}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/uploadButton.webp')}
            />
          </TouchableOpacity>
          <Text style={{ color: "#616161", fontSize: 20, fontWeight: "500" }}>Click Here To Upload</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default uploadFilesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})