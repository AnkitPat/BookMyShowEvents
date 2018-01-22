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
import LoginStore from "../src/Store/LoginStore";


export default class CustomSlider extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
            store: LoginStore.getStore()
        };
        this.getProfile = this.getProfile.bind(this)

    }


    componentDidMount() {
        LoginStore.addLoginListener(this.getProfile)
    }

    componentWillUnmount() {
        LoginStore.removeLoginListener(this.getProfile)
    }

    getProfile() {

        this.state = {

            store: LoginStore.getStore()
        }

    }

    render() {

        this.getProfile()
        console.log('custom slider',this.state.store.username)
        return (

            <View>
                <ImageBackground source={require('../icons/header_background.jpg')}
                                 style={{padding: 10}}
                ><Avatar
                    large
                    rounded
                    containerStyle={{marginTop:20}}
                    source={{uri: this.state.store.image_url}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.8}
                />

                    <Text style={{color:'#fff',marginTop:25}}>{this.state.store.username}</Text>
                    <Text style={{color:'#fff',marginTop:5}}>{this.state.store.emailId}</Text>

                </ImageBackground>
                <TouchableOpacity style={Styles.menuItemHeaderStyle} onPress={()=>{
                    this.props.navigation.navigate('ProfileEditing')
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
                                      AsyncStorage.setItem('user_data','')
                                      this.props.navigation.navigate('Login')
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

