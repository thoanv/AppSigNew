import React from 'react';
import {
    View,
    Text,
    Image,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList
} from 'react-native';
import { COLORS, FONTS, icons, SIZES, images } from '../constants';


const Profile = ({navigation}) => {

    function renderHeader() {
        return (
            <View
                style={{flex: 1, backgroundColor: COLORS.primary, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center', borderBottomColor: COLORS.secondary, borderBottomWidth: 1}}
            >
                {/* Greetings */}
                <View style={{flex: 1}}>
                    <View style={{marginRight: SIZES.padding}}>
                        <Text style={{...FONTS.h2, color: COLORS.white}}>
                            Profile
                        </Text>

                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{height: 50}}>
                {renderHeader()}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },

})
export default Profile;