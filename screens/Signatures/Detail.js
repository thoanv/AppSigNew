import React, { useState, useEffect, useRef  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    SafeAreaView,
    FlatList,
    Animated,
    Button
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import BorderHorizontal from '../../components/borderHorizontal';
import Dot from '../../components/dot';
import { POST_DATA } from '../ultils/api';
import Modal from "react-native-modal";
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

    const fadeAnim = useRef(new Animated.Value(0)).current;

   
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    function renderHeader() {
        return (
            <View style={{flex: 1, backgroundColor: COLORS.white, borderBottomColor: COLORS.darkgray, borderBottomWidth: 1}}>
            
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
        const previouStage = () => {
            let previous = data.PREVIOUS_STAGE;
            if(previous){
                return (
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: SIZES.base, borderColor: COLORS.darkgray, borderWidth: 1, borderRadius: 10, paddingHorizontal: 5}}>
                            <Text style={{ ...FONTS.body5 }}>
                                {previous.NAME}
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center'}}>
                            <Image
                                source={icons.right_arrow}
                                style={{
                                    width: 15,
                                    height: 15,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </View>
                    </View>
                )
            }
            
        }
        const stage = () => {
            let stage = data.STAGE;
            if(stage){
                return (
                    <View style={{ marginLeft: SIZES.base,  borderColor: COLORS.darkgray, borderWidth: 1, borderRadius: 10, paddingHorizontal: 5}}>
                        <Text style={{ ...FONTS.body5 }}>
                            {data.STAGE.NAME}
                        </Text>
                    </View>
                )
            }
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
                                    Giai đoạn:
                                </Text>
                                <View style={{flexDirection: 'row', marginTop: SIZES.base}}>
                                    {previouStage()}
                                    {stage()}
                                </View>
                                
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
            let nameUser = `${created_at['LAST_NAME']} ${created_at['NAME']}`
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
                            {itemTaskUser(icons.user, 'Người tạo', nameUser,  created_at.LOGIN, created_at.WORK_POSITION  )}
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
            return (
                <View style={{paddingVertical: SIZES.base, flexDirection: 'row', width: '100%'}}>
                    <View>
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
                            {item.CHECK && (
                                <Image
                                source={icons.check_green}
                                resizeMode="cover"
                                style= {{
                                    width: 18,
                                    height: 18,
                                    position: 'absolute',
                                    right: 10,
                                    top: -5,
                                }}
                            />
                            )}
                            
                    </View>
                   
                    <View>
                        <Text>{item.NAME} {item.ID} </Text>
                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.SIZE}</Text>
                            <Dot/>
                            <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.CREATED_TIME}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=> navigation.navigate("Signature", {
                                    rpa: data.ID_RPA,
                                    task: data.ID_TASK,
                                    file_id: item.ID
                                })}
                            >
                                <Text style={{color: COLORS.primary, fontWeight: 'bold'}}>Ký</Text>
                            </TouchableOpacity>
                            <Dot/>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=> navigation.navigate("Signature")}
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
                        <Text style={{...FONTS.body3, fontWeight: 'bold', textTransform: 'uppercase'}}>Tài liệu đính kèm ({data.TOTAL_FILE})</Text>
                        <BorderHorizontal/>
                  
                        <FlatList
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
        const renderItemUser = ({item}) => {
            if(item.INFORMATION){
                let user = item.INFORMATION;
                let path = user.PATH  ? { uri:user.PATH } : icons.user
                return (
                    <View style={{paddingVertical: SIZES.base, flexDirection: 'row'}}>
                        <View>
                            <View style={styles.profileImgContainer}>
                                <Image
                                    source={path}
                                    resizeMode="cover"
                                    style= {{
                                        width: 45,
                                        height: 45,
                                        marginRight: SIZES.base*2
                                    }, styles.profileImg}
                                />
                            </View>
                            {(data.TOTAL_FILE == item.FILE_SIGNATURE) && (
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
                            )}
                            
                        </View>
                            
                        <View style={{paddingBottom: SIZES.base}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{fontWeight: 'bold'}}>{user.LAST_NAME} {user.NAME} </Text>
                                <Dot />
                                <Text style={{fontWeight: 'bold'}}>@{user.LOGIN}</Text>
                            </View>
                            
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{user.WORK_POSITION ? user.WORK_POSITION : 'Nhân viên'}</Text>
                                
                            </View>
                            
                        </View>
                        
                    </View>
                )
            }
           
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
                        <Text style={{...FONTS.body3, fontWeight: 'bold', textTransform: 'uppercase'}}>Người xét duyệt</Text>
                        <BorderHorizontal/>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItemUser}
                            data={data.USER_SIGS}
                            keyExtractor={(item, index) => index.toString()}
                        />
                      
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
                        <Text style={{...FONTS.body4}}>{value} </Text>
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
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.white, borderTopColor: COLORS.darkgray, borderTopWidth: 1}}>
              
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
                    onPress={toggleModal}
                >
                
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image
                            source={icons.up_down}
                            resizeMode="cover"
                            style= {{
                                width: 15,
                                height: 15,
                                tintColor: COLORS.white
                            }}
                        />

                        <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: SIZES.base}}>Xác nhận</Text>
                    </View>
           
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView  style={styles.container}>
            
            <View style={{flex: 1}}>
                {renderHeader()}
            </View>
            <View style={{flex: 10}}>
                <ScrollView style={{flexGrow: 1}}
                                 nestedScrollEnabled={true}>
                    {renderTitle()}
                    {renderInfoTask()}
                    {(data.TOTAL_FILE > 0) && (renderFileSignature())}
                    {renderUserSignature()}
                </ScrollView>
            </View>
            <View style={{height: 60, marginBottom: 0}}>
                {renderBottomButton()}
            </View>
           
            <View>

                <Modal isVisible={isModalVisible}>
                    <View style={{backgroundColor: COLORS.white, borderRadius: SIZES.padding}}>
                        <View style={styles.stage}>
                            <TouchableOpacity style={styles.itemStage}>
                                <Text style={{color: 'green', ...FONTS.body4}}>Trưởng ban công nghệ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stage}>
                            <TouchableOpacity style={styles.itemStage}>
                                <Text style={{color: 'green', ...FONTS.body4}}>Trưởng bộ phận</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stage}>
                            <TouchableOpacity style={styles.itemStage}>
                                <Text style={{color: 'green', ...FONTS.body4}}>Xác nhận công</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stage}>
                            <TouchableOpacity style={styles.itemStage}>
                                <Text style={{color: 'green', ...FONTS.h6}}>Trưởng phòng HCNS</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stageEnd}>
                        
                            <TouchableOpacity style={styles.itemStage}  onPress={toggleModal}>
                                <Text style={{color: 'red', ...FONTS.body4}}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
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
        borderColor: COLORS.border,
        borderWidth: 1,
        padding: 1,
    },
    borderBottom:{
        borderBottomColor: COLORS.darkgray, 
        borderBottomWidth: 1, 
    },
 
    fadingContainer: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 5,
        backgroundColor: COLORS.white,
        position: 'absolute',
        left: 0,
        width: '100%',
        zIndex: 0,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,

    },
    fadingText: {
        fontSize: 28
    },
    stage:{
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stageEnd:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemStage:{
        paddingVertical: 10
    }
})

export default Detail;