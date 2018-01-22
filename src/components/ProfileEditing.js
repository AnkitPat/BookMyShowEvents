import React, {Component} from 'react'
import {
    View, Text, Dimensions,StatusBar, TextInput, ScrollView, TouchableOpacity, AsyncStorage
} from 'react-native'

import {Card, Avatar,Button} from 'react-native-elements'
import LoginStore from "../Store/LoginStore";



var ImagePicker = require('react-native-image-picker');
import RNFetchBlob from 'react-native-fetch-blob'

import firebase from 'react-native-firebase'
import {LoginDone} from "../actions/LoginAction";
import Header from "./Header";

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class ProfileEditing extends Component {

    changedName=''
    constructor(props)
    {
        super(props)

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
    state={
        changedName: '',
        store: LoginStore.getStore()
    };



    uploadImage(uri, mime = 'application/octet-stream') {
        return new Promise((resolve, reject) => {
            const uploadUri = uri
            let uploadBlob = null

            const imageRef = firebase.storage().ref('images').child(this.state.store.username)

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob._ref, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    imagePicker() {

        console.log('called')
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {


                console.log(response.uri)

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };


                this.uploadImage(response.uri)
                    .then(url => {   LoginDone(this.state.store.username,this.state.store.emailId,url);this.setState({image_uri: url}); })
                    .catch(error => console.log(error))


            }
        });
    }


    render() {
        this.getProfile()



        return (

            <View style={{flex: 1, justifyContent: 'center'}}>
                <StatusBar backgroundColor="#8839A0" barStyle="light-content"/>
                <Header title={'Profle'} visibility={false} onPress={() => {
                    console.log('drawer')

                    this.props.navigation.navigate('Home')

                }
                }/>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingBottom: 10, justifyContent: 'center'}}>
                    <Card style={styles.container}>

                        <Text style={styles.loginText}>Profile</Text>


                        <TouchableOpacity onPress={() => this.imagePicker()}

                        >
                        <Avatar
                            xlarge
                            rounded
                            containerStyle={{marginTop:20,alignSelf:'center'}}
                            source={{uri: this.state.store.image_url}}

                            activeOpacity={0.8}
                        />

                        </TouchableOpacity>
                        <Text style={{alignSelf:'center',marginTop:5}}>{this.state.store.username}</Text>

                        <TextInput style={{marginTop:15}}   placeholder={'User Name/Display Name'}
                                   onChangeText={(text) => {
                                       this.state.changedName=text
                                        console.log(this.state.changedName+text)
                                       this.changedName = text
                                   }
                                   }

                        />
                        <TextInput style={{marginTop:15}} placeholder={'Email'} editable={false} value={this.state.store.emailId} onChangeText={(text)=>{

                        }}/>

                        <TextInput style={{marginTop:15}} placeholder={'Preferred Location'} onChangeText={(text)=>{

                        }}/>







                        <Button title={'Save'} containerViewStyle={{marginTop:15}} backgroundColor={'#6A0888'} onPress={()=>{

                            console.log(this.changedName)
                            firebase.database().ref('users/' + this.changedName).set({
                                username: this.changedName,
                                email: this.state.store.emailId,
                                profile_picture : this.state.store.image_url
                            });
                            AsyncStorage.setItem('user_data', this.changedName)

                            LoginDone(this.changedName,this.state.store.emailId,this.state.store.image_url)

                            this.props.navigation.navigate('Home')
                        }} />
                    </Card>
                </ScrollView>
            </View>


        );
    }
}

const styles = {
    loginText: {
        fontSize: 30,
        color: '#000',
        alignSelf: 'center',
        marginBottom: 10
    },

    container: {

        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center'
    },
    avatar: {
        position: 'absolute',
        top: 50,
        left: (Dimensions.get('window').width / 2) - 50,
        alignItems: 'center',
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 100,
    }
}