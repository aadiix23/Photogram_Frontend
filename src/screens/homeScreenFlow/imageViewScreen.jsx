
import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const ImageViewScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { uri, headers, images, initialIndex = 0 } = route.params || {};

    const data = images || [{ uri, id: 'single' }];

    const flatListRef = useRef(null);

    const renderItem = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: item.uri, headers }}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );

    const getItemLayout = (_, index) => ({
        length: width,
        offset: width * index,
        index,
    });

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={initialIndex}
                getItemLayout={getItemLayout}
                windowSize={3}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                onScrollToIndexFailed={(info) => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
                    });
                }}
            />

            <SafeAreaView style={styles.overlay}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.closeButton}
                >
                    <Icon name="x" size={30} color="#FFF" />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

export default ImageViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imageContainer: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: height,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20,
        zIndex: 1,
    },
    closeButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
