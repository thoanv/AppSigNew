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
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import Pdf from 'react-native-pdf';
const LineDivider = () => {
    return (
        <View style={{width: 1, paddingVertical: 5}}>
            <View style={{flex: 1, borderColor: COLORS.lightGray2, borderLeftWidth: 1}}></View>
        </View>
    )

}

const Signature = ({ route, navigation }) => {

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);
    const indicator = new Animated.Value(0);



    function renderBookInfoSection() {
        return (
            <View style={{flex: 1, backgroundColor: COLORS.primary}}>
            
                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >

                </View>
                {/* Navigation header */}
                <View style={{
                    flexDirection: "row",
                    paddingHorizontal: SIZES.base,
                    height: 40,
                    alignItems: 'flex-end'
                    }}
                >
                    <TouchableOpacity
                        style={{marginLeft: SIZES.base}}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{...FONTS.h3,}}>Trình ký</Text>
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

    function renderBookDescription() {
        const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                {/* Custom Scrollbar */}
                <View style={styles.container}>
                    <Pdf
                        source={source}
                        onLoadComplete={(numberOfPages,filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page,numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        onPressLink={(uri) => {
                            console.log(`Link pressed: ${uri}`);
                        }}
                        style={styles.pdf}/>
                </View>
            </View>
        )
    }

    function renderBottomButton () {
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.primary}}>

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.oragin,
                        marginHorizontal: SIZES.base,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.base,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Start Reading")}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Image
                            source={icons.signature}
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

    return (
        <View style={styles.container}>
            {/* Book Cover Section */}
            <View style={{flex: 1}}>
                {renderBookInfoSection()}
            </View>
            {/* Description */}
            <View style={{flex: 10}}>
                {renderBookDescription()}
            </View>
            {/* Buttons */}
            <View style={{height: 70, marginBottom: 0}}>
                {renderBottomButton()}
            </View>
        </View>
    )
   
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black
    },
    pdf: {
            flex:1,
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
        }
})

export default Signature;