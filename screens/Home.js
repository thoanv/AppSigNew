import React , { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons, COLORS, images, SIZES, FONTS } from '../constants'
import { GET_DATA } from './ultils/api'
const LineDivider = () => {
    return (
        <View style={{width: 1, paddingVertical: 18}}>
            <View style={{flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1}}></View>
        </View>
    )
}
const Home = ({navigation}) => {

    const [dataSignatures, setDataSignatures] = useState([])
    const [userLogin, setUserLogin] = useState([])
    const [countTask, setCountTask] = useState(0)
    const [countProcedure, setCountProcedure] = useState(0)
    useEffect(() => {
        async function fetchList() {
            let url = '/signature-lists.php';
            GET_DATA(`${url}`).then(response => {
                if(response['success'] == 1){
                    setDataSignatures(response['data']);
                    setUserLogin(response['name_user']);
                    setCountProcedure(response['count_procedure']);
                    setCountTask(response['count_task']);
                }
             }).catch((error)=>{
                console.log("Api call error");
                alert(error.message);
             });
        }
        fetchList();
    }, []);
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginVertical: SIZES.padding ,
                    marginHorizontal: SIZES.padding,
                }}
            >
                <View style={{flex: 1}}>
                    <Text style={{...FONTS.h2}}>Hello!</Text>
                    <Text style={{...FONTS.body3, color: COLORS.gray}}>{userLogin}</Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.lightGray
                        }}
                    >
                    <View>
                        <Image
                            source={icons.search}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.secondary
                            }}
                        />
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    function renderButtonSection() {
        return (
            <View style={{justifyContent: 'center', padding: SIZES.base, marginBottom: SIZES.base}}>
                <View style={{flexDirection: 'row', height: 50, backgroundColor: COLORS.primary, borderRadius: SIZES.base}}>
                    {/* Claim */}
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image
                            source={icons.proccess}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                        <Text style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}>{countProcedure} Quy trình</Text>
                    </View>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get Point */}

                    <View style={{
                        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Image
                            source={icons.task}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.white
                            }}
                        />
                        <Text
                            style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}
                        >
                            {countTask} Task
                        </Text>
                    </View>

                     {/* Divider */}

                </View>
            </View>
        )
    }

    function renderDataSection () {

        const renderItemChild = (item_, index_) => {
            let value = item_.item
           return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginLeft: item_.index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.base,
                    marginVertical: SIZES.base
                }}
                onPress={()=> navigation.navigate("BookDetail", {
                    book:item
                })}
            >
                <View style={styles.cardShadow}>
                     <View style={styles.cardContainer}>

                         <Image
                             source={icons.pdf}
                             resizeMode="cover"
                             style= {{
                                 width: 40,
                                 height: 40,
                             }}
                         />
                        <Text style={{...FONTS.h5, marginTop: SIZES.base}}>{value.NAME_TASK}</Text>
                        <View style={{marginTop: SIZES.base}}>
                            <View style={{flexDirection: 'row', }}>
                            <Image
                                 source={icons.black_user}
                                 resizeMode="cover"
                                 style= {{
                                     width: 20,
                                     height: 20,
                                     marginRight: SIZES.base
                                 }}
                             />
                             <Text style={{...FONTS.body3}}>{value.CREATED_BY.LAST_NAME} {value.CREATED_BY.NAME}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginTop: 2}}>
                                <Image
                                     source={icons.clock}
                                     resizeMode="cover"
                                     style= {{
                                         width: 20,
                                         height: 20,
                                         marginRight: SIZES.base
                                     }}
                                 />
                                 <Text style={{...FONTS.body3}}>{value.CREATED_AT}</Text>
                                </View>
                        </View>
                     </View>

                </View>
            </TouchableOpacity>
           )
        }
        const renderItem = ({item, index}) => {
            return (
                <View style={{flex: 1, marginBottom: 25}}>
                    {/* Hearder */}
                    <View style={{paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: COLORS.black, ...FONTS.h4}}>{item.TITLE}</Text>

                        <TouchableOpacity onPress={()=> {console.log("See more")}}>
                            <Text style={{color: COLORS.primary, ...FONTS.body4, alignSelf: 'flex-start', marginRight: SIZES.base}}>Xem thêm ></Text>
                        </TouchableOpacity>
                    </View>

                    {/* Books */}
                    <View style={{flex: 1, marginTop: SIZES.base}}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={renderItemChild}
                            data={item.LIST_TASK}
                            keyExtractor={item => `${item.ID_TASK}`}
                        />
                    </View>
                </View>
            )
        }
        return (
            <View style={{ marginTop: SIZES.padding}}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    data={dataSignatures}
                    keyExtractor={item => `${item.ID}`}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            <View style={styles.container}>
                 {renderHeader()}
                 {renderButtonSection()}
                 {renderDataSection()}
                 {renderDataSection()}
                 {renderDataSection()}
            </View>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardShadow: {
         borderRadius: 10,
         backgroundColor: 'transparent',
         shadowColor: '#000',
         marginRight: 10,
         shadowOffset: {
            width: 0,
            height: 1,
         },
         shadowOpacity: 0.22,
         shadowRadius: 2.22,
         elevation: 5,
    },
    cardContainer: {
         backgroundColor: '#fff',
         padding: 10,
         borderRadius: 10,
         overflow: 'hidden',
         width: 240,
         alignItems: 'flex-start',
         paddingTop: SIZES.padding2,
    },
    cardInfor:{
        marginTop: SIZES.padding_15,
        width: 180,
        color: COLORS.white,
        shadowColor: "#000",
    }
})
export default Home;