import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MasonryList from '@react-native-seoul/masonry-list';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../../components/Header';
import { useGetFilesQuery, useUploadFileMutation } from '../../services/authApi';
import { pick, types, isCancel } from '@react-native-documents/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomAlert from '../../components/CustomAlert';

const HomeScreen = () => {
  const { width } = Dimensions.get('window');
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [isTokenChecking, setIsTokenChecking] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data: files = [], isLoading, isError, error, refetch } = useGetFilesQuery();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
      setIsTokenChecking(false);
    };
    fetchToken();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (error) {

    } finally {
      setIsRefreshing(false);
    }
  };

  const handleUpload = async () => {
    try {
      const results = await pick({
        type: [types.images],
        allowMultiSelection: true,
        copyTo: 'cachesDirectory',
      });

      if (!results || results.length === 0) return;

      const uploadPromises = results.map(async (file) => {
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        });
        return uploadFile(formData).unwrap();
      });

      await Promise.all(uploadPromises);

      showAlert('Success', `${results.length} file(s) uploaded successfully!`);
      refetch();
    } catch (err) {
      if (typeof isCancel === 'function' && isCancel(err)) {

      } else {
        showAlert('Upload Error', err?.data?.message || err?.message || JSON.stringify(err));
      }
    }
  };

  const heights = useMemo(() => {
    const baseHeights = [180, 220, 260, 200, 240, 210];
    return files.map((_, idx) => baseHeights[idx % baseHeights.length]);
  }, [files]);

  const errorMessage = isError
    ? (error?.data?.message || error?.message || 'Failed to load files')
    : null;

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
          leftIcon="user"
          onLeftPress={() => navigation.navigate('profileScreen')}
          rightComponent={
            <TouchableOpacity
              onPress={handleUpload}
              disabled={isUploading}
              style={{
                padding: 8,
                backgroundColor: '#EDF6FA',
                borderRadius: 8,
              }}
            >
              {isUploading ? (
                <ActivityIndicator size="small" color="#7AABCF" />
              ) : (
                <Icon name="upload-cloud" size={24} color="#7AABCF" />
              )}
            </TouchableOpacity>
          }
        />

        {isLoading || isTokenChecking ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#7AABCF" />
          </View>
        ) : isError ? (
          <View style={styles.centerState}>
            <Text style={styles.stateText}>{errorMessage}</Text>
            <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          files.length === 0 ? (
            <View style={styles.centerState}>
              <Text style={styles.stateText}>No images found.</Text>
              <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
                <Text style={styles.retryText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <MasonryList
              data={files}
              numColumns={3}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              renderItem={({ item, i }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('imageViewScreen', {
                        uri: item.uri,
                        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                        images: files,
                        initialIndex: i,
                      });
                    }}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{
                        uri: item.uri,
                        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                      }}
                      onError={(e) => {

                      }}
                      style={{
                        width: width / 3 - 12,
                        height: heights[i] || 200,
                        borderRadius: 14,
                        marginBottom: 10,
                        backgroundColor: '#e1e4e8',
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          )
        )}
      </SafeAreaView>
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={hideAlert}
      />
    </LinearGradient>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  stateText: {
    color: '#616161',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },
  retryBtn: {
    backgroundColor: '#6996DE',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
    color: '#616161',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 16,
    marginVertical: 10,
    color: '#616161',
  },
});
