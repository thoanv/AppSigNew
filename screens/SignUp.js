import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleSheet,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';

import { COLORS, FONTS, icons, images, SIZES } from '../constants';

import LinearGradient from 'react-native-linear-gradient';

const SignUp = ( { navigation } ) => {

    const [showPassword, setShowPassword] = React.useState(false)

    React.useEffect(()=> {
        fetch("https://restcountries.eu/rest/v2/all")
        .then( response => response.json())
        .then(data => {
            let areData = data.map( item => {
                return {
                    code: item.alpha2Code,
                    name: item.name,
                    callingCode: `+${item.callingCodes[0]}`,
                    flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`
                }
            })
            setAreas(areData);

            if(areData.length > 0){
                let defaultData = areData.filter(a=> a.code == "VN")

                if(defaultData.length > 0){
                    setSelectedAreas(defaultData[0])
                }
            }
        })
    }, [])

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: SIZES.padding * 2,
                }}
                onPress={() => console.log("Sign Up")}
            >

                <Text style={{marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4}}>Đăng nhập</Text>
            </TouchableOpacity>
        )
    }
    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={images.logo_hpl}
                    resizeMode="contain"
                    style={{
                        width: "60%",
                    }}
                />
            </View>
        )
    }
    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Full name */}
                <View style={{
                    marginTop: SIZES.padding * 3
                }}>
                    <Text style={styles.title}>Full name</Text>
                    <TextInput 
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Full Name"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>

                {/* Password */}
                <View style={{
                    marginTop: SIZES.padding * 2
                }}>
                    <Text style={styles.title}>Password</Text>
                    <TextInput 
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Full Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30,
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image 
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    function renderButton() {
        return (
            <View style={{margin: SIZES.padding * 3, marginTop: SIZES.padding * 4}}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: '#F5852B',
                        borderRadius: SIZES.radius,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={{color: COLORS.white, ...FONTS.h4}}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{
                flex: 1,
            }}
        >
           <LinearGradient
            colors={[COLORS.lime, COLORS.emerald]}
            style={{
                flex: 1,
            }}
           >

               <ScrollView>
                   {renderHeader()}
                   {renderLogo()}
                   {renderForm()}
                   {renderButton()}
               </ScrollView>
           </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    title: {
        color: COLORS.lightGreen,
        ...FONTS.body3
    }
})

export default SignUp;