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
    FlatList
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

const List = ({ route, navigation }) => {
    const data = [
        {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Đề xuất tạm ứng 30% lương cho nhân viên Nguyễn Văn Thỏa chuyên viên phần mềm",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"Đề xuất tạm ứng 30% lương cho nhân viên",     comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"Đề xuất tạm ứng 30% lương", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Đề xuất tạm ứng 30% lương cho nhân viên Nguyễn Văn Thỏa chuyên viên phần mềm",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Nguyễn Văn Thỏa",  comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name:"chuyên viên phần mềm", comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"Đề xuất tạm ứng 30% lương cho nhân viên Nguyễn Văn Thỏa chuyên viên phần mềm",      comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
      ]
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
                            <Text style={{...FONTS.h3,}}>[BCN] Xác nhận công</Text>
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

    function renderBody() {
        return (
            <FlatList
                data={data}
                ItemSeparatorComponent={() => {
                  return (
                    <View style={styles.separator}/>
                  )
                }}
                keyExtractor={(item)=>{
                  return item.id;
                }}
                renderItem={(item) => {
                    const Notification = item.item;
                    return(
                        <View style={{paddingVertical: SIZES.base, paddingHorizontal: SIZES.base}}>
                            <TouchableOpacity
                                onPress={()=> navigation.navigate("Detail",{
                                    ID_RPA: 43,
                                    ID_TASK: 69
                                })
                            }>
                            <View style={{flexDirection: 'row', }} >
                                <Image
                                    source={icons.pdf}
                                    resizeMode="contain"
                                    style={styles.image}
                                />
                                <View style={styles.content}>
                                    <View style={styles.contentHeader}>
                                        <Text  style={styles.name}>{Notification.name}</Text>
                                    </View>
                                    <View style={{marginTop: SIZES.base}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flexDirection: 'row', marginRight: SIZES.base*2}}>
                                                <Image
                                                     source={icons.black_user}
                                                     resizeMode="cover"
                                                     style= {{
                                                         width: 18,
                                                         height: 18,
                                                         marginRight: SIZES.base,
                                                         tintColor: COLORS.darkgrayText
                                                     }}
                                                />
                                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>NGuyễn Văn Thỏa</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Image
                                                     source={icons.more}
                                                     resizeMode="cover"
                                                     style= {{
                                                         width: 18,
                                                         height: 18,
                                                         marginRight: SIZES.base,
                                                         tintColor: COLORS.darkgrayText
                                                     }}
                                                />
                                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>Ban Công nghệ</Text>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', marginTop: 5}}>
                                            <View style={{flexDirection: 'row', marginRight: SIZES.base*2}}>
                                                <Image
                                                     source={icons.clock}
                                                     resizeMode="cover"
                                                     style= {{
                                                         width: 18,
                                                         height: 18,
                                                         marginRight: SIZES.base,
                                                         tintColor: COLORS.darkgrayText
                                                     }}
                                                />
                                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>09:09 22/05/2022</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Image
                                                     source={icons.file}
                                                     resizeMode="cover"
                                                     style= {{
                                                         width: 18,
                                                         height: 18,
                                                         marginRight: SIZES.base,
                                                         tintColor: COLORS.darkgrayText
                                                     }}
                                                />
                                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>1/2</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                    );
                }
            }/>
        );
    }


    return (
        <View style={styles.container}>
            {/* Book Cover Section */}
            <View style={{flex: 1}}>
                {renderHeader()}
            </View>
            {/* Description */}
            <View style={{flex: 10}}>
                {renderBody()}
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
    },

    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image:{
        width:45,
        height:45,
        borderRadius:20,
        marginLeft:SIZES.base,
    },
    time:{
        fontSize:11,
        color:"#808080",
    },
    name:{
        fontSize:16,
        fontWeight:"bold",
    },
})

export default List;