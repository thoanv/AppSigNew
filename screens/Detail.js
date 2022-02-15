import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    Dimensions
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';

const Detail = ({ route, navigation }) => {
    function renderHeader() {
        return (
            <View style={{flex: 1, backgroundColor: COLORS.white, borderBottomColor: COLORS.secondary, borderBottomWidth: 1}}>
                {/* Navigation header */}
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.radius,
                    height: 40,
                    alignItems: 'flex-end'
                    }}
                >
                    <TouchableOpacity
                        style={{marginLeft: SIZES.base}}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...FONTS.h3}}>Trình ký</Text>
                    </View>

                    <TouchableOpacity
                        style={{marginRight: SIZES.base}}
                        onPress={() => console.log("Click more")}
                    >
                        <Image
                            source={icons.more_icon}
                            resizeMode='contain'
                            style={{
                                width: 30,
                                height: 30,
                                alignSelf: 'flex-end'
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderInfo() {
        return (
            <View style={{flexDirection: 'row'}}>
                {/* Custom Scrollbar */}
                <View style={styles.container}>
                    <View
                        style={[{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: COLORS.white,
                        }, styles.shadow]}
                    >
                     <Text style={{...FONTS.h3}}>Thông tin Task</Text>
                     <View
                         style={{
                             flexDirection: 'row',
                             alignItems: 'center',
                             paddingVertical: SIZES.base
                         }}
                     >
                         <View style={{flex: 1, backgroundColor: COLORS.white}}>
                             <Text style={{...FONTS.body4}}>
                             Nguyễn Văn Thỏa
                             </Text>
                             <Text style={{color: COLORS.gray, ...FONTS.body4 }}>

                             </Text>
                         </View>
                         <View
                             style={{
                                 flexDirection: 'row',
                                 height: '100%',
                                 alignItems: 'center'
                             }}
                         >
                             <Image
                                 source={icons.right_arrow}
                                 style={{
                                     width: 15,
                                     height: 15,
                                     tintColor: COLORS.gray
                                 }}
                             />
                         </View>
                     </View>
                    </View>
                </View>
            </View>
        )
    }

    function renderBottomButton () {
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.primary}}>
                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: COLORS.secondary,
                        marginLeft: SIZES.padding,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Bookmark")}
                >
                    <Image
                        source={icons.comment_icon}
                        resizeMode="contain"
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 60,
                        backgroundColor: COLORS.secondary,
                        marginLeft: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Bookmark")}
                >
                    <Text style={{color: COLORS.primary, ...FONTS.h3}}>Hủy</Text>
                </TouchableOpacity>

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.lightGreen,
                        marginHorizontal: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Start Reading")}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={icons.signature_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                        <Text style={{color: COLORS.white, ...FONTS.h3, marginLeft: SIZES.base}}>Xác nhận ký</Text>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    function renderUserSignature() {
        return (
            <View style={{flexDirection: 'row', marginTop: SIZES.radius,}}>
                {/* Custom Scrollbar */}
                <View style={styles.container}>
                    <View
                        style={[{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: COLORS.white,
                        }, styles.shadow]}
                    >
                     <Text style={{...FONTS.h3}}>Thông tin người ký</Text>
                     <View
                         style={{
                             flexDirection: 'row',
                             alignItems: 'center',
                             paddingVertical: SIZES.base
                         }}
                     >
                         <View style={{flex: 1, backgroundColor: COLORS.white}}>
                             <Text style={{...FONTS.body4}}>
                             Nguyễn Văn Thỏa
                             </Text>
                             <Text style={{color: COLORS.gray, ...FONTS.body4 }}>

                             </Text>
                         </View>
                         <View
                             style={{
                                 flexDirection: 'row',
                                 height: '100%',
                                 alignItems: 'center'
                             }}
                         >
                             <Image
                                 source={icons.right_arrow}
                                 style={{
                                     width: 15,
                                     height: 15,
                                     tintColor: COLORS.gray
                                 }}
                             />
                         </View>
                     </View>
                    </View>
                </View>
            </View>
        )
    }
    function renderFileSignature() {
        return (
            <View style={{flexDirection: 'row', marginTop: SIZES.radius,}}>
                {/* Custom Scrollbar */}
                <View style={styles.container}>
                    <View
                        style={[{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            backgroundColor: COLORS.white,
                        }, styles.shadow]}
                    >
                     <Text style={{...FONTS.h3}}>File ký</Text>
                     <View
                         style={{
                             flexDirection: 'row',
                             alignItems: 'center',
                             paddingVertical: SIZES.base
                         }}
                     >
                         <View style={{flex: 1, backgroundColor: COLORS.white}}>
                             <Text style={{...FONTS.body4}}>
                             Nguyễn Văn Thỏa
                             </Text>
                             <Text style={{color: COLORS.gray, ...FONTS.body4 }}>

                             </Text>
                         </View>
                         <View
                             style={{
                                 flexDirection: 'row',
                                 height: '100%',
                                 alignItems: 'center'
                             }}
                         >
                             <Image
                                 source={icons.right_arrow}
                                 style={{
                                     width: 15,
                                     height: 15,
                                     tintColor: COLORS.gray
                                 }}
                             />
                         </View>
                     </View>
                    </View>
                </View>
            </View>
        )
    }
    function renderAction(){
        return (
            <View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* Book Cover Section */}
            <View style={{flex: 1}}>
                {renderHeader()}
            </View>
            {/* Description */}
            <View style={{flex: 10}}>
                {renderInfo()}
                {renderUserSignature()}
                {renderFileSignature()}
                {renderAction()}
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.30,
        shadowRadius: 2,

        elevation: 2,
    }
})

export default Detail;