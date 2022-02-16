import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import { COLORS, FONTS, icons, SIZES, images } from '../constants';

const Splash = () => {
    return (
         <SafeAreaView style={styles.container}>
            <View style={styles.logoController}>
                <Image
                    source={images.logo_hpl}
                    resizeMode="contain"
                    style={{
                        width: 500,
                    }}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },

    logoController: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flex: 1,
    },
})
export default Splash;