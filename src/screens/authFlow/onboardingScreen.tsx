import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'



const onboardingScreen = () => {
    return (
        <LinearGradient
            colors={['#FDFDFD', '#E6F4FC']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", top: 95 }}>
                    <Image
                        source={require('../../assets/images/Onboarding.webp')}
                        style={{ width: 389, height: 272, top: 145 }}
                    />
                </View>
                <View style={{flexDirection:'row',alignItems:"center",justifyContent:'center'}}>
                 <Text style={{top:500,color:"#3092BC",fontSize:36,fontWeight:'500'}}>Memories</Text>
                 <Text style={{top:500,fontSize:36,fontWeight:'500'}}>{" "}That Last</Text>
                 </View>
                 <View style={{flexDirection:'row',alignItems:"center",justifyContent:'center'}}>
                 <Text style={{top:450,fontSize:20,fontWeight:'500',padding:60,textAlign:"center",color:"#787878",}}>Because every picture deserves a safe place to stay forever.</Text>
                 </View>
                 <View style={{
                    alignItems:"center",
                    top:500,
                    backgroundColor:"#6996DE",
                    padding:20,
                    marginHorizontal:60,
                    borderRadius:15,elevation:4
                 }}>
                 <TouchableOpacity>
                    <Text style={{color:"#ffffff",fontSize:20,fontWeight:"500"}}>Get Started</Text>
                 </TouchableOpacity>
                 </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default onboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})