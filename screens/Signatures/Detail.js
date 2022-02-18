import React, { useState, useEffect } from 'react';
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
    Button,
    FlatList
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import BorderHorizontal from '../../components/borderHorizontal';
import Dot from '../../components/dot';
import { GET_DATA, POST_DATA } from '../ultils/api';
const width_screen  = Dimensions.get('window').width;
const Detail = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    React.useEffect(() => {
        let id_rpa = route.params.ID_RPA;
        let id_task = route.params.ID_TASK;
        let payload = {
            'rpa' : id_rpa,
            'task': id_task
        };
        let url = `/signature-detail.php`;
        POST_DATA(`${url}`, payload).then(res => {
            if(res['success'] == 1){
                setData(res['data'])
            }
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
    }, [])
    function renderHeader() {
        return (
            <View style={{flex: 1, backgroundColor: COLORS.white, borderBottomColor: COLORS.darkgrayText, borderBottomWidth: 1}}>
            
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
                        <Text style={{...FONTS.h2}}>{data.NAME_TASK}</Text>
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
        let created_at = data.CREATED_BY;
        if(created_at) {
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
                            {itemTaskUser(icons.user, 'Người tạo', created_at.LAST_NAME ? created_at.LAST_NAME : ''+' '+created_at.NAME ? created_at.NAME : '',  created_at.LOGIN, created_at.WORK_POSITION  )}
                            {itemTask(icons.more, 'Phòng ban', created_at.WORK_DEPARTMENT)}
                            {itemTask(icons.clock, 'Thời gian tạo', data.CREATED_AT)}
                            {itemTask(icons.process, 'Quy trình', data.NAME_RPA)}
                        </View>
                    </View>
                </View>
            )
        }
    }

    
    function renderFileSignature() {
        const renderItemFile = ({item})=> {
            // console.log(item)
            return (
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
                        <Text>{item.NAME} </Text>
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
            )
        }
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
                  
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItemFile}
                            data={data.FILES}
                            keyExtractor={item => `f${item.ID}`}
                        />
                      
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
    
    function itemTaskUser(icon, title, value, login, position= '') {
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
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{...FONTS.body4}}>NGuyễn Văn Thỏa </Text>
                        <Dot />
                        <Text>@{login}</Text>
                    </View>
                    {position !== '' && (<Text>{position}</Text>)}
                </View>
            </View>
        )
    }
    function itemTask(icon, title, value) {
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
                        justifyContent: 'center',
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
            <View style={{flex: 9}}>
                <ScrollView>
                    {renderTitle()}
                    {renderInfoTask()}
                    {renderFileSignature()}
                    {renderUserSignature()}
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