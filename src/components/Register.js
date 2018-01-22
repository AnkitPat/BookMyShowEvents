import React, {Component} from 'react'

import {View, ScrollView, Text, StyleSheet, TextInput,AsyncStorage, ActivityIndicator,ToastAndroid} from 'react-native'

import firebase from 'react-native-firebase'

import {Card, FormLabel, FormInput, Button, FormValidationMessage} from 'react-native-elements'
import {LoginDone} from "../actions/LoginAction";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameFound: false,
            emailFound: false,
            passwordFound: false,
            confirmPasswordFound: false
        }
    }

    state = {
        errorMessage: '', loading: false, error: false,
        username: '',
        email: '',
        password: '',
        cpassword: ''
    };

    render() {
        return (
            /* <Text onPress={()=>{
                 this.props.navigation.navigate('DemoCheck')
             }} style={{paddingTop:50,alignItems:'center'}}>Ankit here</Text>*/

            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'grey'}}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1, paddingTop: 20, paddingBottom: 10, justifyContent: 'center'}}>
                    <Card style={styles.container}>
                        <Text style={styles.loginText}>Register</Text>

                        <FormLabel labelStyle={styles.labelStyle}>UserName</FormLabel>
                        <TextInput style={styles.textInput} ref={input => this.input = input} placeholder={'Username'}

                                   onChangeText={(text) => {

                                       this.setState({
                                           username: text
                                       })
                                   }
                                   }
                        />
                        {this.state.usernameFound &&
                        <FormValidationMessage>{'User Name not be blank'}</FormValidationMessage>}
                        <FormLabel labelStyle={styles.labelStyle}>Email</FormLabel>
                        <TextInput onChangeText={(text) => {

                            this.setState({
                                email: text
                            })
                        }
                        } style={styles.textInput} placeholder={'Email'} checkValid={t => EMAIL_REGEX.test(t)}/>
                        {this.state.emailFound &&
                        <FormValidationMessage>{'Email not be blank or Valid'}</FormValidationMessage>}
                        <FormLabel labelStyle={styles.labelStyle}>Password</FormLabel>
                        <TextInput onChangeText={(text) => {

                            this.setState({
                                password: text
                            })
                        }
                        } style={styles.textInput} placeholder={'Password'}/>
                        {this.state.passwordFound &&
                        <FormValidationMessage>{'Password not be blank'}</FormValidationMessage>}
                        <FormLabel labelStyle={styles.labelStyle}>Confirm Password</FormLabel>
                        <TextInput onChangeText={(text) => {

                            this.setState({
                                cpassword: text
                            })
                        }
                        } style={styles.textInput} placeholder={'Confirm Password'}/>

                        {!this.state.loading ? <Button onPress={() => {

                                this.setState({
                                    loading: true
                                })
                                if (this.state.email) {
                                    if (this.state.password&&this.state.cpassword&&this.state.password === this.state.cpassword) {
                                        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                                            .then((user) => {
                                                this.setState({loading: false});
                                                console.log(user)

                                                var username  =  this.state.email.split("@")[0].replace('.','')


                                                firebase.database().ref('users/' + username).set({
                                                    username: username,
                                                    email: this.state.email,
                                                    profile_picture : 'http://www.workspaceit.com/frank/images/user.png'
                                                });

                                                AsyncStorage.setItem('user_data',username)
                                                AsyncStorage.setItem('nick_name',this.state.username)

                                                ToastAndroid.show('Registered',ToastAndroid.SHORT)

                                                LoginDone(username,this.state.email,'http://www.workspaceit.com/frank/images/user.png')

                                                this.props.navigation.navigate('Home')
                                            })
                                            .catch((error) => {

                                                this.setState({
                                                    loading: false,
                                                    error: true,
                                                    errorMessage: error.message
                                                });
                                            });
                                    }
                                    else {
                                        this.setState({
                                            error: true,
                                            loading: false,
                                            errorMessage: 'password doesn\'t match'
                                        })
                                    }
                                }
                                else {
                                    this.setState({
                                        error: true,
                                        loading: false,
                                        errorMessage: 'email is blank'
                                    })
                                }
                            }} buttonStyle={styles.registerButtonStyle} title={'Register'}/> :
                            <ActivityIndicator size="large" color="#0000ff"/>
                        }

                        {this.state.error ?
                            <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage> : null}


                    </Card>
                </ScrollView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    loginText: {
        fontSize: 50,
        color: '#000',
        alignSelf: 'center',
        marginBottom: 10
    },
    cardBackground: {

        backgroundColor: 'transparent'
    },
    backgroundImage: {

        flex: 1,
        resizeMode: 'cover'

    },
    container: {

        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent: 'center'
    },
    textInput: {
        color: '#000',

        marginLeft: 15,
        fontSize: 16,
        paddingLeft: 3,
        flex: 1,
        flexGrow: 1
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },

    labelStyle: {
        color: '#00BFFF'
    },

    registerButtonStyle: {
        backgroundColor: '#00BFFF',
        marginTop: 20
    },

    loginButton: {

        justifyContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        marginHorizontal: 36
    },
    separationText: {
        marginTop: 5,
        color: '#000',
        alignSelf: 'center',
        marginHorizontal: 36
    },

    loginIconButton: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    googleLoginButton: {
        alignSelf: 'center'
    },

    facebookLoginButton: {
        alignSelf: 'center'
    }
});
