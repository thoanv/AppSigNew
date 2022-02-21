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
import { POST_DATA } from '../ultils/api';
import Pdf from 'react-native-pdf';
const LineDivider = () => {
    return (
        <View style={{width: 1, paddingVertical: 5}}>
            <View style={{flex: 1, borderColor: COLORS.lightGray2, borderLeftWidth: 1}}></View>
        </View>
    )

}

const Signature = ({ route, navigation }) => {

    const [file, setFile] = React.useState();
    const [signature, setSignature] = React.useState('');
    const [localSignature, setLocalSignature] = React.useState([]);
    const [pageCurrent, setPageCurrent] = React.useState(0);
    const [totalPage, setTotalPage] = React.useState(0);
    React.useEffect(() => {
        const id_rpa = route.params.rpa;
        const id_task = route.params.task;
        const id_file = route.params.file_id;
        let payload = {
            'rpa' : id_rpa,
            'task' : id_task,
            'file_id': id_file,
        };

        let url = `/signature-sign.php`;
        POST_DATA(`${url}`, payload).then(res => {
            if(res['success'] == 1){
                setLocalSignature(res['data']);
                setSignature(res['signature'])
                setFile(res['file'])
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
                            <Text style={{...FONTS.h3,}}>Văn bản</Text>
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
    function renderSignature(val){
        console.log(val)
        return (
            <View style={{ position: 'absolute', top: 10, zIndex: 999999999999}}>
                <Image 
                    source={{uri: signature}}
                    style={{
                        width: 160,
                        height: 70
                    }}
                />
            </View>
        )
        
    }
    function renderBody() {
        if(file){
            const source = { uri: file.PATH, cache: true };
            return (
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/* Custom Scrollbar */}
                    <View style={styles.container}>
                        <View style={styles.pdf}>
                            <Pdf
                                enablePaging = {true}
                                ref={(pdf) => { pdf = 2; }}
                                source={source}
                                onLoadComplete={(numberOfPages,filePath) => {
                                    setTotalPage(numberOfPages);
                                }}
                                onPageChanged={(page,numberOfPages) => {
                                    setPageCurrent(page);
                                }}
                                onError={(error) => {
                                    console.log(error);
                                }}
                                onPressLink={(uri) => {
                                    console.log(`Link pressed: ${uri}`);
                                }}
                                style={styles.pdf}/>
                                {
                                    Object.entries(localSignature).map(([key, value]) => {
                                        if(Number(key) == pageCurrent){
                                            return Object.entries(value).map(([key_, value_]) => {
                                                return (
                                                    <View style={{position:'absolute', top: 10, left: 20}}>
                                                        <Image 
                                                            source={{uri: signature}}
                                                            style={{
                                                                width: 100,
                                                                height: 50
                                                            }}
                                                        />
                                                    </View>
                                                )
                                            })
                                        }
                                        
                                    })
                                //      Object.entries(localSignature).map(([key, value]) => {
                                //         if(key == pageCurrent){
                                //         Object.entries(value).map(([key_, value_]) => {
                                //             renderSignature()
                                //         });
                                //     }
                                // });
                                }
                               
                                
                        </View>
                        
                    </View>
                </View>
            )
        }      
       
    }

    function renderFooter () {
        return (
            <View style={{flex: 1, flexDirection: 'row', backgroundColor: COLORS.white, borderTopColor: COLORS.border, borderTopWidth: 1}}>

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
                        <Image
                            source={icons.signature}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.white
                            }}
                        />
                        <Text style={{color: COLORS.white, ...FONTS.body4, marginLeft: SIZES.base}}>Xác nhận ký</Text>

                    </View>
                </TouchableOpacity>
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
                {renderBody()}
            </View>
            {/* Buttons */}
            <View style={{height: 60, marginBottom: 0}}>
                {renderFooter()}
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