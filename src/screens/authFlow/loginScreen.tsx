import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const loginScreen = () => {
  const [phone, setphone] = useState("");
  return (
    <LinearGradient
                colors={['#FDFDFD', '#E6F4FC']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.container}
            >
    <SafeAreaView>
      <View style={{flexDirection:"row",alignContent:"center",justifyContent:"center",top:40}}>
        <Image
        source={require('../../assets/images/icon.png')}
        />
        <Text style={{top:5,fontSize:20,fontWeight:"500",color:"#616161"}}>{"  "}PHOTOGRAM</Text>
      </View>
      <View style={{alignItems:"center",top:80}}>
      <Text style={{color:"#3092BC",fontSize:30,fontWeight:"500"}}>Welcome To Photogram</Text>
      </View>
       <View style={{alignItems:"center",top:85,marginHorizontal:63}}>
      <Text style={{color:"#787878",fontSize:20,fontWeight:"500",textAlign:"center"}}>Because every picture deserves a safe place to stay forever.</Text>
      </View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly",top:149,borderWidth:0.5,borderRadius:8,marginHorizontal:70,}}>
        <Text>+91   {" "}|</Text>
      <TextInput
      placeholder="Enter Your Telegram Number"
      style={{color:"#787878",fontSize:14}}
      />
      </View>
      <View style={{justifyContent:"center",alignItems:"center",top:"190",backgroundColor:"#6996DE",padding:13,marginHorizontal:100,borderRadius:10}}>
      <TouchableOpacity>
        <Text style={{color:"#ffffff",fontSize:16,fontWeight:500}}>
          Sign in With Telegram
        </Text>
      </TouchableOpacity>
      </View>
      <Image
      source={require('../../assets/images/Optimizex.webp')}
      style={{width:410,height:420,top:280}}
      />
</SafeAreaView>
</LinearGradient>
  )
}

export default loginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
})