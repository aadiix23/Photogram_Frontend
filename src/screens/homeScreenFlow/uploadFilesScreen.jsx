import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';


const uploadFilesScreen = () => {
  return (
    <LinearGradient
      colors={['#FDFDFD', '#E6F4FC']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          title="ALBUM"
          leftIcon="menu"
          onLeftPress={() => { }}
          rightIcon="user"
          onRightPress={() => { }}
        />

        <View style={styles.contentContainer}>
          <View style={styles.emptyStateContainer}>
            <Image
              style={styles.emptyImage}
              source={require('../../assets/images/emptyFolder.webp')}
            />
            <View>
              <Text style={styles.emptyText}>
                Nothing To Show !
              </Text>
            </View>
          </View>

          <View style={styles.uploadContainer}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/uploadButton.webp')}
              />
            </TouchableOpacity>
            <Text style={styles.uploadText}>Click Here To Upload</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

export default uploadFilesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  emptyStateContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  emptyImage: {
    height: 250,
    resizeMode: 'contain',
    elevation: 5,
  },
  emptyText: {
    fontSize: 45,
    color: "#787878",
    fontFamily: "PassionOne-Regular",
    textAlign: 'center',
  },
  uploadContainer: {
    alignItems: "center",
    elevation: 4,
  },
  uploadText: {
    color: "#616161",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Quicksand-Bold",
    marginTop: 10,
  },
})