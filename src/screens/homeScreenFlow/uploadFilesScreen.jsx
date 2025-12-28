import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather';


const uploadFilesScreen = () => {
  return (
    <LinearGradient
      colors={['#FDFDFD', '#E6F4FC']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView>
        <View style={{justifyContent:"space-between",flexDirection:"row",top: 30,marginHorizontal:15}}>
          <TouchableOpacity onPress={() => console.log('Menu pressed')}>
  <Icon name="menu" size={28} color="#7AABCF" />
</TouchableOpacity>
        <Text style={{ fontSize: 25, textAlign: "center", color: "#7AABCF", fontWeight: 500,fontFamily:"PassionOne-Bold" }}>ALBUM</Text>
        <Icon name="user" size={28} color="#7AABCF" />

        </View>
        <View style={{ alignItems: "center", top: 200 }}>
          <Image
          style={{height:250,elevation:5}}
            source={require('../../assets/images/emptyFolder.webp')}
          />
          <View>
            <Text style={{ fontSize: 45, color: "#787878", fontFamily:"PassionOne-Regular"}}>
              Nothing To Show !
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", top: 320, elevation: 4 }}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/uploadButton.webp')}
            />
          </TouchableOpacity>
          <Text style={{ color: "#616161", fontSize: 20, fontWeight: "500",fontFamily:"Quicksand-Bold"}}>Click Here To Upload</Text>
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