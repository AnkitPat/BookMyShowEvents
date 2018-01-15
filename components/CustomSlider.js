import React, {Component} from 'react'
import {
    TouchableOpacity,
    Image,
    View,
    Text,
    StyleSheet,ImageBackground,AsyncStorage,ToastAndroid
} from 'react-native'

import {
    Avatar
} from 'react-native-elements'


export default class CustomSlider extends Component {
    constructor(props)
    {
        super(props)

    }

    render() {
        return (

            <View>
                <ImageBackground source={require('../icons/header_background.jpg')}
                                 style={{padding: 10}}
                ><Avatar
                    large
                    rounded
                    style={{alignSelf:'center',marginTop:20}}
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.8}
                />

                    <Text style={{color:'#fff',marginTop:25}}>Ankit Patidar</Text>
                    <Text style={{color:'#fff',marginTop:5}}>ankitpatidar030@gmail.com</Text>

                </ImageBackground>
                <TouchableOpacity style={Styles.menuItemHeaderStyle} onPress={()=>{
                    ToastAndroid.show('prfile',ToastAndroid.SHORT)
                }}>
                    <Image style={Styles.menuIconStyle}
                           source={require('../icons/icons8-user-male-512.png')}/>
                    <Text style={Styles.menuItemStyle}>Profile</Text>
                </TouchableOpacity>


                <TouchableOpacity style={Styles.menuItemHeaderStyle}>
                    <Image style={Styles.menuIconStyle}
                           source={require('../icons/icons8-shutdown-50.png')}/>
                    <Text style={Styles.menuItemStyle}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.menuItemHeaderStyle}
                                  onPress={()=>{
                                      //AsyncStorage.setItem('user_data',null)
                                      this.props.navigation.navigate('DetailEvent')
                                  }}
                >

                    <Image style={Styles.menuIconStyle} source={require('../icons/icons8-shutdown-50.png')}/><Text
                    style={Styles.menuItemStyle}>Logout</Text>
                </TouchableOpacity>

            </View>
        );
    }
}


const Styles = StyleSheet.create({
    menuItemStyle: {
        fontSize: 20,
        color: '#6A0888'
    },
    menuItemHeaderStyle: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    menuIconStyle: {width: 20, height: 20, alignSelf: 'center', marginLeft: 20, marginRight: 20}
});

