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
      <View style={{top:80,marginLeft:15}}>
      <Text style={{color:"#616161",fontSize:30,fontWeight:"500"}}>Input OTP</Text>
      <Text style={{color:"#787878",fontSize:20,fontWeight:"400",}}>Input The Code That Has Been Sent To Telegram</Text>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",alignContent:"center",top:"110",marginHorizontal:60,}}>
        <TextInput
        style={{borderWidth:1,width:"15%",borderRadius:5}}
        />
        <TextInput
        style={{borderWidth:1,width:"15%",borderRadius:5}}
        />
        <TextInput
        style={{borderWidth:1,width:"15%",borderRadius:5}}
        />
        <TextInput
        style={{borderWidth:1,width:"15%",borderRadius:5}}
        />
        <TextInput
        style={{borderWidth:1,width:"15%",borderRadius:5}}
        />
        <TextInput
        style={{borderWidth:1,width:"15%",borderRadius:5}}
        />
      </View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",top:150}}>
      <Text style={{color:"#787878"}}>Didn’t receive OTP ? </Text>
      <Text>Resend OTP</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center",top:"160",backgroundColor:"#6996DE",padding:13,marginHorizontal:100,borderRadius:10}}>
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