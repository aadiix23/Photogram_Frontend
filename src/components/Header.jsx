import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Header = ({
    title,
    leftIcon,
    onLeftPress,
    rightIcon,
    onRightPress,
    rightComponent,
    containerStyle,
    titleColor = "#7AABCF",
    iconColor = "#7AABCF"
}) => {
    return (
        <View style={[styles.headerContainer, containerStyle]}>
            <View style={styles.sideContainer}>
                {leftIcon && (
                    <TouchableOpacity onPress={onLeftPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Icon name={leftIcon} size={28} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.centerContainer}>
                <Text style={[styles.headerTitle, { color: titleColor }]}>
                    {title}
                </Text>
            </View>

            <View style={[styles.sideContainer, { alignItems: 'flex-end' }]}>
                {rightComponent ? (
                    rightComponent
                ) : rightIcon ? (
                    <TouchableOpacity onPress={onRightPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Icon name={rightIcon} size={28} color={iconColor} />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'transparent',
        zIndex: 1000,
    },
    sideContainer: {
        width: 60,
        justifyContent: 'center',
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: "500",
        fontFamily: "PassionOne-Bold",
        textAlign: 'center',
    },
});
