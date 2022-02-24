import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import {
    PlaceholderContainer,
    Placeholder,
  } from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from '../constants';
const Gradient = () => {
    return (
      <LinearGradient
        colors={['#eeeeee', '#dddddd', '#eeeeee']}
        start={{x: 1.0, y: 0.0}}
        end={{x: 0.0, y: 0.0}}
        style={{
          flex: 1,
          width: 120,
        }}
      />
    );
};
const PlaceholderHome= () => {
    return (
        <View>
            <PlaceholderContainer
                    style={styles.placeholderContainer, {marginBottom: SIZES.base}}
                    animatedComponent={<Gradient />}
                    duration={1000}
                    delay={1000}
                >
                  
                  <View style={{ flexDirection: 'row',}}>
                    <Placeholder style={[styles.placeholder,{width: '40%',height: 20} ]} />
                    <Placeholder style={[styles.placeholder,{width: '20%',height: 10, alignSelf: 'flex-end', position: 'absolute', right: 10} ]} />
                  </View>
                  <View style={{marginTop: 10, flexDirection: 'row', borderBottomColor: COLORS.border, borderBottomWidth: 1, paddingBottom: SIZES.base}}>
                      <View style={{ flexDirection: 'row', marginLeft: 10}}>
                        <View style={{width: '80%', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingBottom: 10}}>
                          <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
                          <Placeholder style={[styles.placeholder,{width: '90%',height: 15} ]} />
                          <View style={{marginTop: 10}}>
                            <Placeholder style={[styles.placeholder,{width: '70%',height: 10} ]} />
                            <Placeholder style={[styles.placeholder,{width: '70%',height: 10} ]} />
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', marginLeft: -40}}>
                        <View style={{width: '80%', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingBottom: 10}}>
                          <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
                          <Placeholder style={[styles.placeholder,{width: '90%',height: 15} ]} />
                          <View style={{marginTop: 10}}>
                            <Placeholder style={[styles.placeholder,{width: '70%',height: 10} ]} />
                            <Placeholder style={[styles.placeholder,{width: '70%',height: 10} ]} />
                          </View>
                        </View>
                      </View>
                      
                  </View>
                </PlaceholderContainer>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    placeholderContainer: {
        // width: WIDTH,
        // height: 200,
        marginTop: 10,
      },
      placeholder: {
        height: 8,
        marginTop: 6,
        marginLeft: 10,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
      },
      placeholderHeader:{
        height: 8,
        marginTop: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee'
      },
      placeholderIma:{
        height: 8,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        marginLeft: -10
      },
      placeholderBody:{
        height: 8,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        marginLeft: 15
      },
      boxPlaceholder:{
        width: 50, 
        justifyContent: 'center', 
        alignItems: 'flex-start',
      },
})
export default PlaceholderHome;