import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MasonryList from '@react-native-seoul/masonry-list';
import Icon from 'react-native-vector-icons/Feather';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

const HomeScreen = () => {
  const [token, setToken] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = 'https://photogram-backend-xp7b.onrender.com';

  const extractFilesArray = (data, depth = 0) => {
    if (depth > 5 || data == null) return [];
    if (Array.isArray(data)) return data;
    if (typeof data !== 'object') return [];

    if (Array.isArray(data.files)) return data.files;

    for (const key of Object.keys(data)) {
      const found = extractFilesArray(data[key], depth + 1);
      if (Array.isArray(found) && found.length >= 0) {
        if (Array.isArray(data[key]?.files)) return data[key].files;
      }
      if (Array.isArray(found) && found.length > 0) return found;
    }

    return [];
  };

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('FILES API token:', token);
      if (!token) {
        throw new Error('Missing token. Please verify OTP again so the token is saved, then reopen HomeScreen.');
      }

      const response = await axios.get(`${baseUrl}/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('FILES API response:', response?.data);

      const rawData = response?.data;
      const parsedData = typeof rawData === 'string' ? (() => {
        try {
          return JSON.parse(rawData);
        } catch {
          return null;
        }
      })() : rawData;

      console.log('FILES API keys:', parsedData && typeof parsedData === 'object' ? Object.keys(parsedData) : parsedData);

      const apiFiles = Array.isArray(parsedData?.files) ? parsedData.files : [];

      console.log('FILES apiFiles count:', apiFiles.length);
      console.log('FILES first item:', apiFiles[0]);

      const mapped = apiFiles
        .filter((f) => {
          const mime = (f?.mimeType || '').toLowerCase();
          const isImage = !mime || mime.startsWith('image/');
          return Boolean(f?.viewUrl) && isImage;
        })
        .map((f) => ({
          id: f.id,
          uri: `${baseUrl}${f.viewUrl}`,
          fileName: f.fileName,
          uploadedAt: f.uploadedAt,
        }));

      console.log('FILES mapped count:', mapped.length);

      setFiles(mapped);
    } catch (e) {
      console.log('FILES API ERROR:', e?.response?.status, e?.response?.data || e?.message);
      const status = e?.response?.status;
      if (status === 401) {
        setError('401 Unauthorized: backend requires authentication for /files.');
      } else {
        setError(e?.response?.data?.message || e?.message || 'Failed to load files');
      }
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        setToken(storedToken);
      } catch (e) {
        setError('Failed to read auth token');
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (token) {
      fetchFiles();
    }
  }, [token]);

  const heights = useMemo(() => {
    const baseHeights = [180, 220, 260, 200, 240, 210];
    return files.map((_, idx) => baseHeights[idx % baseHeights.length]);
  }, [files]);

  return (
    <LinearGradient
      colors={['#FDFDFD', '#E6F4FC']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ justifyContent: "space-between", flexDirection: "row", top: 30, marginHorizontal: 15 }}>
          <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Icon name="menu" size={28} color="#7AABCF" />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, color: "#7AABCF", fontWeight: 500, fontFamily: "PassionOne-Bold" }}>
            ALBUM
          </Text>
          <TouchableOpacity onPress={fetchFiles}>
            <Icon name="upload-cloud" size={28} color="#7AABCF" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color="#7AABCF" />
          </View>
        ) : error ? (
          <View style={styles.centerState}>
            <Text style={styles.stateText}>{error}</Text>
            <TouchableOpacity onPress={fetchFiles} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          files.length === 0 ? (
            <View style={styles.centerState}>
              <Text style={styles.stateText}>No images found.</Text>
              <TouchableOpacity onPress={fetchFiles} style={styles.retryBtn}>
                <Text style={styles.retryText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <MasonryList
              data={files}
              numColumns={3}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 50 }}
              renderItem={({ item, i }) => (
                <Image
                  source={{
                    uri: item.uri,
                    headers: { Authorization: `Bearer ${token}` },
                  }}
                  onError={(e) => {
                    console.log('IMAGE LOAD ERROR:', item.uri, e?.nativeEvent);
                  }}
                  style={{
                    width: width / 3 - 12,
                    height: heights[i] || 200,
                    borderRadius: 14,
                    marginBottom: 10,
                  }}
                />
              )}
            />
          )
        )}
      </SafeAreaView>
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
    fontWeight:"500",
    marginLeft: 16,
    marginVertical: 10,
    color: '#616161',
  },
});
