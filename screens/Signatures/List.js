import React, { useState, useEffect  } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { POST_DATA } from '../ultils/api';
import PlaceholderList from '../../components/placeholderList';
const List = ({ route, navigation }) => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [limit, setLimit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [empty, setEmpty] = useState(false);
    useEffect(() => {
        setIsLoadingData(true)
        const id_rpa = route.params.ID_RPA;
        const name_rpa = route.params.NAME_RPA;
        setTitle(name_rpa);
        let payload = {
            'rpa' : id_rpa,
            'limit': limit,
        };
        let url = `/signature-list-task.php`;
        POST_DATA(`${url}`, payload).then(res => {
            if(res['success'] == 1){
                setData(res['data']);
                setLimit(limit+15);
                setIsLoadingData(false)
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
                            <Text style={{...FONTS.h3,}}>{title}</Text>
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
    const _onEndReachedLoad = () => {
        if(!empty){
            setIsLoading(true)
            const id_rpa = route.params.ID_RPA;
            let payload = {
                'rpa' : id_rpa,
                'limit': limit,
            };
            let url = `/signature-list-task.php`;
            POST_DATA(`${url}`, payload).then(res => {
                if(res['success'] == 1){
                    if(res['data'].length){
                        const result =  data.concat(res['data']);
                        console.log(res['data'])
                        setData(result);
                        setLimit(limit+15);
                    }
                    else{
                        setEmpty(true)
                    }
                }
                setIsLoading(false)
            }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
            });
        }
    }
    const _handleOnRefresh = () => {
        const limit_ = 0;
        setData([]);
        setEmpty(false);
        setIsLoading(false);
        setIsLoadingData(true);
        const id_rpa = route.params.ID_RPA;
        let payload = {
            'rpa' : id_rpa,
            'limit': limit_,
        };
        let url = `/signature-list-task.php`;
        POST_DATA(`${url}`, payload).then(res => {
            setLimit(limit_);
            if(res['success'] == 1){
                setData(res['data']);
                setLimit(15);
                setIsLoadingData(false);
            }
         }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
         });
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
                  return 'a'+item.ID;
                }}
                refreshing={false}
                onRefresh={() => _handleOnRefresh()}
                onEndReachedThreshold={0.5}
                onEndReached={() => 
                    _onEndReachedLoad()
                }
                ListFooterComponent={() => (empty == true ? 
                    <View style={{justifyContent:'center', alignItems: 'center'}}><Text style={styles.emptyMessageStyle}>Dữ liệu trống</Text></View> 
                    : null)}
                renderItem={({item}) => {
                    let createBy = item.CREATED_BY;
                    const bg = item.FILE_SIGNED == item.COUNT_FILE ? '#FFF' : '#d2e4f5';
                    return(
                        <View style={{paddingVertical: SIZES.base, paddingHorizontal: SIZES.base, backgroundColor: bg}}>
                            <TouchableOpacity
                                onPress={()=> navigation.navigate("Detail",{
                                    ID_RPA: route.params.ID_RPA,
                                    ID_TASK: item.ID
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
                                        <Text  style={styles.name}>{item.NAME}</Text>
                                    </View>
                                    <View style={{marginTop: SIZES.base}}>
                                        <View style={{flexDirection: 'row'}}>
                                            {createBy && (
                                                <>
                                                <View style={{flexDirection: 'row', marginRight: SIZES.base*2,  alignItems: 'center',}}>
                                                    <Image
                                                        source={icons.black_user}
                                                        resizeMode="cover"
                                                        style= {{
                                                            width: 16,
                                                            height: 16,
                                                            marginRight: SIZES.base,
                                                            tintColor: COLORS.darkgrayText
                                                        }}
                                                    />
                                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{createBy.FULLNAME}</Text>
                                                </View>
                                           
                                                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                                    <Image
                                                        source={icons.more}
                                                        resizeMode="cover"
                                                        style= {{
                                                            width: 16,
                                                            height: 16,
                                                            marginRight: SIZES.base,
                                                            tintColor: COLORS.darkgrayText
                                                        }}
                                                    />
                                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText, textTransform: 'capitalize'}}>{createBy.WORK_DEPARTMENT}</Text>
                                                </View>
                                                </>
                                            )}
                                        </View>
                                        <View style={{flexDirection: 'row', marginTop: 3}}>
                                            <View style={{flexDirection: 'row', marginRight: SIZES.base*2 , alignItems: 'center',}}>
                                                <Image
                                                     source={icons.clock}
                                                     resizeMode="cover"
                                                     style= {{
                                                         width: 16,
                                                         height: 16,
                                                         marginRight: SIZES.base,
                                                         tintColor: COLORS.darkgrayText
                                                     }}
                                                />
                                                <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.CREATED_TIME}</Text>
                                            </View>
                                            {item.checkCreatedByAndUserSig == true && (
                                                <View style={{flexDirection: 'row' , alignItems: 'center',}}>
                                                    <Image
                                                        source={icons.file}
                                                        resizeMode="cover"
                                                        style= {{
                                                            width: 16,
                                                            height: 16,
                                                            marginRight: SIZES.base,
                                                            tintColor: COLORS.darkgrayText,
                                                        }}
                                                    />
                                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText, fontWeight: 'bold'}}>{item.FILE_SIGNED}/{item.COUNT_FILE}</Text>
                                                </View>
                                            )}
                                            
                                        </View>
                                        {item.STAGE && (
                                            <View style={{flexDirection: 'row', marginTop: 3}}>
                                                <View style={{flexDirection: 'row', marginRight: SIZES.base*2, alignItems: 'center',}}>
                                                    <Image
                                                        source={icons.proccess}
                                                        resizeMode="cover"
                                                        style= {{
                                                            width: 16,
                                                            height: 16,
                                                            marginRight: SIZES.base,
                                                            tintColor: COLORS.darkgrayText,
                                                        }}
                                                    />
                                                    <Text style={{...FONTS.body4, color: COLORS.darkgrayText}}>{item.STAGE.NAME}</Text>
                                                </View>
                                                
                                                
                                            </View>
                                        )}
                                        

                                    </View>
                                    <View style={{marginTop: SIZES.base}}>
                                        <View style={{flexDirection: 'row'}}>
                                        <FlatList
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={(itemUser) => {
                                                const ite = itemUser.item
                                                if(ite.INFORMATION){
                                                    const user = ite.INFORMATION;
                                                    return (
                                                        <View style={{marginRight: SIZES.base*2}}>
                                                            {user.PATH ? (
                                                                <Image 
                                                                    source={{uri: user.PATH}}
                                                                    style={{
                                                                        width: 35,
                                                                        height: 35,
                                                                        borderRadius: 15,
                                                                        borderWidth: 1,
                                                                        borderColor: COLORS.darkgray
                                                                    }}
                                                                />
                                                            ):(
                                                                <Image 
                                                                    source={icons.user}
                                                                    style={{
                                                                        width: 35,
                                                                        height: 35,
                                                                        borderRadius: 15,
                                                                        borderWidth: 1,
                                                                        borderColor: COLORS.darkgray
                                                                    }}
                                                                />
                                                            )}
                                                            {ite.FILE_SIGNATURE == item.COUNT_FILE && (
                                                                <Image 
                                                                    source={icons.check_green}
                                                                    style={{
                                                                        width: 15,
                                                                        height: 15,
                                                                        position:'absolute',
                                                                        right: -5,
                                                                        top: 0
                                                                    }}
                                                                />
                                                            )}
                                                            
                                                        </View>
                                                    )
                                                }
                                                
                                            }}
                                            data={item.USERS}
                                            keyExtractor={(itemUser, index) => `u${item.ID} ${index}`}
                                        />
                                        
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
                {isLoadingData ? (
                    <>
                        <PlaceholderList />
                        <PlaceholderList />
                        <PlaceholderList />
                        <PlaceholderList />
                        <PlaceholderList />
                        <PlaceholderList />
                    </>
                ):(
                    renderBody()
                )}
               
                {isLoading == true && (
                    <PlaceholderList />
                )}
               
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