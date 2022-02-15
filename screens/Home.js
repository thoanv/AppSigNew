import React from 'react';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons, COLORS, images, SIZES, FONTS } from '../constants'

const Home = () => {

    const featuresData = [
        {
            id: 1,
            icon: icons.reload,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Top Up"
        },
        {
            id: 2,
            icon: icons.send,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Transfer"
        },
        {
            id: 3,
            icon: icons.internet,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Internet"
        },
        {
            id: 4,
            icon: icons.wallet,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Wallet"
        },
        {
            id: 5,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Bill"
        },
        {
            id: 6,
            icon: icons.game,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Games"
        },
        {
            id: 7,
            icon: icons.phone,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Mobile Prepaid"
        },
        {
            id: 8,
            icon: icons.more,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "More"
        },
    ]

    const specialPromoData = [
        {
            id: 1,
            img: images.promoBanner,
            title: "Bonus Cashback1",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 2,
            img: images.promoBanner,
            title: "Bonus Cashback2",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 3,
            img: images.promoBanner,
            title: "Bonus Cashback3",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 4,
            img: images.promoBanner,
            title: "Bonus Cashback4",
            description: "Don't miss it. Grab it now!"
        },
    ]
    const bookOtherWordsForHome = {
            id: 1,
            bookName: "Other Words For Home",
            bookCover: images.otherWordsForHome,
            rating: 4.5,
            language: "Eng",
            pageNo: 341,
            author: "Jasmine Warga",
            genre: [
                "Romance", "Adventure", "Drama"
            ],
            readed: "12k",
            description: "Jude never thought she’d be leaving her beloved older brother and father behind, all the way across the ocean in Syria. But when things in her hometown start becoming volatile, Jude and her mother are sent to live in Cincinnati with relatives. At first, everything in America seems too fast and too loud. The American movies that Jude has always loved haven’t quite prepared her for starting school in the US—and her new label of 'Middle Eastern,' an identity she’s never known before. But this life also brings unexpected surprises—there are new friends, a whole new family, and a school musical that Jude might just try out for. Maybe America, too, is a place where Jude can be seen as she really is.",
            backgroundColor: "rgba(240,240,232,0.9)",
            navTintColor: "#000"
        }

        const bookTheMetropolis = {
            id: 2,
            bookName: "The Metropolis",
            bookCover: images.theMetropolist,
            rating: 4.1,
            language: "Eng",
            pageNo: 272,
            author: "Seith Fried",
            genre: [
                "Adventure", "Drama"
            ],
            readed: "13k",
            description: "In Metropolis, the gleaming city of tomorrow, the dream of the great American city has been achieved. But all that is about to change, unless a neurotic, rule-following bureaucrat and an irreverent, freewheeling artificial intelligence can save the city from a mysterious terrorist plot that threatens its very existence. Henry Thompson has dedicated his life to improving America's infrastructure as a proud employee of the United States Municipal Survey. So when the agency comes under attack, he dutifully accepts his unexpected mission to visit Metropolis looking for answers. But his plans to investigate quietly, quickly, and carefully are interrupted by his new partner: a day-drinking know-it-all named OWEN, who also turns out to be the projected embodiment of the agency's supercomputer. Soon, Henry and OWEN are fighting to save not only their own lives and those of the city's millions of inhabitants, but also the soul of Metropolis. The Municipalists is a thrilling, funny, and touching adventure story, a tour-de-force of imagination that trenchantly explores our relationships to the cities around us and the technologies guiding us into the future.",
            backgroundColor: "rgba(247,239,219,0.9)",
            navTintColor: "#000"
        }

        const bookTheTinyDragon = {
            id: 3,
            bookName: "The Tiny Dragon",
            bookCover: images.theTinyDragon,
            rating: 3.5,
            language: "Eng",
            pageNo: 110,
            author: "Ana C Bouvier",
            genre: [
                "Drama", "Adventure", "Romance"
            ],
            readed: "13k",
            description: "This sketchbook for kids is the perfect tool to improve your drawing skills! Designed to encourage kids around the world to express their uniqueness through drawing, sketching or doodling, this sketch book is filled with 110 high quality blank pages for creations. Add some fun markers, crayons, and art supplies and you have the perfect, easy gift for kids!",
            backgroundColor: "rgba(119,77,143,0.9)",
            navTintColor: "#FFF"
        }

        const myBooksData = [
            {
                ...bookOtherWordsForHome,
                completion: "75%",
                lastRead: "3d 5h",

            },
            {
                ...bookTheMetropolis,
                completion: "23%",
                lastRead: "10d 5h",

            },
            {
                ...bookTheTinyDragon,
                completion: "10%",
                lastRead: "1d 2h",

            }
        ]
    const [features, setFeatures] = React.useState(featuresData)
    const [specialPromos, setSpecialPromos] = React.useState(specialPromoData)
    const [myBooks, setMyBooks] = React.useState(myBooksData);
    function renderHeader() {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        marginVertical: SIZES.padding * 2
                    }}
                >
                    <View style={{flex: 1}}>
                        <Text style={{...FONTS.h2}}>Hello!</Text>
                        <Text style={{...FONTS.body3, color: COLORS.gray}}>ByPrograms</Text>
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
                <View style={{flex: 1, justifyContent: 'center', padding: SIZES.padding}}>
                    <View style={{flexDirection: 'row', height: 70, backgroundColor: COLORS.secondary, borderRadius: SIZES.radius}}>
                        {/* Claim */}
                        <TouchableOpacity style={{flex: 1}} onPress={()=> {console.log("Clain")}}>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Image
                                    source={icons.claim_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                                <Text style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}>Clain</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Divider */}
                        <LineDivider />

                        {/* Get Point */}
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={()=> {console.log("Get Point")}}
                        >
                            <View style={{
                                flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Image
                                    source={icons.point_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                                <Text
                                    style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}
                                >
                                    Get Point
                                </Text>
                            </View>
                        </TouchableOpacity>

                         {/* Divider */}
                         <LineDivider />

                        {/* My Card */}
                        <TouchableOpacity
                            style={{flex: 1}}
                            onPress={()=> {console.log("My Cart")}}
                        >
                            <View style={{
                                flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Image
                                    source={icons.card_icon}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                />
                                <Text
                                    style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}
                                >
                                    Get Point
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    function renderMyBookSection (myBooks) {

        const renderItem = ({item, index}) => {
           return (
            <TouchableOpacity
                style={{
                    flex: 1,
                    marginLeft: index == 0 ? SIZES.padding : 0,
                    marginRight: SIZES.radius
                }}
                onPress={()=> navigation.navigate("BookDetail", {
                    book:item
                })}
            >
                {/* Book Cover */}
                <Image
                    source={item.bookCover}
                    resizeMode="cover"
                    style= {{
                        width: 180,
                        height: 250,
                        borderRadius: 20
                    }}
                />
                {/* Book Info */}
                <View style={{marginTop: SIZES.radius, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={icons.clock_icon}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.lightGray
                        }}
                    />
                    <Text style={{marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray}}>{item.lastRead}</Text>
                    <Image
                        source={icons.page_icon}
                        style={{
                            marginLeft: SIZES.radius,
                            width: 20,
                            height: 20,
                            tintColor: COLORS.lightGray
                        }}
                    />
                    <Text style={{marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray}}>{item.completion}</Text>
                </View>
            </TouchableOpacity>
           )
        }
        return (
            <View style={{flex: 1}}>
                {/* Hearder */}
                <View style={{paddingHorizontal: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: COLORS.white, ...FONTS.h2}}>My book</Text>

                    <TouchableOpacity onPress={()=> {console.log("See more")}}>
                        <Text style={{color: COLORS.lightGray, ...FONTS.body3, alignSelf: 'flex-start', textDecorationLine: 'underline'}}>See more</Text>
                    </TouchableOpacity>
                </View>

                {/* Books */}
                <View style={{flex: 1, marginTop: SIZES.padding}}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderItem}
                        data={myBooks}
                        keyExtractor={item => `${item.id}`}
                    />
                </View>
            </View>
        )
    }


    function renderPromos() {
        const HeaderComponent = () => {
            return(
                <View>
                    {renderHeader()}
                    {renderButtonSection()}
                    <View>
                        {renderMyBookSection(myBooks)}
                    </View>
                    {renderPromoHeader()}
                </View>
            )
            
        }
        const renderPromoHeader = () => (
            <View 
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.padding
                }}
            >
                <View style={{flex: 1}}>
                    <Text style={{...FONTS.h3}}>Special Promos</Text>
                </View>
                <TouchableOpacity
                    onPress={() => console.log("View All")}
                >
                    <Text style={{color: COLORS.gray, ...FONTS.body4}}>View All</Text>
                </TouchableOpacity>
            </View>
        )
        const renderItem = ({item}) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5
                }}
                onPress={() => console.log(item.title)}
            >
                <View
                    style={{
                        height: 80,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.primary
                    }}
                >
                    <Image 
                        source={images.promoBanner}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                        }}
                    />
                </View>
                <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: COLORS.lightGray,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                    }}
                >
                    <Text style={{...FONTS.h4}}>{item.title}</Text>
                    <Text style={{...FONTS.body4}}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList 
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{paddingHorizontal: SIZES.padding}}
                numColumns={2}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                data={specialPromos}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{marginBottom: 80}}></View>
                }
            />
        )
    }
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
            {renderPromos()}
        </SafeAreaView>
    )
}

export default Home;