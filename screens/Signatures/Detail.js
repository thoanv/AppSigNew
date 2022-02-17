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
    Dimensions,
    Button
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import BorderHorizontal from '../../components/borderHorizontal';
import Dot from '../../components/dot';
const width_screen  = Dimensions.get('window').width;
const Detail = ({ route, navigation }) => {
    function renderHeader() {
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
                        style={{marginHorizontal: SIZES.base}}
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
                            <Text style={{...FONTS.h3,}}>Thông tin chi tiết</Text>
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

    function renderTitle() {
        return (
            <View style={{flexDirection: 'row', marginBottom: SIZES.base}}>
                {/* Custom Scrollbar */}
                <View style={{flex: 1}}>
                    <View
                        style={[{
                            paddingTop: 10,
                            paddingHorizontal: SIZES.base*2,
                            backgroundColor: COLORS.white,
                        }, styles.shadow]}
                    >
                        <Text style={{...FONTS.h2}}>Đề nghị tạm ứng 30% lương của nhân viên Nguyễn Văn Thỏa</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: SIZES.base
                            }}
                        >
                            <View style={{flex: 1, backgroundColor: COLORS.white}}>
                                <Text style={{...FONTS.body4}}>
                                Giai đoạn: Trưởng phòng duyệt
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

    function renderInfoTask() {
        
        return (
            <View style={{flexDirection: 'row', marginBottom: SIZES.base}}>
                {/* Custom Scrollbar */}
                <View style={{flex: 1}}>
                    <View
                        style={[{
                            paddingTop: 10,
                            paddingHorizontal: SIZES.base*2,
                            backgroundColor: COLORS.white,
                        }, styles.shadow]}
                    >
                        <Text style={{...FONTS.body3, fontWeight: 'bold', textTransform: 'uppercase'}}>Thông tin task</Text>
                        <BorderHorizontal/>
                        {itemTask(icons.user, 'Người tạo', 'Nguyễn Văn Thỏa (thoanv)', ' Chuyên viên phần mềm')}
                        {itemTask(icons.more, 'Phòng ban', 'Ban công nghệ')}
                        {itemTask(icons.clock, 'Thời gian tạo', '09:10 12/12/2022')}
                        {itemTask(icons.process, 'Quy trình', '[BCN] Xác nhận công')}
                    </View>
                </View>
            </View>
        )
    }
    function renderBottomButton () {
        return (
            <View style={{flexDirection: 'row', backgroundColor: COLORS.primary}}>
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
            <View style={{flexDirection: 'row', marginBottom: SIZES.base}}>
                {/* Custom Scrollbar */}
                <View style={{flex: 1}}>
                    <View
                        style={[{
                            paddingTop: 10,
                            paddingHorizontal: SIZES.base*2,
                            backgroundColor: COLORS.white,
                        }, styles.shadow]}
                    >
                        <Text style={{...FONTS.body3, fontWeight: 'bold', textTransform: 'uppercase'}}>Tài liệu đính kèm (2)</Text>
                        <BorderHorizontal/>
                  
                        <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                            <View>
                                <Image
                                    source={icons.pdf}
                                    resizeMode="cover"
                                    style= {{
                                        width: 45,
                                        height: 45,
                                        marginRight: SIZES.base*2,
                                    }}
                                />
                               
                            </View>
                                
                            <View style={{width: '83%',borderBottomColor: COLORS.darkgray, borderBottomWidth: 1, paddingBottom: SIZES.base}}>
                                <Text>X_c nh_n C_ng th_ng 1_Ban C_ng ngh_ .pdf </Text>
                                <View style={{flexDirection: 'row', marginBottom: 5}}>
                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>100KB</Text>
                                    <Dot/>
                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>20:12 12/12/2022</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity
                                        style={styles.button}
                                    >
                                        <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Trình ký</Text>
                                    </TouchableOpacity>
                                    <Dot/>
                                    <TouchableOpacity
                                        style={styles.button}
                                    >
                                        
                                        <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Tải xuống</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                        <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                            <View>
                                <Image
                                    source={icons.pdf}
                                    resizeMode="cover"
                                    style= {{
                                        width: 45,
                                        height: 45,
                                        marginRight: SIZES.base*2
                                    }}
                                />
                                <Image
                                    source={icons.check_green}
                                    resizeMode="cover"
                                    style= {{
                                        width: 18,
                                        height: 18,
                                        position: 'absolute',
                                        right: 8,
                                        top: -5,
                                    }}
                                />
                            </View>
                                
                            <View style={{paddingBottom: SIZES.base}}>
                                <Text>X_c nh_n C_ng th_ng 1_Ban C_ng ngh_ .pdf </Text>
                                <View style={{flexDirection: 'row', marginBottom: 5}}>
                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>100KB</Text>
                                    <Dot/>
                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>20:12 12/12/2022</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity
                                        style={styles.button}
                                    >
                                        <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Trình ký</Text>
                                    </TouchableOpacity>
                                    <Dot/>
                                    <TouchableOpacity
                                        style={styles.button}
                                    >
                                        
                                        <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Tải xuống</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
                      
                    </View>
                </View>
            </View>
        )
    }
    function renderUserSignature() {
        return (
            <View style={{flexDirection: 'row', marginBottom: SIZES.base}}>
                {/* Custom Scrollbar */}
                <View style={{flex: 1}}>
                    <View
                        style={[{
                            paddingTop: 10,
                            paddingHorizontal: SIZES.base*2,
                            backgroundColor: COLORS.white,
                        }, styles.shadow]}
                    >
                        <Text style={{...FONTS.body3, fontWeight: 'bold', textTransform: 'uppercase'}}>Người xét duyệt</Text>
                        <BorderHorizontal/>
                  
                        
                        <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                            <View>
                                <View style={styles.profileImgContainer}>
                                    <Image
                                        source={{ uri:"https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/18476/7acf4cadf975128573a8b1c2766af5d8/main/368/368edeb236f40dd77fc67cc80457f7b5/thoa.png" }}
                                        resizeMode="cover"
                                        style= {{
                                            width: 45,
                                            height: 45,
                                            marginRight: SIZES.base*2
                                        }, styles.profileImg}
                                    />
                                </View>
                                
                                <Image
                                    source={icons.check_green}
                                    resizeMode="cover"
                                    style= {{
                                        width: 20,
                                        height: 20,
                                        position: 'absolute',
                                        right: 10,
                                        top: -5,
                                    }}
                                />
                            </View>
                                
                            <View style={{paddingBottom: SIZES.base}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold'}}>NGuyễn Văn Thỏa </Text>
                                    <Dot />
                                    <Text style={{fontWeight: 'bold'}}>@thoanv</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>Chuyên viên phát triển  phần mềm</Text>
                                    
                                </View>
                                
                            </View>
                            
                        </View>
                        <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                            <View>
                                <View style={styles.profileImgContainer}>
                                    <Image
                                        source={{ uri:"https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/18476/7acf4cadf975128573a8b1c2766af5d8/main/368/368edeb236f40dd77fc67cc80457f7b5/thoa.png" }}
                                        resizeMode="cover"
                                        style= {{
                                            width: 45,
                                            height: 45,
                                            marginRight: SIZES.base*2
                                        }, styles.profileImg}
                                    />
                                </View>
                                
                                <Image
                                    source={icons.check_green}
                                    resizeMode="cover"
                                    style= {{
                                        width: 20,
                                        height: 20,
                                        position: 'absolute',
                                        right: 10,
                                        top: -5,
                                    }}
                                />
                            </View>
                                
                            <View style={{paddingBottom: SIZES.base}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{fontWeight: 'bold'}}>NGuyễn Văn Thỏa </Text>
                                    <Dot />
                                    <Text style={{fontWeight: 'bold'}}>@thoanv</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>Chuyên viên phát triển  phần mềm</Text>
                                    
                                </View>
                                
                            </View>
                            
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    function renderAction(){
        return (
            <View style={{flexDirection: 'row', marginBottom: SIZES.base}}>
            {/* Custom Scrollbar */}
            <View style={{flex: 1}}>
                <View
                    style={[{
                        paddingTop: 10,
                        paddingHorizontal: SIZES.base*2,
                        backgroundColor: COLORS.white,
                    }, styles.shadow]}
                >
                    <Text style={{...FONTS.body3, fontWeight: 'bold', textTransform: 'uppercase'}}>Hành động</Text>
                    <BorderHorizontal/>
              
                    
                    <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                        <View>
                            <View style={styles.profileImgContainer}>
                                <Image
                                    source={{ uri:"https://haiphatland-bitrix24.s3.ap-southeast-1.amazonaws.com/resize_cache/18476/7acf4cadf975128573a8b1c2766af5d8/main/368/368edeb236f40dd77fc67cc80457f7b5/thoa.png" }}
                                    resizeMode="cover"
                                    style= {{
                                        width: 45,
                                        height: 45,
                                        marginRight: SIZES.base*2
                                    }, styles.profileImg}
                                />
                            </View>
                            
                            <Image
                                source={icons.check_green}
                                resizeMode="cover"
                                style= {{
                                    width: 20,
                                    height: 20,
                                    position: 'absolute',
                                    right: 10,
                                    top: -5,
                                }}
                            />
                        </View>
                            
                        <View style={{paddingBottom: SIZES.base}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>NGuyễn Văn Thỏa </Text>
                                <Dot />
                                <Text style={{fontWeight: 'bold'}}>@thoanv</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>Chuyên viên phát triển  phần mềm</Text>
                                
                            </View>
                            
                        </View>
                        
                    </View>
                   
                </View>
            </View>
        </View>
        )
    }
    function itemTask(icon, title, value, position= '') {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: SIZES.base
                }}
            >
                <View style={{width: width_screen/3, flexDirection: 'row'}}>
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style= {{
                            width: 20,
                            height: 20,
                            marginRight: SIZES.base
                        }}
                    />
                    <Text style={{...FONTS.body4, fontWeight: 'bold'}}>{title}</Text>
                </View>
                <View>
                    <Text>{value}</Text>
                    {position !== '' && (<Text>{position}</Text>)}
                </View>
            </View>
        )
    }
    function renderBottomButton () {
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.white, borderTopColor: COLORS.darkgrayText, borderTopWidth: 1}}>

                {/* Start Reading */}
                <TouchableOpacity
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.oragin,
                        marginHorizontal: SIZES.largeTitle,
                        marginVertical: SIZES.base,
                        borderRadius: SIZES.base,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress = {() => console.log("Start Reading")}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: SIZES.base}}>Xác nhận ký</Text>

                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                {renderHeader()}
            </View>
            <View style={{flex: 12}}>
                <ScrollView>
                    {renderTitle()}
                    {renderInfoTask()}
                    {renderFileSignature()}
                    {renderUserSignature()}
                    {renderAction()}
                </ScrollView>
               
            </View>
            <View style={{height: 60, marginBottom: 0}}>
                {renderBottomButton()}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor: COLORS.darkgray
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
    },
    profileImgContainer: {
        marginRight: SIZES.base*2,
        
      },
      profileImg: {
        height: 45,
        width: 45,
        borderRadius: 45,
        borderColor: COLORS.darkgrayText,
        borderWidth: 1,
        padding: 1,
      },
 
})

export default Detail;